import React from 'react';
import { X, ShieldAlert, CheckCircle2, Info, Landmark, HelpCircle } from 'lucide-react';
import { TEMPLE_ETIQUETTE_RULES } from '../data/culturalGuideData';

interface TempleEtiquetteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TempleEtiquetteModal: React.FC<TempleEtiquetteModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAF8F5] px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Landmark className="w-5 h-5 text-[#C25E3E]" />
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Tamil Nadu Temple Protocol & Etiquette
              </h3>
              <p className="text-[11px] text-stone-500">Essential customs for sacred living Dravidian sanctums</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-[#C25E3E] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Tamil Nadu temples are active places of worship governed by the Hindu Religious and Charitable Endowments (HR&CE) department. Our tour scholar escorts ensure smooth, dignified darshans for all guests.
            </p>
          </div>

          <div className="space-y-3">
            {TEMPLE_ETIQUETTE_RULES.map((rule, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/90 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{rule.rule}</span>
                  </h4>
                  <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    rule.status === 'Mandatory'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-stone-200 text-stone-700'
                  }`}>
                    {rule.status}
                  </span>
                </div>
                <p className="text-xs text-stone-600 font-light leading-relaxed pl-6">
                  {rule.description}
                </p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 space-y-1">
            <strong>Roamly Inclusions Note:</strong>
            <p className="text-[11px] leading-relaxed">
              All our heritage temple tours provide verified fast-track VIP darshan passes and complimentary silk angavastram shawls to ensure you conform gracefully to every temple standard.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#FAF8F5] px-6 py-3 border-t border-stone-200 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full"
          >
            I Understand
          </button>
        </div>

      </div>

    </div>
  );
};
