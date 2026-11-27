import { useMemo, useState } from 'react'
import {
  Activity, ArrowRight, Bell, Bookmark, Check, CheckCircle2, ChevronRight, Clock3,
  Compass, Eye, FileText, Heart, Home, LogOut,
  MapPin, MessageCircle, Settings, Shield, Star, UserRound, Users, Video,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DashboardAccessAction from '../components/DashboardAccessAction'
import ApplyDemoModal from '../components/ApplyDemoModal'
import DashboardOpportunityCard from '../components/DashboardOpportunityCard'
import PlayerProfileEditorModal from '../components/PlayerProfileEditorModal'
import ClubLogo from '../components/ClubLogo'
import playerProfiles from '../data/playerProfiles'
import professionals, { sampleInboundRequests } from '../data/professionals'
import clubProfiles from '../data/clubProfiles'
import opportunityData from '../data/opportunityData'

const playerProfile = playerProfiles[0]
const initialNotifications = [
  { id: 'club-view', title: 'A club viewed your profile', detail: 'Northbridge FC viewed your player profile.', time: '20 minutes ago', read: false, icon: Eye },
  { id: 'connection-request-1', title: 'New connection request', detail: 'James Adebayo would like to connect.', time: '1 hour ago', read: false, icon: Users },
  { id: 'application-update', title: 'Application update', detail: 'Your forward trial application is marked as under review.', time: 'Yesterday', read: false, icon: FileText },
  { id: 'community-mention', title: 'A conversation is gaining traction', detail: 'Your followed football community has new discussions.', time: '2 days ago', read: true, icon: MessageCircle },
]
const demoApplications = [
  { opportunityId: 'northbridge-forward-trial', status: 'Under review', updated: 'Updated yesterday' },
]
const initialIncomingRequests = sampleInboundRequests
const initialConnections = ['lucas-moretti', 'marie-dupont']
const initialSavedPlayerIds = ['leo-carvalho', 'theo-martin']
const initialSavedProfessionalIds = ['amara-okafor', 'sofia-andersen']
const initialSavedOpportunityIds = ['northbridge-midfield-scouting', 'union-goalkeeper-trial']

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'profile', label: 'My Profile', icon: UserRound },
  { id: 'discover', label: 'Discover Opportunities', icon: Compass },
  { id: 'applications', label: 'My Applications', icon: FileText },
  { id: 'saved-opportunities', label: 'Saved Opportunities', icon: Bookmark },
  { id: 'connections', label: 'Connections', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function profileCompletion(profile) {
  const completedFields = [
    profile.name, profile.age, profile.nationality, profile.position, profile.preferredFoot,
    profile.club, profile.introduction, profile.experience, profile.careerHistory.length,
    profile.achievements.length, profile.stats.appearances, profile.videoHighlights,
  ]
  return Math.round(completedFields.filter(Boolean).length / completedFields.length * 100)
}

function DashboardSidebar({ activeSection, onNavigate, onLogout, unreadCount }) {
  return (
    <aside className="player-dashboard-sidebar">
      <div className="dashboard-sidebar-heading"><span className="dashboard-sidebar-mark">F</span><div><strong>PLAYER HUB</strong><small>YOUR FOOTBALL SPACE</small></div></div>
      <nav className="dashboard-sidebar-nav" aria-label="Player dashboard navigation">
        {sidebarItems.map(({ id, label, icon: Icon }) => id === 'discover' ? (
          <Link className="dashboard-sidebar-link" to="/clubs#opportunities" key={id}>
            <Icon size={17} /><span>{label}</span>
          </Link>
        ) : (
          <button type="button" className={activeSection === id ? 'dashboard-sidebar-link active' : 'dashboard-sidebar-link'} key={id} onClick={() => onNavigate(id)} aria-current={activeSection === id ? 'page' : undefined}>
            <Icon size={17} /><span>{label}</span>
            {id === 'notifications' && unreadCount > 0 && <span className="dashboard-sidebar-count">{unreadCount}</span>}
          </button>
        ))}
        <button type="button" className="dashboard-sidebar-link dashboard-logout-link" onClick={onLogout}><LogOut size={17} /><span>Logout</span></button>
      </nav>
      <div className="dashboard-demo-sidebar-note"><Shield size={15} /><span>Sample dashboard. Changes stay in this page.</span></div>
    </aside>
  )
}

function DashboardStatCard({ icon: Icon, label, value, note, tone }) {
  return (
    <article className={`dashboard-stat-card ${tone}`}>
      <span className="dashboard-stat-icon"><Icon size={18} /></span>
      <span className="dashboard-stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}

function DashboardSectionHeading({ kicker, title, action }) {
  return (
    <div className="dashboard-section-heading">
      <div><span className="kicker">{kicker}</span><h2>{title}</h2></div>
      {action}
    </div>
  )
}

function ProfileCompletion({ percentage }) {
  return (
    <div className="dashboard-completion">
      <div className="dashboard-completion-ring" style={{ '--completion': `${percentage}%` }} role="progressbar" aria-label="Profile completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percentage}>
        <span>{percentage}%</span>
      </div>
      <div><strong>Profile completeness</strong><span>{percentage < 100 ? 'Add your highlights to strengthen your profile.' : 'Your profile is looking complete.'}</span></div>
    </div>
  )
}

function PlayerMiniCard({ player, saved, onToggleSave }) {
  return (
    <article className="dashboard-player-mini-card">
      <img src={player.image} alt="" loading="lazy" />
      <div><strong>{player.name}</strong><span>{player.position} · {player.nationality}</span><small>{player.club}</small></div>
      <button type="button" onClick={() => onToggleSave(player.id)} aria-label={`${saved ? 'Remove saved' : 'Save'} player ${player.name}`} aria-pressed={saved}>
        {saved ? <Bookmark size={16} fill="currentColor" /> : <Bookmark size={16} />}
      </button>
    </article>
  )
}

function ProfessionalMiniCard({ person, action, actionLabel, actionIcon: ActionIcon, secondaryAction, profileLink = false }) {
  return (
    <article className="dashboard-professional-mini-card">
      <img src={person.image} alt="" loading="lazy" />
      <div className="dashboard-professional-mini-copy"><strong><Link to={`/professionals/${person.id}`}>{person.name}</Link>{person.verified && <CheckCircle2 size={13} aria-label="Demonstration profile badge" />}</strong><span>{person.role} · {person.country}</span></div>
      {secondaryAction && <button className="dashboard-reject-button" type="button" onClick={secondaryAction.onClick}>{secondaryAction.label}</button>}
      {profileLink
        ? <Link className="dashboard-connect-button" to={`/professionals/${person.id}`}><ActionIcon size={14} />{actionLabel}</Link>
        : action && <button className="dashboard-connect-button" type="button" onClick={action} aria-label={`${actionLabel} ${person.name}`}><ActionIcon size={14} />{actionLabel}</button>}
    </article>
  )
}

function RecentActivity() {
  const items = [
    { id: 'activity-view', icon: Eye, title: 'Your profile received 18 new views', detail: 'A sample activity update', time: 'Today' },
    { id: 'activity-application', icon: FileText, title: 'Forward trial application updated', detail: 'Northbridge FC · Under review', time: 'Yesterday' },
    { id: 'activity-connection', icon: Users, title: 'New connection requests are waiting', detail: 'Professionals from across the game', time: 'Yesterday' },
    { id: 'activity-community', icon: Heart, title: 'New discussions in your community', detail: 'See what football people are talking about', time: '2 days ago' },
  ]
  return (
    <div className="dashboard-activity-list">
      {items.map(({ id, icon: Icon, title, detail, time }) => (
        <article className="dashboard-activity-item" key={id}>
          <span><Icon size={16} /></span><div><strong>{title}</strong><small>{detail}</small></div><time>{time}</time>
        </article>
      ))}
    </div>
  )
}

export default function PlayerDashboardPage() {
  const [profile, setProfile] = useState(() => ({ ...playerProfile, videoHighlights: '' }))
  const [activeSection, setActiveSection] = useState('overview')
  const [editorOpen, setEditorOpen] = useState(false)
  const [applyingOpportunity, setApplyingOpportunity] = useState(null)
  const [savedPlayerIds, setSavedPlayerIds] = useState(initialSavedPlayerIds)
  const [savedProfessionalIds, setSavedProfessionalIds] = useState(initialSavedProfessionalIds)
  const [savedOpportunityIds, setSavedOpportunityIds] = useState(initialSavedOpportunityIds)
  const [incomingRequests, setIncomingRequests] = useState(initialIncomingRequests)
  const [connectionIds, setConnectionIds] = useState(initialConnections)
  const [sentRequestIds, setSentRequestIds] = useState([])
  const [notifications, setNotifications] = useState(initialNotifications)
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [feedback, setFeedback] = useState('')

  const completion = profileCompletion(profile)
  const unreadCount = notifications.filter(notification => !notification.read).length
  const clubById = useMemo(() => Object.fromEntries(clubProfiles.map(club => [club.id, club])), [])
  const opportunityById = useMemo(() => Object.fromEntries(opportunityData.map(opportunity => [opportunity.id, opportunity])), [])
  const recentConnections = connectionIds.map(id => professionals.find(person => person.id === id)).filter(Boolean)
  const requestedPeople = incomingRequests.map(id => professionals.find(person => person.id === id)).filter(Boolean)
  const savedPeople = savedProfessionalIds.map(id => professionals.find(person => person.id === id)).filter(Boolean)
  const suggestedPeople = professionals.filter(person =>
    !connectionIds.includes(person.id) &&
    !incomingRequests.includes(person.id) &&
    !savedProfessionalIds.includes(person.id) &&
    !sentRequestIds.includes(person.id)
  ).slice(0, 3)
  const savedPlayers = savedPlayerIds.map(id => playerProfiles.find(player => player.id === id)).filter(Boolean)
  const recommendedOpportunities = [opportunityData[0], opportunityData[1], opportunityData[4]].filter(Boolean)

  function navigateSection(section) {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toggleId(setter, id) {
    setter(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  function showFeedback(message) {
    setFeedback(message)
  }

  function handleSaveProfile(updatedProfile) {
    setProfile(updatedProfile)
    setEditorOpen(false)
    showFeedback('Profile changes updated for this demo session only.')
  }

  function handleAcceptRequest(id) {
    const person = professionals.find(item => item.id === id)
    setIncomingRequests(current => current.filter(requestId => requestId !== id))
    setConnectionIds(current => current.includes(id) ? current : [id, ...current])
    showFeedback(`${person?.name || 'Connection'} added to your sample network.`)
  }

  function handleRejectRequest(id) {
    setIncomingRequests(current => current.filter(requestId => requestId !== id))
    showFeedback('Connection request dismissed in this demo.')
  }

  function handleSendRequest(id) {
    setSentRequestIds(current => current.includes(id) ? current : [...current, id])
    showFeedback('Sample connection request sent. No message or backend request was created.')
  }

  function markNotificationRead(id) {
    setNotifications(current => current.map(notification => notification.id === id ? { ...notification, read: true } : notification))
  }

  function markAllNotificationsRead() {
    setNotifications(current => current.map(notification => ({ ...notification, read: true })))
    showFeedback('All sample notifications marked as read.')
  }

  function handleLogout() {
    showFeedback('This is a sample dashboard; there is no signed-in session to end.')
  }

  const applicationStatuses = Object.fromEntries(demoApplications.map(application => [application.opportunityId, application.status]))
  const savedOpportunities = savedOpportunityIds.map(id => opportunityById[id]).filter(Boolean)

  return (
    <>
      <Navbar />
      <main className="player-dashboard-page">
        <div className="player-dashboard-layout">
          <DashboardSidebar activeSection={activeSection} onNavigate={navigateSection} onLogout={handleLogout} unreadCount={unreadCount} />
          <div className="player-dashboard-content">
            <section className="player-dashboard-welcome" id="overview">
              <div className="dashboard-welcome-copy">
                <span className="eyebrow"><span /> PLAYER DASHBOARD</span>
                <p className="dashboard-welcome-label">Welcome back,</p>
                <h1>{profile.name}</h1>
                <div className="dashboard-welcome-meta">
                  <span>{profile.position}</span><span>{profile.club}</span><span><MapPin size={14} />{profile.nationality}</span>
                </div>
                <p className="dashboard-welcome-description">Your football journey, opportunities and connections — all in one place.</p>
                <button type="button" className="button button-primary dashboard-edit-button" onClick={() => setEditorOpen(true)}><UserRound size={16} />Edit profile</button>
              </div>
              <div className="dashboard-welcome-aside">
                <img src={profile.image} alt={`${profile.name} profile`} />
                <ProfileCompletion percentage={completion} />
              </div>
            </section>

            {feedback && <div className="dashboard-feedback" role="status"><Check size={16} />{feedback}<button type="button" onClick={() => setFeedback('')} aria-label="Dismiss message">×</button></div>}

            <section className="dashboard-stats-grid" aria-label="Player activity summary">
              <DashboardStatCard icon={Eye} label="Profile views" value="284" note="↑ 18% this week · demo" tone="green" />
              <DashboardStatCard icon={Star} label="Club interest" value="12" note="Sample club profile views" tone="gold" />
              <DashboardStatCard icon={Users} label="Connection requests" value={incomingRequests.length} note="Sample requests to review" tone="blue" />
              <DashboardStatCard icon={Bookmark} label="Saved opportunities" value={savedOpportunityIds.length} note="Keep track of roles" tone="purple" />
            </section>

            <section className="dashboard-section" id="profile">
              <DashboardSectionHeading
                kicker="YOUR PLAYER PROFILE"
                title="Profile overview"
                action={<button type="button" className="dashboard-text-action" onClick={() => setEditorOpen(true)}>Edit profile <ChevronRight size={15} /></button>}
              />
              <div className="dashboard-profile-grid">
                <article className="dashboard-card dashboard-player-summary">
                  <div className="dashboard-player-summary-heading"><img src={profile.image} alt="" /><div><span className="dashboard-overline">PLAYER PROFILE</span><h3>{profile.name}</h3><span>{profile.position} · {profile.age} years</span></div></div>
                  <p>{profile.introduction}</p>
                  <div className="dashboard-detail-pills"><span><MapPin size={13} />{profile.nationality}</span><span><Activity size={13} />{profile.preferredFoot} foot</span></div>
                  <Link to={`/discover/${profile.id}`} className="dashboard-card-link">View sample directory profile <ArrowRight size={14} /></Link>
                  <span className="dashboard-fine-print">Directory profile is sample data and is not changed by this local editor.</span>
                </article>
                <article className="dashboard-card dashboard-performance-card">
                  <div className="dashboard-card-title"><span className="dashboard-card-icon"><Activity size={17} /></span><div><span className="dashboard-overline">SAMPLE SEASON</span><h3>Performance</h3></div></div>
                  <div className="dashboard-performance-grid">
                    <div><strong>{profile.stats.appearances}</strong><span>Appearances</span></div>
                    <div><strong>{profile.stats.goals}</strong><span>Goals</span></div>
                    <div><strong>{profile.stats.assists}</strong><span>Assists</span></div>
                    <div><strong>{profile.stats.cleanSheets}</strong><span>Clean sheets</span></div>
                  </div>
                  <p>Illustrative statistics only — not official records.</p>
                </article>
              </div>
              <div className="dashboard-profile-details-grid">
                <article className="dashboard-card">
                  <span className="dashboard-overline">FOOTBALL EXPERIENCE</span><h3>Career history</h3>
                  <div className="dashboard-career-list">
                    {profile.careerHistory.map(item => (
                      <div className="dashboard-career-item" key={`${item.club}-${item.period}`}><span className="dashboard-career-dot" /><div><small>{item.period}</small><strong>{item.club}</strong><span>{item.role}</span></div></div>
                    ))}
                    {!profile.careerHistory.length && <p className="dashboard-empty-copy">Add career history from Edit profile.</p>}
                  </div>
                </article>
                <article className="dashboard-card">
                  <span className="dashboard-overline">MILESTONES &amp; MEDIA</span><h3>Achievements and highlights</h3>
                  {profile.achievements.length ? (
                    <ul className="dashboard-achievement-list">{profile.achievements.map(achievement => <li key={achievement}><CheckCircle2 size={15} />{achievement}</li>)}</ul>
                  ) : <p className="dashboard-empty-copy">Add achievements from Edit profile.</p>}
                  <div className="dashboard-highlights-note"><Video size={16} /><span>{profile.videoHighlights || 'No video highlights added yet.'}</span></div>
                  <small className="dashboard-fine-print">Highlight links are stored as demo text and are not uploaded or played.</small>
                </article>
              </div>
              <DashboardAccessAction onClick={() => navigateSection('overview')} title="Visit the Player Dashboard" description="Return to your dashboard overview." />
            </section>

            <section className="dashboard-section" id="discover">
              <DashboardSectionHeading
                kicker="NEXT STEP"
                title="Opportunities for you"
                action={<Link className="dashboard-text-action" to="/clubs#opportunities">All opportunities <ArrowRight size={15} /></Link>}
              />
              <div className="dashboard-opportunities-grid">
                {recommendedOpportunities.map(opportunity => {
                  const club = clubById[opportunity.clubId]
                  if (!club) return null
                  return (
                    <DashboardOpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      club={club}
                      saved={savedOpportunityIds.includes(opportunity.id)}
                      applicationStatus={applicationStatuses[opportunity.id]}
                      onToggleSave={id => toggleId(setSavedOpportunityIds, id)}
                      onApply={setApplyingOpportunity}
                    />
                  )
                })}
              </div>
              <div className="dashboard-recommended-clubs">
                <div className="dashboard-subsection-heading"><span className="dashboard-overline">CLUBS TO EXPLORE</span><Link to="/clubs">Browse clubs <ArrowRight size={14} /></Link></div>
                <div className="dashboard-club-row">
                  {clubProfiles.slice(0, 3).map(club => (
                    <Link to={`/clubs/${club.id}`} className="dashboard-club-chip" key={club.id}>
                      <ClubLogo club={club} size="small" /><span><strong>{club.name}</strong><small>{club.country} · {club.category}</small></span><ChevronRight size={15} />
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="dashboard-section" id="applications">
              <DashboardSectionHeading
                kicker="RECRUITMENT TRACKER"
                title="My applications"
                action={<Link className="dashboard-text-action" to="/clubs#opportunities">Find opportunities <ArrowRight size={15} /></Link>}
              />
              <div className="dashboard-card dashboard-applications-card">
                {demoApplications.map(application => {
                  const opportunity = opportunityById[application.opportunityId]
                  const club = opportunity && clubById[opportunity.clubId]
                  if (!opportunity || !club) return null
                  return (
                    <article className="dashboard-application-row" key={application.opportunityId}>
                      <ClubLogo club={club} size="small" />
                      <div className="dashboard-application-copy"><strong>{opportunity.title}</strong><span>{club.name} · {application.updated}</span></div>
                      <span className="dashboard-application-status"><Clock3 size={13} />{application.status}</span>
                      <Link to={`/opportunities/${opportunity.id}`} aria-label={`View ${opportunity.title} details`}><ArrowRight size={16} /></Link>
                    </article>
                  )
                })}
                <p className="dashboard-fine-print">Sample application statuses only. No application was sent or saved by this dashboard.</p>
              </div>
            </section>

            <section className="dashboard-section" id="saved-opportunities">
              <DashboardSectionHeading
                kicker="YOUR SHORTLIST"
                title="Saved opportunities"
                action={<Link className="dashboard-text-action" to="/clubs#opportunities">Discover more <ArrowRight size={15} /></Link>}
              />
              {savedOpportunities.length ? (
                <div className="dashboard-opportunities-grid">
                  {savedOpportunities.map(opportunity => {
                    const club = clubById[opportunity.clubId]
                    if (!club) return null
                    return <DashboardOpportunityCard key={opportunity.id} opportunity={opportunity} club={club} saved applicationStatus={applicationStatuses[opportunity.id]} onToggleSave={id => toggleId(setSavedOpportunityIds, id)} onApply={setApplyingOpportunity} />
                  })}
                </div>
              ) : (
                <div className="dashboard-empty-state"><Bookmark size={21} /><strong>No saved opportunities yet</strong><p>Save a role from the recommendations to keep it here.</p><Link to="/clubs#opportunities">Browse opportunities <ArrowRight size={14} /></Link></div>
              )}
            </section>

            <section className="dashboard-section" id="connections">
              <DashboardSectionHeading kicker="YOUR NETWORK" title="Connections and saved profiles" />
              <div className="dashboard-connections-grid">
                <article className="dashboard-card dashboard-connection-card">
                  <div className="dashboard-subsection-heading"><h3>Connection requests</h3><span className="dashboard-subsection-count">{requestedPeople.length}</span></div>
                  {requestedPeople.length ? requestedPeople.map(person => (
                    <ProfessionalMiniCard key={person.id} person={person} action={() => handleAcceptRequest(person.id)} actionLabel="Accept" actionIcon={Check} secondaryAction={{ label: 'Decline', onClick: () => handleRejectRequest(person.id) }} />
                  )) : <p className="dashboard-empty-copy">You’re all caught up on sample requests.</p>}
                </article>
                <article className="dashboard-card dashboard-connection-card">
                  <div className="dashboard-subsection-heading"><h3>Recent connections</h3><Link to="/professionals">Find people <ArrowRight size={13} /></Link></div>
                  {recentConnections.map(person => <ProfessionalMiniCard key={person.id} person={person} actionLabel="View" actionIcon={UserRound} profileLink />)}
                  {!recentConnections.length && <p className="dashboard-empty-copy">Accepted sample connections will appear here.</p>}
                </article>
                <article className="dashboard-card dashboard-connection-card">
                  <div className="dashboard-subsection-heading"><h3>Suggested professionals</h3><Link to="/professionals">Explore all <ArrowRight size={13} /></Link></div>
                  {suggestedPeople.map(person => (
                    <ProfessionalMiniCard key={person.id} person={person} action={() => handleSendRequest(person.id)} actionLabel={sentRequestIds.includes(person.id) ? 'Requested' : 'Connect'} actionIcon={sentRequestIds.includes(person.id) ? Check : Users} />
                  ))}
                  {!suggestedPeople.length && <p className="dashboard-empty-copy">No more sample suggestions right now.</p>}
                </article>
                <article className="dashboard-card dashboard-connection-card">
                  <div className="dashboard-subsection-heading"><h3>Saved professional profiles</h3><span className="dashboard-subsection-count">{savedPeople.length}</span></div>
                  {savedPeople.map(person => (
                    <ProfessionalMiniCard key={person.id} person={person} action={() => toggleId(setSavedProfessionalIds, person.id)} actionLabel="Unsave" actionIcon={Bookmark} />
                  ))}
                  <Link to="/professionals" className="dashboard-card-link">Discover football professionals <ArrowRight size={14} /></Link>
                </article>
              </div>
              <article className="dashboard-card dashboard-saved-players">
                <div className="dashboard-subsection-heading"><h3>Saved players</h3><Link to="/discover">Discover players <ArrowRight size={13} /></Link></div>
                <div className="dashboard-saved-player-grid">
                  {savedPlayers.map(player => <PlayerMiniCard key={player.id} player={player} saved onToggleSave={id => toggleId(setSavedPlayerIds, id)} />)}
                  {!savedPlayers.length && <p className="dashboard-empty-copy">Save players from discovery to build a shortlist.</p>}
                </div>
              </article>
            </section>

            <section className="dashboard-section dashboard-lower-grid">
              <article className="dashboard-card dashboard-notifications-card" id="notifications">
                <DashboardSectionHeading
                  kicker="STAY IN THE LOOP"
                  title="Notifications"
                  action={<button type="button" className="dashboard-inline-button" onClick={markAllNotificationsRead} disabled={!unreadCount}>Mark all read</button>}
                />
                <div className="dashboard-notification-list">
                  {notifications.map(({ id, title, detail, time, read, icon: Icon }) => (
                    <article className={read ? 'dashboard-notification read' : 'dashboard-notification'} key={id}>
                      <span className="dashboard-notification-icon"><Icon size={16} /></span>
                      <div><strong>{title}</strong><p>{detail}</p><small>{time}</small></div>
                      {!read && <button type="button" onClick={() => markNotificationRead(id)} aria-label={`Mark ${title} as read`}>Mark read</button>}
                    </article>
                  ))}
                </div>
              </article>
              <article className="dashboard-card dashboard-activity-card">
                <DashboardSectionHeading kicker="YOUR RECENT ACTIVITY" title="A little momentum." />
                <RecentActivity />
                <Link to="/community" className="dashboard-card-link">Visit the football community <ArrowRight size={14} /></Link>
              </article>
            </section>

            <section className="dashboard-section dashboard-lower-grid">
              <article className="dashboard-card dashboard-message-card" id="messages">
                <span className="dashboard-overline">MESSAGES</span><h3>Keep the conversation going.</h3>
                <p>Messaging is not available in this frontend demo. You can still discover professionals and send sample connection requests.</p>
                <Link to="/professionals" className="dashboard-card-link">Explore professionals <ArrowRight size={14} /></Link>
              </article>
              <article className="dashboard-card dashboard-settings-card" id="settings">
                <span className="dashboard-overline">PREFERENCES</span><h3>Settings</h3>
                <label className="dashboard-toggle-setting"><span><strong>Profile visible in discovery</strong><small>Local display preference only</small></span><input type="checkbox" checked={profileVisibility} onChange={event => setProfileVisibility(event.target.checked)} /></label>
                <label className="dashboard-toggle-setting"><span><strong>Demo notifications</strong><small>Controls sample notification preference</small></span><input type="checkbox" checked={emailNotifications} onChange={event => setEmailNotifications(event.target.checked)} /></label>
                <p className="dashboard-fine-print">Settings are not saved to an account or server.</p>
              </article>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      {editorOpen && <PlayerProfileEditorModal profile={profile} onSave={handleSaveProfile} onClose={() => setEditorOpen(false)} />}
      {applyingOpportunity && <ApplyDemoModal opportunityTitle={applyingOpportunity.title} onClose={() => setApplyingOpportunity(null)} />}
    </>
  )
}
