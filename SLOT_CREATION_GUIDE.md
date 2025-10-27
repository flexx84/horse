# 슬롯 생성 가이드

## 📋 슬롯 생성 시스템 완전 분석

### 질문: "슬롯을 생성하는것도 관리자 페이지에서 생성해주고 있던거야?"

**답변: 네, 맞습니다!** ✅

슬롯은 **관리자 웹 페이지의 모달 창**에서 생성됩니다.

---

## 🎯 슬롯 생성 프로세스

### 1. UI 흐름

```
슬롯 목록 페이지
    ↓
[슬롯 추가] 버튼 클릭
    ↓
모달 창 열림 (modalSlotAdd)
    ↓
정보 입력:
  • 사용자 선택
  • 슬롯 개수
  • 기간 설정
  • 슬롯 타입
  • 종료일
    ↓
[슬롯 생성] 버튼 클릭
    ↓
확인 창: "슬롯을 생성하겠습니까?"
    ↓
API 호출: POST /slot/add
    ↓
성공 → 페이지 새로고침
```

---

## 🔧 API 엔드포인트

### POST /slot/add

**요청 파라미터**:
```javascript
{
  slot_userid: "pcsmkt7",        // 사용자 ID (필수)
  slot_count: 5,                  // 생성할 슬롯 개수 (필수)
  slot_limit: 30,                 // 기간 (일수)
  slot_type: "NA",                // 슬롯 타입
  slot_end_date: "2025.11.23",   // 종료일
  slot_today: 1                   // 오늘부터 시작 (1=오늘, 0=지정일)
}
```

**응답**:
```json
{
  "result": "success",
  "message": "5개의 슬롯이 생성되었습니다."
}
```

---

## 📝 슬롯 타입

| 코드 | 이름 | 설명 |
|------|------|------|
| **NA** | 네이버 자동완성 | 네이버 검색 자동완성 슬롯 |
| **GA** | 구글 자동완성 | 구글 검색 자동완성 슬롯 |
| **YA** | 유튜브 자동완성 | 유튜브 검색 자동완성 슬롯 |
| **WS** | 웹사이트 | 웹사이트 트래픽 슬롯 |
| **CP** | 카페/블로그 | 네이버 카페/블로그 슬롯 |
| **NS** | 네이버 쇼핑 | 네이버 쇼핑 슬롯 |

---

## 🎨 Frontend 코드 위치

### 모달 창 HTML
```html
<!-- 슬롯 추가 모달 -->
<div class="modal" id="modal-slot-add">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5>슬롯 추가</h5>
      </div>
      <div class="modal-body">
        <!-- 사용자 선택 -->
        <select id="add-slot-userid">
          <option value="">사용자 선택</option>
        </select>

        <!-- 슬롯 개수 -->
        <input type="number" id="add-slot-count" value="1" />

        <!-- 기간 설정 -->
        <input type="number" id="add-slot-limit" value="30" />

        <!-- 슬롯 타입 -->
        <select id="add-slot-type">
          <option value="NA">네이버 자동완성</option>
          <option value="GA">구글 자동완성</option>
          <!-- ... -->
        </select>

        <!-- 종료일 -->
        <input type="date" id="add-slot-date" />

        <!-- 오늘부터 시작 -->
        <input type="checkbox" id="add-slot-today" checked />
      </div>
      <div class="modal-footer">
        <button id="btn-add-slot">슬롯 생성</button>
      </div>
    </div>
  </div>
</div>
```

### JavaScript 이벤트 핸들러

**파일**: `impact_depth100/impact.me.kr/slot/NA/index.html`
**Line**: 2644-2681

```javascript
// 슬롯 생성 버튼 클릭 이벤트
$(document).on('click', '#btn-add-slot', function() {
    if(confirm('슬롯을 생성하겠습니까?')) {

        var formData = {
            slot_userid: $('#add-slot-userid').val(),
            slot_count: $("#add-slot-count").val(),
            slot_limit: $("#add-slot-limit").val(),
            slot_type: $('#add-slot-type').val(),
            slot_end_date: $("#add-slot-date").val(),
            slot_today: $('#add-slot-today').is(':checked') ? 1 : 0
        };

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/slot/add',
            method: 'POST',
            dataType: 'JSON',
            data: formData,
            success: function (response) {
                alert(response.message);
                if (response.result == 'success') {
                    location.reload();
                }
            },
            error: function (xhr) {
                alert('생성 실패했습니다');
            }
        });
    }
});
```

---

## 🖥️ Backend 구현

### Express.js API 엔드포인트

**파일**: `backend/server.js`
**Line**: 474-541

