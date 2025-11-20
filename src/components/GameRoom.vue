<template>
  <div class="game-room-wrapper">
    <!-- Fixed Top Menu -->
    <div class="fixed-top-menu">
      <div class="top-menu-left">
        <div v-if="room && isTimerEnabled" class="top-menu-timer"
          :class="{ 'timer-warning': timeRemaining !== null && timeRemaining <= 60, 'timer-danger': timeRemaining !== null && timeRemaining <= 30 }">
          <span class="timer-icon-small">⏱️</span>
          <span v-if="room.timerStartTime && timeRemaining !== null && timeRemaining > 0" class="timer-time-small">
            {{ formatTimeRemaining(timeRemaining) }}
          </span>
          <span v-else-if="room.timerStartTime && timeRemaining === 0" class="timer-time-small" style="color: #dc3545;">
            00:00
          </span>
          <span v-else class="timer-waiting-small">Chờ...</span>
        </div>
      </div>

      <div class="top-menu-center">
        <div class="top-menu-room-code">
          <span class="room-code-value">{{ roomCode }}</span>
        </div>
      </div>

      <div class="top-menu-right">
        <button class="leaderboard-icon-btn" @click="showLeaderboardPopup = true" title="Bảng xếp hạng">
          <span class="leaderboard-icon">🏆</span>
          <span v-if="Object.keys(sortedPlayers).length > 0" class="leaderboard-badge">
            {{ Object.keys(sortedPlayers).length }}
          </span>
        </button>
        <button class="leave-room-btn" @click="handleLeaveRoom" title="Rời phòng">
          <span class="leave-room-icon">🚪</span>
        </button>
      </div>
    </div>

    <!-- Content -->
    <div class="game-room-content">
      <div v-if="loading" class="loading">Đang tải...</div>
      <div v-else-if="!room || !batch || !batch.words" class="error">Không tìm thấy phòng hoặc đợt học</div>
      <div v-else>
        <!-- Header -->
        <div class="container" style="margin-top: 0;">
          <h1>{{ batch.title }}</h1>
        </div>

        <!-- Game Summary (if game ended) -->
        <GameSummary v-if="gameEnded" :batch="batch" :room="room" :game-time="gameTime" :timer-expired="timerExpired"
          :is-host="isHost" :get-player-name="getPlayerName" @leave-room="handleLeaveRoom"
          @start-new-round="startNewRound" />

        <!-- Questions -->
        <div v-else>
          <h2>📝 Câu Hỏi</h2>
          <ul class="question-list">
            <QuestionItem v-for="(word, wordId) in batch.words" :key="wordId" :word="word" :word-id="wordId"
              :room="room" :is-arrange-mode="isArrangeMode" :arranged-letters="arrangedLetters"
              :available-letters="availableLetters" :answer-status="answerStatus" :timer-expired="timerExpired"
              :answers="answers" :is-arrangement-complete="isArrangementComplete(wordId, word.answer.length)"
              :get-player-name="getPlayerName" @submit-answer="submitAnswer"
              @submit-arranged-answer="submitArrangedAnswer" @drag-start="handleDragStart" @drag-end="handleDragEnd"
              @drop="handleDrop" @update:answers="(newAnswers) => { answers = newAnswers }" />
          </ul>
        </div>
      </div>
    </div>

    <!-- Leaderboard Popup -->
    <LeaderboardPopup v-if="showLeaderboardPopup" :sorted-players="sortedPlayers"
      @close="showLeaderboardPopup = false" />
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
import { useRouter, useRoute } from 'vue-router';
import {
  watchRoom,
  getBatch,
  getRoom,
  submitAnswer as submitAnswerToDb,
  updatePlayer,
  updateRoom,
  saveRanking,
  saveSessionLeaderboard,
  removePlayer
} from '../firebase/db.js';
import { calculateScore, formatTime } from '../utils/helpers.js';
import { formatDateTime, calculateSessionPlayers } from '../utils/gameHelpers.js';
import { useGameTimer } from '../composables/useGameTimer.js';
import { useArrangeMode } from '../composables/useArrangeMode.js';
import { useAnswerSubmission } from '../composables/useAnswerSubmission.js';
import { useGameState } from '../composables/useGameState.js';
import GameSummary from './GameRoom/GameSummary.vue';
import QuestionItem from './GameRoom/QuestionItem.vue';
import LeaderboardPopup from './GameRoom/LeaderboardPopup.vue';

