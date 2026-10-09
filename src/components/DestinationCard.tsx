import React from 'react';
import { ArrowUpRight, Heart, Star, Clock } from 'lucide-react';
import { Destination } from '../types';
import { useTravel } from '../context/TravelContext';

interface DestinationCardProps {
  destination: Destination;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({ destination }) => {
  const { setSelectedDestination, wishlist, toggleWishlist, formatCurrency } = useTravel();
  const isWishlisted = wishlist.includes(destination.id);

  return (
    <div
      onClick={() => setSelectedDestination(destination)}
      className="group relative rounded-3xl overflow-hidden cursor-pointer bg-stone-900 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-end aspect-[3/4] sm:aspect-[4/5] border border-stone-200/40"
    >
      {/* Background Image with smooth zoom on hover */}
      <img
        src={destination.imageUrl}
        alt={destination.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
        referrerPolicy="no-referrer"
      />

      {/* Scrim Gradient for WCAG AA text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/50 to-stone-900/10 pointer-events-none" />

      {/* Top Floating Controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(destination.id);
          }}
          className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/70 hover:bg-white text-stone-700 hover:text-rose-500'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Top-Right Diagonal Arrow matching inspiration design */}
        <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md text-stone-900 flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-[#C25E3E] group-hover:text-white group-hover:rotate-45">
          <ArrowUpRight className="w-5 h-5 stroke-[2.2]" />
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="relative z-10 p-5 sm:p-6 text-white space-y-1.5">
        
        {/* Unboxed Meta Text */}
        <div className="flex items-center gap-2 text-xs text-stone-300 font-medium">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-stone-400" />
            <span>{destination.durationDays}D / {destination.durationNights}N</span>
          </span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold tabular-nums">{destination.rating}</span>
            <span className="text-stone-300 text-[11px]">({destination.reviewCount})</span>
          </span>
        </div>

        {/* Destination Title (Lead) */}
        <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-amber-200 transition-colors">
          {destination.title}
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-xs text-stone-300 line-clamp-1 font-normal">
          {destination.tagline}
        </p>

        {/* Price & Booking affordance in local currency (INR ₹) */}
        <div className="pt-2 flex items-center justify-between border-t border-white/15">
          <div className="flex items-baseline gap-1">
            <span className="text-base sm:text-lg font-extrabold text-white tabular-nums tracking-tight">
              {formatCurrency(destination.pricePerPerson)}
            </span>
            <span className="text-[11px] text-stone-300 font-light">
              / person
            </span>
          </div>

          <span className="text-xs font-semibold text-amber-300/90 group-hover:text-white transition-colors">
            View Details →
          </span>
        </div>

      </div>
    </div>
  );
};
