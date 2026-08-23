import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import DashboardPage from './pages/DashboardPage'
import AppointmentsPage from './pages/AppointmentsPage'
import TreatmentsPage from './pages/TreatmentsPage'
import RemindersPage from './pages/RemindersPage'
import MessagesPage from './pages/MessagesPage'
import DocumentsPage from './pages/DocumentsPage'
import './lib/bootstrap'
export default function App() {
  return <Layout>
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/appointments" element={<AppointmentsPage />} />
      <Route path="/treatments" element={<TreatmentsPage />} />
      <Route path="/reminders" element={<RemindersPage />} />
      <Route path="/messages" element={<MessagesPage />} />
      <Route path="/documents" element={<DocumentsPage />} />
    </Routes>
  </Layout>
}
