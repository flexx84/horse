# 전체 Bot 시스템 가이드

모든 카테고리의 봇이 구현되었습니다! 🎉

---

## 📊 구현 완료된 봇 시스템

### ✅ 완료된 봇들

| 봇 이름 | 파일 | 슬롯 타입 | 설명 |
|--------|------|---------|------|
| **네이버 자동완성** | `naver-bot.js` | NA | 네이버 검색 자동완성 슬롯 |
| **구글 자동완성** | `google-bot.js` | GA | 구글 검색 자동완성 슬롯 |
| **유튜브 자동완성** | `youtube-bot.js` | YA | 유튜브 검색 자동완성 슬롯 |
| **웹사이트 트래픽** | `website-bot.js` | WS | 직접 웹사이트 방문 및 탐색 |
| **카페/블로그** | `cafe-blog-bot.js` | CP | 네이버 카페/블로그 검색 및 조회 |
| **네이버 쇼핑** | `naver-shopping-bot.js` | NS | 네이버 쇼핑 상품 검색 및 조회 |

### 📋 지원되는 기능

모든 봇이 다음 기능을 포함합니다:

- ✅ Puppeteer + Stealth Plugin (봇 감지 우회)
- ✅ 프록시 로테이션
- ✅ User-Agent 로테이션
- ✅ 인간 행동 시뮬레이션 (마우스, 스크롤, 타이핑)
- ✅ 자동 순위 업데이트 (Database)
- ✅ 시간별 순위 기록
- ✅ 랜덤 딜레이 (자연스러운 행동)

---

## 🚀 실행 방법

### 1. 개별 봇 실행

```bash
cd D:\Download_Website_OffilinV2\backend\workers

# 네이버 봇
npm run naver

# 구글 봇
npm run google

# 유튜브 봇
npm run youtube

# 웹사이트 트래픽 봇
npm run website

# 테스트 봇 (시각화)
npm test            # 모든 테스트
npm run test:simple # 간단한 테스트
npm run test:slot   # 슬롯 데이터 테스트
```

---

### 2. 자동 스케줄러 실행

```bash
cd D:\Download_Website_OffilinV2\backend\workers
npm start
```

**스케줄:**
- 네이버 봇 (NA): 매 **10분**
- 구글 봇 (GA): 매 **15분**
- 유튜브 봇 (YA): 매 **20분**
- 카페/블로그 봇 (CP): 매 **25분**
- 웹사이트 봇 (WS): 매 **30분**
- 네이버 쇼핑 봇 (NS): 매 **35분**
- 순위 확인: 매 **시간** 정각
- 일일 리포트: 매일 **오전 9시**

---

## 🎯 각 봇의 동작 방식

### 1. 네이버 자동완성 봇 (naver-bot.js)

```
1. 네이버 메인 페이지 접속
2. 검색창에 "순위키워드" 입력 (한 글자씩)
3. 자동완성 목록 대기
4. 자동완성에서 "키워드" 검색
5. 발견 시:
   ✅ 순위 기록 (몇 위인지)
   ✅ 해당 항목 클릭
   ✅ Database 업데이트
6. 검색 결과에서 목표 사이트 클릭
7. 사이트 체류 (5~15초)
8. 인간 행동 시뮬레이션
```

**예시:**
```javascript
await executeNaverSearch(slot, {
  targetDomain: 'example.com'
});
```

---

### 2. 구글 자동완성 봇 (google-bot.js)

```
1. 구글 메인 페이지 접속
2. 검색창에 "순위키워드" 입력
3. 자동완성 목록 대기
4. 자동완성에서 "키워드" 검색
5. 발견 시:
   ✅ 순위 기록
   ✅ 항목 클릭
   ✅ Database 업데이트
6. 검색 결과에서 목표 사이트 클릭
7. 사이트 체류
```

**예시:**
```javascript
await executeGoogleSearch(slot, {
  targetDomain: 'example.com'
});
```

---

