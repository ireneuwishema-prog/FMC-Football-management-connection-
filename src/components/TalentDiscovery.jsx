import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import playerProfiles from '../data/playerProfiles'

export default function TalentDiscovery() {
  return (
    <section className="section talent-section">
      <div className="container">
        <div className="section-heading">
          <div><span className="kicker">TALENT DISCOVERY</span><h2>Next-generation talent,<br />ready to be seen.</h2></div>
          <Link className="text-link" to="/discover">Explore all players <ArrowUpRight size={17} /></Link>
        </div>
        <div className="player-grid">
          {playerProfiles.slice(0, 4).map(player => (
            <article className="player-card" key={player.id}>
              <div className="player-image">
                <img src={player.image} alt={`${player.name}, ${player.position}`} loading="lazy" />
                <span className="available"><i /> SAMPLE PROFILE</span>
              </div>
              <div className="player-body">
                <span className="position">{player.position}</span>
                <h3>{player.name}</h3>
                <div className="player-meta"><span>{player.age} yrs</span><span><MapPin size={13} /> {player.nationality}</span></div>
                <p>{player.club}</p>
                <Link className="profile-button" to={`/discover/${player.id}`}>View Profile <ArrowUpRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
