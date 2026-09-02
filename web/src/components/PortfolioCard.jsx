import ImagePlaceholder from './ImagePlaceholder'

function PortfolioCard({ item, onOpen }) {
  return (
    <button
      type="button"
      className="portfolio-card"
      onClick={(event) => onOpen(item, event.currentTarget)}
      aria-haspopup="dialog"
    >
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
      <span className="portfolio-card-cta">자세히</span>
    </button>
  )
}

export default PortfolioCard