const route = useRoute();
const router = useRouter();

// ============================================================================
// PROPS & INITIAL STATE
// ============================================================================
const props = defineProps({
  roomCode: { type: String, required: true },
  playerId: { type: String, required: true }
});

const loading = ref(true);
const room = ref(null);
const batch = ref(null);
const answers = ref({});
const answerStatus = ref({});
const gameTime = ref(0);
const showLeaderboardPopup = ref(false);

// ============================================================================
// COMPOSABLES
// ============================================================================
const {
  timeRemaining,
  timerExpired,
  isTimerEnabled,
  formatTimeRemaining,
  handleTimerExpired
} = useGameTimer(room);

const {
  arrangedLetters,
  availableLetters,
  isArrangeMode,
  initializeArrangeMode,
  handleDragStart,
  handleDragEnd,
  handleDrop,
  isArrangementComplete
} = useArrangeMode(room, batch);

const {
  submitAnswer,
  submitArrangedAnswer: submitArrangedAnswerHandler
} = useAnswerSubmission(
  props,
  room,
  answers,
  answerStatus,
  arrangedLetters
);

const {
  sortedPlayers,
  gameEnded,
  isHost,
  getPlayerName
} = useGameState(room, batch, timerExpired, computed(() => props.playerId));

// ============================================================================
// GAME STATE MANAGEMENT
// ============================================================================
const sessionId = ref(null);
const sessionStartTime = ref(null);
const rankingSaved = ref(false);
const lastSavedRoomCode = ref(null);
const processedAnswers = ref(new Set());
let gameTimer = null;
let unsubscribe = null;

// ============================================================================
// WATCHERS
// ============================================================================

// Watch game end and save ranking
watch(() => gameEnded.value, async (ended) => {
  if (ended && room.value?.batchId) {
    const roomKey = `${room.value.batchId}_${props.roomCode}`;
    if (rankingSaved.value && lastSavedRoomCode.value === roomKey) return;

    try {
      await saveGameResults(room.value, sessionId.value, sessionStartTime.value);
      rankingSaved.value = true;
      lastSavedRoomCode.value = roomKey;
    } catch (error) {
      console.error('Error saving ranking:', error);
    }
  }
});

// Reset state when room changes
watch(() => props.roomCode, () => {
  resetGameState();
});

// Watch room answers to update scores
watch(() => room.value?.answers, async (newAnswers) => {
  if (!newAnswers || !room.value) return;
  await updateScoresForNewAnswers(newAnswers);
}, { deep: true });

// Watch game mode and batch to initialize arrange mode
watch(() => [room.value?.gameMode, batch.value?.words], ([gameMode, words]) => {
  if (gameMode !== 'arrange' && words) {
    initializeArrangeMode(words, room.value?.answers);
  }
}, { immediate: true, deep: true });

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Save game results to leaderboard
 */
async function saveGameResults(roomData, sessionIdValue, sessionStartTimeValue) {
  // Save overall ranking
  await saveRanking(roomData.batchId, roomData.players || {});

  // Save session leaderboard
  if (sessionIdValue && sessionStartTimeValue) {
    const duration = Math.floor((Date.now() - sessionStartTimeValue) / 1000);
    const createdAt = formatDateTime(new Date());
    const sessionPlayers = calculateSessionPlayers(roomData);

    await saveSessionLeaderboard(roomData.batchId, sessionIdValue, {
      createdAt,
      players: sessionPlayers,
      duration
    });
  }
}


/**
 * Update scores for new correct answers
 */
async function updateScoresForNewAnswers(newAnswers) {
  for (const [wordId, answerData] of Object.entries(newAnswers)) {
    if (!answerData?.correct || !answerData?.answeredBy) continue;

    const answerKey = `${wordId}_${answerData.answeredBy}`;
    if (processedAnswers.value.has(answerKey)) continue;

    processedAnswers.value.add(answerKey);

    try {
      const answeredByPlayerId = answerData.answeredBy;
      let currentScore = room.value.players?.[answeredByPlayerId]?.score || 0;

      // Fetch latest score from Firebase
      try {
        const latestRoom = await getRoom(props.roomCode);
        if (latestRoom?.players?.[answeredByPlayerId]) {
          currentScore = latestRoom.players[answeredByPlayerId].score || 0;
        }
      } catch (e) {
        console.warn('Could not fetch latest room data for score update:', e);
      }

      const points = calculateScore(10);
      await updatePlayer(props.roomCode, answeredByPlayerId, {
        score: currentScore + points
      });
    } catch (error) {
      console.error('Error updating score for answered player:', error);
      processedAnswers.value.delete(answerKey);
    }
  }
}

