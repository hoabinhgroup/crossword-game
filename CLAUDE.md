Xây dựng một minigame ô chữ tiếng Anh cho học sinh lớp 3–5, có khả năng:
- Ngôn ngữ triển khai vue 3 composition api
- Nếu cần quản lý state thì dùng Pinia
- Nhiều người chơi trong cùng một phòng (multiplayer realtime)
- Dùng Firebase Realtime Database
- Quản lý nhiều “đợt học” (batches), mỗi đợt gồm nhiều từ vựng
- Giao diện đơn giản, dễ dùng, chạy được trên trình duyệt điện thoại

---

## 2. FEATURES

### 2.1 Parent/Teacher Dashboard (Simple)
- Xem danh sách các “batches”
- Thêm / sửa / xoá batch
- Mỗi batch gồm:
  - `title`
  - `words[]`: danh sách gợi ý + đáp án
- Chọn batch → tạo phòng chơi

### 2.2 Game Rooms (Multiplayer Realtime)
- Hệ thống sinh `roomCode` ngẫu nhiên (5 ký tự, dạng ABC12)
- Người chơi nhập `roomCode` + tên → join vào phòng
- Danh sách người chơi hiển thị realtime
- Chỉ host mới có quyền tạo phòng
- Không cần backend; chỉ dùng Firebase

### 2.3 Gameplay
- Tất cả người chơi nhận cùng một danh sách câu hỏi từ batch đã chọn
- Mỗi câu gồm:
  - `clue` (gợi ý tiếng Việt, tiếng Anh hoặc hình ảnh)
  - `answer` (từ tiếng Anh)
  - Số ô = chiều dài từ
- Người chơi nhập đáp án
- Nếu đúng:
  - Câu được đánh dấu “solved”
  - Khóa ô nhập toàn phòng
  - Ghi người trả lời đúng
  - Cộng điểm: +10 → +20 (tuỳ chỉnh)
- Nếu sai: hiện feedback nhưng không trừ điểm

### 2.4 Leaderboard Realtime
- Hiển thị điểm của từng người chơi
- Sắp xếp theo điểm giảm dần
- Update realtime khi có người giải đúng từ

### 2.5 End of Game Summary
- Khi tất cả câu đã được giải → hiện bảng tổng kết:
  - Ai trả lời câu nào
  - Thời gian hoàn thành
  - Tổng điểm
- Host có thể bắt đầu round mới

---

## 3. FIREBASE STRUCTURE (Realtime Database)

Cấu trúc firebase dạng:

{
  "batches": {
    "batch_1": {
      "title": "Unit 1 - School Things",
      "words": {
        "w1": { "clue": "Quyển vở", "answer": "notebook" },
        "w2": { "clue": "Cây bút", "answer": "pen" }
      }
    },
    "batch_2": {
      ...
    }
  },

  "rooms": {
    "A7C21": {
      "batchId": "batch_1",
      "players": {
        "playerId1": { "name": "Tùng", "score": 20 }
      },
      "answers": {
        "w1": { "answeredBy": "playerId1", "correct": true },
        "w2": null
      }
    }
  }
}