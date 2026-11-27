import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import DiscoverPlayersPage from './pages/DiscoverPlayersPage'
import PlayerProfilePage from './pages/PlayerProfilePage'
import ClubsRecruitmentPage from './pages/ClubsRecruitmentPage'
import ClubProfilePage from './pages/ClubProfilePage'
import OpportunityDetailPage from './pages/OpportunityDetailPage'
import ProfessionalsPage, { ProfessionalProfileRoute, ProfessionalsDirectoryRoute } from './pages/ProfessionalsPage'
import CommunityPage from './pages/CommunityPage'
import PlayerDashboardPage from './pages/PlayerDashboardPage'
import ClubDashboardPage from './pages/ClubDashboardPage'
import ScoutDashboardPage from './pages/ScoutDashboardPage'
import AgentDashboardPage from './pages/AgentDashboardPage'
import CoachDashboardPage from './pages/CoachDashboardPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<DiscoverPlayersPage />} />
      <Route path="/discover/:playerId" element={<PlayerProfilePage />} />
      <Route path="/clubs" element={<ClubsRecruitmentPage />} />
      <Route path="/clubs/:clubId" element={<ClubProfilePage />} />
      <Route path="/opportunities/:opportunityId" element={<OpportunityDetailPage />} />
      <Route path="/professionals" element={<ProfessionalsPage />}>
        <Route index element={<ProfessionalsDirectoryRoute />} />
        <Route path=":professionalId" element={<ProfessionalProfileRoute />} />
      </Route>
      <Route path="/community" element={<CommunityPage />} />
      <Route path="/login" element={<PlaceholderPage title="Login" />} />
      <Route path="/register" element={<PlaceholderPage title="Join FMC" />} />
      <Route path="/dashboard" element={<PlayerDashboardPage />} />
      <Route path="/club-dashboard" element={<ClubDashboardPage />} />
      <Route path="/scout-dashboard" element={<ScoutDashboardPage />} />
      <Route path="/agent-dashboard" element={<AgentDashboardPage />} />
      <Route path="/coach-dashboard" element={<CoachDashboardPage />} />
      <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" />} />
      <Route path="/terms" element={<PlaceholderPage title="Terms of Service" />} />
      <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
    </Routes>
  )
}
