/**
 * Impact Naver Search Bot (프록시 적용 버전)
 * 네이버 검색 자동화 및 트래픽 생성 봇
 *
 * 프록시 적용:
 * - ProxyManager 사용
 * - 슬롯당 다른 IP 사용
 * - 자동 장애조치
 */

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const Database = require('better-sqlite3');
const path = require('path');
const ProxyManager = require('./proxy-manager');

// Stealth plugin 적용 (봇 감지 우회)
puppeteer.use(StealthPlugin());

// Database 연결
const dbPath = path.join(__dirname, '../impact.db');
const db = new Database(dbPath);

// 프록시 매니저 초기화
const proxyManager = new ProxyManager(process.env.PROXY_PROVIDER || 'smartproxy');

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
 * 네이버 검색 봇 실행 (프록시 적용)
 */
async function executeNaverSearch(slot, options = {}) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 네이버 검색 봇 시작 - 슬롯 ID: ${slot.id}`);
  console.log(`   키워드: ${slot.keyword}`);
  console.log(`   순위키워드: ${slot.rankkeyword}`);
  console.log(`${'='.repeat(60)}\n`);

  const userAgent = getRandomUserAgent();

  let browser;
  let success = false;
  let foundInAutocomplete = false;
  let clickedOurSite = false;
  let proxyUsed = null;

  try {
    // 1. 프록시 가져오기
    console.log(`[1/11] 프록시 준비...`);

    let proxy;
    const maxProxyRetries = 3;
    let proxyRetryCount = 0;

    while (proxyRetryCount < maxProxyRetries) {
      try {
        // 한국 IP, 세션 고정 (10분 동안 같은 IP)
        proxy = await proxyManager.getProxy('KR', true);

        // 프록시 테스트 (선택적, 시간이 걸림)
        if (options.testProxy) {
          console.log(`       프록시 테스트 중...`);
          const testResult = await proxyManager.testProxy(proxy.url);

          if (!testResult.success) {
            console.log(`       ❌ 프록시 테스트 실패: ${testResult.error}`);
            proxyRetryCount++;
            continue;
          }

          console.log(`       ✅ 프록시 테스트 성공: ${testResult.ip} (${testResult.responseTime}ms)`);
        }

        proxyUsed = proxy;
        console.log(`       프록시 준비 완료`);
        break;
      } catch (error) {
        console.error(`       프록시 획득 실패 (${proxyRetryCount + 1}/${maxProxyRetries}):`, error.message);
        proxyRetryCount++;

        if (proxyRetryCount >= maxProxyRetries) {
          throw new Error('프록시 획득 실패');
        }

        await randomDelay(2000, 5000);
      }
    }

    // 2. 브라우저 시작 (스텔스 모드 + 프록시)
    console.log(`[2/11] 브라우저 시작...`);
    console.log(`       User-Agent: ${userAgent.substring(0, 50)}...`);

    const launchOptions = {
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-web-security',
        `--user-agent=${userAgent}`
      ]
    };

    // 프록시 적용
    if (proxyUsed) {
      launchOptions.args.push(proxyManager.getPuppeteerArgs(proxyUsed.url));
      console.log(`       프록시 적용 완료`);
    }

    browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    await page.setUserAgent(userAgent);

    // 프록시 인증
    if (proxyUsed) {
      await proxyManager.authenticatePuppeteer(page, proxyUsed.url);
    }

    // Viewport 설정 (랜덤)
    const viewports = [
      { width: 1920, height: 1080 },
      { width: 1366, height: 768 },
      { width: 1536, height: 864 },
      { width: 1440, height: 900 }
    ];
    const viewport = viewports[Math.floor(Math.random() * viewports.length)];
    await page.setViewport(viewport);

    // 3. 네이버 메인 페이지 접속
    console.log(`[3/11] 네이버 접속 중...`);
    await page.goto('https://www.naver.com', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    await randomDelay(1000, 2000);

    // 4. 검색창 찾기
    console.log(`[4/11] 검색창 찾기...`);
    await page.waitForSelector('input#query, input.search_input', { timeout: 10000 });

    // 5. 검색어 입력 (인간처럼 천천히)
    console.log(`[5/11] 검색어 입력: "${slot.rankkeyword}"`);
    const searchBox = await page.$('input#query') || await page.$('input.search_input');
    await searchBox.click();
    await randomDelay(500, 1000);

    // 한 글자씩 타이핑 (인간처럼)
    for (const char of slot.rankkeyword) {
      await searchBox.type(char, { delay: Math.random() * 100 + 50 });
      await randomDelay(50, 150);
    }

    // 6. 자동완성 대기
    console.log(`[6/11] 자동완성 대기...`);
    await randomDelay(1000, 2000);

    try {
      await page.waitForSelector('.autocomplete, .auto_area', { timeout: 5000 });

      // 7. 자동완성 목록에서 우리 키워드 찾기
      console.log(`[7/11] 자동완성 목록 검색 중...`);

      const autocompleteItems = await page.evaluate(() => {
        const items = document.querySelectorAll('.autocomplete .item, .auto_area .item');
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

        // 8. 자동완성 항목 클릭
        console.log(`[8/11] 자동완성 항목 클릭...`);

        await page.evaluate((index) => {
          const items = document.querySelectorAll('.autocomplete .item, .auto_area .item');
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

    // 9. 검색 결과 대기
    console.log(`[9/11] 검색 결과 대기...`);
    await randomDelay(2000, 3000);

    // 인간처럼 행동
    await humanMouseMove(page);
    await humanScroll(page);

    // 10. 검색 결과에서 우리 사이트 찾기 (옵션)
    if (options.targetDomain) {
      console.log(`[10/11] 목표 사이트 검색...`);

      try {
        const siteLink = await page.$(`a[href*="${options.targetDomain}"]`);

        if (siteLink) {
          console.log(`       ✅ 발견! 클릭 중...`);

          await siteLink.click();
          clickedOurSite = true;

          // 11. 사이트 체류
          console.log(`[11/11] 사이트 체류 중...`);
          await randomDelay(5000, 15000); // 5~15초 체류

          // 인간처럼 행동
          await humanMouseMove(page);
          await humanScroll(page);
          await randomDelay(2000, 4000);
          await humanScroll(page);
          await humanMouseMove(page);
        } else {
          console.log(`       ❌ 목표 사이트 없음`);
        }
      } catch (error) {
        console.log(`       사이트 클릭 실패: ${error.message}`);
      }
    } else {
      console.log(`[10/11] 목표 사이트 검색 생략`);
      console.log(`[11/11] 완료`);
    }

    success = true;
    console.log(`\n✅ 봇 실행 완료!`);
    console.log(`   자동완성 발견: ${foundInAutocomplete ? 'YES' : 'NO'}`);
    console.log(`   사이트 클릭: ${clickedOurSite ? 'YES' : 'NO'}`);
    console.log(`   프록시 사용: ${proxyUsed ? 'YES' : 'NO'}\n`);

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
    clickedOurSite,
    proxyUsed: proxyUsed ? true : false,
    slotId: slot.id
  };
}

/**
 * 활성 슬롯 조회
 */
function getActiveSlots(slotType = 'NA') {
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
  console.log('🤖 Impact 네이버 검색 봇 시작 (프록시 버전)');
  console.log('='.repeat(60) + '\n');

  // 프록시 매니저 통계
  console.log('프록시 매니저 설정:');
  console.log(`  프로바이더: ${proxyManager.provider}`);
  console.log(`  호스트: ${proxyManager.config.host}`);
  console.log('');

  const slots = getActiveSlots('NA');
  console.log(`활성 슬롯: ${slots.length}개\n`);

  if (slots.length === 0) {
    console.log('실행할 슬롯이 없습니다.');
    return;
  }

  for (const slot of slots) {
    await executeNaverSearch(slot, {
      targetDomain: 'example.com', // 실제 도메인으로 변경
      testProxy: false // true = 프록시 테스트 활성화 (느림)
    });

    // 슬롯 간 딜레이 (자연스럽게)
    await randomDelay(10000, 30000);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ 모든 봇 실행 완료');
  console.log('='.repeat(60) + '\n');

  // 프록시 매니저 통계 출력
  console.log('프록시 사용 통계:');
  console.log(proxyManager.getStats());

  db.close();
}

// CLI에서 직접 실행 시
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { executeNaverSearch, getActiveSlots };
