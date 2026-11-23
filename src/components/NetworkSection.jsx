import { ArrowRight, BriefcaseBusiness, Handshake, Radar } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function NetworkSection() {
  return (
    <section className="network-section">
      <div className="container network-grid">
        <div className="network-image">
          <img src="https://images.unsplash.com/photo-1553778263-73a83bab9b0c?auto=format&fit=crop&w=1400&q=85" alt="Football professionals at a stadium" />
          <div className="network-badge"><strong>2,400+</strong><span>professionals online</span></div>
        </div>
        <div className="network-content">
          <span className="kicker">PROFESSIONAL NETWORK</span>
          <h2>One network.<br />Endless possibilities.</h2>
          <p>Build meaningful relationships across coaching, recruitment, representation and football operations.</p>
          <div className="network-list">
            <div><Radar /><span><strong>Discover opportunities</strong><small>Find roles, projects and partnerships worldwide.</small></span></div>
            <div><Handshake /><span><strong>Collaborate professionally</strong><small>Connect with trusted people across the industry.</small></span></div>
            <div><BriefcaseBusiness /><span><strong>Grow your reputation</strong><small>Share achievements and build a professional presence.</small></span></div>
          </div>
          <Link className="text-link light" to="/professionals">Explore the network <ArrowRight size={17} /></Link>
        </div>
      </div>
    </section>
  )
}
