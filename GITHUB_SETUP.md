# Cấu hình GitHub + jsDelivr CDN cho Upload Hình Ảnh

Ứng dụng sử dụng **GitHub API** để upload hình ảnh và **jsDelivr CDN** để phân phối hình ảnh.

## Các bước cấu hình

### 1. Tạo GitHub Repository

1. Truy cập https://github.com/new
2. Tạo repository mới (ví dụ: `crossword-images`)
3. Repository có thể là **public** hoặc **private**
4. Copy tên repository (format: `username/repo-name`)

### 2. Tạo GitHub Personal Access Token (PAT)

1. Truy cập: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Đặt tên token (ví dụ: "Crossword Game Images")
4. Chọn quyền: **`repo`** (Full control of private repositories)
   - Nếu repo là public, có thể chỉ cần quyền `public_repo`
5. Click **"Generate token"**
6. **Copy token ngay** (chỉ hiển thị 1 lần!)

### 3. Cấu hình Environment Variables

1. Copy file `.env.example` thành `.env`:
   ```bash
   cp .env.example .env
   ```

2. Mở file `.env` và điền thông tin:
   ```env
   VITE_GITHUB_TOKEN=ghp_your_token_here
   VITE_GITHUB_REPO=TuanLouis/crossword-images
   VITE_GITHUB_BRANCH=main
   ```

3. **Quan trọng**: File `.env` đã được thêm vào `.gitignore`, không commit lên Git!

### 4. Khởi động lại ứng dụng

Sau khi cấu hình `.env`, cần khởi động lại dev server:
```bash
npm run dev
```

## Cách hoạt động

1. **Upload**: Hình ảnh được upload lên GitHub repository dưới dạng base64
2. **CDN**: jsDelivr tự động phân phối hình ảnh từ GitHub
3. **URL Format**: `https://cdn.jsdelivr.net/gh/{user}/{repo}@{branch}/{path}`

## Ưu điểm

- ✅ **Miễn phí**: GitHub và jsDelivr đều miễn phí
- ✅ **CDN nhanh**: jsDelivr có CDN toàn cầu
- ✅ **Quản lý dễ**: Tất cả hình ảnh trong GitHub repo
- ✅ **Version control**: Có thể xem lịch sử upload
- ✅ **Không giới hạn**: GitHub cho phép file lớn (100MB)

## Lưu ý

- **Token bảo mật**: Không commit token vào Git
- **File size**: Nên giới hạn < 10MB cho hình ảnh
- **Rate limit**: GitHub có giới hạn API calls (thường đủ cho mục đích giáo dục)
- **Public repo**: Nếu repo là public, hình ảnh có thể truy cập trực tiếp qua GitHub URL

## Troubleshooting

### Lỗi: "Chưa cấu hình GitHub token"
- Kiểm tra file `.env` đã tồn tại chưa
- Kiểm tra tên biến có đúng `VITE_GITHUB_TOKEN` không
- Khởi động lại dev server sau khi thêm `.env`

### Lỗi: "Bad credentials"
- Token đã hết hạn hoặc không đúng
- Tạo token mới và cập nhật trong `.env`

### Lỗi: "Resource not found"
- Kiểm tra tên repository có đúng format `username/repo-name` không
- Kiểm tra repository có tồn tại không
- Kiểm tra token có quyền truy cập repo không

### Hình ảnh không hiển thị
- Kiểm tra URL jsDelivr có đúng không
- Đợi vài giây để jsDelivr cache hình ảnh
- Kiểm tra file đã được commit vào GitHub chưa

