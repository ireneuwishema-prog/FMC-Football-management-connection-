import { Link } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const links = [
    ['Home', '/'], ['Discover Players', '/discover'], ['Clubs', '/clubs'],
    ['Professionals', '/professionals'], ['Community', '/community']
  ]

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link className="brand" to="/" aria-label="FMC home">
          <span className="brand-mark"><span>F</span></span>
          <span className="brand-copy"><strong>FMC</strong><small>FOOTBALL CONNECTION</small></span>
        </Link>
        <nav className={open ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {links.map(([label, path]) => <Link key={path} to={path} onClick={() => setOpen(false)}>{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link className="login-link" to="/login">Login</Link>
          <Link className="button button-small" to="/register">Join FMC <ArrowUpRight size={16} /></Link>
        </div>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
