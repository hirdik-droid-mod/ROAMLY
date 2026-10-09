import React from 'react';
import { TravelProvider, useTravel } from './context/TravelContext';
import { Navbar } from './components/Navbar';
import { RegalHero } from './components/RegalHero';
import { AboutSection } from './components/AboutSection';
import { GoogleMapsExplorer } from './components/GoogleMapsExplorer';
import { TravelPersonalisation } from './components/TravelPersonalisation';
import { WeatherSeasonAdvisor } from './components/WeatherSeasonAdvisor';
import { CircuitRoutePlanner } from './components/CircuitRoutePlanner';
import { CulinaryCultureGuide } from './components/CulinaryCultureGuide';
import { DestinationsGrid } from './components/DestinationsGrid';
import { WhatIsIncluded } from './components/WhatIsIncluded';
import { InquirySection } from './components/InquirySection';
import { MyBookingsView } from './components/MyBookingsView';
import { AdminDashboard } from './components/AdminDashboard';
import { DestinationDetailModal } from './components/DestinationDetailModal';
import { CheckoutModal } from './components/CheckoutModal';
import { BookingTicketModal } from './components/BookingTicketModal';
import { Footer } from './components/Footer';

const AppContent: React.FC = () => {
  const { activeView } = useTravel();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F0] text-stone-900 font-sans selection:bg-amber-200 selection:text-stone-950">
      {/* Top Bar Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* 1. Regal Editorial Hero matching reference image */}
            <RegalHero />

            {/* 2. About The Expedition with 4 Badges */}
            <div id="about-section">
              <AboutSection />
            </div>

            {/* 3. Interactive Google Maps Platform & City Places Explorer */}
            <GoogleMapsExplorer />

            {/* 4. Travel Personalisation ("How You Like to Travel") */}
            <TravelPersonalisation />

            {/* 5. Regional Climate & Live Weather Advisory */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
              <WeatherSeasonAdvisor />
            </div>

            {/* 6. Highway Road Circuits & Travel Times Planner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="circuits-planner-section">
              <CircuitRoutePlanner />
            </div>

            {/* 7. Taste of Thamizhagam Culinary Guide */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" id="culinary-guide-section">
              <CulinaryCultureGuide />
            </div>

            {/* 8. Curated Trips with Filters & INR Pricing */}
            <DestinationsGrid />

            {/* 9. What's Included 4 Cream Cards */}
            <WhatIsIncluded />

            {/* 10. Ready to Explore Inquiry Block */}
            <InquirySection />
          </>
        )}

        {activeView === 'my-bookings' && <MyBookingsView />}

        {activeView === 'admin-dashboard' && <AdminDashboard />}
      </main>

      {/* Modals for Booking, Payment & Boarding Pass Ticket */}
      <DestinationDetailModal />
      <CheckoutModal />
      <BookingTicketModal />

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <TravelProvider>
      <AppContent />
    </TravelProvider>
  );
}
