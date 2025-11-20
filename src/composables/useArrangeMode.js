import { ref, computed, watch } from 'vue';

/**
 * Composable for managing arrange mode (drag & drop letters)
 */
export function useArrangeMode(room, batch) {
  const arrangedLetters = ref({}); // { wordId: ['a', 'b', 'c'] }
  const availableLetters = ref({}); // { wordId: ['c', 'a', 'b'] } - shuffled
  const dragState = ref({
    wordId: null,
    sourceIndex: null,
    isFromAvailable: false,
    isDragging: false
  });

  const isArrangeMode = computed(() => {
    console.log('room.value', room.value);
    
    return room.value?.gameMode === 'arrange';
  });

  /**
   * Shuffle array using Fisher-Yates algorithm
   */
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  /**
   * Initialize arrange mode for words
   */
  const initializeArrangeMode = (words, existingAnswers = {}) => {
    Object.keys(words).forEach(wordId => {
      // Only initialize if not already initialized and question not answered
      if (!existingAnswers?.[wordId]?.correct) {
        if (!availableLetters.value[wordId] || availableLetters.value[wordId].length === 0) {
          const word = words[wordId];
          const answer = word.answer.toLowerCase();

          // Shuffle letters
          const letters = answer.split('');
          let shuffledLetters = shuffleArray(letters);

          // Ensure it's actually shuffled (not the same order)
          let attempts = 0;
          while (shuffledLetters.join('') === answer && attempts < 10) {
            shuffledLetters = shuffleArray(letters);
            attempts++;
          }

          availableLetters.value[wordId] = [...shuffledLetters];
          if (!arrangedLetters.value[wordId] || arrangedLetters.value[wordId].length !== answer.length) {
            arrangedLetters.value[wordId] = new Array(answer.length).fill(null);
          }
        }
      }
    });

    // Force reactivity update
    availableLetters.value = { ...availableLetters.value };
  };

  /**
   * Handle drag start
   */
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

  /**
   * Handle drag end
   */
  const handleDragEnd = (event) => {
    event.target.style.opacity = '1';
    dragState.value.isDragging = false;
  };

  /**
   * Handle drop
   */
  const handleDrop = (event, wordId, slotIndex) => {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');

    if (!dragState.value.isDragging || dragState.value.wordId !== wordId) return;

    const { sourceIndex, isFromAvailable } = dragState.value;

    // Initialize arrays if needed
    if (!arrangedLetters.value[wordId]) {
      const wordLength = batch.value?.words?.[wordId]?.answer?.length || 0;
      arrangedLetters.value[wordId] = new Array(wordLength).fill(null);
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

    // Clean up: ensure proper length
    const wordLength = batch.value?.words?.[wordId]?.answer?.length || 0;
    if (wordLength > 0) {
      while (arrangedLetters.value[wordId].length < wordLength) {
        arrangedLetters.value[wordId].push(null);
      }
      arrangedLetters.value[wordId] = arrangedLetters.value[wordId].slice(0, wordLength);
    }

    dragState.value.isDragging = false;
  };

  /**
   * Check if arrangement is complete
   */
  const isArrangementComplete = (wordId, expectedLength) => {
    if (!arrangedLetters.value[wordId]) return false;
    const arranged = arrangedLetters.value[wordId].filter(char => char !== null && char !== undefined);
    return arranged.length === expectedLength;
  };

  return {
    arrangedLetters,
    availableLetters,
    isArrangeMode,
    initializeArrangeMode,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    isArrangementComplete
  };
}

