import { salon, bookingLinkProps } from '../data/salon'

function InfoCard({ iconId, title, children }) {
  return (
    <article className="info-card">
      <div className="info-card-icon">
        <svg className="icon" aria-hidden="true">
          <use href={`/icons.svg#${iconId}`} />
        </svg>
      </div>
      <h3 className="info-card-title">{title}</h3>
      <div className="info-card-body">{children}</div>
    </article>
  )
}

function SalonInfo() {
  return (
    <section id="info" className="salon-info">
      <div className="container">
        <p className="eyebrow">Information</p>
        <h2 className="section-title">방문 전에 확인해 주세요</h2>

        <div className="info-grid">
          <InfoCard iconId="location-icon" title="위치">
            <p>{salon.address.line1}</p>
            <p className="info-muted">{salon.address.line2}</p>
          </InfoCard>

          <InfoCard iconId="clock-icon" title="영업시간">
            {salon.openingHours.map((slot) => (
              <p key={slot.days} className="hours-row">
                <span className="info-muted">{slot.days}</span>
                <span>{slot.time}</span>
              </p>
            ))}
            <p className="info-muted">{salon.hoursNote}</p>
          </InfoCard>

          <InfoCard iconId="phone-icon" title="연락처">
            <p className="info-phone">{salon.phoneNumber}</p>
            <p className="info-muted">시술 중에는 전화 연결이 어려울 수 있어요.</p>
          </InfoCard>
        </div>

        <div className="booking-banner">
          <div>
            <h3 className="booking-banner-title">지금 바로 상담해 보세요</h3>
            <p className="booking-banner-description">
              원하는 스타일을 말씀해 주시면 꼭 맞는 디자이너를 연결해 드립니다.
            </p>
          </div>
          <a {...bookingLinkProps} className="button button-inverse">
            <svg className="icon" aria-hidden="true">
              <use href="/icons.svg#calendar-icon" />
            </svg>
            예약하기
          </a>
        </div>
      </div>
    </section>
  )
}

export default SalonInfo
