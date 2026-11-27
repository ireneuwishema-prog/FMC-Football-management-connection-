import { useEffect, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'

export default function ApplyDemoModal({ opportunityTitle, onClose }) {
  const [submitted, setSubmitted] = useState(false)
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
    setSubmitted(true)
  }

  return (
    <div className="apply-modal-backdrop" onMouseDown={event => {
      if (event.target === event.currentTarget) onClose()
    }}>
      <section className="apply-demo-modal" role="dialog" aria-modal="true" aria-labelledby="apply-demo-title">
        <button className="apply-modal-close" type="button" ref={closeButtonRef} onClick={onClose} aria-label="Close demo form">
          <X size={19} />
        </button>
        {submitted ? (
          <div className="apply-demo-success">
            <span><Check size={23} /></span>
            <span className="kicker">DEMO COMPLETE</span>
            <h2 id="apply-demo-title">Thanks for trying the application flow.</h2>
            <p>This is a frontend demonstration. No application was sent or saved.</p>
            <button className="button button-dark" type="button" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <span className="kicker">DEMONSTRATION FORM</span>
            <h2 id="apply-demo-title">Apply for this opportunity</h2>
            <p className="apply-demo-intro">{opportunityTitle}</p>
            <form className="apply-demo-form" onSubmit={handleSubmit}>
              <label>
                <span>Your name</span>
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                <span>Email address</span>
                <input name="email" type="email" autoComplete="email" required />
              </label>
              <label>
                <span>Short introduction</span>
                <textarea name="introduction" rows="4" placeholder="Share a little about your football experience." required />
              </label>
              <p className="apply-demo-disclaimer">Demo only. Details stay in this page and will not be sent or stored.</p>
              <button className="button button-primary" type="submit">Submit demo application</button>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
