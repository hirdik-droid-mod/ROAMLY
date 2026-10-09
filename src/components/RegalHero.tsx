import React from 'react';
import { ArrowRight, Compass, Sparkles } from 'lucide-react';
import { regalHeroImg, maduraiImg, ootyImg, mahabalipuramImg, kodaikanalImg } from '../data/initialData';
import { useTravel } from '../context/TravelContext';

export const RegalHero: React.FC = () => {
  const { setSelectedDestination, destinations } = useTravel();

  const previewCards = [
    {
      city: 'Madurai',
      sub: 'ROYAL HERITAGE',
      img: maduraiImg,
      destId: 'dest-madurai-heritage',
    },
    {
      city: 'The Nilgiris',
      sub: 'SERENE ESCAPES',
      img: ootyImg,
      destId: 'dest-ooty-nilgiri',
    },
    {
      city: 'Mahabalipuram',
      sub: 'COASTAL MONOLITHS',
      img: mahabalipuramImg,
      destId: 'dest-mahabalipuram-shore',
    },
    {
      city: 'Kodaikanal',
      sub: 'MAJESTIC HILLS',
      img: kodaikanalImg,
      destId: 'dest-kodaikanal-mist',
    },
  ];

  const handleCardClick = (destId: string) => {
    const found = destinations.find(d => d.id === destId);
    if (found) {
      setSelectedDestination(found);
    }
  };

  const scrollToPersonalisation = () => {
    const el = document.getElementById('personalisation-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToMap = () => {
    const el = document.getElementById('map-explorer-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-stone-950 text-white overflow-hidden">
      {/* Background Hero Photography matching the uploaded reference */}
      <div className="relative min-h-[640px] lg:min-h-[760px] flex flex-col justify-between p-6 sm:p-10 lg:p-16">
        <img
          src={regalHeroImg}
          alt="Regal Tamil Nadu golden sunset view over temple towers and lake with silk saree"
          className="absolute inset-0 w-full h-full object-cover object-center scale-102 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Scrim Gradient (WCAG AA Compliant) */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/45 to-stone-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-stone-950/30 to-transparent" />

        {/* Top Header Row of Hero */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-start justify-between gap-6 pt-4">
          
          {/* Left Title & Tagline */}
          <div className="max-w-2xl">
            <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.25em] text-amber-200/90 uppercase block mb-2">
              TIMELESS PLACES. MEANINGFUL JOURNEYS.
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-white font-normal uppercase leading-[1.05]">
              EXPLORE <br />
              <span className="text-amber-100 font-medium">TAMIL NADU</span>
            </h1>
            <p className="mt-4 text-xs sm:text-sm text-stone-200/90 max-w-lg leading-relaxed font-light">
              From 2,500-year-old Chola and Nayakkar stone temple sanctums to the emerald tea terraces of the Nilgiris and the meeting of three oceans.
            </p>
          </div>

          {/* Right Kicker Column matching reference design */}
          <div className="hidden lg:flex flex-col text-right text-[11px] font-mono tracking-widest text-amber-200/80 space-y-1 select-none pt-4">
            <span>CULTURE</span>
            <span>PEOPLE</span>
            <span>PLACES</span>
            <span className="text-white font-bold">A DEEPER YOU</span>
          </div>

        </div>

        {/* Bottom Strip: 4 Preview Cards & Action Button */}
        <div className="relative z-10 pt-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            
            {/* 4 Cards Grid matching inspiration */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 flex-1">
              {previewCards.map((card) => (
                <div
                  key={card.city}
                  onClick={() => handleCardClick(card.destId)}
                  className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-stone-900 border border-white/20 cursor-pointer shadow-lg hover:shadow-2xl hover:border-amber-400/60 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <img
                    src={card.img}
                    alt={card.city}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
                  
                  <div className="relative z-10 p-3 h-full flex flex-col justify-end text-left">
                    <h3 className="text-sm sm:text-base font-bold text-white leading-tight group-hover:text-amber-200 transition-colors">
                      {card.city}
                    </h3>
                    <span className="text-[9px] font-mono tracking-wider text-stone-300 font-medium uppercase mt-0.5">
                      {card.sub}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Action Block */}
            <div className="lg:w-72 shrink-0 space-y-3 text-center lg:text-right">
              <div className="text-[11px] font-mono tracking-widest text-stone-300 uppercase">
                A JOURNEY THROUGH A BILLION STORIES
              </div>

              <div className="flex items-center justify-center lg:justify-end gap-3">
                <button
                  onClick={scrollToMap}
                  className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-semibold tracking-wider transition-all border border-white/20"
                >
                  View City Map
                </button>
                <button
                  onClick={scrollToPersonalisation}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-stone-950 text-xs font-bold tracking-wider transition-all shadow-lg shadow-amber-900/40 flex items-center gap-2 group"
                >
                  <span>Plan Your Trip</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
