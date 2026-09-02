// 일회성 검증 스크립트: 데스크톱/모바일에서 사이트 동작을 확인하고 스크린샷을 남깁니다.
// 실행: node verify-site.mjs (dev 서버가 5173 포트에 떠 있어야 함)
import { mkdirSync } from 'node:fs'
import { chromium } from 'playwright-core'

const BASE_URL = 'http://localhost:5173/'
const SHOT_DIR = '/Users/eunchan-kim/Desktop/AnnChloe/.cursor/screenshots'
mkdirSync(SHOT_DIR, { recursive: true })

const results = []
function check(name, passed, detail = '') {
  results.push({ name, passed })
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name}${detail ? ' — ' + detail : ''}`)
}

const browser = await chromium.launch({ channel: 'chrome', headless: true })

// ── 데스크톱 (1440x900) ─────────────────────────────
const desktop = await browser.newPage({ viewport: { width: 1440, height: 900 } })
const consoleErrors = []
desktop.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text())
})

await desktop.goto(BASE_URL, { waitUntil: 'networkidle' })

const title = await desktop.title()
check('페이지 제목에 앤끌로에 포함', title.includes('앤끌로에'), title)

const heroTitle = await desktop.locator('h1').textContent()
check('히어로 브랜드 문구 표시', heroTitle === '나에게 꼭 맞는 스타일을 만나는 곳', heroTitle)

const bookingHrefs = await desktop.$$eval('a', (links) =>
  links.filter((l) => l.textContent.includes('예약하기')).map((l) => l.getAttribute('href')),
)
check('예약 버튼 4개(헤더/히어로/배너/푸터)', bookingHrefs.length === 4, `${bookingHrefs.length}개`)
check('예약 링크 네이버 예약으로 통일', bookingHrefs.every((href) => href === 'https://booking.naver.com/booking/13/bizes/830277?lang=ko'))

const cardCount = await desktop.locator('.portfolio-card').count()
check('포트폴리오 카드 8장', cardCount === 8, `${cardCount}장`)

const placeholderCount = await desktop.locator('.image-placeholder').count()
check('사진 없음 → 자리 표시자 12개(히어로4 + 카드8)', placeholderCount === 12, `${placeholderCount}개`)

await desktop.screenshot({ path: `${SHOT_DIR}/desktop-full.png`, fullPage: true })

// 히어로의 "시술 스타일 보러 가기" → 포트폴리오 앵커 스크롤
await desktop.click('.hero-actions a[href="#portfolio"]')
await desktop.waitForFunction(
  () => {
    const rect = document.querySelector('#portfolio').getBoundingClientRect()
    return rect.top >= 0 && rect.top < 250
  },
  null,
  { timeout: 5000 },
)
check('히어로 CTA로 포트폴리오까지 스크롤 이동', true)

// 캐러셀 좌우 버튼
const track = desktop.locator('.portfolio-track')
const scrollBefore = await track.evaluate((el) => el.scrollLeft)
await desktop.click('button[aria-label="다음 스타일 보기"]')
await desktop.waitForTimeout(900)
const scrollAfterNext = await track.evaluate((el) => el.scrollLeft)
check('다음 버튼 → 오른쪽으로 스크롤', scrollAfterNext > scrollBefore, `${scrollBefore} → ${scrollAfterNext}`)

await desktop.click('button[aria-label="이전 스타일 보기"]')
await desktop.waitForTimeout(900)
const scrollAfterPrev = await track.evaluate((el) => el.scrollLeft)
check('이전 버튼 → 왼쪽으로 복귀', scrollAfterPrev < scrollAfterNext, `${scrollAfterNext} → ${scrollAfterPrev}`)

await desktop.screenshot({ path: `${SHOT_DIR}/desktop-portfolio.png` })

const hasOverflow = await track.evaluate((el) => el.scrollWidth > el.clientWidth)
check('데스크톱에서 다음 카드 일부가 보이는 오버플로 존재', hasOverflow)

// 이미지 404(placeholder 의도된 동작)를 제외한 콘솔 에러 확인
const unexpectedErrors = consoleErrors.filter((e) => !e.includes('Failed to load resource'))
check('예상 밖 콘솔 에러 없음', unexpectedErrors.length === 0, unexpectedErrors.join(' | '))

// ── 모바일 (390x844) ────────────────────────────────
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
})
await mobile.goto(BASE_URL, { waitUntil: 'networkidle' })

const controlsHidden = await mobile
  .locator('.portfolio-controls')
  .evaluate((el) => getComputedStyle(el).display === 'none')
check('모바일: 캐러셀 버튼 숨김(스와이프 전용)', controlsHidden)

const navHidden = await mobile.locator('.site-nav').evaluate((el) => getComputedStyle(el).display === 'none')
check('모바일: 상단 내비 숨김', navHidden)

const mobileTrack = mobile.locator('.portfolio-track')
await mobileTrack.scrollIntoViewIfNeeded()

const snapType = await mobileTrack.evaluate((el) => getComputedStyle(el).scrollSnapType)
check('모바일: 스크롤 스냅 적용', snapType.startsWith('x'), snapType)

const mobileScrollBefore = await mobileTrack.evaluate((el) => el.scrollLeft)
await mobileTrack.evaluate((el) => el.scrollBy({ left: 320 }))
await mobile.waitForTimeout(700)
const mobileScrollAfter = await mobileTrack.evaluate((el) => el.scrollLeft)
check('모바일: 트랙 가로 스크롤 동작', mobileScrollAfter > mobileScrollBefore, `${mobileScrollBefore} → ${mobileScrollAfter}`)

await mobile.screenshot({ path: `${SHOT_DIR}/mobile-full.png`, fullPage: true })

await browser.close()

const failedCount = results.filter((r) => !r.passed).length
console.log(failedCount === 0 ? '\nALL CHECKS PASSED' : `\n${failedCount} CHECKS FAILED`)
process.exit(failedCount === 0 ? 0 : 1)
