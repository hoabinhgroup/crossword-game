import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../components/Dashboard.vue';
import CreateRoom from '../components/CreateRoom.vue';
import JoinRoom from '../components/JoinRoom.vue';
import GameRoom from '../components/GameRoom.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/create-room/:batchId',
    name: 'create-room',
    component: CreateRoom,
    props: true
  },
  {
    path: '/join-room',
    name: 'join-room',
    component: JoinRoom
  },
  {
    path: '/game/:roomCode/:playerId',
    name: 'game-room',
    component: GameRoom,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

