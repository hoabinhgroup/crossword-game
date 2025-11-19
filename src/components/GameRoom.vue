<template>
  <div class="container">
    <!-- Timer Display - Fixed ở góc trên bên phải -->
    <div v-if="room && (room.timerEnabled === true || room.timerEnabled === 'true')" 
         class="timer-display-fixed" 
         :class="{ 'timer-warning': timeRemaining !== null && timeRemaining <= 60, 'timer-danger': timeRemaining !== null && timeRemaining <= 30 }">
      <div class="timer-icon">⏱️</div>
      <div class="timer-content">
        <span v-if="room.timerStartTime && timeRemaining !== null && timeRemaining > 0" class="timer-time">{{ formatTimeRemaining(timeRemaining) }}</span>
        <span v-else-if="room.timerStartTime && timeRemaining === 0" class="timer-time" style="color: #dc3545;">00:00</span>
        <span v-else class="timer-waiting">Chờ bắt đầu...</span>
      </div>
    </div>

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
        <h2 v-if="timerExpired">⏰ Hết Thời Gian!</h2>
        <h2 v-else>🎉 Kết Thúc Trò Chơi!</h2>
        <div v-if="timerExpired" class="error-message" style="background: #fee; color: #c33; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
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
        <button v-if="isHost && !timerExpired" @click="startNewRound">Bắt đầu vòng mới</button>
        <button class="secondary" @click="handleLeaveRoom">Quay lại</button>
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
                  :disabled="room.answers?.[wordId]?.correct || timerExpired" />
                <button @click="submitAnswer(wordId, word.answer)" :disabled="timerExpired">Gửi</button>
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

      <button class="secondary" @click="handleLeaveRoom" style="margin-top: 20px;">
        Rời phòng
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { watchRoom, getBatch, getRoom, submitAnswer as submitAnswerToDb, updatePlayer, updateRoom, saveRanking, generateSessionId, saveSessionLeaderboard, removePlayer } from '../firebase/db.js';
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
const sessionId = ref(null);
const sessionStartTime = ref(null);
const timeRemaining = ref(null);
const timerExpired = ref(false);
let gameTimer = null;
let timerCheckInterval = null;
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
  if (timerExpired.value) return true;
  if (!room.value || !batch.value || !batch.value.words || !room.value.answers) return false;
  const words = Object.keys(batch.value.words);
  if (words.length === 0) return false;
  return words.every(wordId => room.value.answers?.[wordId]?.correct);
});

const rankingSaved = ref(false);
const lastSavedRoomCode = ref(null);

// Watch gameEnded và lưu xếp hạng khi game kết thúc
watch(() => gameEnded.value, async (ended) => {
  if (ended && room.value && room.value.batchId) {
    // Chỉ lưu một lần cho mỗi room (tránh lưu nhiều lần khi watch trigger nhiều lần)
    const roomKey = `${room.value.batchId}_${props.roomCode}`;
    if (rankingSaved.value && lastSavedRoomCode.value === roomKey) {
      return; // Đã lưu rồi
    }

    try {
      // Lưu xếp hạng tổng hợp (tích lũy)
      await saveRanking(room.value.batchId, room.value.players || {});

      // Lưu session leaderboard
      if (sessionId.value && sessionStartTime.value) {
        const duration = Math.floor((Date.now() - sessionStartTime.value) / 1000);
        const now = new Date();
        const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

        // Tính số câu trả lời đúng cho mỗi người chơi
        const sessionPlayers = {};
        Object.entries(room.value.players || {}).forEach(([playerId, playerData]) => {
          // Đếm số câu trả lời đúng của người chơi này
          let correctCount = 0;
          Object.values(room.value.answers || {}).forEach(answer => {
            if (answer?.correct && answer?.answeredBy === playerId) {
              correctCount++;
            }
          });

          sessionPlayers[playerId] = {
            name: playerData.name,
            score: playerData.score || 0,
            correct: correctCount
          };
        });

        await saveSessionLeaderboard(room.value.batchId, sessionId.value, {
          createdAt,
          players: sessionPlayers,
          duration
        });
      }

      rankingSaved.value = true;
      lastSavedRoomCode.value = roomKey;
    } catch (error) {
      console.error('Error saving ranking:', error);
    }
  }
});

// Reset khi room thay đổi
watch(() => props.roomCode, () => {
  rankingSaved.value = false;
  lastSavedRoomCode.value = null;
  processedAnswers.value.clear();
  sessionId.value = null;
  sessionStartTime.value = null;
  timeRemaining.value = null;
  timerExpired.value = false;
});

