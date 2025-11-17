import { database } from './config.js';
import { ref, set, get, push, update, onValue, off, remove } from 'firebase/database';

// Batches
export const batchesRef = () => ref(database, 'batches');
export const batchRef = (batchId) => ref(database, `batches/${batchId}`);

export const createBatch = async (batchData) => {
  const newBatchRef = push(batchesRef());
  await set(newBatchRef, batchData);
  return newBatchRef.key;
};

export const updateBatch = async (batchId, batchData) => {
  await update(batchRef(batchId), batchData);
};

export const deleteBatch = async (batchId) => {
  await remove(batchRef(batchId));
};

export const getBatch = async (batchId) => {
  const snapshot = await get(batchRef(batchId));
  return snapshot.exists() ? snapshot.val() : null;
};

export const watchBatches = (callback) => {
  const unsubscribe = onValue(batchesRef(), (snapshot) => {
    const batches = snapshot.val() || {};
    callback(batches);
  });
  return () => off(batchesRef(), 'value', unsubscribe);
};

// Rooms
export const roomsRef = () => ref(database, 'rooms');
export const roomRef = (roomCode) => ref(database, `rooms/${roomCode}`);

export const createRoom = async (roomCode, roomData) => {
  await set(roomRef(roomCode), roomData);
};

export const updateRoom = async (roomCode, updates) => {
  await update(roomRef(roomCode), updates);
};

export const getRoom = async (roomCode) => {
  const snapshot = await get(roomRef(roomCode));
  return snapshot.exists() ? snapshot.val() : null;
};

export const watchRoom = (roomCode, callback) => {
  const unsubscribe = onValue(roomRef(roomCode), (snapshot) => {
    const room = snapshot.exists() ? snapshot.val() : null;
    callback(room);
  });
  return () => off(roomRef(roomCode), 'value', unsubscribe);
};

// Players
export const playerRef = (roomCode, playerId) => ref(database, `rooms/${roomCode}/players/${playerId}`);

export const addPlayer = async (roomCode, playerId, playerData) => {
  await set(playerRef(roomCode, playerId), playerData);
};

export const updatePlayer = async (roomCode, playerId, updates) => {
  await update(playerRef(roomCode, playerId), updates);
};

// Answers
export const answerRef = (roomCode, wordId) => ref(database, `rooms/${roomCode}/answers/${wordId}`);

export const submitAnswer = async (roomCode, wordId, answerData) => {
  await set(answerRef(roomCode, wordId), answerData);
};

// Generate room code (5 characters: 3 letters + 2 numbers)
export const generateRoomCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let code = '';
  for (let i = 0; i < 3; i++) {
    code += letters[Math.floor(Math.random() * letters.length)];
  }
  for (let i = 0; i < 2; i++) {
    code += numbers[Math.floor(Math.random() * numbers.length)];
  }
  return code;
};