### 3. 유튜브 자동완성 봇 (youtube-bot.js)

```
1. 유튜브 메인 페이지 접속
2. 검색창에 "순위키워드" 입력
3. 자동완성 목록 대기
4. 자동완성에서 "키워드" 검색
5. 발견 시:
   ✅ 순위 기록
   ✅ 항목 클릭
   ✅ Database 업데이트
6. 검색 결과에서 목표 동영상 클릭
7. 동영상 시청 (10~30초)
```

**예시:**
```javascript
await executeYouTubeSearch(slot, {
  targetChannel: '@example-channel'
  // 또는 targetVideo: 'video-id'
});
```

---

### 4. 웹사이트 트래픽 봇 (website-bot.js)

```
1. 목표 웹사이트 직접 접속
2. 메인 페이지 체류 (3~7초)
3. 페이지 탐색 (마우스, 스크롤)
4. 내부 링크 클릭 (2~4개 페이지)
5. 각 페이지에서 체류 (3~8초)
6. 인간 행동 시뮬레이션
7. 총 체류 시간: 약 30~60초
```

**예시:**
```javascript
// WS 슬롯은 keyword 필드에 URL 저장
slot.keyword = 'https://example.com';

await executeWebsiteVisit(slot);
```

---

### 5. 카페/블로그 봇 (cafe-blog-bot.js)

```
1. 네이버 카페/블로그 검색 페이지 접속
2. 검색창에 "키워드" 입력
3. 검색 실행
4. 검색 결과에서 목표 게시물 찾기
5. 발견 시:
   ✅ 순위 기록
   ✅ 게시물 클릭
   ✅ Database 업데이트
6. 게시물 읽기 (5~15초 체류)
7. 인간 행동 시뮬레이션
```

**예시:**
```javascript
await executeCafeBlogSearch(slot, {
  searchType: 'cafe',  // 'cafe' 또는 'blog'
  targetTitle: '특정 게시물 제목'
});
```

---

### 6. 네이버 쇼핑 봇 (naver-shopping-bot.js)

```
1. 네이버 쇼핑 페이지 접속
2. 검색창에 "상품명" 입력
3. 검색 실행
4. 검색 결과에서 목표 상품 찾기
5. 발견 시:
   ✅ 순위 기록
   ✅ 상품 클릭
   ✅ Database 업데이트
6. 상품 정보 확인 (5~15초 체류)
7. 추가 행동:
   - 이미지 확대 보기
   - 상세 정보 스크롤
   - 리뷰 탭 확인
```

**예시:**
```javascript
await executeNaverShoppingSearch(slot, {
  targetTitle: '특정 상품명'
  // 또는 targetShop: 'shop-name'
});
```

---

## 📁 파일 구조

```
D:\Download_Website_OffilinV2\backend\workers\
│
├─ naver-bot.js             ✅ 네이버 자동완성 봇
├─ google-bot.js            ✅ 구글 자동완성 봇
├─ youtube-bot.js           ✅ 유튜브 자동완성 봇
├─ website-bot.js           ✅ 웹사이트 트래픽 봇
├─ cafe-blog-bot.js         ✅ 카페/블로그 봇
├─ naver-shopping-bot.js    ✅ 네이버 쇼핑 봇
│
├─ scheduler.js             ✅ 크론잡 스케줄러 (통합)
├─ test-bot.js              ✅ 테스트 봇 (시각화)
│
├─ package.json             ✅ 업데이트 완료
├─ screenshots/             📸 테스트 스크린샷
│
└─ README.md                📚 이 문서
```

---

## ⚙️ 설정 변경

### 1. 목표 도메인/채널 설정

각 봇 파일의 `main()` 함수에서 변경:

**naver-bot.js (Line 328)**:
```javascript
await executeNaverSearch(slot, {
  targetDomain: 'example.com'  // ⭐ 여기 변경
});
```

**google-bot.js (Line 328)**:
```javascript
await executeGoogleSearch(slot, {
  targetDomain: 'example.com'  // ⭐ 여기 변경
});
```

