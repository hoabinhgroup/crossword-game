<template>
  <div class="container">
    <h1>📚 Quản Lý Đợt Học</h1>

    <div class="form-group" v-if="showAddForm">
      <h2>{{ editingBatch ? 'Sửa Đợt Học' : 'Thêm Đợt Học Mới' }}</h2>

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
      <button @click="startAdd">+ Thêm Đợt Học Mới</button>
      <button class="secondary" @click="$emit('join-room')" style="margin-top: 10px;">
        🎮 Tham Gia Phòng
      </button>
    </div>

    <div v-if="loading" class="loading">Đang tải...</div>
    <div v-else-if="Object.keys(batches).length === 0" class="empty-state">
      <div class="empty-state-icon">📝</div>
      <p>Chưa có đợt học nào. Hãy thêm đợt học đầu tiên!</p>
    </div>
    <ul v-else class="batch-list">
      <li v-for="(batch, batchId) in batches" :key="batchId" class="batch-item">
        <div>
          <h3>{{ batch.title }}</h3>
          <p style="color: #666; font-size: 14px;">
            {{ Object.keys(batch.words || {}).length }} từ vựng
          </p>
        </div>
        <div class="batch-actions">
          <button class="btn-small success" @click="createRoom(batchId)">Tạo phòng</button>
          <button class="btn-small" @click="editBatch(batchId, batch)">Sửa</button>
          <button class="btn-small danger" @click="deleteBatch(batchId)">Xóa</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { watchBatches, createBatch, updateBatch, deleteBatch as deleteBatchFromDb } from '../firebase/db.js';
import { uploadImage } from '../firebase/storage.js';

const emit = defineEmits(['create-room', 'join-room']);

const batches = ref({});
const loading = ref(true);
const showAddForm = ref(false);
const editingBatch = ref(null);
const formData = ref({
  title: '',
  words: [{ clue: '', answer: '', imageUrl: '', imagePreview: '', uploading: false }]
});

let unsubscribe = null;

onMounted(() => {
  unsubscribe = watchBatches((data) => {
    batches.value = data;
    loading.value = false;
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
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

    // Upload lên Firebase Storage
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
  emit('create-room', batchId);
};
</script>
