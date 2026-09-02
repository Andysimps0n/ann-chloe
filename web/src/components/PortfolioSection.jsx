import { useRef } from 'react'
import { portfolioItems } from '../data/portfolio'
import PortfolioCard from './PortfolioCard'

const PREVIOUS_CARD = -1
const NEXT_CARD = 1

function PortfolioSection() {
  const trackRef = useRef(null)

  // 카드 한 장 너비만큼 캐러셀을 좌우로 이동시킵니다.
  function scrollByOneCard(direction) {
    const track = trackRef.current
    if (!track) return

    const firstCard = track.querySelector('li')
    if (!firstCard) return

    const gap = parseFloat(getComputedStyle(track).columnGap) || 0
    const distance = (firstCard.offsetWidth + gap) * direction
    track.scrollBy({ left: distance, behavior: 'smooth' })
  }

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="portfolio-header">
          <div>
            <p className="eyebrow">Portfolio</p>
            <h2 className="section-title">앤끌로에가 만든 스타일</h2>
            <p className="section-description">
              디자이너들의 실제 시술 결과입니다. 마음에 드는 스타일을 찾았다면
              예약 후 그대로 보여 주세요.
            </p>
          </div>

          <div className="portfolio-controls">
            <button
              type="button"
              className="carousel-button"
              aria-label="이전 스타일 보기"
              onClick={() => scrollByOneCard(PREVIOUS_CARD)}
            >
              <svg className="icon" aria-hidden="true">
                <use href="/icons.svg#chevron-left-icon" />
              </svg>
            </button>
            <button
              type="button"
              className="carousel-button"
              aria-label="다음 스타일 보기"
              onClick={() => scrollByOneCard(NEXT_CARD)}
            >
              <svg className="icon" aria-hidden="true">
                <use href="/icons.svg#chevron-right-icon" />
              </svg>
            </button>
          </div>
        </div>

        {/* tabIndex로 포커스를 받을 수 있어 키보드 방향키로도 스크롤됩니다 */}
        <ul
          ref={trackRef}
          className="portfolio-track"
          tabIndex={0}
          aria-label="시술 스타일 목록"
        >
          {portfolioItems.map((item) => (
            <li key={item.id}>
              <PortfolioCard item={item} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default PortfolioSection
