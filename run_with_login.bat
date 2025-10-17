@echo off
chcp 65001 >nul
echo ============================================================
echo 🔐 로그인 후 웹사이트 크롤링 스크립트
echo ============================================================
echo.

REM 여기에 실제 로그인 정보를 입력하세요
set USERNAME=wsh123
set PASSWORD=1234
set WEBSITE=https://xn--o39a0n963awza76tu9hduc.com
set DEPTH=10
set OUTPUT=downloaded_site_with_login

echo 📝 설정 정보:
echo   - 사이트: %WEBSITE%
echo   - 사용자: %USERNAME%
echo   - 크롤링 깊이: %DEPTH%
echo   - 출력 폴더: %OUTPUT%
echo.

echo ⚠️  주의: 첫 실행 시에는 --visible 옵션을 사용하여
echo    브라우저가 보이도록 실행하는 것을 권장합니다.
echo.

pause

echo.
echo 🚀 크롤링 시작...
echo.

D:\python.exe Donwnload_Website_OfflineV2.py ^
    %WEBSITE% ^
    --login ^
    --username "%USERNAME%" ^
    --password "%PASSWORD%" ^
    --depth %DEPTH% ^
    --output "%OUTPUT%"

echo.
echo ============================================================
echo ✅ 크롤링 완료!
echo 📁 결과 폴더: %OUTPUT%
echo ============================================================
echo.

pause

