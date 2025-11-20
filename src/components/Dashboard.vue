<template>
  <div class="container">
    <h1>📚 Quản Lý Bài Học</h1>

    <div class="form-group" v-if="showAddForm">
      <h2>{{ editingBatch ? 'Sửa Đợt Học' : 'Thêm Bài Học Mới' }}</h2>

      <label>Tên đợt học:</label>
      <input v-model="formData.title" placeholder="VD: Unit 1 - School Things" />

      <label>Từ vựng:</label>
      <div v-for="(word, index) in formData.words" :key="index" class="word-item">
        <input v-model="word.clue" :placeholder="`Gợi ý ${index + 1}`" />
        <input v-model="word.answer" :placeholder="`Đáp án ${index + 1}`" style="text-transform: uppercase" />

        <!-- Upload hình ảnh -->
        <div class="image-upload-section">
          <label class="image-upload-label">
            <input type="file" accept="image/*" @change="handleImageUpload($event, index)" style="display: none"
              :id="`image-input-${index}`" />
            <span class="image-upload-btn">📷 Chọn hình ảnh</span>
          </label>

          <div v-if="word.imagePreview" class="image-preview">
            <img :src="word.imagePreview" alt="Preview" />
            <button type="button" class="btn-small danger" @click="removeImage(index)" style="margin-top: 8px;">
              Xóa ảnh
            </button>
          </div>

          <div v-if="word.uploading" class="upload-status">
            ⏳ Đang upload...
          </div>
        </div>

        <button class="btn-small danger" @click="removeWord(index)">Xóa từ</button>
      </div>

      <button class="secondary" @click="addWord">+ Thêm từ</button>

      <div class="btn-group">
        <button @click="saveBatch">{{ editingBatch ? 'Cập nhật' : 'Lưu' }}</button>
        <button class="secondary" @click="cancelEdit">Hủy</button>
      </div>
    </div>

    <div v-else>
      <button @click="startAdd">+ Thêm Chủ đề</button>
      <button class="secondary" @click="showSpecialTestModal = true" style="margin-top: 10px;">
        🎯 Tạo chủ đề ngẫu nhiên
      </button>
      <button class="secondary" @click="router.push('/join-room')" style="margin-top: 10px;">
        🎮 Tham Gia Phòng
      </button>
    </div>

    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="Object.keys(batches).length === 0" class="empty-state">
      <div class="empty-state-icon">📝</div>
      <p>Chưa có bài học nào. Hãy thêm bài học đầu tiên!</p>
    </div>
    <ul v-else class="batch-list">
      <li v-for="(batch, batchId) in batches" :key="batchId" class="batch-item">
        <div>
          <h3>{{ batch.title }}</h3>
          <p style="color: #666; font-size: 14px;">
            {{ Object.keys(batch.words || {}).length }} từ vựng
            <span v-if="rankings[batchId]" style="margin-left: 12px; color: #667eea;">
              • {{ Object.keys(rankings[batchId].players || {}).length }} người chơi
            </span>
          </p>
        </div>
        <div class="batch-actions">
          <button class="action-icon-btn" @click="viewRanking(batchId)" v-if="rankings[batchId]" title="Xếp hạng">
            <span class="action-icon">🏆</span>
            <span class="action-label">Xếp hạng</span>
          </button>
          <button class="action-icon-btn success" @click="createRoom(batchId)" title="Tạo phòng">
            <span class="action-icon">🎮</span>
            <span class="action-label">Chơi</span>
          </button>
          <button class="action-icon-btn" @click="editBatch(batchId, batch)" title="Sửa">
            <span class="action-icon">✏️</span>
            <span class="action-label">Sửa</span>
          </button>
          <button class="action-icon-btn danger" @click="deleteBatch(batchId)" title="Xóa">
            <span class="action-icon">🗑️</span>
            <span class="action-label">Xóa</span>
          </button>
        </div>
      </li>
    </ul>

    <!-- Special Test Modal -->
    <div v-if="showSpecialTestModal" class="modal-overlay" @click="showSpecialTestModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>🎯 Tạo Bài Thi Đặc Biệt</h2>
          <button class="modal-close-btn" @click="showSpecialTestModal = false" title="Đóng">✕</button>
        </div>


        <div class="modal-body">
          <div class="form-group">
            <label>Tên bài thi:</label>
            <input v-model="specialTestForm.title" placeholder="VD: Bài Thi Tổng Hợp - 10 Từ" />
          </div>

          <div class="form-group">
            <label>Số từ ngẫu nhiên:</label>
            <input type="number" v-model.number="specialTestForm.wordCount" min="1" max="50" placeholder="10" />
            <p>
              Chọn số từ vựng sẽ được chọn ngẫu nhiên từ các bài học đã chọn
            </p>
          </div>

          <div class="form-group">
            <label>Chọn bài học nguồn:</label>
            <div v-if="Object.keys(batches).length === 0"
              style="color: #999; font-style: italic; padding: 20px; text-align: center;">
              Chưa có bài học nào
            </div>
            <div v-else class="batch-selection-list">
              <div v-for="(batch, batchId) in batches" :key="batchId" class="batch-selection-item"
                :class="{ selected: specialTestForm.selectedBatches.includes(batchId) }"
                @click="toggleBatchSelection(batchId)">
                <input type="checkbox" :value="batchId" v-model="specialTestForm.selectedBatches" @click.stop
                  @change="toggleBatchSelection(batchId)" />
                <div class="batch-info">
                  <strong>{{ batch.title }}</strong>
                  <span>({{ Object.keys(batch.words || {}).length }} từ)</span>
                </div>
              </div>
            </div>
            <div style="margin-top: 12px; display: flex; gap: 8px;">
              <button class="btn-small secondary" @click="selectAllBatches">
                Chọn tất cả
              </button>
              <button class="btn-small secondary" @click="deselectAllBatches">
                Bỏ chọn tất cả
              </button>
            </div>
          </div>

          <div v-if="specialTestFormTotalWords > 0" class="info-box">
            <p>
              📊 Tổng số từ có thể chọn: <strong>{{ specialTestFormTotalWords }} từ</strong>
              <span v-if="specialTestForm.wordCount > specialTestFormTotalWords" class="warning">
                ⚠️ Số từ yêu cầu lớn hơn số từ có sẵn
              </span>
            </p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="secondary" @click="showSpecialTestModal = false">Hủy</button>
          <button @click="createSpecialTest"
            :disabled="!specialTestForm.title.trim() || specialTestForm.wordCount < 1 || specialTestForm.selectedBatches.length === 0 || specialTestForm.wordCount > specialTestFormTotalWords">
            Tạo Bài Thi
          </button>
        </div>
      </div>
    </div>

    <!-- Ranking Modal -->
    <div v-if="showRankingModal" class="modal-overlay" @click="showRankingModal = false">
      <div class="modal-content" @click.stop>
        <div class="modal-header">
          <h2>🏆 Xếp Hạng: {{ selectedBatchTitle }}</h2>
          <button class="modal-close-btn" @click="showRankingModal = false" title="Đóng">✕</button>
        </div>

        <!-- Sessions History -->
        <div class="modal-body">
          <div class="sessions-list">
            <div v-if="Object.keys(sessions).length === 0" class="empty-state">
              <p>Chưa có session nào</p>
            </div>
            <div v-else>
              <div v-for="(session, sessionId) in sortedSessions" :key="sessionId" class="session-item">
                <div class="session-header">
                  <div>
                    <h4>{{ session.createdAt }}</h4>
                    <p>Thời gian: {{ formatTime(session.duration || 0) }}</p>
                  </div>
                  <button class="btn-small danger" @click="deleteSessionHandler(sessionId)">
                    Xóa
                  </button>
                </div>
                <ul class="leaderboard" style="margin: 0;">
                  <li v-for="(player, playerId, index) in getSortedSessionPlayers(session.players)" :key="playerId"
                    class="leaderboard-item" :class="`rank-${Math.min(index + 1, 3)}`" style="margin-bottom: 8px;">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <span class="rank">#{{ index + 1 }}</span>
                      <span class="player-name">{{ player.name }}</span>
                    </div>
                    <div style="text-align: right;">
                      <span class="player-score">{{ player.score }} điểm</span>
                      <div style="font-size: 12px; color: #666;">{{ player.correct }} câu đúng</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="secondary" @click="showRankingModal = false">Đóng</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.batch-item input {
  flex: .1;
  margin-bottom: 0px;
}

