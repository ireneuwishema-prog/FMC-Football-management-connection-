import { ArrowLeft, ArrowUpRight, MapPin, UsersRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClubLogo from '../components/ClubLogo'
import OpportunityCard from '../components/OpportunityCard'
import clubProfiles from '../data/clubProfiles'
import opportunityData from '../data/opportunityData'

export default function ClubProfilePage() {
  const { clubId } = useParams()
  const club = clubProfiles.find(profile => profile.id === clubId)

  if (!club) {
    return (
      <>
        <Navbar />
        <main className="club-not-found">
          <div className="player-not-found-card">
            <span className="kicker">CLUB PROFILE</span>
            <h1>We couldn't find that club.</h1>
            <p>Browse the club directory to discover more fictional FMC profiles.</p>
            <Link className="button button-dark" to="/clubs"><ArrowLeft size={16} /> Back to clubs</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const clubOpportunities = opportunityData.filter(opportunity => opportunity.clubId === club.id)

  return (
    <>
      <Navbar />
      <main className="club-profile-page">
        <section className="club-profile-hero">
          <img className="club-profile-cover" src={club.coverImage} alt={`${club.name} stadium`} />
          <div className="club-cover-overlay" />
          <div className="container club-profile-hero-content">
            <Link className="profile-back-link" to="/clubs"><ArrowLeft size={16} /> Back to clubs</Link>
            <div className="club-profile-identity">
              <ClubLogo club={club} size="large" />
              <div>
                <span className="club-category-tag">{club.category}</span>
                <h1>{club.name}</h1>
                <div className="club-profile-location"><MapPin size={15} /> {club.country}<span />{club.league}</div>
              </div>
            </div>
          </div>
        </section>

        <div className="container club-profile-content">
          <div className="club-profile-main">
            <section className="club-detail-card">
              <span className="kicker">ABOUT THE CLUB</span>
              <h2>Our story</h2>
              <p className="club-lead">{club.description}</p>
              <p>{club.history}</p>
            </section>

            <section className="club-detail-card">
              <span className="kicker">THE HOME GROUND</span>
              <h2>Stadium</h2>
              <div className="club-stadium-card">
                <div className="stadium-icon"><MapPin size={20} /></div>
                <div><h3>{club.stadium.name}</h3><p>{club.country} · Capacity {club.stadium.capacity}</p></div>
              </div>
            </section>

            <section className="club-detail-card">
              <span className="kicker">CLUB HONOURS</span>
              <h2>Achievements</h2>
              <ul className="club-achievement-list">
                {club.achievements.map(achievement => <li key={achievement}><span />{achievement}</li>)}
              </ul>
            </section>

            <section className="club-detail-card">
              <div className="club-detail-heading">
                <div><span className="kicker">MEET THE SQUAD</span><h2>Squad overview</h2></div>
                <span className="squad-count"><UsersRound size={15} /> Sample squad</span>
              </div>
              <div className="club-squad-grid">
                {club.squad.map(player => (
                  <article key={player.name} className="club-squad-member">
                    <span className="squad-avatar">{player.name.split(' ').map(part => part[0]).join('')}</span>
                    <div><h3>{player.name}</h3><p>{player.position} · {player.age}</p></div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="club-profile-aside">
            <section className="club-detail-card club-facts-card">
              <span className="kicker">CLUB DETAILS</span>
              <div className="club-fact-row"><span>Founded</span><strong>{club.founded}</strong></div>
              <div className="club-fact-row"><span>Country</span><strong>{club.country}</strong></div>
              <div className="club-fact-row"><span>League</span><strong>{club.league}</strong></div>
              <div className="club-fact-row"><span>Category</span><strong>{club.category}</strong></div>
              <div className="club-website-placeholder">
                <span>OFFICIAL WEBSITE</span>
                <strong>{club.website}</strong>
                <small>Placeholder domain for this fictional club.</small>
              </div>
            </section>
            <section className="club-cta-card">
              <span className="kicker">RECRUITMENT</span>
              <h2>Find an opportunity with {club.name}.</h2>
              <p>Explore current fictional recruitment listings from this club.</p>
              <a className="button button-primary" href="#club-opportunities">View opportunities <ArrowUpRight size={16} /></a>
            </section>
          </aside>
        </div>

        {clubOpportunities.length > 0 && (
          <section className="club-opportunities-section" id="club-opportunities">
            <div className="container">
              <div className="clubs-section-heading">
                <div><span className="kicker">OPEN RECRUITMENT</span><h2>Opportunities at {club.name}</h2></div>
                <Link className="text-link" to="/clubs#opportunities">Browse all opportunities <ArrowUpRight size={16} /></Link>
              </div>
              <div className="football-opportunities-grid club-opportunities-grid">
                {clubOpportunities.map(opportunity => <OpportunityCard key={opportunity.id} opportunity={opportunity} club={club} />)}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  )
}
