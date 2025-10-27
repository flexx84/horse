/**
 * Impact YouTube Search Bot
 * 유튜브 검색 자동화 및 트래픽 생성 봇
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
  { ip: '127.0.0.1', port: 8080, country: 'US', used: 0 },
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
 * 유튜브 검색 봇 실행
 */
async function executeYouTubeSearch(slot, options = {}) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 유튜브 검색 봇 시작 - 슬롯 ID: ${slot.id}`);
  console.log(`   키워드: ${slot.keyword}`);
  console.log(`   순위키워드: ${slot.rankkeyword}`);
  console.log(`${'='.repeat(60)}\n`);

  const proxy = options.proxy || getRandomProxy();
  const userAgent = getRandomUserAgent();

  let browser;
  let success = false;
  let foundInAutocomplete = false;
  let clickedOurVideo = false;

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
      { width: 1536, height: 864 }
    ];
    const viewport = viewports[Math.floor(Math.random() * viewports.length)];
    await page.setViewport(viewport);

    // 2. 유튜브 메인 페이지 접속
    console.log(`[2/10] 유튜브 접속 중...`);
    await page.goto('https://www.youtube.com', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await randomDelay(1000, 2000);

    // 3. 검색창 찾기
    console.log(`[3/10] 검색창 찾기...`);
    await page.waitForSelector('input#search', { timeout: 10000 });

    // 4. 검색어 입력 (인간처럼 천천히)
    console.log(`[4/10] 검색어 입력: "${slot.rankkeyword}"`);
    const searchBox = await page.$('input#search');
    await searchBox.click();
    await randomDelay(500, 1000);

    // 한 글자씩 타이핑 (인간처럼)
    for (const char of slot.rankkeyword) {
      await searchBox.type(char, { delay: Math.random() * 100 + 50 });
      await randomDelay(50, 150);
    }

    // 5. 자동완성 대기
    console.log(`[5/10] 자동완성 대기...`);
    await randomDelay(1000, 2000);

    try {
      // 유튜브 자동완성: .sbsb_a (search suggestions box)
      await page.waitForSelector('.sbsb_a, ytd-search-suggestion-renderer', { timeout: 5000 });

      // 6. 자동완성 목록에서 우리 키워드 찾기
      console.log(`[6/10] 자동완성 목록 검색 중...`);

      const autocompleteItems = await page.evaluate(() => {
        const items = document.querySelectorAll('.sbsb_c, ytd-search-suggestion-renderer');
        return Array.from(items).map((item, idx) => ({
          index: idx,
          text: item.innerText.trim()
        }));
      });

      console.log(`       자동완성 항목 ${autocompleteItems.length}개 발견`);
      autocompleteItems.forEach((item, idx) => {
        console.log(`       ${idx + 1}. ${item.text}`);
      });

      // 우리 키워드 찾기
      const targetItem = autocompleteItems.find(item =>
        item.text.includes(slot.keyword)
      );

      if (targetItem) {
        console.log(`       ✅ 발견! 순위: ${targetItem.index + 1}위`);
        foundInAutocomplete = true;

        // 7. 자동완성 항목 클릭
        console.log(`[7/10] 자동완성 항목 클릭...`);

        await page.evaluate((index) => {
          const items = document.querySelectorAll('.sbsb_c, ytd-search-suggestion-renderer');
          if (items[index]) {
            items[index].click();
          }
        }, targetItem.index);

        // 순위 업데이트
        db.prepare(`
          UPDATE slots SET ranking = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
        `).run(targetItem.index + 1, slot.id);

        // 시간별 순위 기록
        const now = new Date();
        db.prepare(`
          INSERT INTO hourly_rankings (slot_id, time_txt, ranking, ranking_txt)
          VALUES (?, ?, ?, ?)
        `).run(
          slot.id,
          `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
          targetItem.index + 1,
          `${targetItem.index + 1}위`
        );
      } else {
        console.log(`       ❌ 자동완성에 없음 - 전체 키워드 입력`);

        // 전체 키워드 입력
        const remainingText = slot.keyword.replace(slot.rankkeyword, '').trim();
        if (remainingText) {
          await searchBox.type(' ' + remainingText, { delay: 100 });
        }

        await randomDelay(500, 1000);
        await page.keyboard.press('Enter');

        // 순위 999로 업데이트 (없음)
        db.prepare(`
          UPDATE slots SET ranking = 999, updated_at = CURRENT_TIMESTAMP WHERE id = ?
        `).run(slot.id);
      }
    } catch (error) {
      console.log(`       자동완성 없음 - 엔터 검색`);
      await page.keyboard.press('Enter');
    }

    // 8. 검색 결과 대기
    console.log(`[8/10] 검색 결과 대기...`);
    await randomDelay(2000, 3000);

    // 인간처럼 행동
    await humanMouseMove(page);
    await humanScroll(page);

    // 9. 검색 결과에서 우리 동영상 찾기 (옵션)
    if (options.targetChannel || options.targetVideo) {
      console.log(`[9/10] 목표 동영상 검색...`);

      const videos = await page.$$eval('ytd-video-renderer a#video-title', links =>
        links.map(a => ({
          title: a.title,
          href: a.href
        }))
      );

      let ourVideo = null;
      if (options.targetChannel) {
        ourVideo = videos.find(v => v.href.includes(options.targetChannel));
      } else if (options.targetVideo) {
        ourVideo = videos.find(v => v.href.includes(options.targetVideo));
      }

      if (ourVideo) {
        console.log(`       ✅ 발견! 클릭 중...`);
        console.log(`       제목: ${ourVideo.title}`);

        await page.click(`ytd-video-renderer a[href*="${options.targetChannel || options.targetVideo}"]`);
        clickedOurVideo = true;

        // 10. 동영상 시청 (일부)
        console.log(`[10/10] 동영상 시청 중...`);
        await randomDelay(10000, 30000); // 10~30초 시청

        // 인간처럼 행동
        await humanMouseMove(page);
      } else {
        console.log(`       ❌ 목표 동영상 없음`);
      }
    } else {
      console.log(`[9/10] 목표 동영상 검색 생략 (targetChannel/targetVideo 없음)`);
    }

    success = true;
    console.log(`\n✅ 봇 실행 완료!`);
    console.log(`   자동완성 발견: ${foundInAutocomplete ? 'YES' : 'NO'}`);
    console.log(`   동영상 클릭: ${clickedOurVideo ? 'YES' : 'NO'}\n`);

  } catch (error) {
    console.error(`\n❌ 봇 실행 실패:`, error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return {
    success,
    foundInAutocomplete,
    clickedOurVideo,
    slotId: slot.id
  };
}

/**
 * 활성 슬롯 조회
 */
function getActiveSlots(slotType = 'YA') {
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
  console.log('🤖 Impact 유튜브 검색 봇 시작');
  console.log('='.repeat(60) + '\n');

  const slots = getActiveSlots('YA');
  console.log(`활성 슬롯: ${slots.length}개\n`);

  if (slots.length === 0) {
    console.log('실행할 슬롯이 없습니다.');
    return;
  }

  for (const slot of slots) {
    await executeYouTubeSearch(slot, {
      targetChannel: '@example-channel' // 실제 목표 채널로 변경
      // 또는 targetVideo: 'video-id'
    });

    // 슬롯 간 딜레이 (자연스럽게)
    await randomDelay(10000, 30000);
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

module.exports = { executeYouTubeSearch, getActiveSlots };