.batch-item>div {
  flex: 9;
}

.batch-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-icon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 8px 6px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  transition: all 0.2s;
  min-width: 60px;
}

.action-icon-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-icon-btn.success {
  background: #f0fff4;
}

.action-icon-btn.success:hover {
  background: #e0ffe0;
  border-color: #28a745;
}

.action-icon-btn.danger {

  background: #fff5f5;
}

.action-icon-btn.danger:hover {
  background: #ffe0e0;
  border-color: #dc3545;
}

.action-icon {
  font-size: 24px;
  line-height: 1;
}

.action-label {
  font-size: 10px;
  color: #666;
  font-weight: 500;
  text-align: center;
}

.action-icon-btn.success .action-label {
  color: #28a745;
}

.action-icon-btn.danger .action-label {
  color: #dc3545;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 24px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
  position: relative;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-content h2 {
  margin: 0 0 24px 0;
  font-size: 22px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
}

.modal-close-btn {
  background: #f0f0f0;
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 18px;
  color: #666;
  padding: 0;
  margin: 0;
}

.modal-close-btn:hover {
  background: #e0e0e0;
  transform: rotate(90deg);
}

.modal-body {
  margin-bottom: 24px;
}

.modal-footer {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  padding-top: 16px;
  border-top: 2px solid #f0f0f0;
}

.modal-footer button {
  margin: 0;
  min-width: 120px;
}

/* Special Test Modal specific styles */
.modal-content .form-group {
  margin-bottom: 20px;
}

.modal-content .form-group label {
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
  display: block;
}

.modal-content .form-group input[type="number"],
.modal-content .form-group input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.modal-content .form-group input:focus {
  outline: none;
  border-color: #667eea;
}

.modal-content .form-group p {
  font-size: 12px;
  color: #666;
  margin-top: 6px;
  line-height: 1.5;
}

.batch-selection-list {
  max-height: 300px;
  overflow-y: auto;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px;
  background: #fafafa;
}

.batch-selection-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  border-radius: 8px;
  margin-bottom: 8px;
  transition: all 0.2s;
  background: white;
  border: 2px solid transparent;
}

