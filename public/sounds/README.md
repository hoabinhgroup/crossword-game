# Sound Files

Thư mục này chứa các file âm thanh cho trò chơi.

## ⚠️ Lưu ý quan trọng:

**Game sẽ hoạt động bình thường ngay cả khi không có file âm thanh.** 
Code đã được thiết kế để xử lý trường hợp file không tồn tại một cách graceful.

## Các file âm thanh cần thiết:

1. **success.mp3** - Âm thanh khi trả lời đúng
   - Gợi ý: Tìm "success sound", "correct answer sound", "achievement sound"
   - Thời lượng: 1-2 giây
   - Tone: Vui vẻ, tích cực

2. **error.mp3** - Âm thanh khi trả lời sai
   - Gợi ý: Tìm "error sound", "wrong answer sound", "buzz sound"
   - Thời lượng: 0.5-1 giây
   - Tone: Nhẹ nhàng, không quá khó chịu

3. **timer-warning.mp3** - Âm thanh cảnh báo timer (≤ 60 giây)
   - Gợi ý: Tìm "warning sound", "alert sound", "notification sound"
   - Thời lượng: 0.5-1 giây
   - Tone: Cảnh báo nhẹ

4. **timer-danger.mp3** - Âm thanh nguy hiểm timer (≤ 30 giây)
   - Gợi ý: Tìm "danger sound", "urgent sound", "alarm sound"
   - Thời lượng: 0.5-1 giây
   - Tone: Khẩn cấp hơn warning

5. **game-end.mp3** - Âm thanh khi game kết thúc
   - Gợi ý: Tìm "game over sound", "finish sound", "completion sound"
   - Thời lượng: 2-3 giây
   - Tone: Hoàn thành, kết thúc

## Nguồn tải file âm thanh miễn phí (khuyến nghị):

### 1. **Mixkit** ⭐ (Khuyến nghị nhất)
   - URL: https://mixkit.co/free-sound-effects/
   - ✅ Hoàn toàn miễn phí, không cần đăng ký
   - ✅ Tải trực tiếp, không cần attribution
   - ✅ Chất lượng tốt, nhiều lựa chọn
   - **Từ khóa tìm kiếm:**
     - Success: "success", "correct", "achievement"
     - Error: "error", "wrong", "buzz"
     - Warning: "notification", "alert", "ping"
     - Danger: "alarm", "urgent", "warning"
     - Game End: "game over", "finish", "complete"

### 2. **Pixabay**
   - URL: https://pixabay.com/sound-effects/
   - ✅ Miễn phí, không cần attribution
   - ✅ Nhiều lựa chọn chất lượng cao

### 3. **Freesound.org**
   - URL: https://freesound.org/
   - ✅ Rất nhiều file miễn phí
   - ⚠️ Cần đăng ký (miễn phí)
   - ⚠️ Một số file cần attribution
   - **Lọc theo license: CC0** (không cần attribution)

### 4. **Zapsplat**
   - URL: https://www.zapsplat.com/
   - ✅ Chất lượng rất cao
   - ⚠️ Cần đăng ký miễn phí

### 5. **OpenGameArt**
   - URL: https://opengameart.org/
   - ✅ Dành riêng cho game
   - ✅ Nhiều sound packs miễn phí

## Gợi ý file cụ thể từ Mixkit:

### Success Sound:
- Tìm: "Success" hoặc "Correct Answer"
- Link: https://mixkit.co/free-sound-effects/success/

### Error Sound:
- Tìm: "Error" hoặc "Wrong"
- Link: https://mixkit.co/free-sound-effects/error/

### Timer Warning:
- Tìm: "Notification" hoặc "Alert"
- Link: https://mixkit.co/free-sound-effects/notification/

### Timer Danger:
- Tìm: "Alarm" hoặc "Urgent"
- Link: https://mixkit.co/free-sound-effects/alarm/

### Game End:
- Tìm: "Game Over" hoặc "Finish"
- Link: https://mixkit.co/free-sound-effects/game/

## Cách thêm file:

1. **Tải các file âm thanh** từ các nguồn trên (khuyến nghị dùng Mixkit)
2. **Đổi tên file** theo đúng tên trong danh sách:
   - `success.mp3`
   - `error.mp3`
   - `timer-warning.mp3`
   - `timer-danger.mp3`
   - `game-end.mp3`
3. **Đặt vào thư mục** `public/sounds/`
4. **Refresh trang** để nghe thử

## Lưu ý kỹ thuật:

- **Định dạng**: MP3 (khuyến nghị) hoặc WAV
- **Kích thước**: Nên < 500KB mỗi file để tải nhanh
- **Nếu file không tồn tại**: Game vẫn hoạt động bình thường, chỉ không có âm thanh
- **Để sử dụng WAV**: Đổi extension từ `.mp3` sang `.wav` trong file `src/utils/sounds.js`

## Kiểm tra:

Sau khi thêm file, mở Console (F12) và kiểm tra:
- Nếu file không tồn tại: Sẽ có warning "Could not play sound"
- Nếu file tồn tại: Âm thanh sẽ phát khi có sự kiện tương ứng
