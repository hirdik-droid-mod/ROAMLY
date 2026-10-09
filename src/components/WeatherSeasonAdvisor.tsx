import React, { useState } from 'react';
import { 
  Sun, CloudRain, Wind, CloudFog, Thermometer, 
  CheckCircle, Backpack, Sparkles, ChevronRight 
} from 'lucide-react';
import { WEATHER_ADVISORIES } from '../data/culturalGuideData';

export const WeatherSeasonAdvisor: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState(WEATHER_ADVISORIES[0]);
  const [showPackingModal, setShowPackingModal] = useState(false);

  const getIcon = (type: string) => {
    switch (type) {
      case 'mist':
        return <CloudFog className="w-6 h-6 text-blue-400" />;
      case 'breeze':
        return <Wind className="w-6 h-6 text-teal-400" />;
      case 'rain':
        return <CloudRain className="w-6 h-6 text-indigo-400" />;
      default:
        return <Sun className="w-6 h-6 text-amber-500" />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#C25E3E] uppercase font-bold block mb-1">
            CLIMATE & SEASONS ADVISORY
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-bold">
            Live Regional Weather & Best Visiting Months
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setShowPackingModal(!showPackingModal)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-stone-100 hover:bg-stone-200 text-xs font-semibold text-stone-800 transition-colors shrink-0"
        >
          <Backpack className="w-3.5 h-3.5 text-[#C25E3E]" />
          <span>{showPackingModal ? 'Hide Packing Tips' : 'View Packing Checklist'}</span>
        </button>
      </div>

      {/* City Weather Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {WEATHER_ADVISORIES.map((w) => {
          const isSelected = selectedCity.city === w.city;
          return (
            <button
              key={w.city}
              type="button"
              onClick={() => setSelectedCity(w)}
              className={`p-3.5 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white border-stone-900 shadow-md scale-102'
                  : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl font-black font-mono tabular-nums">
                  {w.temperatureC}°C
                </span>
                {getIcon(w.iconType)}
              </div>
              <h4 className="text-xs font-bold leading-tight truncate">
                {w.city}
              </h4>
              <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-stone-300' : 'text-stone-400'}`}>
                {w.bestMonths}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Weather Insight Box */}
      <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-stone-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-stone-900">{selectedCity.city}</span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-600">{selectedCity.condition}</span>
          </div>
          <p className="text-xs text-stone-500 font-light">
            Recommended travel season: <strong className="text-stone-800 font-semibold">{selectedCity.bestMonths}</strong>. Ideal for cultural walking trails and mountain photography.
          </p>
        </div>

        {/* Clothing tags */}
        <div className="flex flex-wrap gap-1.5 shrink-0">
          {selectedCity.clothingTips.map((tip, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-white px-2.5 py-1 rounded-full border border-stone-200 font-medium text-stone-700 shadow-2xs"
            >
              {tip}
            </span>
          ))}
        </div>
      </div>

      {/* Collapsible Packing Checklist */}
      {showPackingModal && (
        <div className="p-5 bg-amber-50/70 border border-amber-200 rounded-2xl space-y-3 animate-in fade-in duration-200">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
            <Backpack className="w-4 h-4 text-[#C25E3E]" />
            <span>Essential Tamil Nadu Travel Packing Checklist</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-stone-700">
            <div className="p-3 bg-white rounded-xl border border-amber-200/60 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Temple Attire:</strong> Traditional dhoti/veshti or salwar/saree for entry into Meenakshi & Chola sanctums.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200/60 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Highlands Layer:</strong> Light fleece or woolen shawl for Ooty and Kodaikanal evening mist.</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-amber-200/60 flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Slip-on Footwear:</strong> Comfortable sandals/slip-ons for easy removal outside ancient temples.</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
