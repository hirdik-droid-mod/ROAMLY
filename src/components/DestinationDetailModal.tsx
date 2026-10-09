import React, { useState } from 'react';
import { 
  X, Star, MapPin, Calendar, Users, ShieldCheck, 
  CheckCircle2, Clock, Sparkles, Heart, ArrowRight, Info 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { INITIAL_REVIEWS } from '../data/initialData';

export const DestinationDetailModal: React.FC = () => {
  const { 
    selectedDestination, 
    setSelectedDestination, 
    setBookingTargetDestination,
    wishlist, 
    toggleWishlist, 
    formatCurrency, 
    adminSettings 
  } = useTravel();

  if (!selectedDestination) return null;

  const dest = selectedDestination;
  const isWishlisted = wishlist.includes(dest.id);

  // Gallery active index
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Booking configurator state
  const [selectedDate, setSelectedDate] = useState(dest.availableDates[0] || '2026-10-25');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  // Addons
  const [addons, setAddons] = useState<{ [key: string]: boolean }>({
    guide: false,
    carUpgrade: false,
    culinaryFeast: true
  });

  const addonPrices: { [key: string]: { name: string; price: number; desc: string } } = {
    guide: { name: 'Dedicated Heritage Historian Guide', price: 1200, desc: 'Personal scholar escort for monuments' },
    carUpgrade: { name: 'Toyota Innova Crysta AC Upgrade', price: 2200, desc: 'Spacious vehicle with experienced chauffeur' },
    culinaryFeast: { name: 'Authentic Traditional Chettinad Feast', price: 750, desc: 'Multi-course lunch on fresh plantain leaf' }
  };

  const toggleAddon = (key: string) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Pricing calculations
  const totalTravelers = adults + childrenCount;
  const baseTotal = (dest.pricePerPerson * adults) + (dest.pricePerPerson * 0.6 * childrenCount);
  
  const addonsTotal = Object.entries(addons).reduce((sum, [key, isSelected]) => {
    return isSelected ? sum + addonPrices[key].price : sum;
  }, 0);

  const subtotal = baseTotal + addonsTotal;
  const gstAmount = Math.round((subtotal * adminSettings.gstRatePercent) / 100);
  const convenienceFee = adminSettings.convenienceFeeINR;
  const grandTotal = subtotal + gstAmount + convenienceFee;

  const handleStartCheckout = () => {
    // Pack target destination with calculated settings
    setBookingTargetDestination({
      ...dest,
      // We pass the calculated configuration via target
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative bg-[#FAF8F5] w-full max-w-6xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Title and Close */}
        <div className="sticky top-0 z-30 bg-[#FAF8F5]/95 backdrop-blur-md px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#C25E3E] uppercase tracking-wider">
              {dest.district} · {dest.region}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleWishlist(dest.id)}
              className={`p-2 rounded-full border transition-colors ${
                isWishlisted 
                  ? 'bg-rose-50 border-rose-200 text-rose-600' 
                  : 'bg-white border-stone-200 text-stone-600 hover:text-stone-900'
              }`}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-600' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedDestination(null)}
              className="p-2 rounded-full bg-white hover:bg-stone-200 border border-stone-200 text-stone-700 transition-colors"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Top Hero Section & Thumbnails */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Gallery Big Image */}
            <div className="lg:col-span-7 space-y-3">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-stone-900 shadow-md">
                <img
                  src={dest.galleryImages[activeImgIndex] || dest.imageUrl}
                  alt={dest.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-3 left-3 bg-stone-950/75 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium flex items-center gap-1.5">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-bold tabular-nums">{dest.rating}</span>
                  <span className="text-stone-300">({dest.reviewCount} verified travelers)</span>
                </div>
              </div>

              {/* Thumbnails Row */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {dest.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImgIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImgIndex === idx ? 'border-stone-900 ring-2 ring-stone-900/20' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="Thumbnail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Summary & Key Highlights */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-tight">
                {dest.title}
              </h2>

              <p className="text-stone-600 text-sm leading-relaxed">
                {dest.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Duration
                  </span>
                  <span className="text-sm font-bold text-stone-800">
                    {dest.durationDays} Days / {dest.durationNights} Nights
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                    Best Season
                  </span>
                  <span className="text-sm font-bold text-stone-800">
                    {dest.bestSeason}
                  </span>
                </div>
              </div>

              {/* Highlights checklist */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-2">
                  Trip Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-stone-700">
                  {dest.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Grid Layout: Detailed Itinerary & Inclusions vs Contiguous Booking Module */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-stone-200">
            
            {/* Left 7 Columns: Itinerary, Inclusions & Reviews */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Day-by-Day Itinerary */}
              <div>
                <h3 className="text-lg font-bold text-stone-900 tracking-tight mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#C25E3E]" />
                  <span>Curated Day-by-Day Itinerary</span>
                </h3>

                <div className="space-y-4">
                  {dest.itinerary.map((day) => (
                    <div key={day.day} className="bg-white p-4 rounded-2xl border border-stone-200/80 shadow-xs">
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-black uppercase text-[#C25E3E] tracking-wider">
                          Day {day.day}
                        </span>
                        <span className="text-stone-300">·</span>
                        <h4 className="text-sm font-bold text-stone-800">
                          {day.title}
                        </h4>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed pl-1">
                        {day.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="text-lg font-bold text-stone-900 tracking-tight mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>Package Inclusions</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {dest.inclusions.map((inc, i) => (
                    <div key={i} className="p-3 bg-stone-100/70 rounded-xl text-xs text-stone-700 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Traveler Reviews */}
              <div>
                <h3 className="text-lg font-bold text-stone-900 tracking-tight mb-3 flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  <span>Traveler Experiences</span>
                </h3>
                <div className="space-y-3">
                  {INITIAL_REVIEWS.map((rev) => (
                    <div key={rev.id} className="bg-white p-4 rounded-xl border border-stone-200 text-xs">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-bold text-stone-900">{rev.author} <span className="text-stone-400 font-normal">({rev.location})</span></span>
                        <div className="flex items-center gap-1 text-amber-500">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-stone-600 leading-relaxed italic">
                        "{rev.comment}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 5 Columns: Contiguous Purchase Module PDP */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-lg space-y-5">
                
                {/* Price Display */}
                <div className="flex items-baseline justify-between border-b border-stone-200 pb-4">
                  <div>
                    <span className="text-2xl font-black text-stone-900 tabular-nums">
                      {formatCurrency(dest.pricePerPerson)}
                    </span>
                    <span className="text-xs text-stone-500 font-medium ml-1">/ adult traveler</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Instant Confirmation
                  </span>
                </div>

                {/* Form: Select Date */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Select Departure Date
                  </label>
                  <select
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs font-semibold text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-900"
                  >
                    {dest.availableDates.map(d => (
                      <option key={d} value={d}>
                        {new Date(d).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Form: Travelers Count */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Adults (12+ yrs)
                    </span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold tabular-nums text-stone-900">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(8, adults + 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                      Children (3-11 yrs)
                    </span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100"
                      >
                        -
                      </button>
                      <span className="text-sm font-bold tabular-nums text-stone-900">{childrenCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildrenCount(Math.min(6, childrenCount + 1))}
                        className="w-7 h-7 rounded-lg bg-white border border-stone-300 flex items-center justify-center font-bold text-stone-700 hover:bg-stone-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Add-ons selection */}
                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-2">
                    Optional Curated Add-ons
                  </label>
                  <div className="space-y-2">
                    {Object.entries(addonPrices).map(([key, item]) => (
                      <label
                        key={key}
                        className={`flex items-start gap-2.5 p-2.5 rounded-xl border cursor-pointer transition-colors text-xs ${
                          addons[key] ? 'bg-amber-50/60 border-amber-300' : 'bg-stone-50/60 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={addons[key]}
                          onChange={() => toggleAddon(key)}
                          className="mt-0.5 accent-stone-900 rounded"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between font-semibold text-stone-800">
                            <span>{item.name}</span>
                            <span className="tabular-nums text-[#C25E3E]">+{formatCurrency(item.price)}</span>
                          </div>
                          <span className="text-[11px] text-stone-500 block leading-tight">{item.desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Transparent Price Breakdown */}
                <div className="bg-stone-50 p-3.5 rounded-2xl space-y-1.5 text-xs border border-stone-200">
                  <div className="flex justify-between text-stone-600">
                    <span>Base package ({adults} {adults === 1 ? 'Adult' : 'Adults'}{childrenCount > 0 ? `, ${childrenCount} Ch.` : ''})</span>
                    <span className="font-semibold tabular-nums text-stone-800">{formatCurrency(baseTotal)}</span>
                  </div>
                  {addonsTotal > 0 && (
                    <div className="flex justify-between text-stone-600">
                      <span>Add-ons total</span>
                      <span className="font-semibold tabular-nums text-stone-800">+{formatCurrency(addonsTotal)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-stone-600">
                    <span>GST ({adminSettings.gstRatePercent}%)</span>
                    <span className="font-semibold tabular-nums text-stone-800">+{formatCurrency(gstAmount)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Convenience & Booking fee</span>
                    <span className="font-semibold tabular-nums text-stone-800">+{formatCurrency(convenienceFee)}</span>
                  </div>

                  <div className="border-t border-stone-300 pt-2 flex justify-between items-baseline text-sm font-extrabold text-stone-900">
                    <span>Total Amount (INR)</span>
                    <span className="text-base text-[#C25E3E] tabular-nums">{formatCurrency(grandTotal)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  type="button"
                  onClick={handleStartCheckout}
                  className="w-full py-3.5 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg group"
                >
                  <span>Proceed to Secure Payment</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Secure Payment (UPI · Cards · NetBanking)</span>
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
