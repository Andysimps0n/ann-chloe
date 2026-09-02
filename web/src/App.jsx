import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import SalonInfo from './components/SalonInfo'
import StyleFinder from './components/StyleFinder'
import PortfolioSection from './components/PortfolioSection'
import DesignerMenusPage from './components/DesignerMenusPage'
import Footer from './components/Footer'
import { portfolioItems } from './data/portfolio'
import { emptyStyleFilters, filterPortfolioItems } from './data/styleFilters'
import { scrollToHashIfPresent } from './scrollToHash'

const MENUS_PAGE_PATH = '/menus'

function isMenusPage() {
  return window.location.pathname.replace(/\/$/, '') === MENUS_PAGE_PATH
}

function HomePage() {
  const [styleFilters, setStyleFilters] = useState(emptyStyleFilters)
  const filteredPortfolioItems = useMemo(
    () => filterPortfolioItems(portfolioItems, styleFilters),
    [styleFilters],
  )

  useEffect(() => {
    scrollToHashIfPresent()
  }, [])

  return (
    <>
      <Hero />
      {/* <SalonInfo /> */}
      {/* <StyleFinder
        filters={styleFilters}
        onChange={setStyleFilters}
        matchCount={filteredPortfolioItems.length}
      /> */}
      <PortfolioSection items={filteredPortfolioItems} />
    </>
  )
}

function App() {
  const showMenusPage = isMenusPage()

  return (
    <>
      <Header />
      <main>{showMenusPage ? <DesignerMenusPage /> : <HomePage />}</main>
      <Footer />
    </>
  )
}

export default App
