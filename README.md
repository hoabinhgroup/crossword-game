# Crossword Minigame - Học Tiếng Anh

Minigame ô chữ tiếng Anh cho học sinh lớp 3-5 với tính năng multiplayer realtime sử dụng Firebase Realtime Database.

## Tính năng

- 📚 **Quản lý đợt học (Batches)**: Thêm, sửa, xóa các đợt học với từ vựng
- 🎮 **Phòng chơi multiplayer**: Tạo và tham gia phòng với mã phòng 5 ký tự
- ⚡ **Realtime**: Cập nhật điểm số và trạng thái game theo thời gian thực
- 🏆 **Bảng xếp hạng**: Hiển thị điểm số của người chơi
- 📱 **Mobile-friendly**: Giao diện tối ưu cho điện thoại

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Cấu hình Firebase:
   - Tạo project Firebase tại [Firebase Console](https://console.firebase.google.com/)
   - Bật Realtime Database
   - Copy thông tin config vào file `src/firebase/config.js`

3. Chạy ứng dụng:
```bash
npm run dev
```

## Cấu trúc Firebase Database

```
{
  "batches": {
    "batch_1": {
      "title": "Unit 1 - School Things",
      "words": {
        "w1": { "clue": "Quyển vở", "answer": "notebook" },
        "w2": { "clue": "Cây bút", "answer": "pen" }
      }
    }
  },
  "rooms": {
    "A7C21": {
      "batchId": "batch_1",
      "hostId": "player_xxx",
      "players": {
        "playerId1": { "name": "Tùng", "score": 20 }
      },
      "answers": {
        "w1": { "answeredBy": "playerId1", "correct": true, "timestamp": 1234567890 },
        "w2": null
      },
      "createdAt": 1234567890
    }
  }
}
```

## Cách sử dụng

### Cho giáo viên/phụ huynh (Host):

1. Vào Dashboard
2. Thêm đợt học mới với các từ vựng
3. Chọn đợt học và nhấn "Tạo phòng"
4. Chia sẻ mã phòng với học sinh

### Cho học sinh:

1. Nhấn "Tham Gia Phòng" ở Dashboard
2. Nhập mã phòng và tên
3. Bắt đầu chơi và trả lời câu hỏi
4. Xem bảng xếp hạng realtime

## Công nghệ

- Vue 3 với Composition API
- Firebase Realtime Database
- Vite
- CSS3 (Mobile-responsive)

## License

MIT

