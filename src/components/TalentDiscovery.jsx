import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { playerData } from '../data/sampleData'

export default function TalentDiscovery() {
  return (
    <section className="section talent-section">
      <div className="container">
        <div className="section-heading">
          <div><span className="kicker">TALENT DISCOVERY</span><h2>Next-generation talent,<br />ready to be seen.</h2></div>
          <Link className="text-link" to="/discover">Explore all players <ArrowUpRight size={17} /></Link>
        </div>
        <div className="player-grid">
          {playerData.map((player) => (
            <article className="player-card" key={player.name}>
              <div className="player-image">
                <img src={player.image} alt={player.name} />
                <span className="available"><i /> {player.status}</span>
              </div>
              <div className="player-body">
                <span className="position">{player.position}</span>
                <h3>{player.name}</h3>
                <div className="player-meta"><span>{player.age} yrs</span><span><MapPin size={13} /> {player.country}</span></div>
                <p>{player.club}</p>
                <Link className="profile-button" to="/discover">View Profile <ArrowUpRight size={16} /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
