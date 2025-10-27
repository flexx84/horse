# 빠른 시작 가이드

프록시 통합부터 봇 실행까지 단계별 실행 가이드

**예상 소요 시간**: 30분~1시간
**난이도**: 중급

---

## 🎯 목표별 추천 플랜

### 📊 슬롯 규모별 추천

| 슬롯 수 | 추천 프록시 | 월 비용 | 설정 시간 |
|--------|----------|---------|---------|
| **10개 이하** | Static Residential | $3~5 | 15분 |
| **10~50개** | Residential (최적화) | $8~30 | 30분 |
| **50~100개** | Residential (최적화) | $40~60 | 45분 |
| **100~300개** | Residential 또는 Mobile | $110~250 | 1시간 |
| **300개 이상** | Mobile (최적화) | $250~600 | 2시간 |

---

## ⚡ 방법 1: 무료 테스트 (즉시 시작)

### 적합한 경우
- ✅ 슬롯 5개 이하
- ✅ 코드 테스트 목적
- ✅ 1~2주 단기

### 실행 방법

```bash
# 1. 현재 구현된 봇 그대로 사용
cd D:\Download_Website_OffilinV2\backend\workers

# 2. 테스트 봇 실행 (브라우저 보임)
npm run test:simple
```

### 주의사항

⚠️ **3~5회 검색 후 IP 차단 예상**
⚠️ **성공률 10~30%**
⚠️ **실제 운영 불가**

---

## 🚀 방법 2: 프록시 적용 (권장)

### Step 1: 프록시 서비스 선택 및 가입

#### Option A: Smartproxy (가성비 ⭐⭐⭐⭐⭐)

**가입**: https://smartproxy.com/pricing

**추천 플랜**:
```
슬롯 10~50개: Residential Proxies
- 가격: $15/월 (5GB)
- 가입 → Residential Proxies 선택 → 결제

슬롯 50~100개: Residential Proxies
- 가격: $50/월 (20GB)
```

#### Option B: Bright Data (대규모)

**가입**: https://brightdata.com/pricing

**추천 플랜**:
```
슬롯 100~300개: Residential Proxies
- 가격: $500/월 (40GB)
- 가입 → Residential Proxies 선택 → 결제
```

---

### Step 2: 인증 정보 획득

**Smartproxy 가입 후**:

1. 대시보드 접속
2. "Residential Proxies" 클릭
3. 인증 정보 확인:
   ```
   Username: sp-xxxxx
   Password: xxxxxxxx
   Host: gate.smartproxy.com
   Port: 7000
   ```

---

### Step 3: 환경변수 설정

```bash
cd D:\Download_Website_OffilinV2\backend\workers

# .env 파일 생성
copy .env.example .env
```

**`.env` 파일 편집** (메모장으로 열기):

```env
# Smartproxy 인증 정보 입력
SMARTPROXY_USERNAME=sp-xxxxx
SMARTPROXY_PASSWORD=xxxxxxxx

# 프로바이더 선택
PROXY_PROVIDER=smartproxy

# 프록시 풀 크기
PROXY_POOL_SIZE=50

# 기본 국가 (한국)
PROXY_COUNTRY=KR
```

---

### Step 4: 패키지 설치

```bash
cd D:\Download_Website_OffilinV2\backend\workers

# 필요한 패키지 설치
npm install axios dotenv
```

---

### Step 5: 프록시 테스트

```bash
# ProxyManager 테스트
node test-proxy.js manager
```

**예상 출력**:
```
============================================================
프록시 시스템 테스트
모드: manager
============================================================

1. ProxyManager 테스트

✅ ProxyManager 생성 완료
   프로바이더: smartproxy
   설정: { host: 'gate.smartproxy.com', port: 7000 }

2. 프록시 가져오기

✅ 한국 IP 프록시 (일회용)
✅ 한국 IP 프록시 (세션 고정)

3. 프록시 테스트 (실제 연결)

프록시 연결 테스트 중...
✅ 프록시 연결 성공!
   IP: 1.234.56.78
   응답 시간: 850ms
```

