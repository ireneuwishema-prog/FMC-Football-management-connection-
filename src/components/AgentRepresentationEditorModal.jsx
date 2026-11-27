import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

export default function AgentRepresentationEditorModal({ representation, players, lists, onClose, onSave }) {
  const [form, setForm] = useState(() => ({
    playerId: representation?.playerId || players[0]?.id || '',
    careerStatus: representation?.careerStatus || 'Exploring next steps',
    representationStatus: representation?.representationStatus || 'Exploratory discussion',
    list: representation?.list || lists[0] || '',
    notes: representation?.notes || '',
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
    onSave({ ...representation, ...form, id: representation?.id || `agent-representation-${Date.now()}` })
  }

  return (
    <div className="club-dashboard-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="club-dashboard-editor agent-dashboard-editor" role="dialog" aria-modal="true" aria-labelledby="agent-representation-editor-title">
        <div className="club-dashboard-editor-header">
          <div><span className="kicker">PLAYER WORKSPACE</span><h2 id="agent-representation-editor-title">{representation?.id ? 'Update player information' : 'Add a player'}</h2><p>Workspace labels are for this demo only and do not establish a legal representation agreement.</p></div>
          <button ref={closeButtonRef} type="button" className="club-dashboard-modal-close" onClick={onClose} aria-label="Close player editor"><X size={18} /></button>
        </div>
        {players.length ? (
          <form className="club-dashboard-editor-form" onSubmit={handleSubmit}>
            <label className="agent-editor-wide"><span>Player</span><select name="playerId" value={form.playerId} onChange={updateField} required>{players.map(player => <option key={player.id} value={player.id}>{player.name} · {player.position}</option>)}</select></label>
            <label><span>Career status</span><select name="careerStatus" value={form.careerStatus} onChange={updateField}><option>Developing at current club</option><option>Exploring next steps</option><option>Open to new opportunities</option><option>Focused on current season</option></select></label>
            <label><span>Workspace status</span><select name="representationStatus" value={form.representationStatus} onChange={updateField}><option>Exploratory discussion</option><option>Career planning</option><option>Introduction pending</option><option>Opportunity follow-up</option></select></label>
            <label className="agent-editor-wide"><span>Player list</span><select name="list" value={form.list} onChange={updateField} required>{lists.map(list => <option key={list}>{list}</option>)}</select></label>
            <label className="agent-editor-wide"><span>Private demo note</span><textarea name="notes" rows="4" value={form.notes} onChange={updateField} maxLength={400} placeholder="Add a note for this sample workspace..." /></label>
            <div className="club-editor-actions agent-editor-wide">
              <button type="button" className="club-dashboard-secondary-button" onClick={onClose}>Cancel</button>
              <button type="submit" className="button button-primary">{representation?.id ? 'Save changes' : 'Add to workspace'}</button>
            </div>
          </form>
        ) : <div className="club-dashboard-empty-state"><strong>No available players</strong><span>All sample players are already in your workspace.</span></div>}
      </section>
    </div>
  )
}
