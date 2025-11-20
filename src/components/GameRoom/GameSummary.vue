<template>
    <div class="container">
        <h2 v-if="timerExpired">⏰ Hết Thời Gian!</h2>
        <h2 v-else>🎉 Kết Thúc Trò Chơi!</h2>

        <div v-if="timerExpired" class="error-message"
            style="background: #fee; color: #c33; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
            Thời gian đã hết! Kết quả đã được lưu tự động.
        </div>
        <div v-else class="success-message">
            Tất cả câu hỏi đã được giải!
        </div>

        <table class="summary-table">
            <thead>
                <tr>
                    <th>Câu hỏi</th>
                    <th>Người trả lời</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(word, wordId) in batch.words" :key="wordId">
                    <td>{{ word.clue }}</td>
                    <td>
                        <span v-if="room.answers?.[wordId]">
                            {{ getPlayerName(room.answers[wordId]?.answeredBy) }}
                        </span>
                        <span v-else style="color: #999;">Chưa có</span>
                    </td>
                </tr>
            </tbody>
        </table>

        <p style="text-align: center; margin-top: 16px; color: #666;">
            Thời gian: {{ formatTime(gameTime) }}
        </p>

        <div class="btn-group" style="margin-top: 20px;">
            <button v-if="isHost && !timerExpired" @click="$emit('start-new-round')">
                Bắt đầu vòng mới
            </button>
            <button class="secondary" @click="$emit('leave-room')">
                Quay lại
            </button>
        </div>
    </div>
</template>

<script setup>
import { formatTime } from '../../utils/helpers.js';

defineProps({
    batch: { type: Object, required: true },
    room: { type: Object, required: true },
    gameTime: { type: Number, default: 0 },
    timerExpired: { type: Boolean, default: false },
    isHost: { type: Boolean, default: false }
});

defineEmits(['leave-room', 'start-new-round']);

const getPlayerName = (playerId) => {
    if (!playerId) return 'Unknown';
    // This will be passed from parent or computed
    return 'Player'; // Placeholder - should be passed as prop or computed
};
</script>
