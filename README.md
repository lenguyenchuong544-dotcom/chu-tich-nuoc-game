# CHỦ TỊCH NƯỚC – VẬN MỆNH QUỐC GIA
> **Trò chơi Web Chiến lược & Mô phỏng Điều hành Quốc gia**  
> Phục vụ học tập môn: **Chủ nghĩa xã hội khoa học**  
> Chuyên đề: **Nhà nước XHCN và Nhà nước pháp quyền XHCN ở Việt Nam**

---

## 🌟 TỔNG QUAN DỰ ÁN

Dự án được xây dựng dưới vai trò **Game Designer & Fullstack Developer chuyên nghiệp**, mô phỏng trải nghiệm điều hành đất nước của **Chủ tịch nước Cộng hòa Xã hội Chủ nghĩa Việt Nam** trong một nhiệm kỳ 5 năm (khoảng 30 lượt quyết định).

Trò chơi áp dụng cơ chế vuốt thẻ quyết định (Decision Card) hai chiều (Trái / Phải) với độ đánh đổi chính sách thực tế (trade-off), tích hợp sâu sắc các nguyên lý lý luận Mác - Lênin và Hiến pháp Việt Nam, không biến thành bài trắc nghiệm khô khan mà tạo cảm giác người chơi thực sự là nguyên thủ quốc gia gánh vác vận mệnh non sông.

---

## 🏛 4 CHỈ SỐ QUỐC GIA & CƠ CHẾ CÂN BẰNG

Màn hình luôn hiển thị 4 trụ cột quốc gia (giá trị từ `0` đến `100`, khởi đầu `50/50/50/50`):
1. 🏛 **Ổn định Chính trị** (*Politics*): Bản chất giai cấp công nhân, trật tự kỷ cương, vai trò lãnh đạo toàn diện của Đảng.
2. 💰 **Kinh tế** (*Economy*): Thể chế kinh tế thị trường định hướng XHCN, cân đối ngân sách, an sinh xã hội.
3. 👥 **Niềm tin Nhân dân** (*People*): Quyền làm chủ của nhân dân, đại đoàn kết, phương châm *"Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng"*.
4. ⚖️ **Pháp quyền** (*Law*): Thượng tôn Hiến pháp và pháp luật, kiểm soát quyền lực, phòng chống tham nhũng, liêm chính.

- **Cơ chế Peek Preview (Chỉ báo biến động)**: Khi kéo/nghiêng thẻ về một phía, hệ thống chỉ hiển thị ký hiệu `▲` (tăng) hoặc `▼` (giảm) mờ trên thanh chỉ số mà không để lộ con số cụ thể. Sau khi thả thẻ, chỉ số thay đổi thực tế mới hiện hiệu ứng bay số (Floating Deltas: `+8`, `-5`...) kèm âm thanh sống động.
- **Quy tắc Game Over**: Nếu **bất kỳ chỉ số nào giảm về 0**, nhiệm kỳ lập tức chấm dứt với **kết cục bi kịch riêng** cho chỉ số đó.
- **Điểm Kiến thức (Knowledge Score)**: Tích lũy khi trả lời câu hỏi nhận thức lý luận đúng (+10) hoặc sai (-5), kèm hộp thoại giải thích căn cứ lý luận chuẩn mực.

---

## 👥 HỆ THỐNG 12 NHÂN VẬT ĐẠI BIỂU

Trò chơi sở hữu 12 nhân vật đại diện cho các cơ quan quyền lực và các tầng lớp nhân dân, mỗi nhân vật có chân dung đồ họa vector nghệ thuật và lập trường riêng:
1. **Nguyễn Văn An** – Bộ trưởng Bộ Tư pháp (Thượng tôn pháp luật, kiên định hiến định)
2. **Trần Thị Mai** – Bộ trưởng Bộ Tài chính & Kinh tế (Sắc sảo, thực tế, cân đối vĩ mô)
3. **Lê Hoàng Nam** – Bộ trưởng Bộ Nội vụ & An ninh (Kỷ cương, an ninh trật tự, an toàn xã hội)
4. **Phạm Quốc Việt** – Chủ nhiệm Văn phòng Chủ tịch (Thận trọng, thấu đáo, điều phối nhịp nhàng)
5. **GS.TS Vũ Thị Lan** – Bộ trưởng Bộ Văn hóa - Giáo dục (Bản sắc dân tộc, tiến bộ văn hóa nhân loại)
6. **Đặng Minh Khôi** – Tổng Thanh tra Chính phủ (Liêm chính, không khoan nhượng với tham nhũng)
7. **Hoàng Đình Trọng** – Chủ tịch Ủy ban Trung ương MTTQ Việt Nam (Lòng dân, giám sát & phản biện xã hội)
8. **Bùi Văn Thắng** – Chánh án TAND Tối cao (Công minh, bảo vệ công lý và quyền con người)
9. **Đỗ Thị Nga** – Đại biểu Quốc hội chuyên trách (Đại diện cử tri, công khai, dân chủ)
10. **Nguyễn Thị Tâm** – Đại diện Công nhân - Lao động (Tiếng nói giai cấp công nhân và nhân dân cơ sở)
11. **Trần Văn Long** – Nhà báo Điều tra Xã hội (Phản ánh công luận, minh bạch hóa)
12. **TS. Lê Tuấn Anh** – Giám đốc Chuyển đổi số Quốc gia (Chính phủ số phục vụ nhân dân)

---

## 🃏 HỆ THỐNG 60 QUYẾT ĐỊNH (DECISION CARDS)

