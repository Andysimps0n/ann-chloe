import ImagePlaceholder from './ImagePlaceholder'

function PortfolioCard({ item, onOpen }) {
  function openDetail(event) {
    onOpen(item, event.currentTarget)
  }

  return (
    <article className="portfolio-card">
      <div className="portfolio-card-media">
        <ImagePlaceholder
          className="portfolio-card-photo"
          src={item.imageSrc}
          alt={`${item.styleName} 시술 결과`}
          label={item.styleName}
        />
      </div>
      <div className="portfolio-card-info">
        <span className="portfolio-card-category">{item.category}</span>
        <span className="portfolio-card-style">{item.styleName}</span>
        <span className="portfolio-card-designer">{item.designer}</span>
        <span className="portfolio-card-description">{item.description}</span>
      </div>
      <div className="portfolio-card-cta">
        <button
          type="button"
          className="portfolio-card-cta-button"
          onClick={openDetail}
          aria-haspopup="dialog"
        >
          자세히
        </button>
      </div>
    </article>
  )
}

export default PortfolioCard
