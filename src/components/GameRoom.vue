<template>
  <div class="game-room-wrapper">
    <!-- Fixed Top Menu -->
    <div class="fixed-top-menu">
      <div class="top-menu-left">
        <!-- Timer -->
        <div v-if="room && (room.timerEnabled === true || room.timerEnabled === 'true')" class="top-menu-timer"
          :class="{ 'timer-warning': timeRemaining !== null && timeRemaining <= 60, 'timer-danger': timeRemaining !== null && timeRemaining <= 30 }">
          <span class="timer-icon-small">⏱️</span>
          <span v-if="room.timerStartTime && timeRemaining !== null && timeRemaining > 0" class="timer-time-small">{{
            formatTimeRemaining(timeRemaining) }}</span>
          <span v-else-if="room.timerStartTime && timeRemaining === 0" class="timer-time-small"
            style="color: #dc3545;">00:00</span>
          <span v-else class="timer-waiting-small">Chờ...</span>
        </div>
      </div>

      <div class="top-menu-center">
        <!-- Room Code -->
        <div class="top-menu-room-code">
          <!-- <span class="room-code-label">Mã phòng:</span> -->
          <span class="room-code-value">{{ roomCode }}</span>
        </div>
      </div>

      <div class="top-menu-right">
        <!-- Leaderboard Icon -->
        <button class="leaderboard-icon-btn" @click="showLeaderboardPopup = true" title="Bảng xếp hạng">
          <span class="leaderboard-icon">🏆</span>
          <span v-if="Object.keys(sortedPlayers).length > 0" class="leaderboard-badge">{{
            Object.keys(sortedPlayers).length }}</span>
        </button>
        <!-- Leave Room Button -->
        <button class="leave-room-btn" @click="handleLeaveRoom" title="Rời phòng">
          <span class="leave-room-icon">🚪</span>
        </button>
      </div>
    </div>

    <!-- Content với padding-top để tránh bị che bởi fixed menu -->
    <div class="game-room-content">
      <div v-if="loading" class="loading">Đang tải...</div>
      <div v-else-if="!room || !batch || !batch.words" class="error">Không tìm thấy phòng hoặc đợt học</div>
      <div v-else>
        <!-- Header -->
        <div class="container" style="margin-top: 0;">
          <h1>{{ batch.title }}</h1>
        </div>

        <!-- Game Summary (if game ended) -->
        <div v-if="gameEnded" class="container">
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
                <!-- Type Mode: Input field -->
                <div v-if="isArrangeMode" class="answer-input">
                  <input v-model="answers[wordId]" :placeholder="'_'.repeat(word.answer.length)"
                    :maxlength="word.answer.length" @keyup.enter="submitAnswer(wordId, word.answer)"
                    :disabled="room.answers?.[wordId]?.correct || timerExpired" />
                  <button @click="submitAnswer(wordId, word.answer)" :disabled="timerExpired">Gửi</button>
                </div>

                <!-- Arrange Mode: Letter arrangement with drag & drop -->
                <div v-else class="arrange-mode">
                  <div class="arrange-slots">
                    <div v-for="(slot, index) in word.answer.length" :key="`slot-${wordId}-${index}`"
                      class="letter-slot" :class="{ 'filled': arrangedLetters[wordId]?.[index] }"
                      @drop="handleDrop($event, wordId, index)" @dragover.prevent
                      @dragenter.prevent="(e) => e.currentTarget.classList.add('drag-over')"
                      @dragleave.prevent="(e) => e.currentTarget.classList.remove('drag-over')">
                      <div v-if="arrangedLetters[wordId]?.[index]" class="letter-box arranged draggable"
                        :draggable="true" @dragstart="handleDragStart($event, wordId, index)" @dragend="handleDragEnd">
                        {{ arrangedLetters[wordId][index].toUpperCase() }}
                      </div>
                      <span v-else class="slot-placeholder">{{ index + 1 }}</span>
                    </div>
                  </div>
                  <div class="available-letters" v-if="availableLetters[wordId] && availableLetters[wordId].length > 0">
                    <p style="font-size: 14px; color: #666; margin-bottom: 8px; text-align: center; width: 100%;">
                      Kéo các ký tự vào ô trống:
                    </p>
                    <div>
                      <div v-for="(char, index) in availableLetters[wordId]" :key="`available-${wordId}-${index}`"
                        class="letter-box available draggable" :draggable="true"
                        @dragstart="handleDragStart($event, wordId, index, true)" @dragend="handleDragEnd">
                        {{ char.toUpperCase() }}
                      </div>
                    </div>

                  </div>
                  <div v-else style="padding: 0px 20px; text-align: center; color: #999;">
                    <p></p>
                  </div>
                  <button @click="submitArrangedAnswer(wordId, word.answer)"
                    :disabled="!isArrangementComplete(wordId, word.answer.length) || timerExpired || room.answers?.[wordId]?.correct"
                    style="margin-top: 16px;">
                    Gửi
                  </button>
                </div>

                <div v-if="answerStatus[wordId]" class="answer-status"
                  :class="answerStatus[wordId].correct ? 'correct' : 'incorrect'">
                  {{ answerStatus[wordId].message }}
                </div>
              </div>
            </li>
          </ul>
        </div>

      </div>
    </div>

    <!-- Leaderboard Popup -->
    <div v-if="showLeaderboardPopup" class="leaderboard-popup-overlay" @click="showLeaderboardPopup = false">
      <div class="leaderboard-popup" @click.stop>
        <div class="leaderboard-popup-header">
          <h2>🏆 Bảng Xếp Hạng</h2>
          <button class="popup-close-btn" @click="showLeaderboardPopup = false">✕</button>
        </div>
        <div class="leaderboard-popup-content">
          <ul class="leaderboard">
            <li v-for="(player, playerId, index) in sortedPlayers" :key="playerId" class="leaderboard-item"
              :class="`rank-${Math.min(index + 1, 3)}`">
              <div style="display: flex; align-items: center; gap: 12px;">
                <span class="rank">#{{ index + 1 }}</span>
                <span class="player-name">{{ player.name }}</span>
              </div>
              <span class="player-score">{{ player.score }} điểm</span>
            </li>
            <li v-if="Object.keys(sortedPlayers).length === 0" class="leaderboard-empty">
              Chưa có người chơi
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.available-letters>div {
  display: flex;
  column-gap: 5px;
}
</style>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { watchRoom, getBatch, getRoom, submitAnswer as submitAnswerToDb, updatePlayer, updateRoom, saveRanking, generateSessionId, saveSessionLeaderboard, removePlayer } from '../firebase/db.js';
import { calculateScore, formatTime } from '../utils/helpers.js';

