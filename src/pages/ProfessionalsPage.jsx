import { useMemo, useState } from 'react'
import { Link, Outlet, useNavigate, useOutletContext, useParams } from 'react-router-dom'
import {
  ArrowDown, ArrowLeft, ArrowRight, Bookmark, BookmarkCheck, BriefcaseBusiness,
  Building2, Check, CheckCircle2, ChevronRight, CircleCheck, Clock3, GraduationCap,
  Handshake, MapPin, Search, SlidersHorizontal, UserRoundCheck, UserRoundSearch,
  Users, X,
} from 'lucide-react'
import { Binoculars, Trophy, ChartNoAxesCombined } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import professionals, { professionalCategories, sampleInboundRequests } from '../data/professionals'

const categoryIcons = { Binoculars, Handshake, GraduationCap, Trophy, Building2, ChartNoAxesCombined }
const initialFilters = { role: '', country: '', experience: '', organization: '' }
export default function ProfessionalsPage() {
  const [connections, setConnections] = useState([])
  const [sentRequests, setSentRequests] = useState([])
  const [inboundRequests, setInboundRequests] = useState(sampleInboundRequests)
  const [savedProfiles, setSavedProfiles] = useState([])

  const value = {
    connections, sentRequests, inboundRequests, savedProfiles,
    sendRequest: id => {
      if (!connections.includes(id) && !sentRequests.includes(id)) setSentRequests(current => [...current, id])
    },
    acceptRequest: id => {
      setInboundRequests(current => current.filter(requestId => requestId !== id))
      setConnections(current => current.includes(id) ? current : [...current, id])
    },
    rejectRequest: id => setInboundRequests(current => current.filter(requestId => requestId !== id)),
    toggleSaved: id => setSavedProfiles(current => current.includes(id) ? current.filter(savedId => savedId !== id) : [...current, id]),
  }

  return (
    <>
      <Navbar />
      <main className="professionals-page">
        <Outlet context={value} />
      </main>
      <Footer />
    </>
  )
}

function useProfessionalRoute() {
  return useOutletContext()
}

function ProfessionalHero() {
  return (
    <section className="professionals-hero">
      <div className="container professionals-hero-content">
        <span className="eyebrow"><span /> THE GLOBAL FOOTBALL NETWORK</span>
        <h1>Connect With Football<br /><em>Professionals Worldwide</em></h1>
        <p>Build meaningful professional relationships, discover experienced people and create opportunities across the global football industry.</p>
        <a className="professionals-hero-link" href="#professional-categories">Explore the network <ArrowDown size={16} /></a>
        <div className="professionals-hero-note">FICTIONAL SAMPLE PROFILES <span /> CONNECTIONS THAT MOVE THE GAME FORWARD</div>
      </div>
      <div className="professionals-hero-stat"><Users size={17} /><span><strong>One game. A world of expertise.</strong><small>Explore football’s professional community</small></span></div>
    </section>
  )
}

