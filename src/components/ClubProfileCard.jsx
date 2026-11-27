import { ArrowUpRight, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import ClubLogo from './ClubLogo'

export default function ClubProfileCard({ club }) {
  return (
    <article className="discovery-club-card">
      <div className="discovery-club-top">
        <ClubLogo club={club} />
        <span className="club-category-tag">{club.category}</span>
      </div>
      <div className="discovery-club-heading">
        <h3>{club.name}</h3>
        <span className="club-founded">EST. {club.founded}</span>
      </div>
      <div className="discovery-club-meta">
        <span><MapPin size={14} /> {club.country}</span>
        <span>{club.league}</span>
      </div>
      <p>{club.description}</p>
      <Link className="club-view-link" to={`/clubs/${club.id}`}>View Club <ArrowUpRight size={17} /></Link>
    </article>
  )
}
