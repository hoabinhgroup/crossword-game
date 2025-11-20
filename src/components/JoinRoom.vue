<template>
  <div class="container">
    <h1>🎮 Tham Gia Phòng</h1>

    <div class="form-group">
      <label>Mã phòng:</label>
      <input v-model="code" placeholder="Nhập mã phòng (VD: ABC12)"
        style="text-transform: uppercase; text-align: center; font-size: 24px; letter-spacing: 4px;" maxlength="5" />
    </div>

    <div class="form-group">
      <label>Tên của bạn:</label>
      <input v-model="playerName" placeholder="Nhập tên của bạn" maxlength="20" />
    </div>

    <button @click="joinRoom" :disabled="!canJoin">Tham gia</button>
    <button class="secondary" @click="router.push('/')">Quay lại</button>

    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { getRoom, addPlayer } from '../firebase/db.js';
import { generatePlayerId } from '../utils/helpers.js';

import { useRouter } from 'vue-router';

const router = useRouter();

const code = ref('');
const playerName = ref('');
const error = ref('');

const canJoin = computed(() => {
  return code.value.length === 5 && playerName.value.trim().length > 0;
});

const joinRoom = async () => {
  if (!canJoin.value) return;

  error.value = '';
  const roomCode = code.value.toUpperCase();

  try {
    const room = await getRoom(roomCode);

    if (!room) {
      error.value = 'Không tìm thấy phòng với mã này';
      return;
    }

    const playerId = generatePlayerId();
    await addPlayer(roomCode, playerId, {
      name: playerName.value.trim(),
      score: 0
    });

    // Navigate to game room
    router.push(`/game/${roomCode}/${playerId}`);
  } catch (err) {
    error.value = 'Lỗi: ' + err.message;
  }
};
</script>
