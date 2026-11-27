import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

export default function AgentProfileEditorModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    name: profile.name,
    agencyName: profile.agencyName,
    country: profile.country,
    location: profile.location,
    experience: profile.experience,
    bio: profile.bio,
    specializationsText: profile.specializations.join('\n'),
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
    const { specializationsText, ...profileFields } = form
    onSave({
      ...profile,
      ...profileFields,
      experience: Number(form.experience),
      organization: form.agencyName,
      specializations: specializationsText.split('\n').map(item => item.trim()).filter(Boolean),
    })
  }

  return (
    <div className="club-dashboard-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="club-dashboard-editor agent-dashboard-editor" role="dialog" aria-modal="true" aria-labelledby="agent-profile-editor-title">
        <div className="club-dashboard-editor-header">
          <div><span className="kicker">AGENT PROFILE</span><h2 id="agent-profile-editor-title">Edit professional profile</h2><p>Changes are kept in this frontend demonstration.</p></div>
          <button ref={closeButtonRef} type="button" className="club-dashboard-modal-close" onClick={onClose} aria-label="Close agent profile editor"><X size={18} /></button>
        </div>
        <form className="club-dashboard-editor-form" onSubmit={handleSubmit}>
          <label><span>Full name</span><input name="name" value={form.name} onChange={updateField} required maxLength={80} /></label>
          <label><span>Agency name</span><input name="agencyName" value={form.agencyName} onChange={updateField} maxLength={100} /></label>
          <label><span>Country</span><input name="country" value={form.country} onChange={updateField} required maxLength={80} /></label>
          <label><span>City or location</span><input name="location" value={form.location} onChange={updateField} required maxLength={100} /></label>
          <label><span>Years of experience</span><input name="experience" type="number" min="0" max="60" value={form.experience} onChange={updateField} required /></label>
          <label className="agent-editor-wide"><span>Professional biography</span><textarea name="bio" rows="4" value={form.bio} onChange={updateField} required maxLength={600} /></label>
          <label className="agent-editor-wide"><span>Areas of specialization <small>(one per line)</small></span><textarea name="specializationsText" rows="3" value={form.specializationsText} onChange={updateField} required /></label>
          <div className="club-editor-actions agent-editor-wide">
            <button type="button" className="club-dashboard-secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">Save demo profile</button>
          </div>
        </form>
      </section>
    </div>
  )
}
