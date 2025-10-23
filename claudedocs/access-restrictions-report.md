# Access Restrictions and Modal Issues Report

## 분석일: 2025-10-24

## 1. 접근 권한이 필요한 메뉴 카테고리

### 1.1 경마 코칭방 관련 (page/chat)
**파일**: common.js
**함수**:
- `get_chat_coaching_order_mabun()` - 마번보기 구매
- `get_chat_coaching_order_mabun_process()` - 로그인/포인트 체크
- `get_chat_user_order_mabun()` - 유저 마번보기
- `get_chat_user_order_mabun_process()` - 로그인/포인트 체크
- `get_chat_coaching_support_process()` - 후원금 (로그인/포인트 체크)

**체크 항목**:
- LOGIN 체크: 로그인하지 않으면 alert('로그인 후 다시 시도해 주세요')
- POINT 체크: 포인트 부족 시 alert('보유하신 포인트가 부족합니다')
- EXIST 체크: 이미 구매한 경우
- OK: 정상 구매

### 1.2 VIP(AI분석)
**파일**: common.js:1082-1090
**함수**: `goto_vip()`
```javascript
function goto_vip() {
	alert("접근 권한이 없습니다.");
}
```

### 1.3 멤버십 관련
**파일**: common.js:1280-1335
**함수**:
- `confirm_membership(mb_type)` - 멤버십 가입
- `confirm_membership_reload(mb_type)` - 멤버십 가입 (reload)

**체크 항목**:
- LOGIN 체크
- POINT 체크 (포인트 부족)
- EXIST 체크 (이미 가입)
- OK: 정상 가입

### 1.4 로그인 체크 함수들
**파일**: common.js

**get_con_user() (라인 563-586)**:
- IP 중복 로그인 체크
- 8초마다 체크
- ip_fail 시 로그아웃

**get_point_user() (라인 589-604)**:
- 포인트 정보 7초마다 업데이트
- `/bbs/point_check.php` 호출

**foutlogin_submit() (라인 1164-1198)**:
- 메인 페이지 로그인 처리
- `/bbs/ajax.login_check.php` 호출

**popup_login() (라인 1688-1720)**:
- 팝업 로그인 처리
- `../bbs/ajax.login_check.php` 호출

## 2. 모달 팝업 닫기 버튼 문제

### 2.1 modal() 함수 (라인 1773-1804)
```javascript
function modal(id) {
	var zIndex = 9999999;
	var modal = $('#' + id);

	var bg = $('<div>').css({...}).appendTo('body');

	modal.css({...}).show()
		.find('.modal_close')
		.on('click', function () {
			bg.remove();
			modal.hide();
		});
}
```

**문제**: `.modal_close` 요소가 모달 내부에 없으면 작동하지 않음

### 2.2 modalExtend() 함수 (라인 1807-1850)
```javascript
function modalExtend(id, url) {
	$.ajax({
		url: url,
		success: function (html) {
			modal.append(html).show()
				.find('.modal_close')
				.on('click', function () {
					bg.remove();
					modal.empty();
					modal.hide();
				});
		}
	});
}
```

**문제**: AJAX로 불러온 HTML에서 `.modal_close` 클래스를 찾음. 오프라인에서는 AJAX 호출이 실패함.

## 3. 수정 방안

### 3.1 로그인 체크 제거
모든 AJAX 로그인 체크를 우회하도록 수정:
- `get_con_user()` - 비활성화
- `get_point_user()` - 가짜 포인트 데이터 반환
- 모든 response === "LOGIN" 체크 제거
- 모든 response === "POINT" 체크 제거

### 3.2 모달 닫기 버튼 수정
1. 배경(bg) 클릭 시 닫기 추가
2. ESC 키로 닫기 추가
3. 기본 닫기 버튼 추가

### 3.3 VIP 접근 권한 수정
```javascript
function goto_vip() {
	// 오프라인에서는 모든 사용자가 접근 가능
	location.href = "/lesson";
}
```

## 4. 수정 대상 파일 목록

1. **downloaded_site_depth100/xn--o39a0n963awza76tu9hduc.com/js/js/common.js**
   - 모든 접근 권한 체크 제거
   - 모달 닫기 버튼 기능 개선

2. **downloaded_site_depth100git/xn--o39a0n963awza76tu9hduc.com/js/js/common.js**
   - 동일한 수정 적용

## 5. 구현 순서

1. common.js 백업
2. 로그인 체크 함수 비활성화
3. VIP 접근 권한 수정
4. 멤버십 체크 우회
5. 모달 닫기 버튼 개선
6. 테스트 및 검증
7. Git 커밋 및 푸시