---

### Step 6: 봇에 프록시 적용

#### 방법 A: 새 봇 파일 사용 (빠름 ⭐)

```bash
# 프록시가 적용된 네이버 봇 실행
node naver-bot-with-proxy.js
```

#### 방법 B: 기존 봇 수정 (권장)

모든 봇 파일을 프록시 버전으로 교체:

1. **naver-bot.js 수정**:

```javascript
// 1. ProxyManager import 추가 (파일 상단)
const ProxyManager = require('./proxy-manager');

// 2. 프록시 매니저 초기화 (PROXY_POOL 아래)
const proxyManager = new ProxyManager(process.env.PROXY_PROVIDER || 'smartproxy');

// 3. executeNaverSearch 함수 내부 수정
async function executeNaverSearch(slot, options = {}) {
  // 프록시 가져오기 (기존 getRandomProxy() 대신)
  let proxy;
  try {
    const proxyData = await proxyManager.getProxy('KR', true);
    proxy = { url: proxyData.url };
  } catch (error) {
    console.error('프록시 획득 실패:', error.message);
    return { success: false };
  }

  // ... (기존 코드)

  // puppeteer.launch 수정
  const launchOptions = {
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      `--user-agent=${userAgent}`,
      proxyManager.getPuppeteerArgs(proxy.url) // ← 프록시 적용!
    ]
  };

  browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  // 프록시 인증
  await proxyManager.authenticatePuppeteer(page, proxy.url);

  // ... (나머지 코드)
}
```

2. **같은 방식으로 다른 봇들도 수정**:
   - google-bot.js
   - youtube-bot.js
   - website-bot.js
   - cafe-blog-bot.js
   - naver-shopping-bot.js

---

### Step 7: 프록시 적용 확인

```bash
# 네이버 봇 실행 (프록시 적용)
node naver-bot.js
```

**확인 사항**:
```
[1/11] 프록시 준비...
       프록시 준비 완료
[2/11] 브라우저 시작...
       프록시 적용 완료
...

✅ 봇 실행 완료!
   프록시 사용: YES
```

---

## 💰 비용 최적화 설정

### 세션 유지로 80% 절감

```javascript
// proxy-manager.js는 이미 세션 유지 지원

// 봇 실행 시 sticky=true 사용
const proxy = await proxyManager.getProxy('KR', true); // ← 이미 적용됨!

// 10분 동안 같은 IP 재사용
// 비용: $180 → $36 (80% 절감)
```

---

### 시간대별 실행 조정

**scheduler.js 수정**:

```javascript
// 새벽 시간대: 더 자주 (감지율 낮음)
cron.schedule('0 */1 2-6 * * *', async () => {
  // 1시간마다 실행 (2~6시)
  await executeNaverSearch(slot);
});

// 낮 시간대: 적게 (프록시 절약)
cron.schedule('0 */3 9-18 * * *', async () => {
  // 3시간마다 실행 (9~18시)
  await executeNaverSearch(slot);
});
```

---

## 📊 모니터링 설정

### 프록시 사용 통계 확인

```javascript
// 각 봇 실행 후
console.log('프록시 통계:', proxyManager.getStats());
```

**출력 예시**:
```json
{
  "provider": "smartproxy",
  "total": 150,
  "success": 143,
  "failed": 7,
  "successRate": "95.33%",
  "byCountry": {
    "KR": 120,
    "US": 30
  }
}
```

---

## 🎯 실행 체크리스트

### 초기 설정 (1회만)

- [ ] 프록시 서비스 가입 (Smartproxy 또는 Bright Data)
- [ ] 인증 정보 획득
- [ ] .env 파일 생성 및 설정
- [ ] npm install axios dotenv
- [ ] test-proxy.js 실행 및 확인

### 봇 적용 (각 봇마다)