**youtube-bot.js (Line 335)**:
```javascript
await executeYouTubeSearch(slot, {
  targetChannel: '@example-channel'  // ⭐ 여기 변경
});
```

**website-bot.js**:
```sql
-- Database의 keyword 필드에 URL 저장
UPDATE slots SET keyword = 'https://example.com' WHERE slot_type = 'WS';
```

**cafe-blog-bot.js (Line 339)**:
```javascript
await executeCafeBlogSearch(slot, {
  searchType: 'cafe',  // ⭐ 'cafe' 또는 'blog'
  // targetUrl: 'target-cafe-url',   // 선택적
  // targetTitle: '특정 제목'          // 선택적
});
```

**naver-shopping-bot.js (Line 339)**:
```javascript
await executeNaverShoppingSearch(slot, {
  // targetUrl: 'target-product-url',  // ⭐ 선택적
  // targetTitle: '특정 상품명',        // ⭐ 선택적
  // targetShop: 'shop-name'           // ⭐ 선택적
});
```

---

### 2. 프록시 설정

모든 봇 파일의 `PROXY_POOL` 수정:

```javascript
const PROXY_POOL = [
  { ip: '127.0.0.1', port: 8080, country: 'KR', used: 0 },
  // ⭐ 실제 프록시 추가:
  { ip: 'xxx.xxx.xxx.xxx', port: 8080, country: 'KR', used: 0 },
  { ip: 'yyy.yyy.yyy.yyy', port: 8080, country: 'US', used: 0 },
];
```

---

### 3. 실행 스케줄 변경

`scheduler.js`에서 크론 표현식 수정:

```javascript
// 매 10분 → 매 5분으로 변경
cron.schedule('*/5 * * * *', async () => {
  // 네이버 봇 실행
});

// 매 15분 → 매 20분으로 변경
cron.schedule('*/20 * * * *', async () => {
  // 구글 봇 실행
});
```

**크론 표현식 예시:**
```
'*/10 * * * *'  - 매 10분
'0 * * * *'     - 매 시간 정각
'0 9 * * *'     - 매일 오전 9시
'0 9,18 * * *'  - 매일 오전 9시, 오후 6시
'0 0 * * 0'     - 매주 일요일 자정
```

---

## 🧪 테스트 방법

### 1. 시각적 테스트 (브라우저 창 보기)

```bash
cd D:\Download_Website_OffilinV2\backend\workers

# 간단한 네이버 접속 테스트
npm run test:simple

# 실제 슬롯 데이터 테스트
npm run test:slot
```

**결과:**
- 브라우저 창이 열림 (headless: false)
- 각 단계별 스크린샷 저장
- `screenshots/` 폴더 확인

---

### 2. 실제 봇 테스트

```bash
# 네이버 봇 단독 실행
npm run naver

# 구글 봇 단독 실행
npm run google

# 유튜브 봇 단독 실행
npm run youtube

# 웹사이트 봇 단독 실행
npm run website

# 카페/블로그 봇 단독 실행
npm run cafe

# 네이버 쇼핑 봇 단독 실행
npm run shopping
```

**확인 사항:**
- 콘솔 로그에서 각 단계 확인
- Database에서 순위 업데이트 확인:
  ```sql
  SELECT * FROM slots WHERE slot_type = 'NA';
  SELECT * FROM hourly_rankings ORDER BY id DESC LIMIT 10;
  ```

---

## 📊 Database 스키마

