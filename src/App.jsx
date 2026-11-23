import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/discover" element={<PlaceholderPage title="Discover Players" />} />
      <Route path="/clubs" element={<PlaceholderPage title="Clubs" />} />
      <Route path="/professionals" element={<PlaceholderPage title="Professionals" />} />
      <Route path="/community" element={<PlaceholderPage title="Community" />} />
      <Route path="/login" element={<PlaceholderPage title="Login" />} />
      <Route path="/register" element={<PlaceholderPage title="Join FMC" />} />
      <Route path="/dashboard" element={<PlaceholderPage title="User Dashboard" />} />
      <Route path="*" element={<PlaceholderPage title="Page Not Found" />} />
    </Routes>
  )
}
