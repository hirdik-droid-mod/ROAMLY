import React, { useState, useMemo } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  InfoWindow, 
  useMap 
} from '@vis.gl/react-google-maps';
import { 
  MapPin, Clock, IndianRupee, Navigation, ExternalLink, 
  Sparkles, Compass, Layers, CheckCircle2, ChevronRight 
} from 'lucide-react';
import { TAMIL_NADU_CITIES, CityInfo } from '../data/cityPlacesData';
import { PlaceToVisit } from '../types';

// Map controller helper to pan/zoom when a city or place is selected
const MapPanController: React.FC<{ targetCoords: { lat: number; lng: number } | null; zoom: number }> = ({ targetCoords, zoom }) => {
  const map = useMap();

  React.useEffect(() => {
    if (map && targetCoords) {
      map.panTo(targetCoords);
      map.setZoom(zoom);
    }
  }, [map, targetCoords, zoom]);

  return null;
};

export const GoogleMapsExplorer: React.FC = () => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyA71c26FuCc2jSZSWwVw_H--K6XuvE6tcs';

  const [selectedCityId, setSelectedCityId] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<PlaceToVisit | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Compute active city
  const activeCity = useMemo(() => {
    if (selectedCityId === 'all') return null;
    return TAMIL_NADU_CITIES.find(c => c.id === selectedCityId) || null;
  }, [selectedCityId]);

  // Compute all places to render markers for
  const visiblePlaces = useMemo(() => {
    let list: PlaceToVisit[] = [];
    if (selectedCityId === 'all') {
      list = TAMIL_NADU_CITIES.flatMap(c => c.places);
    } else if (activeCity) {
      list = activeCity.places;
    }

    if (activeCategoryFilter !== 'all') {
      list = list.filter(p => p.category === activeCategoryFilter);
    }

    return list;
  }, [selectedCityId, activeCity, activeCategoryFilter]);

  // Map center coordinates
  const mapCenter = useMemo(() => {
    if (selectedPlace) {
      return { lat: selectedPlace.lat, lng: selectedPlace.lng };
    }
    if (activeCity) {
      return activeCity.center;
    }
    // Tamil Nadu geographic center
    return { lat: 10.8505, lng: 78.7047 };
  }, [selectedPlace, activeCity]);

  const mapZoom = useMemo(() => {
    if (selectedPlace) return 15;
    if (activeCity) return activeCity.zoom;
    return 7;
  }, [selectedPlace, activeCity]);

  const handleSelectCity = (cityId: string) => {
    setSelectedCityId(cityId);
    setSelectedPlace(null);
  };

  const handleSelectPlace = (place: PlaceToVisit) => {
    setSelectedPlace(place);
  };

  return (
    <section className="bg-[#0B1528] text-white py-16 sm:py-20 relative overflow-hidden" id="map-explorer-section">
      
      {/* Background radial glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        
        {/* Section Header matching the itinerary map style in reference image */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-0.5 bg-amber-400" />
              <span className="text-[11px] font-mono tracking-[0.25em] text-amber-300 uppercase">
                INTERACTIVE GOOGLE MAPS PLATFORM
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Places to Visit Across Tamil Nadu
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-stone-300 font-light max-w-xl">
              Explore authentic coordinates, timings, and entry fees for UNESCO monuments, mountain viewpoints, and spiritual sanctums.
            </p>
          </div>

          {/* City Selection Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleSelectCity('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCityId === 'all'
                  ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                  : 'bg-white/10 hover:bg-white/20 text-stone-300 border border-white/10'
              }`}
            >
              All 6 Circuits
            </button>
            {TAMIL_NADU_CITIES.map(c => (
              <button
                key={c.id}
                onClick={() => handleSelectCity(c.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCityId === c.id
                    ? 'bg-amber-400 text-stone-950 shadow-md font-bold'
                    : 'bg-white/10 hover:bg-white/20 text-stone-300 border border-white/10'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-between text-xs text-stone-300">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[11px] uppercase tracking-wider text-stone-400 font-mono">Filter Category:</span>
            {[
              { id: 'all', label: 'All Places' },
              { id: 'temple', label: 'Temples' },
              { id: 'nature', label: 'Nature & Lakes' },
              { id: 'monument', label: 'Monuments' },
              { id: 'viewpoint', label: 'Viewpoints' },
              { id: 'culinary', label: 'Culinary Bazaars' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategoryFilter(cat.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  activeCategoryFilter === cat.id
                    ? 'bg-white/20 text-white font-semibold'
                    : 'text-stone-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <span className="text-[11px] font-mono text-amber-300 hidden sm:inline">
            Showing {visiblePlaces.length} verified spots
          </span>
        </div>

        {/* Main Grid: Google Map (Left 7) & Places to Visit Cards (Right 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Interactive Google Map */}
          <div className="lg:col-span-7 bg-stone-900 rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative min-h-[460px] sm:min-h-[560px] flex flex-col">
            
            <APIProvider apiKey={apiKey}>
              <div className="w-full h-full flex-1 min-h-[460px] sm:min-h-[560px] relative">
                <Map
                  mapId="DEMO_MAP_ID"
                  defaultCenter={mapCenter}
                  defaultZoom={mapZoom}
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  internalUsageAttributionIds={["gmp_mcp_codeassist_v1_aistudio"]}
                  className="w-full h-full"
                >
                  <MapPanController targetCoords={mapCenter} zoom={mapZoom} />

                  {/* Render Advanced Markers for all visible places */}
                  {visiblePlaces.map((place) => {
                    const isSelected = selectedPlace?.id === place.id;
                    return (
                      <AdvancedMarker
                        key={place.id}
                        position={{ lat: place.lat, lng: place.lng }}
                        onClick={() => handleSelectPlace(place)}
                        title={place.name}
                      >
                        {/* Custom Pin Icon */}
                        <div className={`p-2 rounded-full shadow-lg transition-transform duration-200 cursor-pointer flex items-center justify-center ${
                          isSelected
                            ? 'bg-amber-400 text-stone-950 ring-4 ring-amber-300/40 scale-125 z-30'
                            : place.category === 'temple'
                            ? 'bg-rose-600 text-white hover:scale-110'
                            : place.category === 'nature'
                            ? 'bg-emerald-600 text-white hover:scale-110'
                            : place.category === 'viewpoint'
                            ? 'bg-blue-600 text-white hover:scale-110'
                            : 'bg-amber-600 text-white hover:scale-110'
                        }`}>
                          <MapPin className="w-4 h-4" />
                        </div>
                      </AdvancedMarker>
                    );
                  })}

                  {/* InfoWindow for the selected place */}
                  {selectedPlace && (
                    <InfoWindow
                      position={{ lat: selectedPlace.lat, lng: selectedPlace.lng }}
                      onCloseClick={() => setSelectedPlace(null)}
                      headerContent={
                        <div className="text-xs font-bold text-stone-900 pr-4">
                          {selectedPlace.name}
                        </div>
                      }
                    >
                      <div className="p-1 max-w-[240px] text-xs text-stone-700 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E3E] block">
                          {selectedPlace.city} · {selectedPlace.category}
                        </span>
                        <p className="text-[11px] text-stone-600 leading-snug line-clamp-3">
                          {selectedPlace.description}
                        </p>
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-stone-200 font-semibold text-stone-800">
                          <span>Entry: {selectedPlace.entryFeeINR === 0 ? 'Free' : `₹${selectedPlace.entryFeeINR}`}</span>
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${selectedPlace.lat},${selectedPlace.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#C25E3E] hover:underline flex items-center gap-0.5"
                          >
                            <span>Open Maps</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    </InfoWindow>
                  )}

                </Map>
              </div>
            </APIProvider>

            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[11px] text-amber-200 flex items-center gap-1.5 pointer-events-none">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>{activeCity ? activeCity.name : 'Tamil Nadu Heritage Coordinates'}</span>
            </div>

          </div>

          {/* Right Column: Places to Visit List */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            
            {/* Active City Brief Card */}
            {activeCity && (
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 space-y-1">
                <span className="text-[10px] font-mono tracking-widest text-amber-300 uppercase block">
                  {activeCity.district} CIRCUIT
                </span>
                <h3 className="text-base font-bold text-white">
                  {activeCity.tagline}
                </h3>
                <p className="text-xs text-stone-300 font-light leading-relaxed">
                  {activeCity.description}
                </p>
              </div>
            )}

            {/* Scrollable list of places in this city */}
            <div className="space-y-3 overflow-y-auto max-h-[480px] pr-1 scrollbar-thin">
              {visiblePlaces.map((place) => {
                const isSelected = selectedPlace?.id === place.id;
                return (
                  <div
                    key={place.id}
                    onClick={() => handleSelectPlace(place)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-white text-stone-900 border-amber-400 shadow-xl scale-[1.01]'
                        : 'bg-white/5 hover:bg-white/10 text-white border-white/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-white/10 text-stone-300'
                          }`}>
                            {place.category}
                          </span>
                          <span className={`text-[10px] font-mono ${isSelected ? 'text-stone-500' : 'text-stone-400'}`}>
                            {place.city}
                          </span>
                        </div>
                        <h4 className={`text-sm font-bold mt-1.5 ${isSelected ? 'text-stone-900' : 'text-white'}`}>
                          {place.name}
                        </h4>
                      </div>

                      <div className="text-right shrink-0">
                        <span className={`text-xs font-extrabold tabular-nums block ${isSelected ? 'text-emerald-700' : 'text-emerald-400'}`}>
                          {place.entryFeeINR === 0 ? 'Free Entry' : `₹${place.entryFeeINR}`}
                        </span>
                      </div>
                    </div>

                    <p className={`text-xs mt-2 leading-relaxed ${isSelected ? 'text-stone-600' : 'text-stone-300 font-light'}`}>
                      {place.description}
                    </p>

                    <div className={`mt-3 pt-2.5 flex items-center justify-between text-[11px] border-t ${
                      isSelected ? 'border-stone-200 text-stone-500' : 'border-white/10 text-stone-400'
                    }`}>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-amber-400" />
                        <span className="truncate max-w-[170px]">{place.timings}</span>
                      </span>

                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${place.lat},${place.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={`inline-flex items-center gap-1 font-semibold hover:underline ${
                          isSelected ? 'text-[#C25E3E]' : 'text-amber-300'
                        }`}
                      >
                        <span>Directions</span>
                        <Navigation className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
