import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import SignUp from './pages/SignUp'
import ProfileSetup from './pages/ProfileSetup'
import BrowseMatches from './pages/BrowseMatches'
import CreateMatch from './pages/CreateMatch'
import MatchPage from './pages/MatchPage'
import Store from './pages/Store'
import TokenPurchase from './pages/TokenPurchase'

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/profile-setup" element={<ProfileSetup />} />
            <Route path="/matches" element={<BrowseMatches />} />
            <Route path="/create-match" element={<CreateMatch />} />
            <Route path="/match/:id" element={<MatchPage />} />
            <Route path="/store" element={<Store />} />
            <Route path="/tokens" element={<TokenPurchase />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  )
}

export default App

