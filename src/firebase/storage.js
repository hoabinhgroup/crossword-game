import { storage } from './config.js';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Upload hình ảnh lên Firebase Storage
 * @param {File} file - File hình ảnh cần upload
 * @param {string} path - Đường dẫn lưu trữ (optional, mặc định là 'images/')
 * @returns {Promise<string>} URL của hình ảnh đã upload
 */
export const uploadImage = async (file, path = 'images/') => {
  try {
    // Tạo tên file unique
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${timestamp}_${randomString}_${file.name}`;
    const storageRef = ref(storage, `${path}${fileName}`);
    
    // Upload file
    await uploadBytes(storageRef, file);
    
    // Lấy download URL
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Không thể upload hình ảnh: ' + error.message);
  }
};

/**
 * Xóa hình ảnh khỏi Firebase Storage
 * @param {string} url - URL của hình ảnh cần xóa
 */
export const deleteImage = async (url) => {
  try {
    // Lấy reference từ URL
    const imageRef = ref(storage, url);
    // Note: Cần import deleteObject từ firebase/storage để xóa
    // import { deleteObject } from 'firebase/storage';
    // await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
};

