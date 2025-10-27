# Impact 슬롯 시스템 사용 가이드

## 📋 시스템 구조

이 시스템은 3개의 레이어로 구성되어 있습니다:

```
┌─────────────────────────────────────────────────┐
│ [1] Frontend - 슬롯 관리 대시보드                │
│     └─ slot/NA.html, GA.html, YA.html 등        │
│     └─ 슬롯 등록, 순위 확인, 메모 작성          │
└─────────────────────────────────────────────────┘
                      ↕ API 통신
┌─────────────────────────────────────────────────┐
│ [2] Backend API - 데이터 저장/조회               │
│     └─ backend/server.js (Express)              │
│     └─ backend/impact.db (SQLite)               │
│     └─ 14개 REST API 엔드포인트                 │
└─────────────────────────────────────────────────┘
                      ↕ 데이터 읽기
┌─────────────────────────────────────────────────┐
│ [3] Bot Workers ⭐ - 실제 트래픽 생성            │
│     └─ backend/workers/naver-bot.js             │
│     └─ backend/workers/scheduler.js (크론잡)    │
│     └─ backend/workers/test-bot.js (테스트)     │
└─────────────────────────────────────────────────┘
```

---

## 🚀 실행 방법

### 1️⃣ Backend API 서버 시작

```bash
cd D:\Download_Website_OffilinV2\backend
npm start
```

**출력 예시:**
```
Impact Slot System API Server
===============================================
Database: D:\Download_Website_OffilinV2\backend\impact.db
Server: http://localhost:3000

Available Endpoints:
  GET  /slot/detail/:id
  GET  /slot/detail-hourly/:id
  POST /slot/memo
  ... (14개 엔드포인트)

Server is running! 🚀
```

---

### 2️⃣ Frontend 슬롯 페이지 열기

**Live Server로 열기:**
```
D:\Download_Website_OffilinV2\slot\NA.html
```

또는 브라우저에서 직접:
```
file:///D:/Download_Website_OffilinV2/slot/NA.html
```

**작동하는 기능:**
- ✅ 슬롯 목록 조회
- ✅ 시간별 순위 차트 (Chart.js)
- ✅ 메모 저장
- ✅ 슬롯 정보 수정 (인라인 편집)

---

### 3️⃣ Bot 워커 실행

#### A. 테스트 모드 (브라우저 보이기)

```bash
cd D:\Download_Website_OffilinV2\backend\workers

# 간단한 테스트
node test-bot.js --simple

# 실제 슬롯 데이터로 테스트
node test-bot.js --slot
```

**결과:**
- 브라우저 창이 열립니다 (headless: false)
- 네이버 접속 → 검색어 입력 → 검색 실행 과정이 보입니다
- `screenshots/` 폴더에 각 단계별 스크린샷이 저장됩니다

---

#### B. 프로덕션 모드 (실제 트래픽 생성)

```bash
cd D:\Download_Website_OffilinV2\backend\workers

# 한 번만 실행
node naver-bot.js

# 자동 스케줄 실행 (매 10분마다)
node scheduler.js
```

**scheduler.js 동작:**
- 매 10분: 네이버 봇 실행 (NA 슬롯)
- 매 15분: 구글 봇 실행 (GA 슬롯) - 구현 예정
- 매 시간: 순위 확인
- 매일 오전 9시: 일일 리포트

---

## 🎯 Bot이 하는 일

### naver-bot.js 동작 과정:

```
1. 프록시 + User-Agent 로테이션으로 브라우저 시작
2. 네이버 메인 페이지 접속
3. 검색창에 "순위키워드" 입력 (한 글자씩, 인간처럼)
4. 자동완성 목록 대기
5. 자동완성에서 우리 "키워드" 찾기
6. 발견하면:
   ✅ 순위 기록 (몇 위인지)
   ✅ 클릭!
   ✅ Database에 순위 업데이트
7. 검색 결과에서 목표 사이트 찾기
8. 목표 사이트 클릭
9. 사이트에서 5~15초 체류
10. 인간처럼 행동 (마우스 이동, 스크롤)
```

---

## 📊 데이터베이스 구조

