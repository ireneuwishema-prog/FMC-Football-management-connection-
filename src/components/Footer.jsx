import { Instagram, Linkedin, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div><Link className="brand footer-brand" to="/"><span className="brand-mark"><span>F</span></span><span className="brand-copy"><strong>FMC</strong><small>FOOTBALL CONNECTION</small></span></Link><p>Connecting talent, opportunity and people across the global game.</p></div>
        <div><h4>Platform</h4><Link to="/discover">Discover Players</Link><Link to="/clubs">Football Clubs</Link><Link to="/professionals">Professionals</Link><Link to="/community">Community</Link></div>
        <div><h4>Company</h4><a href="#about">About FMC</a><a href="mailto:hello@fmc.global">Contact</a><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a></div>
        <div><h4>Follow FMC</h4><div className="socials"><a href="#twitter" aria-label="Twitter"><Twitter size={17} /></a><a href="#instagram" aria-label="Instagram"><Instagram size={17} /></a><a href="#linkedin" aria-label="LinkedIn"><Linkedin size={17} /></a></div></div>
      </div>
      <div className="container footer-bottom"><span>© 2026 FMC. All rights reserved.</span><span>Built for the global game.</span></div>
    </footer>
  )
}
