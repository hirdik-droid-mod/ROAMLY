import React from 'react';
import { Compass, Users, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const pillars = [
    {
      title: 'Curated Itineraries',
      desc: 'Seamless routes designed by seasoned scholars.',
      icon: Compass,
    },
    {
      title: 'Local Experts',
      desc: 'Licensed historians and certified naturalists.',
      icon: Users,
    },
    {
      title: 'Safe & Hassle-Free',
      desc: '100% verified stays, private AC cabs, 24x7 help.',
      icon: ShieldCheck,
    },
    {
      title: 'Authentic Experiences',
      desc: 'Chettinad royal feasts, temple passes & artisans.',
      icon: Heart,
    },
  ];

  return (
    <section className="relative bg-[#FAF7F0] text-stone-900 py-16 sm:py-20 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Story & 4 Badges */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-0.5 bg-[#C25E3E]" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-[#C25E3E] uppercase font-mono">
                  OUR STORY
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-stone-900 tracking-tight leading-tight">
                ABOUT THE JOURNEY
              </h2>
            </div>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light max-w-xl">
              Tamil Nadu is not merely a destination, it is an enduring living emotion. Our curated expeditions bring you the quintessential union of thousand-year Dravidian rock sanctuaries, the misty eucalyptus slopes of the Western Ghats, fragrant spice bazars, and tranquil Coromandel shores — shaped with intimacy for discerning travelers.
            </p>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {pillars.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="text-center sm:text-left space-y-2">
                    <div className="w-10 h-10 rounded-full border border-stone-300 bg-white shadow-xs flex items-center justify-center text-[#C25E3E] mx-auto sm:mx-0">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <h4 className="text-xs font-bold text-stone-900">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-stone-500 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Editorial Quote */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-md relative overflow-hidden text-center lg:text-left space-y-4">
            <div className="text-[10px] font-mono tracking-widest uppercase text-amber-700/80">
              TAMIL NADU REALM
            </div>

            <blockquote className="font-serif italic text-2xl sm:text-3xl text-stone-800 leading-snug">
              “Different landscapes. <br />
              One incredible Tamil Nadu.”
            </blockquote>

            <p className="text-xs text-stone-500 font-light leading-relaxed">
              From the highest peaks of Doddabetta to the sacred confluence of three oceans at Kanyakumari, journey with travelers who value authenticity, human connection, and historical depth.
            </p>

            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold text-stone-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Certified Tamil Nadu Tourism Partner</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
