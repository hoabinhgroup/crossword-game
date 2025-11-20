import { GITHUB_CONFIG } from '../config/github.js';

/**
 * Chuyển File sang Base64
 * @param {File} file - File cần chuyển đổi
 * @returns {Promise<string>} Base64 string
 */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Upload hình ảnh lên GitHub và trả về jsDelivr CDN URL
 * @param {File} file - File hình ảnh cần upload
 * @param {string} path - Đường dẫn lưu trữ trong repo (optional, mặc định là 'images/')
 * @returns {Promise<string>} URL từ jsDelivr CDN
 */
export const uploadImage = async (file, path = 'images/') => {
  try {
    // Kiểm tra GitHub token
    if (!GITHUB_CONFIG.token || GITHUB_CONFIG.token === '') {
      throw new Error('Chưa cấu hình GitHub token. Vui lòng:\n1. Tạo file .env từ .env.example\n2. Thêm VITE_GITHUB_TOKEN vào file .env\n3. Khởi động lại ứng dụng (npm run dev)');
    }
    
    // Kiểm tra token có format hợp lệ không (bắt đầu bằng ghp_ hoặc github_pat_)
    if (!GITHUB_CONFIG.token.startsWith('ghp_') && !GITHUB_CONFIG.token.startsWith('github_pat_')) {
      console.warn('GitHub token có vẻ không đúng format. Token thường bắt đầu bằng "ghp_" hoặc "github_pat_"');
    }

    // Kiểm tra kích thước file (GitHub giới hạn 100MB, nhưng nên giới hạn nhỏ hơn)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('Hình ảnh quá lớn! Vui lòng chọn file nhỏ hơn 10MB');
    }

    // Tạo tên file unique
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileName = `${timestamp}_${randomString}_${file.name}`;
    const filePath = `${path}${fileName}`;

    // Chuyển file sang base64
    const base64 = await fileToBase64(file);
    const base64Content = base64.split(',')[1]; // Bỏ phần data:image/...;base64,

    // Upload lên GitHub
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.repo}/contents/${filePath}`;
    
    // Xác định format Authorization header dựa trên loại token
    // Classic tokens: token ghp_xxx
    // Fine-grained tokens: Bearer github_pat_xxx
    const authHeader = GITHUB_CONFIG.token.startsWith('github_pat_') 
      ? `Bearer ${GITHUB_CONFIG.token}`
      : `token ${GITHUB_CONFIG.token}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Upload image: ${file.name}`,
        content: base64Content,
        branch: GITHUB_CONFIG.branch
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Xử lý lỗi bad credentials
      if (response.status === 401) {
        throw new Error('GitHub token không hợp lệ hoặc đã hết hạn. Vui lòng kiểm tra lại VITE_GITHUB_TOKEN trong file .env và khởi động lại ứng dụng.');
      }
      
      // Xử lý lỗi không tìm thấy repository
      if (response.status === 404) {
        throw new Error(`Không tìm thấy repository: ${GITHUB_CONFIG.repo}. Vui lòng kiểm tra lại VITE_GITHUB_REPO trong file .env.`);
      }
      
      // Nếu file đã tồn tại, thử update
      if (response.status === 422 && errorData.message?.includes('already exists')) {
        // Lấy SHA của file hiện tại để update
        const getResponse = await fetch(`https://api.github.com/repos/${GITHUB_CONFIG.repo}/contents/${filePath}`, {
          headers: {
            'Authorization': authHeader,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (getResponse.ok) {
          const fileData = await getResponse.json();
          const updateResponse = await fetch(url, {
            method: 'PUT',
            headers: {
              'Authorization': authHeader,
              'Content-Type': 'application/json',
              'Accept': 'application/vnd.github.v3+json'
            },
            body: JSON.stringify({
              message: `Update image: ${file.name}`,
              content: base64Content,
              sha: fileData.sha,
              branch: GITHUB_CONFIG.branch
            })
          });

          if (!updateResponse.ok) {
            const updateError = await updateResponse.json().catch(() => ({}));
            throw new Error(updateError.message || 'Không thể cập nhật hình ảnh');
          }
        } else {
          throw new Error(errorData.message || 'Không thể upload hình ảnh');
        }
      } else {
        throw new Error(errorData.message || 'Không thể upload hình ảnh');
      }
    }

    // Trả về URL từ jsDelivr CDN
    // Format: https://cdn.jsdelivr.net/gh/{user}/{repo}@{branch}/{path}
    const jsDelivrUrl = `https://cdn.jsdelivr.net/gh/${GITHUB_CONFIG.repo}@${GITHUB_CONFIG.branch}/${filePath}`;
    return jsDelivrUrl;
  } catch (error) {
    console.error('Error uploading image to GitHub:', error);
    throw new Error('Không thể upload hình ảnh: ' + error.message);
  }
};

/**
 * Xóa hình ảnh khỏi GitHub
 * @param {string} filePath - Đường dẫn file trong repo (từ jsDelivr URL hoặc path)
 */
export const deleteImage = async (filePath) => {
  try {
    if (!GITHUB_CONFIG.token) {
      throw new Error('Chưa cấu hình GitHub token');
    }

    // Nếu là jsDelivr URL, extract path
    if (filePath.includes('cdn.jsdelivr.net')) {
      const match = filePath.match(/gh\/[^@]+@[^/]+\/(.+)$/);
      if (match) {
        filePath = match[1];
      } else {
        throw new Error('Không thể parse đường dẫn từ URL');
      }
    }

    // Xác định format Authorization header
    const authHeader = GITHUB_CONFIG.token.startsWith('github_pat_') 
      ? `Bearer ${GITHUB_CONFIG.token}`
      : `token ${GITHUB_CONFIG.token}`;
    
    // Lấy SHA của file để xóa
    const getUrl = `https://api.github.com/repos/${GITHUB_CONFIG.repo}/contents/${filePath}`;
    const getResponse = await fetch(getUrl, {
      headers: {
        'Authorization': authHeader,
        'Accept': 'application/vnd.github.v3+json'
      }
    });

    if (!getResponse.ok) {
      throw new Error('Không tìm thấy file để xóa');
    }

    const fileData = await getResponse.json();

    // Xóa file
    const deleteUrl = `https://api.github.com/repos/${GITHUB_CONFIG.repo}/contents/${filePath}`;
    const deleteResponse = await fetch(deleteUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json'
      },
      body: JSON.stringify({
        message: `Delete image: ${filePath}`,
        sha: fileData.sha,
        branch: GITHUB_CONFIG.branch
      })
    });

    if (!deleteResponse.ok) {
      const errorData = await deleteResponse.json().catch(() => ({}));
      throw new Error(errorData.message || 'Không thể xóa hình ảnh');
    }
  } catch (error) {
    console.error('Error deleting image from GitHub:', error);
    throw new Error('Không thể xóa hình ảnh: ' + error.message);
  }
};

