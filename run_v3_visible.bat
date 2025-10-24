@echo off
chcp 65001 >nul
echo ============================================================
echo 👁️  Website Offline Downloader V3 - 브라우저 보이기 모드
echo ============================================================
echo.

REM 설정 정보
set USERNAME=wsh123
set PASSWORD=1234
set WEBSITE=https://xn--o39a0n963awza76tu9hduc.com
set DEPTH=10
set OUTPUT=downloaded_site_v3_visible

echo 📝 설정 정보:
echo   - 사이트: %WEBSITE%
echo   - 사용자: %USERNAME%
echo   - 크롤링 깊이: %DEPTH%
echo   - 출력 폴더: %OUTPUT%
echo   - 브라우저: 보이기 모드 (디버깅용)
echo.

echo 👁️  이 모드에서는 브라우저 창이 표시됩니다.
echo    크롤링 과정을 직접 확인할 수 있습니다.
echo.

pause

echo.
echo 🚀 V3 크롤링 시작 (브라우저 보이기 모드)...
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
    --submit-selector "button:has-text('로그인')" ^
    --visible

echo.
echo ============================================================
echo ✅ 크롤링 완료!
echo 📁 결과 폴더: %OUTPUT%
echo 📄 README.md 파일을 확인하세요
echo ============================================================
echo.

pause
