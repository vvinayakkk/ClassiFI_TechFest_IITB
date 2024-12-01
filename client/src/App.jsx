import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/landingPage";
import Analytics from './components/Analytics';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />  
      <Route path="/analytics" element={<Analytics />} />  
    </Routes>
  )
}

export default App