import React, { useState } from 'react';
import { 
  Sparkles, Heart, Compass, Check, ArrowRight, 
  MapPin, Clock, Users, Coffee, Landmark, Waves, Crown, Trees 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { TravelStyle, TravelPace, TravelCompanions } from '../types';

export const TravelPersonalisation: React.FC = () => {
  const { setSelectedDestination, destinations, formatCurrency } = useTravel();

  // Personalisation states
  const [style, setStyle] = useState<TravelStyle>('heritage_spiritual');
  const [pace, setPace] = useState<TravelPace>('balanced');
  const [companions, setCompanions] = useState<TravelCompanions>('couple');

  const styleOptions: {
    id: TravelStyle;
    title: string;
    desc: string;
    icon: any;
    matchingDestId: string;
    accent: string;
  }[] = [
    {
      id: 'heritage_spiritual',
      title: 'Heritage & Spiritual Connoisseur',
      desc: '1,000-year Chola stone architecture, soaring gopurams, ancient rituals, and scholar historians.',
      icon: Landmark,
      matchingDestId: 'dest-madurai-heritage',
      accent: 'from-amber-600 to-amber-700',
    },
    {
      id: 'slow_nature',
      title: 'Slow & Mountain Nature Wanderer',
      desc: 'Crisp eucalyptus air, emerald tea gardens, pine forests, quiet waterfalls, and heritage steam train.',
      icon: Trees,
      matchingDestId: 'dest-ooty-nilgiri',
      accent: 'from-emerald-600 to-emerald-700',
    },
    {
      id: 'culinary_culture',
      title: 'Culinary & Cultural Storyteller',
      desc: '18-course Chettinad feasts on plantain leaves, Kari Dosa, Athangudi handmade tiles & handlooms.',
      icon: Coffee,
      matchingDestId: 'dest-thanjavur-chola',
      accent: 'from-orange-600 to-orange-700',
    },
    {
      id: 'coastal_adventure',
      title: 'Coastal & Ocean Adventurer',
      desc: 'Bay of Bengal sunrise surfing, monolithic Shore Temple, and the meeting of three oceans at Lands End.',
      icon: Waves,
      matchingDestId: 'dest-mahabalipuram-shore',
      accent: 'from-blue-600 to-blue-700',
    },
    {
      id: 'royal_luxury',
      title: 'Royal Luxury & Palatial Stays',
      desc: '100-room Chettiar merchant palaces, Belgian mirrors, private chauffeurs, and personalized concierge.',
      icon: Crown,
      matchingDestId: 'dest-thanjavur-chola',
      accent: 'from-purple-600 to-purple-700',
    },
  ];

  // Matched destination
  const activeStyleConfig = styleOptions.find(s => s.id === style) || styleOptions[0];
  const matchedDest = destinations.find(d => d.id === activeStyleConfig.matchingDestId) || destinations[0];

  const handleBookMatched = () => {
    setSelectedDestination(matchedDest);
  };

  return (
    <section className="bg-[#FAF7F0] py-16 sm:py-20 border-b border-stone-200" id="personalisation-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C25E3E]/10 text-[#C25E3E] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Trip Personalisation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
            How Do You Like to Travel?
          </h2>
          <p className="text-sm text-stone-600 font-light">
            Select your preferred travel personality, rhythm, and companion style. We will curate a tailored itinerary just for you.
          </p>
        </div>

        {/* 3 Personalisation Config Steps */}
        <div className="space-y-6">
          
          {/* Step 1: Persona Cards */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-3 text-center sm:text-left">
              1. Choose Your Travel Persona
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {styleOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = style === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setStyle(opt.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-200 flex flex-col justify-between ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xl scale-[1.02]'
                        : 'bg-white hover:bg-stone-50 text-stone-800 border-stone-200'
                    }`}
                  >
                    <div>
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                        isSelected ? 'bg-amber-400 text-stone-950' : 'bg-stone-100 text-stone-700'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <h4 className="text-xs font-bold leading-snug">
                        {opt.title}
                      </h4>
                      <p className={`text-[11px] mt-1.5 leading-relaxed ${
                        isSelected ? 'text-stone-300' : 'text-stone-500'
                      }`}>
                        {opt.desc}
                      </p>
                    </div>

                    <div className="pt-3 mt-2 border-t border-stone-200/40 flex items-center justify-between text-[10px] font-semibold">
                      <span>{isSelected ? 'Selected' : 'Select'}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-300" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2 & 3: Pace & Companions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-3xl border border-stone-200 shadow-xs">
            
            {/* Pace */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                2. Travel Pace & Rhythm
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'relaxed', label: 'Leisurely', sub: '1-2 sights / day' },
                  { id: 'balanced', label: 'Balanced', sub: '2-3 sights / day' },
                  { id: 'fast_paced', label: 'Full Immersion', sub: 'Sunrise to night' },
                ].map(p => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPace(p.id as any)}
                    className={`p-3 rounded-xl border text-center transition-all ${
                      pace === p.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs font-semibold'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{p.label}</div>
                    <div className={`text-[10px] ${pace === p.id ? 'text-stone-300' : 'text-stone-400'}`}>{p.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Companions */}
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-stone-500 block mb-2">
                3. Traveling With
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'solo', label: 'Solo' },
                  { id: 'couple', label: 'Couple' },
                  { id: 'family', label: 'Family' },
                  { id: 'friends', label: 'Friends' },
                ].map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCompanions(c.id as any)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all text-xs font-bold ${
                      companions === c.id
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Dynamic Personalised Journey Match Result Card */}
        <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 border border-stone-800 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="flex items-start gap-4 flex-1">
              <img
                src={matchedDest.imageUrl}
                alt={matchedDest.title}
                className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shrink-0 border border-white/20"
                referrerPolicy="no-referrer"
              />

              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase">
                    98% COMPATIBILITY MATCH
                  </span>
                  <span className="text-white/30">·</span>
                  <span className="text-xs text-stone-300">
                    Tailored for {companions} travel ({pace} rhythm)
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl font-bold text-white leading-tight">
                  {matchedDest.title}
                </h3>

                <p className="text-xs text-stone-300 max-w-xl line-clamp-2">
                  {matchedDest.description}
                </p>

                <div className="pt-1 flex flex-wrap items-center gap-3 text-xs text-stone-300">
                  <span className="font-bold text-white tabular-nums">
                    {formatCurrency(matchedDest.pricePerPerson)} / person
                  </span>
                  <span>·</span>
                  <span>{matchedDest.durationDays} Days / {matchedDest.durationNights} Nights</span>
                  <span>·</span>
                  <span className="text-amber-300 font-semibold">★ {matchedDest.rating} Rating</span>
                </div>
              </div>
            </div>

            {/* Book Tailored Trip Button */}
            <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2">
              <button
                type="button"
                onClick={handleBookMatched}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg"
              >
                <span>Book This Tailored Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <span className="text-[10px] text-stone-400 text-center">
                Instant UPI & Card checkout in INR (₹)
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
