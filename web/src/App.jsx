import { useMemo, useState } from 'react'
import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import SalonInfo from './components/SalonInfo'
import StyleFinder from './components/StyleFinder'
import PortfolioSection from './components/PortfolioSection'
import Footer from './components/Footer'
import { portfolioItems } from './data/portfolio'
import { emptyStyleFilters, filterPortfolioItems } from './data/styleFilters'

// 페이지 흐름: 브랜드 → 기본 정보 → 스타일 찾기 → 시술 포트폴리오 → 예약 CTA
function App() {
  const [styleFilters, setStyleFilters] = useState(emptyStyleFilters)
  const filteredPortfolioItems = useMemo(
    () => filterPortfolioItems(portfolioItems, styleFilters),
    [styleFilters],
  )

  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <SalonInfo />
        <StyleFinder
          filters={styleFilters}
          onChange={setStyleFilters}
          matchCount={filteredPortfolioItems.length}
        /> */}
        <PortfolioSection items={filteredPortfolioItems} />
      </main>
      <Footer />
    </>
  )
}

export default App
