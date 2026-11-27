import { useMemo, useState } from 'react'
import {
  ArrowRight, Bell, Bookmark, Building2, Check, CheckCircle2, Clock3,
  Compass, Eye, FilePlus2, FileText, Filter, Handshake, Home, LogOut,
  MapPin, MessageCircle, Pencil, Plus, Search, Settings, Shield, Users, X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DashboardAccessAction from '../components/DashboardAccessAction'
import ClubLogo from '../components/ClubLogo'
import ClubOpportunityCard from '../components/ClubOpportunityCard'
import ClubOpportunityEditorModal from '../components/ClubOpportunityEditorModal'
import ClubProfileEditorModal from '../components/ClubProfileEditorModal'
import clubProfiles from '../data/clubProfiles'
import playerProfiles from '../data/playerProfiles'
import professionals from '../data/professionals'
import {
  clubDashboardActivity, initialClubApplications, initialClubConnectionRequests,
  initialClubNotifications, initialClubOpportunities, initialClubProfessionalIds,
  initialClubShortlistIds,
} from '../data/clubDashboardData'

const dashboardClub = clubProfiles.find(club => club.id === 'northbridge-fc')
const applicationStatuses = ['New', 'Under review', 'Shortlisted', 'Accepted', 'Rejected']
const ageRanges = ['16–18', '19–21', '22–24', '25+']

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'profile', label: 'Club Profile', icon: Building2 },
  { id: 'discover', label: 'Discover Players', icon: Compass },
  { id: 'recruitment', label: 'Recruitment Opportunities', icon: FilePlus2 },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'shortlist', label: 'Player Shortlist', icon: Bookmark },
  { id: 'network', label: 'Professional Network', icon: Users },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function getAgeRange(age) {
  if (age <= 18) return '16–18'
  if (age <= 21) return '19–21'
  if (age <= 24) return '22–24'
  return '25+'
}

function getProfileCompletion(club) {
  const fields = [club.name, club.country, club.location, club.league, club.description, club.history, club.website, club.coverImage]
  return Math.round(fields.filter(Boolean).length / fields.length * 100)
}

function ClubDashboardSidebar({ activeSection, onNavigate, onLogout, unreadCount }) {
  return (
    <aside className="club-dashboard-sidebar">
      <div className="club-dashboard-sidebar-heading">
        <ClubLogo club={dashboardClub} />
        <div><strong>CLUB HUB</strong><small>YOUR CLUB WORKSPACE</small></div>
      </div>
      <nav className="club-dashboard-sidebar-nav" aria-label="Club dashboard navigation">
        {sidebarItems.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={activeSection === id ? 'club-dashboard-nav-link active' : 'club-dashboard-nav-link'} onClick={() => onNavigate(id)} aria-current={activeSection === id ? 'page' : undefined}>
            <Icon size={16} /><span>{label}</span>
            {id === 'notifications' && unreadCount > 0 && <span className="club-dashboard-nav-count">{unreadCount}</span>}
          </button>
        ))}
        <button type="button" className="club-dashboard-nav-link club-dashboard-logout" onClick={onLogout}><LogOut size={16} /><span>Logout</span></button>
      </nav>
      <div className="club-dashboard-demo-note"><Shield size={14} /><span>Fictional club workspace. Changes are temporary.</span></div>
    </aside>
  )
}

function ClubDashboardSectionHeading({ kicker, title, action }) {
  return (
    <div className="club-dashboard-section-heading">
      <div><span className="kicker">{kicker}</span><h2>{title}</h2></div>
      {action}
    </div>
  )
}

