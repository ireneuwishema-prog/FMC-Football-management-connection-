import { ArrowUpRight, CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import ClubLogo from './ClubLogo'

export default function OpportunityCard({ opportunity, club }) {
  return (
    <article className="opportunity-card">
      <div className="opportunity-card-top">
        <div className="opportunity-club-identity">
          <ClubLogo club={club} size="small" />
          <span>{club.name}</span>
        </div>
        <span className="opportunity-type">RECRUITMENT</span>
      </div>
      <h3>{opportunity.title}</h3>
      <div className="opportunity-facts">
        <span>{opportunity.position}</span>
        <span><MapPin size={13} /> {club.country}</span>
      </div>
      <p>{opportunity.description}</p>
      <div className="opportunity-requirement-preview">
        <strong>Key requirements</strong>
        <span>{opportunity.requirements[0]}</span>
      </div>
      <div className="opportunity-card-bottom">
        <span><CalendarDays size={14} /> Closes {opportunity.deadline}</span>
        <Link to={`/opportunities/${opportunity.id}`} aria-label={`View opportunity: ${opportunity.title}`}>
          View Opportunity <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  )
}