// Watch timer and calculate remaining time - Realtime sync
watch(() => [room.value?.timerEnabled, room.value?.timerStartTime, room.value?.timerDuration], 
  ([enabled, startTime, duration]) => {
    // Clear existing interval trước
    if (timerCheckInterval) {
      clearInterval(timerCheckInterval);
      timerCheckInterval = null;
    }
    
    // Kiểm tra timerEnabled (có thể là boolean hoặc string)
    const isTimerEnabled = enabled === true || enabled === 'true';
    
    console.log('Timer watch triggered:', {
      enabled,
      isTimerEnabled,
      startTime,
      duration,
      hasStartTime: !!startTime,
      hasDuration: duration !== null && duration !== undefined,
      playerId: props.playerId,
      isHost: props.isHost
    });
    
    if (isTimerEnabled && startTime && duration !== null && duration !== undefined) {
      // Tính toán thời gian còn lại ngay lập tức
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const remaining = Math.max(0, duration - elapsed);
      timeRemaining.value = remaining;
      
      console.log('Timer initialized:', {
        enabled: isTimerEnabled,
        startTime,
        duration,
        elapsed,
        remaining,
        playerId: props.playerId,
        isHost: props.isHost
      });
      
      // Nếu đã hết thời gian, xử lý ngay
      if (remaining <= 0 && !timerExpired.value) {
        handleTimerExpired();
        return;
      }
      
      // Start checking timer every second để đồng bộ realtime
      timerCheckInterval = setInterval(() => {
        updateTimeRemaining();
        if (timeRemaining.value !== null && timeRemaining.value <= 0 && !timerExpired.value) {
          handleTimerExpired();
        }
      }, 1000);
    } else {
      timeRemaining.value = null;
      if (isTimerEnabled && !startTime) {
        console.log('Timer enabled but not started yet - waiting for host to start', {
          playerId: props.playerId,
          isHost: props.isHost
        });
      } else if (!isTimerEnabled) {
        console.log('Timer not enabled', {
          playerId: props.playerId,
          isHost: props.isHost
        });
      }
    }
  },
  { immediate: true }
);

const updateTimeRemaining = () => {
  // Kiểm tra timerEnabled đúng cách (có thể là boolean hoặc string)
  const isTimerEnabled = room.value?.timerEnabled === true || room.value?.timerEnabled === 'true';
  
  if (!isTimerEnabled || !room.value?.timerStartTime || room.value?.timerDuration === null || room.value?.timerDuration === undefined) {
    timeRemaining.value = null;
    return;
  }
  
  // Tính toán dựa trên timerStartTime từ Firebase để đảm bảo đồng bộ
  // Tất cả client sẽ tính toán từ cùng một timerStartTime
  const elapsed = Math.floor((Date.now() - room.value.timerStartTime) / 1000);
  const remaining = Math.max(0, room.value.timerDuration - elapsed);
  timeRemaining.value = remaining;
  
  // Debug log (có thể xóa sau)
  if (remaining <= 10) {
    console.log('Timer remaining:', remaining, 'seconds', 'timerStartTime:', room.value.timerStartTime);
  }
};

