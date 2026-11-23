import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function PlaceholderPage({ title }) {
  return (
    <>
      <Navbar />
      <main className="placeholder-page">
        <div className="placeholder-card">
          <span className="kicker">FMC PLATFORM</span>
          <h1>{title}</h1>
          <p>This page is being prepared for the next stage of FMC.</p>
          <Link className="button button-dark" to="/"><ArrowLeft size={17} /> Back to Home</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
