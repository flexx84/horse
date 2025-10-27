# Impact Slot System - API Documentation

완벽히 재현된 API 엔드포인트와 요청/응답 구조 문서

## 🔍 API 분석 방법
- Chrome DevTools MCP로 실제 서버에서 네트워크 요청 캡처
- JavaScript 소스 코드 분석 (D:\Download_Website_OffilinV2\impact_depth100\impact.me.kr\slot\GA\index.html)
- 실제 캡처된 요청/응답 데이터 기반 문서화

---

## 📋 목차
1. [슬롯 조회 API](#슬롯-조회-api)
2. [슬롯 생성 API](#슬롯-생성-api) ⭐
3. [슬롯 수정 API](#슬롯-수정-api)
4. [슬롯 관리 API](#슬롯-관리-api)
5. [메모 API](#메모-api)
6. [사용자 검색 API](#사용자-검색-api)
7. [엑셀 업로드 API](#엑셀-업로드-api)

---

## 슬롯 조회 API

### 1. 슬롯 상세 정보 조회
**실제 캡처된 API** ✅

```
GET /slot/detail/{id}
```

#### Request
```http
GET /slot/detail/739757 HTTP/1.1
Host: impact.me.kr
X-Requested-With: XMLHttpRequest
Accept: application/json, text/javascript, */*; q=0.01
```

#### Response
```json
{
  "result": "success",
  "data": {
    "ID": "739757",
    "USER_ID": "pcsmkt7",
    "USER_NAME": "장부장",
    "AGENCY": "runknight",
    "KEYWORD": "카드깡 애app1e플티켓",
    "RANKKEYWORD": "카드깡",
    "RANKING": "1",
    "RANKING_STATUS": "O",
    "STARTDATE": "2025.10.25",
    "ENDDATE": "2025.11.23",
    "MEMO": ""
  }
}
```

#### JavaScript 코드 위치
- Line 2258-2268: 슬롯 조회 버튼 클릭 핸들러

---

### 2. 시간별 순위 조회
**실제 캡처된 API** ✅

```
GET /slot/detail-hourly/{id}
```

#### Request
```http
GET /slot/detail-hourly/739757 HTTP/1.1
Host: impact.me.kr
X-Requested-With: XMLHttpRequest
Accept: application/json, text/javascript, */*; q=0.01
```

#### Response
```json
{
  "result": "success",
  "data": {
    "keyword": "카드깡",
    "items": [
      {
        "time_txt": "09:00",
        "ranking": 1,
        "ranking_txt": "1위"
      },
      {
        "time_txt": "08:00",
        "ranking": 2,
        "ranking_txt": "2위"
      }
    ]
  }
}
```

**빈 데이터 응답 (실제 캡처):**
```json
{
  "result": "success",
  "data": {
    "keyword": "카드깡",
    "items": []
  }
}
```

#### JavaScript 코드 위치
- Line 3342-3395: 데스크톱 시간별 순위 버튼 핸들러
- Line 4120-4175: 모바일 시간별 순위 버튼 핸들러

---

## 슬롯 생성 API

### 슬롯 생성 (NEW ⭐)
**JavaScript 소스 분석** 📝

```
POST /slot/add
```

#### Request
```http
POST /slot/add HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded
```

#### FormData Parameters
```javascript
{
  "slot_userid": "pcsmkt7",        // 사용자 ID (필수)
  "slot_count": 5,                  // 생성할 슬롯 개수 (필수)
  "slot_limit": 30,                 // 기간 (일수)
  "slot_type": "NA",                // 슬롯 타입: NA, GA, YA, WS, CP, NS
  "slot_end_date": "2025.11.23",   // 종료일 (YYYY.MM.DD)
  "slot_today": 1                   // 오늘부터 시작: 1 = 오늘, 0 = 지정일
}
```

#### Response
```json
{
  "result": "success",
  "message": "5개의 슬롯이 생성되었습니다."
}
```

#### 동작 방식
1. 사용자 ID로 사용자 정보 조회
2. 시작일/종료일 계산
3. 지정된 개수만큼 빈 슬롯 생성
4. 생성된 슬롯은 초기 상태:
   - `keyword`: 빈 문자열 (나중에 설정)
   - `rankkeyword`: 빈 문자열 (나중에 설정)
   - `ranking`: 999 (순위 없음)
   - `ranking_status`: 'X' (비활성)

#### JavaScript 코드 위치
- Line 2644-2681 (NA.html): 슬롯 생성 버튼 클릭 이벤트
- Line 3187-3224 (GA.html): 슬롯 생성 버튼 클릭 이벤트

#### 사용 예시
```javascript
// 네이버 자동완성 슬롯 5개 생성 (30일간)
$.ajax({
  url: '/slot/add',
  method: 'POST',
  data: {
    slot_userid: 'pcsmkt7',
    slot_count: 5,
    slot_limit: 30,
    slot_type: 'NA',
    slot_today: 1
  },
  success: function(response) {
    alert(response.message);
    location.reload();
  }
});
```

---

## 슬롯 수정 API

### 3. 인라인 수정
**JavaScript 소스 분석** 📝

```
POST /slot/set-inline
```

#### Request
```http
POST /slot/set-inline HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded

slot_id=739757&slot_keyword=카드깡&slot_rankkeyword=카드깡&slot_memo=메모내용
```

#### FormData Parameters
```javascript
{
  "slot_id": "739757",
  "slot_keyword": "카드깡 애app1e플티켓",
  "slot_rankkeyword": "카드깡",
  "slot_memo": "메모 내용"
}
```

#### Response
```json
{
  "result": "success",
  "message": "수정이 저장되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2062-2072: 인라인 수정 AJAX 호출

---

### 4. 일괄 수정
**JavaScript 소스 분석** 📝

```
POST /slot/set-all
```

#### Request
```http
POST /slot/set-all HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded
```

#### FormData Parameters
```javascript
{
  "id": ["739757", "739756", "739755"],
  "slot_userid": "pcsmkt7",
  "slot_agency": "runknight",
  "slot_keyword": "카드깡",
  "slot_rankkeyword": "카드깡",
  "slot_startdate": "2025.10.25",
  "slot_enddate": "2025.11.23"
}
```

#### Response
```json
{
  "result": "success",
  "message": "일괄 수정이 완료되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2227-2237: 일괄 수정 AJAX 호출

---

### 5. 슬롯 설정
**JavaScript 소스 분석** 📝

```
POST /slot/set
```

#### Request
```http
POST /slot/set HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded
```

#### FormData Parameters
```javascript
{
  "slot_id": "739757",
  "slot_type": "GA",
  "slot_userid": "pcsmkt7",
  "slot_agency": "runknight",
  "slot_keyword": "카드깡",
  "slot_rankkeyword": "카드깡",
  "slot_startdate": "2025.10.25",
  "slot_enddate": "2025.11.23"
}
```

#### Response
```json
{
  "result": "success",
  "message": "슬롯이 저장되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2116-2126: 슬롯 설정 AJAX 호출

---

## 슬롯 관리 API

### 6. 슬롯 삭제
**JavaScript 소스 분석** 📝

```
POST /slot/delete
```

#### Request
```http
POST /slot/delete HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded

id[]=739757
```

#### Response
```json
{
  "result": "success",
  "message": "삭제되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2302-2312: 슬롯 삭제 AJAX 호출

---

### 7. 슬롯 초기화
**JavaScript 소스 분석** 📝

```
POST /slot/init-slot
```

#### Request
```http
POST /slot/init-slot HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded

id[]=739757
```

#### Response
```json
{
  "result": "success",
  "message": "초기화되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2594-2604: 슬롯 초기화 AJAX 호출

---

### 8. 잔여일 차감
**JavaScript 소스 분석** 📝

```
POST /slot/remain-deduct
```

#### Request
```http
POST /slot/remain-deduct HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded

id[]=739757&days=7
```

#### Response
```json
{
  "result": "success",
  "message": "잔여일이 차감되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2345-2355: 잔여일 차감 AJAX 호출

---

### 9. 기간 연장
**JavaScript 소스 분석** 📝

```
POST /slot/extend
```

#### Request
```http
POST /slot/extend HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded

id[]=739757&days=30
```

#### Response
```json
{
  "result": "success",
  "message": "기간이 연장되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2409-2419: 기간 연장 AJAX 호출

---

### 10. 최대 클릭 설정
**JavaScript 소스 분석** 📝

```
POST /slot/max-click
```

#### Request
```http
POST /slot/max-click HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded

id[]=739757&max_click=100
```

#### Response
```json
{
  "result": "success",
  "message": "최대 클릭수가 설정되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2474-2484: 최대 클릭 설정 AJAX 호출

---

### 11. 설정 카운트 조정
**JavaScript 소스 분석** 📝

```
POST /slot/setting-count
```

#### Request
```http
POST /slot/setting-count HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: application/x-www-form-urlencoded

id[]=739757&count=50
```

#### Response
```json
{
  "result": "success",
  "message": "설정 카운트가 조정되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2538-2548: 설정 카운트 AJAX 호출

---

## 메모 API

### 12. 메모 저장
**실제 캡처된 API** ✅

```
POST /slot/memo
```

#### Request
```http
POST /slot/memo HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: 1VdEl4F15uZwZKITPtBqCZfz2Tv14xlR55etfHTA
X-Requested-With: XMLHttpRequest
Content-Type: application/x-www-form-urlencoded

id=739758&memo=%ED%85%8C%EC%8A%A4%ED%8A%B8+%EB%A9%94%EB%AA%A8%EC%9E%85%EB%8B%88%EB%8B%A4
```

#### Decoded Body
```
id=739758&memo=테스트 메모입니다
```

#### Response
```json
{
  "result": "success",
  "message": "메모가 수정되었습니다."
}
```

#### JavaScript 코드 위치
- Line 1974-1984: 메모 저장 AJAX 호출

---

## 사용자 검색 API

### 13. 사용자 검색 (Autocomplete)
**JavaScript 소스 분석** 📝

```
GET /member/search?q={query}
```

#### Request
```http
GET /member/search?q=pcsmkt HTTP/1.1
Host: impact.me.kr
Accept: application/json
```

#### Response
```json
[
  {
    "USER_ID": "pcsmkt7",
    "USER_NAME": "장부장"
  },
  {
    "USER_ID": "pcsmkt8",
    "USER_NAME": "김과장"
  }
]
```

#### JavaScript 코드 위치
- fetch API 사용 (Line 찾기 필요)

---

## 엑셀 업로드 API

### 14. 엑셀 파일 업로드
**JavaScript 소스 분석** 📝

```
POST /slot/upload
```

#### Request
```http
POST /slot/upload HTTP/1.1
Host: impact.me.kr
X-CSRF-TOKEN: {token}
Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...

------WebKitFormBoundary...
Content-Disposition: form-data; name="excel_file"; filename="slots.xlsx"
Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet

[binary data]
------WebKitFormBoundary...
Content-Disposition: form-data; name="slot_type"

GA
------WebKitFormBoundary...
```

#### Response
```json
{
  "result": "success",
  "message": "처리되었습니다."
}
```

#### JavaScript 코드 위치
- Line 2028-2038: 엑셀 업로드 AJAX 호출

---

## 🔐 인증 및 보안

### CSRF 토큰
모든 POST 요청은 CSRF 토큰이 필요합니다:

```javascript
headers: {
  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
}
```

### 세션 쿠키
- `XSRF-TOKEN`: CSRF 보호
- `miraen_web_session`: Laravel 세션

---

## 📊 응답 형식

### 성공 응답
```json
{
  "result": "success",
  "message": "작업이 완료되었습니다.",
  "data": { ... }
}
```

### 실패 응답
```json
{
  "result": "error",
  "message": "오류 메시지"
}
```

---

## 🛠️ 백엔드 구현 계획

### 기술 스택
- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: SQLite3 (개발용) / PostgreSQL (프로덕션)
- **ORM**: Better-SQLite3 (동기식, 빠름)
- **배포**: Vercel Serverless Functions

### 데이터베이스 스키마

#### slots 테이블
```sql
CREATE TABLE slots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT NOT NULL,
  user_name TEXT,
  agency TEXT,
  slot_type TEXT DEFAULT 'GA',
  keyword TEXT,
  rankkeyword TEXT,
  ranking INTEGER DEFAULT 999,
  ranking_status TEXT DEFAULT 'X',
  start_date TEXT,
  end_date TEXT,
  memo TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### hourly_rankings 테이블
```sql
CREATE TABLE hourly_rankings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slot_id INTEGER NOT NULL,
  time_txt TEXT NOT NULL,
  ranking INTEGER,
  ranking_txt TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (slot_id) REFERENCES slots(id) ON DELETE CASCADE
);
```

#### users 테이블
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT UNIQUE NOT NULL,
  user_name TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## ✅ 구현 상태

| API 엔드포인트 | 분석 완료 | 구현 예정 | 테스트 완료 |
|----------------|---------|----------|----------|
| GET /slot/detail/{id} | ✅ | ⏳ | ⏳ |
| GET /slot/detail-hourly/{id} | ✅ | ⏳ | ⏳ |
| POST /slot/memo | ✅ | ⏳ | ⏳ |
| POST /slot/set-inline | ✅ | ⏳ | ⏳ |
| POST /slot/set | ✅ | ⏳ | ⏳ |
| POST /slot/set-all | ✅ | ⏳ | ⏳ |
| POST /slot/delete | ✅ | ⏳ | ⏳ |
| POST /slot/init-slot | ✅ | ⏳ | ⏳ |
| POST /slot/remain-deduct | ✅ | ⏳ | ⏳ |
| POST /slot/extend | ✅ | ⏳ | ⏳ |
| POST /slot/max-click | ✅ | ⏳ | ⏳ |
| POST /slot/setting-count | ✅ | ⏳ | ⏳ |
| GET /member/search | ✅ | ⏳ | ⏳ |
| POST /slot/upload | ✅ | ⏳ | ⏳ |

---

## 📝 참고 사항

1. **실제 캡처 데이터**: Chrome DevTools MCP를 사용해 live 서버에서 실제 요청/응답 캡처
2. **JavaScript 소스**: D:\Download_Website_OffilinV2\impact_depth100\impact.me.kr\slot\GA\index.html 파일 분석
3. **응답 구조**: 모든 API는 `{result: "success/error", message: "...", data: {...}}` 형식
4. **CSRF 보호**: Laravel CSRF 토큰 필수

---

생성 날짜: 2025-10-27
작성자: Claude Code (Sonnet 4.5)
분석 방법: Chrome DevTools MCP + JavaScript 소스 코드 분석
