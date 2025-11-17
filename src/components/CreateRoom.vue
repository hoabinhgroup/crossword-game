<template>
  <div class="container">
    <h1>🎮 Tạo Phòng Chơi</h1>
    
    <div v-if="loading" class="loading">Đang tạo phòng...</div>
    <div v-else-if="roomCode">
      <div class="room-code">{{ roomCode }}</div>
      <p style="text-align: center; margin-bottom: 20px;">
        Chia sẻ mã phòng này với người chơi!
      </p>
      <div class="form-group">
        <label>Tên của bạn (Host):</label>
        <input 
          v-model="hostName" 
          placeholder="Nhập tên của bạn"
          maxlength="20"
        />
      </div>
      <button @click="joinRoom" :disabled="!hostName.trim()">Vào phòng</button>
      <button class="secondary" @click="$emit('back')">Quay lại</button>
    </div>
    <div v-else>
      <button @click="createRoom">Tạo phòng mới</button>
      <button class="secondary" @click="$emit('back')">Quay lại</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { createRoom as createRoomInDb, getBatch, generateRoomCode, addPlayer } from '../firebase/db.js';
import { generatePlayerId } from '../utils/helpers.js';

const props = defineProps({
  batchId: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['back', 'room-created']);

const loading = ref(false);
const roomCode = ref(null);
const batch = ref(null);
const hostName = ref('');
const hostPlayerId = ref(null);

onMounted(async () => {
  try {
    batch.value = await getBatch(props.batchId);
    if (!batch.value) {
      alert('Không tìm thấy đợt học');
      emit('back');
    }
  } catch (error) {
    alert('Lỗi: ' + error.message);
    emit('back');
  }
});

const createRoom = async () => {
  if (!batch.value) return;
  
  loading.value = true;
  try {
    const code = generateRoomCode();
    const playerId = generatePlayerId();
    hostPlayerId.value = playerId;
    
    const roomData = {
      batchId: props.batchId,
      hostId: playerId,
      players: {},
      answers: {},
      createdAt: Date.now()
    };
    
    // Initialize answers
    Object.keys(batch.value.words).forEach(wordId => {
      roomData.answers[wordId] = null;
    });
    
    await createRoomInDb(code, roomData);
    roomCode.value = code;
    loading.value = false;
  } catch (error) {
    alert('Lỗi: ' + error.message);
    loading.value = false;
  }
};

const joinRoom = async () => {
  if (!roomCode.value || !hostName.value.trim() || !hostPlayerId.value) return;
  
  try {
    // Add host as player
    await addPlayer(roomCode.value, hostPlayerId.value, {
      name: hostName.value.trim(),
      score: 0
    });
    
    emit('room-created', roomCode.value, hostPlayerId.value);
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};
</script>

