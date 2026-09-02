import { useCallback, useRef, useState } from 'react'
import PortfolioCard from './PortfolioCard'
import PortfolioStyleDialog from './PortfolioStyleDialog'
import Icon from './Icon'

const PREVIOUS_CARD = -1
const NEXT_CARD = 1

function PortfolioSection({ items }) {
  const trackRef = useRef(null)
  const lastOpenedCardRef = useRef(null)
  const [selectedItem, setSelectedItem] = useState(null)

  function openStyleDetail(item, cardButton) {
    lastOpenedCardRef.current = cardButton
    setSelectedItem(item)
  }

  const closeStyleDetail = useCallback(() => {
    setSelectedItem(null)
    lastOpenedCardRef.current?.focus()
  }, [])

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
              디자이너들의 실제 시술 결과입니다. 위에서 기장과 원하는 시술을
              고르면 맞는 스타일만 남습니다.
            </p>
            <a href="/menus" className="portfolio-view-all">
              전체보기
            </a>
          </div>

          {items.length > 1 && (
            <div className="portfolio-controls">
              <button
                type="button"
                className="carousel-button"
                aria-label="이전 스타일 보기"
                onClick={() => scrollByOneCard(PREVIOUS_CARD)}
              >
                <Icon name="chevron-left-icon" />
              </button>
              <button
                type="button"
                className="carousel-button"
                aria-label="다음 스타일 보기"
                onClick={() => scrollByOneCard(NEXT_CARD)}
              >
                <Icon name="chevron-right-icon" />
              </button>
            </div>
          )}
        </div>

        {items.length === 0 ? (
          <p className="portfolio-empty">
            선택한 조건에 맞는 스타일이 아직 없습니다. 기장이나 시술을 조금 넓혀
            다시 찾아 보세요.
          </p>
        ) : (
          <ul
            ref={trackRef}
            className="portfolio-track"
            tabIndex={0}
            aria-label="시술 스타일 목록"
          >
            {items.map((item) => (
              <li key={item.id}>
                <PortfolioCard item={item} onOpen={openStyleDetail} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedItem && (
        <PortfolioStyleDialog item={selectedItem} onClose={closeStyleDetail} />
      )}
    </section>
  )
}

export default PortfolioSection
