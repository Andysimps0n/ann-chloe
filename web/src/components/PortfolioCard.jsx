import ImagePlaceholder from './ImagePlaceholder'

function PortfolioCard({ item }) {
  return (
    <article className="portfolio-card">
      <ImagePlaceholder
        className="portfolio-card-photo"
        src={item.imageSrc}
        alt={`${item.styleName} 시술 결과`}
        label={item.styleName}
      />
      <div className="portfolio-card-info">
        <span className="portfolio-card-category">{item.category}</span>
        <h3 className="portfolio-card-style">{item.styleName}</h3>
        <p className="portfolio-card-designer">{item.designer}</p>
        <p className="portfolio-card-description">{item.description}</p>
      </div>
    </article>
  )
}

export default PortfolioCard
