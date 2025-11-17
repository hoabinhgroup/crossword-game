<template>
  <div class="container">
    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="!room || !batch || !batch.words" class="error">Không tìm thấy phòng hoặc đợt học</div>
    <div v-else>
      <!-- Header -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <h1>{{ batch.title }}</h1>
        <div class="room-code" style="font-size: 20px; padding: 8px 16px; margin: 0;">
          {{ roomCode }}
        </div>
      </div>

      <!-- Leaderboard -->
      <div class="container" style="margin-bottom: 20px;">
        <h2>🏆 Bảng Xếp Hạng</h2>
        <ul class="leaderboard">
          <li v-for="(player, playerId, index) in sortedPlayers" :key="playerId" class="leaderboard-item"
            :class="`rank-${index + 1}`">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="rank">#{{ index + 1 }}</span>
              <span class="player-name">{{ player.name }}</span>
            </div>
            <span class="player-score">{{ player.score }} điểm</span>
          </li>
        </ul>
      </div>

      <!-- Game Summary (if game ended) -->
      <div v-if="gameEnded" class="container">
        <h2>🎉 Kết Thúc Trò Chơi!</h2>
        <div class="success-message">
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
        <button v-if="isHost" @click="startNewRound">Bắt đầu vòng mới</button>
        <button class="secondary" @click="$emit('back')">Quay lại</button>
      </div>

      <!-- Questions -->
      <div v-else>
        <h2>📝 Câu Hỏi</h2>
        <ul class="question-list">
          <li v-for="(word, wordId) in batch.words" :key="wordId" class="question-item" :class="{
            'solved': room.answers?.[wordId]?.correct,
            'locked': room.answers?.[wordId]?.correct
          }">
            <div class="question-clue">
              <div v-if="word.imageUrl" class="question-image">
                <img :src="word.imageUrl" :alt="word.clue" />
              </div>
              <div>{{ word.clue }}</div>
            </div>

            <div v-if="room.answers?.[wordId]?.correct" class="answer-status correct">
              ✅ Đã giải! Đáp án: {{ word.answer.toUpperCase() }}
              <div class="answered-by">
                Trả lời bởi: {{ getPlayerName(room.answers[wordId]?.answeredBy) }}
              </div>
            </div>

            <div v-else>
              <div class="answer-input">
                <input v-model="answers[wordId]" :placeholder="'_'.repeat(word.answer.length)"
                  :maxlength="word.answer.length" @keyup.enter="submitAnswer(wordId, word.answer)"
                  :disabled="room.answers?.[wordId]?.correct" />
                <button @click="submitAnswer(wordId, word.answer)">Gửi</button>
              </div>

              <div v-if="answerStatus[wordId]" class="answer-status"
                :class="answerStatus[wordId].correct ? 'correct' : 'incorrect'">
                {{ answerStatus[wordId].message }}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Players List -->
      <div class="container" style="margin-top: 20px;">
        <h3>👥 Người Chơi ({{ Object.keys(room.players || {}).length }})</h3>
        <ul class="player-list">
          <li v-for="(player, playerId) in room.players" :key="playerId" class="player-item">
            <span class="player-name">{{ player.name }}</span>
            <span class="player-score">{{ player.score }} điểm</span>
          </li>
        </ul>
      </div>

      <button class="secondary" @click="$emit('back')" style="margin-top: 20px;">
        Rời phòng
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { watchRoom, getBatch, submitAnswer as submitAnswerToDb, updatePlayer, updateRoom } from '../firebase/db.js';
import { calculateScore, formatTime } from '../utils/helpers.js';

const props = defineProps({
  roomCode: {
    type: String,
    required: true
  },
  playerId: {
    type: String,
    required: true
  },
  isHost: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['back']);

const loading = ref(true);
const room = ref(null);
const batch = ref(null);
const answers = ref({});
const answerStatus = ref({});
const gameTime = ref(0);
let gameTimer = null;
let unsubscribe = null;

const sortedPlayers = computed(() => {
  if (!room.value?.players) return [];
  return Object.entries(room.value.players)
    .sort(([, a], [, b]) => b.score - a.score)
    .reduce((acc, [id, player]) => {
      acc[id] = player;
      return acc;
    }, {});
});

const gameEnded = computed(() => {
  if (!room.value || !batch.value || !batch.value.words || !room.value.answers) return false;
  const words = Object.keys(batch.value.words);
  if (words.length === 0) return false;
  return words.every(wordId => room.value.answers?.[wordId]?.correct);
});

onMounted(async () => {
  // Load batch
  unsubscribe = watchRoom(props.roomCode, async (roomData) => {
    room.value = roomData;
    if (roomData && !batch.value) {
      try {
        batch.value = await getBatch(roomData.batchId);
        loading.value = false;

        // Initialize answers object
        if (batch.value && batch.value.words) {
          Object.keys(batch.value.words).forEach(wordId => {
            answers.value[wordId] = '';
          });
        }

        // Start game timer
        if (gameTimer) clearInterval(gameTimer);
        gameTimer = setInterval(() => {
          gameTime.value++;
        }, 1000);
      } catch (error) {
        console.error('Error loading batch:', error);
      }
    } else if (!roomData) {
      loading.value = false;
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
  if (gameTimer) clearInterval(gameTimer);
});

const submitAnswer = async (wordId, correctAnswer) => {
  const userAnswer = answers.value[wordId]?.trim().toLowerCase();

  if (!userAnswer) {
    answerStatus.value[wordId] = {
      correct: false,
      message: 'Vui lòng nhập đáp án'
    };
    return;
  }

  // Check if already answered
  if (room.value.answers?.[wordId]?.correct) {
    return;
  }

  const isCorrect = userAnswer === correctAnswer.toLowerCase();

  if (isCorrect) {
    try {
      // Submit answer to Firebase
      await submitAnswerToDb(props.roomCode, wordId, {
        answeredBy: props.playerId,
        correct: true,
        timestamp: Date.now()
      });

      // Update player score
      const currentScore = room.value.players[props.playerId]?.score || 0;
      const points = calculateScore(10);
      await updatePlayer(props.roomCode, props.playerId, {
        score: currentScore + points
      });

      // Clear status
      answerStatus.value[wordId] = null;
      answers.value[wordId] = '';
    } catch (error) {
      answerStatus.value[wordId] = {
        correct: false,
        message: 'Lỗi: ' + error.message
      };
    }
  } else {
    answerStatus.value[wordId] = {
      correct: false,
      message: '❌ Sai rồi! Hãy thử lại.'
    };
    setTimeout(() => {
      answerStatus.value[wordId] = null;
    }, 2000);
  }
};

const getPlayerName = (playerId) => {
  return room.value?.players[playerId]?.name || 'Unknown';
};

const startNewRound = async () => {
  if (!confirm('Bắt đầu vòng chơi mới? Điểm số sẽ được reset.')) {
    return;
  }

  // Reset answers and scores
  const resetData = {
    answers: {},
    players: {}
  };

  Object.keys(room.value.players).forEach(playerId => {
    resetData.players[playerId] = {
      ...room.value.players[playerId],
      score: 0
    };
  });

  if (batch.value && batch.value.words) {
    Object.keys(batch.value.words).forEach(wordId => {
      resetData.answers[wordId] = null;
    });
  }

  try {
    await updateRoom(props.roomCode, resetData);
    gameTime.value = 0;
    answers.value = {};
    answerStatus.value = {};
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};
</script>