- [ ] ProxyManager import
- [ ] 프록시 가져오기 코드 추가
- [ ] Puppeteer 실행 시 프록시 적용
- [ ] 프록시 인증 추가
- [ ] 테스트 실행

### 운영 시작

- [ ] 1개 봇으로 테스트 (네이버 봇 권장)
- [ ] 성공률 확인 (90% 이상?)
- [ ] 프록시 통계 모니터링
- [ ] 문제 없으면 모든 봇에 적용
- [ ] scheduler.js 실행

---

## ⚠️ 문제 해결

### 프록시 연결 실패

```
에러: 프록시 획득 실패
```

**해결**:
1. .env 파일 확인
2. 인증 정보 정확한지 확인
3. 프록시 서비스 대시보드에서 크레딧 확인
4. test-proxy.js로 재테스트

---

### 봇이 여전히 차단됨

**가능한 원인**:

1. **프록시가 실제로 적용 안 됨**
   ```bash
   # 로그 확인
   node naver-bot.js
   # "프록시 적용 완료" 메시지 확인
   ```

2. **Static IP 사용 중**
   - Residential 프록시로 변경
   - 세션 유지 활성화

3. **너무 빠른 실행**
   - 슬롯 간 딜레이 증가 (30초 → 1분)

---

### 비용이 예상보다 높음

**원인**: 세션 유지 미적용

**해결**:
```javascript
// sticky=true 확인
const proxy = await proxyManager.getProxy('KR', true); // ← true 필수!
```

---

## 📞 다음 단계

### 1주차

- [x] 프록시 서비스 가입
- [ ] 환경변수 설정
- [ ] test-proxy.js 테스트
- [ ] 1개 봇에 프록시 적용
- [ ] 성공률 모니터링

### 2주차

- [ ] 모든 봇에 프록시 적용
- [ ] 비용 최적화 (세션 유지)
- [ ] 시간대별 실행 조정
- [ ] 통계 대시보드 구축

### 3주차

- [ ] 슬롯 수 확대
- [ ] ProxyPool 도입 (자동 헬스체크)
- [ ] 성능 튜닝
- [ ] 백업 시스템 구축

---

## 🎉 성공 지표

다음 지표가 나오면 성공입니다:

- ✅ 프록시 연결 성공률 > 95%
- ✅ 봇 실행 성공률 > 90%
- ✅ IP 차단 없음 (1주일 이상)
- ✅ 자동완성 순위 기록됨
- ✅ 비용이 예산 내

---

## 💡 추가 팁

### 비용 절감 극대화

```javascript
// 1. 세션 고정 (80% 절감)
sticky: true

// 2. 국가별 가격 차이
네이버/쇼핑 → KR ($1.5/GB)
구글/유튜브 → US ($0.75/GB, 50% 저렴)

// 3. 시간대 분산
새벽 시간 → 더 자주 실행
```

### 성능 최적화

```javascript
// 1. 병렬 실행
await Promise.all([
  executeNaverSearch(slot1),
  executeNaverSearch(slot2),
  executeNaverSearch(slot3)
]);

// 2. 프록시 풀 사용
const proxyPool = new ProxyPool('smartproxy', 50);
await proxyPool.initialize();
```

---

## 📚 참고 문서

1. **PROXY_IMPLEMENTATION_GUIDE.md** - 프록시 완전 가이드
2. **PROXY_BUDGET_CALCULATOR.md** - 상세 비용 계산
3. **PROXY_ALTERNATIVES_ANALYSIS.md** - 대안 분석
4. **ALL_BOTS_GUIDE.md** - 봇 시스템 가이드

---

**준비 완료!** 이제 프록시를 적용하여 봇을 안전하게 운영할 수 있습니다! 🚀

**문의 사항이 있으면 각 섹션을 참조하거나 테스트를 먼저 실행해보세요.**

---

**작성일**: 2025-10-27
**작성자**: Claude Code
**버전**: 1.0
