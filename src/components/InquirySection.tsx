import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { twilightLakeImg } from '../data/initialData';

export const InquirySection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setName('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <section className="relative bg-stone-950 text-white overflow-hidden py-20 lg:py-28" id="inquiry-section">
      {/* Background twilight lake photography */}
      <img
        src={twilightLakeImg}
        alt="Tamil Nadu royal palace twilight reflection"
        className="absolute inset-0 w-full h-full object-cover object-center scale-102"
        referrerPolicy="no-referrer"
      />

      {/* Scrim Gradient */}
      <div className="absolute inset-0 bg-stone-950/75 via-stone-950/60 to-stone-950/80" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-4">
            <span className="text-[11px] font-mono tracking-[0.25em] text-amber-300 uppercase block font-semibold">
              LET’S PLAN YOUR JOURNEY
            </span>
            
            <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
              Ready to Explore <br />
              <span className="text-amber-200">Tamil Nadu?</span>
            </h2>

            <p className="text-stone-300 text-sm sm:text-base font-light max-w-lg leading-relaxed">
              Tell us a little about your travel dates, companion preferences, and wishlists. Our regional travel curators will design a personalized itinerary with transparent local INR pricing.
            </p>

            <div className="pt-4 flex items-center gap-4 text-xs text-amber-200/90 font-mono">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Govt Certified Agency</span>
              </span>
              <span>·</span>
              <span>Guaranteed Response within 2 Hours</span>
            </div>
          </div>

          {/* Right Inquiry Box matching inspiration */}
          <div className="lg:col-span-5 bg-stone-900/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Inquiry Received!</h4>
                <p className="text-xs text-stone-300">
                  Vanakkam! Our travel specialist will call or WhatsApp you on <strong>{phone}</strong> with your personalized Tamil Nadu circuit draft.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs text-amber-300 underline font-medium"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full text-xs px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number (+91)"
                    className="w-full text-xs px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your trip (e.g., Ooty toy train & Madurai heritage in November with family)..."
                    className="w-full text-xs px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <span>Send Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
