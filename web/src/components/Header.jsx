import { salon, bookingLinkProps } from '../data/salon'
import NoticeMenu from './NoticeMenu'

function Header() {
  const isMenusPage = window.location.pathname.replace(/\/$/, '') === '/menus'
  const logoHref = isMenusPage ? '/' : '#top'
  const sectionHref = (sectionId) => (isMenusPage ? `/#${sectionId}` : `#${sectionId}`)

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a href={logoHref} className="site-logo">
          <span className="site-logo-name">{salon.name}</span>
          <span className="site-logo-tagline">Beauty People</span>
        </a>

        <nav className="site-nav" aria-label="주요 섹션">
          <a href={sectionHref('info')}>매장 안내</a>
          <a href={sectionHref('style-finder')}>스타일 찾기</a>
          <a href={sectionHref('portfolio')}>시술 스타일</a>
        </nav>

        <div className="header-actions">
          <NoticeMenu />
          <a {...bookingLinkProps} className="button button-primary button-small">
            예약하기
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
