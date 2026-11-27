import { useMemo, useState } from 'react'
import {
  ArrowRight, Bell, Bookmark, BookmarkCheck, Briefcase,
  Building2, CalendarDays, Check, CheckCircle2, Clock3, Eye, FileText,
  GraduationCap, Handshake, Home, LogOut, MapPin, MessageCircle, Pencil,
  Search, Send, Settings, Shield, Star, Target, Users, X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClubLogo from '../components/ClubLogo'
import DashboardAccessAction from '../components/DashboardAccessAction'
import CoachProfileEditorModal from '../components/CoachProfileEditorModal'
import clubProfiles from '../data/clubProfiles'
import professionals from '../data/professionals'
import {
  coachLevels, coachOpportunities, initialCoachActivity,
  initialCoachApplications, initialCoachClubRequestIds,
  initialCoachConnectedClubIds, initialCoachConnectedProfessionalIds,
  initialCoachConnectionRequestIds, initialCoachMessages,
  initialCoachNotifications, initialCoachProfile,
  initialCoachSavedOpportunityIds,
} from '../data/coachDashboardData'

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'profile', label: 'My Profile', icon: Users },
  { id: 'experience', label: 'Coaching Experience', icon: GraduationCap },
  { id: 'opportunities', label: 'Coaching Opportunities', icon: Briefcase },
  { id: 'applications', label: 'My Applications', icon: FileText },
  { id: 'network', label: 'Professional Network', icon: Handshake },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function getProfileCompletion(profile) {
  const fields = [
    profile.name, profile.country, profile.location, profile.experience,
    profile.qualifications.length, profile.specialization, profile.currentClub,
    profile.bio, profile.expertise.length, profile.image,
  ]
  return Math.round(fields.filter(Boolean).length / fields.length * 100)
}

function CoachSidebar({ profile, activeSection, onNavigate, onLogout, unreadCount }) {
  return (
    <aside className="club-dashboard-sidebar coach-dashboard-sidebar">
      <div className="club-dashboard-sidebar-heading">
        <img src={profile.image} alt="" />
        <div><strong>COACH HUB</strong><small>{profile.name.toUpperCase()}</small></div>
      </div>
      <nav className="club-dashboard-sidebar-nav" aria-label="Coach dashboard navigation">
        {sidebarItems.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={activeSection === id ? 'club-dashboard-nav-link active' : 'club-dashboard-nav-link'} onClick={() => onNavigate(id)} aria-current={activeSection === id ? 'page' : undefined}>
            <Icon size={16} /><span>{label}</span>
            {id === 'notifications' && unreadCount > 0 && <span className="club-dashboard-nav-count">{unreadCount}</span>}
          </button>
        ))}
        <button type="button" className="club-dashboard-nav-link club-dashboard-logout" onClick={onLogout}><LogOut size={16} /><span>Logout</span></button>
      </nav>
      <div className="club-dashboard-demo-note"><Shield size={14} /><span>Sample coach workspace. Changes are temporary.</span></div>
    </aside>
  )
}

function CoachSectionHeading({ kicker, title, action }) {
  return (
    <div className="club-dashboard-section-heading">
      <div><span className="kicker">{kicker}</span><h2>{title}</h2></div>
      {action}
    </div>
  )
}

