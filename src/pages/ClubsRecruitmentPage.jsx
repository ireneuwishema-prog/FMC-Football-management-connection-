import { useMemo, useState } from 'react'
import { ArrowDown, Search, SlidersHorizontal } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ClubProfileCard from '../components/ClubProfileCard'
import OpportunityCard from '../components/OpportunityCard'
import clubProfiles, { clubCategories } from '../data/clubProfiles'
import opportunityData from '../data/opportunityData'

const initialFilters = { country: '', league: '', category: '' }

export default function ClubsRecruitmentPage() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(initialFilters)

  const countries = useMemo(() => [...new Set(clubProfiles.map(club => club.country))].sort(), [])
  const leagues = useMemo(() => [...new Set(clubProfiles.map(club => club.league))].sort(), [])

  const filteredClubs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return clubProfiles.filter(club => {
      const matchesName = !normalizedSearch || club.name.toLowerCase().includes(normalizedSearch)
      const matchesCountry = !filters.country || club.country === filters.country
      const matchesLeague = !filters.league || club.league === filters.league
      const matchesCategory = !filters.category || club.category === filters.category

      return matchesName && matchesCountry && matchesLeague && matchesCategory
    })
  }, [search, filters])

  const hasActiveFilters = search.trim() !== '' || Object.values(filters).some(Boolean)
  const clubById = Object.fromEntries(clubProfiles.map(club => [club.id, club]))

  function updateFilter(event) {
    setFilters(current => ({ ...current, [event.target.name]: event.target.value }))
  }

  function clearFilters() {
    setSearch('')
    setFilters(initialFilters)
  }

  return (
    <>
      <Navbar />
      <main className="clubs-page">
        <section className="clubs-intro">
          <div className="container clubs-intro-content">
            <span className="eyebrow"><span /> THE GLOBAL CLUB NETWORK</span>
            <h1>Discover Football<br /><em>Clubs Worldwide</em></h1>
            <p>Connect with football clubs, explore their profiles and discover opportunities across the global football industry.</p>
            <a className="discover-scroll-link" href="#club-directory">Explore clubs <ArrowDown size={16} /></a>
            <div className="discover-intro-note">FICTIONAL CLUBS &amp; OPPORTUNITIES <span /> MADE FOR FMC</div>
          </div>
        </section>

        <section className="clubs-directory-section" id="club-directory">
          <div className="container">
            <div className="clubs-section-heading">
              <div><span className="kicker">CLUB DISCOVERY</span><h2>Find your place in the game.</h2></div>
              <p>Explore fictional clubs from different leagues, countries and levels of the game.</p>
            </div>

            <div className="club-filter-panel">
              <label className="club-name-search">
                <Search size={18} aria-hidden="true" />
                <span className="visually-hidden">Search clubs by name</span>
                <input type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search club name..." />
              </label>
              <div className="club-filter-row">
                <label className="filter-field">
                  <span>Country</span>
                  <select name="country" value={filters.country} onChange={updateFilter}>
                    <option value="">All countries</option>
                    {countries.map(country => <option key={country} value={country}>{country}</option>)}
                  </select>
                </label>
                <label className="filter-field">
                  <span>League</span>
                  <select name="league" value={filters.league} onChange={updateFilter}>
                    <option value="">All leagues</option>
                    {leagues.map(league => <option key={league} value={league}>{league}</option>)}
                  </select>
                </label>
                <label className="filter-field">
                  <span>Club category</span>
                  <select name="category" value={filters.category} onChange={updateFilter}>
                    <option value="">All categories</option>
                    {clubCategories.map(category => <option key={category} value={category}>{category}</option>)}
                  </select>
                </label>
                <button className="clear-filters-button" type="button" onClick={clearFilters} disabled={!hasActiveFilters}>
                  <SlidersHorizontal size={15} /> Clear filters
                </button>
              </div>
            </div>

            <div className="clubs-results-heading">
              <div><h3>Football clubs</h3><span>{filteredClubs.length} {filteredClubs.length === 1 ? 'club' : 'clubs'}</span></div>
              {hasActiveFilters && <span className="results-note">Showing clubs matching your search</span>}
            </div>

            {filteredClubs.length ? (
              <div className="clubs-discovery-grid">
                {filteredClubs.map(club => <ClubProfileCard key={club.id} club={club} />)}
              </div>
            ) : (
              <div className="players-empty-state">
                <span><Search size={24} /></span>
                <h3>No clubs found</h3>
                <p>Try a different club name or adjust your filters.</p>
                <button className="button button-dark" type="button" onClick={clearFilters}>Clear search and filters</button>
              </div>
            )}
          </div>
        </section>

        <section className="football-opportunities-section" id="opportunities">
          <div className="container">
            <div className="clubs-section-heading">
              <div><span className="kicker">TAKE THE NEXT STEP</span><h2>Football Opportunities</h2></div>
              <p>Explore fictional recruitment openings and learn what each opportunity is looking for.</p>
            </div>
            <div className="football-opportunities-grid">
              {opportunityData.map(opportunity => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} club={clubById[opportunity.clubId]} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
