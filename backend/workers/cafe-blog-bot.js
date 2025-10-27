/**
 * Impact Cafe/Blog Bot
 * 네이버 카페/블로그 검색 및 트래픽 생성 봇
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
 * 카페/블로그 검색 봇 실행
 */
async function executeCafeBlogSearch(slot, options = {}) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 카페/블로그 검색 봇 시작 - 슬롯 ID: ${slot.id}`);
  console.log(`   키워드: ${slot.keyword}`);
  console.log(`   순위키워드: ${slot.rankkeyword}`);
  console.log(`   타입: ${options.searchType || 'cafe'}`); // 'cafe' or 'blog'
  console.log(`${'='.repeat(60)}\n`);

  const proxy = options.proxy || getRandomProxy();
  const userAgent = getRandomUserAgent();
  const searchType = options.searchType || 'cafe'; // Default: cafe

  let browser;
  let success = false;
  let foundTarget = false;

  try {
    // 1. 브라우저 시작 (스텔스 모드)
    console.log(`[1/10] 브라우저 시작...`);
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

    // 2. 네이버 카페/블로그 검색 페이지 접속
    console.log(`[2/10] 네이버 ${searchType === 'cafe' ? '카페' : '블로그'} 검색 접속 중...`);

    const searchUrl = searchType === 'cafe'
      ? 'https://search.naver.com/search.naver?where=article'
      : 'https://search.naver.com/search.naver?where=post';

    await page.goto(searchUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await randomDelay(1000, 2000);

    // 3. 검색창 찾기
    console.log(`[3/10] 검색창 찾기...`);
    await page.waitForSelector('input.search_input', { timeout: 10000 });

    // 4. 검색어 입력 (인간처럼 천천히)
    console.log(`[4/10] 검색어 입력: "${slot.keyword}"`);
    const searchBox = await page.$('input.search_input');
    await searchBox.click();
    await randomDelay(500, 1000);

    // 한 글자씩 타이핑 (인간처럼)
    for (const char of slot.keyword) {
      await searchBox.type(char, { delay: Math.random() * 100 + 50 });
      await randomDelay(50, 150);
    }

    // 5. 검색 실행
    console.log(`[5/10] 검색 실행...`);
    await page.keyboard.press('Enter');
    await randomDelay(2000, 3000);

    // 6. 검색 결과 대기
    console.log(`[6/10] 검색 결과 대기...`);

    try {
      // 카페/블로그 검색 결과 셀렉터
      const resultSelector = searchType === 'cafe'
        ? '.api_subject_bx, .total_wrap'
        : '.api_subject_bx, .total_wrap';

      await page.waitForSelector(resultSelector, { timeout: 10000 });
    } catch (error) {
      console.log(`       검색 결과를 찾을 수 없습니다.`);
    }

    // 인간처럼 행동
    await humanMouseMove(page);
    await humanScroll(page);

    // 7. 목표 게시물 검색
    console.log(`[7/10] 목표 게시물 검색...`);

    // 검색 결과에서 링크 추출
    const posts = await page.evaluate(() => {
      const links = document.querySelectorAll('.total_tit, .api_txt_lines, a.link_tit');
      return Array.from(links).map((link, idx) => ({
        index: idx,
        title: link.innerText.trim(),
        href: link.href
      }));
    });

    console.log(`       검색 결과: ${posts.length}개`);
    posts.slice(0, 5).forEach((post, idx) => {
      console.log(`       ${idx + 1}. ${post.title.substring(0, 50)}...`);
    });

    // 목표 게시물 찾기 (키워드 포함 또는 특정 URL)
    let targetPost = null;

    if (options.targetUrl) {
      targetPost = posts.find(post => post.href.includes(options.targetUrl));
    } else if (options.targetTitle) {
      targetPost = posts.find(post => post.title.includes(options.targetTitle));
    } else {
      // 기본: 첫 번째 결과
      targetPost = posts[0];
    }

    if (targetPost) {
      console.log(`       ✅ 목표 게시물 발견!`);
      console.log(`       제목: ${targetPost.title}`);
      console.log(`       순위: ${targetPost.index + 1}위`);
      foundTarget = true;

      // 순위 업데이트
      db.prepare(`
        UPDATE slots SET ranking = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).run(targetPost.index + 1, slot.id);

      // 시간별 순위 기록
      const now = new Date();
      db.prepare(`
        INSERT INTO hourly_rankings (slot_id, time_txt, ranking, ranking_txt)
        VALUES (?, ?, ?, ?)
      `).run(
        slot.id,
        `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
        targetPost.index + 1,
        `${targetPost.index + 1}위`
      );

      // 8. 게시물 클릭
      console.log(`[8/10] 게시물 클릭...`);
      await page.goto(targetPost.href, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // 9. 게시물 읽기 (체류)
      console.log(`[9/10] 게시물 읽기 중...`);
      await randomDelay(5000, 15000); // 5~15초 체류

      // 인간처럼 행동
      await humanMouseMove(page);
      await humanScroll(page);
      await randomDelay(2000, 4000);
      await humanScroll(page);
      await humanMouseMove(page);
      await randomDelay(3000, 6000);

      // 10. 추가 게시물 탐색 (선택적)
      console.log(`[10/10] 추가 탐색...`);
      await humanScroll(page);
      await randomDelay(2000, 5000);

    } else {
      console.log(`       ❌ 목표 게시물을 찾을 수 없습니다.`);

      // 순위 999로 업데이트 (없음)
      db.prepare(`
        UPDATE slots SET ranking = 999, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).run(slot.id);
    }

    success = true;
    console.log(`\n✅ 봇 실행 완료!`);
    console.log(`   목표 발견: ${foundTarget ? 'YES' : 'NO'}`);;
    console.log(`   검색 타입: ${searchType === 'cafe' ? '카페' : '블로그'}\n`);

  } catch (error) {
    console.error(`\n❌ 봇 실행 실패:`, error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return {
    success,
    foundTarget,
    slotId: slot.id
  };
}

/**
 * 활성 슬롯 조회
 */
function getActiveSlots(slotType = 'CP') {
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
  console.log('🤖 Impact 카페/블로그 검색 봇 시작');
  console.log('='.repeat(60) + '\n');

  const slots = getActiveSlots('CP');
  console.log(`활성 슬롯: ${slots.length}개\n`);

  if (slots.length === 0) {
    console.log('실행할 슬롯이 없습니다.');
    return;
  }

  for (const slot of slots) {
    await executeCafeBlogSearch(slot, {
      searchType: 'cafe', // 'cafe' or 'blog'
      // targetUrl: 'target-cafe-url',  // 선택적
      // targetTitle: '특정 제목'        // 선택적
    });

    // 슬롯 간 딜레이 (자연스럽게)
    await randomDelay(15000, 30000);
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

module.exports = { executeCafeBlogSearch, getActiveSlots };
