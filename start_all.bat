@echo off
chcp 65001 >nul
echo =========================================================================
echo   🏛  CHỦ TỊCH NƯỚC - VẬN MỆNH QUỐC GIA - KHỞI ĐỘNG HỆ THỐNG FULLSTACK  🏛
echo =========================================================================
echo [1/3] Đang khởi động Backend NestJS trên cổng 4000...
start "President Game Backend (NestJS)" cmd /k "cd /d %~dp0backend && npm run start"

echo.
echo [2/3] Đang khởi động Ngrok Tunnel (https://resurface-exert-reaffirm.ngrok-free.dev)...
start "President Game Ngrok Tunnel" cmd /k "cd /d %~dp0 && npm run tunnel"

echo.
echo [3/3] Đang khởi động Frontend NextJS trên cổng 3000...
start "President Game Frontend (NextJS)" cmd /k "cd /d %~dp0frontend && npm run start"

echo.
echo =========================================================================
echo   🎉 HỆ THỐNG ĐÃ SẴN SÀNG!
echo.
echo   👉 Màn hình Người chơi (Local):          http://localhost:3000
echo   👉 Màn hình Người chơi (GitHub Pages):   https://lenguyenchuong544-dotcom.github.io/chu-tich-nuoc-game
echo   👉 Ngrok Backend Public URL:            https://resurface-exert-reaffirm.ngrok-free.dev
echo   👉 Backend API & WebSocket (Local):      http://localhost:4000
echo =========================================================================
pause
