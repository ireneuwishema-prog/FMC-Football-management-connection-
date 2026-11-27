import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const ratingLabels = [
  ['technical', 'Technical ability'],
  ['tactical', 'Tactical understanding'],
  ['physical', 'Physical attributes'],
  ['decisionMaking', 'Decision-making'],
  ['positionSkill', 'Position-specific skills'],
]

function playerFields(playerId, players) {
  const player = players.find(item => item.id === playerId)
  return player ? { playerName: player.name, position: player.position, age: player.age, currentClub: player.club } : {}
}

export default function ScoutReportEditorModal({ report, players, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    playerId: report?.playerId || players[0]?.id || '',
    observedOn: report?.observedOn || new Date().toISOString().slice(0, 10),
    competition: report?.competition || '',
    strengths: report?.strengths || '',
    areasForImprovement: report?.areasForImprovement || '',
    recommendation: report?.recommendation || 'Monitor',
    notes: report?.notes || '',
    ratings: report?.ratings || { technical: 3, tactical: 3, physical: 3, decisionMaking: 3, positionSkill: 3 },
  }))
  const closeButtonRef = useRef(null)
  const selectedPlayer = players.find(player => player.id === form.playerId)

  useEffect(() => {
    closeButtonRef.current?.focus()
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function updateField(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function updateRating(event) {
    setForm(current => ({ ...current, ratings: { ...current.ratings, [event.target.name]: Number(event.target.value) } }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    onSave({
      ...report,
      ...form,
      ...playerFields(form.playerId, players),
      id: report?.id || `scout-report-${Date.now()}`,
    })
  }

  return (
    <div className="scout-dashboard-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="scout-dashboard-modal scout-report-editor" role="dialog" aria-modal="true" aria-labelledby="scout-report-editor-title">
        <div className="scout-dashboard-modal-header">
          <div><span className="kicker">SCOUTING WORKSPACE</span><h2 id="scout-report-editor-title">{report ? 'Edit scouting report' : 'Create scouting report'}</h2><p>Assessments are your subjective observations, not independently verified facts.</p></div>
          <button ref={closeButtonRef} type="button" className="scout-dashboard-modal-close" onClick={onClose} aria-label="Close scouting report editor"><X size={18} /></button>
        </div>
        <form className="scout-dashboard-modal-form" onSubmit={handleSubmit}>
          <label><span>Player</span><select name="playerId" value={form.playerId} onChange={updateField} required>{players.map(player => <option key={player.id} value={player.id}>{player.name}</option>)}</select></label>
          <label><span>Date observed</span><input name="observedOn" type="date" value={form.observedOn} onChange={updateField} required /></label>
          <label><span>Position</span><input value={selectedPlayer?.position || ''} readOnly /></label>
          <label><span>Age</span><input value={selectedPlayer?.age || ''} readOnly /></label>
          <label><span>Current club or academy</span><input className="scout-readonly-field" value={selectedPlayer?.club || ''} readOnly /></label>
          <label><span>Competition or event</span><input name="competition" value={form.competition} onChange={updateField} placeholder="e.g. U19 Regional League" required /></label>
          <div className="scout-rating-editor scout-modal-wide">
            <div className="scout-rating-editor-heading"><strong>Player evaluation</strong><small>Rate each area from 1 (developing) to 5 (excellent).</small></div>
            <div className="scout-rating-input-grid">
              {ratingLabels.map(([key, label]) => (
                <label key={key}><span>{label}</span><select name={key} value={form.ratings[key]} onChange={updateRating}>{[1, 2, 3, 4, 5].map(rating => <option key={rating} value={rating}>{rating} / 5</option>)}</select></label>
              ))}
            </div>
          </div>
          <label><span>Player strengths</span><textarea name="strengths" rows="3" value={form.strengths} onChange={updateField} required /></label>
          <label><span>Areas for improvement</span><textarea name="areasForImprovement" rows="3" value={form.areasForImprovement} onChange={updateField} required /></label>
          <label><span>Overall recommendation</span><select name="recommendation" value={form.recommendation} onChange={updateField}><option>Strongly recommend</option><option>Recommend</option><option>Monitor</option><option>Do not recommend</option></select></label>
          <label><span>Additional notes</span><textarea name="notes" rows="3" value={form.notes} onChange={updateField} placeholder="Context, follow-up observations, or next steps." /></label>
          <div className="scout-dashboard-modal-actions scout-modal-wide">
            <button type="button" className="scout-dashboard-secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">{report ? 'Save report changes' : 'Save demo report'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
