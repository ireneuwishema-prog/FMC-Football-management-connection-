import { useState } from 'react'
import { Save, X } from 'lucide-react'

function listValue(value) {
  return Array.isArray(value) ? value.join(', ') : ''
}

export default function CoachProfileEditorModal({ profile, onSave, onClose }) {
  const [form, setForm] = useState({
    name: profile.name,
    country: profile.country,
    location: profile.location,
    experience: String(profile.experience),
    currentClub: profile.currentClub,
    specialization: profile.specialization,
    bio: profile.bio,
    qualifications: listValue(profile.qualifications),
    expertise: listValue(profile.expertise),
  })

  function updateField(event) {
    setForm(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function submitForm(event) {
    event.preventDefault()
    onSave({
      ...profile,
      ...form,
      experience: Number(form.experience),
      qualifications: form.qualifications.split(',').map(item => item.trim()).filter(Boolean),
      expertise: form.expertise.split(',').map(item => item.trim()).filter(Boolean),
    })
  }

  return (
    <div className="coach-profile-modal-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="coach-profile-modal" role="dialog" aria-modal="true" aria-labelledby="coach-profile-modal-title">
        <header>
          <div><span className="kicker">COACH PROFILE</span><h2 id="coach-profile-modal-title">Edit your profile</h2></div>
          <button type="button" className="coach-profile-modal-close" onClick={onClose} aria-label="Close profile editor"><X size={17} /></button>
        </header>
        <form onSubmit={submitForm}>
          <label><span>Full name</span><input name="name" value={form.name} onChange={updateField} required /></label>
          <label><span>Nationality</span><input name="country" value={form.country} onChange={updateField} required /></label>
          <label><span>Location</span><input name="location" value={form.location} onChange={updateField} required /></label>
          <label><span>Coaching experience (years)</span><input name="experience" type="number" min="0" max="60" value={form.experience} onChange={updateField} required /></label>
          <label><span>Current club or organization</span><input name="currentClub" value={form.currentClub} onChange={updateField} required /></label>
          <label><span>Coaching specialization</span><input name="specialization" value={form.specialization} onChange={updateField} required /></label>
          <label className="coach-profile-modal-wide"><span>Biography</span><textarea name="bio" rows="3" value={form.bio} onChange={updateField} required /></label>
          <label className="coach-profile-modal-wide"><span>Qualifications and licences <small>(comma separated)</small></span><input name="qualifications" value={form.qualifications} onChange={updateField} /></label>
          <label className="coach-profile-modal-wide"><span>Areas of expertise <small>(comma separated)</small></span><input name="expertise" value={form.expertise} onChange={updateField} /></label>
          <div className="coach-profile-modal-actions coach-profile-modal-wide">
            <button type="button" className="club-dashboard-secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary"><Save size={14} />Save demo profile</button>
          </div>
        </form>
      </section>
    </div>
  )
}
