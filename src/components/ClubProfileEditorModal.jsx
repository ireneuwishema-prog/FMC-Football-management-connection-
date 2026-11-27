import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

export default function ClubProfileEditorModal({ club, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    name: club.name,
    country: club.country,
    location: club.location,
    league: club.league,
    description: club.description,
  }))
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
    onSave({ ...club, ...form })
  }

  return (
    <div className="club-dashboard-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="club-dashboard-editor club-profile-editor" role="dialog" aria-modal="true" aria-labelledby="club-profile-editor-title">
        <div className="club-dashboard-editor-header">
          <div>
            <span className="kicker">CLUB PROFILE</span>
            <h2 id="club-profile-editor-title">Edit club information</h2>
            <p>Changes are kept in this page for demonstration only.</p>
          </div>
          <button ref={closeButtonRef} type="button" className="club-dashboard-modal-close" onClick={onClose} aria-label="Close club profile editor"><X size={18} /></button>
        </div>
        <form className="club-dashboard-editor-form" onSubmit={handleSubmit}>
          <label><span>Club name</span><input name="name" value={form.name} onChange={updateField} required /></label>
          <label><span>Country</span><input name="country" value={form.country} onChange={updateField} required /></label>
          <label><span>City or location</span><input name="location" value={form.location} onChange={updateField} required /></label>
          <label><span>League or competition</span><input name="league" value={form.league} onChange={updateField} required /></label>
          <label className="club-editor-wide"><span>Club description</span><textarea name="description" rows="5" value={form.description} onChange={updateField} required maxLength={600} /></label>
          <div className="club-editor-actions club-editor-wide">
            <button type="button" className="club-dashboard-secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">Save demo profile</button>
          </div>
        </form>
      </section>
    </div>
  )
}
