import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { getBookingLinkProps } from '../data/salon'
import ImagePlaceholder from './ImagePlaceholder'
import Icon from './Icon'

function PortfolioStyleDialog({ item, onClose }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function closeOnEscape(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [onClose])

  function closeIfBackdropClicked(event) {
    const clickedDimmedBackground = event.target === event.currentTarget
    if (clickedDimmedBackground) onClose()
  }

  const titleId = `${item.id}-dialog-title`

  return createPortal(
    <div className="style-dialog-backdrop" onClick={closeIfBackdropClicked}>
      <div
        className="style-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className="style-dialog-close"
          aria-label="닫기"
          onClick={onClose}
        >
          <Icon name="close-icon" />
        </button>

        <ImagePlaceholder
          className="style-dialog-photo"
          src={item.imageSrc}
          alt={`${item.styleName} 시술 결과`}
          label={item.styleName}
        />

        <div className="style-dialog-body">
          <span className="portfolio-card-category">{item.category}</span>
          <h2 id={titleId} className="style-dialog-title">
            {item.styleName}
          </h2>
          <p className="style-dialog-designer">{item.designer}</p>
          <p className="style-dialog-description">{item.description}</p>

          <section className="style-dialog-section" aria-labelledby={`${item.id}-recommend`}>
            <h3 id={`${item.id}-recommend`} className="style-dialog-heading">
              {item.designer} 추천
            </h3>
            <p className="style-dialog-hint">이런 분께 잘 어울려요</p>
            <ul className="style-chip-list">
              {item.recommendedFor.map((audience) => (
                <li key={audience} className="style-chip">
                  {audience}
                </li>
              ))}
            </ul>
          </section>

          <section className="style-dialog-section" aria-labelledby={`${item.id}-time`}>
            <h3 id={`${item.id}-time`} className="style-dialog-heading">
              예상 시술 시간
            </h3>
            <p className="style-dialog-time">
              <Icon name="clock-icon" />
              {item.estimatedTime}
            </p>
          </section>

          <section className="style-dialog-section" aria-labelledby={`${item.id}-includes`}>
            <h3 id={`${item.id}-includes`} className="style-dialog-heading">
              포함된 시술
            </h3>
            <ul className="style-chip-list">
              {item.includes.map((service) => (
                <li key={service} className="style-chip style-chip-outline">
                  {service}
                </li>
              ))}
            </ul>
          </section>

          <a
            {...getBookingLinkProps(item)}
            className="button button-primary button-large style-dialog-booking"
          >
            <Icon name="calendar-icon" />
            예약하기
          </a>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export default PortfolioStyleDialog
