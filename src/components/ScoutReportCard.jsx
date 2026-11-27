import { useState } from 'react'
import { Eye, Pencil, Star, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

function overallRating(ratings) {
  const values = Object.values(ratings)
  return values.length ? (values.reduce((total, rating) => total + rating, 0) / values.length).toFixed(1) : '—'
}

export default function ScoutReportCard({ report, onEdit, onDelete }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <article className="scout-report-card">
      <div className="scout-report-card-main">
        <div className="scout-report-heading">
          <div>
            <Link to={`/discover/${report.playerId}`}>{report.playerName}</Link>
            <span>{report.position} · Age {report.age} · {report.currentClub}</span>
          </div>
          <span className={`scout-recommendation-pill recommendation-${report.recommendation.toLowerCase().replace(/\s+/g, '-')}`}>{report.recommendation}</span>
        </div>
        <div className="scout-report-meta"><span>{report.competition}</span><span>Observed {report.observedOn}</span><span><Star size={13} fill="currentColor" />{overallRating(report.ratings)} / 5</span></div>
        <div className="scout-report-card-actions">
          <button type="button" className="scout-dashboard-text-button" onClick={() => setExpanded(open => !open)}><Eye size={14} />{expanded ? 'Hide report' : 'View report'}</button>
          <button type="button" className="scout-dashboard-icon-button" onClick={onEdit} aria-label={`Edit report for ${report.playerName}`}><Pencil size={14} /></button>
          <button type="button" className="scout-dashboard-icon-button scout-report-delete" onClick={onDelete} aria-label={`Delete report for ${report.playerName}`}><Trash2 size={14} /></button>
        </div>
      </div>
      {expanded && (
        <div className="scout-report-details">
          <div className="scout-report-ratings">
            {Object.entries(report.ratings).map(([key, value]) => <span key={key}><strong>{key === 'decisionMaking' ? 'Decision-making' : key === 'positionSkill' ? 'Position skills' : key[0].toUpperCase() + key.slice(1)}</strong><i>{value}/5</i></span>)}
          </div>
          <div className="scout-report-observations">
            <div><strong>Strengths</strong><p>{report.strengths}</p></div>
            <div><strong>Areas for improvement</strong><p>{report.areasForImprovement}</p></div>
            {report.notes && <div><strong>Additional notes</strong><p>{report.notes}</p></div>}
          </div>
          <small className="scout-report-disclaimer">Subjective scout assessment for demonstration; not independently verified.</small>
        </div>
      )}
    </article>
  )
}
