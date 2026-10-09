import React, { useState } from 'react';
import { Utensils, Coffee, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { CULINARY_DELICACIES } from '../data/culturalGuideData';

export const CulinaryCultureGuide: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'vegetarian' | 'non_veg' | 'dessert' | 'beverage'>('all');

  const filteredItems = CULINARY_DELICACIES.filter(item => {
    if (activeFilter === 'all') return true;
    return item.type === activeFilter;
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#C25E3E] uppercase font-bold block mb-1">
            TASTE OF THAMIZHAGAM
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-bold">
            Authentic Regional Culinary Trails
          </h3>
          <p className="text-xs text-stone-500 font-light mt-0.5">
            Every expedition includes curated visits to historic culinary institutions and traditional feasts.
          </p>
        </div>

        {/* Dietary Filters */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Dishes' },
            { id: 'vegetarian', label: 'Pure Veg' },
            { id: 'non_veg', label: 'Chettinad Special' },
            { id: 'dessert', label: 'Sweets & Desserts' },
            { id: 'beverage', label: 'Coffee & Tea' },
          ].map(f => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFilter(f.id as any)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeFilter === f.id
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border border-stone-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Delicacies Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#FAF8F5] border border-stone-200/90 hover:border-amber-400/80 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#C25E3E]">
                  {item.region}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  item.type === 'vegetarian'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : item.type === 'non_veg'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-amber-50 text-amber-800 border border-amber-200'
                }`}>
                  {item.type.replace('_', ' ')}
                </span>
              </div>

              <h4 className="text-sm font-bold text-stone-900 leading-snug">
                {item.name}
              </h4>
              <div className="text-xs text-amber-800 font-serif font-bold italic mt-0.5">
                {item.tamilName}
              </div>

              <p className="text-xs text-stone-600 font-light leading-relaxed mt-2">
                {item.description}
              </p>
            </div>

            <div className="pt-3 border-t border-stone-200/60 space-y-1.5 text-[11px]">
              <div className="flex items-start gap-1.5 text-stone-700">
                <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span><strong>Key Flavors:</strong> {item.signatureIngredients.join(', ')}</span>
              </div>
              <div className="flex items-start gap-1.5 text-stone-500">
                <MapPin className="w-3.5 h-3.5 text-[#C25E3E] shrink-0 mt-0.5" />
                <span className="truncate"><strong>Tasted at:</strong> {item.mustTrySpot}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
