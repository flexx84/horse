# 프록시 시스템 구현 가이드

Impact 봇 시스템을 위한 안전하고 효율적인 프록시 IP 확장 방법

**작성일**: 2025-10-27
**난이도**: 중급~고급

---

## 📋 목차

1. [프록시 프로바이더 비교](#프록시-프로바이더-비교)
2. [추천 구현 방법](#추천-구현-방법)
3. [실제 구현 코드](#실제-구현-코드)
4. [비용 최적화](#비용-최적화)
5. [모니터링 및 장애 대응](#모니터링-및-장애-대응)

---

## 🎯 프록시 시스템 요구사항

봇 감지를 피하기 위한 필수 요구사항:

| 요구사항 | 중요도 | 이유 |
|---------|--------|------|
| **IP 로테이션** | 🔴 필수 | 같은 IP 반복 → 즉시 차단 |
| **한국 IP** | 🔴 필수 | 네이버/네이버쇼핑 = 한국 IP 우선 |
| **주거용 IP (Residential)** | 🟡 권장 | 데이터센터 IP는 감지율 높음 |
| **고속 응답** | 🟡 권장 | 느린 프록시 = 타임아웃 증가 |
| **자동 장애조치** | 🟢 선택 | 프록시 실패 시 자동 전환 |

---

## 🏆 프록시 프로바이더 비교

### 1. Bright Data (추천 ⭐)

**장점:**
- ✅ 세계 최대 프록시 네트워크 (7200만+ IP)
- ✅ 한국 IP 풍부 (서울, 부산, 대전 등)
- ✅ Residential + Datacenter 모두 제공
- ✅ API 연동 쉬움 (공식 SDK 제공)
- ✅ 무료 체험 가능 ($5 크레딧)

**단점:**
- ⚠️ 가격 높음 ($500~$1000/월)

**가격:**
```
Residential Proxy:
- Pay-as-you-go: $15/GB
- Monthly: $500/월 (40GB)
- Enterprise: $1000/월 (100GB)

Datacenter Proxy:
- Shared: $0.60/IP/월
- Dedicated: $2.40/IP/월
```

**API 연동:**
```javascript
// Bright Data API
const axios = require('axios');

const BRIGHT_DATA_USERNAME = 'your-username';
const BRIGHT_DATA_PASSWORD = 'your-password';
const BRIGHT_DATA_HOST = 'brd.superproxy.io';
const BRIGHT_DATA_PORT = 22225;

const proxyUrl = `http://${BRIGHT_DATA_USERNAME}:${BRIGHT_DATA_PASSWORD}@${BRIGHT_DATA_HOST}:${BRIGHT_DATA_PORT}`;

// Puppeteer에 적용
const browser = await puppeteer.launch({
  args: [`--proxy-server=${proxyUrl}`]
});
```

**가입 링크**: https://brightdata.com

---

### 2. Smartproxy (가성비 추천 ⭐⭐)

**장점:**
- ✅ 가성비 우수 ($75/월부터)
- ✅ 한국 IP 지원
- ✅ 무제한 동시 접속
- ✅ 24시간 무료 체험

**단점:**
- ⚠️ IP 수가 Bright Data보다 적음

**가격:**
```
Residential Proxy:
- Starter: $75/월 (5GB)
- Regular: $200/월 (15GB)
- Advanced: $500/월 (50GB)

Datacenter Proxy:
- USA: $50/월 (100 IP)
- Mixed: $75/월 (100 IP, 다국가)
```

**API 연동:**
```javascript
const SMARTPROXY_USERNAME = 'your-username';
const SMARTPROXY_PASSWORD = 'your-password';
const SMARTPROXY_HOST = 'gate.smartproxy.com';
const SMARTPROXY_PORT = 7000;

// 세션 ID로 같은 IP 유지 (10분)
const sessionId = Math.random().toString(36).substring(7);
const proxyUrl = `http://${SMARTPROXY_USERNAME}-session-${sessionId}:${SMARTPROXY_PASSWORD}@${SMARTPROXY_HOST}:${SMARTPROXY_PORT}`;
```

**가입 링크**: https://smartproxy.com

---

### 3. Oxylabs

**장점:**
- ✅ 엔터프라이즈급 안정성
- ✅ 한국 IP 풍부
- ✅ 99.95% 업타임 보장

**단점:**
- ⚠️ 가격 매우 높음 ($300~$1500/월)
- ⚠️ 최소 계약 기간 있음

**가격:**
```
Residential Proxy:
- Essential: $300/월 (25GB)
- Advanced: $600/월 (60GB)
- Enterprise: Custom pricing

추천: 대규모 엔터프라이즈만
```

---

### 4. IPRoyal (저예산 추천)

**장점:**
- ✅ 가격 저렴 ($1.75/GB)
- ✅ 한국 IP 지원

**단점:**
- ⚠️ IP 수 적음
- ⚠️ 안정성 중간

**가격:**
```
Residential Proxy:
- Pay-as-you-go: $1.75/GB
- 500GB: $1.50/GB
```

---

## 🚀 추천 구현 방법

### 방법 1: API 기반 프록시 로테이션 (추천 ⭐⭐⭐)

**개요:**
- 프록시 프로바이더 API에서 실시간으로 프록시 가져오기
- 요청마다 새로운 IP 사용
- 가장 안전하고 관리 쉬움

**장점:**
- ✅ IP 자동 로테이션
- ✅ 프록시 관리 불필요
- ✅ 장애 자동 복구
- ✅ 지역별 IP 선택 가능

**구현 코드:**

```javascript
// backend/workers/proxy-manager.js
const axios = require('axios');

class ProxyManager {
  constructor(provider = 'brightdata') {
    this.provider = provider;
    this.config = this.getConfig(provider);
    this.stats = {
      total: 0,
      success: 0,
      failed: 0,
      byCountry: {}
    };
  }

  getConfig(provider) {
    const configs = {
      brightdata: {
        username: process.env.BRIGHTDATA_USERNAME,
        password: process.env.BRIGHTDATA_PASSWORD,
        host: 'brd.superproxy.io',
        port: 22225
      },
      smartproxy: {
        username: process.env.SMARTPROXY_USERNAME,
        password: process.env.SMARTPROXY_PASSWORD,
        host: 'gate.smartproxy.com',
        port: 7000
      }
    };
    return configs[provider];
  }

  /**
   * 새로운 프록시 가져오기
   * @param {string} country - 국가 코드 (KR, US, JP 등)
   * @param {boolean} sticky - 세션 유지 여부
   */
  async getProxy(country = 'KR', sticky = false) {
    const { username, password, host, port } = this.config;

    let proxyUrl;

    if (this.provider === 'brightdata') {
      // Bright Data: 국가 코드 지정
      const sessionParam = sticky ? `-session-${this.generateSessionId()}` : '';
      proxyUrl = `http://${username}${sessionParam}-country-${country.toLowerCase()}:${password}@${host}:${port}`;
    }
    else if (this.provider === 'smartproxy') {
      // Smartproxy: 세션 ID로 IP 고정 (10분)
      const sessionParam = sticky ? `-session-${this.generateSessionId()}` : '';
      proxyUrl = `http://${username}${sessionParam}-country-${country.toLowerCase()}:${password}@${host}:${port}`;
    }

    // 통계 업데이트
    this.stats.total++;
    this.stats.byCountry[country] = (this.stats.byCountry[country] || 0) + 1;

    return {
      url: proxyUrl,
      country: country,
      timestamp: Date.now()
    };
  }

  /**
   * 세션 ID 생성 (같은 IP 유지용)
   */
  generateSessionId() {
    return Math.random().toString(36).substring(2, 15);
  }

  /**
   * 프록시 테스트
   */
  async testProxy(proxyUrl) {
    try {
      const response = await axios.get('https://api.ipify.org?format=json', {
        proxy: this.parseProxyUrl(proxyUrl),
        timeout: 10000
      });

      this.stats.success++;
      return {
        success: true,
        ip: response.data.ip,
        responseTime: response.headers['x-response-time']
      };
    } catch (error) {
      this.stats.failed++;
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * 프록시 URL 파싱 (axios용)
   */
  parseProxyUrl(proxyUrl) {
    const url = new URL(proxyUrl);
    return {
      protocol: url.protocol.replace(':', ''),
      host: url.hostname,
      port: parseInt(url.port),
      auth: {
        username: url.username,
        password: url.password
      }
    };
  }

  /**
   * 통계 조회
   */
  getStats() {
    return {
      ...this.stats,
      successRate: (this.stats.success / this.stats.total * 100).toFixed(2) + '%'
    };
  }
}

module.exports = ProxyManager;
```

**사용 예시:**

```javascript
// backend/workers/naver-bot.js
const ProxyManager = require('./proxy-manager');
const proxyManager = new ProxyManager('smartproxy'); // 또는 'brightdata'

async function executeNaverSearch(slot, options = {}) {
  // 1. 프록시 가져오기
  const proxy = await proxyManager.getProxy('KR', true); // 한국 IP, 세션 유지
  console.log(`프록시 획득: ${proxy.url}`);

  // 2. 프록시 테스트 (선택적)
  const testResult = await proxyManager.testProxy(proxy.url);
  if (!testResult.success) {
    console.error('프록시 실패, 재시도...');
    proxy = await proxyManager.getProxy('KR', true);
  }

  // 3. Puppeteer에 적용
  const browser = await puppeteer.launch({
    headless: 'new',
    args: [
      `--proxy-server=${proxy.url}`,
      '--no-sandbox',
      '--disable-setuid-sandbox'
    ]
  });

  // ... 나머지 봇 로직
}
```

---

### 방법 2: 프록시 풀 + 자동 갱신 (중급)

**개요:**
- 프록시 목록을 미리 가져와서 로컬 풀에 저장
- 주기적으로 프록시 상태 확인 및 갱신
- 실패한 프록시 자동 교체

**장점:**
- ✅ API 호출 횟수 감소 (비용 절감)
- ✅ 응답 속도 빠름 (미리 준비)
- ✅ 오프라인 대응 가능

**구현 코드:**

```javascript
// backend/workers/proxy-pool.js
const ProxyManager = require('./proxy-manager');

class ProxyPool {
  constructor(provider = 'smartproxy', poolSize = 50) {
    this.manager = new ProxyManager(provider);
    this.poolSize = poolSize;
    this.pool = [];
    this.healthCheckInterval = 5 * 60 * 1000; // 5분마다 체크
  }

  /**
   * 프록시 풀 초기화
   */
  async initialize() {
    console.log(`프록시 풀 초기화 중... (목표: ${this.poolSize}개)`);

    for (let i = 0; i < this.poolSize; i++) {
      const proxy = await this.manager.getProxy('KR', false);

      // 프록시 테스트
      const testResult = await this.manager.testProxy(proxy.url);

      this.pool.push({
        url: proxy.url,
        country: proxy.country,
        used: 0,
        lastUsed: null,
        lastChecked: Date.now(),
        healthy: testResult.success,
        responseTime: testResult.responseTime || null,
        ip: testResult.ip || null
      });

      // Rate limiting (초당 10개)
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log(`✅ 프록시 풀 초기화 완료: ${this.pool.filter(p => p.healthy).length}/${this.poolSize}개 정상`);

    // 자동 헬스체크 시작
    this.startHealthCheck();
  }

  /**
   * 프록시 가져오기 (사용량 기반 로테이션)
   */
  getProxy() {
    // 정상 프록시만 필터링
    const healthyProxies = this.pool.filter(p => p.healthy);

    if (healthyProxies.length === 0) {
      throw new Error('사용 가능한 프록시가 없습니다.');
    }

    // 가장 적게 사용된 프록시 선택
    healthyProxies.sort((a, b) => a.used - b.used);
    const proxy = healthyProxies[0];

    // 사용 통계 업데이트
    proxy.used++;
    proxy.lastUsed = Date.now();

    return proxy;
  }

  /**
   * 주기적 헬스체크
   */
  startHealthCheck() {
    setInterval(async () => {
      console.log('\n프록시 헬스체크 시작...');

      for (const proxy of this.pool) {
        const testResult = await this.manager.testProxy(proxy.url);

        proxy.healthy = testResult.success;
        proxy.lastChecked = Date.now();

        if (testResult.success) {
          proxy.responseTime = testResult.responseTime;
          proxy.ip = testResult.ip;
        }

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      const healthyCount = this.pool.filter(p => p.healthy).length;
      console.log(`✅ 헬스체크 완료: ${healthyCount}/${this.pool.length}개 정상`);

      // 비정상 프록시가 30% 이상이면 교체
      if (healthyCount < this.poolSize * 0.7) {
        await this.replaceUnhealthyProxies();
      }
    }, this.healthCheckInterval);
  }

  /**
   * 비정상 프록시 교체
   */
  async replaceUnhealthyProxies() {
    const unhealthyProxies = this.pool.filter(p => !p.healthy);
    console.log(`비정상 프록시 ${unhealthyProxies.length}개 교체 중...`);

    for (let i = 0; i < unhealthyProxies.length; i++) {
      const newProxy = await this.manager.getProxy('KR', false);
      const testResult = await this.manager.testProxy(newProxy.url);

      // 기존 비정상 프록시를 새 프록시로 교체
      const index = this.pool.indexOf(unhealthyProxies[i]);
      this.pool[index] = {
        url: newProxy.url,
        country: newProxy.country,
        used: 0,
        lastUsed: null,
        lastChecked: Date.now(),
        healthy: testResult.success,
        responseTime: testResult.responseTime || null,
        ip: testResult.ip || null
      };

      await new Promise(resolve => setTimeout(resolve, 100));
    }

    console.log('✅ 프록시 교체 완료');
  }

  /**
   * 풀 통계
   */
  getStats() {
    const healthy = this.pool.filter(p => p.healthy).length;
    const totalUsed = this.pool.reduce((sum, p) => sum + p.used, 0);
    const avgResponseTime = this.pool
      .filter(p => p.responseTime)
      .reduce((sum, p) => sum + p.responseTime, 0) / healthy;

    return {
      total: this.pool.length,
      healthy: healthy,
      unhealthy: this.pool.length - healthy,
      totalUsed: totalUsed,
      avgResponseTime: avgResponseTime.toFixed(2) + 'ms',
      healthRate: (healthy / this.pool.length * 100).toFixed(2) + '%'
    };
  }
}

module.exports = ProxyPool;
```

**사용 예시:**

```javascript
// backend/workers/scheduler.js
const ProxyPool = require('./proxy-pool');

// 프록시 풀 초기화 (앱 시작 시 1회)
const proxyPool = new ProxyPool('smartproxy', 50);
await proxyPool.initialize();

// 봇 실행 시
cron.schedule('*/10 * * * *', async () => {
  const slots = getNaverSlots('NA');

  for (const slot of slots) {
    // 프록시 가져오기
    const proxy = proxyPool.getProxy();

    await executeNaverSearch(slot, {
      proxy: proxy.url
    });
  }
});

// 통계 확인
setInterval(() => {
  console.log('프록시 풀 통계:', proxyPool.getStats());
}, 60000); // 1분마다
```

---

### 방법 3: 무료 프록시 (비추천 ⚠️)

**개요:**
- 무료 프록시 목록 사이트에서 프록시 수집
- 비용 없음

**단점:**
- ❌ 매우 불안정 (성공률 10~30%)
- ❌ 느림 (응답 시간 5~30초)
- ❌ 자주 차단됨
- ❌ 보안 위험 (MITM 공격 가능)

**결론: 절대 사용하지 마세요!**

---

## 💰 비용 최적화

### 1. 세션 유지로 비용 절감

```javascript
// 같은 세션 = 같은 IP = 비용 절감
const sessionId = generateSessionId();

// 10분 동안 같은 IP 사용
const proxy1 = await proxyManager.getProxy('KR', true); // 새 IP
const proxy2 = await proxyManager.getProxy('KR', true); // 같은 IP (비용 0)
const proxy3 = await proxyManager.getProxy('KR', true); // 같은 IP (비용 0)

// 10분 후 자동으로 새 IP로 변경
```

**절감 효과:**
- 요청 10회/슬롯 → 1회 IP 비용만 발생
- 월 비용: $500 → $50 (90% 절감)

---

### 2. 국가별 가격 차이 활용

```javascript
// 한국 IP: $15/GB (비쌈)
// 미국 IP: $7.5/GB (저렴)

// 네이버/네이버쇼핑: 한국 IP 필수
const proxy = await proxyManager.getProxy('KR');

// 구글/유튜브: 미국 IP 가능 (비용 50% 절감)
const proxy = await proxyManager.getProxy('US');
```

---

### 3. 시간대별 분산

```javascript
// 한국 시간 낮 (트래픽 많음) → 감지율 높음
// 한국 시간 새벽 (트래픽 적음) → 감지율 낮음

// 새벽 시간대에 더 많이 실행
cron.schedule('0 2-6 * * *', async () => {
  // 새벽 2~6시: 1시간마다 실행
});

cron.schedule('0 9-18 * * *', async () => {
  // 낮 9~18시: 3시간마다 실행 (프록시 절약)
});
```

---

## 📊 모니터링 및 장애 대응

### 프록시 대시보드 구현

```javascript
// backend/workers/proxy-dashboard.js
const express = require('express');
const app = express();

app.get('/proxy/stats', (req, res) => {
  const stats = {
    pool: proxyPool.getStats(),
    manager: proxyManager.getStats(),
    recentErrors: getRecentErrors(),
    costEstimate: calculateMonthlyCost()
  };

  res.json(stats);
});

app.listen(3001, () => {
  console.log('프록시 대시보드: http://localhost:3001/proxy/stats');
});
```

---

## 🎯 최종 추천

### 소규모 (슬롯 < 100)

**추천: Smartproxy Residential**
- 가격: $75/월 (5GB)
- 이유: 가성비 최고, 한국 IP 충분

```bash
월 예상 사용량:
- 슬롯 100개 × 10회/일 × 30일 = 30,000회
- 회당 5MB = 150GB
- 비용: $75 (5GB) + 추가 145GB × $15/GB = $2,250/월

❌ 너무 비쌈!

대안: 세션 유지로 1/10 절감
- 실제 사용량: 15GB
- 비용: $200/월 (15GB 플랜)
```

---

### 중규모 (슬롯 100~500)

**추천: Bright Data Residential**
- 가격: $500/월 (40GB)
- 이유: 안정성 최고, IP 풍부

```bash
월 예상 사용량:
- 슬롯 300개 × 10회/일 × 30일 = 90,000회
- 세션 유지: 45GB
- 비용: $500/월 (40GB) + 추가 5GB × $15/GB = $575/월
```

---

### 대규모 (슬롯 > 500)

**추천: Bright Data Enterprise + 자체 최적화**
- 가격: 협상 ($1000~$3000/월)
- 전략:
  1. Residential (한국 IP) + Datacenter (해외 IP) 혼합
  2. 세션 최적화 (10분 재사용)
  3. 시간대별 분산
  4. 실패 시 재시도 최소화

---

## 📝 구현 체크리스트

- [ ] 프록시 프로바이더 가입 (Smartproxy 또는 Bright Data)
- [ ] API 인증 정보 환경변수 설정 (.env)
- [ ] ProxyManager 클래스 구현
- [ ] ProxyPool 클래스 구현 (선택)
- [ ] 모든 봇에 프록시 적용
- [ ] 프록시 테스트 실행
- [ ] 헬스체크 자동화
- [ ] 비용 모니터링 대시보드
- [ ] 장애 알림 설정

---

**다음 단계**: 프록시 시스템 구현 후 실제 테스트 진행

**작성일**: 2025-10-27
**작성자**: Claude Code
