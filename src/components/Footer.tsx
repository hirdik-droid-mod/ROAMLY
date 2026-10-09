import React from 'react';
import { Compass, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const Footer: React.FC = () => {
  const { adminSettings, setActiveView } = useTravel();

  return (
    <footer className="relative bg-stone-900 text-stone-300 pt-16 pb-12 mt-20 border-t border-stone-800">
      
      {/* Editorial Decorative Brand Banner matching inspiration image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-stone-800/80 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        
        {/* Left: Vintage Belong Circular Stamp & Brand */}
        <div className="flex items-center gap-5">
          {/* Circular Stamp */}
          <div className="w-16 h-16 rounded-full border border-stone-700 p-1 flex items-center justify-center text-amber-200/90 relative select-none">
            <div className="w-full h-full rounded-full border border-stone-600/70 flex flex-col items-center justify-center p-1 text-[8px] tracking-tighter uppercase font-mono">
              <span>EXPLORE</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 my-0.5 text-amber-300">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4 18 6.5-11 5 8.5 2.5-4 4 6.5H4Z" />
              </svg>
              <span>BELONG</span>
            </div>
          </div>

          <div>
            <div className="text-xl font-black tracking-widest text-white uppercase font-sans">
              ROAMLY
            </div>
            <p className="text-xs text-stone-400 tracking-wide font-light">
              Go Somewhere New · Tamil Nadu
            </p>
          </div>
        </div>

        {/* Right: Signature Editorial Script ("Good Places, Brighter Days") */}
        <div className="text-center md:text-right">
          <div className="font-serif italic text-2xl sm:text-3xl text-amber-100/90 tracking-wide">
            Good Places, Brighter Days
          </div>
          <p className="text-xs text-stone-400 mt-1 font-mono tracking-wider uppercase">
            Curated Expeditions across Southern India
          </p>
        </div>

      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-xs">
        
        {/* Col 1 */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
            Tamil Nadu Circuits
          </h4>
          <ul className="space-y-2 text-stone-400">
            <li><span className="hover:text-white transition-colors cursor-pointer">Nilgiri Western Ghats (Ooty & Coonoor)</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Temple Heartland (Madurai & Thanjavur)</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Coromandel Coast (Mahabalipuram)</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Palani Cloud Forests (Kodaikanal)</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Lands End Confluence (Kanyakumari)</span></li>
          </ul>
        </div>

        {/* Col 2 */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
            Traveler Standards
          </h4>
          <ul className="space-y-2 text-stone-400">
            <li><span className="hover:text-white transition-colors cursor-pointer">Licensed Historian Guides</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Heritage Boutique Lodges</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Ethical Wildlife Safeguards</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Fair Cancellation Policy</span></li>
            <li><span className="hover:text-white transition-colors cursor-pointer">Instant Digital Boarding Passes</span></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
            Secure Payments
          </h4>
          <ul className="space-y-2 text-stone-400">
            <li><span>All Prices Displayed in INR (₹)</span></li>
            <li><span>UPI (GPay · PhonePe · Paytm · BHIM)</span></li>
            <li><span>RuPay · Visa · Mastercard 3D Secure</span></li>
            <li><span>RBI Compliant Encrypted Gateway</span></li>
            <li><span>Official Tax GST Invoicing</span></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div className="space-y-3">
          <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
            24x7 Ground Support
          </h4>
          <div className="space-y-2 text-stone-400">
            <p className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{adminSettings.helplinePhone}</span>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span>{adminSettings.supportEmail}</span>
            </p>
            <div className="pt-2">
              <button
                onClick={() => setActiveView('admin-dashboard')}
                className="text-stone-300 hover:text-white underline underline-offset-4"
              >
                Access Admin Portal
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-stone-800 text-[11px] text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          © 2026 {adminSettings.platformName}. Curated in partnership with Tamil Nadu Tourism. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <span className="hover:text-stone-300 cursor-pointer">Privacy Policy</span>
          <span className="hover:text-stone-300 cursor-pointer">Terms of Service</span>
          <span className="hover:text-stone-300 cursor-pointer">Security Certifications</span>
        </div>
      </div>

    </footer>
  );
};