import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const props = defineProps({
  roomCode: {
    type: String,
    required: true
  },
  playerId: {
    type: String,
    required: true
  }
});

// Determine if current player is host
const isHost = computed(() => {
  return room.value?.hostId === props.playerId;
});

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
const showLeaderboardPopup = ref(false);

// Arrange mode state
const arrangedLetters = ref({}); // { wordId: ['a', 'b', 'c'] }
const availableLetters = ref({}); // { wordId: ['c', 'a', 'b'] } - shuffled
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

const isArrangeMode = computed(() => {
  const gameMode = room.value?.gameMode;
  console.log('GameMode check:', {
    gameMode,
    isArrange: gameMode === 'arrange',
    roomValue: room.value,
    availableLetters: availableLetters.value
  });
  return gameMode === 'arrange';
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
  arrangedLetters.value = {};
  availableLetters.value = {};
});

// Shuffle array function (Fisher-Yates algorithm)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Initialize arrange mode when room and batch are loaded
watch(() => [room.value?.gameMode, batch.value?.words], ([gameMode, words]) => {
  console.log('[Watch] GameMode changed:', {
    gameMode,
    hasWords: !!words,
    wordsKeys: words ? Object.keys(words) : [],
    roomValue: room.value
  });

  // Note: isArrangeMode === true means show INPUT, false means show ARRANGE
  // So we initialize when gameMode !== 'arrange' (i.e., when we want arrange UI)
  if (gameMode !== 'arrange' && words) {
    Object.keys(words).forEach(wordId => {
      // Only initialize if not already initialized and question not answered
      if (!room.value?.answers?.[wordId]?.correct) {
        // Check if not initialized or empty
        if (!availableLetters.value[wordId] || availableLetters.value[wordId].length === 0) {
          const word = words[wordId];
          const answer = word.answer.toLowerCase();

          console.log(`[Watch] Initializing arrange mode for wordId: ${wordId}, answer: ${answer}`);

          // Shuffle letters for arrange mode using Fisher-Yates algorithm
          const letters = answer.split('');
          let shuffledLetters = shuffleArray(letters);

          // Ensure it's actually shuffled (not the same order)
          let attempts = 0;
          while (shuffledLetters.join('') === answer && attempts < 10) {
            shuffledLetters = shuffleArray(letters);
            attempts++;
          }

          // Force reactivity by creating new array
          availableLetters.value[wordId] = [...shuffledLetters];
          // Initialize with null array of correct length if not exists
          if (!arrangedLetters.value[wordId] || arrangedLetters.value[wordId].length !== answer.length) {
            arrangedLetters.value[wordId] = new Array(answer.length).fill(null);
          }

          console.log(`[Watch] Shuffled "${answer}" to "${shuffledLetters.join('')}" for wordId: ${wordId}`);
          console.log(`[Watch] Available letters for ${wordId}:`, availableLetters.value[wordId]);
          console.log(`[Watch] Full availableLetters object:`, availableLetters.value);

          // Force reactivity update
          availableLetters.value = { ...availableLetters.value };
        } else {
          console.log(`[Watch] Already initialized for wordId: ${wordId}`, availableLetters.value[wordId]);
        }
      }
    });
  } else {
    console.log('[Watch] Not arranging - gameMode:', gameMode, 'hasWords:', !!words);
  }
}, { immediate: true, deep: true });

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
      isHost: isHost.value
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
        isHost: isHost.value
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
          isHost: isHost.value
        });
      } else if (!isTimerEnabled) {
        console.log('Timer not enabled', {
          playerId: props.playerId,
          isHost: isHost.value
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
      router.push('/');
    }, 3000);
  } catch (error) {
    console.error('Error handling timer expiration:', error);
    // Still redirect even if save fails
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }
};

