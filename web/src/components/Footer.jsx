import { salon, bookingLinkProps } from '../data/salon'
import Icon from './Icon'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-cta">
        <p className="eyebrow">Reservation</p>
        <h2 className="section-title">이제 직접 경험해 보세요</h2>
        <p className="section-description">
          원하는 스타일이 있다면 지금 예약하고 편하게 상담받아 보세요.
        </p>
        <a {...bookingLinkProps} className="button button-primary button-large">
          <Icon name="calendar-icon" />
          예약하기
        </a>
      </div>

      <div className="footer-meta">
        <div className="container footer-meta-inner">
          <p className="footer-brand">
            <img src="/icon.png" alt={`${salon.name} ${salon.koreanName}`} />
          </p>
          <p>
            <a href={salon.mapsUrl} target="_blank" rel="noopener noreferrer">
              {salon.address.line1}
            </a>{' '}
            {salon.address.line2}
          </p>
          <p>
            <a href={salon.phoneHref}>{salon.phoneNumber}</a>
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} {salon.name} Hair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