/**
 * Reset game state when room changes
 */
function resetGameState() {
  rankingSaved.value = false;
  lastSavedRoomCode.value = null;
  processedAnswers.value.clear();
  sessionId.value = null;
  sessionStartTime.value = null;
  arrangedLetters.value = {};
  availableLetters.value = {};
}

/**
 * Initialize batch data
 */
async function initializeBatch(roomData) {
  if (!roomData?.batchId) return;

  try {
    batch.value = await getBatch(roomData.batchId);
    loading.value = false;

    if (batch.value?.words) {
      // Initialize answers object
      Object.keys(batch.value.words).forEach(wordId => {
        answers.value[wordId] = '';
      });

      // Initialize arrange mode if needed
      if (roomData.gameMode !== 'arrange') {
        initializeArrangeMode(batch.value.words, roomData.answers);
      }
    }

    // Mark existing answers as processed
    if (roomData.answers) {
      Object.entries(roomData.answers).forEach(([wordId, answerData]) => {
        if (answerData?.correct && answerData?.answeredBy) {
          const answerKey = `${wordId}_${answerData.answeredBy}`;
          processedAnswers.value.add(answerKey);
        }
      });
    }

    // Get session info
    if (!sessionId.value && roomData.sessionId) {
      sessionId.value = roomData.sessionId;
      sessionStartTime.value = roomData.sessionStartTime || Date.now();
    }

    // Start game timer
    startGameTimer();
  } catch (error) {
    console.error('Error loading batch:', error);
    loading.value = false;
  }
}

/**
 * Start game timer
 */
function startGameTimer() {
  if (gameTimer) clearInterval(gameTimer);
  gameTimer = setInterval(() => {
    if (!timerExpired.value) {
      gameTime.value++;
    }
  }, 1000);
}

/**
 * Handle leave room
 */
async function handleLeaveRoom() {
  if (!confirm('Bạn có chắc muốn rời phòng? Kết quả của bạn sẽ được lưu vào bảng xếp hạng.')) {
    return;
  }

  try {
    // Save player ranking before leaving
    if (room.value?.batchId && room.value?.players?.[props.playerId]) {
      const currentPlayer = room.value.players[props.playerId];
      const playerDataForRanking = {
        [props.playerId]: {
          name: currentPlayer.name,
          score: currentPlayer.score || 0
        }
      };
      await saveRanking(room.value.batchId, playerDataForRanking);
    }

    // Remove player from room
    if (room.value?.players?.[props.playerId]) {
      await removePlayer(props.roomCode, props.playerId);
    }
  } catch (error) {
    console.error('Error saving ranking or removing player:', error);
  }

  router.push('/');
}

/**
 * Start new round
 */
async function startNewRound() {
  if (!confirm('Bắt đầu vòng chơi mới? Điểm số sẽ được reset.')) {
    return;
  }

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

  if (batch.value?.words) {
    Object.keys(batch.value.words).forEach(wordId => {
      resetData.answers[wordId] = null;
    });
  }

  try {
    await updateRoom(props.roomCode, resetData);
    gameTime.value = 0;
    answers.value = {};
    answerStatus.value = {};
    processedAnswers.value.clear();
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
}

// Wrapper for submitArrangedAnswer to match component interface
const submitArrangedAnswer = (wordId, correctAnswer) => {
  submitArrangedAnswerHandler(wordId, correctAnswer);
};

// ============================================================================
// LIFECYCLE HOOKS
// ============================================================================
onMounted(async () => {
  unsubscribe = watchRoom(props.roomCode, async (roomData) => {
    room.value = roomData;

    if (roomData && !batch.value) {
      await initializeBatch(roomData);
    } else if (!roomData) {
      loading.value = false;
    }
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
  if (gameTimer) clearInterval(gameTimer);
});
</script>
