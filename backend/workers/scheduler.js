/**
 * Impact Bot Scheduler
 * 크론잡으로 봇 워커를 자동 실행
 *
 * 실행 스케줄:
 * - 매 10분: 네이버 검색 봇 (NA)
 * - 매 15분: 구글 검색 봇 (GA)
 * - 매 20분: 유튜브 검색 봇 (YA)
 * - 매 25분: 카페/블로그 봇 (CP)
 * - 매 30분: 웹사이트 트래픽 봇 (WS)
 * - 매 35분: 네이버 쇼핑 봇 (NS)
 * - 매 시간: 순위 확인
 * - 매일 9시: 일일 리포트
 */

const cron = require('node-cron');
const { executeNaverSearch, getActiveSlots: getNaverSlots } = require('./naver-bot');
const { executeGoogleSearch, getActiveSlots: getGoogleSlots } = require('./google-bot');
const { executeYouTubeSearch, getActiveSlots: getYouTubeSlots } = require('./youtube-bot');
const { executeWebsiteVisit, getActiveSlots: getWebsiteSlots } = require('./website-bot');
const { executeCafeBlogSearch, getActiveSlots: getCafeBlogSlots } = require('./cafe-blog-bot');
const { executeNaverShoppingSearch, getActiveSlots: getNaverShoppingSlots } = require('./naver-shopping-bot');

console.log('\n' + '='.repeat(60));
console.log('⏰ Impact Bot Scheduler 시작');
console.log('='.repeat(60) + '\n');

// 1. 네이버 봇 - 매 10분마다 실행
cron.schedule('*/10 * * * *', async () => {
  console.log(`\n[${new Date().toISOString()}] 네이버 봇 실행 시작...`);

  try {
    const slots = getNaverSlots('NA');
    console.log(`  활성 슬롯: ${slots.length}개`);

    for (const slot of slots) {
      await executeNaverSearch(slot, {
        targetDomain: 'example.com' // 실제 도메인으로 변경
      });

      // 슬롯 간 딜레이 (서버 부하 분산)
      await new Promise(resolve => setTimeout(resolve, 15000));
    }

    console.log(`  ✅ 네이버 봇 완료\n`);
  } catch (error) {
    console.error(`  ❌ 네이버 봇 실패:`, error.message);
  }
});

// 2. 구글 봇 - 매 15분마다 실행
cron.schedule('*/15 * * * *', async () => {
  console.log(`\n[${new Date().toISOString()}] 구글 봇 실행 시작...`);

  try {
    const slots = getGoogleSlots('GA');
    console.log(`  활성 슬롯: ${slots.length}개`);

    for (const slot of slots) {
      await executeGoogleSearch(slot, {
        targetDomain: 'example.com' // 실제 도메인으로 변경
      });

      // 슬롯 간 딜레이 (서버 부하 분산)
      await new Promise(resolve => setTimeout(resolve, 15000));
    }

    console.log(`  ✅ 구글 봇 완료\n`);
  } catch (error) {
    console.error(`  ❌ 구글 봇 실패:`, error.message);
  }
});

// 3. 유튜브 봇 - 매 20분마다 실행
cron.schedule('*/20 * * * *', async () => {
  console.log(`\n[${new Date().toISOString()}] 유튜브 봇 실행 시작...`);

  try {
    const slots = getYouTubeSlots('YA');
    console.log(`  활성 슬롯: ${slots.length}개`);

    for (const slot of slots) {
      await executeYouTubeSearch(slot, {
        targetChannel: '@example-channel' // 실제 채널로 변경
      });

      // 슬롯 간 딜레이 (서버 부하 분산)
      await new Promise(resolve => setTimeout(resolve, 15000));
    }

    console.log(`  ✅ 유튜브 봇 완료\n`);
  } catch (error) {
    console.error(`  ❌ 유튜브 봇 실패:`, error.message);
  }
});

// 4. 웹사이트 트래픽 봇 - 매 30분마다 실행
cron.schedule('*/30 * * * *', async () => {
  console.log(`\n[${new Date().toISOString()}] 웹사이트 트래픽 봇 실행 시작...`);

  try {
    const slots = getWebsiteSlots('WS');
    console.log(`  활성 슬롯: ${slots.length}개`);

    for (const slot of slots) {
      await executeWebsiteVisit(slot);

      // 슬롯 간 딜레이 (서버 부하 분산)
      await new Promise(resolve => setTimeout(resolve, 30000)); // 웹사이트는 더 긴 딜레이
    }

    console.log(`  ✅ 웹사이트 트래픽 봇 완료\n`);
  } catch (error) {
    console.error(`  ❌ 웹사이트 트래픽 봇 실패:`, error.message);
  }
});