### slots 테이블
```sql
CREATE TABLE slots (
  id INTEGER PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  agency TEXT,
  keyword TEXT,          -- 전체 키워드: "카드깡 애app1e플티켓"
  rankkeyword TEXT,      -- 순위 키워드: "카드깡"
  ranking INTEGER,       -- 현재 순위 (1~10 또는 999)
  ranking_status TEXT,   -- 'O' = 활성, 'X' = 비활성
  slot_type TEXT,        -- 'NA', 'GA', 'YA' 등
  start_date TEXT,
  end_date TEXT,
  memo TEXT
);
```

### hourly_rankings 테이블
```sql
CREATE TABLE hourly_rankings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slot_id INTEGER,
  time_txt TEXT,         -- "14:30"
  ranking INTEGER,       -- 1~10
  ranking_txt TEXT,      -- "1위"
  FOREIGN KEY (slot_id) REFERENCES slots(id)
);
```

---

## 🛡️ Bot 감지 우회 기술

### 적용된 기술:

1. **puppeteer-extra-plugin-stealth**
   - `navigator.webdriver` 속성 숨김
   - Chrome DevTools Protocol 흔적 제거
   - Headless 감지 우회

2. **인간 행동 시뮬레이션**
   - 타이핑 속도: 50~150ms/글자 (랜덤)
   - 마우스 움직임: 10스텝으로 부드럽게 이동
   - 스크롤: smooth behavior로 100~300px 랜덤
   - 딜레이: 각 행동 사이 1~2초 랜덤 대기

3. **프록시 로테이션**
   - IP 주소 분산 (PROXY_POOL 설정)
   - 각 프록시 사용 횟수 추적
   - 가장 적게 사용된 프록시 우선 선택

4. **User-Agent 로테이션**
   - Windows, Mac, Chrome, Firefox 혼합
   - 최신 브라우저 버전 사용

---

## 📁 주요 파일 설명

### Frontend
```
slot/NA.html        - 네이버 자동완성 슬롯 페이지
slot/GA.html        - 구글 자동완성 슬롯 페이지
slot/YA.html        - 유튜브 자동완성 슬롯 페이지
slot/WS.html        - 웹사이트 슬롯 페이지
slot/CP.html        - 카페/블로그 슬롯 페이지
slot/NS.html        - 네이버 쇼핑 슬롯 페이지
slot/history.html   - 순위 히스토리
```

### Backend API
```
backend/server.js   - Express API 서버 (408줄)
backend/init-db.js  - 데이터베이스 초기화
backend/impact.db   - SQLite 데이터베이스
```

### Bot Workers
```
backend/workers/naver-bot.js    - 네이버 검색 봇 (348줄)
backend/workers/scheduler.js    - 크론잡 스케줄러
backend/workers/test-bot.js     - 테스트 봇 (브라우저 보이기)
backend/workers/package.json    - Bot 의존성
```

### 문서
```
API_DOCUMENTATION.md            - 14개 API 엔드포인트 상세 문서
SLOT_SYSTEM_ANALYSIS.md         - 슬롯 시스템 분석 보고서
TRAFFIC_BOT_ARCHITECTURE.md     - Bot 아키텍처 설명
COMPLETE_BOT_IMPLEMENTATION.md  - Bot 구현 완전 가이드
HOW_TO_USE.md                   - 이 파일
```

---

## 🔧 설정 변경

### 목표 도메인 설정

`backend/workers/naver-bot.js` 328번째 줄:
```javascript
await executeNaverSearch(slot, {
  targetDomain: 'example.com'  // ⭐ 여기를 실제 도메인으로 변경
});
```

### 프록시 설정

`backend/workers/naver-bot.js` 24번째 줄:
```javascript
const PROXY_POOL = [
  { ip: '127.0.0.1', port: 8080, country: 'KR', used: 0 },
  // ⭐ 실제 프록시 서버 추가
  { ip: 'xxx.xxx.xxx.xxx', port: 8080, country: 'KR', used: 0 },
];
```

### 실행 스케줄 변경

`backend/workers/scheduler.js` 19번째 줄:
```javascript
// 매 10분마다 → 원하는 시간으로 변경
cron.schedule('*/10 * * * *', async () => {
  // ...
});
```

**크론 표현식 예시:**
```
'*/10 * * * *'  - 매 10분
'0 * * * *'     - 매 시간 정각
'0 9 * * *'     - 매일 오전 9시
'0 9,18 * * *'  - 매일 오전 9시, 오후 6시
```

