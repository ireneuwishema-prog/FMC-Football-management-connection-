import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><Link className="brand footer-brand" to="/"><span className="brand-mark"><span>F</span></span><span className="brand-copy"><strong>FMC</strong><small>FOOTBALL CONNECTION</small></span></Link><p>Connecting talent, opportunity and people across the global game.</p></div>
        <div><h4>Platform</h4><Link to="/discover">Discover Players</Link><Link to="/clubs">Football Clubs</Link><Link to="/professionals">Professionals</Link><Link to="/community">Community</Link></div>
        <div><h4>Company</h4><a href="#about">About FMC</a><a href="mailto:hello@fmc.global">Contact</a><Link to="/privacy">Privacy Policy</Link><Link to="/terms">Terms of Service</Link></div>
        <div><h4>Follow the game</h4><div className="socials"><a href="https://x.com/" target="_blank" rel="noreferrer" aria-label="Visit X">X</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Visit Instagram">IG</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="Visit LinkedIn">in</a></div></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 FMC. All rights reserved.</span><span>Built for the global game.</span></div>
    </footer>
  )
}
