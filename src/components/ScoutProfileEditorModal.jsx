import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

export default function ScoutProfileEditorModal({ profile, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    name: profile.name,
    country: profile.country,
    location: profile.location,
    specialization: profile.specialization,
    experience: profile.experience,
    organization: profile.organization,
    bio: profile.bio,
    expertiseText: profile.expertise.join('\n'),
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
    const { expertiseText, ...profileFields } = form
    onSave({
      ...profile,
      ...profileFields,
      experience: Number(form.experience),
      expertise: expertiseText.split('\n').map(item => item.trim()).filter(Boolean),
    })
  }

  return (
    <div className="scout-dashboard-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="scout-dashboard-modal" role="dialog" aria-modal="true" aria-labelledby="scout-profile-editor-title">
        <div className="scout-dashboard-modal-header">
          <div><span className="kicker">SCOUT PROFILE</span><h2 id="scout-profile-editor-title">Edit profile</h2><p>Changes stay in this frontend demonstration.</p></div>
          <button ref={closeButtonRef} type="button" className="scout-dashboard-modal-close" onClick={onClose} aria-label="Close scout profile editor"><X size={18} /></button>
        </div>
        <form className="scout-dashboard-modal-form" onSubmit={handleSubmit}>
          <label><span>Full name</span><input name="name" value={form.name} onChange={updateField} required /></label>
          <label><span>Country</span><input name="country" value={form.country} onChange={updateField} required /></label>
          <label><span>City or location</span><input name="location" value={form.location} onChange={updateField} required /></label>
          <label><span>Scouting specialization</span><input name="specialization" value={form.specialization} onChange={updateField} required /></label>
          <label><span>Years of experience</span><input name="experience" type="number" min="0" max="60" value={form.experience} onChange={updateField} required /></label>
          <label><span>Organization</span><input name="organization" value={form.organization} onChange={updateField} required /></label>
          <label className="scout-modal-wide"><span>Professional biography</span><textarea name="bio" rows="3" value={form.bio} onChange={updateField} required /></label>
          <label className="scout-modal-wide"><span>Areas of expertise <small>(one per line)</small></span><textarea name="expertiseText" rows="3" value={form.expertiseText} onChange={updateField} required /></label>
          <div className="scout-dashboard-modal-actions scout-modal-wide">
            <button type="button" className="scout-dashboard-secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">Save demo profile</button>
          </div>
        </form>
      </section>
    </div>
  )
}
