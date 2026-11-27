import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { clubData } from '../data/sampleData'

export default function ClubRecruitment() {
  return (
    <section className="section club-section">
      <div className="container">
        <div className="section-heading">
          <div><span className="kicker">CLUB RECRUITMENT</span><h2>Find the right club.<br />Find the right player.</h2></div>
          <Link className="text-link" to="/clubs">Explore all clubs <ArrowUpRight size={17} /></Link>
        </div>
        <div className="club-grid">
          {clubData.map((club) => (
            <article className="club-card" key={club.name}>
              <div className="club-logo" style={{ '--club-color': club.color }}><span>{club.initials}</span></div>
              <div className="club-info"><h3>{club.name}</h3><span><MapPin size={14} /> {club.country}</span><p>{club.league}</p></div>
              <Link aria-label={`View ${club.name}`} to="/clubs"><ArrowUpRight size={18} /></Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
