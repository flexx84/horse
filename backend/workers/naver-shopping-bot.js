/**
 * Impact Naver Shopping Bot
 * 네이버 쇼핑 검색 및 상품 조회 봇
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
 * 네이버 쇼핑 검색 봇 실행
 */
async function executeNaverShoppingSearch(slot, options = {}) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 네이버 쇼핑 검색 봇 시작 - 슬롯 ID: ${slot.id}`);
  console.log(`   키워드: ${slot.keyword}`);
  console.log(`   순위키워드: ${slot.rankkeyword}`);
  console.log(`${'='.repeat(60)}\n`);

  const proxy = options.proxy || getRandomProxy();
  const userAgent = getRandomUserAgent();

  let browser;
  let success = false;
  let foundProduct = false;

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

    // 2. 네이버 쇼핑 페이지 접속
    console.log(`[2/10] 네이버 쇼핑 접속 중...`);
    await page.goto('https://shopping.naver.com', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await randomDelay(1000, 2000);

    // 3. 검색창 찾기
    console.log(`[3/10] 검색창 찾기...`);
    await page.waitForSelector('input._searchInput_search_text_3CUDs, input#query', { timeout: 10000 });

    // 4. 검색어 입력 (인간처럼 천천히)
    console.log(`[4/10] 검색어 입력: "${slot.keyword}"`);
    const searchBox = await page.$('input._searchInput_search_text_3CUDs') || await page.$('input#query');
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
      // 네이버 쇼핑 상품 목록 셀렉터
      await page.waitForSelector('.product_list, .basicList_list_basis__uNBZx, div[data-nclick*="product"]', { timeout: 10000 });
    } catch (error) {
      console.log(`       검색 결과를 찾을 수 없습니다.`);
    }

    // 인간처럼 행동
    await humanMouseMove(page);
    await humanScroll(page);

    // 7. 목표 상품 검색
    console.log(`[7/10] 목표 상품 검색...`);

    // 검색 결과에서 상품 추출
    const products = await page.evaluate(() => {
      // 여러 셀렉터 시도 (네이버 쇼핑 UI 변경에 대응)
      const selectors = [
        '.product_item a',
        '.basicList_link__1MaTN',
        'div[data-nclick*="product"] a',
        '.product_link'
      ];

      let productLinks = [];
      for (const selector of selectors) {
        const links = document.querySelectorAll(selector);
        if (links.length > 0) {
          productLinks = Array.from(links).map((link, idx) => ({
            index: idx,
            title: link.getAttribute('title') || link.innerText.trim(),
            href: link.href
          }));
          break;
        }
      }

      // 중복 제거 (같은 href)
      const uniqueProducts = [];
      const seenHrefs = new Set();
      for (const product of productLinks) {
        if (!seenHrefs.has(product.href)) {
          seenHrefs.add(product.href);
          uniqueProducts.push(product);
        }
      }

      return uniqueProducts.slice(0, 20); // 상위 20개
    });

    console.log(`       검색 결과: ${products.length}개`);
    products.slice(0, 5).forEach((product, idx) => {
      console.log(`       ${idx + 1}. ${product.title.substring(0, 50)}...`);
    });

    // 목표 상품 찾기
    let targetProduct = null;

    if (options.targetUrl) {
      targetProduct = products.find(p => p.href.includes(options.targetUrl));
    } else if (options.targetTitle) {
      targetProduct = products.find(p => p.title.includes(options.targetTitle));
    } else if (options.targetShop) {
      targetProduct = products.find(p => p.href.includes(options.targetShop));
    } else {
      // 기본: 첫 번째~다섯 번째 중 랜덤
      const randomIdx = Math.floor(Math.random() * Math.min(5, products.length));
      targetProduct = products[randomIdx];
    }

    if (targetProduct) {
      console.log(`       ✅ 목표 상품 발견!`);
      console.log(`       제목: ${targetProduct.title}`);
      console.log(`       순위: ${targetProduct.index + 1}위`);
      foundProduct = true;

      // 순위 업데이트
      db.prepare(`
        UPDATE slots SET ranking = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).run(targetProduct.index + 1, slot.id);

      // 시간별 순위 기록
      const now = new Date();
      db.prepare(`
        INSERT INTO hourly_rankings (slot_id, time_txt, ranking, ranking_txt)
        VALUES (?, ?, ?, ?)
      `).run(
        slot.id,
        `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`,
        targetProduct.index + 1,
        `${targetProduct.index + 1}위`
      );

      // 8. 상품 페이지 클릭
      console.log(`[8/10] 상품 페이지 클릭...`);
      await page.goto(targetProduct.href, {
        waitUntil: 'networkidle2',
        timeout: 30000
      });

      // 9. 상품 정보 확인 (체류)
      console.log(`[9/10] 상품 정보 확인 중...`);
      await randomDelay(5000, 15000); // 5~15초 체류

      // 인간처럼 행동
      await humanMouseMove(page);
      await humanScroll(page);
      await randomDelay(2000, 4000);
      await humanScroll(page);
      await humanMouseMove(page);

      // 10. 추가 행동 (선택적)
      console.log(`[10/10] 추가 행동...`);

      try {
        // 상품 이미지 클릭 (확대 보기)
        const imageSelector = '.image_thumb, .product_img, img';
        const imageExists = await page.$(imageSelector);
        if (imageExists) {
          await page.click(imageSelector).catch(() => {});
          await randomDelay(1000, 2000);
        }

        // 스크롤 (상세 정보 보기)
        await humanScroll(page);
        await randomDelay(2000, 4000);
        await humanScroll(page);

        // 리뷰 탭 보기 (있다면)
        const reviewTab = await page.$('a[href*="review"], .tab_review');
        if (reviewTab) {
          await reviewTab.click().catch(() => {});
          await randomDelay(2000, 5000);
          await humanScroll(page);
        }
      } catch (error) {
        console.log(`       추가 행동 중 오류 (무시): ${error.message}`);
      }

    } else {
      console.log(`       ❌ 목표 상품을 찾을 수 없습니다.`);

      // 순위 999로 업데이트 (없음)
      db.prepare(`
        UPDATE slots SET ranking = 999, updated_at = CURRENT_TIMESTAMP WHERE id = ?
      `).run(slot.id);
    }

    success = true;
    console.log(`\n✅ 봇 실행 완료!`);
    console.log(`   상품 발견: ${foundProduct ? 'YES' : 'NO'}\n`);

  } catch (error) {
    console.error(`\n❌ 봇 실행 실패:`, error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }

  return {
    success,
    foundProduct,
    slotId: slot.id
  };
}

/**
 * 활성 슬롯 조회
 */
function getActiveSlots(slotType = 'NS') {
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
  console.log('🤖 Impact 네이버 쇼핑 검색 봇 시작');
  console.log('='.repeat(60) + '\n');

  const slots = getActiveSlots('NS');
  console.log(`활성 슬롯: ${slots.length}개\n`);

  if (slots.length === 0) {
    console.log('실행할 슬롯이 없습니다.');
    return;
  }

  for (const slot of slots) {
    await executeNaverShoppingSearch(slot, {
      // targetUrl: 'target-product-url',  // 선택적
      // targetTitle: '특정 상품명',        // 선택적
      // targetShop: 'shop-name'           // 선택적
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

module.exports = { executeNaverShoppingSearch, getActiveSlots };
