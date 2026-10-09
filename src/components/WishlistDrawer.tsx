import React from 'react';
import { X, Heart, Trash2, ArrowRight, Star, Compass } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, toggleWishlist, destinations, setSelectedDestination, formatCurrency } = useTravel();

  if (!isOpen) return null;

  const wishlistedDests = destinations.filter(d => wishlist.includes(d.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between border-l border-stone-200 animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-stone-200 flex items-center justify-between bg-[#FAF8F5]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h3 className="text-base font-bold text-stone-900">
              Saved Wishlist ({wishlist.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="p-5 flex-1 overflow-y-auto space-y-4">
          {wishlistedDests.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 bg-rose-50 text-rose-400 rounded-full flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-stone-800">Your wishlist is empty</h4>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Click the heart icon on any Tamil Nadu destination card to save it for quick access later.
              </p>
            </div>
          ) : (
            wishlistedDests.map((dest) => (
              <div
                key={dest.id}
                className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200/90 flex gap-3.5 items-center justify-between hover:bg-stone-100/60 transition-colors"
              >
                <img
                  src={dest.imageUrl}
                  alt={dest.title}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-[#C25E3E] tracking-wider block truncate">
                    {dest.district}
                  </span>
                  <h4 className="text-xs font-bold text-stone-900 truncate">
                    {dest.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold text-stone-900 tabular-nums">
                      {formatCurrency(dest.pricePerPerson)}
                    </span>
                    <span className="text-stone-400">·</span>
                    <span className="text-[11px] text-stone-500">
                      {dest.durationDays}D / {dest.durationNights}N
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setSelectedDestination(dest);
                      onClose();
                    }}
                    className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-[11px] font-semibold flex items-center gap-1 shadow-2xs"
                    title="View & Book"
                  >
                    <span>Book</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => toggleWishlist(dest.id)}
                    className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 flex items-center justify-center"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-stone-200 bg-[#FAF8F5] text-center">
          <p className="text-[11px] text-stone-500">
            Bookings include instant UPI / Card payment and official travel pass generation.
          </p>
        </div>

      </div>

    </div>
  );
};
