import React from 'react';
import { Users, BedDouble, Car, Sparkles } from 'lucide-react';

export const WhatIsIncluded: React.FC = () => {
  const inclusions = [
    {
      title: 'Expert Guides',
      desc: 'Friendly, certified local historians and scholars',
      icon: Users,
    },
    {
      title: 'Premium Stays',
      desc: 'Handpicked heritage mansions and hillside estates',
      icon: BedDouble,
    },
    {
      title: 'All Transfers',
      desc: 'Comfortable, private air-conditioned vehicles throughout',
      icon: Car,
    },
    {
      title: 'Local Experiences',
      desc: 'Food trails, craft workshops, and hidden gems beyond the usual',
      icon: Sparkles,
    },
  ];

  return (
    <section className="bg-[#F8F5EE] py-16 sm:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header Strip matching reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-300/70 pb-6">
          <div>
            <span className="text-[10px] font-mono font-bold tracking-[0.2em] text-[#C25E3E] uppercase block mb-1">
              TRAVEL BETTER
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight">
              WHAT’S INCLUDED
            </h2>
          </div>

          <div className="text-xs font-mono tracking-widest text-stone-500 uppercase">
            EVERY DETAIL TAKEN CARE OF. SO YOU CAN JUST EXPLORE.
          </div>
        </div>

        {/* 4 Inclusions Cards + Right Lettering */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          <div className="md:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {inclusions.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-3 text-center sm:text-left hover:shadow-md transition-shadow"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mx-auto sm:mx-0">
                    <Icon className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <h4 className="text-sm font-bold text-stone-900">
                    {item.title}
                  </h4>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Script Stamp */}
          <div className="md:col-span-3 text-center md:text-right border-l-0 md:border-l border-stone-300 pl-0 md:pl-6 space-y-1">
            <div className="font-serif italic text-3xl sm:text-4xl text-amber-800/90 leading-tight">
              Good People, <br />
              Great Journeys
            </div>
            <p className="text-[11px] text-stone-400 font-mono tracking-wider uppercase pt-1">
              TAMIL NADU EXPEDITIONS
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
