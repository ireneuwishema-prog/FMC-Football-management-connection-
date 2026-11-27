import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

const positions = [
  'Goalkeeper', 'Centre Back', 'Right Back', 'Left Back', 'Defensive Midfielder',
  'Central Midfielder', 'Attacking Midfielder', 'Winger', 'Forward', 'Striker',
]

function toLines(items) {
  return items.join('\n')
}

function toCareerLines(items) {
  return items.map(item => `${item.role} | ${item.club} | ${item.period}`).join('\n')
}

export default function PlayerProfileEditorModal({ profile, onSave, onClose }) {
  const closeButton = useRef(null)
  const [draft, setDraft] = useState(() => ({
    name: profile.name,
    age: profile.age,
    nationality: profile.nationality,
    position: profile.position,
    preferredFoot: profile.preferredFoot,
    club: profile.club,
    introduction: profile.introduction,
    experience: profile.experience,
    careerHistory: toCareerLines(profile.careerHistory),
    achievements: toLines(profile.achievements),
    videoHighlights: profile.videoHighlights || '',
    ...profile.stats,
  }))

  useEffect(() => {
    closeButton.current?.focus()
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function updateField(event) {
    setDraft(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function saveProfile(event) {
    event.preventDefault()
    const careerHistory = draft.careerHistory
      .split('\n')
      .map(line => line.split('|').map(part => part.trim()))
      .filter(parts => parts.some(Boolean))
      .map(([role, club, period]) => ({
        role: role || 'Football role',
        club: club || 'Club or academy',
        period: period || 'Period not specified',
      }))
    const achievements = draft.achievements.split('\n').map(item => item.trim()).filter(Boolean)

    onSave({
      ...profile,
      name: draft.name.trim(),
      age: Number(draft.age),
      nationality: draft.nationality.trim(),
      position: draft.position,
      preferredFoot: draft.preferredFoot,
      club: draft.club.trim(),
      introduction: draft.introduction.trim(),
      experience: draft.experience.trim(),
      careerHistory,
      achievements,
      videoHighlights: draft.videoHighlights.trim(),
      stats: {
        appearances: Number(draft.appearances) || 0,
        goals: Number(draft.goals) || 0,
        assists: Number(draft.assists) || 0,
        cleanSheets: Number(draft.cleanSheets) || 0,
      },
    })
  }

  return (
    <div className="player-dashboard-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="player-dashboard-editor" role="dialog" aria-modal="true" aria-labelledby="player-editor-title">
        <header className="player-dashboard-editor-header">
          <div><span className="kicker">PROFILE MANAGEMENT</span><h2 id="player-editor-title">Edit your player profile</h2><p>Changes are a local demonstration and will not be saved to a server.</p></div>
          <button ref={closeButton} type="button" className="player-dashboard-editor-close" onClick={onClose} aria-label="Close profile editor"><X size={19} /></button>
        </header>
        <form className="player-dashboard-editor-form" onSubmit={saveProfile}>
          <div className="player-editor-fields">
            <label><span>Full name</span><input name="name" value={draft.name} onChange={updateField} required maxLength={70} /></label>
            <label><span>Age</span><input name="age" type="number" min="14" max="60" value={draft.age} onChange={updateField} required /></label>
            <label><span>Nationality</span><input name="nationality" value={draft.nationality} onChange={updateField} required maxLength={50} /></label>
            <label><span>Playing position</span><select name="position" value={draft.position} onChange={updateField}>{positions.map(position => <option key={position}>{position}</option>)}</select></label>
            <label><span>Preferred foot</span><select name="preferredFoot" value={draft.preferredFoot} onChange={updateField}><option>Right</option><option>Left</option><option>Both</option></select></label>
            <label><span>Current club or academy</span><input name="club" value={draft.club} onChange={updateField} required maxLength={90} /></label>
          </div>
          <label className="player-editor-wide"><span>Player introduction</span><textarea name="introduction" rows="3" value={draft.introduction} onChange={updateField} maxLength={500} /></label>
          <label className="player-editor-wide"><span>Playing experience</span><textarea name="experience" rows="3" value={draft.experience} onChange={updateField} maxLength={500} /></label>
          <label className="player-editor-wide"><span>Career history</span><textarea name="careerHistory" rows="4" value={draft.careerHistory} onChange={updateField} placeholder="Role | Club or academy | Years, one entry per line" /><small>Use “Role | Club or academy | Years” on each line.</small></label>
          <label className="player-editor-wide"><span>Achievements</span><textarea name="achievements" rows="3" value={draft.achievements} onChange={updateField} placeholder="One achievement per line" /></label>
          <fieldset className="player-editor-stats">
            <legend>Performance statistics <small>Fictional sample values</small></legend>
            <label><span>Appearances</span><input name="appearances" type="number" min="0" value={draft.appearances} onChange={updateField} /></label>
            <label><span>Goals</span><input name="goals" type="number" min="0" value={draft.goals} onChange={updateField} /></label>
            <label><span>Assists</span><input name="assists" type="number" min="0" value={draft.assists} onChange={updateField} /></label>
            <label><span>Clean sheets</span><input name="cleanSheets" type="number" min="0" value={draft.cleanSheets} onChange={updateField} /></label>
          </fieldset>
          <label className="player-editor-wide"><span>Video highlights</span><input name="videoHighlights" value={draft.videoHighlights} onChange={updateField} placeholder="Add a demo link or a note about your highlights" maxLength={180} /><small>Links are shown as profile notes only; no video is uploaded or played.</small></label>
          <div className="player-editor-actions">
            <button type="button" className="player-editor-cancel" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">Save demo changes</button>
          </div>
        </form>
      </section>
    </div>
  )
}
