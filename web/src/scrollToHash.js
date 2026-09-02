const SCROLL_DURATION_MS = 900
const SCROLLING_CLASS = 'is-animating-page-scroll'

let scrollAnimationId = 0

// 페이지 어디의 #섹션 링크든 한 곳에서 처리합니다.
// 링크마다 onClick을 붙이지 않아도 됩니다.
export function bindHashLinkClicks() {
  document.addEventListener('click', handleDocumentClick, true)
}

function handleDocumentClick(event) {
  if (event.defaultPrevented) return
  if (event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

  const link = event.target.closest('a[href^="#"]')
  if (!link) return

  const href = link.getAttribute('href')
  const isInPageSection = href && href.length > 1
  if (!isInPageSection) return

  const section = document.querySelector(href)
  if (!section) return

  // 브라우저 기본 해시 이동은 한 번에 점프합니다.
  event.preventDefault()
  scrollToSection(section, href)
}

function scrollToSection(section, href) {
  const headerGap = getScrollPaddingTop()
  const destinationY = Math.max(
    0,
    section.getBoundingClientRect().top + getScrollY() - headerGap,
  )

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (prefersReducedMotion) {
    setScrollY(destinationY)
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
  const startY = getScrollY()
  const distance = destinationY - startY
  const startTime = performance.now()

  cancelAnimationFrame(scrollAnimationId)
  document.documentElement.classList.add(SCROLLING_CLASS)

  function tick(now) {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / SCROLL_DURATION_MS, 1)
    const nextY = startY + distance * easeOutCubic(progress)

    // CSS scroll-behavior를 타지 않도록 스크롤 위치를 직접 넣습니다.
    setScrollY(nextY)

    if (progress < 1) {
      scrollAnimationId = requestAnimationFrame(tick)
      return
    }

    document.documentElement.classList.remove(SCROLLING_CLASS)
    history.pushState(null, '', href)
  }

  scrollAnimationId = requestAnimationFrame(tick)
}

function getScrollY() {
  return window.scrollY || document.documentElement.scrollTop || 0
}

function setScrollY(y) {
  document.documentElement.scrollTop = y
  document.body.scrollTop = y
}

function easeOutCubic(progress) {
  return 1 - Math.pow(1 - progress, 3)
}
