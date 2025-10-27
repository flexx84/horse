/**
 * Proxy Pool
 * 프록시 풀 관리 및 자동 헬스체크
 *
 * 기능:
 * - 프록시 풀 자동 구축
 * - 주기적 헬스체크
 * - 비정상 프록시 자동 교체
 * - 사용량 기반 로테이션
 */

const ProxyManager = require('./proxy-manager');

class ProxyPool {
  constructor(provider = 'smartproxy', poolSize = 50, country = 'KR') {
    this.manager = new ProxyManager(provider);
    this.poolSize = poolSize;
    this.country = country;
    this.pool = [];
    this.healthCheckInterval = 5 * 60 * 1000; // 5분마다 헬스체크
    this.healthCheckTimer = null;
    this.isInitialized = false;
  }

  /**
   * 프록시 풀 초기화
   */
  async initialize() {
    if (this.isInitialized) {
      console.log('프록시 풀이 이미 초기화되었습니다.');
      return;
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`프록시 풀 초기화 시작`);
    console.log(`  프로바이더: ${this.manager.provider}`);
    console.log(`  목표 개수: ${this.poolSize}개`);
    console.log(`  국가: ${this.country}`);
    console.log(`${'='.repeat(60)}\n`);

    const batchSize = 10; // 한 번에 10개씩 생성
    let created = 0;

    for (let i = 0; i < this.poolSize; i += batchSize) {
      const currentBatch = Math.min(batchSize, this.poolSize - i);
      const promises = [];

      for (let j = 0; j < currentBatch; j++) {
        promises.push(this.createProxy());
      }

      const results = await Promise.allSettled(promises);

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && result.value) {
          this.pool.push(result.value);
          created++;
        } else {
          console.error(`  ❌ 프록시 ${i + index + 1} 생성 실패:`, result.reason?.message || '알 수 없는 오류');
        }
      });

      console.log(`  진행: ${created}/${this.poolSize} (${(created / this.poolSize * 100).toFixed(1)}%)`);

      // Rate limiting (0.5초 대기)
      if (i + batchSize < this.poolSize) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    const healthyCount = this.pool.filter(p => p.healthy).length;

    console.log(`\n${'='.repeat(60)}`);
    console.log(`✅ 프록시 풀 초기화 완료`);
    console.log(`  생성: ${created}/${this.poolSize}개`);
    console.log(`  정상: ${healthyCount}개 (${(healthyCount / created * 100).toFixed(1)}%)`);
    console.log(`${'='.repeat(60)}\n`);

    this.isInitialized = true;

    // 자동 헬스체크 시작
    this.startHealthCheck();
  }

  /**
   * 프록시 생성 및 테스트
   */
  async createProxy() {
    try {
      // 프록시 가져오기 (세션 고정)
      const proxy = await this.manager.getProxy(this.country, true);

      // 프록시 테스트
      const testResult = await this.manager.testProxy(proxy.url);

      return {
        url: proxy.url,
        country: proxy.country,
        provider: proxy.provider,
        used: 0,
        lastUsed: null,
        lastChecked: Date.now(),
        healthy: testResult.success,
        responseTime: testResult.responseTime || null,
        ip: testResult.ip || null,
        failCount: testResult.success ? 0 : 1
      };
    } catch (error) {
      throw new Error(`프록시 생성 실패: ${error.message}`);
    }
  }

  /**
   * 프록시 가져오기 (사용량 기반 로테이션)
   *
   * @param {boolean} forceHealthy - 정상 프록시만 반환 (기본: true)
   * @returns {object} - 프록시 정보
   */
  getProxy(forceHealthy = true) {
    if (!this.isInitialized) {
      throw new Error('프록시 풀이 초기화되지 않았습니다. initialize()를 먼저 호출하세요.');
    }

    // 정상 프록시만 필터링
    let availableProxies = forceHealthy
      ? this.pool.filter(p => p.healthy)
      : this.pool;

    if (availableProxies.length === 0) {
      throw new Error('사용 가능한 프록시가 없습니다.');
    }

    // 가장 적게 사용된 프록시 선택 (로드 밸런싱)
    availableProxies.sort((a, b) => {
      // 1차: 사용 횟수
      if (a.used !== b.used) {
        return a.used - b.used;
      }
      // 2차: 응답 시간 (빠른 순)
      if (a.responseTime && b.responseTime) {
        return a.responseTime - b.responseTime;
      }
      return 0;
    });

    const proxy = availableProxies[0];

    // 사용 통계 업데이트
    proxy.used++;
    proxy.lastUsed = Date.now();

    return proxy;
  }

  /**
   * 랜덤 프록시 가져오기
   */
  getRandomProxy(forceHealthy = true) {
    if (!this.isInitialized) {
      throw new Error('프록시 풀이 초기화되지 않았습니다.');
    }

    const availableProxies = forceHealthy
      ? this.pool.filter(p => p.healthy)
      : this.pool;

    if (availableProxies.length === 0) {
      throw new Error('사용 가능한 프록시가 없습니다.');
    }

    const randomIndex = Math.floor(Math.random() * availableProxies.length);
    const proxy = availableProxies[randomIndex];

    // 사용 통계 업데이트
    proxy.used++;
    proxy.lastUsed = Date.now();

    return proxy;
  }

  /**
   * 주기적 헬스체크 시작
   */
  startHealthCheck() {
    if (this.healthCheckTimer) {
      console.log('헬스체크가 이미 실행 중입니다.');
      return;
    }

    console.log(`자동 헬스체크 시작 (${this.healthCheckInterval / 1000}초마다)\n`);

    this.healthCheckTimer = setInterval(async () => {
      await this.runHealthCheck();
    }, this.healthCheckInterval);
  }

  /**
   * 헬스체크 중지
   */
  stopHealthCheck() {
    if (this.healthCheckTimer) {
      clearInterval(this.healthCheckTimer);
      this.healthCheckTimer = null;
      console.log('자동 헬스체크 중지');
    }
  }

  /**
   * 헬스체크 실행
   */
  async runHealthCheck() {
    console.log(`\n[${ new Date().toISOString()}] 프록시 헬스체크 시작...`);

    const batchSize = 10;
    let checkedCount = 0;

    for (let i = 0; i < this.pool.length; i += batchSize) {
      const batch = this.pool.slice(i, i + batchSize);
      const promises = batch.map(proxy => this.checkProxy(proxy));

      await Promise.allSettled(promises);

      checkedCount += batch.length;
      process.stdout.write(`\r  진행: ${checkedCount}/${this.pool.length} (${(checkedCount / this.pool.length * 100).toFixed(1)}%)`);

      // Rate limiting
      if (i + batchSize < this.pool.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    const healthyCount = this.pool.filter(p => p.healthy).length;
    const healthRate = (healthyCount / this.pool.length * 100).toFixed(1);

    console.log(`\n  ✅ 헬스체크 완료: ${healthyCount}/${this.pool.length}개 정상 (${healthRate}%)\n`);

    // 비정상 프록시가 30% 이상이면 교체
    if (healthyCount < this.poolSize * 0.7) {
      console.log(`⚠️  정상 프록시가 ${healthRate}%로 낮습니다. 교체를 시작합니다...`);
      await this.replaceUnhealthyProxies();
    }
  }

  /**
   * 개별 프록시 체크
   */
  async checkProxy(proxy) {
    try {
      const testResult = await this.manager.testProxy(proxy.url);

      proxy.lastChecked = Date.now();

      if (testResult.success) {
        proxy.healthy = true;
        proxy.responseTime = testResult.responseTime;
        proxy.ip = testResult.ip;
        proxy.failCount = 0;
      } else {
        proxy.failCount++;

        // 3회 연속 실패 시 비정상으로 표시
        if (proxy.failCount >= 3) {
          proxy.healthy = false;
        }
      }
    } catch (error) {
      proxy.failCount++;
      if (proxy.failCount >= 3) {
        proxy.healthy = false;
      }
    }
  }

  /**
   * 비정상 프록시 교체
   */
  async replaceUnhealthyProxies() {
    const unhealthyProxies = this.pool.filter(p => !p.healthy);

    console.log(`비정상 프록시 ${unhealthyProxies.length}개 교체 중...`);

    const batchSize = 5;
    let replaced = 0;

    for (let i = 0; i < unhealthyProxies.length; i += batchSize) {
      const batch = unhealthyProxies.slice(i, i + batchSize);
      const promises = batch.map(proxy => this.replaceProxy(proxy));

      const results = await Promise.allSettled(promises);

      results.forEach(result => {
        if (result.status === 'fulfilled') {
          replaced++;
        }
      });

      console.log(`  진행: ${replaced}/${unhealthyProxies.length}`);

      if (i + batchSize < unhealthyProxies.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    console.log(`✅ 프록시 교체 완료: ${replaced}개\n`);
  }

  /**
   * 개별 프록시 교체
   */
  async replaceProxy(oldProxy) {
    try {
      const newProxyData = await this.createProxy();

      // 풀에서 기존 프록시 찾아서 교체
      const index = this.pool.indexOf(oldProxy);
      if (index !== -1) {
        this.pool[index] = newProxyData;
      }

      return true;
    } catch (error) {
      console.error(`  ❌ 프록시 교체 실패:`, error.message);
      return false;
    }
  }

  /**
   * 풀 통계
   */
  getStats() {
    const healthy = this.pool.filter(p => p.healthy).length;
    const totalUsed = this.pool.reduce((sum, p) => sum + p.used, 0);

    const healthyProxies = this.pool.filter(p => p.healthy && p.responseTime);
    const avgResponseTime = healthyProxies.length > 0
      ? healthyProxies.reduce((sum, p) => sum + p.responseTime, 0) / healthyProxies.length
      : 0;

    return {
      provider: this.manager.provider,
      country: this.country,
      total: this.pool.length,
      healthy: healthy,
      unhealthy: this.pool.length - healthy,
      healthRate: (healthy / this.pool.length * 100).toFixed(2) + '%',
      totalUsed: totalUsed,
      avgUsed: (totalUsed / this.pool.length).toFixed(1),
      avgResponseTime: avgResponseTime.toFixed(0) + 'ms',
      managerStats: this.manager.getStats()
    };
  }

  /**
   * 상세 통계 (각 프록시별)
   */
  getDetailedStats() {
    return this.pool.map((proxy, index) => ({
      index: index + 1,
      ip: proxy.ip || 'unknown',
      healthy: proxy.healthy ? '✅' : '❌',
      used: proxy.used,
      responseTime: proxy.responseTime ? `${proxy.responseTime}ms` : 'N/A',
      failCount: proxy.failCount,
      lastUsed: proxy.lastUsed ? new Date(proxy.lastUsed).toISOString() : 'Never'
    }));
  }

  /**
   * 프록시 풀 종료
   */
  shutdown() {
    this.stopHealthCheck();
    this.pool = [];
    this.isInitialized = false;
    console.log('프록시 풀 종료');
  }
}

module.exports = ProxyPool;