function ClubStatCard({ icon: Icon, label, value, note, tone }) {
  return (
    <article className={`club-dashboard-stat-card ${tone}`}>
      <span className="club-dashboard-stat-icon"><Icon size={18} /></span>
      <span className="club-dashboard-stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}

function ApplicantCard({ application, player, opportunity, isShortlisted, onToggleShortlist, onUpdateStatus, onFeedback }) {
  if (!player) return null

  return (
    <article className="club-applicant-card">
      <img src={player.image} alt="" loading="lazy" />
      <div className="club-applicant-main">
        <div className="club-applicant-name-row">
          <Link to={`/discover/${player.id}`}>{player.name}</Link>
          <span className={`club-application-status status-${application.status.toLowerCase().replace(/\s+/g, '-')}`}>{application.status}</span>
        </div>
        <p>{player.position} <span>·</span> {player.nationality}</p>
        <small>{player.club} · Applied {application.appliedAt}</small>
        <small className="club-applicant-for">For: {opportunity?.title || 'Club opportunity'}</small>
      </div>
      <div className="club-applicant-actions">
        <Link className="club-dashboard-secondary-button" to={`/discover/${player.id}`}>View profile</Link>
        <button type="button" className={isShortlisted ? 'club-dashboard-shortlist-button is-saved' : 'club-dashboard-shortlist-button'} onClick={() => onToggleShortlist(player)}>
          <Bookmark size={14} fill={isShortlisted ? 'currentColor' : 'none'} />{isShortlisted ? 'Shortlisted' : 'Shortlist'}
        </button>
        {application.status !== 'Under review' && application.status !== 'Accepted' && application.status !== 'Rejected' && (
          <button type="button" className="club-dashboard-review-button" onClick={() => {
            onUpdateStatus(application.id, 'Under review')
            onFeedback(`${player.name}'s application is now under review in this demo.`)
          }}>Mark under review</button>
        )}
        {application.status !== 'Accepted' && application.status !== 'Rejected' && (
          <>
            <button type="button" className="club-dashboard-accept-button" onClick={() => {
              onUpdateStatus(application.id, 'Accepted')
              onFeedback(`${player.name}'s application was marked accepted for this demo.`)
            }} aria-label={`Accept ${player.name}'s application`}><Check size={14} />Accept</button>
            <button type="button" className="club-dashboard-reject-button" onClick={() => {
              onUpdateStatus(application.id, 'Rejected')
              onFeedback(`${player.name}'s application was marked rejected for this demo.`)
            }} aria-label={`Reject ${player.name}'s application`}>Reject</button>
          </>
        )}
      </div>
    </article>
  )
}

function ProfessionalCard({ person, connected = false, pending = false, sent = false, onAccept, onReject, onConnect }) {
  return (
    <article className="club-professional-card">
      <img src={person.image} alt="" loading="lazy" />
      <div className="club-professional-copy">
        <strong><Link to={`/professionals/${person.id}`}>{person.name}</Link>{person.verified && <CheckCircle2 size={13} aria-label="Demonstration profile badge" />}</strong>
        <span>{person.role} · {person.country}</span>
        <small>{person.organization}</small>
      </div>
      {pending ? (
        <div className="club-network-actions">
          <button type="button" className="club-dashboard-accept-button" onClick={onAccept}><Check size={14} />Accept</button>
          <button type="button" className="club-dashboard-reject-button" onClick={onReject}>Decline</button>
        </div>
      ) : connected ? (
        <span className="club-network-connected"><CheckCircle2 size={14} />Connected</span>
      ) : (
        <button type="button" className="club-network-connect-button" onClick={onConnect} disabled={sent}>{sent ? 'Request sent' : 'Connect'}</button>
      )}
    </article>
  )
}

function ClubPlayerCard({ player, shortlisted, onToggleShortlist }) {
  return (
    <article className="club-discovery-player-card">
      <Link to={`/discover/${player.id}`} className="club-discovery-player-image">
        <img src={player.image} alt={`${player.name} profile`} loading="lazy" />
      </Link>
      <div className="club-discovery-player-content">
        <div className="club-player-heading">
          <div><Link to={`/discover/${player.id}`}>{player.name}</Link><span>{player.position}</span></div>
          <button type="button" className="club-dashboard-icon-button" aria-label={`${shortlisted ? 'Remove' : 'Add'} ${player.name} ${shortlisted ? 'from' : 'to'} shortlist`} aria-pressed={shortlisted} onClick={() => onToggleShortlist(player)}>
            <Bookmark size={16} fill={shortlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="club-player-tags"><span>{player.nationality}</span><span>Age {player.age}</span><span>{player.preferredFoot} foot</span></div>
        <small>{player.club}</small>
        <p>{player.description}</p>
        <Link className="club-player-profile-link" to={`/discover/${player.id}`}>View player profile <ArrowRight size={14} /></Link>
      </div>
    </article>
  )
}

export default function ClubDashboardPage() {
  const [club, setClub] = useState(() => ({ ...dashboardClub, location: 'Northbridge, England' }))
  const [opportunities, setOpportunities] = useState(initialClubOpportunities)
  const [applications, setApplications] = useState(initialClubApplications)
  const [shortlistedIds, setShortlistedIds] = useState(initialClubShortlistIds)
  const [professionalIds, setProfessionalIds] = useState(initialClubProfessionalIds)
  const [connectionRequests, setConnectionRequests] = useState(initialClubConnectionRequests)
  const [sentConnectionIds, setSentConnectionIds] = useState([])
  const [notifications, setNotifications] = useState(initialClubNotifications)
  const [activeSection, setActiveSection] = useState('overview')
  const [applicationStatusFilter, setApplicationStatusFilter] = useState('')
  const [applicationPositionFilter, setApplicationPositionFilter] = useState('')
  const [applicationSearch, setApplicationSearch] = useState('')
  const [discoverySearch, setDiscoverySearch] = useState('')
  const [discoveryFilters, setDiscoveryFilters] = useState({ position: '', country: '', age: '', foot: '' })
  const [opportunityTab, setOpportunityTab] = useState('Active')
  const [opportunityEditorOpen, setOpportunityEditorOpen] = useState(false)
  const [editingOpportunity, setEditingOpportunity] = useState(null)
  const [profileEditorOpen, setProfileEditorOpen] = useState(false)
  const [feedback, setFeedback] = useState('')
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const playerById = useMemo(() => Object.fromEntries(playerProfiles.map(player => [player.id, player])), [])
  const professionalById = useMemo(() => Object.fromEntries(professionals.map(person => [person.id, person])), [])
  const unreadCount = notifications.filter(notification => !notification.read).length
  const profileCompletion = getProfileCompletion(club)
  const pendingApplications = applications.filter(application => ['New', 'Under review'].includes(application.status)).length
  const activeOpportunityCount = opportunities.filter(opportunity => opportunity.status === 'Active').length
  const visibleOpportunities = opportunities.filter(opportunity => opportunity.status === opportunityTab)
  const connectedProfessionals = professionalIds.map(id => professionalById[id]).filter(Boolean)
  const requestedProfessionals = connectionRequests.map(id => professionalById[id]).filter(Boolean)
  const suggestedProfessionals = professionals.filter(person =>
    !professionalIds.includes(person.id) &&
    !connectionRequests.includes(person.id)
  ).slice(0, 3)

  const countries = useMemo(() => [...new Set(playerProfiles.map(player => player.nationality))].sort(), [])
  const positions = useMemo(() => [...new Set(playerProfiles.map(player => player.position))].sort(), [])

  const filteredApplications = applications
    .map(application => ({ ...application, player: playerById[application.playerId], opportunity: opportunities.find(item => item.id === application.opportunityId) }))
    .filter(application => application.player)
    .filter(application => !applicationStatusFilter || application.status === applicationStatusFilter)
    .filter(application => !applicationPositionFilter || application.player.position === applicationPositionFilter)
    .filter(application => !applicationSearch.trim() || application.player.name.toLowerCase().includes(applicationSearch.trim().toLowerCase()))

  const filteredPlayers = playerProfiles.filter(player => {
    const matchesSearch = !discoverySearch.trim() || player.name.toLowerCase().includes(discoverySearch.trim().toLowerCase())
    const matchesPosition = !discoveryFilters.position || player.position === discoveryFilters.position
    const matchesCountry = !discoveryFilters.country || player.nationality === discoveryFilters.country
    const matchesAge = !discoveryFilters.age || getAgeRange(player.age) === discoveryFilters.age
    const matchesFoot = !discoveryFilters.foot || player.preferredFoot === discoveryFilters.foot
    return matchesSearch && matchesPosition && matchesCountry && matchesAge && matchesFoot
  }).slice(0, 6)

  const shortlistedPlayers = shortlistedIds.map(id => playerById[id]).filter(Boolean)

  function showFeedback(message) {
    setFeedback(message)
  }

  function navigateSection(section) {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toggleShortlist(player) {
    const isSaved = shortlistedIds.includes(player.id)
    setShortlistedIds(current => isSaved ? current.filter(id => id !== player.id) : [...current, player.id])
    showFeedback(isSaved ? `${player.name} removed from your demo shortlist.` : `${player.name} added to your demo shortlist.`)
  }

  function saveOpportunity(opportunity) {
    const alreadyExists = opportunities.some(item => item.id === opportunity.id)
    setOpportunities(current => {
      const exists = current.some(item => item.id === opportunity.id)
      return exists
        ? current.map(item => item.id === opportunity.id ? opportunity : item)
        : [opportunity, ...current]
    })
    setOpportunityEditorOpen(false)
    setEditingOpportunity(null)
    showFeedback(alreadyExists ? 'Opportunity changes updated in this demo session only.' : 'Opportunity published in this demo session only.')
  }

  function toggleOpportunityStatus(opportunity) {
    const nextStatus = opportunity.status === 'Active' ? 'Closed' : 'Active'
    setOpportunities(current => current.map(item => item.id === opportunity.id ? { ...item, status: nextStatus } : item))
    showFeedback(`${opportunity.title} ${nextStatus === 'Closed' ? 'closed' : 'reopened'} in this demo.`)
  }

  function updateApplicationStatus(id, status) {
    setApplications(current => current.map(application => application.id === id ? { ...application, status } : application))
  }

  function updateDiscoveryFilter(event) {
    setDiscoveryFilters(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function markNotificationRead(id) {
    setNotifications(current => current.map(notification => notification.id === id ? { ...notification, read: true } : notification))
  }

  function markAllNotificationsRead() {
    setNotifications(current => current.map(notification => ({ ...notification, read: true })))
    showFeedback('All sample club notifications marked as read.')
  }

  function acceptConnection(id) {
    const person = professionalById[id]
    setConnectionRequests(current => current.filter(requestId => requestId !== id))
    setProfessionalIds(current => current.includes(id) ? current : [id, ...current])
    showFeedback(`${person?.name || 'Professional'} added to your sample network.`)
  }

  function dismissConnection(id) {
    const person = professionalById[id]
    setConnectionRequests(current => current.filter(requestId => requestId !== id))
    showFeedback(`${person?.name || 'Connection request'} dismissed in this demo.`)
  }

  function sendConnectionRequest(id) {
    const person = professionalById[id]
    setSentConnectionIds(current => current.includes(id) ? current : [...current, id])
    showFeedback(`Sample connection request sent to ${person?.name || 'professional'}. No message or backend request was created.`)
  }

  function saveClubProfile(updatedClub) {
    setClub(updatedClub)
    setProfileEditorOpen(false)
    showFeedback('Club profile updated for this demo session only.')
  }

  function handleLogout() {
    showFeedback('This is a sample club workspace; there is no signed-in session to end.')
  }

  const statusFilterActive = Boolean(applicationStatusFilter || applicationPositionFilter || applicationSearch)
  const activeApplicationsCount = applications.length
  const newOpportunity = () => {
    setEditingOpportunity(null)
    setOpportunityEditorOpen(true)
  }

  return (
    <>
      <Navbar />
      <main className="club-dashboard-page">
        <div className="club-dashboard-layout">
          <ClubDashboardSidebar activeSection={activeSection} onNavigate={navigateSection} onLogout={handleLogout} unreadCount={unreadCount} />

          <div className="club-dashboard-content">
            {feedback && (
              <div className="club-dashboard-feedback" role="status" aria-live="polite">
                <CheckCircle2 size={16} /><span>{feedback}</span>
                <button type="button" onClick={() => setFeedback('')} aria-label="Dismiss confirmation"><X size={15} /></button>
              </div>
            )}

            <section className="club-dashboard-hero" id="overview">
              <div className="club-dashboard-hero-copy">
                <span className="club-dashboard-eyebrow"><span /> CLUB WORKSPACE · DEMO DATA</span>
                <h1>Welcome back,<br /><em>{club.name}</em></h1>
                <p>Manage your club presence, discover player talent and keep recruitment moving.</p>
                <div className="club-dashboard-hero-meta">
                  <span><MapPin size={14} />{club.location}</span>
                  <span><Building2 size={14} />{club.league}</span>
                </div>
                <div className="club-dashboard-hero-actions">
                  <button type="button" className="button button-primary" onClick={newOpportunity}><Plus size={16} /> Publish opportunity</button>
                  <button type="button" className="club-dashboard-hero-secondary" onClick={() => navigateSection('applications')}>Review applications <ArrowRight size={15} /></button>
                </div>
              </div>
              <div className="club-dashboard-hero-aside">
                <ClubLogo club={club} size="large" />
                <div className="club-dashboard-completion">
                  <span className="club-dashboard-completion-ring" style={{ '--club-completion': `${profileCompletion}%` }} role="progressbar" aria-label="Club profile completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={profileCompletion}>
                    <span>{profileCompletion}%</span>
                  </span>
                  <div><strong>Profile completeness</strong><small>{profileCompletion === 100 ? 'Your club profile is complete.' : 'Add a few details to strengthen your profile.'}</small></div>
                </div>
                <button type="button" className="club-dashboard-edit-profile" onClick={() => setProfileEditorOpen(true)}><Pencil size={14} /> Edit club profile</button>
              </div>
            </section>

            <section className="club-dashboard-stats-grid" aria-label="Club statistics">
              <ClubStatCard icon={Eye} label="Profile views" value="1,284" note="+18% this month" tone="stat-green" />
              <ClubStatCard icon={FilePlus2} label="Active opportunities" value={activeOpportunityCount} note="Open recruitment listings" tone="stat-navy" />
              <ClubStatCard icon={FileText} label="Applications received" value={activeApplicationsCount} note="Across sample opportunities" tone="stat-blue" />
              <ClubStatCard icon={Bookmark} label="Players shortlisted" value={shortlistedIds.length} note="Saved for club review" tone="stat-orange" />
              <ClubStatCard icon={Clock3} label="Pending applications" value={pendingApplications} note="New or under review" tone="stat-red" />
              <ClubStatCard icon={Handshake} label="Professional connections" value={professionalIds.length} note="Scouts, agents and coaches" tone="stat-purple" />
            </section>

            <section className="club-dashboard-section club-dashboard-profile-section" id="profile">
              <ClubDashboardSectionHeading kicker="CLUB IDENTITY" title="Club profile" action={<button type="button" className="club-dashboard-text-button" onClick={() => setProfileEditorOpen(true)}>Edit profile <Pencil size={14} /></button>} />
              <div className="club-profile-overview-card">
                <div className="club-profile-overview-logo"><ClubLogo club={club} size="large" /></div>
                <div className="club-profile-overview-copy">
                  <span className="club-category-tag">{club.category}</span>
                  <h3>{club.name}</h3>
                  <div className="club-profile-overview-meta"><span><MapPin size={14} />{club.location} · {club.country}</span><span><Building2 size={14} />{club.league}</span></div>
                  <p>{club.description}</p>
                  <div className="club-profile-overview-foot"><span>Founded {club.founded}</span><span>{club.stadium.name}</span><Link to={`/clubs/${club.id}`}>View public profile <ArrowRight size={14} /></Link></div>
                </div>
                <div className="club-profile-completeness-card">
                  <span>PROFILE SCORE</span><strong>{profileCompletion}%</strong>
                  <div className="club-profile-progress"><i style={{ width: `${profileCompletion}%` }} /></div>
                  <small>Keep club details current for players.</small>
                </div>
              </div>
              <DashboardAccessAction onClick={() => navigateSection('overview')} title="Visit the Club Dashboard" description="Return to your dashboard overview." />
            </section>

            <section className="club-dashboard-section" id="recruitment">
              <ClubDashboardSectionHeading
                kicker="RECRUITMENT MANAGEMENT"
                title="Opportunities"
                action={<button type="button" className="button button-primary club-dashboard-compact-button" onClick={newOpportunity}><Plus size={15} /> New opportunity</button>}
              />
              <div className="club-dashboard-opportunity-toolbar">
                <div className="club-dashboard-tabs" role="tablist" aria-label="Opportunity status">
                  {['Active', 'Closed'].map(status => (
                    <button key={status} type="button" role="tab" aria-selected={opportunityTab === status} className={opportunityTab === status ? 'active' : ''} onClick={() => setOpportunityTab(status)}>
                      {status} <span>{opportunities.filter(opportunity => opportunity.status === status).length}</span>
                    </button>
                  ))}
                </div>
                <Link className="club-dashboard-text-button" to="/clubs#opportunities">Full recruitment directory <ArrowRight size={14} /></Link>
              </div>
              {visibleOpportunities.length ? (
                <div className="club-dashboard-opportunity-grid">
                  {visibleOpportunities.map(opportunity => (
                    <ClubOpportunityCard
                      key={opportunity.id}
                      opportunity={opportunity}
                      applicationCount={applications.filter(application => application.opportunityId === opportunity.id).length}
                      onEdit={() => { setEditingOpportunity(opportunity); setOpportunityEditorOpen(true) }}
                      onToggleStatus={() => toggleOpportunityStatus(opportunity)}
                    />
                  ))}
                </div>
              ) : (
                <div className="club-dashboard-empty-state"><FilePlus2 size={22} /><strong>No {opportunityTab.toLowerCase()} opportunities</strong><span>Publish a recruitment listing or check another status.</span></div>
              )}
            </section>

            <section className="club-dashboard-section" id="applications">
              <ClubDashboardSectionHeading kicker="APPLICANT MANAGEMENT" title="Player applications" action={<span className="club-dashboard-total-count">{filteredApplications.length} shown · {applications.length} total</span>} />
              <div className="club-dashboard-filter-panel">
                <label className="club-dashboard-search-field"><Search size={16} /><span className="visually-hidden">Search applicants by name</span><input type="search" value={applicationSearch} onChange={event => setApplicationSearch(event.target.value)} placeholder="Search applicants..." /></label>
                <label><span>Status</span><select value={applicationStatusFilter} onChange={event => setApplicationStatusFilter(event.target.value)}><option value="">All statuses</option>{applicationStatuses.map(status => <option key={status}>{status}</option>)}</select></label>
                <label><span>Position</span><select value={applicationPositionFilter} onChange={event => setApplicationPositionFilter(event.target.value)}><option value="">All positions</option>{positions.map(position => <option key={position}>{position}</option>)}</select></label>
                <button type="button" className="club-dashboard-clear-filters" onClick={() => { setApplicationSearch(''); setApplicationStatusFilter(''); setApplicationPositionFilter('') }} disabled={!statusFilterActive}><Filter size={14} /> Clear filters</button>
              </div>
              <div className="club-dashboard-applicant-list">
                {filteredApplications.length ? filteredApplications.map(application => (
                  <ApplicantCard
                    key={application.id}
                    application={application}
                    player={application.player}
                    opportunity={application.opportunity}
                    isShortlisted={shortlistedIds.includes(application.playerId)}
                    onToggleShortlist={toggleShortlist}
                    onUpdateStatus={updateApplicationStatus}
                    onFeedback={showFeedback}
                  />
                )) : (
                  <div className="club-dashboard-empty-state"><Search size={22} /><strong>No applications match these filters</strong><span>Try another position or status.</span></div>
                )}
              </div>
            </section>

            <section className="club-dashboard-section" id="discover">
              <ClubDashboardSectionHeading kicker="GLOBAL PLAYER DIRECTORY" title="Discover players" action={<Link className="club-dashboard-text-button" to="/discover#player-directory">Open full directory <ArrowRight size={14} /></Link>} />
              <div className="club-discovery-toolbar">
                <label className="club-dashboard-search-field"><Search size={16} /><span className="visually-hidden">Search players by name</span><input type="search" value={discoverySearch} onChange={event => setDiscoverySearch(event.target.value)} placeholder="Search player name..." /></label>
                <label><span>Position</span><select name="position" value={discoveryFilters.position} onChange={updateDiscoveryFilter}><option value="">All positions</option>{positions.map(position => <option key={position}>{position}</option>)}</select></label>
                <label><span>Country</span><select name="country" value={discoveryFilters.country} onChange={updateDiscoveryFilter}><option value="">All countries</option>{countries.map(country => <option key={country}>{country}</option>)}</select></label>
                <label><span>Age</span><select name="age" value={discoveryFilters.age} onChange={updateDiscoveryFilter}><option value="">All ages</option>{ageRanges.map(range => <option key={range}>{range}</option>)}</select></label>
                <label><span>Preferred foot</span><select name="foot" value={discoveryFilters.foot} onChange={updateDiscoveryFilter}><option value="">Any foot</option><option>Left</option><option>Right</option><option>Both</option></select></label>
              </div>
              <div className="club-dashboard-result-note">{filteredPlayers.length ? `Showing ${filteredPlayers.length} matching profiles` : 'No players match the selected filters.'}<span>·</span> Save a player to add them to the club shortlist.</div>
              {filteredPlayers.length > 0 && (
                <div className="club-discovery-grid">
                  {filteredPlayers.map(player => (
                    <ClubPlayerCard key={player.id} player={player} shortlisted={shortlistedIds.includes(player.id)} onToggleShortlist={toggleShortlist} />
                  ))}
                </div>
              )}
            </section>

            <section className="club-dashboard-section" id="shortlist">
              <ClubDashboardSectionHeading kicker="SAVED TALENT" title="Player shortlist" action={<span className="club-dashboard-total-count">{shortlistedPlayers.length} players</span>} />
              {shortlistedPlayers.length ? (
                <div className="club-discovery-grid club-shortlist-grid">
                  {shortlistedPlayers.map(player => (
                    <ClubPlayerCard key={player.id} player={player} shortlisted onToggleShortlist={toggleShortlist} />
                  ))}
                </div>
              ) : (
                <div className="club-dashboard-empty-state"><Bookmark size={22} /><strong>Your shortlist is empty</strong><span>Save players from discovery to keep them here.</span><button type="button" className="club-dashboard-text-button" onClick={() => navigateSection('discover')}>Discover players <ArrowRight size={14} /></button></div>
              )}
            </section>

            <section className="club-dashboard-section" id="network">
              <ClubDashboardSectionHeading kicker="FOOTBALL PROFESSIONALS" title="Professional network" action={<Link className="club-dashboard-text-button" to="/professionals">Browse directory <ArrowRight size={14} /></Link>} />
              <div className="club-dashboard-network-grid">
                <div className="club-network-panel">
                  <div className="club-network-panel-heading"><h3>Connected professionals</h3><span>{connectedProfessionals.length}</span></div>
                  {connectedProfessionals.length ? connectedProfessionals.map(person => <ProfessionalCard key={person.id} person={person} connected />) : <p className="club-network-empty">Connections you accept will appear here.</p>}
                </div>
                <div className="club-network-panel">
                  <div className="club-network-panel-heading"><h3>Connection requests</h3><span>{requestedProfessionals.length}</span></div>
                  {requestedProfessionals.length ? requestedProfessionals.map(person => <ProfessionalCard key={person.id} person={person} pending onAccept={() => acceptConnection(person.id)} onReject={() => dismissConnection(person.id)} />) : <p className="club-network-empty">No pending sample requests.</p>}
                </div>
                <div className="club-network-panel club-network-suggestions">
                  <div className="club-network-panel-heading"><h3>Suggested professionals</h3><span>Suggested</span></div>
                  {suggestedProfessionals.map(person => (
                    <ProfessionalCard key={person.id} person={person} sent={sentConnectionIds.includes(person.id)} onConnect={() => sendConnectionRequest(person.id)} />
                  ))}
                </div>
              </div>
            </section>

            <section className="club-dashboard-section club-dashboard-lower-grid" id="activity">
              <div className="club-dashboard-panel">
                <ClubDashboardSectionHeading kicker="CLUB ACTIVITY" title="Recent updates" />
                <div className="club-dashboard-activity-list">
                  {clubDashboardActivity.map(item => {
                    const ActivityIcon = { application: FileText, network: Handshake, shortlist: Bookmark, profile: Eye }[item.type]
                    return <article className="club-dashboard-activity-item" key={item.id}><span><ActivityIcon size={16} /></span><div><strong>{item.title}</strong><small>{item.detail}</small></div><time>{item.time}</time></article>
                  })}
                </div>
              </div>
              <div className="club-dashboard-panel" id="messages">
                <ClubDashboardSectionHeading kicker="MESSAGES" title="Club inbox" />
                <div className="club-dashboard-demo-message"><span><MessageCircle size={19} /></span><div><strong>Messaging is not connected yet</strong><p>This dashboard does not send or receive real messages. Use the professional directory to explore sample profiles.</p><Link to="/professionals">Explore professionals <ArrowRight size={14} /></Link></div></div>
              </div>
            </section>

            <section className="club-dashboard-section club-dashboard-notifications-section" id="notifications">
              <ClubDashboardSectionHeading kicker="UPDATES" title="Notifications" action={<button type="button" className="club-dashboard-text-button" onClick={markAllNotificationsRead} disabled={!unreadCount}>Mark all read</button>} />
              <div className="club-dashboard-notifications-list">
                {notifications.map(notification => (
                  <article key={notification.id} className={notification.read ? 'club-dashboard-notification is-read' : 'club-dashboard-notification'}>
                    <span className="club-dashboard-notification-icon"><Bell size={16} /></span>
                    <div><strong>{notification.title}</strong><p>{notification.detail}</p><small>{notification.time}</small></div>
                    {!notification.read && <button type="button" onClick={() => markNotificationRead(notification.id)} aria-label={`Mark ${notification.title} as read`}>Mark read</button>}
                  </article>
                ))}
              </div>
            </section>

            <section className="club-dashboard-section" id="settings">
              <ClubDashboardSectionHeading kicker="PREFERENCES" title="Settings" />
              <div className="club-dashboard-settings-card">
                <label><span><strong>Club profile visibility</strong><small>Show the sample club profile in the public directory.</small></span><input type="checkbox" checked={profileVisibility} onChange={event => setProfileVisibility(event.target.checked)} /></label>
                <label><span><strong>Email notification preference</strong><small>Frontend-only preference; no email is sent.</small></span><input type="checkbox" checked={emailNotifications} onChange={event => setEmailNotifications(event.target.checked)} /></label>
                <p><Shield size={15} /> Demo settings are held in page state and reset when you refresh.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      {opportunityEditorOpen && <ClubOpportunityEditorModal opportunity={editingOpportunity} club={club} onClose={() => { setOpportunityEditorOpen(false); setEditingOpportunity(null) }} onSave={saveOpportunity} />}
      {profileEditorOpen && <ClubProfileEditorModal club={club} onClose={() => setProfileEditorOpen(false)} onSave={saveClubProfile} />}
    </>
  )
}
