import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const emptyOpportunity = {
  title: '',
  position: 'Forward',
  ageRange: '',
  location: '',
  competition: '',
  deadline: '',
  description: '',
  requirementsText: '',
}

export default function ClubOpportunityEditorModal({ opportunity, club, onClose, onSave }) {
  const [form, setForm] = useState(() => opportunity
    ? { ...opportunity, requirementsText: opportunity.requirements.join('\n') }
    : { ...emptyOpportunity, location: club.location, competition: club.league })
  const closeButtonRef = useRef(null)

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

  function handleSubmit(event) {
    event.preventDefault()
    const { requirementsText, ...opportunityFields } = form
    onSave({
      ...opportunity,
      ...opportunityFields,
      id: opportunity?.id || `club-demo-${Date.now()}`,
      clubId: club.id,
      requirements: requirementsText.split('\n').map(item => item.trim()).filter(Boolean),
      status: opportunity?.status || 'Active',
    })
  }

  return (
    <div className="club-dashboard-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="club-dashboard-editor" role="dialog" aria-modal="true" aria-labelledby="club-opportunity-editor-title">
        <div className="club-dashboard-editor-header">
          <div>
            <span className="kicker">{opportunity ? 'RECRUITMENT MANAGEMENT' : 'NEW LISTING'}</span>
            <h2 id="club-opportunity-editor-title">{opportunity ? 'Edit opportunity' : 'Publish an opportunity'}</h2>
            <p>This listing is only available in this frontend demonstration.</p>
          </div>
          <button ref={closeButtonRef} type="button" className="club-dashboard-modal-close" onClick={onClose} aria-label="Close opportunity editor"><X size={18} /></button>
        </div>
        <form className="club-dashboard-editor-form" onSubmit={handleSubmit}>
          <label className="club-editor-wide"><span>Opportunity title</span><input name="title" value={form.title} onChange={updateField} required maxLength={90} /></label>
          <label><span>Position required</span>
            <select name="position" value={form.position} onChange={updateField}>
              {['Goalkeeper', 'Defender', 'Centre Back', 'Full Back', 'Midfielder', 'Central Midfielder', 'Attacking Midfielder', 'Forward', 'Winger'].map(position => <option key={position}>{position}</option>)}
            </select>
          </label>
          <label><span>Age range</span><input name="ageRange" value={form.ageRange} onChange={updateField} placeholder="e.g. 18–24" required /></label>
          <label><span>Country or location</span><input name="location" value={form.location} onChange={updateField} required /></label>
          <label><span>Competition level</span><input name="competition" value={form.competition} onChange={updateField} required /></label>
          <label><span>Application deadline</span><input name="deadline" value={form.deadline} onChange={updateField} placeholder="e.g. 30 June 2027" required /></label>
          <label className="club-editor-wide"><span>Opportunity description</span><textarea name="description" rows="3" value={form.description} onChange={updateField} required /></label>
          <label className="club-editor-wide"><span>Requirements <small>(one per line)</small></span><textarea name="requirementsText" rows="4" value={form.requirementsText} onChange={updateField} placeholder={'Competitive playing experience\nAvailable for an in-person assessment'} required /></label>
          <div className="club-editor-actions club-editor-wide">
            <button type="button" className="club-dashboard-secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">{opportunity ? 'Save changes' : 'Publish demo opportunity'}</button>
          </div>
        </form>
      </section>
    </div>
  )
}
