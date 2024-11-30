import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/landingPage";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />  
    </Routes>
  )
}

export default App