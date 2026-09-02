import { salon } from '../data/salon'

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a href="#top" className="site-logo">
          {salon.name}
          <span className="site-logo-korean">{salon.koreanName}</span>
        </a>

        <nav className="site-nav" aria-label="주요 섹션">
          <a href="#info">매장 안내</a>
          <a href="#portfolio">시술 스타일</a>
        </nav>

        <a href={salon.bookingUrl} className="button button-primary button-small">
          예약하기
        </a>
      </div>
    </header>
  )
}

export default Header
