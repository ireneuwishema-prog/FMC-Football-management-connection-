import { Bookmark, BookmarkCheck, CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import ClubLogo from './ClubLogo'

export default function DashboardOpportunityCard({ opportunity, club, saved, applicationStatus, onToggleSave, onApply }) {
  return (
    <article className="dashboard-opportunity-card">
      <header className="dashboard-opportunity-heading">
        <div className="dashboard-opportunity-club"><ClubLogo club={club} size="small" /><span>{club.name}</span></div>
        <span className={`dashboard-opportunity-status ${applicationStatus ? 'has-application' : 'is-open'}`}>{applicationStatus || 'Open'}</span>
      </header>
      <h3>{opportunity.title}</h3>
      <div className="dashboard-opportunity-meta">
        <span>{opportunity.position}</span>
        <span><MapPin size={13} />{club.country}</span>
        <span><CalendarDays size={13} />Closes {opportunity.deadline}</span>
      </div>
      <p>{opportunity.description}</p>
      <div className="dashboard-opportunity-actions">
        <button type="button" className="dashboard-opportunity-save" onClick={() => onToggleSave(opportunity.id)} aria-pressed={saved} aria-label={`${saved ? 'Remove saved' : 'Save'} ${opportunity.title}`}>
          {saved ? <BookmarkCheck size={15} /> : <Bookmark size={15} />}{saved ? 'Saved' : 'Save'}
        </button>
        <button type="button" className="dashboard-opportunity-apply" onClick={() => onApply(opportunity)}>{applicationStatus ? 'Apply again (demo)' : 'Apply (demo)'}</button>
        <Link to={`/opportunities/${opportunity.id}`}>Details</Link>
      </div>
    </article>
  )
}
