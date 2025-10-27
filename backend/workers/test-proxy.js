/**
 * Proxy System Test
 * 프록시 시스템 테스트 스크립트
 *
 * 사용법:
 * 1. 프록시 매니저 테스트: node test-proxy.js manager
 * 2. 프록시 풀 테스트: node test-proxy.js pool
 * 3. 봇 통합 테스트: node test-proxy.js bot
 */

const ProxyManager = require('./proxy-manager');
const ProxyPool = require('./proxy-pool');

// 테스트 모드 선택
const testMode = process.argv[2] || 'manager';

console.log(`\n${'='.repeat(60)}`);
console.log(`프록시 시스템 테스트`);
console.log(`모드: ${testMode}`);
console.log(`${'='.repeat(60)}\n`);

/**
 * 프록시 매니저 테스트
 */
async function testProxyManager() {
  console.log('1. ProxyManager 테스트\n');

  // Smartproxy 테스트
  const manager = new ProxyManager('smartproxy');

  console.log('✅ ProxyManager 생성 완료');
  console.log(`   프로바이더: ${manager.provider}`);
  console.log(`   설정:`, manager.config);

  // 프록시 가져오기
  console.log('\n2. 프록시 가져오기\n');

  const proxy1 = await manager.getProxy('KR', false);
  console.log('✅ 한국 IP 프록시 (일회용):');
  console.log(`   URL: ${proxy1.url.replace(/:[^:]*@/, ':***@')}`);

  const proxy2 = await manager.getProxy('KR', true);
  console.log('\n✅ 한국 IP 프록시 (세션 고정):');
  console.log(`   URL: ${proxy2.url.replace(/:[^:]*@/, ':***@')}`);

  const proxy3 = await manager.getProxy('US', true);
  console.log('\n✅ 미국 IP 프록시 (세션 고정):');
  console.log(`   URL: ${proxy3.url.replace(/:[^:]*@/, ':***@')}`);

  // 프록시 테스트
  console.log('\n3. 프록시 테스트 (실제 연결)\n');

  // ⚠️ 실제 프록시가 설정되어 있어야 작동
  if (manager.config.username !== 'your-username') {
    console.log('프록시 연결 테스트 중...');

    const testResult = await manager.testProxy(proxy1.url);

    if (testResult.success) {
      console.log('✅ 프록시 연결 성공!');
      console.log(`   IP: ${testResult.ip}`);
      console.log(`   응답 시간: ${testResult.responseTime}ms`);
    } else {
      console.log('❌ 프록시 연결 실패');
      console.log(`   에러: ${testResult.error}`);
    }
  } else {
    console.log('⚠️  실제 프록시 인증 정보가 설정되지 않았습니다.');
    console.log('   환경변수를 설정하세요:');
    console.log('   - SMARTPROXY_USERNAME=your-username');
    console.log('   - SMARTPROXY_PASSWORD=your-password');
  }

  // 통계 확인
  console.log('\n4. 통계 확인\n');
  console.log(manager.getStats());
}

/**
 * 프록시 풀 테스트
 */
async function testProxyPool() {
  console.log('1. ProxyPool 테스트\n');

  // 프록시 풀 생성 (테스트: 5개만)
  const pool = new ProxyPool('smartproxy', 5, 'KR');

  console.log('✅ ProxyPool 생성 완료');
  console.log(`   프로바이더: ${pool.manager.provider}`);
  console.log(`   목표 개수: ${pool.poolSize}개`);
  console.log(`   국가: ${pool.country}`);

  // ⚠️ 실제 프록시가 설정되어 있어야 작동
  if (pool.manager.config.username === 'your-username') {
    console.log('\n⚠️  실제 프록시 인증 정보가 설정되지 않았습니다.');
    console.log('   환경변수를 설정하세요:');
    console.log('   - SMARTPROXY_USERNAME=your-username');
    console.log('   - SMARTPROXY_PASSWORD=your-password\n');
    console.log('   테스트를 건너뜁니다.');
    return;
  }

  // 프록시 풀 초기화
  console.log('\n2. 프록시 풀 초기화\n');
  await pool.initialize();

  // 프록시 가져오기 테스트
  console.log('\n3. 프록시 가져오기 테스트\n');

  for (let i = 0; i < 5; i++) {
    const proxy = pool.getProxy();
    console.log(`${i + 1}. IP: ${proxy.ip}, 사용 횟수: ${proxy.used}, 응답: ${proxy.responseTime}ms`);
  }

  // 통계 확인
  console.log('\n4. 풀 통계\n');
  console.log(pool.getStats());

  // 상세 통계
  console.log('\n5. 상세 통계\n');
  const detailed = pool.getDetailedStats();
  console.table(detailed);

  // 헬스체크 중지
  pool.stopHealthCheck();

  // 풀 종료
  pool.shutdown();
}

