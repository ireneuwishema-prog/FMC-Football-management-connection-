import { Link, NavLink } from 'react-router-dom'
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
        <nav id="primary-navigation" className={open ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
          {links.map(([label, path]) => <NavLink key={path} to={path} end={path === '/'} onClick={() => setOpen(false)}>{label}</NavLink>)}
        </nav>
        <div className="nav-actions">
          <Link className="login-link" to="/login">Login</Link>
          <Link className="button button-small" to="/register">Join FMC <ArrowUpRight size={16} /></Link>
        </div>
        <button className="menu-button" type="button" onClick={() => setOpen(value => !value)} aria-label="Toggle navigation menu" aria-expanded={open} aria-controls="primary-navigation">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  )
}
