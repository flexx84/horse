# 🔐 로그인 기능 사용 가이드

이 문서는 Playwright를 사용하여 로그인 후 크롤링하는 방법을 설명합니다.

## 📋 목차
1. [설치 요구사항](#설치-요구사항)
2. [기본 사용법](#기본-사용법)
3. [상세 옵션](#상세-옵션)
4. [실제 사용 예제](#실제-사용-예제)
5. [문제 해결](#문제-해결)

---

## 설치 요구사항

### 1. Playwright 설치
```bash
pip install playwright
```

### 2. 브라우저 설치
```bash
playwright install chromium
```

---

## 기본 사용법

### 1️⃣ 로그인 없이 크롤링 (기존 방식)
```bash
python Donwnload_Website_OfflineV2.py
```

### 2️⃣ 로그인 후 크롤링 (새로운 기능!)
```bash
python Donwnload_Website_OfflineV2.py --login --username "your_id" --password "your_password"
```

---

## 상세 옵션

### 필수 옵션 (로그인 시)
| 옵션 | 설명 | 예제 |
|------|------|------|
| `--login` | 로그인 기능 활성화 | `--login` |
| `--username` | 로그인 ID/사용자명 | `--username "admin"` |
| `--password` | 로그인 비밀번호 | `--password "1234"` |

### 선택 옵션
| 옵션 | 설명 | 기본값 |
|------|------|--------|
| `--login-url` | 로그인 페이지 URL (메인 URL과 다를 때) | 메인 URL 사용 |
| `--username-selector` | ID 입력 필드의 CSS selector | `input[name='mb_id']` |
| `--password-selector` | 비밀번호 입력 필드의 CSS selector | `input[name='mb_password']` |
| `--submit-selector` | 로그인 버튼의 CSS selector | `button[type='submit']` |
| `--visible` | 브라우저를 보이게 실행 (디버깅용) | headless 모드 |
| `-d, --depth` | 크롤링 깊이 | 10 |
| `-o, --output` | 출력 디렉토리 | `downloaded_site` |

---

## 실제 사용 예제

### 예제 1: 기본 로그인 크롤링
```bash
python Donwnload_Website_OfflineV2.py \
    --login \
    --username "myid" \
    --password "mypassword"
```

### 예제 2: 다른 로그인 페이지 URL 사용
```bash
python Donwnload_Website_OfflineV2.py \
    https://example.com \
    --login \
    --login-url "https://example.com/member/login" \
    --username "myid" \
    --password "mypassword"
```

### 예제 3: 커스텀 CSS Selector 사용
```bash
python Donwnload_Website_OfflineV2.py \
    --login \
    --username "myid" \
    --password "mypassword" \
    --username-selector "#user_id" \
    --password-selector "#user_pw" \
    --submit-selector ".login-btn"
```

### 예제 4: 브라우저 보이게 실행 (디버깅용)
```bash
python Donwnload_Website_OfflineV2.py \
    --login \
    --username "myid" \
    --password "mypassword" \
    --visible
```

### 예제 5: 크롤링 깊이 조절
```bash
python Donwnload_Website_OfflineV2.py \
    --login \
    --username "myid" \
    --password "mypassword" \
    --depth 5 \
    --output "my_site"
```

### 예제 6: 현재 사이트 전체 옵션 예제
```bash
python Donwnload_Website_OfflineV2.py \
    https://xn--o39a0n963awza76tu9hduc.com \
    --login \
    --username "your_admin_id" \
    --password "your_admin_password" \
    --depth 10 \
    --output "downloaded_site_admin"
```

---

## 문제 해결

### 1. CSS Selector 찾는 방법

1. 크롬 브라우저에서 로그인 페이지 열기
2. F12 키를 눌러 개발자 도구 열기
3. Elements 탭에서 ID 입력 필드를 찾기
4. 우클릭 → Copy → Copy selector
5. `--username-selector` 옵션에 붙여넣기

**예제:**
- ID 입력창: `<input name="mb_id">` → `input[name='mb_id']`
- 비밀번호: `<input id="password">` → `#password`
- 로그인 버튼: `<button class="btn-login">` → `.btn-login`

### 2. 로그인 실패 시
- `--visible` 옵션을 사용하여 브라우저를 보면서 확인
- CSS selector가 올바른지 확인
- 로그인 후 대기 시간이 충분한지 확인 (코드에서 3초 대기)

### 3. Playwright 오류 시
```bash
# Playwright 재설치
pip uninstall playwright
pip install playwright
playwright install chromium
```

---

## 🔍 작동 원리

1. **Playwright 로그인**: 실제 브라우저를 사용하여 로그인
2. **쿠키 획득**: 로그인 후 인증 쿠키를 가져옴
3. **쿠키 주입**: requests.Session에 쿠키를 주입
4. **인증 크롤링**: 인증된 상태로 기존 크롤링 로직 실행

이 방식의 장점:
- ✅ 기존 크롤링 코드 변경 없음
- ✅ requests의 빠른 속도 유지
- ✅ Playwright의 강력한 로그인 처리
- ✅ JavaScript 렌더링 지원

---

## 📝 참고사항

- 로그인이 필요 없는 사이트는 `--login` 옵션 없이 실행
- 첫 실행 시 `--visible` 옵션으로 로그인 과정 확인 권장
- 관리자 계정으로 로그인하면 더 많은 콘텐츠 접근 가능
- 쿠키는 세션 동안만 유지되며 저장되지 않음

---

## 🚀 빠른 시작

```bash
# 1. 패키지 설치
pip install playwright
playwright install chromium

# 2. 로그인 후 크롤링 실행
python Donwnload_Website_OfflineV2.py \
    --login \
    --username "your_id" \
    --password "your_password" \
    --visible  # 첫 실행 시 권장

# 3. 성공 확인 후 headless 모드로 실행
python Donwnload_Website_OfflineV2.py \
    --login \
    --username "your_id" \
    --password "your_password"
```

---

**작성일**: 2025-10-13  
**버전**: 2.0 with Playwright Login

