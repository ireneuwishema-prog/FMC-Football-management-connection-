import { useMemo, useState } from 'react'
import { ArrowDown, Search, SlidersHorizontal, UserRoundSearch } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PlayerProfileCard from '../components/PlayerProfileCard'
import playerProfiles from '../data/playerProfiles'

const initialFilters = {
  country: '',
  position: '',
  ageRange: '',
  preferredFoot: '',
  club: '',
}

const pageSize = 6

function getAgeRange(age) {
  if (age <= 18) return '16-18'
  if (age <= 21) return '19-21'
  if (age <= 24) return '22-24'
  return '25+'
}

export default function DiscoverPlayersPage() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState(initialFilters)
  const [visibleCount, setVisibleCount] = useState(pageSize)

  const countries = useMemo(() => [...new Set(playerProfiles.map(player => player.nationality))].sort(), [])
  const positions = useMemo(() => [...new Set(playerProfiles.map(player => player.position))].sort(), [])
  const clubs = useMemo(() => [...new Set(playerProfiles.map(player => player.club))].sort(), [])

  const filteredPlayers = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return playerProfiles.filter(player => {
      const matchesName = !normalizedSearch || player.name.toLowerCase().includes(normalizedSearch)
      const matchesCountry = !filters.country || player.nationality === filters.country
      const matchesPosition = !filters.position || player.position === filters.position
      const matchesAge = !filters.ageRange || getAgeRange(player.age) === filters.ageRange
      const matchesFoot = !filters.preferredFoot || player.preferredFoot === filters.preferredFoot
      const matchesClub = !filters.club || player.club === filters.club

      return matchesName && matchesCountry && matchesPosition && matchesAge && matchesFoot && matchesClub
    })
  }, [search, filters])

  const visiblePlayers = filteredPlayers.slice(0, visibleCount)
  const hasActiveFilters = search.trim() !== '' || Object.values(filters).some(Boolean)

  function updateFilter(event) {
    setFilters(current => ({ ...current, [event.target.name]: event.target.value }))
    setVisibleCount(pageSize)
  }

  function updateSearch(event) {
    setSearch(event.target.value)
    setVisibleCount(pageSize)
  }

  function clearFilters() {
    setSearch('')
    setFilters(initialFilters)
    setVisibleCount(pageSize)
  }

  return (
    <>
      <Navbar />
      <main className="discover-page">
        <section className="discover-intro">
          <div className="container discover-intro-content">
            <span className="eyebrow"><span /> THE GLOBAL SCOUTING NETWORK</span>
            <h1>Discover Football<br /><em>Talent Worldwide</em></h1>
            <p>Explore talented football players from different countries, discover their abilities and connect with the future of football.</p>
            <a className="discover-scroll-link" href="#player-directory">Explore players <ArrowDown size={16} /></a>
            <div className="discover-intro-note">FICTIONAL SAMPLE PROFILES <span /> BUILT FOR THE GLOBAL GAME</div>
          </div>
        </section>

        <section className="discover-spotlight">
          <div className="container">
            <div className="discover-section-heading">
              <div><span className="kicker">FMC SPOTLIGHT</span><h2>Featured players</h2></div>
              <p>Fictional sample profiles from across the football world.</p>
            </div>
            <div className="discover-featured-grid">
              {playerProfiles.filter(player => player.featured).map(player => (
                <PlayerProfileCard key={player.id} player={player} featured />
              ))}
            </div>
          </div>
        </section>

        <section className="discover-directory" id="player-directory">
          <div className="container">
            <div className="discover-section-heading directory-heading">
              <div><span className="kicker">PLAYER DIRECTORY</span><h2>Find your next connection.</h2></div>
              <p>Search sample profiles and use the filters to narrow your discovery.</p>
            </div>

            <div className="player-filter-panel">
              <label className="player-search">
                <Search size={19} aria-hidden="true" />
                <span className="visually-hidden">Search players by name</span>
                <input type="search" value={search} onChange={updateSearch} placeholder="Search by player name..." />
              </label>
              <div className="player-filter-grid">
                <label className="filter-field">
                  <span>Country</span>
                  <select name="country" value={filters.country} onChange={updateFilter}>
                    <option value="">All countries</option>
                    {countries.map(country => <option key={country} value={country}>{country}</option>)}
                  </select>
                </label>
                <label className="filter-field">
                  <span>Playing position</span>
                  <select name="position" value={filters.position} onChange={updateFilter}>
                    <option value="">All positions</option>
                    {positions.map(position => <option key={position} value={position}>{position}</option>)}
                  </select>
                </label>
                <label className="filter-field">
                  <span>Age range</span>
                  <select name="ageRange" value={filters.ageRange} onChange={updateFilter}>
                    <option value="">All ages</option>
                    <option value="16-18">16–18</option>
                    <option value="19-21">19–21</option>
                    <option value="22-24">22–24</option>
                    <option value="25+">25+</option>
                  </select>
                </label>
                <label className="filter-field">
                  <span>Preferred foot</span>
                  <select name="preferredFoot" value={filters.preferredFoot} onChange={updateFilter}>
                    <option value="">Any foot</option>
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                    <option value="Both">Both</option>
                  </select>
                </label>
                <label className="filter-field filter-club">
                  <span>Club or academy</span>
                  <select name="club" value={filters.club} onChange={updateFilter}>
                    <option value="">All clubs &amp; academies</option>
                    {clubs.map(club => <option key={club} value={club}>{club}</option>)}
                  </select>
                </label>
                <button className="clear-filters-button" type="button" onClick={clearFilters} disabled={!hasActiveFilters}>
                  <SlidersHorizontal size={15} /> Clear filters
                </button>
              </div>
            </div>

            <div className="directory-results-heading">
              <div><h3>All players</h3><span>{filteredPlayers.length} {filteredPlayers.length === 1 ? 'profile' : 'profiles'}</span></div>
              {hasActiveFilters && <span className="results-note">Showing matches for your search</span>}
            </div>

            {visiblePlayers.length > 0 ? (
              <>
                <div className="discover-player-grid">
                  {visiblePlayers.map(player => <PlayerProfileCard key={player.id} player={player} />)}
                </div>
                {visibleCount < filteredPlayers.length && (
                  <div className="load-more-wrap">
                    <button className="load-more-button" type="button" onClick={() => setVisibleCount(count => count + pageSize)}>
                      Load more players <span>{Math.min(visibleCount, filteredPlayers.length)} of {filteredPlayers.length}</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="players-empty-state">
                <span><UserRoundSearch size={25} /></span>
                <h3>No players found</h3>
                <p>Try a different name or adjust your filters to see more profiles.</p>
                <button className="button button-dark" type="button" onClick={clearFilters}>Clear search and filters</button>
              </div>
            )}
          </div>
        </section>

        <section className="recent-players-section">
          <div className="container">
            <div className="discover-section-heading">
              <div><span className="kicker">FRESH PROFILES</span><h2>Recently added</h2></div>
              <p>Meet more of the fictional players in our sample directory.</p>
            </div>
            <div className="discover-recent-grid">
              {playerProfiles.filter(player => player.recentlyAdded).map(player => (
                <PlayerProfileCard key={player.id} player={player} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
