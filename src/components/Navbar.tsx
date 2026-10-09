import React, { useState } from 'react';
import { 
  Compass, Calendar, ShieldCheck, MapPin, Sparkles, 
  Menu, X, Bell, ArrowRight, Heart, Landmark, Globe 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { CurrencyConverter } from './CurrencyConverter';
import { WishlistDrawer } from './WishlistDrawer';
import { TempleEtiquetteModal } from './TempleEtiquetteModal';

export const Navbar: React.FC = () => {
  const { activeView, setActiveView, bookings, adminSettings, wishlist } = useTravel();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [templeModalOpen, setTempleModalOpen] = useState(false);

  const activeBookingsCount = bookings.filter(b => b.bookingStatus === 'confirmed').length;

  const scrollTo = (elementId: string) => {
    setActiveView('home');
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(elementId);
      el?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF7F0]/95 backdrop-blur-md border-b border-stone-200/80 transition-all">
        {/* Optional Admin Announcement Banner */}
        {adminSettings.enableAnnouncement && adminSettings.announcementBanner && (
          <div className="bg-stone-900 text-stone-100 px-4 py-1.5 text-xs text-center font-medium tracking-wide flex items-center justify-center gap-2">
            <Bell className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{adminSettings.announcementBanner}</span>
          </div>
        )}

        {/* Top Bar Contract */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          
          {/* Zone 1: Brand Wordmark matching reference */}
          <button
            onClick={() => { setActiveView('home'); setMobileMenuOpen(false); }}
            className="flex items-center gap-3 text-left group focus:outline-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white shadow-md">
              <span className="font-serif italic text-lg font-bold">L</span>
            </div>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-widest text-stone-950 uppercase font-serif block leading-none">
                INDIA ESCAPES
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#C25E3E] uppercase block mt-0.5">
                TAMIL NADU REALM
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden xl:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-stone-600">
            <button
              onClick={() => scrollTo('about-section')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap"
            >
              About
            </button>
            
            <button
              onClick={() => scrollTo('map-explorer-section')}
              className="hover:text-stone-950 transition-colors flex items-center gap-1 whitespace-nowrap text-amber-900"
            >
              <MapPin className="w-3.5 h-3.5 text-[#C25E3E]" />
              <span>Google Maps</span>
            </button>

            <button
              onClick={() => scrollTo('personalisation-section')}
              className="hover:text-stone-950 transition-colors flex items-center gap-1 whitespace-nowrap text-purple-900"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>How You Travel</span>
            </button>

            <button
              onClick={() => scrollTo('circuits-planner-section')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap"
            >
              Road Circuits
            </button>

            <button
              onClick={() => scrollTo('culinary-guide-section')}
              className="hover:text-stone-950 transition-colors whitespace-nowrap"
            >
              Culinary Trail
            </button>

            <button
              onClick={() => setTempleModalOpen(true)}
              className="hover:text-stone-950 transition-colors flex items-center gap-1 whitespace-nowrap text-stone-600"
              title="Temple Dress Code & Customs"
            >
              <Landmark className="w-3.5 h-3.5 text-stone-500" />
              <span>Temple Protocol</span>
            </button>

            <button
              onClick={() => setActiveView('my-bookings')}
              className={`transition-colors hover:text-stone-950 flex items-center gap-1 whitespace-nowrap ${
                activeView === 'my-bookings' ? 'text-stone-950 font-bold border-b-2 border-stone-950 pb-0.5' : ''
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-stone-500" />
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 bg-stone-200 text-stone-800 rounded font-semibold tabular-nums">
                  {activeBookingsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveView('admin-dashboard')}
              className={`transition-colors hover:text-stone-950 flex items-center gap-1 whitespace-nowrap ${
                activeView === 'admin-dashboard' ? 'text-stone-950 font-bold border-b-2 border-stone-950 pb-0.5' : ''
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
              <span>Admin</span>
            </button>
          </nav>

          {/* Zone 3: Actions - Currency Converter, Wishlist Drawer & Primary CTA */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Currency Converter */}
            <CurrencyConverter />

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              className="p-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 relative transition-colors shadow-2xs"
              aria-label="View Saved Wishlist"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Book Now Button */}
            <button
              onClick={() => scrollTo('destinations-grid')}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-amber-900/20 flex items-center gap-1.5"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setWishlistOpen(true)}
              className="p-2 rounded-full border border-stone-200 bg-white text-stone-700 relative"
            >
              <Heart className={`w-4 h-4 ${wishlist.length > 0 ? 'fill-rose-500 text-rose-500' : ''}`} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-800 hover:text-stone-950 rounded-lg hover:bg-stone-200/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF7F0] border-b border-stone-200 px-6 py-5 space-y-3">
            <button
              onClick={() => scrollTo('about-section')}
              className="block w-full text-left py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              About The Tour
            </button>
            <button
              onClick={() => scrollTo('map-explorer-section')}
              className="flex items-center gap-2 w-full py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              <MapPin className="w-4 h-4 text-[#C25E3E]" />
              <span>Google Maps Places Explorer</span>
            </button>
            <button
              onClick={() => scrollTo('personalisation-section')}
              className="flex items-center gap-2 w-full py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>How You Like To Travel</span>
            </button>
            <button
              onClick={() => scrollTo('circuits-planner-section')}
              className="block w-full text-left py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              Highway Road Circuits
            </button>
            <button
              onClick={() => scrollTo('culinary-guide-section')}
              className="block w-full text-left py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              Taste of Thamizhagam Food Trail
            </button>
            <button
              onClick={() => { setTempleModalOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-2 w-full py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              <Landmark className="w-4 h-4 text-[#C25E3E]" />
              <span>Temple Protocol & Customs</span>
            </button>
            <button
              onClick={() => scrollTo('destinations-grid')}
              className="block w-full text-left py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              Curated Trips & Pricing
            </button>
            <button
              onClick={() => { setActiveView('my-bookings'); setMobileMenuOpen(false); }}
              className="flex items-center justify-between w-full py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              <span>My Bookings</span>
              {activeBookingsCount > 0 && (
                <span className="text-xs px-2 py-0.5 bg-stone-200 rounded font-semibold tabular-nums">
                  {activeBookingsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => { setActiveView('admin-dashboard'); setMobileMenuOpen(false); }}
              className="block w-full text-left py-2 text-xs font-bold uppercase text-stone-800 hover:text-stone-950"
            >
              Admin Dashboard
            </button>
            <div className="pt-2">
              <button
                onClick={() => scrollTo('destinations-grid')}
                className="w-full py-3 text-center text-xs font-bold uppercase text-stone-950 bg-amber-500 rounded-full shadow-sm"
              >
                Book Now →
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-over Drawers and Modals */}
      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <TempleEtiquetteModal isOpen={templeModalOpen} onClose={() => setTempleModalOpen(false)} />
    </>
  );
};
