import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function PlayerProfileCard({ player, featured = false }) {
  return (
    <article className="discover-player-card">
      <Link className="discover-player-image" to={`/discover/${player.id}`} aria-label={`View ${player.name}'s profile`}>
        <img src={player.image} alt={`${player.name}, ${player.position}`} loading="lazy" />
        {featured && <span className="featured-ribbon">FEATURED</span>}
        <span className="player-age">{player.age} years</span>
      </Link>
      <div className="discover-player-body">
        <div className="discover-player-heading">
          <div>
            <span className="discover-position">{player.position}</span>
            <h3>{player.name}</h3>
          </div>
          <span className="foot-badge">{player.preferredFoot} foot</span>
        </div>
        <div className="discover-player-meta"><MapPin size={14} /> {player.nationality}</div>
        <p className="discover-player-club">{player.club}</p>
        <p className="discover-player-description">{player.description}</p>
        <Link className="discover-profile-link" to={`/discover/${player.id}`}>
          View Profile <ArrowUpRight size={17} />
        </Link>
      </div>
    </article>
  )
}