const handleLeaveRoom = async () => {
  if (confirm('Bạn có chắc muốn rời phòng? Kết quả của bạn sẽ được lưu vào bảng xếp hạng.')) {
    try {
      // Lưu kết quả của người chơi vào leaderboard trước khi rời phòng
      if (room.value?.batchId && room.value?.players?.[props.playerId]) {
        const currentPlayer = room.value.players[props.playerId];

        // Tạo object chỉ chứa player hiện tại để lưu ranking
        const playerDataForRanking = {
          [props.playerId]: {
            name: currentPlayer.name,
            score: currentPlayer.score || 0
          }
        };

        // Lưu xếp hạng tổng hợp (tích lũy) cho người chơi này
        await saveRanking(room.value.batchId, playerDataForRanking);

        console.log('Player ranking saved before leaving room:', {
          playerId: props.playerId,
          playerName: currentPlayer.name,
          score: currentPlayer.score
        });
      }

      // Remove player from room
      if (room.value?.players?.[props.playerId]) {
        await removePlayer(props.roomCode, props.playerId);
      }
    } catch (error) {
      console.error('Error saving ranking or removing player:', error);
      // Vẫn cho phép rời phòng ngay cả khi có lỗi
    }
    // Navigate back to dashboard
    router.push('/');
  }
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

            // Initialize arrange mode if needed
            // Note: isArrangeMode === true means show INPUT, false means show ARRANGE
            // So we initialize when gameMode !== 'arrange' (i.e., when we want arrange UI)
            if (roomData.gameMode !== 'arrange') {
              const word = batch.value.words[wordId];
              const answer = word.answer.toLowerCase();

              console.log(`[onMounted] Initializing arrange for wordId: ${wordId}, answer: ${answer}`);

              // Shuffle letters for arrange mode using Fisher-Yates algorithm
              const letters = answer.split('');
              let shuffledLetters = shuffleArray(letters);

              // Ensure it's actually shuffled (not the same order)
              let attempts = 0;
              while (shuffledLetters.join('') === answer && attempts < 10) {
                shuffledLetters = shuffleArray(letters);
                attempts++;
              }

              // Force reactivity by creating new array
              availableLetters.value[wordId] = [...shuffledLetters];
              // Initialize with null array of correct length
              arrangedLetters.value[wordId] = new Array(answer.length).fill(null);

              console.log(`[onMounted] Shuffled "${answer}" to "${shuffledLetters.join('')}" for wordId: ${wordId}`);
              console.log(`[onMounted] Available letters set:`, availableLetters.value[wordId]);
              console.log(`[onMounted] Full availableLetters:`, availableLetters.value);
            }
          });

          // Force reactivity update after all words are initialized
          if (roomData.gameMode !== 'arrange') {
            console.log('[onMounted] Force updating availableLetters reactivity');
            availableLetters.value = { ...availableLetters.value };
          }
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

// Arrange mode state
const dragState = ref({
  wordId: null,
  sourceIndex: null,
  isFromAvailable: false,
  isDragging: false
});

// Arrange mode functions - Drag & Drop
const handleDragStart = (event, wordId, index, isFromAvailable = false) => {
  dragState.value = {
    wordId,
    sourceIndex: index,
    isFromAvailable,
    isDragging: true
  };
  event.dataTransfer.effectAllowed = 'move';
  event.target.style.opacity = '0.5';
};

