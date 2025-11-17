<template>
  <div id="app">
    <Dashboard 
      v-if="currentView === 'dashboard'" 
      @create-room="handleCreateRoom"
      @join-room="currentView = 'join-room'"
    />
    <CreateRoom 
      v-else-if="currentView === 'create-room'" 
      :batch-id="selectedBatchId"
      @back="currentView = 'dashboard'"
      @room-created="handleRoomCreated"
    />
    <JoinRoom 
      v-else-if="currentView === 'join-room'"
      @back="currentView = 'dashboard'"
      @joined="handleJoined"
    />
    <GameRoom 
      v-else-if="currentView === 'game-room'"
      :room-code="roomCode"
      :player-id="playerId"
      :is-host="isHost"
      @back="handleLeaveRoom"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Dashboard from './components/Dashboard.vue';
import CreateRoom from './components/CreateRoom.vue';
import JoinRoom from './components/JoinRoom.vue';
import GameRoom from './components/GameRoom.vue';

const currentView = ref('dashboard');
const selectedBatchId = ref(null);
const roomCode = ref(null);
const playerId = ref(null);
const isHost = ref(false);

const handleCreateRoom = (batchId) => {
  selectedBatchId.value = batchId;
  currentView.value = 'create-room';
};

const handleRoomCreated = (code, id) => {
  roomCode.value = code;
  playerId.value = id;
  isHost.value = true;
  currentView.value = 'game-room';
};

const handleJoined = (code, id) => {
  roomCode.value = code;
  playerId.value = id;
  isHost.value = false;
  currentView.value = 'game-room';
};

const handleLeaveRoom = () => {
  roomCode.value = null;
  playerId.value = null;
  isHost.value = false;
  currentView.value = 'dashboard';
};
</script>

