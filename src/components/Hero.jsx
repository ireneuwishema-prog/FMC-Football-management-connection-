import { ArrowRight, Search } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid container">
        <div className="hero-content">
          <div className="eyebrow"><span /> THE GLOBAL FOOTBALL NETWORK</div>
          <h1>Connect With The World<br />Of <em>Football.</em></h1>
          <p>Discover talent. Find opportunities. Build connections. FMC brings players, clubs, football professionals and fans together on one global platform.</p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/register">Join FMC <ArrowRight size={18} /></Link>
            <Link className="button button-ghost" to="/discover"><Search size={18} /> Explore Football</Link>
          </div>
          <div className="trust-row">
            <span className="trust-mark"><span /></span>
            <div><strong>One game. Every role.</strong><span>From the touchline to the stands</span></div>
          </div>
        </div>
        <div className="hero-note">
          <span className="hero-note-line" />
          <span>THE GAME IS BETTER<br />WHEN WE CONNECT.</span>
        </div>
      </div>
    </section>
  )
}