const formatTimeRemaining = (seconds) => {
  if (seconds === null || seconds === undefined) return '--:--';
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const handleTimerExpired = async () => {
  if (timerExpired.value) return; // Already handled
  timerExpired.value = true;
  
  try {
    // Save results before kicking players out
    if (room.value && room.value.batchId) {
      // Save ranking
      await saveRanking(room.value.batchId, room.value.players || {});
      
      // Save session leaderboard
      if (sessionId.value && sessionStartTime.value) {
        const duration = Math.floor((Date.now() - sessionStartTime.value) / 1000);
        const now = new Date();
        const createdAt = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
        
        const sessionPlayers = {};
        Object.entries(room.value.players || {}).forEach(([playerId, playerData]) => {
          let correctCount = 0;
          Object.values(room.value.answers || {}).forEach(answer => {
            if (answer?.correct && answer?.answeredBy === playerId) {
              correctCount++;
            }
          });
          
          sessionPlayers[playerId] = {
            name: playerData.name,
            score: playerData.score || 0,
            correct: correctCount
          };
        });
        
        await saveSessionLeaderboard(room.value.batchId, sessionId.value, {
          createdAt,
          players: sessionPlayers,
          duration,
          endedBy: 'timer'
        });
      }
    }
    
    // Remove all players from room
    if (room.value?.players) {
      const playerIds = Object.keys(room.value.players);
      await Promise.all(playerIds.map(playerId => removePlayer(props.roomCode, playerId)));
    }
    
    // Show message and redirect after a delay
    setTimeout(() => {
      emit('back');
    }, 3000);
  } catch (error) {
    console.error('Error handling timer expiration:', error);
    // Still redirect even if save fails
    setTimeout(() => {
      emit('back');
    }, 3000);
  }
};

const handleLeaveRoom = () => {
  emit('back');
};

// Track các answer đã được xử lý để tránh cộng điểm nhiều lần
const processedAnswers = ref(new Set());

// Watch room answers để tự động cập nhật điểm khi có người khác trả lời đúng
watch(() => room.value?.answers, async (newAnswers, oldAnswers) => {
  if (!newAnswers || !room.value) return;

  // Kiểm tra từng answer mới
  Object.entries(newAnswers).forEach(async ([wordId, answerData]) => {
    if (!answerData?.correct || !answerData?.answeredBy) return;

    // Tạo key để track answer đã xử lý
    const answerKey = `${wordId}_${answerData.answeredBy}`;

    // Nếu đã xử lý rồi thì bỏ qua
    if (processedAnswers.value.has(answerKey)) return;

    // Đánh dấu đã xử lý
    processedAnswers.value.add(answerKey);

    // Lấy điểm hiện tại của người trả lời đúng
    const answeredByPlayerId = answerData.answeredBy;
    let currentScore = room.value.players?.[answeredByPlayerId]?.score || 0;

    // Đọc lại từ Firebase để đảm bảo chính xác
    try {
      const latestRoom = await getRoom(props.roomCode);
      if (latestRoom?.players?.[answeredByPlayerId]) {
        currentScore = latestRoom.players[answeredByPlayerId].score || 0;
      }
    } catch (e) {
      console.warn('Could not fetch latest room data for score update:', e);
    }

    // Cập nhật điểm cho người trả lời đúng
    const points = calculateScore(10);
    try {
      await updatePlayer(props.roomCode, answeredByPlayerId, {
        score: currentScore + points
      });
    } catch (error) {
      console.error('Error updating score for answered player:', error);
      // Nếu lỗi, xóa khỏi processed để có thể thử lại
      processedAnswers.value.delete(answerKey);
    }
  });
}, { deep: true });

onMounted(async () => {
  // Load batch
  unsubscribe = watchRoom(props.roomCode, async (roomData) => {
    room.value = roomData;
    
    // Debug timer settings (realtime sync)
    if (roomData) {
      const isTimerEnabled = roomData.timerEnabled === true || roomData.timerEnabled === 'true';
      const calculatedRemaining = isTimerEnabled && roomData.timerStartTime && roomData.timerDuration 
        ? Math.max(0, roomData.timerDuration - Math.floor((Date.now() - roomData.timerStartTime) / 1000))
        : null;
      console.log('Room data updated (realtime):', {
        timerEnabled: roomData.timerEnabled,
        isTimerEnabled: isTimerEnabled,
        timerDuration: roomData.timerDuration,
        timerStartTime: roomData.timerStartTime,
        currentTime: Date.now(),
        calculatedRemaining: calculatedRemaining,
        willShowTimer: isTimerEnabled
      });
    }
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

        // Đánh dấu các answer đã có sẵn là đã xử lý (tránh cộng điểm lại)
        if (roomData.answers) {
          Object.entries(roomData.answers).forEach(([wordId, answerData]) => {
            if (answerData?.correct && answerData?.answeredBy) {
              const answerKey = `${wordId}_${answerData.answeredBy}`;
              processedAnswers.value.add(answerKey);
            }
          });
        }

        // Lấy sessionId từ room (đã được tạo khi tạo room)
        if (!sessionId.value && roomData.sessionId) {
          sessionId.value = roomData.sessionId;
          sessionStartTime.value = roomData.sessionStartTime || Date.now();
        }

        // Start game timer
        if (gameTimer) clearInterval(gameTimer);
        gameTimer = setInterval(() => {
          if (!timerExpired.value) {
            gameTime.value++;
          }
        }, 1000);
      } catch (error) {
        console.error('Error loading batch:', error);
      }
    } else if (!roomData) {
      loading.value = false;
    }
    
    // Timer sẽ được xử lý bởi watch() ở trên để đảm bảo đồng bộ realtime
    // Không cần khởi tạo lại ở đây vì watch() sẽ tự động trigger khi room.value thay đổi
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
  if (gameTimer) clearInterval(gameTimer);
  if (timerCheckInterval) clearInterval(timerCheckInterval);
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
      // Đánh dấu answer này sẽ được xử lý bởi chính người chơi này
      // (để tránh watcher cộng điểm thêm lần nữa)
      const answerKey = `${wordId}_${props.playerId}`;
      processedAnswers.value.add(answerKey);

      // Submit answer to Firebase
      await submitAnswerToDb(props.roomCode, wordId, {
        answeredBy: props.playerId,
        correct: true,
        timestamp: Date.now()
      });

      // Lấy điểm hiện tại từ Firebase để đảm bảo tính chính xác
      // (tránh race condition khi trả lời nhiều câu liên tiếp)
      let currentScore = 0;
      try {
        const latestRoom = await getRoom(props.roomCode);
        if (latestRoom?.players?.[props.playerId]) {
          currentScore = latestRoom.players[props.playerId].score || 0;
        }
      } catch (e) {
        // Fallback: dùng giá trị từ room.value nếu không đọc được
        currentScore = room.value?.players?.[props.playerId]?.score || 0;
        console.warn('Could not fetch latest room data, using cached value:', e);
      }

      // Update player score
      const points = calculateScore(10);
      await updatePlayer(props.roomCode, props.playerId, {
        score: currentScore + points
      });

      // Clear status
      answerStatus.value[wordId] = null;
      answers.value[wordId] = '';
    } catch (error) {
      // Nếu lỗi, xóa khỏi processed để có thể thử lại
      const answerKey = `${wordId}_${props.playerId}`;
      processedAnswers.value.delete(answerKey);

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
    processedAnswers.value.clear(); // Reset processed answers khi bắt đầu round mới
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};
</script>