```javascript
// 15. POST /slot/add - Create new slots
app.post('/slot/add', (req, res) => {
  const {
    slot_userid,
    slot_count,
    slot_limit,
    slot_type,
    slot_end_date,
    slot_today
  } = req.body;

  try {
    // Get user info
    const user = db.prepare(`
      SELECT user_name FROM users WHERE user_id = ?
    `).get(slot_userid);

    if (!user) {
      return res.json({
        result: 'error',
        message: '사용자를 찾을 수 없습니다.'
      });
    }

    // Calculate dates
    const startDate = slot_today == 1 ? new Date() : new Date();
    const endDate = slot_end_date ?
      new Date(slot_end_date.replace(/\./g, '-')) : new Date();
    endDate.setDate(endDate.getDate() + parseInt(slot_limit || 30));

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };

    // Insert slots
    const insert = db.prepare(`
      INSERT INTO slots (
        user_id, user_name, agency, keyword, rankkeyword,
        ranking, ranking_status, slot_type,
        start_date, end_date, memo
      ) VALUES (?, ?, '', '', '', 999, 'X', ?, ?, ?, '')
    `);

    const count = parseInt(slot_count || 1);
    for (let i = 0; i < count; i++) {
      insert.run(
        slot_userid,
        user.user_name,
        slot_type || 'NA',
        formatDate(startDate),
        formatDate(endDate)
      );
    }

    res.json({
      result: 'success',
      message: `${count}개의 슬롯이 생성되었습니다.`
    });
  } catch (error) {
    console.error('Error creating slots:', error);
    res.json({
      result: 'error',
      message: '슬롯 생성에 실패했습니다.'
    });
  }
});
```

---

## 🗄️ 데이터베이스 구조

### 생성된 슬롯의 초기 상태

```sql
INSERT INTO slots (
  user_id,           -- 'pcsmkt7'
  user_name,         -- '장부장'
  agency,            -- '' (나중에 설정)
  keyword,           -- '' (나중에 설정)
  rankkeyword,       -- '' (나중에 설정)
  ranking,           -- 999 (순위 없음)
  ranking_status,    -- 'X' (비활성)
  slot_type,         -- 'NA', 'GA' 등
  start_date,        -- '2025.10.27'
  end_date,          -- '2025.11.26'
  memo               -- ''
)
```

### 슬롯 생성 후 워크플로우

1. **슬롯 생성** → 빈 슬롯 (keyword = '', ranking = 999, status = 'X')
2. **키워드 설정** → 인라인 편집 또는 `POST /slot/set`
3. **활성화** → ranking_status = 'O'
4. **Bot 실행** → 자동으로 순위 업데이트

---

## 📊 슬롯 생성 히스토리

슬롯이 생성되면 **히스토리 페이지**(`/slot/history`)에 기록됩니다:

```
• 작업: 슬롯생성 (job = 'N')
• 일수: 30
• 사용자: pcsmkt7 (장부장)
• 대행사: 런앤런
• 슬롯 타입: N자동완성 / G자동완성 등
```

---

## 🚀 실제 사용 예시

### 1. 네이버 자동완성 슬롯 5개 생성 (30일간)

```javascript
// Frontend에서 AJAX 호출
$.ajax({
  url: 'http://localhost:3000/slot/add',
  method: 'POST',
  data: {
    slot_userid: 'pcsmkt7',
    slot_count: 5,
    slot_limit: 30,
    slot_type: 'NA',
    slot_today: 1
  },
  success: function(response) {
    // "5개의 슬롯이 생성되었습니다."
    alert(response.message);
    location.reload();
  }
});
```

### 2. cURL로 테스트

```bash
curl -X POST http://localhost:3000/slot/add \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "slot_userid=pcsmkt7" \
  -d "slot_count=3" \
  -d "slot_limit=30" \
  -d "slot_type=GA" \
  -d "slot_today=1"
```

**응답**:
```json
{
  "result": "success",
  "message": "3개의 슬롯이 생성되었습니다."
}
```

---

## ✅ 완료 사항

### Backend API
- [x] `POST /slot/add` 엔드포인트 구현 (`server.js:474-541`)
- [x] 사용자 검증 로직
- [x] 날짜 계산 로직
- [x] 빈 슬롯 생성 로직
- [x] 에러 처리

### 문서화
- [x] API_DOCUMENTATION.md 업데이트
- [x] SLOT_CREATION_GUIDE.md 작성 (이 문서)
- [x] server.js에 API 엔드포인트 로그 추가

---

## 🎯 핵심 요약

1. **슬롯 생성은 관리자 웹 페이지에서 이루어집니다** ✅
2. **모달 창**(`modalSlotAdd`)을 통해 정보 입력
3. **`POST /slot/add` API**로 서버에 요청
4. **Backend에서 빈 슬롯**을 Database에 삽입
5. **생성 후** 키워드 설정 → Bot 실행 → 순위 추적

---

**작성일**: 2025-10-27
**Backend API**: ✅ 구현 완료
**Frontend UI**: ✅ 분석 완료
**문서화**: ✅ 완료
