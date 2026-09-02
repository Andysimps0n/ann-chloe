const SCROLL_DURATION_MS = 900

let scrollAnimationId = 0
let restoreScrollBehavior = null

// 페이지 안 앵커(#info, #style-finder 같은)를 눌렀을 때
// 브라우저 기본 점프 대신 여러 프레임에 걸쳐 이동합니다.
export function handleHashLinkClick(event) {
  const href = event.currentTarget.getAttribute('href')
  const isInPageSection = href?.startsWith('#') && href.length > 1
  if (!isInPageSection) return

  const section = document.querySelector(href)
  if (!section) return

  // 기본 해시 이동은 한 프레임에 도착합니다. 반드시 먼저 막습니다.
  event.preventDefault()
  scrollToSection(section, href)
}

function scrollToSection(section, href) {
  const headerGap = getScrollPaddingTop()
  const destinationY = Math.max(
    0,
    section.getBoundingClientRect().top + window.scrollY - headerGap,
  )

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReducedMotion) {
    window.scrollTo(0, destinationY)
    history.pushState(null, '', href)
    return
  }

  animateWindowScroll(destinationY, href)
}

function getScrollPaddingTop() {
  const padding = getComputedStyle(document.documentElement).scrollPaddingTop
  const value = Number.parseFloat(padding)
  return Number.isFinite(value) ? value : 0
}

function animateWindowScroll(destinationY, href) {
  const startY = window.scrollY
  const distance = destinationY - startY
  const startTime = performance.now()

  cancelAnimationFrame(scrollAnimationId)
  lockCssSmoothScroll()

  function tick(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1)
    const nextY = startY + distance * easeInOutCubic(progress)

    // 두 인자 형태는 CSS scroll-behavior 의 영향을 덜 받습니다.
    window.scrollTo(0, nextY)

    if (progress < 1) {
      scrollAnimationId = requestAnimationFrame(tick)
      return
    }

    unlockCssSmoothScroll()
    // 애니메이션이 끝난 뒤에 해시를 넣습니다.
    // 중간에 pushState 하면 브라우저가 그 위치로 바로 점프할 수 있습니다.
    history.pushState(null, '', href)
  }

  scrollAnimationId = requestAnimationFrame(tick)
}

function lockCssSmoothScroll() {
  if (restoreScrollBehavior) return

  const html = document.documentElement
  const previousInline = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  restoreScrollBehavior = () => {
    html.style.scrollBehavior = previousInline
    restoreScrollBehavior = null
  }
}

function unlockCssSmoothScroll() {
  restoreScrollBehavior?.()
}

function easeInOutCubic(progress) {
  if (progress < 0.5) {
    return 4 * progress * progress * progress
  }

  return 1 - Math.pow(-2 * progress + 2, 3) / 2
}
