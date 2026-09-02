import { salon } from '../data/salon'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-cta">
        <p className="eyebrow">Reservation</p>
        <h2 className="section-title">이제 직접 경험해 보세요</h2>
        <p className="section-description">
          원하는 스타일이 있다면 지금 예약하고 편하게 상담받아 보세요.
        </p>
        <a href={salon.bookingUrl} className="button button-primary button-large">
          <svg className="icon" aria-hidden="true">
            <use href="/icons.svg#calendar-icon" />
          </svg>
          예약하기
        </a>
      </div>

      <div className="footer-meta">
        <div className="container footer-meta-inner">
          <p className="footer-brand">
            {salon.name} {salon.koreanName}
          </p>
          <p>{salon.address.line1}</p>
          <p>{salon.phoneNumber}</p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} {salon.name} Hair. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
