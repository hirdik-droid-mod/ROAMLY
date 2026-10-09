import React, { useState } from 'react';
import { MapPin, Calendar as CalendarIcon, Users, Search, ArrowRight } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { heroImg } from '../data/initialData';

export const Hero: React.FC = () => {
  const { searchFilters, setSearchFilters } = useTravel();

  // Local search bar inputs
  const [district, setDistrict] = useState(searchFilters.district || 'all');
  const [checkIn, setCheckIn] = useState(searchFilters.dateRange.checkIn || '');
  const [guests, setGuests] = useState(searchFilters.guests || 2);
  const [guestDropdownOpen, setGuestDropdownOpen] = useState(false);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSearchFilters(prev => ({
      ...prev,
      district,
      guests,
      dateRange: {
        checkIn,
        checkOut: ''
      }
    }));

    const target = document.getElementById('destinations-grid');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-12" id="filter-search-anchor">
      {/* Outer Curved Container matching inspiration asset */}
      <div className="relative rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-stone-900 border border-stone-800/60 aspect-[4/3] sm:aspect-[16/9] max-h-[580px] w-full flex flex-col justify-between p-6 sm:p-10 lg:p-14">
        {/* Background Image */}
        <img
          src={heroImg}
          alt="Tamil Nadu Nilgiris Western Ghats tea valley with travel camper"
          className="absolute inset-0 w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Scrim Gradient (WCAG AA compliant contrast) */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-transparent" />

        {/* Top Hero Text */}
        <div className="relative z-10 max-w-2xl pt-2 sm:pt-6">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08] text-balance font-sans">
            Find Your Next Escape
          </h1>
          <p className="mt-4 sm:mt-5 text-sm sm:text-base lg:text-lg text-stone-200/90 font-normal max-w-xl leading-relaxed">
            Discover memorable heritage temples, misty Nilgiri tea hills, and tranquil Coromandel coastal stays across Tamil Nadu.
          </p>

          <div className="mt-6 sm:mt-7 flex items-center gap-4">
            <button
              onClick={() => {
                const target = document.getElementById('destinations-grid');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#C25E3E] hover:bg-[#A94E31] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-lg shadow-black/20 hover:shadow-black/30 group"
            >
              <span>Search Trips</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Floating Pill Search Card docked inside hero bottom matching inspiration */}
        <div className="relative z-20 w-full mt-auto pt-6">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-full p-2 sm:p-2.5 shadow-2xl border border-stone-200/80 max-w-4xl mx-auto">
            <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row sm:items-center divide-y sm:divide-y-0 sm:divide-x divide-stone-200/80">
              
              {/* Item 1: Where */}
              <div className="flex-1 px-4 py-2 sm:py-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  Where
                </label>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C25E3E] shrink-0" />
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
                  >
                    <option value="all">All Tamil Nadu</option>
                    <option value="The Nilgiris">Ooty & Nilgiris</option>
                    <option value="Madurai">Madurai Heritage</option>
                    <option value="Chengalpattu">Mahabalipuram Coast</option>
                    <option value="Dindigul">Kodaikanal Hills</option>
                    <option value="Kanyakumari">Kanyakumari Lands End</option>
                    <option value="Thanjavur & Sivaganga">Thanjavur & Chettinad</option>
                  </select>
                </div>
              </div>

              {/* Item 2: Dates */}
              <div className="flex-1 px-4 py-2 sm:py-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  Dates
                </label>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#C25E3E] shrink-0" />
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent text-xs sm:text-sm font-semibold text-stone-800 focus:outline-none cursor-pointer"
                    placeholder="Select dates"
                  />
                </div>
              </div>

              {/* Item 3: Guests */}
              <div className="relative flex-1 px-4 py-2 sm:py-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-0.5">
                  Guests
                </label>
                <div 
                  onClick={() => setGuestDropdownOpen(!guestDropdownOpen)}
                  className="flex items-center gap-2 cursor-pointer select-none"
                >
                  <Users className="w-4 h-4 text-[#C25E3E] shrink-0" />
                  <span className="w-full text-xs sm:text-sm font-semibold text-stone-800">
                    {guests} {guests === 1 ? 'traveler' : 'travelers'}
                  </span>
                </div>

                {/* Dropdown counter */}
                {guestDropdownOpen && (
                  <div className="absolute left-0 bottom-full mb-3 w-56 bg-white rounded-xl shadow-xl border border-stone-200 p-4 z-50">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-stone-800">Total Travelers</span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setGuests(Math.max(1, guests - 1))}
                          className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-sm font-bold text-stone-700 hover:bg-stone-100"
                        >
                          -
                        </button>
                        <span className="text-sm font-bold tabular-nums text-stone-900">{guests}</span>
                        <button
                          type="button"
                          onClick={() => setGuests(Math.min(10, guests + 1))}
                          className="w-7 h-7 rounded-full border border-stone-300 flex items-center justify-center text-sm font-bold text-stone-700 hover:bg-stone-100"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setGuestDropdownOpen(false)}
                      className="mt-3 w-full py-1 text-xs font-semibold text-stone-700 bg-stone-100 rounded hover:bg-stone-200"
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>

              {/* Item 4: Search Button */}
              <div className="p-1.5 sm:p-1 flex items-center justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md group shrink-0"
                >
                  <Search className="w-4 h-4 text-stone-200 transition-transform group-hover:scale-110" />
                  <span>Search</span>
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