function CoachStatCard({ icon: Icon, label, value, note, tone }) {
  return (
    <article className={`club-dashboard-stat-card ${tone}`}>
      <span className="club-dashboard-stat-icon"><Icon size={18} /></span>
      <span className="club-dashboard-stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}

function CoachOpportunityCard({ opportunity, club, saved, application, onToggleSave, onApply }) {
  return (
    <article className="coach-opportunity-card">
      <header>
        <div className="coach-opportunity-club"><ClubLogo club={club} size="small" /><span>{club.name}</span></div>
        <span className={`coach-opportunity-status ${application ? 'has-application' : 'is-open'}`}>{application?.status || 'Open'}</span>
      </header>
      <h3>{opportunity.title}</h3>
      <div className="coach-opportunity-meta">
        <span><GraduationCap size={13} />{opportunity.team}</span>
        <span><MapPin size={13} />{opportunity.location}, {opportunity.country}</span>
        <span><CalendarDays size={13} />Closes {opportunity.deadline}</span>
      </div>
      <div className="coach-opportunity-level">{opportunity.level} level</div>
      <p>{opportunity.description}</p>
      <details className="coach-opportunity-details">
        <summary>View role requirements</summary>
        <p>{opportunity.requirements}</p>
      </details>
      <footer>
        <button type="button" className="coach-save-button" onClick={() => onToggleSave(opportunity.id)} aria-pressed={saved}>
          {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}{saved ? 'Saved' : 'Save'}
        </button>
        <Link to={`/clubs/${club.id}#club-opportunities`}>Club details <ArrowRight size={13} /></Link>
        <button type="button" className="coach-apply-button" onClick={() => onApply(opportunity)} disabled={Boolean(application)}>{application ? 'Application sent' : 'Apply (demo)'}</button>
      </footer>
    </article>
  )
}

function CoachNetworkCard({ entity, kind, status, sent, onConnect, onAccept, onDecline }) {
  const isClub = kind === 'club'
  const profileLink = isClub ? `/clubs/${entity.id}` : `/professionals/${entity.id}`
  return (
    <article className="coach-network-card">
      <Link to={profileLink} className="coach-network-avatar" aria-label={`View ${entity.name}`}>
        {isClub ? <ClubLogo club={entity} size="small" /> : <img src={entity.image} alt="" loading="lazy" />}
      </Link>
      <div className="coach-network-copy">
        <Link to={profileLink}>{entity.name}</Link>
        <span>{isClub ? `${entity.country} · ${entity.league}` : `${entity.role} · ${entity.country}`}</span>
      </div>
      <div className="coach-network-actions">
        {status === 'connected'
          ? <span className="coach-network-connected"><CheckCircle2 size={13} />Connected</span>
          : status === 'pending'
            ? <><button type="button" className="coach-network-accept" onClick={onAccept}><Check size={13} />Accept</button><button type="button" className="coach-network-decline" onClick={onDecline}>Decline</button></>
            : <button type="button" className="coach-network-connect" onClick={onConnect} disabled={sent}>{sent ? 'Request sent' : 'Connect'}</button>}
      </div>
    </article>
  )
}

function CoachActivityItem({ item }) {
  const Icon = item.type === 'application' ? FileText : item.type === 'network' ? Handshake : Eye
  return (
    <article className="coach-activity-item">
      <span><Icon size={15} /></span>
      <div><strong>{item.title}</strong><p>{item.detail}</p><small>{item.time}</small></div>
    </article>
  )
}

export default function CoachDashboardPage() {
  const [profile, setProfile] = useState(initialCoachProfile)
  const [applications, setApplications] = useState(initialCoachApplications)
  const [savedOpportunityIds, setSavedOpportunityIds] = useState(initialCoachSavedOpportunityIds)
  const [connectedClubIds, setConnectedClubIds] = useState(initialCoachConnectedClubIds)
  const [clubRequestIds, setClubRequestIds] = useState(initialCoachClubRequestIds)
  const [connectedProfessionalIds, setConnectedProfessionalIds] = useState(initialCoachConnectedProfessionalIds)
  const [connectionRequestIds, setConnectionRequestIds] = useState(initialCoachConnectionRequestIds)
  const [sentClubIds, setSentClubIds] = useState([])
  const [sentProfessionalIds, setSentProfessionalIds] = useState([])
  const [notifications, setNotifications] = useState(initialCoachNotifications)
  const [messages, setMessages] = useState(initialCoachMessages)
  const [activity, setActivity] = useState(initialCoachActivity)
  const [activeSection, setActiveSection] = useState('overview')
  const [opportunitySearch, setOpportunitySearch] = useState('')
  const [opportunityCountry, setOpportunityCountry] = useState('')
  const [opportunityLocation, setOpportunityLocation] = useState('')
  const [opportunityLevel, setOpportunityLevel] = useState('')
  const [profileEditorOpen, setProfileEditorOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [selectedMessageId, setSelectedMessageId] = useState(initialCoachMessages[0]?.id || '')
  const [messageDraft, setMessageDraft] = useState('')
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const professionalsById = useMemo(() => Object.fromEntries(professionals.map(person => [person.id, person])), [])
  const clubsById = useMemo(() => Object.fromEntries(clubProfiles.map(club => [club.id, club])), [])
  const unreadCount = notifications.filter(notification => !notification.read).length
  const completion = getProfileCompletion(profile)
  const connectedProfessionals = connectedProfessionalIds.map(id => professionalsById[id]).filter(Boolean)
  const requestedProfessionals = connectionRequestIds.map(id => professionalsById[id]).filter(Boolean)
  const connectedClubs = connectedClubIds.map(id => clubsById[id]).filter(Boolean)
  const requestedClubs = clubRequestIds.map(id => clubsById[id]).filter(Boolean)
  const suggestedProfessionals = professionals.filter(person =>
    person.id !== profile.id &&
    !connectedProfessionalIds.includes(person.id) &&
    !connectionRequestIds.includes(person.id)
  )
  const suggestedClubs = clubProfiles.filter(club =>
    !connectedClubIds.includes(club.id) && !clubRequestIds.includes(club.id)
  )
  const displayedOpportunities = coachOpportunities.filter(opportunity => {
    const club = clubsById[opportunity.clubId]
    const query = opportunitySearch.trim().toLowerCase()
    const matchesQuery = !query || [opportunity.title, opportunity.team, club?.name, opportunity.country].some(value => value.toLowerCase().includes(query))
    return matchesQuery &&
      (!opportunityCountry || opportunity.country === opportunityCountry) &&
      (!opportunityLocation || opportunity.location.toLowerCase().includes(opportunityLocation.trim().toLowerCase())) &&
      (!opportunityLevel || opportunity.level === opportunityLevel)
  })
  const selectedMessage = messages.find(message => message.id === selectedMessageId)
  const selectedContact = selectedMessage ? professionalsById[selectedMessage.professionalId] : null
  const applicationById = Object.fromEntries(applications.map(application => [application.opportunityId, application]))
  const currentProfileViews = 386
  const pendingRequestCount = clubRequestIds.length + connectionRequestIds.length

  function showFeedback(message) {
    setFeedback(message)
  }

  function pushActivity(item) {
    setActivity(current => [{ ...item, id: `coach-activity-${Date.now()}`, time: 'Just now' }, ...current].slice(0, 7))
  }

  function navigateSection(section) {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function saveCoachProfile(updatedProfile) {
    setProfile(updatedProfile)
    setProfileEditorOpen(false)
    showFeedback('Coach profile updated for this demo session only.')
  }

  function toggleSavedOpportunity(opportunityId) {
    const saved = savedOpportunityIds.includes(opportunityId)
    setSavedOpportunityIds(current => saved ? current.filter(id => id !== opportunityId) : [...current, opportunityId])
    showFeedback(saved ? 'Opportunity removed from your saved list.' : 'Opportunity saved in this demo workspace.')
  }

  function applyToOpportunity(opportunity) {
    if (applicationById[opportunity.id]) {
      showFeedback('You already have a sample application for this opportunity.')
      return
    }
    setApplications(current => [{ opportunityId: opportunity.id, status: 'Submitted', submittedAt: 'Today' }, ...current])
    pushActivity({ type: 'application', title: 'Coaching application submitted', detail: `${opportunity.title} · ${clubsById[opportunity.clubId]?.name}` })
    showFeedback(`Demo application submitted for ${opportunity.title}. No information was sent to the club.`)
  }

  function acceptProfessionalRequest(person) {
    setConnectionRequestIds(current => current.filter(id => id !== person.id))
    setConnectedProfessionalIds(current => [...current, person.id])
    showFeedback(`${person.name} added to your demo network.`)
    pushActivity({ type: 'network', title: 'Professional connection accepted', detail: `${person.name} · ${person.role}` })
  }

  function declineProfessionalRequest(person) {
    setConnectionRequestIds(current => current.filter(id => id !== person.id))
    showFeedback(`${person.name}'s sample request was declined.`)
  }

  function acceptClubRequest(club) {
    setClubRequestIds(current => current.filter(id => id !== club.id))
    setConnectedClubIds(current => [...current, club.id])
    showFeedback(`${club.name} added to your demo network.`)
  }

  function declineClubRequest(club) {
    setClubRequestIds(current => current.filter(id => id !== club.id))
    showFeedback(`${club.name}'s sample request was declined.`)
  }

  function requestProfessionalConnection(person) {
    if (sentProfessionalIds.includes(person.id)) return
    setSentProfessionalIds(current => [...current, person.id])
    showFeedback(`Connection request sent to ${person.name} in this demo.`)
  }

  function requestClubConnection(club) {
    if (sentClubIds.includes(club.id)) return
    setSentClubIds(current => [...current, club.id])
    showFeedback(`Connection request sent to ${club.name} in this demo.`)
  }

  function markAllNotificationsRead() {
    setNotifications(current => current.map(notification => ({ ...notification, read: true })))
    showFeedback('All sample notifications marked as read.')
  }

  function selectMessage(message) {
    setSelectedMessageId(message.id)
    setMessages(current => current.map(item => item.id === message.id ? { ...item, unread: false } : item))
  }

  function sendDemoMessage(event) {
    event.preventDefault()
    const content = messageDraft.trim()
    if (!content || !selectedMessage) return
    setMessages(current => current.map(message => message.id === selectedMessage.id
      ? { ...message, text: `You: ${content}`, time: 'Just now', unread: false }
      : message))
    setMessageDraft('')
    showFeedback('Sample message updated locally. Messaging is not connected.')
  }

  function clearOpportunityFilters() {
    setOpportunitySearch('')
    setOpportunityCountry('')
    setOpportunityLocation('')
    setOpportunityLevel('')
  }

  function handleLogout() {
    showFeedback('This is a sample coach workspace; there is no signed-in session to end.')
  }

  const hasOpportunityFilters = Boolean(opportunitySearch || opportunityCountry || opportunityLocation || opportunityLevel)

  return (
    <>
      <Navbar />
      <main className="club-dashboard-page coach-dashboard-page">
        <div className="club-dashboard-layout coach-dashboard-layout">
          <CoachSidebar profile={profile} activeSection={activeSection} onNavigate={navigateSection} onLogout={handleLogout} unreadCount={unreadCount} />

          <div className="club-dashboard-content coach-dashboard-content">
            {feedback && (
              <div className="club-dashboard-feedback" role="status" aria-live="polite">
                <CheckCircle2 size={16} /><span>{feedback}</span>
                <button type="button" onClick={() => setFeedback('')} aria-label="Dismiss confirmation"><X size={15} /></button>
              </div>
            )}

            <section className="club-dashboard-hero coach-dashboard-hero" id="overview">
              <div className="coach-dashboard-hero-copy">
                <span className="coach-dashboard-eyebrow"><span /> COACHING &amp; DEVELOPMENT · DEMO WORKSPACE</span>
                <h1>Welcome back,<br /><em>{profile.name}</em></h1>
                <p>Develop your coaching career, explore opportunities and build meaningful relationships across football.</p>
                <div className="coach-dashboard-hero-meta"><span><MapPin size={14} />{profile.location}</span><span><GraduationCap size={14} />{profile.specialization}</span></div>
                <div className="coach-dashboard-quick-actions">
                  <button type="button" className="button button-primary" onClick={() => navigateSection('opportunities')}><Search size={15} />Explore vacancies</button>
                  <button type="button" className="coach-dashboard-hero-secondary" onClick={() => navigateSection('network')}>Grow your network <ArrowRight size={14} /></button>
                </div>
              </div>
              <div className="coach-dashboard-hero-aside">
                <img className="coach-dashboard-portrait" src={profile.image} alt={`${profile.name} profile`} />
                <div className="club-dashboard-completion">
                  <span className="club-dashboard-completion-ring" style={{ '--club-completion': `${completion}%` }} role="progressbar" aria-label="Coach profile completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completion}><span>{completion}%</span></span>
                  <div><strong>Profile completeness</strong><small>{completion === 100 ? 'Your coach profile is complete.' : 'Add details to improve your profile.'}</small></div>
                </div>
                <button type="button" className="coach-dashboard-edit-profile" onClick={() => setProfileEditorOpen(true)}><Pencil size={14} />Edit coach profile</button>
              </div>
            </section>

            <section className="club-dashboard-stats-grid coach-dashboard-stats-grid" aria-label="Coaching overview">
              <CoachStatCard icon={Clock3} label="Coaching experience" value={`${profile.experience} yrs`} note="Years in football coaching" tone="stat-green" />
              <CoachStatCard icon={Handshake} label="Professional connections" value={connectedClubs.length + connectedProfessionals.length} note="Clubs and professionals" tone="stat-purple" />
              <CoachStatCard icon={Briefcase} label="Available opportunities" value={coachOpportunities.length} note="Sample coaching vacancies" tone="stat-blue" />
              <CoachStatCard icon={FileText} label="Applications submitted" value={applications.length} note="Tracked in this demo" tone="stat-orange" />
              <CoachStatCard icon={Eye} label="Profile views" value={currentProfileViews} note="Fictional sample activity" tone="stat-navy" />
              <CoachStatCard icon={Users} label="Pending requests" value={pendingRequestCount} note="Awaiting your response" tone="stat-red" />
            </section>

            <section className="club-dashboard-section coach-dashboard-section" id="profile">
              <CoachSectionHeading kicker="COACH PROFILE" title="Professional summary" action={<button type="button" className="club-dashboard-text-button" onClick={() => setProfileEditorOpen(true)}>Edit profile <Pencil size={14} /></button>} />
              <div className="coach-profile-summary">
                <img src={profile.image} alt={`${profile.name} profile`} />
                <div className="coach-profile-summary-main">
                  <div className="coach-profile-title"><div><h3>{profile.name}</h3><span>{profile.specialization}</span></div><span className="coach-experience-badge">{profile.experience} years' experience</span></div>
                  <div className="coach-profile-meta"><span><MapPin size={14} />{profile.location} · {profile.country}</span><span><Building2 size={14} />{profile.currentClub}</span></div>
                  <p>{profile.bio}</p>
                  <div className="coach-profile-tags"><strong>Coaching licences</strong><div>{profile.qualifications.map(item => <span key={item}>{item}</span>)}</div></div>
                </div>
                <div className="coach-profile-progress-card"><span>PROFILE COMPLETE</span><strong>{completion}%</strong><div><i style={{ width: `${completion}%` }} /></div><small>Keep your experience, licences and focus areas current.</small></div>
              </div>
              <DashboardAccessAction onClick={() => navigateSection('overview')} title="Visit the Coach Dashboard" description="Return to your dashboard overview." />
            </section>

            <section className="club-dashboard-section coach-dashboard-section" id="experience">
              <CoachSectionHeading kicker="CAREER &amp; QUALIFICATIONS" title="Coaching experience" />
              <div className="coach-experience-layout">
                <div className="coach-career-history">
                  {profile.careerHistory.map((entry, index) => (
                    <article className="coach-career-entry" key={`${entry.club}-${entry.period}`}>
                      <span className="coach-career-marker">{index + 1}</span>
                      <div><span className="coach-career-period">{entry.period}</span><h3>{entry.position}</h3><strong>{entry.team} · {entry.club}</strong><p>{entry.highlight}</p></div>
                    </article>
                  ))}
                </div>
                <aside className="coach-experience-aside">
                  <div><h3><Star size={15} />Career achievements</h3><ul>{profile.achievements.map(item => <li key={item}>{item}</li>)}</ul></div>
                  <div><h3><GraduationCap size={15} />Qualifications</h3><ul>{profile.qualifications.map(item => <li key={item}>{item}</li>)}</ul></div>
                  <div><h3><Target size={15} />Areas of specialization</h3><div className="coach-specialization-tags">{profile.expertise.map(item => <span key={item}>{item}</span>)}</div></div>
                </aside>
              </div>
            </section>

            <section className="club-dashboard-section coach-dashboard-section" id="opportunities">
              <CoachSectionHeading kicker="COACHING CAREER" title="Coaching opportunities" action={<span className="club-dashboard-total-count">{coachOpportunities.length} sample vacancies</span>} />
              <div className="coach-opportunity-filters">
                <label className="club-dashboard-search-field"><Search size={15} /><span className="visually-hidden">Search coaching opportunities</span><input type="search" value={opportunitySearch} onChange={event => setOpportunitySearch(event.target.value)} placeholder="Search role, club or country..." /></label>
                <label><span>Country</span><select value={opportunityCountry} onChange={event => setOpportunityCountry(event.target.value)}><option value="">All countries</option>{[...new Set(coachOpportunities.map(item => item.country))].sort().map(country => <option key={country}>{country}</option>)}</select></label>
                <label><span>Location</span><input type="search" value={opportunityLocation} onChange={event => setOpportunityLocation(event.target.value)} placeholder="Search location..." /></label>
                <label><span>Coaching level</span><select value={opportunityLevel} onChange={event => setOpportunityLevel(event.target.value)}><option value="">All levels</option>{coachLevels.map(level => <option key={level}>{level}</option>)}</select></label>
                <button type="button" className="club-dashboard-clear-filters" onClick={clearOpportunityFilters} disabled={!hasOpportunityFilters}>Clear filters</button>
              </div>
              <div className="coach-opportunity-count">{displayedOpportunities.length} coaching opportunities <span>·</span> Fictional sample vacancies</div>
              {displayedOpportunities.length ? (
                <div className="coach-opportunity-grid">
                  {displayedOpportunities.map(opportunity => {
                    const club = clubsById[opportunity.clubId]
                    return <CoachOpportunityCard key={opportunity.id} opportunity={opportunity} club={club} saved={savedOpportunityIds.includes(opportunity.id)} application={applicationById[opportunity.id]} onToggleSave={toggleSavedOpportunity} onApply={applyToOpportunity} />
                  })}
                </div>
              ) : (
                <div className="club-dashboard-empty-state"><Search size={22} /><strong>No opportunities match these filters</strong><span>Change your search or clear the filters.</span><button type="button" className="club-dashboard-text-button" onClick={clearOpportunityFilters}>Clear filters <ArrowRight size={14} /></button></div>
              )}
            </section>

            <section className="club-dashboard-section coach-dashboard-section" id="applications">
              <CoachSectionHeading kicker="APPLICATION TRACKER" title="My applications" action={<span className="club-dashboard-total-count">{applications.length} tracked</span>} />
              {applications.length ? (
                <div className="coach-application-list">
                  {applications.map(application => {
                    const opportunity = coachOpportunities.find(item => item.id === application.opportunityId)
                    const club = opportunity && clubsById[opportunity.clubId]
                    if (!opportunity || !club) return null
                    return (
                      <article className="coach-application-card" key={application.opportunityId}>
                        <ClubLogo club={club} size="small" />
                        <div><strong>{opportunity.title}</strong><span>{club.name} · {opportunity.team}</span><small>Submitted {application.submittedAt}</small></div>
                        <span className={`coach-application-status ${application.status.toLowerCase().replaceAll(' ', '-')}`}>{application.status}</span>
                        <Link to={`/clubs/${club.id}#club-opportunities`}>View club <ArrowRight size={13} /></Link>
                      </article>
                    )
                  })}
                </div>
              ) : (
                <div className="club-dashboard-empty-state"><FileText size={22} /><strong>No applications yet</strong><span>Applications you submit in this demo will be tracked here.</span><button type="button" className="club-dashboard-text-button" onClick={() => navigateSection('opportunities')}>Browse coaching roles <ArrowRight size={14} /></button></div>
              )}
              <p className="coach-demo-disclaimer"><Shield size={14} /> Application statuses are fictional and are not sent to clubs.</p>
            </section>

            <section className="club-dashboard-section coach-dashboard-section" id="network">
              <CoachSectionHeading kicker="FOOTBALL RELATIONSHIPS" title="Professional network" action={<span className="club-dashboard-total-count">{connectedClubs.length + connectedProfessionals.length} connections</span>} />
              <div className="coach-network-group">
                <h3><Building2 size={15} />Connected clubs</h3>
                {connectedClubs.length ? <div className="coach-network-list">{connectedClubs.map(club => <CoachNetworkCard key={club.id} entity={club} kind="club" status="connected" />)}</div> : <p className="coach-network-empty">Your club connections will appear here.</p>}
              </div>
              <div className="coach-network-group">
                <h3><Handshake size={15} />Connected professionals</h3>
                {connectedProfessionals.length ? <div className="coach-network-list">{connectedProfessionals.map(person => <CoachNetworkCard key={person.id} entity={person} kind="professional" status="connected" />)}</div> : <p className="coach-network-empty">Your professional connections will appear here.</p>}
              </div>
              {(requestedClubs.length || requestedProfessionals.length) > 0 && (
                <div className="coach-network-group">
                  <h3><Users size={15} />Connection requests <span>{requestedClubs.length + requestedProfessionals.length}</span></h3>
                  <div className="coach-network-list">
                    {requestedClubs.map(club => <CoachNetworkCard key={club.id} entity={club} kind="club" status="pending" onAccept={() => acceptClubRequest(club)} onDecline={() => declineClubRequest(club)} />)}
                    {requestedProfessionals.map(person => <CoachNetworkCard key={person.id} entity={person} kind="professional" status="pending" onAccept={() => acceptProfessionalRequest(person)} onDecline={() => declineProfessionalRequest(person)} />)}
                  </div>
                </div>
              )}
              <div className="coach-network-group">
                <h3><Users size={15} />Suggested professionals</h3>
                {suggestedProfessionals.length ? <div className="coach-network-list">{suggestedProfessionals.map(person => <CoachNetworkCard key={person.id} entity={person} kind="professional" sent={sentProfessionalIds.includes(person.id)} onConnect={() => requestProfessionalConnection(person)} />)}</div> : <p className="coach-network-empty">You have reviewed all current professional suggestions.</p>}
              </div>
              <div className="coach-network-group">
                <h3><Building2 size={15} />Suggested clubs</h3>
                {suggestedClubs.length ? <div className="coach-network-list">{suggestedClubs.map(club => <CoachNetworkCard key={club.id} entity={club} kind="club" sent={sentClubIds.includes(club.id)} onConnect={() => requestClubConnection(club)} />)}</div> : <p className="coach-network-empty">You have reviewed all current club suggestions.</p>}
              </div>
            </section>

            <section className="club-dashboard-section coach-dashboard-section" id="messages">
              <CoachSectionHeading kicker="SAMPLE COMMUNICATIONS" title="Messages" />
              <div className="coach-messages-layout">
                <div className="coach-message-list" aria-label="Recent conversations">
                  {messages.map(message => {
                    const contact = professionalsById[message.professionalId]
                    if (!contact) return null
                    return (
                      <button type="button" key={message.id} className={selectedMessageId === message.id ? 'coach-message-preview active' : 'coach-message-preview'} onClick={() => selectMessage(message)}>
                        <img src={contact.image} alt="" />
                        <span><strong>{contact.name}</strong><small>{message.text}</small><small>{message.time}</small></span>
                        {message.unread && <i aria-label="Unread message" />}
                      </button>
                    )
                  })}
                </div>
                {selectedMessage && selectedContact ? (
                  <div className="coach-message-detail">
                    <div className="coach-message-contact"><img src={selectedContact.image} alt="" /><span><strong>{selectedContact.name}</strong><small>{selectedContact.role} · demo conversation</small></span></div>
                    <p className="coach-message-bubble">{selectedMessage.text}</p>
                    <form onSubmit={sendDemoMessage}><label className="visually-hidden" htmlFor="coach-message-draft">Write a sample message</label><textarea id="coach-message-draft" rows="2" value={messageDraft} onChange={event => setMessageDraft(event.target.value)} placeholder="Write a sample message..." /><button className="button button-primary" type="submit" disabled={!messageDraft.trim()}><Send size={14} />Send demo</button></form>
                    <small className="coach-demo-disclaimer"><Shield size={13} />This is a local demonstration; real messaging is not connected.</small>
                  </div>
                ) : (
                  <div className="club-dashboard-empty-state"><MessageCircle size={22} /><strong>No conversations yet</strong><span>Demo conversation previews will appear here.</span></div>
                )}
              </div>
            </section>

            <section className="club-dashboard-section coach-dashboard-section" id="notifications">
              <CoachSectionHeading kicker="ACCOUNT UPDATES" title="Notifications" action={<button type="button" className="club-dashboard-text-button" onClick={markAllNotificationsRead} disabled={!unreadCount}>Mark all as read <Check size={14} /></button>} />
              <div className="coach-notification-list">
                {notifications.length ? notifications.map(notification => (
                  <article className={notification.read ? 'coach-notification read' : 'coach-notification'} key={notification.id}>
                    <span><Bell size={15} /></span><div><strong>{notification.title}</strong><p>{notification.detail}</p><small>{notification.time}</small></div>
                    {!notification.read && <button type="button" onClick={() => setNotifications(current => current.map(item => item.id === notification.id ? { ...item, read: true } : item))}>Mark read</button>}
                  </article>
                )) : <div className="club-dashboard-empty-state"><Bell size={22} /><strong>You’re all caught up</strong><span>New sample notifications will appear here.</span></div>}
              </div>
            </section>

            <section className="club-dashboard-section coach-dashboard-section" id="settings">
              <CoachSectionHeading kicker="WORKSPACE PREFERENCES" title="Settings" />
              <div className="coach-settings-list">
                <label><span><strong>Coach profile visibility</strong><small>Allow sample clubs and professionals to discover this profile.</small></span><input type="checkbox" checked={profileVisibility} onChange={event => setProfileVisibility(event.target.checked)} /></label>
                <label><span><strong>Email notification previews</strong><small>Show a frontend demonstration of opportunity and connection updates.</small></span><input type="checkbox" checked={emailNotifications} onChange={event => setEmailNotifications(event.target.checked)} /></label>
              </div>
              <p className="coach-demo-disclaimer"><Shield size={14} />Settings only affect this temporary browser demonstration.</p>
            </section>

            <section className="club-dashboard-section coach-dashboard-section coach-activity-section" aria-label="Recent coach activity">
              <CoachSectionHeading kicker="RECENT ACTIVITY" title="Your coaching activity" action={<button type="button" className="club-dashboard-text-button" onClick={() => navigateSection('notifications')}>View notifications <ArrowRight size={14} /></button>} />
              <div className="coach-activity-list">{activity.map(item => <CoachActivityItem key={item.id} item={item} />)}</div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      {profileEditorOpen && <CoachProfileEditorModal profile={profile} onSave={saveCoachProfile} onClose={() => setProfileEditorOpen(false)} />}
    </>
  )
}

