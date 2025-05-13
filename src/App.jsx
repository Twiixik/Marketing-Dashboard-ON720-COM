import './App.css';
import './styles/variables.css';
import './styles/layout.css';
import './styles/sidebar.css';
import { Routes, Route } from 'react-router-dom';

import Sidebar from './components/Sidebar';
import ImpressionsCard from './components/ImpressionsCard';
import WebsiteTrafficCard from './components/WebsiteTrafficCard';
import GeneratedLeadsCard from './components/GeneratedLeadsCard';
import CostPerClickCard from './components/CostPerClickCard';
import ClickThroughRateCard from './components/ClickThroughRateCard';
import ConversionsCard from './components/ConversionsCard';
import ImpressionsPage from './pages/ImpressionsPage';
import WebsiteTrafficPage from './pages/WebsiteTrafficPage';
import LeadsGeneratedPage from './pages/LeadsGeneratedPage';
import CostPerClickPage from './pages/CostPerClickPage';
import ClickThroughRatePage from './pages/ClickThroughRatePage';
import ConversionsPage from './pages/ConversionsPage';


function App() {
  return (
    <div className="layout">
      <Sidebar />
      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <div className="dashboard-grid">
                <ImpressionsCard />
                <WebsiteTrafficCard />
                <GeneratedLeadsCard />
                <CostPerClickCard className="card-wide" />
                <ConversionsCard className="card-compact" />
                <ClickThroughRateCard className="card-full" />
              </div>
            }
          />
          <Route path="/impressions" element={<ImpressionsPage />} />
          <Route path="/website-traffic" element={<WebsiteTrafficPage />} />
          <Route path="/leads-generated" element={<LeadsGeneratedPage />} />
          <Route path="/cost-per-click" element={<CostPerClickPage />} />
          <Route path="/click-through-rate" element={<ClickThroughRatePage />} />
          <Route path="/conversions" element={<ConversionsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
