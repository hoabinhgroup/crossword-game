/**
 * Sound effects utility
 * Uses HTML5 Audio API to play sound files
 */

// Sound file paths
const SOUNDS = {
  success: '/sounds/success.mp3',
  error: '/sounds/error.mp3',
  timerWarning: '/sounds/timer-warning.mp3',
  timerDanger: '/sounds/timer-danger.mp3',
  gameEnd: '/sounds/game-end.mp3'
};

// Cache for audio objects to avoid reloading
const audioCache = {};

/**
 * Get or create audio object
 * @param {string} soundKey - Key from SOUNDS object
 * @returns {HTMLAudioElement}
 */
function getAudio(soundKey) {
  if (!audioCache[soundKey]) {
    const audio = new Audio(SOUNDS[soundKey]);
    audio.preload = 'auto';
    audioCache[soundKey] = audio;
  }
  return audioCache[soundKey];
}

/**
 * Play a sound file
 * @param {string} soundKey - Key from SOUNDS object
 * @param {number} volume - Volume (0-1), default 0.7
 */
function playSound(soundKey, volume = 0.7) {
  try {
    const audio = getAudio(soundKey);
    audio.volume = volume;
    audio.currentTime = 0; // Reset to start
    audio.play().catch(error => {
      // Handle autoplay restrictions
      console.warn(`Could not play sound ${soundKey}:`, error);
    });
  } catch (error) {
    console.warn(`Error playing sound ${soundKey}:`, error);
  }
}

/**
 * Play success sound (correct answer)
 */
export function playSuccessSound() {
  playSound('success', 0.8);
}

/**
 * Play error sound (wrong answer)
 */
export function playErrorSound() {
  playSound('error', 0.6);
}

/**
 * Play timer warning sound (≤ 60 seconds)
 */
export function playTimerWarningSound() {
  playSound('timerWarning', 0.5);
}

/**
 * Play timer danger sound (≤ 30 seconds)
 */
export function playTimerDangerSound() {
  playSound('timerDanger', 0.7);
}

/**
 * Play game end sound
 */
export function playGameEndSound() {
  playSound('gameEnd', 0.8);
}
