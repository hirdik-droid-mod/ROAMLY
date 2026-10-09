import React, { useState } from 'react';
import { 
  Calendar, MapPin, Users, Ticket, RefreshCw, XCircle, 
  CheckCircle, Clock, AlertTriangle, ArrowRight, Star, Printer 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';
import { Booking } from '../types';

export const MyBookingsView: React.FC = () => {
  const { 
    bookings, 
    cancelBooking, 
    rescheduleBooking, 
    setCompletedBookingTicket, 
    formatCurrency, 
    setActiveView 
  } = useTravel();

  const [activeTab, setActiveTab] = useState<'all' | 'confirmed' | 'completed' | 'cancelled'>('all');
  
  // Reschedule Modal State
  const [reschedulingBooking, setReschedulingBooking] = useState<Booking | null>(null);
  const [newStartDate, setNewStartDate] = useState('');

  // Cancel Modal State
  const [cancellingBooking, setCancellingBooking] = useState<Booking | null>(null);

  // Review Modal State
  const [reviewingBooking, setReviewingBooking] = useState<Booking | null>(null);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  const filteredBookings = bookings.filter(b => {
    if (activeTab === 'all') return true;
    return b.bookingStatus === activeTab;
  });

  const handleConfirmReschedule = () => {
    if (!reschedulingBooking || !newStartDate) return;
    const daysDiff = (new Date(reschedulingBooking.endDate).getTime() - new Date(reschedulingBooking.startDate).getTime()) / (1000 * 3600 * 24);
    const newEnd = new Date(newStartDate);
    newEnd.setDate(newEnd.getDate() + daysDiff);
    const newEndStr = newEnd.toISOString().split('T')[0];

    rescheduleBooking(reschedulingBooking.id, newStartDate, newEndStr);
    setReschedulingBooking(null);
  };

  const handleConfirmCancel = () => {
    if (!cancellingBooking) return;
    cancelBooking(cancellingBooking.id);
    setCancellingBooking(null);
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setReviewingBooking(null);
      setReviewComment('');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 animate-in fade-in duration-200">
      
      {/* Title & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            My Bookings & Expeditions
          </h1>
          <p className="text-sm text-stone-600 mt-1">
            Manage your itineraries, reschedule dates, view official boarding passes, and download tax receipts.
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-full shrink-0">
          {[
            { label: 'All Trips', value: 'all' },
            { label: 'Upcoming', value: 'confirmed' },
            { label: 'Completed', value: 'completed' },
            { label: 'Cancelled', value: 'cancelled' },
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value as any)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === tab.value
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 space-y-4 max-w-lg mx-auto">
          <div className="w-14 h-14 bg-stone-100 text-stone-400 rounded-full flex items-center justify-center mx-auto">
            <Ticket className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-stone-900">
            No bookings found
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            You don't have any bookings matching this category. Discover ancient temples, misty hills, and coastal escapes in Tamil Nadu.
          </p>
          <button
            onClick={() => setActiveView('home')}
            className="px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all"
          >
            Explore Destinations
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-stone-200 shadow-xs hover:shadow-md transition-shadow flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left: Destination thumbnail & details */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 flex-1">
                <img
                  src={b.destinationImage}
                  alt={b.destinationTitle}
                  className="w-full sm:w-28 h-28 rounded-2xl object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C25E3E]">
                      {b.destinationDistrict} · Ref #{b.id}
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      b.bookingStatus === 'confirmed'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : b.bookingStatus === 'completed'
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'bg-stone-100 text-stone-600 border border-stone-200'
                    }`}>
                      {b.bookingStatus}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 leading-snug">
                    {b.destinationTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs text-stone-600 pt-0.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>{new Date(b.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – {new Date(b.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-stone-400" />
                      <span>{b.adultsCount} Adults{b.childrenCount > 0 ? `, ${b.childrenCount} Child` : ''}</span>
                    </span>
                    <span aria-hidden="true" className="text-stone-300">·</span>
                    <span className="font-bold text-stone-900 tabular-nums">
                      {formatCurrency(b.totalAmount)}
                    </span>
                  </div>

                  <p className="text-[11px] text-stone-500">
                    Lead traveler: {b.travelerName} ({b.travelerEmail})
                  </p>
                </div>
              </div>

              {/* Right: Action Buttons */}
              <div className="flex flex-wrap items-center gap-2.5 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100 shrink-0">
                
                {/* 1. View Pass / Receipt */}
                <button
                  onClick={() => setCompletedBookingTicket(b)}
                  className="px-4 py-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 text-xs font-semibold text-stone-800 transition-colors flex items-center gap-1.5"
                >
                  <Ticket className="w-3.5 h-3.5 text-[#C25E3E]" />
                  <span>View Boarding Pass</span>
                </button>

                {/* 2. Reschedule if Confirmed */}
                {b.bookingStatus === 'confirmed' && (
                  <button
                    onClick={() => {
                      setReschedulingBooking(b);
                      setNewStartDate(b.startDate);
                    }}
                    className="px-4 py-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-xs font-semibold text-stone-700 transition-colors flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-stone-500" />
                    <span>Reschedule</span>
                  </button>
                )}

                {/* 3. Cancel if Confirmed */}
                {b.bookingStatus === 'confirmed' && (
                  <button
                    onClick={() => setCancellingBooking(b)}
                    className="px-4 py-2 rounded-full border border-rose-200 bg-rose-50/50 hover:bg-rose-100/60 text-xs font-semibold text-rose-700 transition-colors flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Cancel</span>
                  </button>
                )}

                {/* 4. Review if Completed */}
                {b.bookingStatus === 'completed' && (
                  <button
                    onClick={() => setReviewingBooking(b)}
                    className="px-4 py-2 rounded-full border border-amber-200 bg-amber-50 hover:bg-amber-100 text-xs font-semibold text-amber-800 transition-colors flex items-center gap-1.5"
                  >
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span>Write Review</span>
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reschedule Modal */}
      {reschedulingBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 border border-stone-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-stone-900">
              Reschedule Tour Dates
            </h3>
            <p className="text-xs text-stone-600">
              Select your new departure date for <strong>{reschedulingBooking.destinationTitle}</strong>. Rescheduling is complimentary under Roamly's fair travel policy.
            </p>
            <div>
              <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                New Departure Date
              </label>
              <input
                type="date"
                value={newStartDate}
                onChange={(e) => setNewStartDate(e.target.value)}
                className="w-full text-xs p-2.5 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900 font-semibold text-stone-800"
              />
            </div>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setReschedulingBooking(null)}
                className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-full"
              >
                Keep Current Date
              </button>
              <button
                onClick={handleConfirmReschedule}
                className="flex-1 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full shadow-xs"
              >
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {cancellingBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 border border-stone-200 shadow-2xl space-y-4">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-center text-stone-900">
              Cancel Trip Reservation?
            </h3>
            <p className="text-xs text-stone-600 text-center">
              Are you sure you want to cancel booking <strong>{cancellingBooking.id}</strong>? A full refund of <strong className="text-stone-900">{formatCurrency(cancellingBooking.totalAmount)}</strong> will be credited to your original payment method within 2-4 business days.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCancellingBooking(null)}
                className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-full"
              >
                Keep Reservation
              </button>
              <button
                onClick={handleConfirmCancel}
                className="flex-1 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-full shadow-xs"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewingBooking && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 border border-stone-200 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-stone-900">
              Share Your Experience
            </h3>
            <p className="text-xs text-stone-600">
              How was your journey to <strong>{reviewingBooking.destinationTitle}</strong>?
            </p>
            
            {reviewSuccess ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center text-emerald-800 text-xs font-semibold">
                Thank you! Your verified traveler review has been published.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1.5">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setReviewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-6 h-6 ${star <= reviewRating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-500 block mb-1">
                    Your Review Notes
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    placeholder="Share what you enjoyed most about the guide, stay, or heritage..."
                    className="w-full text-xs p-3 border border-stone-300 rounded-xl focus:outline-none focus:border-stone-900"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setReviewingBooking(null)}
                    className="flex-1 py-2 text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-stone-200 rounded-full"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
