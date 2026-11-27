import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import DiscoverPlayersPage from './pages/DiscoverPlayersPage'
import PlayerProfilePage from './pages/PlayerProfilePage'
import ClubsRecruitmentPage from './pages/ClubsRecruitmentPage'
import ClubProfilePage from './pages/ClubProfilePage'
import OpportunityDetailPage from './pages/OpportunityDetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<DiscoverPlayersPage />} />
      <Route path="/discover/:playerId" element={<PlayerProfilePage />} />
      <Route path="/clubs" element={<ClubsRecruitmentPage />} />
      <Route path="/clubs/:clubId" element={<ClubProfilePage />} />
      <Route path="/opportunities/:opportunityId" element={<OpportunityDetailPage />} />
      <Route path="/professionals" element={<PlaceholderPage title="Professionals" />} />
      <Route path="/community" element={<PlaceholderPage title="Community" />} />
      <Route path="/login" element={<PlaceholderPage title="Login" />} />
      <Route path="/register" element={<PlaceholderPage title="Join FMC" />} />
      <Route path="/dashboard" element={<PlaceholderPage title="User Dashboard" />} />
      <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
      <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
      <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
    </Routes>
  )
}