.batch-selection-item:hover {
  background: #f8f9fa;
  border-color: #e0e0e0;
}

.batch-selection-item input[type="checkbox"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 0;
  flex-shrink: 0;
}

.batch-selection-item.selected {
  background: #f0f4ff;
  border-color: #667eea;
}

.batch-selection-item .batch-info {
  flex: 1;
}

.batch-selection-item .batch-info strong {
  display: block;
  color: #333;
  margin-bottom: 4px;
}

.batch-selection-item .batch-info span {
  color: #666;
  font-size: 12px;
}

.info-box {
  background: #f0f4ff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  border-left: 4px solid #667eea;
}

.info-box p {
  margin: 0;
  color: #667eea;
  font-weight: 500;
  line-height: 1.6;
}

.info-box .warning {
  color: #dc3545;
  margin-left: 8px;
}

/* Ranking Modal specific styles */
.sessions-list {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px;
}

.session-item {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 12px;
  border-left: 4px solid #667eea;
}

.session-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 12px;
}

.session-header h4 {
  margin: 0 0 4px 0;
  color: #333;
  font-size: 16px;
}

.session-header p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

/* Scrollbar styling */
.modal-content::-webkit-scrollbar,
.batch-selection-list::-webkit-scrollbar,
.sessions-list::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track,
.batch-selection-list::-webkit-scrollbar-track,
.sessions-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb,
.batch-selection-list::-webkit-scrollbar-thumb,
.sessions-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover,
.batch-selection-list::-webkit-scrollbar-thumb:hover,
.sessions-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Responsive */
@media (max-width: 640px) {
  .modal-content {
    padding: 20px;
    max-height: 95vh;
  }

  .modal-content h2 {
    font-size: 20px;
  }

  .modal-footer {
    flex-direction: column;
  }

  .modal-footer button {
    width: 100%;
  }
}
</style>
<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import { watchBatches, createBatch, updateBatch, deleteBatch as deleteBatchFromDb, watchAllRankings, watchBatchSessions, deleteSession } from '../firebase/db.js';
import { uploadImage } from '../firebase/storage.js';
import { formatTime } from '../utils/helpers.js';

import { useRouter } from 'vue-router';

const router = useRouter();

const batches = ref({});
const rankings = ref({});
const loading = ref(true);
const showAddForm = ref(false);
const editingBatch = ref(null);
const showRankingModal = ref(false);
const selectedBatchId = ref(null);
const selectedBatchTitle = ref('');
const sessions = ref({});
let sessionsUnsubscribe = null;
const formData = ref({
  title: '',
  words: [{ clue: '', answer: '', imageUrl: '', imagePreview: '', uploading: false }]
});

// Special Test Modal
const showSpecialTestModal = ref(false);
const specialTestForm = ref({
  title: '',
  wordCount: 10,
  selectedBatches: []
});

