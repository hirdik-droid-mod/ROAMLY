import React from 'react';
import { 
  X, CheckCircle, Printer, Download, Share2, 
  MapPin, Calendar, Users, QrCode, ShieldCheck, ArrowRight 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const BookingTicketModal: React.FC = () => {
  const { 
    completedBookingTicket, 
    setCompletedBookingTicket, 
    formatCurrency, 
    setActiveView 
  } = useTravel();

  if (!completedBookingTicket) return null;

  const b = completedBookingTicket;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 print:p-0 print:bg-white">
      
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col my-auto print:shadow-none print:border-none print:max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Success Banner (Hidden during print) */}
        <div className="bg-emerald-600 text-white px-6 py-4 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2.5">
            <CheckCircle className="w-5 h-5 text-emerald-200" />
            <div>
              <h3 className="text-sm font-bold">Booking Confirmed & Payment Verified!</h3>
              <p className="text-[11px] text-emerald-100">Your official travel pass & tax receipt has been generated.</p>
            </div>
          </div>
          <button
            onClick={() => setCompletedBookingTicket(null)}
            className="p-1 rounded-full hover:bg-emerald-700 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Pass Container */}
        <div className="p-6 sm:p-8 space-y-6 bg-[#FCFBF8]" id="printable-ticket">
          
          {/* Header Ticket Strip */}
          <div className="flex items-center justify-between border-b-2 border-dashed border-stone-300 pb-5">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-stone-900 flex items-center justify-center text-amber-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4 18 6.5-11 5 8.5 2.5-4 4 6.5H4Z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-black tracking-wider uppercase text-stone-900 block leading-tight font-sans">
                  ROAMLY TAMIL NADU
                </span>
                <span className="text-[10px] text-stone-500 font-medium tracking-wide">
                  Official Travel Boarding Pass & Tax Invoice
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                Booking Reference
              </span>
              <span className="text-sm sm:text-base font-black font-mono tracking-wider text-[#C25E3E]">
                {b.id}
              </span>
            </div>
          </div>

          {/* Destination Details & QR Code Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center bg-white p-5 rounded-2xl border border-stone-200">
            
            <div className="sm:col-span-2 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase text-[#C25E3E] tracking-wider block">
                  {b.destinationDistrict} · Tamil Nadu
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight">
                  {b.destinationTitle}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs text-stone-600">
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">
                    Travel Dates
                  </span>
                  <span className="font-semibold text-stone-800">
                    {new Date(b.startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} – {new Date(b.endDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">
                    Travelers
                  </span>
                  <span className="font-semibold text-stone-800">
                    {b.adultsCount} Adult{b.adultsCount > 1 ? 's' : ''}{b.childrenCount > 0 ? `, ${b.childrenCount} Child` : ''}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-stone-400 font-bold uppercase block">
                  Primary Traveler
                </span>
                <span className="text-xs font-semibold text-stone-800">
                  {b.travelerName} ({b.travelerPhone})
                </span>
              </div>
            </div>

            {/* QR Code and Status Seal */}
            <div className="flex flex-col items-center justify-center p-3 bg-stone-50 rounded-xl border border-stone-200">
              <QrCode className="w-24 h-24 text-stone-900" />
              <span className="text-[9px] font-mono text-stone-500 mt-1 uppercase tracking-tight">
                SCAN AT CHECK-IN
              </span>
              <div className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                <ShieldCheck className="w-3 h-3" />
                <span>CONFIRMED</span>
              </div>
            </div>

          </div>

          {/* Payment & Invoice Summary */}
          <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-2 text-xs">
            <div className="flex justify-between items-center pb-2 border-b border-stone-100">
              <span className="text-stone-500">Transaction ID:</span>
              <span className="font-mono font-medium text-stone-800">{b.paymentTransactionId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Payment Gateway:</span>
              <span className="font-semibold text-stone-800 uppercase">{b.paymentMethod} (RBI Authorised)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-stone-500">Base Experience Package:</span>
              <span className="font-medium tabular-nums">{formatCurrency(b.basePrice)}</span>
            </div>
            {b.addons.map((add, idx) => (
              <div key={idx} className="flex justify-between items-center text-stone-500">
                <span>{add.name}:</span>
                <span className="font-medium tabular-nums">+{formatCurrency(add.price)}</span>
              </div>
            ))}
            <div className="flex justify-between items-center text-stone-500">
              <span>GST & Tourism Taxes:</span>
              <span className="font-medium tabular-nums">+{formatCurrency(b.taxesAndGst)}</span>
            </div>
            <div className="flex justify-between items-baseline pt-2 border-t border-stone-200 text-sm font-black text-stone-900">
              <span>Total Paid Amount:</span>
              <span className="text-base text-emerald-700 tabular-nums">{formatCurrency(b.totalAmount)}</span>
            </div>
          </div>

          <div className="text-[10px] text-stone-400 text-center leading-normal">
            For assistance or emergency ground support during your tour, contact the 24x7 Tamil Nadu Tourism Desk at +91 44 2538 4444.
          </div>

        </div>

        {/* Footer Actions (Hidden during print) */}
        <div className="bg-[#FAF8F5] px-6 py-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-stone-300 bg-white hover:bg-stone-100 text-xs font-semibold text-stone-800 transition-colors"
          >
            <Printer className="w-4 h-4 text-stone-600" />
            <span>Print / Save PDF</span>
          </button>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                setCompletedBookingTicket(null);
                setActiveView('my-bookings');
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-all shadow-sm"
            >
              <span>Manage in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
