/**
 * Impact Website Traffic Bot
 * 웹사이트 직접 방문 및 트래픽 생성 봇
 *
 * 기술 스택:
 * - Puppeteer (스텔스 모드)
 * - 프록시 로테이션
 * - 인간 행동 시뮬레이션
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Database = require('better-sqlite3');
const path = require('path');

// Stealth plugin 적용 (봇 감지 우회)
puppeteer.use(StealthPlugin());

// Database 연결
const dbPath = path.join(__dirname, '../impact.db');
const db = new Database(dbPath);

// 프록시 풀 (실제로는 수천 개 필요)
const PROXY_POOL = [
  { ip: '127.0.0.1', port: 8080, country: 'KR', used: 0 },
  // 실제 운영 시: 프록시 서비스 API 연동
];

// User-Agent 풀
const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15'
];

/**
 * 랜덤 딜레이 (인간처럼)
 */
function randomDelay(min, max) {
  return new Promise(resolve => {
    const delay = Math.floor(Math.random() * (max - min + 1)) + min;
    setTimeout(resolve, delay);
  });
}

/**
 * 랜덤 프록시 선택
 */
function getRandomProxy() {
  const sorted = PROXY_POOL.sort((a, b) => a.used - b.used);
  const proxy = sorted[0];
  proxy.used++;
  return proxy;
}

/**
 * 랜덤 User-Agent 선택
 */
function getRandomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

/**
 * 인간처럼 마우스 움직이기
 */
async function humanMouseMove(page) {
  const x = Math.floor(Math.random() * 800) + 100;
  const y = Math.floor(Math.random() * 600) + 100;

  await page.mouse.move(x, y, { steps: 10 });
  await randomDelay(500, 1500);
}

/**
 * 인간처럼 스크롤하기
 */
async function humanScroll(page) {
  const scrollAmount = Math.floor(Math.random() * 300) + 100;

  await page.evaluate((amount) => {
    window.scrollBy({
      top: amount,
      behavior: 'smooth'
    });
  }, scrollAmount);

  await randomDelay(1000, 2000);
}

/**
 * 페이지에서 랜덤 링크 클릭
 */
async function clickRandomLink(page) {
  try {
    const links = await page.$$eval('a[href]', links =>
      links
        .filter(a => a.href && !a.href.includes('javascript:') && !a.href.includes('#'))
        .map(a => a.href)
    );

    if (links.length > 0) {
      const randomLink = links[Math.floor(Math.random() * Math.min(links.length, 10))];
      console.log(`       내부 링크 클릭: ${randomLink.substring(0, 50)}...`);
      await page.goto(randomLink, { waitUntil: 'networkidle2', timeout: 10000 });
      return true;
    }
  } catch (error) {
    console.log(`       링크 클릭 실패: ${error.message}`);
  }
  return false;
}

/**
 * 웹사이트 트래픽 봇 실행
 */
