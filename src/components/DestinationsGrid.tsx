import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, Compass, Sparkles } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { DestinationCard } from './DestinationCard';
import { FilterBar } from './FilterBar';

export const DestinationsGrid: React.FC = () => {
  const { filteredDestinations, resetFilters } = useTravel();
  const gridRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: -380, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (gridRef.current) {
      gridRef.current.scrollBy({ left: 380, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="destinations-grid">
      
      {/* Top Places Header matching inspiration image */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          {/* Subtle Terracotta Accent Kicker */}
          <div className="w-10 h-1 bg-[#C25E3E] rounded-full mb-3" />
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight leading-tight">
            Top Places
          </h2>
          <p className="mt-1 text-sm text-stone-500 font-normal">
            Handpicked places across Tamil Nadu for your next journey.
          </p>
        </div>

        {/* Carousel Arrow Controls matching inspiration image */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={scrollLeft}
            className="w-11 h-11 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95"
            aria-label="Previous places"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            onClick={scrollRight}
            className="w-11 h-11 rounded-full bg-stone-900 hover:bg-stone-800 text-white flex items-center justify-center transition-all shadow-md hover:scale-105 active:scale-95"
            aria-label="Next places"
          >
            <ArrowRight className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>
      </div>

      {/* Filter Bar with Categories, Districts, Budget Slider in INR */}
      <FilterBar />

      {/* Destination Cards Display */}
      {filteredDestinations.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">
            No Tamil Nadu trips match this criteria
          </h3>
          <p className="text-xs text-stone-500">
            Try adjusting your budget slider, changing category, or resetting filters to view all tours.
          </p>
          <button
            onClick={resetFilters}
            className="px-5 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2"
        >
          {filteredDestinations.map((dest) => (
            <DestinationCard key={dest.id} destination={dest} />
          ))}
        </div>
      )}

      {/* Tamil Nadu Cultural Circuit Story Strip */}
      <div className="mt-14 bg-[#F2EFE9] rounded-3xl p-8 sm:p-10 border border-stone-300/60 flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl text-center lg:text-left">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#C25E3E] block">
            Why Travel With Roamly
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight leading-snug">
            Authentic Living Heritage, Certified Naturalists & Seamless INR Checkouts
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Every itinerary is vetted with local district curators, ensuring fair wages for temple historians, eco-certified hill station stays, and instant automated digital boarding passes with GST compliance.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-semibold text-stone-800">
          <div className="bg-white px-4 py-2.5 rounded-full border border-stone-300/80 shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Govt. Approved Guides</span>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-full border border-stone-300/80 shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C25E3E]" />
            <span>Transparent INR Pricing</span>
          </div>
          <div className="bg-white px-4 py-2.5 rounded-full border border-stone-300/80 shadow-xs flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>Instant UPI & 3D Secure</span>
          </div>
        </div>
      </div>

    </section>
  );
};
