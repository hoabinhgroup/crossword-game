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
      
      <!-- Timer Settings -->
      <div class="form-group">
        <label style="display: flex; align-items: center; gap: 8px;">
          <input 
            type="checkbox" 
            v-model="timerEnabled"
            style="width: auto;"
          />
          <span>Bật đếm ngược thời gian</span>
        </label>
        <div v-if="timerEnabled" style="margin-top: 12px;">
          <label>Thời gian (phút):</label>
          <input 
            type="number" 
            v-model.number="timerDuration" 
            min="1" 
            max="120"
            placeholder="Nhập số phút"
            style="margin-top: 8px;"
          />
          <p style="font-size: 12px; color: #666; margin-top: 4px;">
            Khi hết thời gian, tất cả người chơi sẽ bị đá ra khỏi phòng và kết quả sẽ được lưu tự động.
          </p>
        </div>
      </div>
      
      <button @click="joinRoom" :disabled="!hostName.trim() || (timerEnabled && (!timerDuration || timerDuration < 1))">Vào phòng</button>
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
import { createRoom as createRoomInDb, getBatch, generateRoomCode, addPlayer, generateSessionId } from '../firebase/db.js';
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
const timerEnabled = ref(false);
const timerDuration = ref(10); // Default 10 minutes

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
    
    // Tạo session ID cho room này
    const sessionId = generateSessionId();
    
    const roomData = {
      batchId: props.batchId,
      hostId: playerId,
      sessionId: sessionId,
      players: {},
      answers: {},
      createdAt: Date.now(),
      sessionStartTime: Date.now(),
      timerEnabled: Boolean(timerEnabled.value), // Đảm bảo là boolean
      timerDuration: timerEnabled.value ? (timerDuration.value * 60) : null, // Convert to seconds
      timerStartTime: null // Will be set when game starts
    };
    
    // Debug log
    console.log('Creating room with timer settings:', {
      timerEnabled: roomData.timerEnabled,
      timerDuration: roomData.timerDuration,
      timerEnabledValue: timerEnabled.value,
      timerDurationValue: timerDuration.value
    });
    
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
    
    // Start timer if enabled - cũng đảm bảo timerEnabled và timerDuration được set đúng
    const { updateRoom } = await import('../firebase/db.js');
    const updateData = {};
    
    if (timerEnabled.value && timerDuration.value) {
      updateData.timerEnabled = true;
      updateData.timerDuration = timerDuration.value * 60;
      updateData.timerStartTime = Date.now();
    } else {
      // Đảm bảo timerEnabled là false nếu không bật
      updateData.timerEnabled = false;
      updateData.timerDuration = null;
    }
    
    if (Object.keys(updateData).length > 0) {
      console.log('Updating room timer settings:', updateData);
      await updateRoom(roomCode.value, updateData);
    }
    
    emit('room-created', roomCode.value, hostPlayerId.value);
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};
</script>

