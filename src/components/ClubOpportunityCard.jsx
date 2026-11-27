import { useState } from 'react'
import { CalendarDays, ChevronDown, ChevronUp, MapPin, Pencil, UsersRound } from 'lucide-react'

export default function ClubOpportunityCard({ opportunity, applicationCount, onEdit, onToggleStatus }) {
  const [detailsOpen, setDetailsOpen] = useState(false)
  const isActive = opportunity.status === 'Active'

  return (
    <article className={`club-opportunity-card${isActive ? '' : ' is-closed'}`}>
      <div className="club-opportunity-card-top">
        <span className={`club-status-pill ${isActive ? 'is-active' : 'is-closed'}`}>{opportunity.status}</span>
        <span className="club-opportunity-applications"><UsersRound size={14} />{applicationCount} applications</span>
      </div>
      <h3>{opportunity.title}</h3>
      <p className="club-opportunity-position">{opportunity.position} <span>·</span> Ages {opportunity.ageRange}</p>
      <div className="club-opportunity-meta">
        <span><MapPin size={14} />{opportunity.location}</span>
        <span><CalendarDays size={14} />Closes {opportunity.deadline}</span>
      </div>
      <p className="club-opportunity-competition">{opportunity.competition}</p>
      <div className="club-opportunity-actions">
        <button type="button" className="club-dashboard-text-button" onClick={() => setDetailsOpen(open => !open)}>
          {detailsOpen ? 'Hide details' : 'View details'} {detailsOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>
        <button type="button" className="club-dashboard-icon-button" onClick={onEdit} aria-label={`Edit ${opportunity.title}`}><Pencil size={15} /></button>
        <button type="button" className={isActive ? 'club-opportunity-close-button' : 'club-opportunity-reopen-button'} onClick={onToggleStatus}>
          {isActive ? 'Close opportunity' : 'Reopen'}
        </button>
      </div>
      {detailsOpen && (
        <div className="club-opportunity-details">
          <p>{opportunity.description}</p>
          <strong>Requirements</strong>
          <ul>{opportunity.requirements.map((requirement, index) => <li key={`${opportunity.id}-requirement-${index}`}>{requirement}</li>)}</ul>
        </div>
      )}
    </article>
  )
}
