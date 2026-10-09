import React from 'react';
import { Compass, Feather, Mountain, Sun, Trees, Waves } from 'lucide-react';

export const PartnersStrip: React.FC = () => {
  const partners = [
    {
      name: 'TERRA',
      sub: 'TRAVEL',
      icon: Feather,
    },
    {
      name: 'HORIZON',
      sub: 'GETAWAYS',
      icon: Waves,
    },
    {
      name: 'WAYFARER',
      sub: 'JOURNEYS',
      icon: Mountain,
    },
    {
      name: 'SOLARA',
      sub: 'TRAVEL',
      icon: Sun,
    },
    {
      name: 'WANDER',
      sub: 'MORE',
      icon: Trees,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-8 opacity-65 hover:opacity-90 transition-opacity border-b border-stone-200/60 pb-8">
        {partners.map((partner) => {
          const Icon = partner.icon;
          return (
            <div
              key={partner.name}
              className="flex items-center gap-2.5 text-stone-600 transition-colors"
            >
              <Icon className="w-5 h-5 text-stone-500 stroke-[1.75]" />
              <div className="flex flex-col">
                <span className="text-xs font-black tracking-widest text-stone-800 leading-none">
                  {partner.name}
                </span>
                <span className="text-[9px] tracking-wider text-stone-400 font-medium leading-tight">
                  {partner.sub}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
