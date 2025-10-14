@echo off
chcp 65001 >nul
echo ============================================================
echo 🔐 로그인 후 웹사이트 크롤링 (브라우저 보이기 모드)
echo ============================================================
echo.

REM 여기에 실제 로그인 정보를 입력하세요
set USERNAME=your_id_here
set PASSWORD=your_password_here
set WEBSITE=https://xn--o39a0n963awza76tu9hduc.com
set DEPTH=10
set OUTPUT=downloaded_site_with_login

echo 📝 설정 정보:
echo   - 사이트: %WEBSITE%
echo   - 사용자: %USERNAME%
echo   - 크롤링 깊이: %DEPTH%
echo   - 출력 폴더: %OUTPUT%
echo.

echo 👁️  이 모드에서는 브라우저 창이 표시됩니다.
echo    로그인 과정을 직접 확인할 수 있습니다.
echo.

pause

echo.
echo 🚀 크롤링 시작 (브라우저 visible 모드)...
echo.

D:\python.exe Donwnload_Website_OfflineV2.py ^
    %WEBSITE% ^
    --login ^
    --username "%USERNAME%" ^
    --password "%PASSWORD%" ^
    --depth %DEPTH% ^
    --output "%OUTPUT%" ^
    --visible

echo.
echo ============================================================
echo ✅ 크롤링 완료!
echo 📁 결과 폴더: %OUTPUT%
echo ============================================================
echo.

pause

