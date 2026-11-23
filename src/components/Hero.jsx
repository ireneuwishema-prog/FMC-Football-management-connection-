import { ArrowRight, Globe2, MessageCircle, Search } from 'lucide-react'
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
            <div className="avatar-stack">
              <img src="https://i.pravatar.cc/80?img=12" alt="" /><img src="https://i.pravatar.cc/80?img=33" alt="" /><img src="https://i.pravatar.cc/80?img=47" alt="" />
            </div>
            <div><strong>16,000+</strong><span>Football people connected</span></div>
          </div>
        </div>
        <div className="hero-stats">
          <div><Globe2 size={17} /><strong>84</strong><span>Countries</span></div>
          <div><MessageCircle size={17} /><strong>2.4K</strong><span>Weekly connections</span></div>
        </div>
      </div>
    </section>
  )
}
