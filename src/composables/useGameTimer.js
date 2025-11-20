import { ref, computed, watch } from 'vue';
import { getRoom, saveRanking, saveSessionLeaderboard, removePlayer } from '../firebase/db.js';
import { useRouter } from 'vue-router';
import { playTimerWarningSound, playTimerDangerSound, playGameEndSound } from '../utils/sounds.js';

/**
 * Composable for managing game timer
 */
export function useGameTimer(room) {
  const router = useRouter();
  const timeRemaining = ref(null);
  const timerExpired = ref(false);
  let timerCheckInterval = null;

  const isTimerEnabled = computed(() => {
    return room.value?.timerEnabled === true || room.value?.timerEnabled === 'true';
  });

  /**
   * Format time remaining as MM:SS
   */
  const formatTimeRemaining = (seconds) => {
    if (seconds === null || seconds === undefined) return '--:--';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Track previous remaining time to detect transitions
  let previousRemaining = null;
  let lastWarningSound = 0;
  let lastDangerSound = 0;

  /**
   * Update time remaining based on room data
   */
  const updateTimeRemaining = () => {
    const isTimerEnabledValue = isTimerEnabled.value;

    if (!isTimerEnabledValue || !room.value?.timerStartTime || 
        room.value?.timerDuration === null || room.value?.timerDuration === undefined) {
      timeRemaining.value = null;
      previousRemaining = null;
      return;
    }

    const elapsed = Math.floor((Date.now() - room.value.timerStartTime) / 1000);
    const remaining = Math.max(0, room.value.timerDuration - elapsed);
    timeRemaining.value = remaining;

    // Play warning sounds when crossing thresholds
    const now = Date.now();
    
    // Play danger sound when entering last 30 seconds (only once)
    if (remaining <= 30 && remaining > 0 && (previousRemaining === null || previousRemaining > 30)) {
      if (now - lastDangerSound > 1000) {
        playTimerDangerSound();
        lastDangerSound = now;
      }
    }
    // Play warning sound when entering last 60 seconds (only once)
    else if (remaining <= 60 && remaining > 30 && (previousRemaining === null || previousRemaining > 60)) {
      if (now - lastWarningSound > 1000) {
        playTimerWarningSound();
        lastWarningSound = now;
      }
    }

    previousRemaining = remaining;
  };

  /**
   * Handle timer expiration
   */
  const handleTimerExpired = async () => {
    if (timerExpired.value) return;
    timerExpired.value = true;

    // Play game end sound
    playGameEndSound();

    try {
      // Save results before handling expiration
      if (room.value && room.value.batchId) {
        await saveRanking(room.value.batchId, room.value.players || {});
      }

      // Remove all players from room
      if (room.value?.players) {
        const playerIds = Object.keys(room.value.players);
        await Promise.all(playerIds.map(playerId => removePlayer(room.value.roomCode || '', playerId)));
      }

      // Redirect after delay
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('Error handling timer expiration:', error);
      setTimeout(() => {
        router.push('/');
      }, 3000);
    }
  };

  /**
   * Format date time for session
   */
  function formatDateTime(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Watch timer and calculate remaining time
  watch(() => [room.value?.timerEnabled, room.value?.timerStartTime, room.value?.timerDuration],
    ([enabled, startTime, duration]) => {
      if (timerCheckInterval) {
        clearInterval(timerCheckInterval);
        timerCheckInterval = null;
      }

      const isTimerEnabledValue = enabled === true || enabled === 'true';

      if (isTimerEnabledValue && startTime && duration !== null && duration !== undefined) {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const remaining = Math.max(0, duration - elapsed);
        timeRemaining.value = remaining;

        if (remaining <= 0 && !timerExpired.value) {
          handleTimerExpired();
          return;
        }

        timerCheckInterval = setInterval(() => {
          updateTimeRemaining();
          if (timeRemaining.value !== null && timeRemaining.value <= 0 && !timerExpired.value) {
            handleTimerExpired();
          }
        }, 1000);
      } else {
        timeRemaining.value = null;
      }
    },
    { immediate: true }
  );

  return {
    timeRemaining,
    timerExpired,
    isTimerEnabled,
    formatTimeRemaining,
    handleTimerExpired
  };
}

