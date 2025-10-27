/**
 * Impact Bot - 실제 트래픽 발생 테스트
 *
 * 테스트 방법:
 * 1. 헤드리스 모드 OFF (실제 브라우저 창 보기)
 * 2. 로그 상세 출력
 * 3. 스크린샷 저장
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

// 스크린샷 디렉토리
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR);
}

/**
 * 간단한 네이버 접속 테스트
 */
async function testNaverAccess() {
  console.log('\n' + '='.repeat(60));
  console.log('🧪 네이버 접속 테스트 시작');
  console.log('='.repeat(60) + '\n');

  let browser;

  try {
    // 1. 브라우저 시작 (헤드리스 OFF - 실제 창 보기)
    console.log('[1/5] 브라우저 시작... (창이 열립니다)');
    browser = await puppeteer.launch({
      headless: false,  // ⭐ 실제 브라우저 창 보기
      defaultViewport: { width: 1280, height: 800 },
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // 2. 네이버 접속
    console.log('[2/5] 네이버 메인 페이지 접속 중...');
    await page.goto('https://www.naver.com', {
      waitUntil: 'networkidle2',
      timeout: 30000
    });

    // 스크린샷 저장
    const screenshot1 = path.join(SCREENSHOT_DIR, '01-naver-main.png');
    await page.screenshot({ path: screenshot1 });
    console.log(`       ✅ 접속 성공!`);
    console.log(`       📸 스크린샷: ${screenshot1}`);

    // 3. 검색창 찾기
    console.log('[3/5] 검색창 찾기...');
    await page.waitForSelector('#query', { timeout: 10000 });
    console.log('       ✅ 검색창 발견!');

    // 4. 검색어 입력 (천천히, 보이게)
    console.log('[4/5] 검색어 입력: "네이버"');
    await page.click('#query');
    await page.type('#query', '네이버', { delay: 200 }); // 200ms 딜레이 (눈으로 보임)

    // 잠시 대기 (자동완성 확인)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 스크린샷 저장
    const screenshot2 = path.join(SCREENSHOT_DIR, '02-search-typed.png');
    await page.screenshot({ path: screenshot2 });
    console.log(`       ✅ 입력 완료!`);
    console.log(`       📸 스크린샷: ${screenshot2}`);

    // 5. 검색 실행
    console.log('[5/5] 검색 실행...');
    await page.keyboard.press('Enter');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // 최종 스크린샷
    const screenshot3 = path.join(SCREENSHOT_DIR, '03-search-results.png');
    await page.screenshot({ path: screenshot3 });
    console.log(`       ✅ 검색 완료!`);
    console.log(`       📸 스크린샷: ${screenshot3}`);

    // 5초 대기 (결과 확인)
    console.log('\n⏳ 5초간 결과 확인 중...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('\n' + '='.repeat(60));
    console.log('✅ 테스트 성공!');
    console.log('='.repeat(60));
    console.log(`\n📁 스크린샷 저장 위치: ${SCREENSHOT_DIR}\n`);

  } catch (error) {
    console.error('\n❌ 테스트 실패:', error.message);
    console.error(error);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * 실제 슬롯 데이터로 테스트
 */
async function testWithSlotData() {
  console.log('\n' + '='.repeat(60));
  console.log('🧪 실제 슬롯 데이터 테스트');
  console.log('='.repeat(60) + '\n');

  // 테스트 슬롯 데이터
  const testSlot = {
    id: 739757,
    keyword: '카드깡 애app1e플티켓',
    rankkeyword: '카드깡',
    slot_type: 'NA'
  };

  console.log(`슬롯 ID: ${testSlot.id}`);
  console.log(`키워드: ${testSlot.keyword}`);
  console.log(`순위키워드: ${testSlot.rankkeyword}\n`);

  let browser;

  try {
    // 브라우저 시작
    console.log('[1/7] 브라우저 시작...');
    browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1280, height: 800 },
      args: ['--no-sandbox']
    });

    const page = await browser.newPage();

    // 네이버 접속
    console.log('[2/7] 네이버 접속...');
    await page.goto('https://www.naver.com', {
      waitUntil: 'networkidle2'
    });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'slot-01-main.png') });

    // 검색어 입력 (순위키워드만)
    console.log(`[3/7] 순위키워드 입력: "${testSlot.rankkeyword}"`);
    await page.click('#query');
    await page.type('#query', testSlot.rankkeyword, { delay: 150 });

    // 자동완성 대기
    console.log('[4/7] 자동완성 대기...');
    await new Promise(resolve => setTimeout(resolve, 2000));

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'slot-02-autocomplete.png') });

    // 자동완성 목록 확인
    try {
      const autocompleteVisible = await page.$('.autocomplete');

      if (autocompleteVisible) {
        console.log('[5/7] 자동완성 목록 분석...');

        const items = await page.$$eval('.autocomplete .item', items =>
          items.map((item, idx) => ({
            index: idx + 1,
            text: item.innerText.trim()
          }))
        );

        console.log(`\n📋 자동완성 목록 (${items.length}개):`);
        items.forEach(item => {
          const isTarget = item.text.includes(testSlot.keyword);
          console.log(`  ${isTarget ? '✅' : '  '} ${item.index}. ${item.text}`);
        });

        // 우리 키워드 찾기
        const targetItem = items.find(item => item.text.includes(testSlot.keyword));

        if (targetItem) {
          console.log(`\n🎯 발견! 순위: ${targetItem.index}위`);

          // 클릭
          console.log('[6/7] 자동완성 항목 클릭...');
          await page.click(`.autocomplete .item:nth-child(${targetItem.index})`);
        } else {
          console.log(`\n❌ 자동완성에 없음`);
          // 전체 키워드 입력
          const remaining = testSlot.keyword.replace(testSlot.rankkeyword, '').trim();
          if (remaining) {
            await page.type('#query', ' ' + remaining, { delay: 150 });
          }
          await page.keyboard.press('Enter');
        }
      } else {
        console.log('[5/7] 자동완성 없음 - 엔터 검색');
        await page.keyboard.press('Enter');
      }
    } catch (error) {
      console.log('자동완성 확인 실패, 엔터 검색');
      await page.keyboard.press('Enter');
    }

    // 검색 결과 대기
    console.log('[7/7] 검색 결과 대기...');
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 10000 });

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'slot-03-results.png') });

    // 5초 대기
    console.log('\n⏳ 5초간 결과 확인 중...');
    await new Promise(resolve => setTimeout(resolve, 5000));

    console.log('\n✅ 테스트 완료!\n');

  } catch (error) {
    console.error('\n❌ 테스트 실패:', error.message);
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

// 메인 함수
async function main() {
  const args = process.argv.slice(2);

  if (args.includes('--simple')) {
    // 간단한 테스트
    await testNaverAccess();
  } else if (args.includes('--slot')) {
    // 슬롯 데이터 테스트
    await testWithSlotData();
  } else {
    // 둘 다 실행
    console.log('\n💡 사용법:');
    console.log('  node test-bot.js --simple   # 간단한 네이버 접속 테스트');
    console.log('  node test-bot.js --slot     # 실제 슬롯 데이터로 테스트');
    console.log('  node test-bot.js            # 모든 테스트 실행\n');

    await testNaverAccess();
    console.log('\n' + '-'.repeat(60) + '\n');
    await testWithSlotData();
  }
}

main().catch(console.error);
