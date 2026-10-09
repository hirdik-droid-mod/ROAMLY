import React, { useState } from 'react';
import { SlidersHorizontal, RotateCcw, ChevronDown, Check } from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { CategoryType } from '../types';

export const FilterBar: React.FC = () => {
  const { searchFilters, setSearchFilters, resetFilters, formatCurrency, filteredDestinations } = useTravel();
  const [showAdvanced, setShowAdvanced] = useState(false);

  const categories: { label: string; value: CategoryType }[] = [
    { label: 'All Expeditions', value: 'all' },
    { label: 'Hill Stations', value: 'hill_station' },
    { label: 'Heritage & Temples', value: 'heritage_temple' },
    { label: 'Coastal & Beaches', value: 'coastal_beach' },
    { label: 'Cultural & Culinary', value: 'cultural_culinary' },
  ];

  const handleCategoryChange = (cat: CategoryType) => {
    setSearchFilters(prev => ({ ...prev, category: cat }));
  };

  const isFiltered = 
    searchFilters.category !== 'all' || 
    searchFilters.district !== 'all' || 
    searchFilters.maxPrice < 10000 || 
    searchFilters.duration !== 'all' || 
    searchFilters.minRating > 0 ||
    searchFilters.searchQuery.trim().length > 0;

  return (
    <div className="space-y-4">
      {/* Category Segmented Bar & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = searchFilters.category === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => handleCategoryChange(cat.value)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all select-none ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'bg-white/80 hover:bg-stone-200/80 text-stone-600 border border-stone-200/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Action Controls: Advanced Filter Toggle, Sort Dropdown & Reset */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold border transition-all ${
              showAdvanced || isFiltered
                ? 'bg-stone-900 text-white border-stone-900'
                : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
            {isFiltered && (
              <span className="w-2 h-2 rounded-full bg-[#C25E3E]" />
            )}
          </button>

          {/* Sort selector */}
          <div className="relative">
            <select
              value={searchFilters.sortBy}
              onChange={(e) => setSearchFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="appearance-none bg-white text-xs font-semibold text-stone-800 border border-stone-300 rounded-full pl-3.5 pr-8 py-2 focus:outline-none focus:ring-1 focus:ring-stone-900 cursor-pointer"
            >
              <option value="featured">Sort: Curated Featured</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Rating: Highest First</option>
              <option value="duration">Duration: Shortest</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-stone-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs text-stone-500 hover:text-stone-900 transition-colors px-2 py-1"
              title="Reset all filters"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Advanced Filter Drawer / Expanded Box */}
      {showAdvanced && (
        <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* 1. Keyword Search */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                Keyword / Experience
              </label>
              <input
                type="text"
                value={searchFilters.searchQuery}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                placeholder="e.g. Toy train, temple, surf..."
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900"
              />
            </div>

            {/* 2. District Filter */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                District / Region
              </label>
              <select
                value={searchFilters.district}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, district: e.target.value }))}
                className="w-full text-xs px-3 py-2 rounded-lg border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
              >
                <option value="all">All Tamil Nadu Districts</option>
                <option value="The Nilgiris">The Nilgiris (Ooty & Coonoor)</option>
                <option value="Madurai">Madurai</option>
                <option value="Chengalpattu">Chengalpattu (Mahabalipuram)</option>
                <option value="Dindigul">Dindigul (Kodaikanal)</option>
                <option value="Kanyakumari">Kanyakumari</option>
                <option value="Thanjavur & Sivaganga">Thanjavur & Chettinad</option>
              </select>
            </div>

            {/* 3. Max Price Slider in INR */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Max Budget
                </label>
                <span className="text-xs font-bold text-[#C25E3E] tabular-nums">
                  {formatCurrency(searchFilters.maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="3000"
                max="10000"
                step="500"
                value={searchFilters.maxPrice}
                onChange={(e) => setSearchFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }))}
                className="w-full accent-stone-900 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-stone-400 mt-0.5">
                <span>₹3,000</span>
                <span>₹10,000+</span>
              </div>
            </div>

            {/* 4. Duration Selector */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1.5">
                Trip Duration
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { label: 'All', value: 'all' },
                  { label: '1-2 Days', value: '1-2' },
                  { label: '3-4 Days', value: '3-4' },
                ].map((dur) => (
                  <button
                    key={dur.value}
                    type="button"
                    onClick={() => setSearchFilters(prev => ({ ...prev, duration: dur.value as any }))}
                    className={`py-1.5 text-xs font-medium rounded-lg border text-center transition-colors ${
                      searchFilters.duration === dur.value
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    {dur.label}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Results Count Line */}
      <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
        <span>
          Showing <strong className="text-stone-900 font-semibold">{filteredDestinations.length}</strong> authentic Tamil Nadu destinations
        </span>
        {isFiltered && (
          <span className="text-[#C25E3E] font-medium">
            Active filters applied
          </span>
        )}
      </div>
    </div>
  );
};
