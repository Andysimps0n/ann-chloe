import { salon, bookingLinkProps } from '../data/salon'
import ImagePlaceholder from './ImagePlaceholder'
import Icon from './Icon'

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="container hero-inner">
        <div>
          <p className="eyebrow">Premium Hair Salon</p>
          <h1 className="hero-title">{salon.tagline}</h1>
          <p className="hero-description">{salon.brandMessage}</p>

          <div className="hero-actions">
            <a {...bookingLinkProps} className="button button-primary">
              <Icon name="calendar-icon" />
              예약하기
            </a>
            <a href="#portfolio" className="button button-ghost button-scroll-down">
              시술 스타일 보러 가기
              <Icon name="arrow-down-icon" />
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
