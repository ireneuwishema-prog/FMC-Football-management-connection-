import { useMemo, useState } from 'react'
import {
  Activity, ArrowRight, Bell, Bookmark, Building2, Check, CheckCircle2,
  ClipboardList, Compass, Eye, FilePlus2, FileText, Filter, Flag, Handshake,
  Home, LogOut, MapPin, MessageCircle, Pencil, Plus, Search, Settings,
  Shield, Star, Target, Trash2, Users, X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DashboardAccessAction from '../components/DashboardAccessAction'
import ScoutProfileEditorModal from '../components/ScoutProfileEditorModal'
import ScoutReportCard from '../components/ScoutReportCard'
import ScoutReportEditorModal from '../components/ScoutReportEditorModal'
import clubProfiles from '../data/clubProfiles'
import playerProfiles from '../data/playerProfiles'
import {
  initialScoutActivity, initialScoutAssignments, initialScoutConnectedClubIds,
  initialScoutConnectionRequests, initialScoutDiscoveredPlayerIds,
  initialScoutNotifications, initialScoutProfile, initialScoutReports,
  initialScoutShortlist,
} from '../data/scoutDashboardData'

const positionRatings = [
  ['technical', 'Technical ability'],
  ['tactical', 'Tactical understanding'],
  ['physical', 'Physical attributes'],
  ['decisionMaking', 'Decision-making'],
  ['positionSkill', 'Position-specific skills'],
]

const recommendationOptions = ['Strongly recommend', 'Recommend', 'Monitor', 'Do not recommend']
const scoutingLists = ['Priority targets', 'Watch list', 'Follow-up']
const ageRanges = ['16–18', '19–21', '22–24', '25+']

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'discover', label: 'Discover Players', icon: Compass },
  { id: 'shortlist', label: 'My Shortlist', icon: Bookmark },
  { id: 'evaluation', label: 'Player Evaluation', icon: Star },
  { id: 'reports', label: 'Scouting Reports', icon: FileText },
  { id: 'assignments', label: 'Scouting Assignments', icon: ClipboardList },
  { id: 'network', label: 'Club Network', icon: Building2 },
  { id: 'messages', label: 'Messages', icon: MessageCircle },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'My Profile', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
]

function getAgeRange(age) {
  if (age <= 18) return '16–18'
  if (age <= 21) return '19–21'
  if (age <= 24) return '22–24'
  return '25+'
}

function profileCompletion(profile) {
  const fields = [profile.name, profile.country, profile.location, profile.specialization, profile.experience, profile.organization, profile.bio, profile.expertise.length, profile.image]
  return Math.round(fields.filter(Boolean).length / fields.length * 100)
}

function ratingAverage(ratings) {
  const values = Object.values(ratings)
  return values.length ? (values.reduce((total, rating) => total + rating, 0) / values.length).toFixed(1) : '—'
}

function ScoutSidebar({ activeSection, onNavigate, onLogout, unreadCount, profile }) {
  return (
    <aside className="club-dashboard-sidebar scout-dashboard-sidebar">
      <div className="club-dashboard-sidebar-heading scout-sidebar-heading">
        <img src={profile.image} alt="" />
        <div><strong>SCOUT HUB</strong><small>{profile.name.toUpperCase()}</small></div>
      </div>
      <nav className="club-dashboard-sidebar-nav" aria-label="Scout dashboard navigation">
        {sidebarItems.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={activeSection === id ? 'club-dashboard-nav-link active' : 'club-dashboard-nav-link'} onClick={() => onNavigate(id)} aria-current={activeSection === id ? 'page' : undefined}>
            <Icon size={16} /><span>{label}</span>
            {id === 'notifications' && unreadCount > 0 && <span className="club-dashboard-nav-count">{unreadCount}</span>}
          </button>
        ))}
        <button type="button" className="club-dashboard-nav-link club-dashboard-logout" onClick={onLogout}><LogOut size={16} /><span>Logout</span></button>
      </nav>
      <div className="club-dashboard-demo-note"><Shield size={14} /><span>Sample scout workspace. Changes are temporary.</span></div>
    </aside>
  )
}

function ScoutSectionHeading({ kicker, title, action }) {
  return (
    <div className="club-dashboard-section-heading">
      <div><span className="kicker">{kicker}</span><h2>{title}</h2></div>
      {action}
    </div>
  )
}

