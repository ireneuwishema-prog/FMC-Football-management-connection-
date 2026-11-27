import { ArrowLeft, ArrowUpRight, MapPin, Play, ShieldCheck } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DashboardAccessAction from '../components/DashboardAccessAction'
import playerProfiles from '../data/playerProfiles'

export default function PlayerProfilePage() {
  const { playerId } = useParams()
  const player = playerProfiles.find(profile => profile.id === playerId)

  if (!player) {
    return (
      <>
        <Navbar />
        <main className="player-not-found">
          <div className="player-not-found-card">
            <span className="kicker">PLAYER PROFILE</span>
            <h1>We couldn't find that player.</h1>
            <p>This sample profile may have moved. Browse the directory to discover other players.</p>
            <Link className="button button-dark" to="/discover"><ArrowLeft size={16} /> Back to players</Link>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="player-profile-page">
        <section className="profile-hero">
          <div className="container">
            <Link className="profile-back-link" to="/discover"><ArrowLeft size={16} /> Back to players</Link>
            <div className="profile-hero-grid">
              <div className="profile-hero-photo">
                <img src={player.image} alt={`${player.name}, ${player.position}`} />
                <span className="sample-profile-tag">FICTIONAL SAMPLE PROFILE</span>
              </div>
              <div className="profile-hero-copy">
                <span className="kicker">PLAYER PROFILE</span>
                <h1>{player.name}</h1>
                <div className="profile-nationality"><MapPin size={16} /> {player.nationality}</div>
                <div className="profile-quick-facts">
                  <div><span>POSITION</span><strong>{player.position}</strong></div>
                  <div><span>AGE</span><strong>{player.age} years</strong></div>
                  <div><span>PREFERRED FOOT</span><strong>{player.preferredFoot}</strong></div>
                  <div><span>CURRENT CLUB</span><strong>{player.club}</strong></div>
                </div>
                <p>{player.description}</p>
                <Link className="button button-primary" to="/register">Connect <ArrowUpRight size={17} /></Link>
                <small className="connect-note">Create an FMC account to connect with players.</small>
              </div>
            </div>
          </div>
        </section>

        <div className="container profile-content">
          <div className="profile-main-column">
            <section className="profile-content-card">
              <span className="kicker">PLAYER INTRODUCTION</span>
              <h2>About {player.name.split(' ')[0]}</h2>
              <p>{player.introduction}</p>
            </section>

            <section className="profile-content-card">
              <span className="kicker">FOOTBALL EXPERIENCE</span>
              <h2>Experience</h2>
              <p>{player.experience}</p>
            </section>

            <section className="profile-content-card" id="experience">
              <span className="kicker">FOOTBALL JOURNEY</span>
              <h2>Career history</h2>
              <div className="career-timeline">
                {player.careerHistory.map(item => (
                  <article className="career-entry" key={`${item.club}-${item.period}`}>
                    <span className="career-marker" />
                    <div><span>{item.period}</span><h3>{item.club}</h3><p>{item.role}</p></div>
                  </article>
                ))}
              </div>
            </section>

            <section className="profile-content-card">
              <span className="kicker">MILESTONES</span>
              <h2>Achievements</h2>
              <ul className="achievement-list">
                {player.achievements.map(achievement => <li key={achievement}><ShieldCheck size={17} /> {achievement}</li>)}
              </ul>
            </section>
          </div>

          <aside className="profile-side-column">
            <section className="profile-content-card profile-stats-card" id="stats">
              <span className="kicker">SAMPLE SEASON</span>
              <h2>Player statistics</h2>
              <div className="sample-stats-grid">
                <div><strong>{player.stats.appearances}</strong><span>Appearances</span></div>
                <div><strong>{player.stats.goals}</strong><span>Goals</span></div>
                <div><strong>{player.stats.assists}</strong><span>Assists</span></div>
                <div><strong>{player.stats.cleanSheets}</strong><span>Clean sheets</span></div>
              </div>
              <p>Illustrative sample statistics, not official records.</p>
            </section>

            <section className="profile-content-card">
              <span className="kicker">VIDEO HIGHLIGHTS</span>
              <div className="highlights-placeholder">
                <span><Play size={19} fill="currentColor" /></span>
                <strong>Highlights coming soon</strong>
                <p>Player video reels will appear here when available.</p>
              </div>
            </section>
          </aside>
          <div className="public-profile-dashboard-action">
            <DashboardAccessAction to="/dashboard" title="Visit the Player Dashboard" description="Open the sample player workspace." />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