async function executeWebsiteVisit(slot, options = {}) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 웹사이트 트래픽 봇 시작 - 슬롯 ID: ${slot.id}`);
  console.log(`   목표 URL: ${slot.keyword}`); // WS 슬롯은 keyword에 URL 저장
  console.log(`${'='.repeat(60)}\n`);

  const proxy = options.proxy || getRandomProxy();
  const userAgent = getRandomUserAgent();
  const targetUrl = slot.keyword || options.targetUrl;

  if (!targetUrl) {
    console.error('❌ 목표 URL이 지정되지 않았습니다.');
    return { success: false, slotId: slot.id };
  }

  let browser;
  let success = false;
  let pagesVisited = 0;

  try {
    // 1. 브라우저 시작 (스텔스 모드)
    console.log(`[1/7] 브라우저 시작...`);
    console.log(`       프록시: ${proxy.ip}:${proxy.port}`);
    console.log(`       User-Agent: ${userAgent.substring(0, 50)}...`);

    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        `--user-agent=${userAgent}`
        // 실제 운영 시: `--proxy-server=${proxy.ip}:${proxy.port}`
      ]
    });

    const page = await browser.newPage();
    await page.setUserAgent(userAgent);

    // Viewport 설정 (랜덤)
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 1536, height: 864 },
      { width: 1440, height: 900 }
    ];
    const viewport = viewports[Math.floor(Math.random() * viewports.length)];
    await page.setViewport(viewport);

    // 2. 목표 웹사이트 접속
    console.log(`[2/7] 목표 웹사이트 접속 중...`);
    console.log(`       URL: ${targetUrl}`);

    await page.goto(targetUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    pagesVisited++;

    // 3. 초기 체류 (페이지 로딩 확인)
    console.log(`[3/7] 메인 페이지 체류 중...`);
    await randomDelay(3000, 7000);

    // 4. 인간처럼 행동 (마우스, 스크롤)
    console.log(`[4/7] 페이지 탐색 중...`);
    await humanMouseMove(page);
    await humanScroll(page);
    await randomDelay(2000, 4000);
    await humanScroll(page);
    await humanMouseMove(page);

    // 5. 내부 페이지 탐색 (2~4개 페이지)
    console.log(`[5/7] 내부 페이지 탐색 시작...`);
    const pagesToVisit = Math.floor(Math.random() * 3) + 2; // 2~4 페이지

    for (let i = 0; i < pagesToVisit; i++) {
      console.log(`       페이지 ${i + 1}/${pagesToVisit} 방문 중...`);

      const clicked = await clickRandomLink(page);
      if (clicked) {
        pagesVisited++;

        // 페이지 체류
        await randomDelay(3000, 8000);

        // 인간처럼 행동
        await humanMouseMove(page);
        await humanScroll(page);
        await randomDelay(1000, 3000);
        await humanScroll(page);
      } else {
        console.log(`       더 이상 방문할 페이지가 없습니다.`);
        break;
      }
    }

    // 6. 최종 체류
    console.log(`[6/7] 최종 체류 중...`);
    await randomDelay(5000, 10000);
    await humanMouseMove(page);

    // 7. 통계 업데이트
    console.log(`[7/7] 통계 업데이트...`);

    // 방문 기록 저장
    db.prepare(`
      UPDATE slots
      SET updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(slot.id);

    success = true;
    console.log(`\n✅ 봇 실행 완료!`);
    console.log(`   방문한 페이지: ${pagesVisited}개`);
    console.log(`   총 체류 시간: 약 ${Math.floor((pagesVisited * 5000 + 10000) / 1000)}초\n`);

  } catch (error) {
    console.error(`\n❌ 봇 실행 실패:`, error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return {
    success,
    pagesVisited,
    slotId: slot.id
  };
}

/**
 * 활성 슬롯 조회
 */
function getActiveSlots(slotType = 'WS') {
  return db.prepare(`
    SELECT * FROM slots
    WHERE slot_type = ?
    AND ranking_status = 'O'
    AND date(end_date, '+1 day') >= date('now')
  `).all(slotType);
}

/**
 * 메인 실행 함수
 */
async function main() {
  console.log('\n' + '='.repeat(60));
  console.log('🤖 Impact 웹사이트 트래픽 봇 시작');
  console.log('='.repeat(60) + '\n');

  const slots = getActiveSlots('WS');
  console.log(`활성 슬롯: ${slots.length}개\n`);

  if (slots.length === 0) {
    console.log('실행할 슬롯이 없습니다.');
    return;
  }

  for (const slot of slots) {
    await executeWebsiteVisit(slot, {
      // targetUrl은 slot.keyword에서 가져옴
    });

    // 슬롯 간 딜레이 (자연스럽게)
    await randomDelay(30000, 60000); // 30~60초 대기
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ 모든 봇 실행 완료');
  console.log('='.repeat(60) + '\n');

  db.close();
}

// CLI에서 직접 실행 시
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { executeWebsiteVisit, getActiveSlots };
