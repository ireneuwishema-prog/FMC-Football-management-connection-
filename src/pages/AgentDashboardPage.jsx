import { useMemo, useState } from 'react'
import {
  ArrowRight, Bell, Bookmark, BookmarkCheck, Briefcase, Building2,
  CalendarDays, Check, CheckCircle2, Clock3, Eye, FileText, Filter,
  Handshake, Home, LogOut, MapPin, MessageCircle, Pencil, Plus, Search,
  Send, Settings, Shield, Users, X,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClubLogo from '../components/ClubLogo'
import DashboardAccessAction from '../components/DashboardAccessAction'
import AgentOpportunityInquiryModal from '../components/AgentOpportunityInquiryModal'
import AgentProfileEditorModal from '../components/AgentProfileEditorModal'
import AgentRepresentationEditorModal from '../components/AgentRepresentationEditorModal'
import clubProfiles from '../data/clubProfiles'
import playerProfiles from '../data/playerProfiles'
import professionals from '../data/professionals'
import {
  agentCareerOpportunities, initialAgentActivity, initialAgentApplications,
  initialAgentClubRequestIds, initialAgentConnectedClubIds,
  initialAgentConnectedProfessionalIds, initialAgentConnectionRequestIds,
  initialAgentConversations, initialAgentNotifications, initialAgentPlayerLists,
  initialAgentPlayerRequests, initialAgentProfile, initialAgentRepresentations,
} from '../data/agentDashboardData'

const ageRanges = ['16–18', '19–21', '22–24', '25+']
const applicationStatuses = ['Interested', 'Inquiry sent', 'Under review', 'Closed']

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: Home },
  { id: 'profile', label: 'My Profile', icon: Users },
  { id: 'represented', label: 'Represented Players', icon: Briefcase },
  { id: 'discover', label: 'Discover Talent', icon: Search },
  { id: 'opportunities', label: 'Career Opportunities', icon: CalendarDays },
  { id: 'applications', label: 'Applications', icon: FileText },
  { id: 'network', label: 'Professional Network', icon: Handshake },
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

function getProfileCompletion(profile) {
  const fields = [profile.name, profile.agencyName, profile.country, profile.location, profile.experience, profile.bio, profile.specializations.length, profile.image]
  return Math.round(fields.filter(Boolean).length / fields.length * 100)
}

function DashboardSidebar({ activeSection, onNavigate, onLogout, unreadCount, profile }) {
  return (
    <aside className="club-dashboard-sidebar agent-dashboard-sidebar">
      <div className="club-dashboard-sidebar-heading">
        <img src={profile.image} alt="" />
        <div><strong>AGENT HUB</strong><small>{profile.name.toUpperCase()}</small></div>
      </div>
      <nav className="club-dashboard-sidebar-nav" aria-label="Agent dashboard navigation">
        {sidebarItems.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" className={activeSection === id ? 'club-dashboard-nav-link active' : 'club-dashboard-nav-link'} onClick={() => onNavigate(id)} aria-current={activeSection === id ? 'page' : undefined}>
            <Icon size={16} /><span>{label}</span>
            {id === 'notifications' && unreadCount > 0 && <span className="club-dashboard-nav-count">{unreadCount}</span>}
          </button>
        ))}
        <button type="button" className="club-dashboard-nav-link club-dashboard-logout" onClick={onLogout}><LogOut size={16} /><span>Logout</span></button>
      </nav>
      <div className="club-dashboard-demo-note"><Shield size={14} /><span>Sample agent workspace. Changes are temporary.</span></div>
    </aside>
  )
}

function AgentSectionHeading({ kicker, title, action }) {
  return (
    <div className="club-dashboard-section-heading">
      <div><span className="kicker">{kicker}</span><h2>{title}</h2></div>
      {action}
    </div>
  )
}

