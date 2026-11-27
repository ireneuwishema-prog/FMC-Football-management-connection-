import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'

export default function AgentOpportunityInquiryModal({ opportunity, players, onClose, onSubmit }) {
  const [playerId, setPlayerId] = useState(players[0]?.id || '')
  const [notes, setNotes] = useState('')
  const closeButtonRef = useRef(null)

  useEffect(() => {
    closeButtonRef.current?.focus()
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit({ playerId, notes })
  }

  return (
    <div className="club-dashboard-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="club-dashboard-editor agent-dashboard-editor" role="dialog" aria-modal="true" aria-labelledby="agent-inquiry-title">
        <div className="club-dashboard-editor-header">
          <div><span className="kicker">CAREER OPPORTUNITY · DEMO</span><h2 id="agent-inquiry-title">Register player interest</h2><p>{opportunity.title} · This will not contact the club or submit a real application.</p></div>
          <button ref={closeButtonRef} type="button" className="club-dashboard-modal-close" onClick={onClose} aria-label="Close opportunity inquiry"><X size={18} /></button>
        </div>
        <form className="club-dashboard-editor-form" onSubmit={handleSubmit}>
          <label className="agent-editor-wide"><span>Represented player</span><select value={playerId} onChange={event => setPlayerId(event.target.value)} required>{players.map(player => <option key={player.id} value={player.id}>{player.name} · {player.position}</option>)}</select></label>
          <label className="agent-editor-wide"><span>Introductory note</span><textarea rows="4" value={notes} onChange={event => setNotes(event.target.value)} maxLength={400} placeholder="Add a brief note about this opportunity match..." /></label>
          <div className="club-editor-actions agent-editor-wide">
            <button type="button" className="club-dashboard-secondary-button" onClick={onClose}>Cancel</button>
            <button type="submit" className="button button-primary">Save demo inquiry</button>
          </div>
        </form>
      </section>
    </div>
  )
}