### slots 테이블
```sql
CREATE TABLE slots (
  id INTEGER PRIMARY KEY,
  user_id TEXT,
  user_name TEXT,
  agency TEXT,
  keyword TEXT,          -- NA/GA/YA: 전체 키워드, WS: URL
  rankkeyword TEXT,      -- 순위 키워드
  ranking INTEGER,       -- 현재 순위
  ranking_status TEXT,   -- 'O' = 활성, 'X' = 비활성
  slot_type TEXT,        -- 'NA', 'GA', 'YA', 'WS', 'CP', 'NS'
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

## 🎯 봇별 특징

### 네이버 봇 (NA)
- **강점**: 한국 시장 특화, 자동완성 정확도 높음
- **용도**: 한국어 키워드, 네이버 쇼핑, 블로그
- **순위 추적**: 1~10위

### 구글 봇 (GA)
- **강점**: 글로벌 검색, 다국어 지원
- **용도**: 영어 키워드, 국제 시장
- **순위 추적**: 자동완성 순위

### 유튜브 봇 (YA)
- **강점**: 동영상 SEO, 채널 홍보
- **용도**: 유튜브 검색, 동영상 조회수
- **순위 추적**: 자동완성 순위

### 웹사이트 봇 (WS)
- **강점**: 직접 트래픽, 체류 시간 증가
- **용도**: GA 지표 개선, 바운스 레이트 감소
- **추적**: 방문 페이지 수, 체류 시간

### 카페/블로그 봇 (CP)
- **강점**: 커뮤니티 노출, 자연스러운 트래픽
- **용도**: 네이버 카페/블로그 검색 순위
- **순위 추적**: 검색 결과 순위

### 네이버 쇼핑 봇 (NS)
- **강점**: 상품 검색 최적화, 쇼핑 트래픽
- **용도**: 네이버 쇼핑 검색 순위, 상품 노출
- **순위 추적**: 상품 검색 결과 순위

---

## ⚠️ 주의사항

### 1. 윤리적 사용
- 교육 및 연구 목적으로만 사용
- 과도한 트래픽 생성 금지
- 서비스 약관 준수

### 2. 기술적 제한
- 같은 IP에서 반복 접속 시 차단 가능
- 프록시 서비스 사용 필수
- 하루 실행 횟수 제한 권장

### 3. 프록시 필수
- 실제 운영 시 **수백~수천 개** 프록시 필요
- 추천 서비스: Bright Data, Oxylabs, Smartproxy

---

## 🔧 문제 해결

### Bot이 실행 안 됨
```bash
# 의존성 재설치
cd backend/workers
rm -rf node_modules
npm install

# Chrome 설치 확인
where chrome  # Windows
which chromium-browser  # Linux
```

### 자동완성이 안 나타남
- 검색어가 너무 짧을 수 있음 (최소 2글자)
- 해당 플랫폼의 자동완성 정책 확인
- `test-bot.js`로 실제 화면 확인

### Database 업데이트 안 됨
```bash
# Database 경로 확인
ls -la backend/impact.db

# 권한 확인
chmod 666 backend/impact.db  # Linux/Mac
```

---

## 📚 관련 문서

- **API 문서**: `API_DOCUMENTATION.md`
- **슬롯 생성 가이드**: `SLOT_CREATION_GUIDE.md`
- **사용 설명서**: `HOW_TO_USE.md`
- **최종 보고서**: `FINAL_REPORT.md`

---

## 🎉 성공 지표

다음 항목들이 모두 작동하면 **시스템이 정상**입니다:

- [x] Backend API 서버 실행 (`npm start`)
- [x] 네이버 봇 실행 (`npm run naver`)
- [x] 구글 봇 실행 (`npm run google`)
- [x] 유튜브 봇 실행 (`npm run youtube`)
- [x] 웹사이트 봇 실행 (`npm run website`)
- [x] 카페/블로그 봇 실행 (`npm run cafe`)
- [x] 네이버 쇼핑 봇 실행 (`npm run shopping`)
- [x] 스케줄러 실행 (`npm start`)
- [x] 테스트 봇 실행 (`npm test`)
- [x] 스크린샷 저장 확인
- [x] Database 순위 업데이트 확인

---

**작성일**: 2025-10-27
**버전**: 3.0.0
**상태**: ✅ **전체 6개 봇 구현 완료 (NA, GA, YA, WS, CP, NS)**
