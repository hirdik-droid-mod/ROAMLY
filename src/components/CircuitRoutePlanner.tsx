import React, { useState } from 'react';
import { 
  Navigation, Car, Clock, MapPin, Fuel, ShieldCheck, 
  ArrowRight, Compass, Sparkles, Check 
} from 'lucide-react';
import { CIRCUIT_ROUTES } from '../data/culturalGuideData';

export const CircuitRoutePlanner: React.FC = () => {
  const [selectedCircuit, setSelectedCircuit] = useState(CIRCUIT_ROUTES[0]);

  return (
    <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#C25E3E] uppercase font-bold block mb-1">
            ROAD TRIP & HIGHWAY CIRCUITS
          </span>
          <h3 className="text-xl sm:text-2xl font-serif text-stone-900 font-bold">
            Interactive Tamil Nadu Highway Circuits
          </h3>
          <p className="text-xs text-stone-500 font-light mt-0.5">
            Verified driving distances, scenic pitstops, and day-wise route timelines with private AC chauffeurs.
          </p>
        </div>

        {/* Circuit Selectors */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CIRCUIT_ROUTES.map((c) => {
            const isSelected = selectedCircuit.id === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedCircuit(c)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
                }`}
              >
                {c.title.split(' ')[0]} {c.title.split(' ')[1]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Circuit Overview Card */}
      <div className="bg-white rounded-2xl p-6 border border-stone-200 space-y-6">
        
        {/* Title & Key Road Metrics */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h4 className="text-lg font-bold text-stone-900">
              {selectedCircuit.title}
            </h4>
            <p className="text-xs text-[#C25E3E] font-medium mt-0.5">
              {selectedCircuit.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block uppercase">Duration</span>
              <span className="font-bold text-stone-900">{selectedCircuit.duration}</span>
            </div>
            <div className="px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block uppercase">Distance</span>
              <span className="font-bold text-stone-900">{selectedCircuit.totalDistanceKm} km</span>
            </div>
            <div className="px-3 py-1.5 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] text-stone-400 block uppercase">Drive Time</span>
              <span className="font-bold text-stone-900">~{selectedCircuit.drivingTimeHours} hrs</span>
            </div>
          </div>
        </div>

        {/* Timeline of Stops */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
            Curated En-Route Itinerary & Heritage Stops
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {selectedCircuit.stops.map((stop, idx) => (
              <div
                key={stop.name}
                className="p-4 bg-stone-50/80 rounded-2xl border border-stone-200/80 space-y-2 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold bg-[#C25E3E] text-white px-2 py-0.5 rounded-full">
                    Stop 0{idx + 1}
                  </span>
                  <span className="text-[10px] text-stone-500 font-mono">
                    {stop.durationMinutes} mins
                  </span>
                </div>
                <h5 className="text-xs font-bold text-stone-900 leading-snug">
                  {stop.name}
                </h5>
                <p className="text-[11px] text-stone-600 font-light leading-relaxed">
                  {stop.highlight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle & Chauffeur Amenities Footer */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-600 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Dedicated All-India Tourist Permit Vehicles with Uniformed Chauffeur</span>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-stone-400">Included: FASTag Tolls · Fuel · Interstate Permits · Mineral Water</span>
          </div>
        </div>

      </div>

    </div>
  );
};
