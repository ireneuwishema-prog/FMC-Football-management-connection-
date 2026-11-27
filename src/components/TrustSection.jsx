import { ArrowUpRight, CircleCheck, ShieldCheck } from 'lucide-react'

export default function TrustSection() {
  return (
    <section className="trust-section" id="about">
      <div className="container trust-grid">
        <div className="trust-art" aria-hidden="true">
          <div className="trust-orbit trust-orbit-one" />
          <div className="trust-orbit trust-orbit-two" />
          <div className="trust-shield"><ShieldCheck size={49} strokeWidth={1.4} /></div>
          <div className="trust-mini-card">
            <span className="trust-mini-icon"><CircleCheck size={17} /></span>
            <span><strong>Trust matters</strong><small>Designed for real connections</small></span>
          </div>
          <span className="trust-art-caption">A stronger game starts with trust.</span>
        </div>
        <div className="trust-copy">
          <span className="kicker">TRUST &amp; VERIFICATION</span>
          <h2>Real connections start with confidence.</h2>
          <p>FMC aims to help people identify authentic football professionals and organizations through verified profiles. Trust is important to the game, and to the people building their future in it.</p>
          <div className="verification-note">
            <span className="status-dot" />
            <div><strong>Verification is not active yet</strong><span>Profile verification is a planned platform feature. No profile is currently verified by FMC.</span></div>
          </div>
          <a className="text-link light" href="#how-it-works">How FMC works <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </section>
  )
}
