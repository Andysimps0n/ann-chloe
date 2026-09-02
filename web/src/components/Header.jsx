import { salon, bookingLinkProps } from '../data/salon'
import { handleHashLinkClick } from '../scrollToHash'
import NoticeMenu from './NoticeMenu'

function Header() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <a href="#top" className="site-logo" onClick={handleHashLinkClick}>
          <span className="site-logo-name">{salon.name}</span>
          <span className="site-logo-tagline">Beauty People</span>
        </a>

        <nav className="site-nav" aria-label="주요 섹션">
          <a href="#info" onClick={handleHashLinkClick}>
            매장 안내
          </a>
          <a href="#style-finder" onClick={handleHashLinkClick}>
            스타일 찾기
          </a>
          <a href="#portfolio" onClick={handleHashLinkClick}>
            시술 스타일
          </a>
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