let unsubscribe = null;
let rankingsUnsubscribe = null;

onMounted(() => {
  unsubscribe = watchBatches((data) => {
    batches.value = data;
    loading.value = false;
  });

  rankingsUnsubscribe = watchAllRankings((data) => {
    rankings.value = data;
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
  if (rankingsUnsubscribe) rankingsUnsubscribe();
  if (sessionsUnsubscribe) sessionsUnsubscribe();
});

const startAdd = () => {
  formData.value = {
    title: '',
    words: [{ clue: '', answer: '', imageUrl: '', imagePreview: '', uploading: false }]
  };
  editingBatch.value = null;
  showAddForm.value = true;
};

const cancelEdit = () => {
  showAddForm.value = false;
  editingBatch.value = null;
  formData.value = {
    title: '',
    words: [{ clue: '', answer: '', imageUrl: '', imagePreview: '', uploading: false }]
  };
};

const addWord = () => {
  formData.value.words.push({ clue: '', answer: '', imageUrl: '', imagePreview: '', uploading: false });
};

const removeWord = (index) => {
  formData.value.words.splice(index, 1);
};

const handleImageUpload = async (event, index) => {
  const file = event.target.files[0];
  if (!file) return;

  // Kiểm tra kích thước file (tối đa 5MB)
  if (file.size > 5 * 1024 * 1024) {
    alert('Hình ảnh quá lớn! Vui lòng chọn file nhỏ hơn 5MB');
    return;
  }

  // Kiểm tra loại file
  if (!file.type.startsWith('image/')) {
    alert('Vui lòng chọn file hình ảnh');
    return;
  }

  const word = formData.value.words[index];
  word.uploading = true;

  try {
    // Tạo preview
    const reader = new FileReader();
    reader.onload = (e) => {
      word.imagePreview = e.target.result;
    };
    reader.readAsDataURL(file);

    // Upload lên GitHub và lấy jsDelivr CDN URL
    const imageUrl = await uploadImage(file, 'word-images/');
    word.imageUrl = imageUrl;
    word.uploading = false;
  } catch (error) {
    alert('Lỗi upload hình ảnh: ' + error.message);
    word.uploading = false;
    word.imagePreview = '';
    word.imageUrl = '';
    // Reset input
    const input = document.getElementById(`image-input-${index}`);
    if (input) {
      input.value = '';
    }
  }
};

const removeImage = (index) => {
  const word = formData.value.words[index];
  word.imageUrl = '';
  word.imagePreview = '';
  // Reset input
  const input = document.getElementById(`image-input-${index}`);
  if (input) {
    input.value = '';
  }
};

const saveBatch = async () => {
  if (!formData.value.title.trim()) {
    alert('Vui lòng nhập tên đợt học');
    return;
  }

  const words = formData.value.words
    .filter(w => w.clue.trim() && w.answer.trim())
    .reduce((acc, word, index) => {
      acc[`w${index + 1}`] = {
        clue: word.clue.trim(),
        answer: word.answer.trim().toLowerCase(),
        ...(word.imageUrl && { imageUrl: word.imageUrl })
      };
      return acc;
    }, {});

  if (Object.keys(words).length === 0) {
    alert('Vui lòng thêm ít nhất một từ vựng');
    return;
  }

  try {
    const batchData = {
      title: formData.value.title.trim(),
      words
    };

    if (editingBatch.value) {
      await updateBatch(editingBatch.value, batchData);
    } else {
      await createBatch(batchData);
    }

    cancelEdit();
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};

const editBatch = (batchId, batch) => {
  editingBatch.value = batchId;
  formData.value = {
    title: batch.title,
    words: Object.values(batch.words || {}).map(w => ({
      clue: w.clue,
      answer: w.answer,
      imageUrl: w.imageUrl || '',
      imagePreview: w.imageUrl || '',
      uploading: false
    }))
  };
  if (formData.value.words.length === 0) {
    formData.value.words = [{ clue: '', answer: '', imageUrl: '', imagePreview: '', uploading: false }];
  }
  showAddForm.value = true;
};

const deleteBatch = async (batchId) => {
  if (confirm('Bạn có chắc muốn xóa đợt học này?')) {
    try {
      await deleteBatchFromDb(batchId);
    } catch (error) {
      alert('Lỗi: ' + error.message);
    }
  }
};

const createRoom = (batchId) => {
  router.push(`/create-room/${batchId}`);
};

const viewRanking = async (batchId) => {
  selectedBatchId.value = batchId;
  selectedBatchTitle.value = batches.value[batchId]?.title || '';
  showRankingModal.value = true;

  // Load sessions
  if (sessionsUnsubscribe) sessionsUnsubscribe();
  sessionsUnsubscribe = watchBatchSessions(batchId, (data) => {
    sessions.value = data || {};
  });
};

const sortedSessions = computed(() => {
  return Object.entries(sessions.value)
    .sort(([, a], [, b]) => {
      // Sắp xếp theo thời gian tạo (mới nhất trước)
      const timeA = a.createdAt || '';
      const timeB = b.createdAt || '';
      return timeB.localeCompare(timeA);
    })
    .reduce((acc, [id, session]) => {
      acc[id] = session;
      return acc;
    }, {});
});

const getSortedSessionPlayers = (players) => {
  if (!players) return [];
  return Object.entries(players)
    .sort(([, a], [, b]) => b.score - a.score)
    .reduce((acc, [id, player]) => {
      acc[id] = player;
      return acc;
    }, {});
};

const deleteSessionHandler = async (sessionId) => {
  if (!selectedBatchId.value) return;
  if (!confirm('Bạn có chắc muốn xóa session này?')) {
    return;
  }

  try {
    await deleteSession(selectedBatchId.value, sessionId);
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};

// Cleanup khi đóng modal
watch(() => showRankingModal.value, (isOpen) => {
  if (!isOpen && sessionsUnsubscribe) {
    sessionsUnsubscribe();
    sessionsUnsubscribe = null;
  }
});

// Special Test Functions
const selectAllBatches = () => {
  specialTestForm.value.selectedBatches = Object.keys(batches.value);
};

const deselectAllBatches = () => {
  specialTestForm.value.selectedBatches = [];
};

const toggleBatchSelection = (batchId) => {
  const index = specialTestForm.value.selectedBatches.indexOf(batchId);
  if (index > -1) {
    specialTestForm.value.selectedBatches.splice(index, 1);
  } else {
    specialTestForm.value.selectedBatches.push(batchId);
  }
};

const specialTestFormTotalWords = computed(() => {
  let total = 0;
  specialTestForm.value.selectedBatches.forEach(batchId => {
    const batch = batches.value[batchId];
    if (batch && batch.words) {
      total += Object.keys(batch.words).length;
    }
  });
  return total;
});

const createSpecialTest = async () => {
  if (!specialTestForm.value.title.trim()) {
    alert('Vui lòng nhập tên bài thi');
    return;
  }

  if (specialTestForm.value.wordCount < 1) {
    alert('Số từ phải lớn hơn 0');
    return;
  }

  if (specialTestForm.value.selectedBatches.length === 0) {
    alert('Vui lòng chọn ít nhất một bài học');
    return;
  }

  if (specialTestForm.value.wordCount > specialTestFormTotalWords.value) {
    alert(`Số từ yêu cầu (${specialTestForm.value.wordCount}) lớn hơn số từ có sẵn (${specialTestFormTotalWords.value})`);
    return;
  }

  try {
    // Thu thập tất cả từ từ các batch được chọn
    const allWords = [];
    specialTestForm.value.selectedBatches.forEach(batchId => {
      const batch = batches.value[batchId];
      if (batch && batch.words) {
        Object.values(batch.words).forEach(word => {
          allWords.push({ ...word });
        });
      }
    });

    if (allWords.length === 0) {
      alert('Không tìm thấy từ vựng nào từ các bài học đã chọn');
      return;
    }

    // Shuffle array (Fisher-Yates algorithm)
    const shuffled = [...allWords];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Chọn N từ đầu tiên
    const selectedWords = shuffled.slice(0, specialTestForm.value.wordCount);

    // Tạo batch mới
    const words = selectedWords.reduce((acc, word, index) => {
      acc[`w${index + 1}`] = {
        clue: word.clue,
        answer: word.answer,
        ...(word.imageUrl && { imageUrl: word.imageUrl })
      };
      return acc;
    }, {});

    const batchData = {
      title: specialTestForm.value.title.trim(),
      words
    };

    await createBatch(batchData);

    // Reset form và đóng modal
    specialTestForm.value = {
      title: '',
      wordCount: 10,
      selectedBatches: []
    };
    showSpecialTestModal.value = false;
    alert(`Đã tạo bài thi "${batchData.title}" với ${selectedWords.length} từ vựng!`);
  } catch (error) {
    alert('Lỗi: ' + error.message);
  }
};
</script>
