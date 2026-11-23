import { ArrowUpRight, MapPin } from 'lucide-react'
import { clubData } from '../data/sampleData'

export default function ClubRecruitment() {
  return (
    <section className="section club-section">
      <div className="container">
        <div className="section-heading">
          <div><span className="kicker">CLUB RECRUITMENT</span><h2>Find the right club.<br />Find the right player.</h2></div>
          <a className="text-link" href="/clubs">Explore all clubs <ArrowUpRight size={17} /></a>
        </div>
        <div className="club-grid">
          {clubData.map((club) => (
            <article className="club-card" key={club.name}>
              <div className="club-logo" style={{ '--club-color': club.color }}><span>{club.initials}</span></div>
              <div className="club-info"><h3>{club.name}</h3><span><MapPin size={14} /> {club.country}</span><p>{club.league}</p></div>
              <button aria-label={`View ${club.name}`} onClick={() => window.location.assign('/clubs')}><ArrowUpRight size={18} /></button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