function ScoutPlayerCard({ player, shortlisted, onToggleShortlist, onView, shortlistEntry, onUpdateShortlist, compareSelected, onToggleCompare }) {
  return (
    <article className="scout-player-card">
      <Link to={`/discover/${player.id}`} className="scout-player-card-image" onClick={() => onView(player)}>
        <img src={player.image} alt={`${player.name} profile`} loading="lazy" />
      </Link>
      <div className="scout-player-card-body">
        <div className="scout-player-card-heading">
          <div><Link to={`/discover/${player.id}`} onClick={() => onView(player)}>{player.name}</Link><span>{player.position}</span></div>
          <button type="button" className="club-dashboard-icon-button" aria-label={`${shortlisted ? 'Remove' : 'Add'} ${player.name} ${shortlisted ? 'from' : 'to'} shortlist`} aria-pressed={shortlisted} onClick={() => onToggleShortlist(player)}>
            <Bookmark size={15} fill={shortlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
        <div className="scout-player-card-meta"><span>Age {player.age}</span><span>{player.nationality}</span><span>{player.preferredFoot} foot</span></div>
        <small>{player.club}</small>
        <p>{player.description}</p>
        <div className="scout-player-card-footer">
          <Link to={`/discover/${player.id}`} onClick={() => onView(player)}>View full profile <ArrowRight size={13} /></Link>
          {shortlistEntry && (
            <label className="scout-compare-toggle"><input type="checkbox" checked={compareSelected} onChange={() => onToggleCompare(player.id)} />Compare</label>
          )}
        </div>
        {shortlistEntry && (
          <div className="scout-shortlist-controls">
            <label><span>Scouting list</span><select value={shortlistEntry.list} onChange={event => onUpdateShortlist(player.id, 'list', event.target.value)}>{scoutingLists.map(list => <option key={list}>{list}</option>)}</select></label>
            <label><span>Personal note</span><textarea rows="2" value={shortlistEntry.note} onChange={event => onUpdateShortlist(player.id, 'note', event.target.value)} placeholder="Add a private demo note..." /></label>
          </div>
        )}
      </div>
    </article>
  )
}

function ScoutClubCard({ club, connected = false, pending = false, sent = false, onAccept, onDecline, onConnect }) {
  return (
    <article className="scout-club-card">
      <span className="club-identity-mark" style={{ '--club-color': club.color }} aria-hidden="true"><span>{club.initials}</span></span>
      <div className="scout-club-card-copy">
        <Link to={`/clubs/${club.id}`}>{club.name}</Link>
        <span>{club.country} · {club.league}</span>
      </div>
      <div className="scout-club-card-actions">
        <Link className="scout-club-opportunities-link" to={`/clubs/${club.id}#club-opportunities`}>Opportunities</Link>
        {connected
          ? <span className="scout-network-status"><CheckCircle2 size={13} />Connected</span>
          : pending
            ? <><button type="button" className="scout-network-accept" onClick={onAccept}><Check size={13} />Accept</button><button type="button" className="scout-network-decline" onClick={onDecline}>Decline</button></>
            : <button type="button" className="scout-network-connect" onClick={onConnect} disabled={sent}>{sent ? 'Request sent' : 'Connect'}</button>}
      </div>
    </article>
  )
}

export default function ScoutDashboardPage() {
  const [profile, setProfile] = useState(initialScoutProfile)
  const [shortlist, setShortlist] = useState(initialScoutShortlist)
  const [reports, setReports] = useState(initialScoutReports)
  const [assignments] = useState(initialScoutAssignments)
  const [connectedClubIds, setConnectedClubIds] = useState(initialScoutConnectedClubIds)
  const [connectionRequests, setConnectionRequests] = useState(initialScoutConnectionRequests)
  const [sentConnectionIds, setSentConnectionIds] = useState([])
  const [discoveredIds, setDiscoveredIds] = useState(initialScoutDiscoveredPlayerIds)
  const [notifications, setNotifications] = useState(initialScoutNotifications)
  const [activity, setActivity] = useState(initialScoutActivity)
  const [activeSection, setActiveSection] = useState('overview')
  const [discoverySearch, setDiscoverySearch] = useState('')
  const [discoveryFilters, setDiscoveryFilters] = useState({ position: '', age: '', country: '', foot: '', club: '' })
  const [reportSearch, setReportSearch] = useState('')
  const [reportFilters, setReportFilters] = useState({ position: '', recommendation: '' })
  const [shortlistListFilter, setShortlistListFilter] = useState('')
  const [compareIds, setCompareIds] = useState([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [evaluation, setEvaluation] = useState({
    playerId: playerProfiles[0].id,
    ratings: { technical: 3, tactical: 3, physical: 3, decisionMaking: 3, positionSkill: 3 },
    recommendation: 'Monitor',
    observations: '',
  })
  const [savedEvaluations, setSavedEvaluations] = useState([])
  const [profileEditorOpen, setProfileEditorOpen] = useState(false)
  const [reportEditorOpen, setReportEditorOpen] = useState(false)
  const [editingReport, setEditingReport] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const playersById = useMemo(() => Object.fromEntries(playerProfiles.map(player => [player.id, player])), [])
  const clubsById = useMemo(() => Object.fromEntries(clubProfiles.map(club => [club.id, club])), [])
  const countries = useMemo(() => [...new Set(playerProfiles.map(player => player.nationality))].sort(), [])
  const positions = useMemo(() => [...new Set(playerProfiles.map(player => player.position))].sort(), [])
  const playerClubs = useMemo(() => [...new Set(playerProfiles.map(player => player.club))].sort(), [])
  const unreadCount = notifications.filter(notification => !notification.read).length
  const completion = profileCompletion(profile)
  const activeAssignments = assignments.filter(assignment => assignment.status === 'Active').length
  const pendingReports = reports.filter(report => report.recommendation === 'Monitor').length
  const shortlistPlayers = shortlist
    .map(entry => ({ ...entry, player: playersById[entry.playerId] }))
    .filter(entry => entry.player)
    .filter(entry => !shortlistListFilter || entry.list === shortlistListFilter)
  const displayedPlayers = playerProfiles.filter(player => {
    const matchesSearch = !discoverySearch.trim() || player.name.toLowerCase().includes(discoverySearch.trim().toLowerCase())
    const matchesPosition = !discoveryFilters.position || player.position === discoveryFilters.position
    const matchesAge = !discoveryFilters.age || getAgeRange(player.age) === discoveryFilters.age
    const matchesCountry = !discoveryFilters.country || player.nationality === discoveryFilters.country
    const matchesFoot = !discoveryFilters.foot || player.preferredFoot === discoveryFilters.foot
    const matchesClub = !discoveryFilters.club || player.club === discoveryFilters.club
    return matchesSearch && matchesPosition && matchesAge && matchesCountry && matchesFoot && matchesClub
  })
  const displayedReports = reports.filter(report => {
    const query = reportSearch.trim().toLowerCase()
    const matchesQuery = !query || [report.playerName, report.position, report.currentClub, report.competition].some(value => value.toLowerCase().includes(query))
    const matchesPosition = !reportFilters.position || report.position === reportFilters.position
    const matchesRecommendation = !reportFilters.recommendation || report.recommendation === reportFilters.recommendation
    return matchesQuery && matchesPosition && matchesRecommendation
  })
  const connectedClubs = connectedClubIds.map(id => clubsById[id]).filter(Boolean)
  const requestedClubs = connectionRequests.map(id => clubsById[id]).filter(Boolean)
  const suggestedClubs = clubProfiles.filter(club => !connectedClubIds.includes(club.id) && !connectionRequests.includes(club.id))
  const selectedComparePlayers = compareIds.map(id => playersById[id]).filter(Boolean)
  const evaluatedPlayer = playersById[evaluation.playerId]

  function showFeedback(message) {
    setFeedback(message)
  }

  function pushActivity(item) {
    setActivity(current => [{ ...item, id: `${item.type}-${Date.now()}`, time: 'Just now' }, ...current].slice(0, 7))
  }

  function navigateSection(section) {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function markPlayerDiscovered(player) {
    if (discoveredIds.includes(player.id)) return
    setDiscoveredIds(current => [...current, player.id])
    pushActivity({ type: 'discover', title: 'Player profile viewed', detail: `${player.name} · ${player.position}` })
  }

  function toggleShortlist(player) {
    const isSaved = shortlist.some(entry => entry.playerId === player.id)
    setShortlist(current => isSaved
      ? current.filter(entry => entry.playerId !== player.id)
      : [...current, { playerId: player.id, note: '', list: 'Priority targets' }])
    if (isSaved) {
      setCompareIds(current => current.filter(id => id !== player.id))
      showFeedback(`${player.name} removed from your demo shortlist.`)
      pushActivity({ type: 'shortlist', title: 'Player removed from shortlist', detail: `${player.name} · ${player.position}` })
    } else {
      showFeedback(`${player.name} added to your demo shortlist.`)
      pushActivity({ type: 'shortlist', title: 'Player added to shortlist', detail: `${player.name} · Priority targets` })
    }
  }

  function updateShortlistEntry(playerId, field, value) {
    setShortlist(current => current.map(entry => entry.playerId === playerId ? { ...entry, [field]: value } : entry))
  }

  function toggleCompare(playerId) {
    if (compareIds.includes(playerId)) {
      setCompareIds(current => current.filter(id => id !== playerId))
      return
    }
    if (compareIds.length >= 3) {
      showFeedback('Compare up to three shortlisted players at a time.')
      return
    }
    setCompareIds(current => [...current, playerId])
  }

  function updateDiscoveryFilter(event) {
    setDiscoveryFilters(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function saveEvaluation(event) {
    event.preventDefault()
    if (!evaluatedPlayer) return
    const newEvaluation = { ...evaluation, playerName: evaluatedPlayer.name, savedAt: new Date().toISOString().slice(0, 10) }
    setSavedEvaluations(current => [newEvaluation, ...current])
    if (!discoveredIds.includes(evaluatedPlayer.id)) setDiscoveredIds(current => [...current, evaluatedPlayer.id])
    pushActivity({ type: 'evaluation', title: 'Player evaluation saved', detail: `${evaluatedPlayer.name} · ${ratingAverage(evaluation.ratings)} / 5` })
    showFeedback(`${evaluatedPlayer.name}'s subjective demo evaluation was saved.`)
  }

  function saveReport(report) {
    const exists = reports.some(item => item.id === report.id)
    setReports(current => exists
      ? current.map(item => item.id === report.id ? report : item)
      : [report, ...current])
    setReportEditorOpen(false)
    setEditingReport(null)
    if (!discoveredIds.includes(report.playerId)) setDiscoveredIds(current => [...current, report.playerId])
    pushActivity({ type: 'report', title: exists ? 'Scouting report updated' : 'Scouting report completed', detail: `${report.playerName} · ${report.competition}` })
    showFeedback(exists ? 'Scouting report updated in this demo session.' : 'Scouting report created in this demo session.')
  }

  function deleteReport(report) {
    setReports(current => current.filter(item => item.id !== report.id))
    showFeedback(`${report.playerName}'s report was removed from this demo session.`)
    pushActivity({ type: 'report', title: 'Scouting report deleted', detail: `${report.playerName} · ${report.competition}` })
  }

  function saveProfile(updatedProfile) {
    setProfile(updatedProfile)
    setProfileEditorOpen(false)
    showFeedback('Scout profile updated for this demo session only.')
  }

  function updateEvaluationField(event) {
    setEvaluation(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function updateEvaluationRating(event) {
    setEvaluation(current => ({ ...current, ratings: { ...current.ratings, [event.target.name]: Number(event.target.value) } }))
  }

  function acceptClubRequest(id) {
    const club = clubsById[id]
    setConnectionRequests(current => current.filter(requestId => requestId !== id))
    setConnectedClubIds(current => current.includes(id) ? current : [id, ...current])
    showFeedback(`${club?.name || 'Club'} added to your sample network.`)
    pushActivity({ type: 'network', title: 'Club connection accepted', detail: `${club?.name || 'Club'} · ${club?.country || ''}` })
  }

  function declineClubRequest(id) {
    const club = clubsById[id]
    setConnectionRequests(current => current.filter(requestId => requestId !== id))
    showFeedback(`${club?.name || 'Connection request'} dismissed in this demo.`)
  }

  function sendClubRequest(id) {
    const club = clubsById[id]
    setSentConnectionIds(current => current.includes(id) ? current : [...current, id])
    showFeedback(`Sample connection request sent to ${club?.name || 'club'}. No message or backend request was created.`)
    pushActivity({ type: 'network', title: 'Club connection request sent', detail: `${club?.name || 'Club'} · ${club?.country || ''}` })
  }

  function markNotificationRead(id) {
    setNotifications(current => current.map(notification => notification.id === id ? { ...notification, read: true } : notification))
  }

  function markAllNotificationsRead() {
    setNotifications(current => current.map(notification => ({ ...notification, read: true })))
    showFeedback('All sample scout notifications marked as read.')
  }

  function handleLogout() {
    showFeedback('This is a sample scout workspace; there is no signed-in session to end.')
  }

  const clearDiscoveryFilters = () => {
    setDiscoverySearch('')
    setDiscoveryFilters({ position: '', age: '', country: '', foot: '', club: '' })
  }
  const hasDiscoveryFilters = Boolean(discoverySearch.trim() || Object.values(discoveryFilters).some(Boolean))
  const hasReportFilters = Boolean(reportSearch.trim() || Object.values(reportFilters).some(Boolean))

  return (
    <>
      <Navbar />
      <main className="club-dashboard-page scout-dashboard-page">
        <div className="club-dashboard-layout scout-dashboard-layout">
          <ScoutSidebar activeSection={activeSection} onNavigate={navigateSection} onLogout={handleLogout} unreadCount={unreadCount} profile={profile} />

          <div className="club-dashboard-content scout-dashboard-content">
            {feedback && (
              <div className="club-dashboard-feedback" role="status" aria-live="polite">
                <CheckCircle2 size={16} /><span>{feedback}</span>
                <button type="button" onClick={() => setFeedback('')} aria-label="Dismiss confirmation"><X size={15} /></button>
              </div>
            )}

            <section className="scout-dashboard-hero" id="overview">
              <div className="scout-dashboard-hero-copy">
                <span className="scout-dashboard-eyebrow"><span /> SCOUTING INTELLIGENCE · DEMO WORKSPACE</span>
                <h1>Welcome back,<br /><em>{profile.name}</em></h1>
                <p>Discover emerging talent, build clear player assessments and strengthen your club network.</p>
                <div className="scout-dashboard-hero-meta"><span><MapPin size={14} />{profile.location}</span><span><Target size={14} />{profile.specialization}</span></div>
                <div className="scout-dashboard-quick-actions">
                  <button type="button" className="button button-primary" onClick={() => { setEditingReport(null); setReportEditorOpen(true) }}><Plus size={15} /> New scouting report</button>
                  <button type="button" className="scout-dashboard-hero-secondary" onClick={() => navigateSection('discover')}>Discover players <ArrowRight size={14} /></button>
                </div>
              </div>
              <div className="scout-dashboard-hero-aside">
                <img className="scout-dashboard-portrait" src={profile.image} alt={`${profile.name} profile`} />
                <div className="club-dashboard-completion">
                  <span className="club-dashboard-completion-ring" style={{ '--club-completion': `${completion}%` }} role="progressbar" aria-label="Scout profile completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completion}><span>{completion}%</span></span>
                  <div><strong>Profile completeness</strong><small>{completion === 100 ? 'Your scout profile is complete.' : 'Add details to improve your profile.'}</small></div>
                </div>
                <button type="button" className="scout-dashboard-edit-profile" onClick={() => setProfileEditorOpen(true)}><Pencil size={14} /> Edit scout profile</button>
              </div>
            </section>

            <section className="club-dashboard-stats-grid scout-dashboard-stats-grid" aria-label="Scouting overview">
              <article className="club-dashboard-stat-card stat-green"><span className="club-dashboard-stat-icon"><Eye size={18} /></span><span className="club-dashboard-stat-label">Players discovered</span><strong>{discoveredIds.length}</strong><small>Profiles reviewed in this demo</small></article>
              <article className="club-dashboard-stat-card stat-orange"><span className="club-dashboard-stat-icon"><Bookmark size={18} /></span><span className="club-dashboard-stat-label">Players shortlisted</span><strong>{shortlist.length}</strong><small>Across your scouting lists</small></article>
              <article className="club-dashboard-stat-card stat-blue"><span className="club-dashboard-stat-icon"><FileText size={18} /></span><span className="club-dashboard-stat-label">Reports completed</span><strong>{reports.length}</strong><small>{pendingReports} monitor recommendation{pendingReports === 1 ? '' : 's'}</small></article>
              <article className="club-dashboard-stat-card stat-navy"><span className="club-dashboard-stat-icon"><ClipboardList size={18} /></span><span className="club-dashboard-stat-label">Active assignments</span><strong>{activeAssignments}</strong><small>Sample club briefs in progress</small></article>
              <article className="club-dashboard-stat-card stat-purple"><span className="club-dashboard-stat-icon"><Handshake size={18} /></span><span className="club-dashboard-stat-label">Club connections</span><strong>{connectedClubIds.length}</strong><small>Connected football organizations</small></article>
              <article className="club-dashboard-stat-card stat-red"><span className="club-dashboard-stat-icon"><Users size={18} /></span><span className="club-dashboard-stat-label">Pending requests</span><strong>{connectionRequests.length}</strong><small>Club requests awaiting a response</small></article>
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="profile">
              <ScoutSectionHeading kicker="SCOUT PROFILE" title="Professional summary" action={<button type="button" className="club-dashboard-text-button" onClick={() => setProfileEditorOpen(true)}>Edit profile <Pencil size={14} /></button>} />
              <div className="scout-profile-summary">
                <img src={profile.image} alt={`${profile.name} profile`} />
                <div className="scout-profile-summary-main">
                  <div className="scout-profile-title"><div><h3>{profile.name}</h3><span>{profile.specialization}</span></div><span className="scout-experience-badge">{profile.experience} years' experience</span></div>
                  <div className="scout-profile-meta"><span><MapPin size={14} />{profile.location} · {profile.country}</span><span><Building2 size={14} />{profile.organization}</span></div>
                  <p>{profile.bio}</p>
                  <div className="scout-expertise-list"><strong>Areas of expertise</strong><div>{profile.expertise.map(area => <span key={area}>{area}</span>)}</div></div>
                </div>
                <div className="scout-profile-progress-card"><span>PROFILE COMPLETE</span><strong>{completion}%</strong><div><i style={{ width: `${completion}%` }} /></div><small>Keep your experience and focus areas current.</small></div>
              </div>
              <DashboardAccessAction onClick={() => navigateSection('overview')} title="Visit the Scout Dashboard" description="Return to your dashboard overview." />
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="discover">
              <ScoutSectionHeading kicker="GLOBAL PLAYER DIRECTORY" title="Discover players" action={<Link className="club-dashboard-text-button" to="/discover#player-directory">Open full directory <ArrowRight size={14} /></Link>} />
              <div className="scout-player-filter-panel">
                <label className="club-dashboard-search-field"><Search size={16} /><span className="visually-hidden">Search player names</span><input type="search" value={discoverySearch} onChange={event => setDiscoverySearch(event.target.value)} placeholder="Search by player name..." /></label>
                <label><span>Position</span><select name="position" value={discoveryFilters.position} onChange={updateDiscoveryFilter}><option value="">All positions</option>{positions.map(position => <option key={position}>{position}</option>)}</select></label>
                <label><span>Age range</span><select name="age" value={discoveryFilters.age} onChange={updateDiscoveryFilter}><option value="">All ages</option>{ageRanges.map(range => <option key={range}>{range}</option>)}</select></label>
                <label><span>Country</span><select name="country" value={discoveryFilters.country} onChange={updateDiscoveryFilter}><option value="">All countries</option>{countries.map(country => <option key={country}>{country}</option>)}</select></label>
                <label><span>Preferred foot</span><select name="foot" value={discoveryFilters.foot} onChange={updateDiscoveryFilter}><option value="">Any foot</option><option>Left</option><option>Right</option><option>Both</option></select></label>
                <label><span>Club or academy</span><select name="club" value={discoveryFilters.club} onChange={updateDiscoveryFilter}><option value="">All clubs &amp; academies</option>{playerClubs.map(club => <option key={club}>{club}</option>)}</select></label>
                <button type="button" className="club-dashboard-clear-filters" onClick={clearDiscoveryFilters} disabled={!hasDiscoveryFilters}><Filter size={14} />Clear filters</button>
              </div>
              <div className="scout-discovery-count">{displayedPlayers.length} player profiles <span>·</span> Fictional sample talent from the FMC directory</div>
              {displayedPlayers.length ? (
                <div className="scout-player-grid">
                  {displayedPlayers.map(player => (
                    <ScoutPlayerCard key={player.id} player={player} shortlisted={shortlist.some(entry => entry.playerId === player.id)} onToggleShortlist={toggleShortlist} onView={markPlayerDiscovered} />
                  ))}
                </div>
              ) : (
                <div className="club-dashboard-empty-state"><Search size={22} /><strong>No players match these filters</strong><span>Adjust your search or clear the filters.</span><button type="button" className="club-dashboard-text-button" onClick={clearDiscoveryFilters}>Clear filters <ArrowRight size={14} /></button></div>
              )}
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="evaluation">
              <ScoutSectionHeading kicker="PLAYER ASSESSMENT" title="Evaluation workspace" action={<span className="scout-subjective-note"><Shield size={14} /> Subjective scout assessment</span>} />
              <div className="scout-evaluation-layout">
                <form className="scout-evaluation-form" onSubmit={saveEvaluation}>
                  <div className="scout-evaluation-controls">
                    <label><span>Player to evaluate</span><select name="playerId" value={evaluation.playerId} onChange={updateEvaluationField}>{playerProfiles.map(player => <option key={player.id} value={player.id}>{player.name} · {player.position}</option>)}</select></label>
                    <label><span>Overall recommendation</span><select name="recommendation" value={evaluation.recommendation} onChange={updateEvaluationField}>{recommendationOptions.map(option => <option key={option}>{option}</option>)}</select></label>
                  </div>
                  <div className="scout-rating-controls">
                    {positionRatings.map(([key, label]) => (
                      <label key={key} className="scout-rating-control">
                        <span>{label}<strong>{evaluation.ratings[key]}/5</strong></span>
                        <input type="range" name={key} min="1" max="5" step="1" value={evaluation.ratings[key]} onChange={updateEvaluationRating} aria-label={`${label} rating`} />
                        <small><span>Developing</span><span>Excellent</span></small>
                      </label>
                    ))}
                  </div>
                  <label className="scout-observations-field"><span>Written observations</span><textarea value={evaluation.observations} onChange={event => setEvaluation(current => ({ ...current, observations: event.target.value }))} rows="4" placeholder="Record what you observed, the match context, and useful follow-up questions." required /></label>
                  <div className="scout-evaluation-submit-row"><p>Ratings are your opinion and are not independently verified.</p><button className="button button-primary" type="submit"><Check size={15} />Save demo assessment</button></div>
                </form>
                <aside className="scout-evaluation-aside">
                  <div className="scout-evaluation-score"><span>OVERALL SCORE</span><strong>{ratingAverage(evaluation.ratings)}<small>/5</small></strong><div className="scout-evaluation-stars">{[1, 2, 3, 4, 5].map(star => <Star key={star} size={14} fill={star <= Math.round(Number(ratingAverage(evaluation.ratings))) ? 'currentColor' : 'none'} />)}</div></div>
                  <div className="scout-evaluation-player"><span>Current assessment</span><strong>{evaluatedPlayer?.name}</strong><small>{evaluatedPlayer?.position} · {evaluatedPlayer?.club}</small></div>
                  <div className="scout-evaluation-history"><strong>Saved assessments</strong><span>{savedEvaluations.length} in this session</span>
                    {savedEvaluations.slice(0, 2).map((saved, index) => <small key={`${saved.playerId}-${saved.savedAt}-${index}`}>{saved.playerName} · {ratingAverage(saved.ratings)}/5 · {saved.recommendation}</small>)}
                    {!savedEvaluations.length && <small>Your saved evaluations will appear here.</small>}
                  </div>
                </aside>
              </div>
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="reports">
              <ScoutSectionHeading kicker="SCOUTING WORK" title="Scouting reports" action={<button type="button" className="button button-primary scout-compact-action" onClick={() => { setEditingReport(null); setReportEditorOpen(true) }}><Plus size={14} /> New report</button>} />
              <div className="scout-report-filters">
                <label className="club-dashboard-search-field"><Search size={15} /><span className="visually-hidden">Search scouting reports</span><input type="search" value={reportSearch} onChange={event => setReportSearch(event.target.value)} placeholder="Search player, club or event..." /></label>
                <label><span>Position</span><select value={reportFilters.position} onChange={event => setReportFilters(current => ({ ...current, position: event.target.value }))}><option value="">All positions</option>{positions.map(position => <option key={position}>{position}</option>)}</select></label>
                <label><span>Recommendation</span><select value={reportFilters.recommendation} onChange={event => setReportFilters(current => ({ ...current, recommendation: event.target.value }))}><option value="">All recommendations</option>{recommendationOptions.map(option => <option key={option}>{option}</option>)}</select></label>
                <button type="button" className="club-dashboard-clear-filters" disabled={!hasReportFilters} onClick={() => { setReportSearch(''); setReportFilters({ position: '', recommendation: '' }) }}><Filter size={14} />Clear</button>
              </div>
              <div className="scout-report-result-count">{displayedReports.length} reports <span>·</span> Reports and ratings are private frontend examples.</div>
              {displayedReports.length ? (
                <div className="scout-report-list">
                  {displayedReports.map(report => (
                    <ScoutReportCard
                      key={report.id}
                      report={report}
                      onEdit={() => { setEditingReport(report); setReportEditorOpen(true) }}
                      onDelete={() => deleteReport(report)}
                    />
                  ))}
                </div>
              ) : (
                <div className="club-dashboard-empty-state"><FileText size={22} /><strong>No reports match your search</strong><span>Try a different player, event, or recommendation.</span></div>
              )}
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="shortlist">
              <ScoutSectionHeading
                kicker="TALENT WATCHLIST"
                title="My shortlist"
                action={<label className="scout-list-filter"><span>Scouting list</span><select value={shortlistListFilter} onChange={event => setShortlistListFilter(event.target.value)}><option value="">All lists</option>{scoutingLists.map(list => <option key={list}>{list}</option>)}</select></label>}
              />
              <div className="scout-shortlist-toolbar">
                <span>{shortlistPlayers.length} players in this view · Notes and lists are private demo data.</span>
                <button type="button" className="scout-compare-button" disabled={compareIds.length < 2} onClick={() => setCompareOpen(open => !open)}>{compareOpen ? 'Hide comparison' : `Compare selected (${compareIds.length})`}</button>
              </div>
              {compareOpen && selectedComparePlayers.length >= 2 && (
                <div className="scout-comparison-table-wrap">
                  <table className="scout-comparison-table">
                    <caption>Side-by-side player comparison (sample profile data)</caption>
                    <thead><tr><th scope="col">Profile</th>{selectedComparePlayers.map(player => <th scope="col" key={player.id}>{player.name}</th>)}</tr></thead>
                    <tbody>
                      <tr><th scope="row">Position</th>{selectedComparePlayers.map(player => <td key={player.id}>{player.position}</td>)}</tr>
                      <tr><th scope="row">Age</th>{selectedComparePlayers.map(player => <td key={player.id}>{player.age}</td>)}</tr>
                      <tr><th scope="row">Country</th>{selectedComparePlayers.map(player => <td key={player.id}>{player.nationality}</td>)}</tr>
                      <tr><th scope="row">Club / academy</th>{selectedComparePlayers.map(player => <td key={player.id}>{player.club}</td>)}</tr>
                      <tr><th scope="row">Preferred foot</th>{selectedComparePlayers.map(player => <td key={player.id}>{player.preferredFoot}</td>)}</tr>
                      <tr><th scope="row">Appearances</th>{selectedComparePlayers.map(player => <td key={player.id}>{player.stats.appearances}</td>)}</tr>
                    </tbody>
                  </table>
                </div>
              )}
              {shortlistPlayers.length ? (
                <div className="scout-player-grid scout-shortlist-grid">
                  {shortlistPlayers.map(({ player, ...entry }) => (
                    <ScoutPlayerCard key={player.id} player={player} shortlisted onToggleShortlist={toggleShortlist} onView={markPlayerDiscovered} shortlistEntry={entry} onUpdateShortlist={updateShortlistEntry} compareSelected={compareIds.includes(player.id)} onToggleCompare={toggleCompare} />
                  ))}
                </div>
              ) : (
                <div className="club-dashboard-empty-state"><Bookmark size={22} /><strong>No players on this list</strong><span>Use Discover Players to add talent to your shortlist.</span><button type="button" className="club-dashboard-text-button" onClick={() => navigateSection('discover')}>Discover players <ArrowRight size={14} /></button></div>
              )}
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="assignments">
              <ScoutSectionHeading kicker="SCOUTING BRIEFS" title="Scouting assignments" action={<span className="club-dashboard-total-count">{assignments.length} sample assignments</span>} />
              <div className="scout-assignment-grid">
                {assignments.map(assignment => {
                  const club = clubsById[assignment.clubId]
                  return (
                    <article className="scout-assignment-card" key={assignment.id}>
                      <div className="scout-assignment-top"><span className={`scout-assignment-status status-${assignment.status.toLowerCase()}`}>{assignment.status}</span><span><Flag size={13} />{assignment.location}</span></div>
                      <h3>{assignment.title}</h3>
                      <p>{assignment.position} · {club?.name}</p>
                      <div className="scout-assignment-due"><span>Target date</span><strong>{assignment.deadline}</strong></div>
                      <Link to={`/clubs/${assignment.clubId}`}>View club brief <ArrowRight size={13} /></Link>
                    </article>
                  )
                })}
              </div>
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="network">
              <ScoutSectionHeading kicker="GLOBAL CLUB NETWORK" title="Club connections" action={<Link to="/clubs" className="club-dashboard-text-button">Explore clubs <ArrowRight size={14} /></Link>} />
              <div className="scout-network-grid">
                <div className="scout-network-panel">
                  <div className="scout-network-panel-heading"><h3>Connected clubs</h3><span>{connectedClubs.length}</span></div>
                  {connectedClubs.length ? connectedClubs.map(club => <ScoutClubCard key={club.id} club={club} connected />) : <p className="scout-network-empty">Clubs you connect with appear here.</p>}
                </div>
                <div className="scout-network-panel">
                  <div className="scout-network-panel-heading"><h3>Connection requests</h3><span>{requestedClubs.length}</span></div>
                  {requestedClubs.length ? requestedClubs.map(club => <ScoutClubCard key={club.id} club={club} pending onAccept={() => acceptClubRequest(club.id)} onDecline={() => declineClubRequest(club.id)} />) : <p className="scout-network-empty">No pending sample requests.</p>}
                </div>
                <div className="scout-network-panel scout-network-suggestions">
                  <div className="scout-network-panel-heading"><h3>Suggested clubs</h3><span>For your scouting focus</span></div>
                  {suggestedClubs.map(club => <ScoutClubCard key={club.id} club={club} sent={sentConnectionIds.includes(club.id)} onConnect={() => sendClubRequest(club.id)} />)}
                </div>
              </div>
            </section>

            <section className="club-dashboard-section scout-dashboard-section scout-dashboard-lower-grid" id="activity">
              <div className="scout-dashboard-panel">
                <ScoutSectionHeading kicker="SCOUTING TIMELINE" title="Recent activity" />
                <div className="scout-activity-list">
                  {activity.map(item => {
                    const ActivityIcon = { discover: Eye, report: FileText, shortlist: Bookmark, network: Handshake, evaluation: Star }[item.type] || Activity
                    return <article className="scout-activity-item" key={item.id}><span><ActivityIcon size={15} /></span><div><strong>{item.title}</strong><small>{item.detail}</small></div><time>{item.time}</time></article>
                  })}
                </div>
              </div>
              <div className="scout-dashboard-panel" id="messages">
                <ScoutSectionHeading kicker="MESSAGES" title="Scout inbox" />
                <div className="scout-messages-notice"><span><MessageCircle size={18} /></span><div><strong>Messaging is not connected</strong><p>This page does not send or receive real messages. Club contact links open their sample public profiles.</p><button type="button" className="club-dashboard-text-button" onClick={() => navigateSection('network')}>View club network <ArrowRight size={14} /></button></div></div>
              </div>
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="notifications">
              <ScoutSectionHeading kicker="UPDATES" title="Notifications" action={<button type="button" className="club-dashboard-text-button" onClick={markAllNotificationsRead} disabled={!unreadCount}>Mark all read</button>} />
              <div className="scout-notification-list">
                {notifications.map(notification => (
                  <article key={notification.id} className={notification.read ? 'scout-notification is-read' : 'scout-notification'}>
                    <span><Bell size={15} /></span>
                    <div><strong>{notification.title}</strong><p>{notification.detail}</p><small>{notification.time}</small></div>
                    {!notification.read && <button type="button" onClick={() => markNotificationRead(notification.id)} aria-label={`Mark ${notification.title} as read`}>Mark read</button>}
                  </article>
                ))}
              </div>
            </section>

            <section className="club-dashboard-section scout-dashboard-section" id="settings">
              <ScoutSectionHeading kicker="PREFERENCES" title="Settings" />
              <div className="scout-settings-card">
                <label><span><strong>Scout profile visibility</strong><small>Show your sample professional profile in the directory.</small></span><input type="checkbox" checked={profileVisibility} onChange={event => setProfileVisibility(event.target.checked)} /></label>
                <label><span><strong>Email notification preference</strong><small>Frontend-only preference; no email is sent.</small></span><input type="checkbox" checked={emailNotifications} onChange={event => setEmailNotifications(event.target.checked)} /></label>
                <p><Shield size={14} /> Demo preferences are held in page state and reset on refresh.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      {profileEditorOpen && <ScoutProfileEditorModal profile={profile} onClose={() => setProfileEditorOpen(false)} onSave={saveProfile} />}
      {reportEditorOpen && <ScoutReportEditorModal report={editingReport} players={playerProfiles} onClose={() => { setReportEditorOpen(false); setEditingReport(null) }} onSave={saveReport} />}
    </>
  )
}