// 5. 카페/블로그 봇 - 매 25분마다 실행
cron.schedule('*/25 * * * *', async () => {
  console.log(`\n[${new Date().toISOString()}] 카페/블로그 봇 실행 시작...`);

  try {
    const slots = getCafeBlogSlots('CP');
    console.log(`  활성 슬롯: ${slots.length}개`);

    for (const slot of slots) {
      await executeCafeBlogSearch(slot, {
        searchType: 'cafe' // 'cafe' or 'blog'
      });

      // 슬롯 간 딜레이 (서버 부하 분산)
      await new Promise(resolve => setTimeout(resolve, 20000));
    }

    console.log(`  ✅ 카페/블로그 봇 완료\n`);
  } catch (error) {
    console.error(`  ❌ 카페/블로그 봇 실패:`, error.message);
  }
});

// 6. 네이버 쇼핑 봇 - 매 35분마다 실행
cron.schedule('*/35 * * * *', async () => {
  console.log(`\n[${new Date().toISOString()}] 네이버 쇼핑 봇 실행 시작...`);

  try {
    const slots = getNaverShoppingSlots('NS');
    console.log(`  활성 슬롯: ${slots.length}개`);

    for (const slot of slots) {
      await executeNaverShoppingSearch(slot);

      // 슬롯 간 딜레이 (서버 부하 분산)
      await new Promise(resolve => setTimeout(resolve, 20000));
    }

    console.log(`  ✅ 네이버 쇼핑 봇 완료\n`);
  } catch (error) {
    console.error(`  ❌ 네이버 쇼핑 봇 실패:`, error.message);
  }
});

// 7. 순위 확인 - 매 시간마다
cron.schedule('0 * * * *', async () => {
  console.log(`\n[${new Date().toISOString()}] 순위 확인 시작...`);

  try {
    // 모든 봇의 순위를 확인하고 통계 생성
    const naSlots = getNaverSlots('NA');
    const gaSlots = getGoogleSlots('GA');
    const yaSlots = getYouTubeSlots('YA');
    const wsSlots = getWebsiteSlots('WS');
    const cpSlots = getCafeBlogSlots('CP');
    const nsSlots = getNaverShoppingSlots('NS');

    console.log(`  네이버 자동완성: ${naSlots.length}개`);
    console.log(`  구글 자동완성: ${gaSlots.length}개`);
    console.log(`  유튜브 자동완성: ${yaSlots.length}개`);
    console.log(`  웹사이트 트래픽: ${wsSlots.length}개`);
    console.log(`  카페/블로그: ${cpSlots.length}개`);
    console.log(`  네이버 쇼핑: ${nsSlots.length}개`);
    console.log(`  ✅ 순위 확인 완료\n`);
  } catch (error) {
    console.error(`  ❌ 순위 확인 실패:`, error.message);
  }
});

// 8. 일일 리포트 - 매일 오전 9시
cron.schedule('0 9 * * *', () => {
  console.log(`\n[${new Date().toISOString()}] 일일 리포트 생성...`);

  try {
    const naSlots = getNaverSlots('NA');
    const gaSlots = getGoogleSlots('GA');
    const yaSlots = getYouTubeSlots('YA');
    const wsSlots = getWebsiteSlots('WS');
    const cpSlots = getCafeBlogSlots('CP');
    const nsSlots = getNaverShoppingSlots('NS');

    console.log('\n📊 일일 통계:');
    console.log(`  네이버 자동완성: ${naSlots.length}개 슬롯`);
    console.log(`  구글 자동완성: ${gaSlots.length}개 슬롯`);
    console.log(`  유튜브 자동완성: ${yaSlots.length}개 슬롯`);
    console.log(`  웹사이트 트래픽: ${wsSlots.length}개 슬롯`);
    console.log(`  카페/블로그: ${cpSlots.length}개 슬롯`);
    console.log(`  네이버 쇼핑: ${nsSlots.length}개 슬롯`);
    console.log(`  총 활성 슬롯: ${naSlots.length + gaSlots.length + yaSlots.length + wsSlots.length + cpSlots.length + nsSlots.length}개\n`);
  } catch (error) {
    console.error(`  ❌ 리포트 생성 실패:`, error.message);
  }
});

console.log('📋 스케줄 등록 완료:');
console.log('  - 네이버 봇 (NA): 매 10분');
console.log('  - 구글 봇 (GA): 매 15분');
console.log('  - 유튜브 봇 (YA): 매 20분');
console.log('  - 카페/블로그 봇 (CP): 매 25분');
console.log('  - 웹사이트 봇 (WS): 매 30분');
console.log('  - 네이버 쇼핑 봇 (NS): 매 35분');
console.log('  - 순위 확인: 매 시간');
console.log('  - 일일 리포트: 매일 오전 9시');
console.log('\n대기 중...\n');

// 프로세스 유지
process.on('SIGINT', () => {
  console.log('\n\n스케줄러 종료...');
  process.exit(0);
});
