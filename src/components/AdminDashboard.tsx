import React, { useState } from 'react';
import { 
  Plus, Edit3, Trash2, CheckCircle2, XCircle, Star, 
  IndianRupee, Calendar, Settings, Layers, Users, Eye, 
  TrendingUp, Shield, Bell, Save, RotateCcw, Check, Sparkles 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { Destination, CategoryType, Booking } from '../types';
import { heroImg } from '../data/initialData';

export const AdminDashboard: React.FC = () => {
  const { 
    destinations, 
    bookings, 
    adminSettings, 
    updateAdminSettings, 
    addDestination, 
    updateDestination, 
    deleteDestination, 
    toggleDestinationActive, 
    toggleDestinationFeatured, 
    updateBookingStatus, 
    setCompletedBookingTicket,
    resetToDefaults, 
    formatCurrency 
  } = useTravel();

  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'listings' | 'bookings' | 'settings'>('overview');
  
  // Listing Edit/Add Modal State
  const [isEditingListing, setIsEditingListing] = useState(false);
  const [editingDestId, setEditingDestId] = useState<string | null>(null);
  
  // Form state
  const [formTitle, setFormTitle] = useState('');
  const [formDistrict, setFormDistrict] = useState('Madurai');
  const [formRegion, setFormRegion] = useState('');
  const [formCategory, setFormCategory] = useState<CategoryType>('heritage_temple');
  const [formTagline, setFormTagline] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formPrice, setFormPrice] = useState(4999);
  const [formDays, setFormDays] = useState(3);
  const [formNights, setFormNights] = useState(2);
  const [formBestSeason, setFormBestSeason] = useState('October – March');
  const [formImageUrl, setFormImageUrl] = useState('');

  // Settings local state
  const [settingsForm, setSettingsForm] = useState(adminSettings);
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // Compute metrics
  const totalRevenue = bookings
    .filter(b => b.bookingStatus !== 'cancelled')
    .reduce((sum, b) => sum + b.totalAmount, 0);

  const confirmedBookingsCount = bookings.filter(b => b.bookingStatus === 'confirmed').length;
  const activeListingsCount = destinations.filter(d => d.isActive).length;

  const handleOpenAddModal = () => {
    setEditingDestId(null);
    setFormTitle('');
    setFormDistrict('Madurai');
    setFormRegion('Temple Heartland');
    setFormCategory('heritage_temple');
    setFormTagline('');
    setFormDesc('');
    setFormPrice(4999);
    setFormDays(3);
    setFormNights(2);
    setFormBestSeason('October – March');
    setFormImageUrl(heroImg);
    setIsEditingListing(true);
  };

  const handleOpenEditModal = (dest: Destination) => {
    setEditingDestId(dest.id);
    setFormTitle(dest.title);
    setFormDistrict(dest.district);
    setFormRegion(dest.region);
    setFormCategory(dest.category);
    setFormTagline(dest.tagline);
    setFormDesc(dest.description);
    setFormPrice(dest.pricePerPerson);
    setFormDays(dest.durationDays);
    setFormNights(dest.durationNights);
    setFormBestSeason(dest.bestSeason);
    setFormImageUrl(dest.imageUrl);
    setIsEditingListing(true);
  };

  const handleSaveListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDestId) {
      updateDestination(editingDestId, {
        title: formTitle,
        district: formDistrict,
        region: formRegion,
        category: formCategory,
        tagline: formTagline,
        description: formDesc,
        pricePerPerson: Number(formPrice),
        durationDays: Number(formDays),
        durationNights: Number(formNights),
        bestSeason: formBestSeason,
        imageUrl: formImageUrl || heroImg
      });
    } else {
      addDestination({
        title: formTitle,
        district: formDistrict,
        region: formRegion,
        category: formCategory,
        tagline: formTagline,
        description: formDesc,
        pricePerPerson: Number(formPrice),
        durationDays: Number(formDays),
        durationNights: Number(formNights),
        bestSeason: formBestSeason,
        imageUrl: formImageUrl || heroImg,
        galleryImages: [formImageUrl || heroImg],
        rating: 4.9,
        reviewCount: 1,
        featured: false,
        isActive: true,
        highlights: [
          'Authentic guided expedition with licensed heritage guides',
          'Private transport and premium heritage accommodations',
          'Local Tamil culinary experiences included'
        ],
        inclusions: [
          'Hotel / Resort stay with breakfast',
          'All entry monument permits and tolls',
          '24/7 dedicated ground travel coordinator'
        ],
        itinerary: [
          { day: 1, title: 'Arrival & Welcome', details: 'Check in to boutique stay and enjoy orientation walk.' },
          { day: 2, title: 'Full Day Sightseeing', details: 'Explore iconic heritage spots with expert local scholar.' }
        ],
        availableDates: ['2026-10-25', '2026-11-01', '2026-11-15', '2026-12-05']
      });
    }
    setIsEditingListing(false);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminSettings(settingsForm);
    setSettingsSavedToast(true);
    setTimeout(() => setSettingsSavedToast(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Header with Navigation tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E3E]">
              Control Center
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500 font-medium">Tamil Nadu Tourism Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Admin Dashboard
          </h1>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-full shrink-0 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'listings', label: 'Listings', icon: Layers },
            { id: 'bookings', label: 'Bookings', icon: Calendar },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeAdminTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveAdminTab(tab.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: OVERVIEW & ANALYTICS */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Key KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Gross Platform Revenue
              </span>
              <div className="text-2xl font-black text-stone-900 tabular-nums">
                {formatCurrency(totalRevenue)}
              </div>
              <p className="text-[11px] text-emerald-600 font-medium mt-1">
                From confirmed & completed tours
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Active Bookings
              </span>
              <div className="text-2xl font-black text-stone-900 tabular-nums">
                {confirmedBookingsCount}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                {bookings.length} total customer records
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Tamil Nadu Destinations
              </span>
              <div className="text-2xl font-black text-stone-900 tabular-nums">
                {activeListingsCount}
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Across 8 distinct cultural circuits
              </p>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block mb-1">
                Average Experience Rating
              </span>
              <div className="text-2xl font-black text-stone-900 tabular-nums flex items-center gap-1.5">
                <span>4.89</span>
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
              </div>
              <p className="text-[11px] text-stone-500 mt-1">
                Based on 700+ verified customer reviews
              </p>
            </div>

          </div>

          {/* Recent Bookings Feed */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-stone-900">
                Recent Customer Bookings
              </h3>
              <button
                onClick={() => setActiveAdminTab('bookings')}
                className="text-xs font-semibold text-[#C25E3E] hover:underline"
              >
                View All {bookings.length} Bookings →
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-stone-100 text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 font-bold">Ref ID</th>
                    <th className="py-2.5 font-bold">Traveler</th>
                    <th className="py-2.5 font-bold">Destination</th>
                    <th className="py-2.5 font-bold">Amount</th>
                    <th className="py-2.5 font-bold">Method</th>
                    <th className="py-2.5 font-bold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bookings.slice(0, 5).map(b => (
                    <tr key={b.id} className="hover:bg-stone-50">
                      <td className="py-3 font-mono font-bold text-[#C25E3E]">{b.id}</td>
                      <td className="py-3 font-medium text-stone-900">
                        <div>{b.travelerName}</div>
                        <div className="text-[11px] text-stone-400">{b.travelerPhone}</div>
                      </td>
                      <td className="py-3 text-stone-700 font-medium">{b.destinationTitle}</td>
                      <td className="py-3 font-bold tabular-nums text-stone-900">{formatCurrency(b.totalAmount)}</td>
                      <td className="py-3 uppercase text-[11px] font-semibold text-stone-500">{b.paymentMethod}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.bookingStatus === 'confirmed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : b.bookingStatus === 'completed'
                            ? 'bg-blue-50 text-blue-700'
                            : 'bg-stone-100 text-stone-600'
                        }`}>
                          {b.bookingStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: LISTINGS MANAGEMENT */}
      {activeAdminTab === 'listings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-stone-900">
                Destination Packages & Tours
              </h2>
              <p className="text-xs text-stone-500">
                Add, edit pricing in ₹ INR, toggle visibility or feature listings on the homepage.
              </p>
            </div>

            <button
              onClick={handleOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-semibold shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Destination</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map(dest => (
              <div 
                key={dest.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all ${
                  dest.isActive ? 'border-stone-200 shadow-xs' : 'border-stone-300 opacity-60'
                }`}
              >
                <div className="relative aspect-[16/10] bg-stone-900">
                  <img
                    src={dest.imageUrl}
                    alt={dest.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-stone-800">
                    {dest.district}
                  </div>
                  {dest.featured && (
                    <div className="absolute top-3 right-3 bg-[#C25E3E] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      Featured
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase text-stone-400">
                      {dest.category.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                      ★ {dest.rating}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 leading-snug">
                    {dest.title}
                  </h3>

                  <p className="text-xs text-stone-500 line-clamp-2">
                    {dest.description}
                  </p>

                  <div className="pt-2 flex items-baseline justify-between border-t border-stone-100">
                    <div className="text-base font-black text-stone-900 tabular-nums">
                      {formatCurrency(dest.pricePerPerson)}
                      <span className="text-[10px] text-stone-400 font-normal ml-1">/ person</span>
                    </div>
                    <span className="text-xs text-stone-500">
                      {dest.durationDays}D / {dest.durationNights}N
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center justify-between border-t border-stone-100 gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => toggleDestinationActive(dest.id)}
                        className={`text-[10px] px-2 py-1 rounded font-semibold ${
                          dest.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {dest.isActive ? 'Active' : 'Hidden'}
                      </button>
                      <button
                        onClick={() => toggleDestinationFeatured(dest.id)}
                        className={`text-[10px] px-2 py-1 rounded font-semibold ${
                          dest.featured ? 'bg-amber-50 text-amber-800' : 'bg-stone-100 text-stone-500'
                        }`}
                      >
                        {dest.featured ? '★ Featured' : 'Normal'}
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditModal(dest)}
                        className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg"
                        title="Edit package"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteDestination(dest.id)}
                        className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg"
                        title="Delete package"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BOOKINGS MANAGEMENT */}
      {activeAdminTab === 'bookings' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Customer Bookings Registry
            </h2>
            <p className="text-xs text-stone-500">
              Inspect traveler payments, view generated vouchers, and update fulfillment statuses.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF8F5] border-b border-stone-200 text-stone-500 uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-4 font-bold">Booking Ref</th>
                    <th className="p-4 font-bold">Traveler</th>
                    <th className="p-4 font-bold">Destination & Dates</th>
                    <th className="p-4 font-bold">Total (INR)</th>
                    <th className="p-4 font-bold">Payment</th>
                    <th className="p-4 font-bold">Fulfillment Status</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {bookings.map(b => (
                    <tr key={b.id} className="hover:bg-stone-50/60">
                      <td className="p-4 font-mono font-bold text-[#C25E3E]">{b.id}</td>
                      <td className="p-4">
                        <div className="font-bold text-stone-900">{b.travelerName}</div>
                        <div className="text-[11px] text-stone-500">{b.travelerEmail}</div>
                        <div className="text-[11px] text-stone-400">{b.travelerPhone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-semibold text-stone-900">{b.destinationTitle}</div>
                        <div className="text-[11px] text-stone-500">
                          {b.startDate} to {b.endDate} · {b.adultsCount} Adults
                        </div>
                      </td>
                      <td className="p-4 font-black tabular-nums text-stone-900">
                        {formatCurrency(b.totalAmount)}
                      </td>
                      <td className="p-4">
                        <span className="uppercase text-[11px] font-semibold text-stone-600 block">
                          {b.paymentMethod}
                        </span>
                        <span className="text-[10px] font-mono text-stone-400">
                          {b.paymentTransactionId}
                        </span>
                      </td>
                      <td className="p-4">
                        <select
                          value={b.bookingStatus}
                          onChange={(e) => updateBookingStatus(b.id, e.target.value as any)}
                          className={`text-xs font-bold rounded-lg px-2 py-1 border cursor-pointer ${
                            b.bookingStatus === 'confirmed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : b.bookingStatus === 'completed'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-rose-50 text-rose-800 border-rose-200'
                          }`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => setCompletedBookingTicket(b)}
                          className="px-3 py-1.5 rounded-full border border-stone-200 hover:bg-stone-100 text-[11px] font-semibold text-stone-800"
                        >
                          View Pass
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PLATFORM SETTINGS */}
      {activeAdminTab === 'settings' && (
        <div className="max-w-3xl space-y-6">
          <div>
            <h2 className="text-xl font-bold text-stone-900">
              Platform & Basic Settings
            </h2>
            <p className="text-xs text-stone-500">
              Configure Tamil Nadu tourism rates, taxes, auto-confirmation rules, and contact information.
            </p>
          </div>

          <form onSubmit={handleSaveSettings} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs space-y-6">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Platform Name
                </label>
                <input
                  type="text"
                  value={settingsForm.platformName}
                  onChange={(e) => setSettingsForm({ ...settingsForm, platformName: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Local Currency Symbol
                </label>
                <input
                  type="text"
                  value={settingsForm.currencySymbol}
                  onChange={(e) => setSettingsForm({ ...settingsForm, currencySymbol: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 font-bold"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  GST / Tourism Tax (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="28"
                  value={settingsForm.gstRatePercent}
                  onChange={(e) => setSettingsForm({ ...settingsForm, gstRatePercent: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Convenience / Booking Fee (INR)
                </label>
                <input
                  type="number"
                  min="0"
                  value={settingsForm.convenienceFeeINR}
                  onChange={(e) => setSettingsForm({ ...settingsForm, convenienceFeeINR: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 font-medium"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  24x7 Tourism Support Helpline
                </label>
                <input
                  type="text"
                  value={settingsForm.helplinePhone}
                  onChange={(e) => setSettingsForm({ ...settingsForm, helplinePhone: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Support Email Address
                </label>
                <input
                  type="email"
                  value={settingsForm.supportEmail}
                  onChange={(e) => setSettingsForm({ ...settingsForm, supportEmail: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
                  Announcement Header Banner Message
                </label>
                <input
                  type="text"
                  value={settingsForm.announcementBanner}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcementBanner: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900"
                />
              </div>
            </div>

            {/* Toggles */}
            <div className="space-y-3 pt-3 border-t border-stone-200">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsForm.enableAnnouncement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, enableAnnouncement: e.target.checked })}
                  className="w-4 h-4 accent-stone-900 rounded"
                />
                <span className="text-xs font-semibold text-stone-800">
                  Enable top announcement banner on storefront
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settingsForm.autoConfirmBookings}
                  onChange={(e) => setSettingsForm({ ...settingsForm, autoConfirmBookings: e.target.checked })}
                  className="w-4 h-4 accent-stone-900 rounded"
                />
                <span className="text-xs font-semibold text-stone-800">
                  Instant auto-confirmation for paid bookings
                </span>
              </label>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-between border-t border-stone-200">
              <button
                type="button"
                onClick={resetToDefaults}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-600 hover:text-rose-800"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Factory Demo Data</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-xs font-semibold shadow-xs"
              >
                <Save className="w-4 h-4" />
                <span>Save Platform Settings</span>
              </button>
            </div>

            {settingsSavedToast && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 font-semibold">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Platform settings updated successfully!</span>
              </div>
            )}

          </form>
        </div>
      )}

      {/* Add / Edit Listing Modal */}
      {isEditingListing && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-2xl space-y-5 my-auto max-h-[92vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-lg font-bold text-stone-900">
                {editingDestId ? 'Edit Destination Package' : 'Add New Tamil Nadu Destination'}
              </h3>
              <button
                onClick={() => setIsEditingListing(false)}
                className="p-1 text-stone-500 hover:text-stone-900"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveListing} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Package Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="e.g. Rameshwaram & Dhanushkodi Ocean Walk"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    District
                  </label>
                  <select
                    value={formDistrict}
                    onChange={(e) => setFormDistrict(e.target.value)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 bg-white"
                  >
                    <option value="Madurai">Madurai</option>
                    <option value="The Nilgiris">The Nilgiris</option>
                    <option value="Chengalpattu">Chengalpattu</option>
                    <option value="Dindigul">Dindigul</option>
                    <option value="Kanyakumari">Kanyakumari</option>
                    <option value="Thanjavur & Sivaganga">Thanjavur & Sivaganga</option>
                    <option value="Ramanathapuram">Ramanathapuram</option>
                    <option value="Tirunelveli">Tirunelveli</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 bg-white"
                  >
                    <option value="heritage_temple">Heritage & Temple</option>
                    <option value="hill_station">Hill Station</option>
                    <option value="coastal_beach">Coastal & Beach</option>
                    <option value="cultural_culinary">Cultural & Culinary</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Price per Person (INR ₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    value={formPrice}
                    onChange={(e) => setFormPrice(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-bold"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Region / Circuit
                  </label>
                  <input
                    type="text"
                    required
                    value={formRegion}
                    onChange={(e) => setFormRegion(e.target.value)}
                    placeholder="e.g. Coromandel Coast"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Duration Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formDays}
                    onChange={(e) => setFormDays(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Duration Nights
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formNights}
                    onChange={(e) => setFormNights(Number(e.target.value))}
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    required
                    value={formTagline}
                    onChange={(e) => setFormTagline(e.target.value)}
                    placeholder="e.g. Sacred ghost island & coral ocean breeze"
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Detailed Description
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formDesc}
                    onChange={(e) => setFormDesc(e.target.value)}
                    placeholder="Describe the experience, scenery, culture, and itinerary..."
                    className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

              </div>

              <div className="flex gap-3 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsEditingListing(false)}
                  className="flex-1 py-2.5 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full shadow-xs"
                >
                  Save Destination
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
