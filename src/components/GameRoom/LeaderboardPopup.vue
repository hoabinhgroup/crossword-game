<template>
    <div class="leaderboard-popup-overlay" @click="$emit('close')">
        <div class="leaderboard-popup" @click.stop>
            <div class="leaderboard-popup-header">
                <h2>🏆 Bảng Xếp Hạng</h2>
                <button class="popup-close-btn" @click="$emit('close')">✕</button>
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
</template>

<script setup>
defineProps({
    sortedPlayers: { type: Object, default: () => ({}) }
});

defineEmits(['close']);
</script>
