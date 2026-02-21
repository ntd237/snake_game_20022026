# Snake Game - Premium Edition

Trò chơi Rắn Săn Mồi kinh điển được làm lại dưới dạng Web tĩnh (Vanilla JS, HTML, CSS) chuẩn thiết kế Glassmorphism hiện đại mang lại cảm giác cực kỳ Premium.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Version](https://img.shields.io/badge/version-1.0.0-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

## 📋 Mục lục
- [Giới thiệu](#-giới-thiệu)
- [Tính năng nổi bật](#-tính-năng-nổi-bật)
- [Cài đặt](#-cài-đặt)
- [Cách chơi (Usage)](#-cách-chơi-usage)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [Mở rộng](#-mở-rộng)
- [Giấy phép](#-giấy-phép)
- [Liên hệ](#-liên-hệ)

## 🚀 Giới thiệu

### Vấn đề giải quyết
- Đa số các mini game hướng dẫn lập trình trên Web đều có thiết kế nhàm chán, đồ hoạ phẳng thiếu sức sống.
- Hệ thống code mini game thường bị trộn lẫn HTML/CSS/JS chung một file dẫn đến rất khó bảo trì và học tập.
- Thiếu các tính năng tùy biến hiện đại như Chướng ngại vật hay Tốc độ động.

### Giải pháp
Dự án được phân tách theo thiết kế **Layered Architecture** chuẩn chỉnh cho mã nguồn Vanilla JS. Giao diện (UI/UX) sử dụng xu hướng HUD (Head-up Display) điểm số trong suốt ghép cùng công nghệ nền Glassmorphism mờ giúp người chơi tập trung tối đa mà không bị che khuất Rắn/Mồi.

### Công nghệ sử dụng
- **Core:** HTML5, CSS3, ES6 JavaScript.
- **Render Engine:** `<canvas>` kết hợp với `requestAnimationFrame`.
- **Styling:** CSS Variables, Grid/Flexbox, CSS Backdrop-filter.

---

## ✨ Tính năng nổi bật

### Tính năng Cốt lõi (Core Features)
- **Gameplay mượt mà:** Xử lý hệ thống lưới ảo không bị rách frame. 3 Chế độ (Dễ, Bình thường, Khó).
- **HUD Scoreboard:** Cập nhật điểm số hiện tại và điểm kỷ lục theo giời gian thực được lưu tại `localStorage`.
- **Chướng ngại vật ngẫu nhiên:** Hệ thống thuật toán tạo khối vuông/chữ nhật tự động né khu vực xuất phát của người chơi.

### Tính năng Nâng cao (Advanced Features)
- **Dynamic Speed (Tốc độ động):** Rắn tăng tốc độ di chuyển và gây cấn hơn khi người chơi ăn đủ một lượng mồi cấu hình sẵn.
- **Glassmorphism UI:** Modals hiệu ứng kính mờ (Blur background) tinh tế.

---

## 💻 Cài đặt

Do đây là dự án Web tĩnh (Static Web), bạn không cần cài đặt Node.js hay bất kỳ build tools nào.

**Bước 1:** Clone repository
```bash
git clone https://github.com/ntd237/classic-snake-game.git
cd classic-snake-game
```

**Bước 2:** Chạy game
Bạn có hai sự lựa chọn:
1. Đơn giản nhất: Double-click trực tiếp vào file `index.html` để mở bằng trình duyệt (Chrome, Safari, Edge,...).
2. Dành cho Dev: Chạy bằng Live Server extension trên VS Code.

---

## 🎮 Cách chơi (Usage)

- Dùng các phím `Mũi tên` hoặc `W A S D` để điều khiển hướng đi của Rắn.
- Trước khi bắt đầu, hãy chọn Độ khó hoặc Bật/Tắt chướng ngại vật ở Start Menu.
- Ăn chấm màu đỏ (Mồi) để ghi +10 điểm.
- Tránh đâm vào tường, đâm vào đuôi của chính mình, hoặc va chạm với các khối chướng ngại vật màu xám.

---

## 🗂 Cấu trúc thư mục

Dự án được thiết kế dưới dạng Component Layout tĩnh rất dễ tùy chỉnh.

```text
/
├── index.html          # File HTML gốc (DOM cho Menu, HUD, Canvas).
├── css/
│   └── style.css       # Layout chính, UI Glassmorphism & HUD Text Shadow.
└── js/
    ├── config.js       # (Central Configuration): Hằng số tốc độ động, lưới tọa độ.
    ├── engine.js       # (Game Loop): requestAnimationFrame, đếm nhịp độ.
    ├── ui.js           # (DOM Logic): Cập nhật Menu, Modals và Scoreboard.
    ├── map.js          # (Obstacles): Toán học sinh chiều dài Rộng x Cao của Cát-tê.
    └── entities.js     # (Models): Lớp Snake (tọa độ lóng) & Food (Sinh ngẫu nhiên).
```

---

## 🛠 Mở rộng

Đóng góp vào quá trình phát triển thông qua việc chỉnh sửa `/js/config.js`:
- Bạn có thể điều chỉnh lại `CANVAS_WIDTH` và `CANVAS_HEIGHT` hoặc đổi cả màu sắc `COLORS.SNAKE_HEAD` ngay tại file này mà không cần chạm vào logic game phía trong. Hệ thống đã được thiết kế auto-adapt chiều ngang X và dọc Y riêng biệt theo độ phân giải màn hình.

---

## 📄 Giấy phép

Dự án này được cấp phép theo tiêu chuẩn [MIT License](LICENSE). Vui lòng sử dụng phi thương mại / thương mại thoải mái nhưng hãy ghi nguồn rõ ràng.

---

## 📬 Liên hệ

- **Tác giả:** `ntd237`
- **Email:** `ntd237.work@gmail.com`
- **GitHub:** [https://github.com/ntd237](https://github.com/ntd237)