function CategorySection({ onExplore }) {
  return (
    <section className="professionals-categories" id="professional-categories">
      <div className="container">
        <div className="professionals-section-heading">
          <div><span className="kicker">FIND YOUR PEOPLE</span><h2>Experience at every level of the game.</h2></div>
          <p>From first look to final whistle, connect with the people shaping football around the world.</p>
        </div>
        <div className="professionals-category-grid">
          {professionalCategories.map(category => {
            const Icon = categoryIcons[category.icon]
            return (
              <article className="professionals-category-card" key={category.role}>
                <span className="professionals-category-icon"><Icon size={20} strokeWidth={1.8} /></span>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <button type="button" className="professionals-explore-link" onClick={() => onExplore(category.role)}>
                  Explore <ArrowRight size={15} />
                </button>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProfessionalCard({ professional }) {
  const { connections, sentRequests, savedProfiles, sendRequest, toggleSaved } = useProfessionalRoute()
  const connected = connections.includes(professional.id)
  const pending = sentRequests.includes(professional.id)
  const saved = savedProfiles.includes(professional.id)

  return (
    <article className="professional-card">
      <div className="professional-card-photo">
        <img src={professional.image} alt={professional.name} loading="lazy" />
        <span className="professional-sample-label">SAMPLE PROFILE</span>
        <button type="button" className={`professional-save-button${saved ? ' is-saved' : ''}`} onClick={() => toggleSaved(professional.id)} aria-label={saved ? `Remove ${professional.name} from saved profiles` : `Save ${professional.name}`} aria-pressed={saved}>
          {saved ? <BookmarkCheck size={17} /> : <Bookmark size={17} />}
        </button>
      </div>
      <div className="professional-card-body">
        <div className="professional-card-title">
          <div><span className="professional-role">{professional.role}</span><h3>{professional.name}</h3></div>
          {professional.verified && <span className="professional-verified" title="Demonstration label"><CheckCircle2 size={15} /> Demo verified</span>}
        </div>
        <div className="professional-card-meta">
          <span><MapPin size={14} />{professional.country}</span>
          <span><Clock3 size={14} />{professional.experience} years</span>
        </div>
        <p className="professional-organization"><Building2 size={14} />{professional.organization}</p>
        <p className="professional-bio">{professional.bio}</p>
        <div className="professional-card-actions">
          <Link className="professional-view-link" to={`/professionals/${professional.id}`}>View Profile <ChevronRight size={16} /></Link>
          <button type="button" className={`professional-connect-button${connected ? ' is-connected' : ''}`} onClick={() => sendRequest(professional.id)} disabled={connected || pending}>
            {connected ? <><Check size={14} /> Connected</> : pending ? <><Clock3 size={14} /> Requested</> : <><Handshake size={15} /> Connect</>}
          </button>
        </div>
      </div>
    </article>
  )
}

function NetworkingPanel() {
  const { connections, inboundRequests, savedProfiles, acceptRequest, rejectRequest, toggleSaved } = useProfessionalRoute()
  const [activeTab, setActiveTab] = useState('requests')
  const tabs = [
    { id: 'requests', label: 'Requests', count: inboundRequests.length, icon: Handshake },
    { id: 'connections', label: 'Connections', count: connections.length, icon: UserRoundCheck },
    { id: 'saved', label: 'Saved', count: savedProfiles.length, icon: Bookmark },
  ]
  const profiles = activeTab === 'requests' ? inboundRequests : activeTab === 'connections' ? connections : savedProfiles
  const emptyCopy = {
    requests: ['You’re all caught up', 'New sample connection requests will appear here.'],
    connections: ['Your network starts here', 'Accept a request or connect with a professional to grow your network.'],
    saved: ['No saved profiles yet', 'Use the bookmark on any profile card to keep it close.'],
  }[activeTab]

  return (
    <section className="networking-panel-section" id="my-network">
      <div className="container">
        <div className="networking-panel">
          <div className="networking-panel-heading">
            <div><span className="kicker">YOUR NETWORK</span><h2>Keep good people close.</h2></div>
            <p>Try connection requests, grow your network and save profiles to revisit. All interactions are demonstrations.</p>
          </div>
          <div className="network-tabs" role="tablist" aria-label="Your professional network">
            {tabs.map(({ id, label, count, icon: Icon }) => (
              <button type="button" role="tab" aria-selected={activeTab === id} className={activeTab === id ? 'active' : ''} key={id} onClick={() => setActiveTab(id)}>
                <Icon size={16} />{label}<span>{count}</span>
              </button>
            ))}
          </div>
          {profiles.length ? (
            <div className="network-list">
              {profiles.map(id => {
                const person = professionals.find(profile => profile.id === id)
                if (!person) return null
                return (
                  <article className="network-person" key={id}>
                    <img src={person.image} alt="" loading="lazy" />
                    <div className="network-person-copy"><Link to={`/professionals/${id}`}>{person.name}</Link><span>{person.role} · {person.country}</span></div>
                    {activeTab === 'requests' ? (
                      <div className="network-person-actions">
                        <button type="button" className="network-accept" onClick={() => acceptRequest(id)} aria-label={`Accept ${person.name}'s connection request`}><Check size={15} /> Accept</button>
                        <button type="button" className="network-reject" onClick={() => rejectRequest(id)} aria-label={`Reject ${person.name}'s connection request`}><X size={15} /> Decline</button>
                      </div>
                    ) : activeTab === 'saved' ? (
                      <button type="button" className="network-remove" onClick={() => toggleSaved(id)}>Remove saved</button>
                    ) : (
                      <span className="network-connected-badge"><CircleCheck size={15} /> Connected</span>
                    )}
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="network-empty-state"><span><UserRoundSearch size={22} /></span><strong>{emptyCopy[0]}</strong><p>{emptyCopy[1]}</p></div>
          )}
        </div>
      </div>
    </section>
  )
}

function ProfessionalsDirectory() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(initialFilters)
  const navigate = useNavigate()
  const countries = useMemo(() => [...new Set(professionals.map(person => person.country))].sort(), [])
  const organizations = useMemo(() => [...new Set(professionals.map(person => person.organization))].sort(), [])
  const roles = useMemo(() => [...new Set(professionals.map(person => person.role))].sort(), [])
  const hasActiveFilters = Boolean(search.trim() || Object.values(filters).some(Boolean))

  const filteredProfessionals = useMemo(() => {
    const query = search.trim().toLowerCase()
    return professionals.filter(person => {
      const matchesName = !query || person.name.toLowerCase().includes(query)
      const matchesRole = !filters.role || person.role === filters.role
      const matchesCountry = !filters.country || person.country === filters.country
      const matchesExperience = !filters.experience ||
        (filters.experience === '0-5' && person.experience <= 5) ||
        (filters.experience === '6-10' && person.experience >= 6 && person.experience <= 10) ||
        (filters.experience === '11-15' && person.experience >= 11 && person.experience <= 15) ||
        (filters.experience === '16+' && person.experience >= 16)
      const matchesOrganization = !filters.organization || person.organization === filters.organization
      return matchesName && matchesRole && matchesCountry && matchesExperience && matchesOrganization
    })
  }, [search, filters])

  function updateFilter(event) {
    setFilters(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function clearFilters() {
    setSearch('')
    setFilters(initialFilters)
  }

  function exploreRole(role) {
    setSearch('')
    setFilters({ ...initialFilters, role })
    document.getElementById('professional-directory')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <ProfessionalHero />
      <CategorySection onExplore={exploreRole} />
      <section className="professionals-directory" id="professional-directory">
        <div className="container">
          <div className="professionals-section-heading directory-title">
            <div><span className="kicker">DISCOVER PROFESSIONALS</span><h2>Build your football network.</h2></div>
            <p>Meet experienced people from every corner of the game. These are fictional profiles for demonstration only.</p>
          </div>
          <div className="professionals-filter-panel">
            <label className="professionals-search">
              <Search size={18} aria-hidden="true" />
              <span className="visually-hidden">Search professionals by name</span>
              <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search by professional name..." />
            </label>
            <div className="professionals-filter-grid">
              <label className="professionals-filter-field"><span>Professional role</span>
                <select name="role" value={filters.role} onChange={updateFilter}><option value="">All roles</option>{roles.map(role => <option key={role}>{role}</option>)}</select>
              </label>
              <label className="professionals-filter-field"><span>Country</span>
                <select name="country" value={filters.country} onChange={updateFilter}><option value="">All countries</option>{countries.map(country => <option key={country}>{country}</option>)}</select>
              </label>
              <label className="professionals-filter-field"><span>Experience</span>
                <select name="experience" value={filters.experience} onChange={updateFilter}><option value="">Any experience</option><option value="0-5">0–5 years</option><option value="6-10">6–10 years</option><option value="11-15">11–15 years</option><option value="16+">16+ years</option></select>
              </label>
              <label className="professionals-filter-field"><span>Organization</span>
                <select name="organization" value={filters.organization} onChange={updateFilter}><option value="">All organizations</option>{organizations.map(organization => <option key={organization}>{organization}</option>)}</select>
              </label>
              <button type="button" className="professionals-clear-button" onClick={clearFilters} disabled={!hasActiveFilters}><SlidersHorizontal size={15} />Clear filters</button>
            </div>
          </div>
          <div className="professionals-results-heading">
            <div><h3>Professionals to know</h3><span>{filteredProfessionals.length} {filteredProfessionals.length === 1 ? 'profile' : 'profiles'}</span></div>
            {hasActiveFilters && <span className="professionals-results-note">Showing profiles that match your search</span>}
          </div>
          {filteredProfessionals.length ? (
            <div className="professionals-card-grid">{filteredProfessionals.map(person => <ProfessionalCard key={person.id} professional={person} />)}</div>
          ) : (
            <div className="players-empty-state professionals-empty"><span><UserRoundSearch size={25} /></span><h3>No professionals found</h3><p>Try another name or adjust your filters to explore more of the network.</p><button className="button button-dark" type="button" onClick={clearFilters}>Clear search and filters</button></div>
          )}
        </div>
      </section>
      <NetworkingPanel />
    </>
  )
}

function ProfessionalProfile() {
  const { professionalId } = useParams()
  const navigate = useNavigate()
  const person = professionals.find(profile => profile.id === professionalId)
  const { connections, sentRequests, sendRequest } = useProfessionalRoute()

  if (!person) {
    return (
      <section className="professional-not-found">
        <div className="container"><div className="players-empty-state"><span><UserRoundSearch size={25} /></span><h1>Profile not found</h1><p>This sample profile may have moved. Return to the directory to discover other professionals.</p><Link className="button button-dark" to="/professionals"><ArrowLeft size={16} /> Back to professionals</Link></div></div>
      </section>
    )
  }

  const connected = connections.includes(person.id)
  const pending = sentRequests.includes(person.id)

  return (
    <>
      <section className="professional-profile-hero">
        <div className="container">
          <button className="professional-back-link" type="button" onClick={() => navigate('/professionals')}><ArrowLeft size={15} /> All professionals</button>
          <div className="professional-profile-grid">
            <div className="professional-profile-photo"><img src={person.image} alt={person.name} /><span>FICTIONAL SAMPLE PROFILE</span></div>
            <div className="professional-profile-copy">
              <span className="kicker">FOOTBALL PROFESSIONAL</span>
              <h1>{person.name}</h1>
              <div className="professional-profile-role">{person.role}{person.verified && <span><CheckCircle2 size={15} /> Demo verified</span>}</div>
              <div className="professional-profile-facts">
                <span><MapPin size={16} />{person.country}</span>
                <span><Clock3 size={16} />{person.experience} years experience</span>
                <span><Building2 size={16} />{person.organization}</span>
              </div>
              <p>{person.bio}</p>
              <button type="button" className="professional-profile-connect" onClick={() => sendRequest(person.id)} disabled={connected || pending}>
                {connected ? <><Check size={16} /> Connected</> : pending ? <><Clock3 size={16} /> Request sent</> : <><Handshake size={17} /> Send connection request</>}
              </button>
              {pending && <span className="professional-request-note">Connection request sent — demonstration only.</span>}
            </div>
          </div>
        </div>
      </section>
      <section className="professional-profile-content container">
        <div className="professional-profile-main">
          <article className="professional-detail-card">
            <span className="kicker">PROFILE</span><h2>About {person.name.split(' ')[0]}</h2><p>{person.bio}</p>
          </article>
          <article className="professional-detail-card">
            <span className="kicker">CAREER JOURNEY</span><h2>Professional experience</h2>
            <div className="professional-career-timeline">
              {person.careerHistory.map(item => (
                <div className="professional-career-entry" key={`${item.organization}-${item.period}`}><span className="professional-career-marker" /><div><span>{item.period}</span><h3>{item.role}</h3><p>{item.organization}</p></div></div>
              ))}
            </div>
          </article>
        </div>
        <aside className="professional-profile-side">
          <article className="professional-detail-card">
            <span className="kicker">CURRENT ROLE</span><h2>Current organization</h2>
            <div className="professional-current-org"><span><BriefcaseBusiness size={19} /></span><div><strong>{person.organization}</strong><small>{person.role} · {person.country}</small></div></div>
          </article>
          <article className="professional-detail-card">
            <span className="kicker">EDUCATION</span><h2>Qualifications</h2>
            <ul className="professional-qualification-list">{person.qualifications.map(item => <li key={item}><CheckCircle2 size={15} />{item}</li>)}</ul>
          </article>
          <article className="professional-detail-card">
            <span className="kicker">AREAS OF EXPERTISE</span><h2>Where they add value</h2>
            <div className="professional-expertise-list">{person.expertise.map(item => <span key={item}>{item}</span>)}</div>
          </article>
          <Link className="professional-network-return" to="/professionals#my-network">Manage your network <ArrowRight size={15} /></Link>
        </aside>
      </section>
    </>
  )
}

export function ProfessionalsDirectoryRoute() {
  return <ProfessionalsDirectory />
}

export function ProfessionalProfileRoute() {
  return <ProfessionalProfile />
}
