# 오프라인 슬롯 관리 시스템

완전한 오프라인 자동완성 슬롯 관리 시스템입니다. 프론트엔드, 백엔드, 봇 워커, 프록시 시스템이 모두 포함되어 있습니다.

## 🚀 빠른 시작

### 1. 설치

```bash
git clone <repository-url>
cd Download_Website_OffilinV2
```

### 2. Backend 실행

```bash
cd backend
npm install
npm run init-db  # 데이터베이스 초기화
npm start        # 서버 실행 (포트 3000)
```

### 3. 브라우저 접속

```
http://localhost:3000/
```

또는 직접 HTML 파일 열기:
```
impact_depth100_new/impact.me.kr/slot/NA/index.html
```

## 📦 시스템 구성

### Backend (Express + SQLite)
- **서버**: Express 5.1.0
- **데이터베이스**: SQLite3 (Better-SQLite3)
- **API**: 15개 REST 엔드포인트
- **포트**: 3000

### Bot Workers (Puppeteer)
6개 자동화 봇:
- `naver-bot.js` - 네이버 자동완성 (NA)
- `google-bot.js` - 구글 자동완성 (GA)
- `youtube-bot.js` - 유튜브 자동완성 (YA)
- `website-bot.js` - 웹사이트 트래픽 (WS)
- `cafe-blog-bot.js` - 카페/블로그 (CP)
- `naver-shopping-bot.js` - 네이버쇼핑 (NS)

### Proxy System
- `proxy-manager.js` - Smartproxy/Bright Data 연동
- `proxy-pool.js` - 자동 프록시 풀 관리
- `test-proxy.js` - 테스트 도구

### Frontend
- 6개 슬롯 관리 페이지
- 정산 페이지
- 모든 리소스 로컬 포함 (완전 오프라인)

## 🔧 봇 설정 (선택사항)

### 1. 의존성 설치

```bash
cd backend/workers
npm install
```

### 2. 환경변수 설정

```bash
cp .env.example .env
```

`.env` 파일 편집:
```env
SMARTPROXY_USERNAME=your-username
SMARTPROXY_PASSWORD=your-password
PROXY_PROVIDER=smartproxy
PROXY_POOL_SIZE=50
PROXY_COUNTRY=KR
```

### 3. 봇 테스트

```bash
# 프록시 테스트
node test-proxy.js

# 봇 테스트
node test-bot.js

# 스케줄러 실행
node scheduler.js
```

## 📚 문서

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** - API 엔드포인트 문서
- **[ALL_BOTS_GUIDE.md](./ALL_BOTS_GUIDE.md)** - 봇 사용 가이드
- **[PROXY_SUMMARY.md](./PROXY_SUMMARY.md)** - 프록시 시스템 요약
- **[QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)** - 빠른 시작 가이드
- **[UI_FIX_SUMMARY.md](./UI_FIX_SUMMARY.md)** - UI 수정 내역

## 🎯 주요 기능

✅ **완전 오프라인 작동** - CDN 의존성 없음
✅ **15개 REST API** - 모든 기능 API 제공
✅ **6개 자동화 봇** - Puppeteer + Stealth
✅ **프록시 시스템** - 80% 비용 절감
✅ **모바일/데스크탑 지원** - 반응형 UI
✅ **SQLite DB** - 간단한 데이터 관리
✅ **Cron 스케줄러** - 자동 실행

## 📁 디렉토리 구조

```
Download_Website_OffilinV2/
├── backend/
│   ├── server.js           # Express API 서버
│   ├── init-db.js          # DB 초기화
│   ├── package.json
│   └── workers/            # Bot 워커들
│       ├── naver-bot.js
│       ├── google-bot.js
│       ├── youtube-bot.js
│       ├── website-bot.js
│       ├── cafe-blog-bot.js
│       ├── naver-shopping-bot.js
│       ├── scheduler.js
│       ├── proxy-manager.js
│       ├── proxy-pool.js
│       └── package.json
│
├── impact_depth100_new/    # 프론트엔드
│   └── impact.me.kr/
│       ├── slot/           # 슬롯 관리 페이지
│       │   ├── NA/        # N자동완성
│       │   ├── GA/        # G자동완성
│       │   ├── YA/        # Y자동완성
│       │   ├── WS/        # N웹트래픽
│       │   ├── CP/        # C쇼핑
│       │   ├── NS/        # N쇼핑
│       │   └── history/   # 정산
│       ├── auth/          # 인증 페이지
│       ├── js/            # JavaScript
│       ├── css/           # CSS
│       └── img/           # 이미지
│
├── 문서/                   # Markdown 문서들
└── README.md              # 이 파일
```

## 💻 시스템 요구사항

- **Node.js**: 18.0.0 이상
- **메모리**: 2GB 이상 (봇 실행 시 4GB 권장)
- **디스크**: 500MB 이상
- **OS**: Windows, macOS, Linux

## 🔐 환경변수

### Backend
```env
PORT=3000
DB_PATH=./database.db
```

### Bot Workers (프록시 사용 시)
```env
SMARTPROXY_USERNAME=your-username
SMARTPROXY_PASSWORD=your-password
PROXY_PROVIDER=smartproxy
PROXY_POOL_SIZE=50
PROXY_COUNTRY=KR
```

## 🐛 문제 해결

### 서버가 시작되지 않음
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
npm start
```

### 봇이 작동하지 않음
```bash
cd backend/workers
npm install puppeteer puppeteer-extra puppeteer-extra-plugin-stealth
node test-bot.js
```

### 프록시 연결 실패
1. `.env` 파일 확인
2. 프록시 인증 정보 확인
3. `node test-proxy.js` 실행

## 📞 지원

문제가 발생하면 다음 문서를 참조하세요:
- 일반 사용: [HOW_TO_USE.md](./HOW_TO_USE.md)
- 봇 가이드: [ALL_BOTS_GUIDE.md](./ALL_BOTS_GUIDE.md)
- 프록시 가이드: [QUICK_START_GUIDE.md](./QUICK_START_GUIDE.md)

## 📄 라이선스

이 프로젝트는 교육 및 연구 목적으로만 사용하세요.

## 🙏 감사의 말

- Express.js
- Better-SQLite3
- Puppeteer
- Bootstrap

---

**작성일**: 2025-10-28
**버전**: 1.0.0
**상태**: ✅ Deploy 준비 완료