const handleDragEnd = (event) => {
  event.target.style.opacity = '1';
  dragState.value.isDragging = false;
};

const handleDrop = (event, wordId, slotIndex) => {
  event.preventDefault();
  event.currentTarget.classList.remove('drag-over');

  if (!dragState.value.isDragging || dragState.value.wordId !== wordId) return;

  const { sourceIndex, isFromAvailable } = dragState.value;

  // Initialize arrays if needed
  if (!arrangedLetters.value[wordId]) {
    arrangedLetters.value[wordId] = new Array(wordId.length).fill(null);
  }
  if (!availableLetters.value[wordId]) {
    availableLetters.value[wordId] = [];
  }

  let letter;

  if (isFromAvailable) {
    // Dragging from available letters
    if (sourceIndex >= availableLetters.value[wordId].length) return;
    letter = availableLetters.value[wordId][sourceIndex];

    // If slot is already filled, return letter to available
    if (arrangedLetters.value[wordId][slotIndex]) {
      const oldLetter = arrangedLetters.value[wordId][slotIndex];
      availableLetters.value[wordId][sourceIndex] = oldLetter;
    } else {
      availableLetters.value[wordId].splice(sourceIndex, 1);
    }

    arrangedLetters.value[wordId][slotIndex] = letter;
  } else {
    // Dragging from arranged slots
    if (sourceIndex >= arrangedLetters.value[wordId].length || !arrangedLetters.value[wordId][sourceIndex]) return;
    letter = arrangedLetters.value[wordId][sourceIndex];

    // If target slot is filled, swap
    if (arrangedLetters.value[wordId][slotIndex]) {
      const oldLetter = arrangedLetters.value[wordId][slotIndex];
      arrangedLetters.value[wordId][sourceIndex] = oldLetter;
    } else {
      arrangedLetters.value[wordId][sourceIndex] = null;
    }

    arrangedLetters.value[wordId][slotIndex] = letter;
  }

  // Clean up: remove nulls and ensure proper length
  const wordLength = batch.value?.words?.[wordId]?.answer?.length || 0;
  if (wordLength > 0) {
    // Ensure array has correct length
    while (arrangedLetters.value[wordId].length < wordLength) {
      arrangedLetters.value[wordId].push(null);
    }
    arrangedLetters.value[wordId] = arrangedLetters.value[wordId].slice(0, wordLength);
  }

  dragState.value.isDragging = false;
};

const isArrangementComplete = (wordId, expectedLength) => {
  if (!arrangedLetters.value[wordId]) return false;
  const arranged = arrangedLetters.value[wordId].filter(char => char !== null && char !== undefined);
  return arranged.length === expectedLength;
};

const submitArrangedAnswer = async (wordId, correctAnswer) => {
  if (!arrangedLetters.value[wordId]) return;

  // Check if already answered
  if (room.value?.answers?.[wordId]?.correct) {
    return;
  }

  const userAnswer = arrangedLetters.value[wordId]
    .filter(char => char !== null && char !== undefined)
    .join('')
    .toLowerCase()
    .trim();

  const expectedAnswer = correctAnswer.toLowerCase().trim();
  const isCorrect = userAnswer === expectedAnswer;

  console.log('[submitArrangedAnswer]', {
    wordId,
    userAnswer,
    expectedAnswer,
    isCorrect,
    arrangedLetters: arrangedLetters.value[wordId]
  });

  if (isCorrect) {
    try {
      const answerKey = `${wordId}_${props.playerId}`;
      processedAnswers.value.add(answerKey);

      await submitAnswerToDb(props.roomCode, wordId, {
        answeredBy: props.playerId,
        correct: true,
        timestamp: Date.now()
      });

      let currentScore = 0;
      try {
        const latestRoom = await getRoom(props.roomCode);
        if (latestRoom?.players?.[props.playerId]) {
          currentScore = latestRoom.players[props.playerId].score || 0;
        }
      } catch (e) {
        currentScore = room.value?.players?.[props.playerId]?.score || 0;
        console.warn('Could not fetch latest room data, using cached value:', e);
      }

      const points = calculateScore(10);
      await updatePlayer(props.roomCode, props.playerId, {
        score: currentScore + points
      });

      answerStatus.value[wordId] = null;
      // Clear arranged letters
      arrangedLetters.value[wordId] = [];
    } catch (error) {
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
      message: '❌ Sai rồi! Hãy sắp xếp lại.'
    };
    setTimeout(() => {
      answerStatus.value[wordId] = null;
    }, 2000);
  }
};

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
  if (!playerId) return 'Unknown';
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
