@echo off
chcp 65001 >nul
echo =========================================================================
echo   🌐 KHỞI ĐỘNG NGROK TUNNEL CHO BACKEND (PORT 4000)
echo =========================================================================
echo   🔗 Tên miền cố định:  https://resurface-exert-reaffirm.ngrok-free.dev
echo   🎯 Cổng nội bộ:        http://localhost:4000
echo.
echo   Lưu ý: Giữ cửa sổ này mở trong suốt quá trình người chơi tham gia game.
echo =========================================================================
echo.
ngrok http 4000 --url=resurface-exert-reaffirm.ngrok-free.dev
pause