Dữ liệu thẻ bài được tổ chức thành object chuẩn TypeScript/JSON, phân bổ đồng đều theo 5 loại:
- **Loại Hướng dẫn (Tutorial - 3 thẻ)**: Dẫn dắt người chơi làm quen với vuốt kéo, 4 chỉ số và hệ quả dài hạn.
- **Loại A (Governance - 28 thẻ)**: Tình huống điều hành thực tế có trade-off sâu sắc.
- **Loại B (Knowledge - 10 thẻ)**: Kiểm tra trực tiếp kiến thức lý luận bài học, hiện ngay giải thích lý luận Mác - Lênin & Hiến pháp.
- **Loại C (Applied - 10 thẻ)**: Tình huống vận dụng nguyên lý (nguyên tắc tập trung dân chủ, phân công kiểm soát quyền lực, bảo vệ người lao động...).
- **Loại D (Crisis - 5 thẻ)**: Khủng hoảng quốc gia với còi báo động khẩn cấp và biên độ tác động lớn.
- **Loại E (Storyline - 4 thẻ)**: Chuỗi sự kiện cốt truyện dài hạn thông qua hệ thống cờ (`flags.budgetPortal`, `flags.cleanHandsAI`).

---

## 🏆 8 KẾT CỤC (ENDINGS) & XẾP LOẠI NHIỆM KỲ

1. **NGUYÊN THỦ KIỆT XUẤT - NHÀ LÃNH ĐẠO TOÀN DIỆN** *(Đạt 4 chỉ số > 75 và Knowledge >= 90)*
2. **NHÀ NƯỚC XÃ HỘI CHỦ NGHĨA VỮNG MẠNH** *(Cân bằng hài hòa các chỉ số > 60)*
3. **CƯỜNG QUỐC KINH TẾ** *(Chỉ số Kinh tế vượt trội > 80)*
4. **LÒNG DÂN LÀ GỐC - DÂN CHỦ XÃ HỘI CHỦ NGHĨA NỞ HOA** *(Chỉ số Nhân dân > 80)*
5. **THƯỢNG TÔN PHÁP QUYỀN - KỶ CƯƠNG LIÊM CHÍNH** *(Chỉ số Pháp quyền > 80)*
6. **GAME OVER: KHỦNG HOẢNG CHÍNH TRỊ** *(Chính trị <= 0)*
7. **GAME OVER: KHỦNG HOẢNG KINH TẾ** *(Kinh tế <= 0)*
8. **GAME OVER: KHỦNG HOẢNG NIỀM TIN** *(Nhân dân <= 0)*
9. **GAME OVER: XÓI MÒN PHÁP QUYỀN** *(Pháp quyền <= 0)*

**Xếp loại nhiệm kỳ:**
- **90–100**: *Nhà lãnh đạo xuất sắc*
- **75–89**: *Nhà lãnh đạo vững vàng*
- **60–74**: *Nhà lãnh đạo thận trọng*
- **40–59**: *Đất nước còn nhiều vấn đề*
- **< 40**: *Nhiệm kỳ đầy biến động*

---

## 💻 KIẾN TRÚC KỸ THUẬT & HỖ TRỢ 60 SINH VIÊN

- **Frontend**: Next.js 14 App Router, React 18, Tailwind CSS, Lucide Icons, Canvas Confetti, Web Audio API Sound Synthesizer.
- **Backend**: NestJS 10, TypeScript, WebSocket Gateway (Socket.io), Express REST APIs.
- **Khả năng tải**: Hỗ trợ đồng thời 60+ sinh viên trong lớp học cùng chơi trên laptop hoặc điện thoại di động.
- **Màn hình Quản trị Giảng viên (`/admin`)**:
  - Giám sát thời gian thực tiến độ, điểm số, lượt chơi, và trạng thái của toàn bộ 60 sinh viên.
  - Phân tích thống kê lớp học: Tỷ lệ hoàn thành/Game over, điểm kiến thức trung bình, 4 chỉ số bình quân cả lớp.
  - Xuất bảng điểm lớp học ra file **Excel / CSV** có hỗ trợ UTF-8 BOM tiếng Việt.
  - Nút **"Tạo 60 SV Demo"** để giảng viên trình chiếu mẫu hoặc kiểm tra giao diện bảng xếp hạng.
  - Nút **"Làm Mới"** để bắt đầu phiên thi mới cho ca học tiếp theo.

---

## 🚀 HƯỚNG DẪN KHỞI ĐỘNG HỆ THỐNG

### Cách 1: Khởi động 1-Click trên Windows
Nhấp đúp chuột vào file:
```cmd
start_all.bat
```

### Cách 2: Khởi động thủ công bằng dòng lệnh

**Bước 1: Khởi động Backend NestJS (Cổng 4000)**
```bash
cd backend
node dist/main.js
```

**Bước 2: Khởi động Frontend NextJS (Cổng 3000)**
```bash
cd frontend
npm run start
```

### Các đường dẫn truy cập:
- 🎮 **Trang Bắt Đầu (Đăng ký Sinh viên)**: [http://localhost:3000](http://localhost:3000)
- 🏛 **Màn hình Trò chơi (Chủ tịch nước)**: [http://localhost:3000/game](http://localhost:3000/game)
- 🏆 **Bảng Vinh Danh Toàn Lớp**: [http://localhost:3000/leaderboard](http://localhost:3000/leaderboard)
- 👨‍🏫 **Bảng Quản Trị Giảng Viên (Admin)**: [http://localhost:3000/admin](http://localhost:3000/admin)
- 📡 **API Backend & WebSocket**: [http://localhost:4000](http://localhost:4000)
