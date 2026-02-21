# Kế Hoạch Triển Khai: Thuật Toán & Giao Diện Web Snake Game

Được xây dựng dựa trên quy trình **`/11_plan`** (Kiến trúc & Đặc tả) và **`/08_ui_design`** (Thiết kế Giao diện Web).

---

## 1. Phân Tích Yêu Cầu Chức Năng (EARS Notation)

- **WHEN** người chơi khởi động trang web, **THE SYSTEM SHALL** tải giao diện Menu Chính (Start Menu) và load các thông số từ file cấu hình (`config.js`).
- **WHEN** độ khó (Easy / Normal / Hard) được chọn, **THE SYSTEM SHALL** thiết lập vận tốc cơ bản ban đầu và số lượng mồi/chướng ngại vật tương ứng.
- **WHEN** chế độ chướng ngại vật được BẬT, **THE SYSTEM SHALL** tự động sinh các hình chữ nhật chướng ngại vật (với độ dài các cạnh ngẫu nhiên và $\ge$ 1) ở đầu trò chơi sao cho không đè lên Rắn hoặc Mồi xuất phát. 
- **WHEN** chế độ tốc độ động được BẬT VÀ rắn ăn đủ quy mô mồi nhất định (VD: 5 mồi, quy định ở dạng hằng số trong config), **THE SYSTEM SHALL** tăng tốc độ di chuyển của Rắn (giảm thời gian delay của game loop).
- **WHEN** rắn va chạm với tường, cạnh màn hình, chướng ngại vật, hoặc cơ thể của chính mình, **THE SYSTEM SHALL** kết thúc trò chơi và hiển thị Game Over Modal.

---

## 2. Thiết Kế UI/UX (Dựa theo `/08_ui_design`)

**Nguyên lý Thiết Kế Cốt Lõi (Core Principles):**
- **Hiệu quả (Efficiency) & Trực quan (Clarity):** Giao diện dạng **Single Page Layout**. Màn hình game kích thước lớn, thông tin điểm số và bảng kỷ lục sẽ được thiết kế dạng **Overlay** (nằm đè lên phía trong góc của ô trò chơi) để tối ưu không gian và tăng phần hiện đại.
- **Cấu trúc Thẩm Mỹ (Aesthetics):** Sử dụng xu hướng **Glassmorphism** (nền kính mờ trên dải gradient tối) mang lại cảm giác **Premium** nhưng không che lấp tầm nhìn.

**Bảng Màu (Color Scheme - Dark Theme Recommended):**
- **Background App:** Dải màu Gradient xanh ngọc/xám đen (`#161623` -> `#1e1e30`). Lưới Canvas mang màu xám tối nhất (`#12121c`).
- **Rắn (Snake):** Xanh Neon hoặc Xanh Lục rực rỡ (`#00e676`) để nổi bật thị lực, phần đầu có viền hoặc mắt nhằm tạo chiều sâu.
- **Mồi (Food):** Đỏ tươi / Cam bùng (`#ff1744`), có hiệu ứng shadow nhạy sáng.
- **Chướng ngại vật (Obstacles):** Xám kim loại (`#424242`) hoặc Đỏ trầm, để phân biệt rạch ròi với màu lưới và Rắn.
- **Text & UI Elements:** Chữ màu trắng sứ (`#f8f9fa`), nút bấm viền tròn (border-radius: `8-12px`).

**Các Component & Box Layout:**
1. **Main Canvas Zone:** Bảng trò chơi Snake có kích thước lớn (chiều rộng có thể điều chỉnh, ví dụ Width: 1660px, Height: 880px) để phù hợp cho trải nghiệm màn hình rộng.
2. **Overlay Score Zone (Thay thế Header):** Score hiện tại và High Score nằm dưới dạng overlay trong suốt nổi trực tiếp lên trên diện tích của Canvas.
3. **Modals (Overlay):**
   - **Start Screen:** Chứa ba Nút chọn độ khó (Radio buttons / Pill Buttons) & Các Checkbox Toggle "Chướng ngại vật", "Tốc độ động".
   - **Game Over Screen:** Xuất hiện popup trượt với Điểm số chung cuộc (Final Score) + thông điệp thân thiện (e.g. "Try again?") + Call to Action "Chơi Lại".

---

## 3. Cấu Trúc Mã Nguồn (Project Structure)

Dự án sẽ được đóng gói logic theo Layered Architecture để code sạch và dễ duy trì:

```text
/
├── index.html          # File HTML gốc (DOM cho Menu, Scoreboard, Canvas).
├── css/
│   └── style.css       # Layout chính & UI Glassmorphism, CSS Transitions/Animations.
└── js/
    ├── config.js       # (Central Configuration): Lưu mốc frame rate, độ tăng vận tốc, số lùi mồi 5...
    ├── engine.js       # (Game Loop & State): requestAnimationFrame, đếm nhịp độ game.
    ├── ui.js           # (DOM Logic): Cập nhật Menu, Modals và Scoreboard.
    ├── map.js          # (Board & Obstacles): Canvas Grid, hàm sinh hình chữ nhật chướng ngại vật không đè lưới.
    └── entities.js     # (Models): Lớp Rắn (tọa độ, mảng các lóng nối dài) & Sinh Mồi mới.
```

---

## 4. Kế Hoạch Thực Hiện (Phân đoạn Phát Triển)

Dự án này là **Thiết lập Mới (New Project - `/02_project_overview`)**. Nó sẽ chia thành 4 bước (Task):

- **Tác vụ 1: Khởi tạo và Thiết Lập (Information Gathering & Setup)**
  - Dựng file `index.html` cơ bản, cài đặt biến file `config.js` (chứa các hệ số tăng tốc, mức độ lưới - grid size).
- **Tác vụ 2: Xây Dựng UI & DOM Mẫu (UI Implementation)**
  - Áp dụng các rules CSS (`style.css`), tạo Layout trung tâm, thiết kế Modal Menu Start & Checkboxes cho Tốc độ và Chướng ngại vật.
- **Tác vụ 3: Tích Hợp Game Engine Rắn Săn Mồi Cơ Bản (Core Implementation)**
  - Viết `engine.js` & `entities.js` để Rắn có thể di chuyển bằng hệ event phím (Arrow Keys / WASD).
  - Khắc phục cơ chế Check va chạm (Collisions) vòng tường và tự ăn mình.
  - Test ăn mồi bình thường.
- **Tác vụ 4: Tích Hợp Tính Năng Nâng Cao của Yêu Cầu (Advanced Features Integration)**
  - Thêm logic lấy biến từ file Config và cài `map.js` chạy 1 lần trước khi game loop bắt đầu để **kẻ chướng ngại vật hình chữ nhật**.
  - Bổ sung biến kiểm tra Tốc Nhanh (Dynamic Speed), chèn điều kiện: _Nếu Rắn ăn mồi dư mốc số dư 5 mồi, trừ Delay trong Game Loop._
- **Tác vụ 5: Đánh giá mượt (Optimization & Validation)**
  - Check các lỗi Render, làm mượt Responsive giao diện, test lại các nút Start & Play Again.