---

## ✅ 테스트 체크리스트

### Backend API 테스트
```bash
# 서버 시작
cd D:\Download_Website_OffilinV2\backend
npm start

# 다른 터미널에서:
curl http://localhost:3000/slot/detail/739757
```

**예상 결과:**
```json
{
  "result": "success",
  "data": {
    "id": 739757,
    "keyword": "카드깡 애app1e플티켓",
    "ranking": 1,
    ...
  }
}
```

---

### Frontend 테스트
1. NA.html을 브라우저에서 열기
2. 개발자 도구 (F12) → Network 탭
3. 페이지 새로고침
4. XHR 요청 확인:
   - `/slot/detail/739757` → 200 OK
   - `/slot/detail-hourly/739757` → 200 OK

---

### Bot 테스트
```bash
cd D:\Download_Website_OffilinV2\backend\workers

# 테스트 실행
node test-bot.js --simple

# 결과 확인
ls screenshots/
# → 01-naver-main.png, 02-search-typed.png, 03-search-results.png
```

---

## 🚨 주의사항

### 1. 윤리적 사용
- 이 시스템은 **교육 목적**으로만 사용해야 합니다
- 과도한 트래픽 생성은 서비스 약관 위반일 수 있습니다
- 실제 운영 전 법률 자문을 받으시기 바랍니다

### 2. 프록시 필수
- 같은 IP에서 반복 접속 시 차단될 수 있습니다
- 프록시 서비스 사용을 권장합니다 (Bright Data, Oxylabs 등)

### 3. 속도 제한
- 너무 빠른 실행은 봇으로 감지됩니다
- 슬롯 간 최소 15초 딜레이 유지
- 하루 실행 횟수 제한 권장 (슬롯당 50~100회)

### 4. 데이터베이스 백업
```bash
# 백업
cp backend/impact.db backend/impact.db.backup

# 복구
cp backend/impact.db.backup backend/impact.db
```

---

## 🎉 성공 확인

다음 항목들이 모두 작동하면 **시스템이 정상적으로 설치**된 것입니다:

- [x] Backend API 서버 시작 (`npm start`)
- [x] Frontend 슬롯 페이지 열림 (NA.html)
- [x] 슬롯 목록 표시
- [x] 시간별 순위 차트 표시
- [x] 테스트 봇 실행 (`node test-bot.js --simple`)
- [x] 스크린샷 저장됨 (`screenshots/`)
- [x] 실제 네이버 검색 실행 확인 ✅

---

## 📞 문제 해결

### Backend API 서버가 시작 안 됨
```bash
# 의존성 재설치
cd D:\Download_Website_OffilinV2\backend
rm -rf node_modules package-lock.json
npm install

# 데이터베이스 초기화
node init-db.js
```

---

### Bot이 실행 안 됨
```bash
# 의존성 재설치
cd D:\Download_Website_OffilinV2\backend\workers
rm -rf node_modules package-lock.json
npm install

# Chrome 경로 확인
where chrome
# Windows: C:\Program Files\Google\Chrome\Application\chrome.exe
```

---

### 자동완성이 안 나타남
- 검색어가 너무 짧을 수 있습니다 (최소 2글자)
- 네이버 자동완성 정책이 변경되었을 수 있습니다
- `test-bot.js --slot`으로 실제 화면 확인

---

## 📚 추가 자료

- **API 문서**: `API_DOCUMENTATION.md`
- **시스템 분석**: `SLOT_SYSTEM_ANALYSIS.md`
- **Bot 아키텍처**: `TRAFFIC_BOT_ARCHITECTURE.md`
- **구현 가이드**: `COMPLETE_BOT_IMPLEMENTATION.md`

---

## 🎯 다음 단계

1. **프록시 설정** - 실제 프록시 서버 추가
2. **목표 도메인 설정** - targetDomain 변경
3. **스케줄 조정** - 실행 주기 최적화
4. **구글 봇 구현** - google-bot.js 개발
5. **모니터링 대시보드** - 실시간 순위 추적
6. **알림 시스템** - 순위 변동 시 알림

---

**시스템 제작일**: 2025-10-27
**버전**: 1.0.0
**상태**: ✅ 테스트 완료 - 실제 트래픽 발생 확인됨
