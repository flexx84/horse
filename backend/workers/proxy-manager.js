/**
 * Proxy Manager
 * 프록시 프로바이더 API 연동 및 관리
 *
 * 지원 프로바이더:
 * - Bright Data (brightdata)
 * - Smartproxy (smartproxy)
 */

const axios = require('axios');

class ProxyManager {
  constructor(provider = 'smartproxy') {
    this.provider = provider;
    this.config = this.getConfig(provider);
    this.stats = {
      total: 0,
      success: 0,
      failed: 0,
      byCountry: {},
      errors: []
    };
  }

  /**
   * 프로바이더 설정 가져오기
   */
  getConfig(provider) {
    const configs = {
      brightdata: {
        username: process.env.BRIGHTDATA_USERNAME || 'your-username',
        password: process.env.BRIGHTDATA_PASSWORD || 'your-password',
        host: 'brd.superproxy.io',
        port: 22225,
        type: 'residential'
      },
      smartproxy: {
        username: process.env.SMARTPROXY_USERNAME || 'your-username',
        password: process.env.SMARTPROXY_PASSWORD || 'your-password',
        host: 'gate.smartproxy.com',
        port: 7000,
        type: 'residential'
      },
      // 테스트용 로컬 프록시
      local: {
        host: '127.0.0.1',
        port: 8080,
        type: 'http'
      }
    };

    if (!configs[provider]) {
      throw new Error(`지원하지 않는 프로바이더: ${provider}`);
    }

    return configs[provider];
  }

  /**
   * 새로운 프록시 가져오기
   *
   * @param {string} country - 국가 코드 (KR, US, JP, CN 등)
   * @param {boolean} sticky - 세션 고정 여부 (true = 같은 IP 유지)
   * @returns {object} - 프록시 정보
   */
  async getProxy(country = 'KR', sticky = false) {
    const { username, password, host, port, type } = this.config;

    let proxyUrl;

    if (this.provider === 'brightdata') {
      // Bright Data 형식
      const sessionParam = sticky ? `-session-${this.generateSessionId()}` : '';
      const countryParam = country ? `-country-${country.toLowerCase()}` : '';

      proxyUrl = `http://${username}${sessionParam}${countryParam}:${password}@${host}:${port}`;
    }
    else if (this.provider === 'smartproxy') {
      // Smartproxy 형식
      const sessionParam = sticky ? `-session-${this.generateSessionId()}` : '';
      const countryParam = country ? `-country-${country.toLowerCase()}` : '';

      proxyUrl = `http://${username}${sessionParam}${countryParam}:${password}@${host}:${port}`;
    }
    else if (this.provider === 'local') {
      // 로컬 프록시 (테스트용)
      proxyUrl = `http://${host}:${port}`;
    }

    // 통계 업데이트
    this.stats.total++;
    this.stats.byCountry[country] = (this.stats.byCountry[country] || 0) + 1;

    return {
      url: proxyUrl,
      country: country,
      provider: this.provider,
      sticky: sticky,
      timestamp: Date.now()
    };
  }

  /**
   * 세션 ID 생성 (10분 동안 같은 IP 유지)
   */
  generateSessionId() {
    return Math.random().toString(36).substring(2, 15) +
           Math.random().toString(36).substring(2, 15);
  }

  /**
   * 프록시 테스트
   *
   * @param {string} proxyUrl - 테스트할 프록시 URL
   * @returns {object} - 테스트 결과
   */
  async testProxy(proxyUrl) {
    const startTime = Date.now();

    try {
      // IP 확인 API 호출
      const response = await axios.get('https://api.ipify.org?format=json', {
        proxy: this.parseProxyUrl(proxyUrl),
        timeout: 15000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      const responseTime = Date.now() - startTime;

      this.stats.success++;

      return {
        success: true,
        ip: response.data.ip,
        responseTime: responseTime
      };
    } catch (error) {
      const responseTime = Date.now() - startTime;

      this.stats.failed++;
      this.stats.errors.push({
        timestamp: Date.now(),
        error: error.message,
        proxyUrl: proxyUrl.replace(/:[^:]*@/, ':***@') // 비밀번호 숨김
      });

      // 최근 100개 에러만 보관
      if (this.stats.errors.length > 100) {
        this.stats.errors.shift();
      }

      return {
        success: false,
        error: error.message,
        responseTime: responseTime
      };
    }
  }

  /**
   * 프록시 URL 파싱 (axios용)
   *
   * @param {string} proxyUrl - 프록시 URL
   * @returns {object} - axios 프록시 설정
   */
  parseProxyUrl(proxyUrl) {
    try {
      const url = new URL(proxyUrl);

      const config = {
        protocol: url.protocol.replace(':', ''),
        host: url.hostname,
        port: parseInt(url.port)
      };

      if (url.username && url.password) {
        config.auth = {
          username: url.username,
          password: url.password
        };
      }

      return config;
    } catch (error) {
      console.error('프록시 URL 파싱 실패:', error.message);
      throw error;
    }
  }

  /**
   * Puppeteer용 프록시 args 생성
   *
   * @param {string} proxyUrl - 프록시 URL
   * @returns {string} - Puppeteer args
   */
  getPuppeteerArgs(proxyUrl) {
    const url = new URL(proxyUrl);

    // Puppeteer는 인증 정보를 별도 처리
    return `--proxy-server=${url.protocol}//${url.hostname}:${url.port}`;
  }

  /**
   * Puppeteer 페이지에 프록시 인증 설정
   *
   * @param {object} page - Puppeteer page 객체
   * @param {string} proxyUrl - 프록시 URL
   */
  async authenticatePuppeteer(page, proxyUrl) {
    try {
      const url = new URL(proxyUrl);

      if (url.username && url.password) {
        await page.authenticate({
          username: url.username,
          password: url.password
        });
      }
    } catch (error) {
      console.error('Puppeteer 프록시 인증 실패:', error.message);
    }
  }

  /**
   * 통계 조회
   *
   * @returns {object} - 프록시 사용 통계
   */
  getStats() {
    const successRate = this.stats.total > 0
      ? (this.stats.success / this.stats.total * 100).toFixed(2)
      : 0;

    return {
      provider: this.provider,
      total: this.stats.total,
      success: this.stats.success,
      failed: this.stats.failed,
      successRate: successRate + '%',
      byCountry: this.stats.byCountry,
      recentErrors: this.stats.errors.slice(-10) // 최근 10개 에러
    };
  }

  /**
   * 통계 초기화
   */
  resetStats() {
    this.stats = {
      total: 0,
      success: 0,
      failed: 0,
      byCountry: {},
      errors: []
    };
  }

  /**
   * 프로바이더 변경
   *
   * @param {string} provider - 새 프로바이더
   */
  switchProvider(provider) {
    this.provider = provider;
    this.config = this.getConfig(provider);
    console.log(`프로바이더 변경: ${provider}`);
  }
}

module.exports = ProxyManager;
