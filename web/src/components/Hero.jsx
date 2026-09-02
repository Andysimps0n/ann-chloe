import { salon } from '../data/salon'
import ImagePlaceholder from './ImagePlaceholder'

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div>
          <p className="eyebrow">Premium Hair Salon</p>
          <h1 className="hero-title">{salon.tagline}</h1>
          <p className="hero-description">{salon.brandMessage}</p>

          <div className="hero-actions">
            <a href={salon.bookingUrl} className="button button-primary">
              <svg className="icon" aria-hidden="true">
                <use href="/icons.svg#calendar-icon" />
              </svg>
              예약하기
            </a>
            <a href="#portfolio" className="button button-ghost">
              시술 스타일 보러 가기
              <svg className="icon" aria-hidden="true">
                <use href="/icons.svg#arrow-down-icon" />
              </svg>
            </a>
          </div>
        </div>

        <ImagePlaceholder
          className="hero-photo"
          src={salon.photos.hero.src}
          alt={`${salon.koreanName} ${salon.photos.hero.label}`}
          label={salon.photos.hero.label}
        />
      </div>

      <div className="container hero-gallery">
        {salon.photos.interior.map((photo) => (
          <ImagePlaceholder
            key={photo.src}
            className="hero-gallery-photo"
            src={photo.src}
            alt={`${salon.koreanName} ${photo.label}`}
            label={photo.label}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