function AgentStatCard({ icon: Icon, label, value, note, tone }) {
  return (
    <article className={`club-dashboard-stat-card ${tone}`}>
      <span className="club-dashboard-stat-icon"><Icon size={18} /></span>
      <span className="club-dashboard-stat-label">{label}</span>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}

function AgentRepresentationCard({ entry, player, removeRequested, onEdit, onRemoveRequest, onCancelRemove, onConfirmRemove }) {
  return (
    <article className="agent-represented-card">
      <Link to={`/discover/${player.id}`} className="agent-represented-photo"><img src={player.image} alt={`${player.name} profile`} loading="lazy" /></Link>
      <div className="agent-represented-content">
        <div className="agent-represented-heading">
          <div><Link to={`/discover/${player.id}`}>{player.name}</Link><span>{player.position} · {player.nationality}</span></div>
          <span className="agent-player-status">{entry.representationStatus}</span>
        </div>
        <div className="agent-represented-meta"><span>{player.club}</span><span>{entry.careerStatus}</span><span>{entry.list}</span></div>
        {entry.notes && <p>{entry.notes}</p>}
        {!removeRequested ? (
          <div className="agent-card-actions">
            <Link to={`/discover/${player.id}`} className="club-dashboard-secondary-button">View profile</Link>
            <button type="button" className="club-dashboard-secondary-button" onClick={onEdit}><Pencil size={13} /> Update details</button>
            <button type="button" className="agent-remove-button" onClick={onRemoveRequest}>Remove</button>
          </div>
        ) : (
          <div className="agent-removal-confirmation" role="group" aria-label={`Confirm removing ${player.name}`}>
            <span>Remove {player.name} from this demo workspace?</span>
            <button type="button" onClick={onConfirmRemove}>Confirm remove</button>
            <button type="button" onClick={onCancelRemove}>Cancel</button>
          </div>
        )}
      </div>
    </article>
  )
}

function AgentPlayerRequestCard({ request, player, onAdd, onDismiss }) {
  return (
    <article className="agent-player-request-card">
      <img src={player.image} alt="" loading="lazy" />
      <div><strong>{player.name} <span>· {player.position}</span></strong><p>{request.message}</p><small>Received {request.receivedAt} · {player.nationality}</small></div>
      <div className="agent-player-request-actions">
        <Link to={`/discover/${player.id}`} className="club-dashboard-secondary-button">View profile</Link>
        <button type="button" className="button button-primary" onClick={onAdd}><Plus size={13} />Add to workspace</button>
        <button type="button" className="agent-remove-button" onClick={onDismiss}>Dismiss</button>
      </div>
    </article>
  )
}

function AgentDiscoveryCard({ player, saved, represented, inquirySent, onToggleSave, onAdd, onInquiry }) {
  return (
    <article className="agent-discovery-card">
      <Link to={`/discover/${player.id}`} className="agent-discovery-image"><img src={player.image} alt={`${player.name} profile`} loading="lazy" /></Link>
      <div className="agent-discovery-body">
        <div className="agent-discovery-heading">
          <div><Link to={`/discover/${player.id}`}>{player.name}</Link><span>{player.position}</span></div>
          <button type="button" className="club-dashboard-icon-button" onClick={() => onToggleSave(player)} aria-label={`${saved ? 'Unsave' : 'Save'} ${player.name}`} aria-pressed={saved}><Bookmark size={15} fill={saved ? 'currentColor' : 'none'} /></button>
        </div>
        <div className="agent-player-tags"><span>{player.nationality}</span><span>Age {player.age}</span><span>{player.preferredFoot} foot</span></div>
        <small>{player.club}</small>
        <p>{player.description}</p>
        <div className="agent-discovery-actions">
          <Link to={`/discover/${player.id}`}>View profile <ArrowRight size={13} /></Link>
          {represented
            ? <span className="agent-listed-indicator"><CheckCircle2 size={13} />In workspace</span>
            : <>
              <button type="button" className="agent-inline-add" onClick={() => onAdd(player)}><Plus size={13} /> Add to workspace</button>
              <button type="button" className="agent-inline-inquiry" onClick={() => onInquiry(player)} disabled={inquirySent}>{inquirySent ? 'Inquiry saved' : 'Send inquiry'}</button>
            </>}
        </div>
      </div>
    </article>
  )
}

function AgentOpportunityCard({ opportunity, club, matchingPlayer, application, saved, onToggleSave, onInquiry }) {
  return (
    <article className="agent-opportunity-card">
      <div className="agent-opportunity-top">
        <Link to={`/clubs/${club.id}`} className="agent-opportunity-club"><ClubLogo club={club} size="small" /><span>{club.name}</span></Link>
        <span className={`agent-opportunity-status ${application ? 'has-application' : ''}`}>{application?.status || 'Open'}</span>
      </div>
      <h3>{opportunity.title}</h3>
      <div className="agent-opportunity-meta">
        <span>{opportunity.position}</span>
        <span><MapPin size={13} />{club.country}</span>
        <span><CalendarDays size={13} />Closes {opportunity.deadline}</span>
      </div>
      <p>{opportunity.description}</p>
      <div className="agent-opportunity-match"><span>Player match</span><strong>{matchingPlayer ? `${matchingPlayer.name} · ${matchingPlayer.position}` : 'Review fit with your players'}</strong></div>
      <div className="agent-opportunity-actions">
        <button type="button" className="club-dashboard-secondary-button" onClick={() => onToggleSave(opportunity)} aria-pressed={saved}>{saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}{saved ? 'Saved' : 'Save'}</button>
        <Link to={`/opportunities/${opportunity.id}`} className="club-dashboard-secondary-button">Details <ArrowRight size={13} /></Link>
        <button type="button" className="button button-primary" onClick={() => onInquiry(opportunity)}>{application ? 'Add player inquiry' : 'Match a player'}</button>
      </div>
    </article>
  )
}

function AgentProfessionalCard({ person, status, onAccept, onDecline, onConnect }) {
  return (
    <article className="agent-network-person">
      <img src={person.image} alt="" loading="lazy" />
      <div className="agent-network-person-copy">
        <strong><Link to={`/professionals/${person.id}`}>{person.name}</Link>{person.verified && <CheckCircle2 size={13} aria-label="Demonstration profile badge" />}</strong>
        <span>{person.role} · {person.country}</span>
        <small>{person.organization}</small>
      </div>
      {status === 'connected'
        ? <span className="agent-connected-status"><CheckCircle2 size={13} />Connected</span>
        : status === 'pending'
          ? <div className="agent-network-actions"><button type="button" onClick={onAccept}><Check size={13} />Accept</button><button type="button" onClick={onDecline}>Decline</button></div>
          : <button type="button" className="agent-network-connect" onClick={onConnect} disabled={status === 'sent'}>{status === 'sent' ? 'Request sent' : 'Connect'}</button>}
    </article>
  )
}

function AgentClubCard({ club, connected, pending, sent, onAccept, onDecline, onConnect }) {
  return (
    <article className="agent-network-club">
      <Link to={`/clubs/${club.id}`} className="agent-network-club-main"><ClubLogo club={club} size="small" /><span><strong>{club.name}</strong><small>{club.country} · {club.league}</small></span></Link>
      {connected
        ? <span className="agent-connected-status"><CheckCircle2 size={13} />Connected</span>
        : pending
          ? <div className="agent-network-actions"><button type="button" onClick={onAccept}><Check size={13} />Accept</button><button type="button" onClick={onDecline}>Decline</button></div>
          : <button type="button" className="agent-network-connect" onClick={onConnect} disabled={sent}>{sent ? 'Request sent' : 'Connect'}</button>}
    </article>
  )
}

export default function AgentDashboardPage() {
  const [profile, setProfile] = useState(initialAgentProfile)
  const [representations, setRepresentations] = useState(initialAgentRepresentations)
  const [playerRequests, setPlayerRequests] = useState(initialAgentPlayerRequests)
  const [playerLists, setPlayerLists] = useState(initialAgentPlayerLists)
  const [savedPlayerIds, setSavedPlayerIds] = useState(['youssef-amrani', 'haruto-sato'])
  const [sentPlayerInquiryIds, setSentPlayerInquiryIds] = useState([])
  const [savedOpportunityIds, setSavedOpportunityIds] = useState(['atletico-fullback-search'])
  const [applications, setApplications] = useState(initialAgentApplications)
  const [connectedProfessionalIds, setConnectedProfessionalIds] = useState(initialAgentConnectedProfessionalIds)
  const [connectionRequestIds, setConnectionRequestIds] = useState(initialAgentConnectionRequestIds)
  const [sentConnectionIds, setSentConnectionIds] = useState([])
  const [connectedClubIds, setConnectedClubIds] = useState(initialAgentConnectedClubIds)
  const [clubRequestIds, setClubRequestIds] = useState(initialAgentClubRequestIds)
  const [sentClubConnectionIds, setSentClubConnectionIds] = useState([])
  const [conversations, setConversations] = useState(initialAgentConversations)
  const [selectedConversationId, setSelectedConversationId] = useState(initialAgentConversations[0]?.id || '')
  const [messageDraft, setMessageDraft] = useState('')
  const [notifications, setNotifications] = useState(initialAgentNotifications)
  const [activity, setActivity] = useState(initialAgentActivity)
  const [activeSection, setActiveSection] = useState('overview')
  const [discoverySearch, setDiscoverySearch] = useState('')
  const [discoveryFilters, setDiscoveryFilters] = useState({ position: '', country: '', age: '' })
  const [opportunitySearch, setOpportunitySearch] = useState('')
  const [opportunityPositionFilter, setOpportunityPositionFilter] = useState('')
  const [listFilter, setListFilter] = useState('')
  const [newListName, setNewListName] = useState('')
  const [removeRequestedId, setRemoveRequestedId] = useState('')
  const [editingRepresentation, setEditingRepresentation] = useState(null)
  const [representationEditorOpen, setRepresentationEditorOpen] = useState(false)
  const [profileEditorOpen, setProfileEditorOpen] = useState(false)
  const [inquiryOpportunity, setInquiryOpportunity] = useState(null)
  const [inquiryPlayer, setInquiryPlayer] = useState(null)
  const [feedback, setFeedback] = useState('')
  const [profileVisibility, setProfileVisibility] = useState(true)
  const [emailNotifications, setEmailNotifications] = useState(true)

  const playersById = useMemo(() => Object.fromEntries(playerProfiles.map(player => [player.id, player])), [])
  const professionalsById = useMemo(() => Object.fromEntries(professionals.map(person => [person.id, person])), [])
  const clubsById = useMemo(() => Object.fromEntries(clubProfiles.map(club => [club.id, club])), [])
  const countries = useMemo(() => [...new Set(playerProfiles.map(player => player.nationality))].sort(), [])
  const positions = useMemo(() => [...new Set(playerProfiles.map(player => player.position))].sort(), [])
  const opportunityPositions = useMemo(() => [...new Set(agentCareerOpportunities.map(opportunity => opportunity.position))].sort(), [])
  const completion = getProfileCompletion(profile)
  const unreadCount = notifications.filter(notification => !notification.read).length
  const representedIds = representations.map(entry => entry.playerId)
  const representedPlayers = representations.map(entry => ({ ...entry, player: playersById[entry.playerId] })).filter(entry => entry.player)
  const displayedRepresentations = representedPlayers.filter(entry => !listFilter || entry.list === listFilter)
  const availablePlayers = playerProfiles.filter(player => !representedIds.includes(player.id))
  const connectedProfessionals = connectedProfessionalIds.map(id => professionalsById[id]).filter(Boolean)
  const requestedProfessionals = connectionRequestIds.map(id => professionalsById[id]).filter(Boolean)
  const suggestedProfessionals = professionals.filter(person =>
    person.id !== profile.id &&
    !connectedProfessionalIds.includes(person.id) &&
    !connectionRequestIds.includes(person.id)
  )
  const connectedClubs = connectedClubIds.map(id => clubsById[id]).filter(Boolean)
  const requestedClubs = clubRequestIds.map(id => clubsById[id]).filter(Boolean)
  const suggestedClubs = clubProfiles.filter(club =>
    !connectedClubIds.includes(club.id) &&
    !clubRequestIds.includes(club.id)
  )
  const displayedPlayers = playerProfiles.filter(player => {
    const query = discoverySearch.trim().toLowerCase()
    return (!query || player.name.toLowerCase().includes(query) || player.club.toLowerCase().includes(query)) &&
      (!discoveryFilters.position || player.position === discoveryFilters.position) &&
      (!discoveryFilters.country || player.nationality === discoveryFilters.country) &&
      (!discoveryFilters.age || getAgeRange(player.age) === discoveryFilters.age)
  })
  const displayedOpportunities = agentCareerOpportunities.filter(opportunity => {
    const club = clubsById[opportunity.clubId]
    const query = opportunitySearch.trim().toLowerCase()
    return (!query || opportunity.title.toLowerCase().includes(query) || club?.name.toLowerCase().includes(query)) &&
      (!opportunityPositionFilter || opportunity.position === opportunityPositionFilter)
  })
  const selectedConversation = conversations.find(conversation => conversation.id === selectedConversationId)
  const selectedContact = selectedConversation ? professionalsById[selectedConversation.professionalId] : null
  const pendingPlayerRequests = playerRequests.length
  const activeNegotiations = applications.filter(application => application.status === 'Under review').length

  function showFeedback(message) {
    setFeedback(message)
  }

  function pushActivity(item) {
    setActivity(current => [{ ...item, id: `agent-activity-${Date.now()}`, time: 'Just now' }, ...current].slice(0, 7))
  }

  function navigateSection(section) {
    setActiveSection(section)
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function toggleId(setter, id) {
    setter(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id])
  }

  function updateDiscoveryFilter(event) {
    setDiscoveryFilters(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function saveAgentProfile(updatedProfile) {
    setProfile(updatedProfile)
    setProfileEditorOpen(false)
    showFeedback('Agent profile updated for this demo session only.')
  }

  function openRepresentationEditor(representation = null, player = null) {
    setEditingRepresentation(representation || {
      playerId: player?.id || availablePlayers[0]?.id || '',
      list: listFilter || playerLists[0] || '',
    })
    setRepresentationEditorOpen(true)
  }

  function saveRepresentation(updatedEntry) {
    const exists = representations.some(entry => entry.id === updatedEntry.id)
    setRepresentations(current => exists
      ? current.map(entry => entry.id === updatedEntry.id ? updatedEntry : entry)
      : [{ ...updatedEntry, id: updatedEntry.id || `agent-representation-${Date.now()}` }, ...current])
    if (!exists) setPlayerRequests(current => current.filter(request => request.playerId !== updatedEntry.playerId))
    setRepresentationEditorOpen(false)
    setEditingRepresentation(null)
    const player = playersById[updatedEntry.playerId]
    showFeedback(exists ? `${player?.name || 'Player'} workspace details updated.` : `${player?.name || 'Player'} added to your demo workspace.`)
    pushActivity({ type: 'player', title: exists ? 'Player workspace updated' : 'Player added to workspace', detail: `${player?.name || 'Player'} · ${updatedEntry.representationStatus}` })
  }

  function confirmRemoveRepresentation(entry) {
    const player = playersById[entry.playerId]
    setRepresentations(current => current.filter(item => item.id !== entry.id))
    setRemoveRequestedId('')
    showFeedback(`${player?.name || 'Player'} removed from this demo workspace. No legal relationship was changed.`)
    pushActivity({ type: 'player', title: 'Player removed from workspace', detail: player?.name || 'Sample player' })
  }

  function dismissPlayerRequest(request) {
    const player = playersById[request.playerId]
    setPlayerRequests(current => current.filter(item => item.id !== request.id))
    showFeedback(`${player?.name || 'Player'} inquiry dismissed in this demo.`)
  }

  function createPlayerList(event) {
    event.preventDefault()
    const name = newListName.trim()
    if (!name) return
    if (playerLists.some(list => list.toLowerCase() === name.toLowerCase())) {
      showFeedback('A player list with that name already exists.')
      return
    }
    setPlayerLists(current => [...current, name])
    setNewListName('')
    showFeedback(`“${name}” list created for this demo.`)
  }

  function toggleSavedPlayer(player) {
    const wasSaved = savedPlayerIds.includes(player.id)
    toggleId(setSavedPlayerIds, player.id)
    showFeedback(wasSaved ? `${player.name} removed from saved players.` : `${player.name} saved to your talent list.`)
  }

  function sendPlayerInquiry(player) {
    if (representedIds.includes(player.id)) {
      showFeedback(`${player.name} is already in your workspace.`)
      return
    }
    setSentPlayerInquiryIds(current => current.includes(player.id) ? current : [...current, player.id])
    showFeedback(`Sample representation inquiry saved for ${player.name}. No message was sent.`)
    pushActivity({ type: 'inquiry', title: 'Player inquiry saved', detail: `${player.name} · ${player.position}` })
  }

  function toggleSavedOpportunity(opportunity) {
    const wasSaved = savedOpportunityIds.includes(opportunity.id)
    toggleId(setSavedOpportunityIds, opportunity.id)
    showFeedback(wasSaved ? `${opportunity.title} removed from saved opportunities.` : `${opportunity.title} saved for this demo.`)
  }

  function startOpportunityInquiry(opportunity) {
    if (!representedPlayers.length) {
      showFeedback('Add a player to your workspace before creating an opportunity inquiry.')
      navigateSection('represented')
      return
    }
    setInquiryOpportunity(opportunity)
  }

  function submitOpportunityInquiry({ playerId, notes }) {
    const player = playersById[playerId]
    const existingApplication = applications.find(application => application.playerId === playerId && application.opportunityId === inquiryOpportunity.id)
    const nextApplication = {
      id: existingApplication?.id || `agent-inquiry-${Date.now()}`,
      playerId,
      opportunityId: inquiryOpportunity.id,
      status: 'Inquiry sent',
      updatedAt: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
      notes,
    }
    setApplications(current => existingApplication
      ? current.map(application => application.id === existingApplication.id ? nextApplication : application)
      : [nextApplication, ...current])
    setInquiryOpportunity(null)
    showFeedback(`Demo inquiry saved for ${player?.name || 'player'}; nothing was sent to the club.`)
    pushActivity({ type: 'inquiry', title: 'Opportunity inquiry saved', detail: `${player?.name || 'Player'} · ${inquiryOpportunity.title}` })
  }

  function updateApplicationStatus(id, status) {
    setApplications(current => current.map(application => application.id === id ? { ...application, status, updatedAt: 'Just now' } : application))
    showFeedback(`Opportunity status changed to “${status}” in this demo.`)
  }

  function handleAcceptProfessional(id) {
    const person = professionalsById[id]
    setConnectionRequestIds(current => current.filter(requestId => requestId !== id))
    setConnectedProfessionalIds(current => current.includes(id) ? current : [id, ...current])
    showFeedback(`${person?.name || 'Professional'} added to your sample network.`)
    pushActivity({ type: 'network', title: 'Professional connection accepted', detail: `${person?.name || 'Professional'} · ${person?.role || ''}` })
  }

  function handleDeclineProfessional(id) {
    setConnectionRequestIds(current => current.filter(requestId => requestId !== id))
    showFeedback('Sample connection request declined.')
  }

  function handleConnectProfessional(id) {
    const person = professionalsById[id]
    setSentConnectionIds(current => current.includes(id) ? current : [...current, id])
    showFeedback(`Sample connection request prepared for ${person?.name || 'professional'}. No message was sent.`)
  }

  function handleAcceptClub(id) {
    const club = clubsById[id]
    setClubRequestIds(current => current.filter(requestId => requestId !== id))
    setConnectedClubIds(current => current.includes(id) ? current : [id, ...current])
    showFeedback(`${club?.name || 'Club'} added to your sample network.`)
  }

  function handleDeclineClub(id) {
    setClubRequestIds(current => current.filter(requestId => requestId !== id))
    showFeedback('Sample club connection request declined.')
  }

  function handleConnectClub(id) {
    const club = clubsById[id]
    setSentClubConnectionIds(current => current.includes(id) ? current : [...current, id])
    showFeedback(`Sample connection request prepared for ${club?.name || 'club'}.`)
  }

  function markNotificationRead(id) {
    setNotifications(current => current.map(notification => notification.id === id ? { ...notification, read: true } : notification))
  }

  function markAllNotificationsRead() {
    setNotifications(current => current.map(notification => ({ ...notification, read: true })))
    showFeedback('All sample agent notifications marked as read.')
  }

  function selectConversation(conversationId) {
    setSelectedConversationId(conversationId)
    setConversations(current => current.map(conversation => conversation.id === conversationId ? { ...conversation, unread: 0 } : conversation))
  }

  function sendDemoMessage(event) {
    event.preventDefault()
    const message = messageDraft.trim()
    if (!message || !selectedConversation) return
    setConversations(current => current.map(conversation => conversation.id === selectedConversation.id
      ? { ...conversation, updatedAt: 'Just now', messages: [...conversation.messages, { id: `local-message-${Date.now()}`, sender: 'you', text: message, time: 'Just now' }] }
      : conversation))
    setMessageDraft('')
    showFeedback('Demo message added to this page only. It was not delivered.')
  }

  function handleLogout() {
    showFeedback('This is a sample agent workspace; there is no signed-in session to end.')
  }

  const clearDiscoveryFilters = () => {
    setDiscoverySearch('')
    setDiscoveryFilters({ position: '', country: '', age: '' })
  }
  const hasDiscoveryFilters = Boolean(discoverySearch.trim() || Object.values(discoveryFilters).some(Boolean))
  const clearOpportunityFilters = () => {
    setOpportunitySearch('')
    setOpportunityPositionFilter('')
  }
  const hasOpportunityFilters = Boolean(opportunitySearch.trim() || opportunityPositionFilter)

  return (
    <>
      <Navbar />
      <main className="club-dashboard-page agent-dashboard-page">
        <div className="club-dashboard-layout agent-dashboard-layout">
          <DashboardSidebar activeSection={activeSection} onNavigate={navigateSection} onLogout={handleLogout} unreadCount={unreadCount} profile={profile} />

          <div className="club-dashboard-content agent-dashboard-content">
            {feedback && (
              <div className="club-dashboard-feedback" role="status" aria-live="polite">
                <CheckCircle2 size={16} /><span>{feedback}</span>
                <button type="button" onClick={() => setFeedback('')} aria-label="Dismiss confirmation"><X size={15} /></button>
              </div>
            )}

            <section className="club-dashboard-hero agent-dashboard-hero" id="overview">
              <div className="club-dashboard-hero-copy">
                <span className="club-dashboard-eyebrow"><span /> AGENT WORKSPACE · FICTIONAL DEMO</span>
                <h1>Welcome back,<br /><em>{profile.name}</em></h1>
                <p>Support player careers, find fitting opportunities and grow a trusted network across the game.</p>
                <div className="club-dashboard-hero-meta"><span><MapPin size={14} />{profile.location}</span><span><Briefcase size={14} />{profile.agencyName}</span></div>
                <div className="club-dashboard-hero-actions">
                  <button type="button" className="button button-primary" onClick={() => navigateSection('represented')}><Users size={15} /> Manage players</button>
                  <button type="button" className="club-dashboard-hero-secondary" onClick={() => navigateSection('opportunities')}>Find opportunities <ArrowRight size={14} /></button>
                </div>
              </div>
              <div className="club-dashboard-hero-aside">
                <img className="agent-dashboard-portrait" src={profile.image} alt={`${profile.name} profile`} />
                <div className="club-dashboard-completion">
                  <span className="club-dashboard-completion-ring" style={{ '--club-completion': `${completion}%` }} role="progressbar" aria-label="Agent profile completion" aria-valuemin={0} aria-valuemax={100} aria-valuenow={completion}><span>{completion}%</span></span>
                  <div><strong>Profile completeness</strong><small>{completion === 100 ? 'Your profile is complete.' : 'Add details to strengthen your profile.'}</small></div>
                </div>
                <button type="button" className="club-dashboard-edit-profile" onClick={() => setProfileEditorOpen(true)}><Pencil size={14} /> Edit agent profile</button>
              </div>
            </section>

            <section className="club-dashboard-stats-grid agent-dashboard-stats-grid" aria-label="Agent dashboard statistics">
              <AgentStatCard icon={Users} label="Represented players" value={representations.length} note="Players in this sample workspace" tone="stat-green" />
              <AgentStatCard icon={Briefcase} label="Active opportunities" value={agentCareerOpportunities.length} note="Fictional recruitment listings" tone="stat-navy" />
              <AgentStatCard icon={Clock3} label="Pending player requests" value={pendingPlayerRequests} note="Inbound sample inquiries to review" tone="stat-blue" />
              <AgentStatCard icon={Handshake} label="Professional connections" value={connectedProfessionalIds.length + connectedClubIds.length} note="Sample clubs and professionals" tone="stat-purple" />
              <AgentStatCard icon={FileText} label="Active negotiations" value={activeNegotiations} note="Demo items marked under review" tone="stat-orange" />
              <AgentStatCard icon={Eye} label="Profile views" value="846" note="Illustrative views this month" tone="stat-red" />
            </section>

            <section className="club-dashboard-section agent-dashboard-section" id="profile">
              <AgentSectionHeading kicker="PROFESSIONAL IDENTITY" title="Agent profile" action={<button type="button" className="club-dashboard-text-button" onClick={() => setProfileEditorOpen(true)}>Edit profile <Pencil size={14} /></button>} />
              <div className="agent-profile-overview">
                <img src={profile.image} alt={`${profile.name} profile`} />
                <div className="agent-profile-copy">
                  <span className="agent-profile-role">Football Agent · {profile.experience} years' experience</span>
                  <h3>{profile.name}</h3>
                  <div className="agent-profile-meta"><span><Briefcase size={14} />{profile.agencyName || 'Independent'}</span><span><MapPin size={14} />{profile.location} · {profile.country}</span></div>
                  <p>{profile.bio}</p>
                  <div className="agent-specialization-list"><strong>Areas of specialization</strong><div>{profile.specializations.map(item => <span key={item}>{item}</span>)}</div></div>
                  <Link to={`/professionals/${profile.id}`} className="agent-profile-public-link">View public professional profile <ArrowRight size={14} /></Link>
                </div>
                <div className="agent-profile-score"><span>PROFILE COMPLETE</span><strong>{completion}%</strong><div><i style={{ width: `${completion}%` }} /></div><small>Keep your experience and focus areas current.</small></div>
              </div>
              <DashboardAccessAction onClick={() => navigateSection('overview')} title="Visit the Agent Dashboard" description="Return to your dashboard overview." />
            </section>

            <section className="club-dashboard-section agent-dashboard-section" id="represented">
              <AgentSectionHeading kicker="PLAYER MANAGEMENT" title="My represented players" action={<button type="button" className="button button-primary club-dashboard-compact-button" onClick={() => openRepresentationEditor()} disabled={!availablePlayers.length}><Plus size={15} /> Add player</button>} />
              <div className="agent-represented-toolbar">
                <label><span>Player list</span><select value={listFilter} onChange={event => setListFilter(event.target.value)}><option value="">All lists</option>{playerLists.map(list => <option key={list}>{list}</option>)}</select></label>
                <form onSubmit={createPlayerList} className="agent-create-list-form">
                  <label><span>Create player list</span><input value={newListName} onChange={event => setNewListName(event.target.value)} maxLength={40} placeholder="e.g. Summer targets" /></label>
                  <button type="submit" className="club-dashboard-secondary-button" disabled={!newListName.trim()}><Plus size={14} /> Create list</button>
                </form>
              </div>
              <p className="agent-demo-disclaimer"><Shield size={14} /> These sample workspace entries do not establish or imply any legal representation agreement.</p>
              {playerRequests.length > 0 && (
                <div className="agent-player-requests">
                  <div className="agent-player-requests-heading"><div><span className="kicker">INBOUND INTEREST</span><h3>Player inquiries</h3></div><span>{pendingPlayerRequests} pending</span></div>
                  {playerRequests.map(request => {
                    const player = playersById[request.playerId]
                    return player ? <AgentPlayerRequestCard key={request.id} request={request} player={player} onAdd={() => openRepresentationEditor(null, player)} onDismiss={() => dismissPlayerRequest(request)} /> : null
                  })}
                </div>
              )}
              {displayedRepresentations.length ? (
                <div className="agent-represented-list">
                  {displayedRepresentations.map(entry => (
                    <AgentRepresentationCard
                      key={entry.id}
                      entry={entry}
                      player={entry.player}
                      removeRequested={removeRequestedId === entry.id}
                      onEdit={() => openRepresentationEditor(entry)}
                      onRemoveRequest={() => setRemoveRequestedId(entry.id)}
                      onCancelRemove={() => setRemoveRequestedId('')}
                      onConfirmRemove={() => confirmRemoveRepresentation(entry)}
                    />
                  ))}
                </div>
              ) : (
                <div className="club-dashboard-empty-state"><Briefcase size={22} /><strong>{listFilter ? 'No players in this list' : 'No players in your workspace yet'}</strong><span>Add sample players from talent discovery to organize career planning.</span><button type="button" className="club-dashboard-text-button" onClick={() => navigateSection('discover')}>Discover talent <ArrowRight size={14} /></button></div>
              )}
            </section>

            <section className="club-dashboard-section agent-dashboard-section" id="discover">
              <AgentSectionHeading kicker="GLOBAL PLAYER DIRECTORY" title="Discover talent" action={<Link className="club-dashboard-text-button" to="/discover#player-directory">Open full directory <ArrowRight size={14} /></Link>} />
              <div className="club-discovery-toolbar agent-discovery-toolbar">
                <label className="club-dashboard-search-field"><Search size={16} /><span className="visually-hidden">Search player name or club</span><input type="search" value={discoverySearch} onChange={event => setDiscoverySearch(event.target.value)} placeholder="Search name or current club..." /></label>
                <label><span>Position</span><select name="position" value={discoveryFilters.position} onChange={updateDiscoveryFilter}><option value="">All positions</option>{positions.map(position => <option key={position}>{position}</option>)}</select></label>
                <label><span>Country</span><select name="country" value={discoveryFilters.country} onChange={updateDiscoveryFilter}><option value="">All countries</option>{countries.map(country => <option key={country}>{country}</option>)}</select></label>
                <label><span>Age</span><select name="age" value={discoveryFilters.age} onChange={updateDiscoveryFilter}><option value="">All ages</option>{ageRanges.map(range => <option key={range}>{range}</option>)}</select></label>
                <button type="button" className="club-dashboard-clear-filters" onClick={clearDiscoveryFilters} disabled={!hasDiscoveryFilters}><Filter size={14} />Clear filters</button>
              </div>
              <div className="agent-result-note">{displayedPlayers.length} fictional player profiles <span>·</span> Save profiles or prepare a sample representation inquiry.</div>
              {displayedPlayers.length ? (
                <div className="agent-discovery-grid">
                  {displayedPlayers.map(player => (
                    <AgentDiscoveryCard
                      key={player.id}
                      player={player}
                      saved={savedPlayerIds.includes(player.id)}
                      represented={representedIds.includes(player.id)}
                      inquirySent={sentPlayerInquiryIds.includes(player.id)}
                      onToggleSave={toggleSavedPlayer}
                      onAdd={openRepresentationEditor}
                      onInquiry={sendPlayerInquiry}
                    />
                  ))}
                </div>
              ) : <div className="club-dashboard-empty-state"><Search size={22} /><strong>No players match these filters</strong><span>Adjust your search or clear the selected filters.</span><button type="button" className="club-dashboard-text-button" onClick={clearDiscoveryFilters}>Clear filters</button></div>}
              <div className="agent-saved-talent">
                <div className="agent-saved-talent-heading"><div><span className="kicker">YOUR SAVED PROFILES</span><h3>Saved talent</h3></div><span>{savedPlayerIds.length} saved</span></div>
                {savedPlayerIds.length ? (
                  <div className="agent-saved-player-list">
                    {savedPlayerIds.map(id => playersById[id]).filter(Boolean).map(player => (
                      <article key={player.id} className="agent-saved-player-row">
                        <img src={player.image} alt="" loading="lazy" />
                        <div><Link to={`/discover/${player.id}`}>{player.name}</Link><span>{player.position} · {player.nationality} · Age {player.age}</span><small>{player.club}</small></div>
                        <button type="button" className="club-dashboard-icon-button" onClick={() => toggleSavedPlayer(player)} aria-label={`Remove ${player.name} from saved players`}><BookmarkCheck size={15} /></button>
                      </article>
                    ))}
                  </div>
                ) : <p className="agent-saved-empty">Save a player from discovery to keep their profile here.</p>}
              </div>
            </section>

            <section className="club-dashboard-section agent-dashboard-section" id="opportunities">
              <AgentSectionHeading kicker="CAREER PATHWAYS" title="Career opportunities" action={<Link className="club-dashboard-text-button" to="/clubs#opportunities">Browse recruitment directory <ArrowRight size={14} /></Link>} />
              <div className="club-discovery-toolbar agent-opportunity-toolbar">
                <label className="club-dashboard-search-field"><Search size={16} /><span className="visually-hidden">Search opportunities or clubs</span><input type="search" value={opportunitySearch} onChange={event => setOpportunitySearch(event.target.value)} placeholder="Search role or club..." /></label>
                <label><span>Position</span><select value={opportunityPositionFilter} onChange={event => setOpportunityPositionFilter(event.target.value)}><option value="">All positions</option>{opportunityPositions.map(position => <option key={position}>{position}</option>)}</select></label>
                <button type="button" className="club-dashboard-clear-filters" onClick={clearOpportunityFilters} disabled={!hasOpportunityFilters}><Filter size={14} />Clear filters</button>
              </div>
              <p className="agent-demo-disclaimer"><Shield size={14} /> Opportunities and inquiries are fictional frontend demonstrations. Saving or matching a player does not submit a real application.</p>
              {displayedOpportunities.length ? (
                <div className="agent-opportunity-grid">
                  {displayedOpportunities.map(opportunity => {
                    const club = clubsById[opportunity.clubId]
                    const application = applications.find(item => item.opportunityId === opportunity.id)
                    const matchingPlayer = representedPlayers.find(entry => entry.player.position.toLowerCase() === opportunity.position.toLowerCase())?.player
                    return (
                      <AgentOpportunityCard
                        key={opportunity.id}
                        opportunity={opportunity}
                        club={club}
                        matchingPlayer={matchingPlayer}
                        application={application}
                        saved={savedOpportunityIds.includes(opportunity.id)}
                        onToggleSave={toggleSavedOpportunity}
                        onInquiry={startOpportunityInquiry}
                      />
                    )
                  })}
                </div>
              ) : <div className="club-dashboard-empty-state"><CalendarDays size={22} /><strong>No opportunities match this search</strong><span>Clear the filters to view the available sample listings.</span></div>}
            </section>

            <section className="club-dashboard-section agent-dashboard-section" id="applications">
              <AgentSectionHeading kicker="PLAYER OPPORTUNITY TRACKING" title="Applications & inquiries" action={<span className="club-dashboard-total-count">{applications.length} demo items</span>} />
              {applications.length ? (
                <div className="agent-application-list">
                  {applications.map(application => {
                    const player = playersById[application.playerId]
                    const opportunity = agentCareerOpportunities.find(item => item.id === application.opportunityId)
                    const club = opportunity && clubsById[opportunity.clubId]
                    if (!player || !opportunity || !club) return null
                    return (
                      <article key={application.id} className="agent-application-card">
                        <img src={player.image} alt="" loading="lazy" />
                        <div className="agent-application-main">
                          <strong>{player.name} <span>· {player.position}</span></strong>
                          <small>{opportunity.title} · {club.name}</small>
                          <small>Updated {application.updatedAt}</small>
                          {application.notes && <p>{application.notes}</p>}
                        </div>
                        <label className="agent-application-status"><span>Status</span><select value={application.status} onChange={event => updateApplicationStatus(application.id, event.target.value)}>{applicationStatuses.map(status => <option key={status}>{status}</option>)}</select></label>
                        <Link to={`/opportunities/${opportunity.id}`} className="club-dashboard-secondary-button">Details</Link>
                      </article>
                    )
                  })}
                </div>
              ) : <div className="club-dashboard-empty-state"><FileText size={22} /><strong>No inquiries yet</strong><span>Choose an opportunity and match a player to create a sample inquiry.</span><button type="button" className="club-dashboard-text-button" onClick={() => navigateSection('opportunities')}>View opportunities <ArrowRight size={14} /></button></div>}
            </section>

            <section className="club-dashboard-section agent-dashboard-section" id="network">
              <AgentSectionHeading kicker="GLOBAL FOOTBALL NETWORK" title="Professional network" action={<Link className="club-dashboard-text-button" to="/professionals">Browse directory <ArrowRight size={14} /></Link>} />
              <div className="agent-network-grid">
                <div className="agent-network-panel">
                  <div className="agent-network-panel-heading"><h3>Connected professionals</h3><span>{connectedProfessionals.length}</span></div>
                  {connectedProfessionals.map(person => <AgentProfessionalCard key={person.id} person={person} status="connected" />)}
                  {!connectedProfessionals.length && <p className="agent-network-empty">Accepted sample connections will appear here.</p>}
                </div>
                <div className="agent-network-panel">
                  <div className="agent-network-panel-heading"><h3>Connection requests</h3><span>{requestedProfessionals.length + requestedClubs.length}</span></div>
                  {requestedProfessionals.map(person => <AgentProfessionalCard key={person.id} person={person} status="pending" onAccept={() => handleAcceptProfessional(person.id)} onDecline={() => handleDeclineProfessional(person.id)} />)}
                  {requestedClubs.map(club => <AgentClubCard key={club.id} club={club} pending onAccept={() => handleAcceptClub(club.id)} onDecline={() => handleDeclineClub(club.id)} />)}
                  {!requestedProfessionals.length && !requestedClubs.length && <p className="agent-network-empty">No pending sample requests.</p>}
                </div>
                <div className="agent-network-panel agent-network-suggestions">
                  <div className="agent-network-panel-heading"><h3>Suggested professionals</h3><span>Suggested</span></div>
                  {suggestedProfessionals.slice(0, 4).map(person => <AgentProfessionalCard key={person.id} person={person} status={sentConnectionIds.includes(person.id) ? 'sent' : 'suggested'} onConnect={() => handleConnectProfessional(person.id)} />)}
                </div>
                <div className="agent-network-panel agent-network-clubs-panel">
                  <div className="agent-network-panel-heading"><h3>Club connections &amp; suggestions</h3><span>{connectedClubs.length} connected</span></div>
                  {connectedClubs.map(club => <AgentClubCard key={club.id} club={club} connected />)}
                  {suggestedClubs.slice(0, 2).map(club => <AgentClubCard key={club.id} club={club} sent={sentClubConnectionIds.includes(club.id)} onConnect={() => handleConnectClub(club.id)} />)}
                </div>
              </div>
              <p className="agent-demo-disclaimer"><Shield size={14} /> Connection requests update this sample interface only; they are not sent to real accounts.</p>
            </section>

            <section className="club-dashboard-section agent-dashboard-section" id="messages">
              <AgentSectionHeading kicker="COMMUNICATIONS · DEMO" title="Messages" />
              <div className="agent-messaging-disclaimer"><Shield size={14} /> This is a local messaging preview. Messages are not delivered to contacts or stored on a server.</div>
              <div className="agent-messenger">
                <div className="agent-conversation-list" aria-label="Recent conversations">
                  {conversations.map(conversation => {
                    const contact = professionalsById[conversation.professionalId]
                    if (!contact) return null
                    const lastMessage = conversation.messages[conversation.messages.length - 1]
                    return (
                      <button key={conversation.id} type="button" className={conversation.id === selectedConversationId ? 'agent-conversation-button active' : 'agent-conversation-button'} onClick={() => selectConversation(conversation.id)} aria-pressed={conversation.id === selectedConversationId}>
                        <img src={contact.image} alt="" />
                        <span className="agent-conversation-copy"><strong>{contact.name}</strong><small>{lastMessage?.text || 'No messages yet'}</small></span>
                        <span className="agent-conversation-meta"><time>{conversation.updatedAt}</time>{conversation.unread > 0 && <b>{conversation.unread}</b>}</span>
                      </button>
                    )
                  })}
                </div>
                <div className="agent-message-thread">
                  {selectedContact && selectedConversation ? (
                    <>
                      <header><img src={selectedContact.image} alt="" /><span><strong>{selectedContact.name}</strong><small>{selectedContact.role} · Demo conversation</small></span><Link to={`/professionals/${selectedContact.id}`}>Profile <ArrowRight size={13} /></Link></header>
                      <div className="agent-message-list">
                        {selectedConversation.messages.map(message => <p key={message.id} className={message.sender === 'you' ? 'agent-message-bubble own' : 'agent-message-bubble'}><span>{message.text}</span><time>{message.time}</time></p>)}
                      </div>
                      <form className="agent-message-compose" onSubmit={sendDemoMessage}>
                        <label className="visually-hidden" htmlFor="agent-demo-message">Write a demo message</label>
                        <input id="agent-demo-message" value={messageDraft} onChange={event => setMessageDraft(event.target.value)} maxLength={300} placeholder="Write a local demo message..." />
                        <button type="submit" disabled={!messageDraft.trim()}><Send size={15} /><span>Send demo</span></button>
                      </form>
                    </>
                  ) : <div className="club-dashboard-empty-state"><MessageCircle size={22} /><strong>Select a conversation</strong></div>}
                </div>
              </div>
            </section>

            <section className="club-dashboard-section agent-dashboard-section agent-dashboard-lower-grid" id="activity">
              <div className="agent-dashboard-panel">
                <AgentSectionHeading kicker="WORKSPACE UPDATES" title="Recent activity" />
                <div className="agent-activity-list">
                  {activity.map(item => {
                    const ActivityIcon = { inquiry: FileText, player: Users, network: Handshake, opportunity: Briefcase }[item.type] || Eye
                    return <article className="agent-activity-item" key={item.id}><span><ActivityIcon size={16} /></span><div><strong>{item.title}</strong><small>{item.detail}</small></div><time>{item.time}</time></article>
                  })}
                </div>
              </div>
              <div className="agent-dashboard-panel agent-quick-links-panel">
                <AgentSectionHeading kicker="QUICK LINKS" title="FMC directories" />
                <Link to="/discover" className="agent-quick-link"><span><Users size={16} /></span><strong>Player directory</strong><ArrowRight size={14} /></Link>
                <Link to="/clubs" className="agent-quick-link"><span><Building2 size={16} /></span><strong>Football clubs</strong><ArrowRight size={14} /></Link>
                <Link to="/professionals" className="agent-quick-link"><span><Handshake size={16} /></span><strong>Professional network</strong><ArrowRight size={14} /></Link>
              </div>
            </section>

            <section className="club-dashboard-section agent-dashboard-section" id="notifications">
              <AgentSectionHeading kicker="UPDATES" title="Notifications" action={<button type="button" className="club-dashboard-text-button" onClick={markAllNotificationsRead} disabled={!unreadCount}>Mark all read</button>} />
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

            <section className="club-dashboard-section agent-dashboard-section" id="settings">
              <AgentSectionHeading kicker="PREFERENCES" title="Settings" />
              <div className="club-dashboard-settings-card">
                <label><span><strong>Agent profile visibility</strong><small>Show the sample professional profile in the directory.</small></span><input type="checkbox" checked={profileVisibility} onChange={event => setProfileVisibility(event.target.checked)} /></label>
                <label><span><strong>Email notification preference</strong><small>Frontend-only preference; no email is sent.</small></span><input type="checkbox" checked={emailNotifications} onChange={event => setEmailNotifications(event.target.checked)} /></label>
                <p><Shield size={15} /> Demo preferences and workspace changes reset when you refresh.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
      {profileEditorOpen && <AgentProfileEditorModal profile={profile} onClose={() => setProfileEditorOpen(false)} onSave={saveAgentProfile} />}
      {representationEditorOpen && (
        <AgentRepresentationEditorModal
          representation={editingRepresentation}
          players={editingRepresentation?.id
            ? [playersById[editingRepresentation.playerId], ...availablePlayers].filter(Boolean)
            : availablePlayers}
          lists={playerLists}
          onClose={() => { setRepresentationEditorOpen(false); setEditingRepresentation(null) }}
          onSave={saveRepresentation}
        />
      )}
      {inquiryOpportunity && representedPlayers.length > 0 && (
        <AgentOpportunityInquiryModal opportunity={inquiryOpportunity} players={representedPlayers.map(entry => entry.player)} onClose={() => setInquiryOpportunity(null)} onSubmit={submitOpportunityInquiry} />
      )}
    </>
  )
}
