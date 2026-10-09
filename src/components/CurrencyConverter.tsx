import React, { useState } from 'react';
import { DollarSign, Globe, Check, ChevronDown } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export interface CurrencyRate {
  code: string;
  symbol: string;
  name: string;
  rateToINR: number; // 1 Foreign unit = X INR
}

export const CURRENCY_RATES: CurrencyRate[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee (Base)', rateToINR: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rateToINR: 86.5 },
  { code: 'EUR', symbol: '€', name: 'Euro', rateToINR: 92.0 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rateToINR: 109.5 },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar', rateToINR: 64.2 },
  { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rateToINR: 23.5 },
];

export const CurrencyConverter: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyRate>(CURRENCY_RATES[0]);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/80 hover:bg-white text-stone-700 border border-stone-200 shadow-xs transition-colors select-none"
      >
        <Globe className="w-3.5 h-3.5 text-stone-500" />
        <span className="font-mono font-bold text-stone-900">{selectedCurrency.code} ({selectedCurrency.symbol})</span>
        <ChevronDown className="w-3 h-3 text-stone-400" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-stone-100 text-[10px] font-mono uppercase tracking-wider text-stone-400 font-bold">
            Select Currency View
          </div>
          {CURRENCY_RATES.map((curr) => {
            const isSelected = selectedCurrency.code === curr.code;
            return (
              <button
                key={curr.code}
                onClick={() => {
                  setSelectedCurrency(curr);
                  setIsOpen(false);
                }}
                className={`w-full px-3 py-2 text-left text-xs flex items-center justify-between hover:bg-stone-50 transition-colors ${
                  isSelected ? 'font-bold text-stone-900 bg-amber-50/50' : 'text-stone-700 font-medium'
                }`}
              >
                <div>
                  <span className="font-mono">{curr.code}</span>
                  <span className="text-[11px] text-stone-400 ml-1.5">({curr.symbol}) - {curr.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C25E3E]" />}
              </button>
            );
          })}
          <div className="px-3 pt-2 pb-1 text-[10px] text-stone-400 border-t border-stone-100 leading-tight">
            Transactions are securely processed in local Indian Rupee (₹ INR).
          </div>
        </div>
      )}
    </div>
  );
};
