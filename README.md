# TMC Universe V4 — Tiếng Việt / English

Website bio cá nhân với 2 chế độ ngôn ngữ, giao diện poster nghệ thuật, hành tinh CSS 3D, danh sách liên kết mạng xã hội và trình phát nhạc. Không dùng framework hay thư viện JavaScript ngoài.

## Chuyển ngôn ngữ / Switch language

- Nút **VI / EN** trên thanh điều hướng: chuyển ngay lập tức, không tải lại trang.
- Các phần được dịch: menu, giới thiệu, slogan, thẻ liên kết, radio, nút bấm, thông báo, tiêu đề trang và nhãn hỗ trợ trình đọc màn hình.
- Mặc định chọn ngôn ngữ trình duyệt: tiếng Việt nếu browser đặt `vi-*`, ngược lại là English.
- Lựa chọn được lưu trên **localStorage** (`tmc-universe-language`), vì vậy được ghi nhớ khi người xem trở lại website (trên cùng trình duyệt và domain).
- Để chỉnh bản dịch, mở file `i18n.js` và sửa các khóa `vi` / `en` trong `phrases`; cập nhật cả hai bản để nội dung đồng nhất.
- Tên thương hiệu, tài khoản, liên kết, tiêu đề bài nhạc giữ nguyên.

## Chạy ở Zorin OS / Preview

Giải nén ZIP, vào thư mục chứa `index.html`:

```bash
python3 -m http.server 8000
```

Sau đó truy cập http://localhost:8000.

Bạn có thể mở trực tiếp `index.html`, nhưng nên dùng localhost hoặc HTTPS khi kiểm tra localStorage, clipboard, tính năng chia sẻ và phát nhạc.

## Đưa lên Vercel / Deploy

Đưa **nội dung bên trong** thư mục này (không phải chỉ file ZIP) vào thư mục gốc dự án Vercel đang sử dụng, rồi deploy lại. Giữ cấu trúc:

```
index.html
style.css
app.js
i18n.js
favicon.svg
music/chill.mp3
```

`i18n.js` phải được tải **trước** `app.js` như trong `index.html`. Không cần build bằng npm.

## Nội dung giữ nguyên

- 8 liên kết mạng xã hội và email đã có trong V3.
- Playlist chia bài từ file mix gốc `music/chill.mp3`; các mốc thời gian trong `app.js`.
- Light / dark mode, hiệu ứng hover nhẹ, hỗ trợ `prefers-reduced-motion`.
- Nhạc chỉ tải khi người dùng chủ động phát, phù hợp thiết bị yếu.

**Quan trọng:** Bản V4 chỉ nâng cấp giao diện và ngôn ngữ; không thay đổi tài khoản hay địa chỉ các liên kết.