/**
 * 봇 통합 테스트 (Puppeteer + Proxy)
 */
async function testBotIntegration() {
  console.log('1. 봇 통합 테스트 (Puppeteer + Proxy)\n');

  const puppeteer = require('puppeteer-extra');
  const StealthPlugin = require('puppeteer-extra-plugin-stealth');
  puppeteer.use(StealthPlugin());

  const manager = new ProxyManager('smartproxy');

  // ⚠️ 실제 프록시가 설정되어 있어야 작동
  if (manager.config.username === 'your-username') {
    console.log('⚠️  실제 프록시 인증 정보가 설정되지 않았습니다.');
    console.log('   로컬 테스트 (프록시 없음)로 진행합니다.\n');
  }

  // 프록시 가져오기
  const proxy = await manager.getProxy('KR', true);
  console.log(`프록시: ${proxy.url.replace(/:[^:]*@/, ':***@')}\n`);

  // 브라우저 시작
  console.log('브라우저 시작...');

  const launchOptions = {
    headless: false, // 테스트: 브라우저 보기
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage'
    ]
  };

  // 실제 프록시가 있으면 적용
  if (manager.config.username !== 'your-username') {
    launchOptions.args.push(manager.getPuppeteerArgs(proxy.url));
  }

  const browser = await puppeteer.launch(launchOptions);
  const page = await browser.newPage();

  // 프록시 인증 (실제 프록시가 있으면)
  if (manager.config.username !== 'your-username') {
    await manager.authenticatePuppeteer(page, proxy.url);
  }

  // IP 확인 페이지 방문
  console.log('IP 확인 중...');
  await page.goto('https://api.ipify.org?format=json', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  // IP 추출
  const content = await page.content();
  const ipMatch = content.match(/"ip":"([^"]+)"/);

  if (ipMatch) {
    console.log(`\n✅ 현재 IP: ${ipMatch[1]}`);
  } else {
    console.log('\n⚠️  IP 확인 실패');
  }

  // 네이버 접속 테스트
  console.log('\n네이버 접속 테스트...');
  await page.goto('https://www.naver.com', {
    waitUntil: 'networkidle2',
    timeout: 30000
  });

  console.log('✅ 네이버 접속 성공!\n');

  // 스크린샷
  await page.screenshot({ path: 'screenshots/proxy-test.png' });
  console.log('스크린샷 저장: screenshots/proxy-test.png\n');

  // 3초 대기 (확인용)
  await new Promise(resolve => setTimeout(resolve, 3000));

  await browser.close();

  console.log('✅ 봇 통합 테스트 완료!\n');
}

/**
 * 메인 실행
 */
async function main() {
  try {
    if (testMode === 'manager') {
      await testProxyManager();
    } else if (testMode === 'pool') {
      await testProxyPool();
    } else if (testMode === 'bot') {
      await testBotIntegration();
    } else {
      console.log('알 수 없는 테스트 모드:', testMode);
      console.log('사용법: node test-proxy.js [manager|pool|bot]');
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log('테스트 완료!');
    console.log(`${'='.repeat(60)}\n`);
  } catch (error) {
    console.error('\n❌ 테스트 실패:', error.message);
    console.error(error.stack);
  }
}

// 실행
if (require.main === module) {
  main().catch(console.error);
}
