@echo off
chcp 65001 >nul
echo ============================================================
echo 🚀 Website Offline Downloader V3 - 로그인 크롤링
echo ============================================================
echo.

REM 설정 정보
set USERNAME=wsh123
set PASSWORD=1234
set WEBSITE=https://xn--o39a0n963awza76tu9hduc.com
set DEPTH=10
set OUTPUT=downloaded_site_v3

echo 📝 설정 정보:
echo   - 사이트: %WEBSITE%
echo   - 사용자: %USERNAME%
echo   - 크롤링 깊이: %DEPTH%
echo   - 출력 폴더: %OUTPUT%
echo   - 브라우저: 헤드리스 모드
echo.

pause

echo.
echo 🚀 V3 크롤링 시작 (Playwright 완전 통합 버전)...
echo.

D:\python.exe Donwnload_Website_OfflineV3.py ^
    %WEBSITE% ^
    --login ^
    --username "%USERNAME%" ^
    --password "%PASSWORD%" ^
    --depth %DEPTH% ^
    --output "%OUTPUT%" ^
    --username-selector "input[name='mb_id']" ^
    --password-selector "input[name='mb_password']" ^
    --submit-selector "button:has-text('로그인')"

echo.
echo ============================================================
echo ✅ 크롤링 완료!
echo 📁 결과 폴더: %OUTPUT%
echo 📄 README.md 파일을 확인하세요
echo ============================================================
echo.

pause
