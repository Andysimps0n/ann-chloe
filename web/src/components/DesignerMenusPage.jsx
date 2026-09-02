import { useEffect } from 'react'
import { designerMenuCatalog } from '../data/designerMenus'
import ImagePlaceholder from './ImagePlaceholder'

function DesignerMenusPage() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <section className="designer-menus-page">
      <div className="container">
        <a href="/#portfolio" className="portfolio-view-all">
          돌아가기
        </a>
        <h1 className="section-title">디자이너별 메뉴</h1>
        <p className="section-description">
          디자이너를 고른 뒤 시술 메뉴를 확인해 보세요. 프로필 사진은
          public/images/designers 폴더에 넣으면 자동으로 표시됩니다.
        </p>

        <div className="designer-menus-list">
          {designerMenuCatalog.map((group) => (
            <article
              key={group.bookingItemId}
              className="designer-menu-block"
              aria-labelledby={`${group.bookingItemId}-heading`}
            >
              <div className="designer-menu-profile">
                <ImagePlaceholder
                  className="designer-menu-photo"
                  src={group.photoSrc}
                  alt={`${group.designer} 프로필`}
                  label={group.designer}
                />
                <div>
                  <p className="designer-menu-role">{group.role}</p>
                  <h2 id={`${group.bookingItemId}-heading`} className="designer-menu-name">
                    {group.designer}
                  </h2>
                </div>
              </div>

              <ul className="designer-menu-items">
                {group.menus.map((menu) => (
                  <li key={menu.id} className="menu-catalog-item">
                    <span className="menu-catalog-category">{menu.category}</span>
                    <span className="menu-catalog-name">{menu.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DesignerMenusPage
