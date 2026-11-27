import { useState } from 'react'
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, MapPin } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClubLogo from '../components/ClubLogo'
import ApplyDemoModal from '../components/ApplyDemoModal'
import clubProfiles from '../data/clubProfiles'
import opportunityData from '../data/opportunityData'

export default function OpportunityDetailPage() {
  const { opportunityId } = useParams()
  const [isApplyOpen, setIsApplyOpen] = useState(false)
  const opportunity = opportunityData.find(item => item.id === opportunityId)
  const club = opportunity && clubProfiles.find(profile => profile.id === opportunity.clubId)

  if (!opportunity || !club) {
    return (
      <>
        <Navbar />
        <main className="club-not-found">
          <div className="player-not-found-card">
            <span className="kicker">FOOTBALL OPPORTUNITY</span>
            <h1>We couldn't find that opportunity.</h1>
            <p>Return to the clubs page to explore other fictional recruitment listings.</p>
            <Link className="button button-dark" to="/clubs#opportunities"><ArrowLeft size={16} /> Back to opportunities</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="opportunity-detail-page">
        <section className="opportunity-detail-hero">
          <img src={club.coverImage} alt="" />
          <div className="club-cover-overlay" />
          <div className="container opportunity-detail-hero-content">
            <Link className="profile-back-link" to="/clubs#opportunities"><ArrowLeft size={16} /> Back to opportunities</Link>
            <div className="opportunity-detail-club">
              <Link to={`/clubs/${club.id}`} aria-label={`View ${club.name} profile`}><ClubLogo club={club} size="large" /></Link>
              <div><Link className="opportunity-club-name" to={`/clubs/${club.id}`}>{club.name} <ArrowUpRight size={14} /></Link><span><MapPin size={13} /> {club.country} · {club.league}</span></div>
            </div>
            <span className="opportunity-type">RECRUITMENT OPPORTUNITY</span>
            <h1>{opportunity.title}</h1>
            <div className="opportunity-hero-facts">
              <span>{opportunity.position}</span>
              <span><MapPin size={14} /> {club.country}</span>
              <span><CalendarDays size={14} /> Closes {opportunity.deadline}</span>
            </div>
          </div>
        </section>

        <div className="container opportunity-detail-layout">
          <div className="opportunity-detail-main">
            <section className="club-detail-card">
              <span className="kicker">ABOUT THE OPPORTUNITY</span>
              <h2>Role overview</h2>
              <p className="club-lead">{opportunity.description}</p>
              <p>{opportunity.fullDescription}</p>
            </section>
            <section className="club-detail-card">
              <span className="kicker">WHAT WE'RE LOOKING FOR</span>
              <h2>Requirements</h2>
              <ul className="club-achievement-list opportunity-requirements">
                {opportunity.requirements.map(requirement => <li key={requirement}><CheckCircle2 size={17} />{requirement}</li>)}
              </ul>
              <h3 className="opportunity-subheading">Qualifications and experience</h3>
              <p>{opportunity.qualifications}</p>
            </section>
            <section className="club-detail-card">
              <span className="kicker">HOW TO EXPRESS INTEREST</span>
              <h2>Application instructions</h2>
              <p>{opportunity.instructions}</p>
            </section>
          </div>

          <aside className="opportunity-detail-aside">
            <section className="club-detail-card">
              <span className="kicker">CLUB INFORMATION</span>
              <Link className="opportunity-aside-club" to={`/clubs/${club.id}`}>
                <ClubLogo club={club} size="small" />
                <span><strong>{club.name}</strong><small>{club.country}</small></span>
                <ArrowUpRight size={16} />
              </Link>
              <div className="club-fact-row"><span>League</span><strong>{club.league}</strong></div>
              <div className="club-fact-row"><span>Category</span><strong>{club.category}</strong></div>
              <div className="club-fact-row"><span>Position</span><strong>{opportunity.position}</strong></div>
              <div className="club-fact-row"><span>Deadline</span><strong>{opportunity.deadline}</strong></div>
              <button className="button button-primary opportunity-apply-button" type="button" onClick={() => setIsApplyOpen(true)}>
                Apply <ArrowUpRight size={16} />
              </button>
              <p className="demo-only-note">Frontend demonstration only. No application is sent.</p>
            </section>
          </aside>
        </div>
      </main>
      <Footer />
      {isApplyOpen && <ApplyDemoModal opportunityTitle={opportunity.title} onClose={() => setIsApplyOpen(false)} />}
    </>
  )
}
