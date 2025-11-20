import { getRoom, submitAnswer as submitAnswerToDb, updatePlayer } from '../firebase/db.js';
import { calculateScore } from '../utils/helpers.js';
import { triggerConfetti } from '../utils/confetti.js';
import { playSuccessSound, playErrorSound } from '../utils/sounds.js';

/**
 * Composable for handling answer submission
 */
export function useAnswerSubmission(props, room, answers, answerStatus, arrangedLetters) {
  /**
   * Submit answer (type mode)
   */
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
    if (room.value?.answers?.[wordId]?.correct) {
      return;
    }

    const isCorrect = userAnswer === correctAnswer.toLowerCase();

    if (isCorrect) {
      try {
        const answerKey = `${wordId}_${props.playerId}`;

        await submitAnswerToDb(props.roomCode, wordId, {
          answeredBy: props.playerId,
          correct: true,
          timestamp: Date.now()
        });

        // Get current score from Firebase
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

        // Play success sound and trigger confetti
        playSuccessSound();
        triggerConfetti();

        answerStatus.value[wordId] = null;
        answers.value[wordId] = '';
      } catch (error) {
        answerStatus.value[wordId] = {
          correct: false,
          message: 'Lỗi: ' + error.message
        };
      }
    } else {
      // Play error sound for wrong answer
      playErrorSound();
      
      answerStatus.value[wordId] = {
        correct: false,
        message: '❌ Sai rồi! Hãy thử lại.'
      };
      setTimeout(() => {
        answerStatus.value[wordId] = null;
      }, 2000);
    }
  };

  /**
   * Submit arranged answer (arrange mode)
   */
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

    if (isCorrect) {
      try {
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

        // Play success sound and trigger confetti
        playSuccessSound();
        triggerConfetti();

        answerStatus.value[wordId] = null;
        arrangedLetters.value[wordId] = [];
      } catch (error) {
        answerStatus.value[wordId] = {
          correct: false,
          message: 'Lỗi: ' + error.message
        };
      }
    } else {
      // Play error sound for wrong answer
      playErrorSound();
      
      answerStatus.value[wordId] = {
        correct: false,
        message: '❌ Sai rồi! Hãy sắp xếp lại.'
      };
      setTimeout(() => {
        answerStatus.value[wordId] = null;
      }, 2000);
    }
  };

  return {
    submitAnswer,
    submitArrangedAnswer
  };
}

