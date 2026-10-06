@echo off
chcp 65001 >nul
echo =========================================================================
echo   🏛  CHỦ TỊCH NƯỚC - VẬN MỆNH QUỐC GIA - KHỞI ĐỘNG HỆ THỐNG FULLSTACK  🏛
echo =========================================================================
echo.
echo [1/2] Đang khởi động Backend NestJS trên cổng 4000...
start "President Game Backend (NestJS)" cmd /k "cd /d %~dp0backend && node dist/main.js"

echo.
echo [2/2] Đang khởi động Frontend NextJS trên cổng 3000...
start "President Game Frontend (NextJS)" cmd /k "cd /d %~dp0frontend && npm run start"

echo.
echo =========================================================================
echo   🎉 HỆ THỐNG ĐÃ SẴN SÀNG!
echo.
echo   👉 Màn hình Người chơi (Chủ tịch nước): http://localhost:3000
echo   👉 Màn hình Trò chơi chính:              http://localhost:3000/game
echo   👉 Bảng vinh danh lớp học:               http://localhost:3000/leaderboard
echo   👉 Bảng điều khiển Giảng viên (Admin):   http://localhost:3000/admin
echo   👉 Backend API & WebSocket:              http://localhost:4000
echo =========================================================================
pause
