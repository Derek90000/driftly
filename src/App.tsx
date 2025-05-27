import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/layout/NavBar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { PlannerPage } from './pages/PlannerPage';
import { DashboardPage } from './pages/DashboardPage';
import { HotelsPage } from './pages/HotelsPage';
import { EventsPage } from './pages/EventsPage';
import { HotelDetailPage } from './pages/HotelDetailPage';
import { EventDetailPage } from './pages/EventDetailPage';
import { WalletProvider } from './contexts/WalletContext';

function App() {
  return (
    <Router>
      <WalletProvider>
        <div className="min-h-screen flex flex-col">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/planner" element={<PlannerPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/hotels" element={<HotelsPage />} />
              <Route path="/hotels/:id" element={<HotelDetailPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </WalletProvider>
    </Router>
  );
}

export default App;