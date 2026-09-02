import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import SalonInfo from './components/SalonInfo'
import PortfolioSection from './components/PortfolioSection'
import Footer from './components/Footer'

// 페이지 흐름: 브랜드(히어로) → 기본 정보 → 시술 포트폴리오 → 마지막 예약 CTA
function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SalonInfo />
        <PortfolioSection />
      </main>
      <Footer />
    </>
  )
}

export default App
