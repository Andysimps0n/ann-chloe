import ImagePlaceholder from './ImagePlaceholder'

function PortfolioCard({ item, onOpen }) {
  return (
    <button
      type="button"
      className="portfolio-card"
      onClick={(event) => onOpen(item, event.currentTarget)}
      aria-haspopup="dialog"
    >
      <ImagePlaceholder
        className="portfolio-card-photo"
        src={item.imageSrc}
        alt={`${item.styleName} 시술 결과`}
        label={item.styleName}
      />
      <div className="portfolio-card-info">
        <span className="portfolio-card-category">{item.category}</span>
        <span className="portfolio-card-style">{item.styleName}</span>
        <span className="portfolio-card-designer">{item.designer}</span>
        <span className="portfolio-card-description">{item.description}</span>
      </div>
    </button>
  )
}

export default PortfolioCard
