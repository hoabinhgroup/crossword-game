import { computed } from 'vue';

/**
 * Composable for managing game state
 */
export function useGameState(room, batch, timerExpired, playerId) {
  /**
   * Get sorted players by score
   */
  const sortedPlayers = computed(() => {
    if (!room.value?.players) return {};
    return Object.entries(room.value.players)
      .sort(([, a], [, b]) => b.score - a.score)
      .reduce((acc, [id, player]) => {
        acc[id] = player;
        return acc;
      }, {});
  });

  /**
   * Check if game has ended
   */
  const gameEnded = computed(() => {
    if (timerExpired.value) return true;
    if (!room.value || !batch.value || !batch.value.words || !room.value.answers) return false;
    const words = Object.keys(batch.value.words);
    if (words.length === 0) return false;
    return words.every(wordId => room.value.answers?.[wordId]?.correct);
  });

  /**
   * Check if current player is host
   */
  const isHost = computed(() => {
    return room.value?.hostId === playerId.value;
  });

  /**
   * Get player name by ID
   */
  const getPlayerName = (playerIdValue) => {
    if (!playerIdValue) return 'Unknown';
    return room.value?.players?.[playerIdValue]?.name || 'Unknown';
  };

  return {
    sortedPlayers,
    gameEnded,
    isHost,
    getPlayerName
  };
}

