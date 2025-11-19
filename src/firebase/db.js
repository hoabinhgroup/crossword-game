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

export const removePlayer = async (roomCode, playerId) => {
  await remove(playerRef(roomCode, playerId));
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

// Rankings
export const rankingsRef = () => ref(database, 'rankings');
export const batchRankingRef = (batchId) => ref(database, `rankings/${batchId}`);

/**
 * Normalize tên người chơi để tạo key duy nhất
 * - Chuyển về lowercase
 * - Loại bỏ khoảng trắng thừa
 * - Loại bỏ các ký tự đặc biệt không cần thiết
 */
const normalizePlayerName = (name) => {
  if (!name) return '';
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '_') // Thay tất cả khoảng trắng bằng underscore
    .replace(/[^a-z0-9_]/g, '') // Loại bỏ ký tự đặc biệt, chỉ giữ chữ, số và underscore
    .replace(/_+/g, '_') // Loại bỏ underscore thừa
    .replace(/^_|_$/g, ''); // Loại bỏ underscore ở đầu và cuối
};

export const saveRanking = async (batchId, playersData) => {
  const rankingRef = batchRankingRef(batchId);
  const currentRanking = await getBatchRanking(batchId);
  
  const updatedPlayers = { ...(currentRanking?.players || {}) };
  
  // Cập nhật hoặc thêm thông tin người chơi
  // Sử dụng tên người chơi (đã normalize) làm key để nhóm các người chơi cùng tên
  Object.entries(playersData).forEach(([playerId, playerData]) => {
    const playerName = (playerData.name || '').trim();
    if (!playerName) return; // Bỏ qua nếu không có tên
    
    // Tạo key từ tên người chơi (normalize để nhóm các biến thể của cùng một tên)
    const playerKey = normalizePlayerName(playerName);
    if (!playerKey) return; // Bỏ qua nếu sau khi normalize không còn gì
    
    const currentScore = Number(playerData.score) || 0; // Đảm bảo là number
    const existing = updatedPlayers[playerKey];
    
    if (existing) {
      // Cập nhật thống kê cho người chơi đã tồn tại (cùng tên)
      const existingTotalScore = Number(existing.totalScore) || 0;
      const existingGamesPlayed = Number(existing.gamesPlayed) || 0;
      const existingBestScore = Number(existing.bestScore) || 0;
      
      updatedPlayers[playerKey] = {
        ...existing,
        name: playerName, // Giữ tên gốc (có thể có thay đổi chữ hoa/thường)
        totalScore: existingTotalScore + currentScore, // Cộng dồn điểm
        gamesPlayed: existingGamesPlayed + 1, // Tăng số lượt chơi
        bestScore: Math.max(existingBestScore, currentScore), // Cập nhật điểm tốt nhất
        lastScore: currentScore,
        lastPlayed: Date.now()
      };
    } else {
      // Thêm người chơi mới
      updatedPlayers[playerKey] = {
        name: playerName,
        totalScore: currentScore,
        gamesPlayed: 1,
        bestScore: currentScore,
        lastScore: currentScore,
        lastPlayed: Date.now()
      };
    }
  });
  
  await set(rankingRef, {
    players: updatedPlayers,
    lastUpdated: Date.now()
  });
};

export const getBatchRanking = async (batchId) => {
  const snapshot = await get(batchRankingRef(batchId));
  return snapshot.exists() ? snapshot.val() : null;
};

export const watchBatchRanking = (batchId, callback) => {
  const unsubscribe = onValue(batchRankingRef(batchId), (snapshot) => {
    const ranking = snapshot.exists() ? snapshot.val() : null;
    callback(ranking);
  });
  return () => off(batchRankingRef(batchId), 'value', unsubscribe);
};

export const resetBatchRanking = async (batchId) => {
  await remove(batchRankingRef(batchId));
};

export const getAllRankings = async () => {
  const snapshot = await get(rankingsRef());
  return snapshot.exists() ? snapshot.val() : {};
};

export const watchAllRankings = (callback) => {
  const unsubscribe = onValue(rankingsRef(), (snapshot) => {
    const rankings = snapshot.val() || {};
    callback(rankings);
  });
  return () => off(rankingsRef(), 'value', unsubscribe);
};

// Leaderboards (Session-based)
export const leaderboardsRef = () => ref(database, 'leaderboards');
export const batchLeaderboardsRef = (batchId) => ref(database, `leaderboards/${batchId}`);
export const sessionRef = (batchId, sessionId) => ref(database, `leaderboards/${batchId}/${sessionId}`);

/**
 * Tạo session ID từ timestamp
 * Format: session_YYYYMMDD_HHMMSS
 */
export const generateSessionId = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `session_${year}${month}${day}_${hours}${minutes}${seconds}`;
};

/**
 * Lưu session leaderboard
 * @param {string} batchId - ID của batch
 * @param {string} sessionId - ID của session
 * @param {object} sessionData - Dữ liệu session (createdAt, players, duration)
 */
export const saveSessionLeaderboard = async (batchId, sessionId, sessionData) => {
  await set(sessionRef(batchId, sessionId), sessionData);
};

/**
 * Lấy tất cả sessions của một batch
 * @param {string} batchId - ID của batch
 * @returns {Promise<object>} Object chứa tất cả sessions
 */
export const getBatchSessions = async (batchId) => {
  const snapshot = await get(batchLeaderboardsRef(batchId));
  return snapshot.exists() ? snapshot.val() : {};
};

/**
 * Watch sessions của một batch
 * @param {string} batchId - ID của batch
 * @param {function} callback - Callback function
 * @returns {function} Unsubscribe function
 */
export const watchBatchSessions = (batchId, callback) => {
  const unsubscribe = onValue(batchLeaderboardsRef(batchId), (snapshot) => {
    const sessions = snapshot.exists() ? snapshot.val() : {};
    callback(sessions);
  });
  return () => off(batchLeaderboardsRef(batchId), 'value', unsubscribe);
};

/**
 * Xóa một session
 * @param {string} batchId - ID của batch
 * @param {string} sessionId - ID của session
 */
export const deleteSession = async (batchId, sessionId) => {
  await remove(sessionRef(batchId, sessionId));
};

