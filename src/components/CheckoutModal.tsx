import React, { useState } from 'react';
import { 
  X, ShieldCheck, Lock, CreditCard, Smartphone, Building, 
  CheckCircle, ArrowLeft, Loader2, AlertCircle, QrCode, Copy, Check 
} from 'lucide-react';
import { useTravel } from '../context/TravelContext';

export const CheckoutModal: React.FC = () => {
  const { 
    bookingTargetDestination, 
    setBookingTargetDestination, 
    createBooking, 
    formatCurrency, 
    adminSettings 
  } = useTravel();

  if (!bookingTargetDestination) return null;

  const dest = bookingTargetDestination;

  // Passenger & Contact details
  const [name, setName] = useState('Karthik Subramanian');
  const [email, setEmail] = useState('karthik.sub@gmail.com');
  const [phone, setPhone] = useState('+91 98401 23456');
  const [notes, setNotes] = useState('');

  // Selected date & guests (from modal or defaults)
  const [startDate, setStartDate] = useState(dest.availableDates[0] || '2026-10-25');
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);

  // Payment Method: 'upi' | 'card' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');

  // UPI Fields
  const [upiId, setUpiId] = useState('');
  const [upiCopied, setUpiCopied] = useState(false);

  // Card Fields
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('742');
  const [cardName, setCardName] = useState('KARTHIK SUBRAMANIAN');

  // Netbanking Field
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Processing & OTP state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStage, setProcessingStage] = useState('');
  const [showOtpScreen, setShowOtpScreen] = useState(false);
  const [otpValue, setOtpValue] = useState('849201');
  const [errorMessage, setErrorMessage] = useState('');

  // Price calculations
  const basePrice = (dest.pricePerPerson * adults) + (dest.pricePerPerson * 0.6 * childrenCount);
  const addonsTotal = 1500; // Curated inclusion default
  const subtotal = basePrice + addonsTotal;
  const taxesAndGst = Math.round((subtotal * adminSettings.gstRatePercent) / 100);
  const totalAmount = subtotal + taxesAndGst + adminSettings.convenienceFeeINR;

  const calculateEndDate = (start: string, days: number) => {
    const d = new Date(start);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  };

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText('roamly.tamilnadu@okhdfcbank');
    setUpiCopied(true);
    setTimeout(() => setUpiCopied(false), 2000);
  };

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMessage('Please fill in your primary traveler contact information.');
      return;
    }

    if (paymentMethod === 'card') {
      // RBI 2-factor OTP simulation
      setShowOtpScreen(true);
      return;
    }

    // Direct UPI / Netbanking execution
    executeFinalPayment();
  };

  const executeFinalPayment = () => {
    setIsProcessing(true);
    setProcessingStage('Connecting to RBI Authorised Payment Gateway...');

    setTimeout(() => {
      setProcessingStage('Verifying secure transaction token & bank authorization...');
      
      setTimeout(() => {
        setProcessingStage('Generating authenticated Tamil Nadu Travel Pass...');
        
        setTimeout(() => {
          setIsProcessing(false);
          setShowOtpScreen(false);

          // Dispatch booking creation
          createBooking({
            destinationId: dest.id,
            destinationTitle: dest.title,
            destinationDistrict: dest.district,
            destinationImage: dest.imageUrl,
            travelerName: name,
            travelerEmail: email,
            travelerPhone: phone,
            startDate,
            endDate: calculateEndDate(startDate, dest.durationDays),
            adultsCount: adults,
            childrenCount,
            basePrice,
            addons: [
              { name: 'Heritage Scholar Escort & Entry Permits', price: 1500 }
            ],
            taxesAndGst,
            discount: 0,
            totalAmount,
            paymentMethod,
            notes,
          });

          // Close this checkout modal (BookingTicketModal will appear via context)
          setBookingTargetDestination(null);
        }, 800);
      }, 900);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      <div 
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-stone-200 flex flex-col my-auto max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#FAF8F5] px-6 py-4 border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-base font-bold text-stone-900">
              Secure Checkout & Payment Gateway
            </h3>
          </div>
          <button
            onClick={() => setBookingTargetDestination(null)}
            className="p-1.5 rounded-full hover:bg-stone-200 text-stone-500 hover:text-stone-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 sm:p-8">
          
          {/* OTP Verification Overlay if Card chosen */}
          {showOtpScreen ? (
            <div className="max-w-md mx-auto py-6 space-y-6 text-center animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 bg-amber-50 text-amber-700 rounded-full flex items-center justify-center mx-auto border border-amber-200">
                <Lock className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-stone-900">
                  Bank 3D-Secure 2FA Verification
                </h4>
                <p className="text-xs text-stone-600 mt-1.5">
                  A one-time passcode has been generated for your card payment of <strong className="text-stone-900">{formatCurrency(totalAmount)}</strong>.
                </p>
              </div>

              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 text-left text-xs space-y-1">
                <div className="flex justify-between text-stone-500">
                  <span>Merchant:</span>
                  <span className="font-semibold text-stone-800">ROAMLY TAMIL NADU</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Card ending:</span>
                  <span className="font-semibold text-stone-800">•••• 8821</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Enter 6-Digit OTP
                </label>
                <input
                  type="text"
                  maxLength={6}
                  value={otpValue}
                  onChange={(e) => setOtpValue(e.target.value)}
                  className="w-48 mx-auto text-center text-2xl font-black tracking-widest px-3 py-2 border-2 border-stone-900 rounded-xl focus:outline-none"
                />
                <span className="text-[11px] text-stone-400 block">
                  Demo auto-filled: 849201
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowOtpScreen(false)}
                  className="flex-1 py-2.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={executeFinalPayment}
                  disabled={isProcessing || otpValue.length < 4}
                  className="flex-1 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-full shadow-md flex items-center justify-center gap-2"
                >
                  {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <span>Confirm & Authorize</span>}
                </button>
              </div>
            </div>
          ) : isProcessing ? (
            /* Gateway Processing Loader */
            <div className="py-16 text-center space-y-4 animate-in fade-in">
              <Loader2 className="w-12 h-12 text-[#C25E3E] animate-spin mx-auto" />
              <h4 className="text-lg font-bold text-stone-900">
                Processing Secure Payment
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto font-medium">
                {processingStage}
              </p>
              <div className="text-[11px] text-stone-400 pt-2 flex items-center justify-center gap-1">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>256-bit TLS Encrypted · Do not refresh this window</span>
              </div>
            </div>
          ) : (
            /* Normal Checkout Form */
            <form onSubmit={handleStartPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left 7 Cols: Contact Info & Payment Method */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* 1. Primary Traveler Info */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center gap-1.5">
                    <span>1. Primary Traveler Contact</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">
                        Full Name (as per Govt ID / Aadhaar)
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900"
                        placeholder="e.g. Karthik Subramanian"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">
                        Email Address (for ticket receipt)
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900"
                        placeholder="you@domain.com"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-stone-600 block mb-1">
                        Phone Number (with WhatsApp updates)
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900"
                        placeholder="+91 98401 23456"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Payment Method Selector */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 mb-3 flex items-center justify-between">
                    <span>2. Select Payment Mode</span>
                    <span className="text-[10px] font-normal text-emerald-600 flex items-center gap-1">
                      <Lock className="w-3 h-3" /> Encrypted & Verified
                    </span>
                  </h4>

                  {/* Payment Tabs */}
                  <div className="grid grid-cols-3 gap-2 p-1 bg-stone-100 rounded-2xl mb-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'upi' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Smartphone className="w-3.5 h-3.5 text-[#C25E3E]" />
                      <span>UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'card' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-blue-600" />
                      <span>Cards</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('netbanking')}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        paymentMethod === 'netbanking' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      <Building className="w-3.5 h-3.5 text-emerald-600" />
                      <span>NetBanking</span>
                    </button>
                  </div>

                  {/* Payment Details Container */}
                  <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                    
                    {/* Method 1: UPI */}
                    {paymentMethod === 'upi' && (
                      <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-3.5 rounded-xl border border-stone-200">
                          {/* QR Code Graphic */}
                          <div className="w-24 h-24 bg-stone-900 rounded-xl p-2 flex flex-col items-center justify-center text-white shrink-0 shadow-xs">
                            <QrCode className="w-16 h-16 text-white" />
                          </div>

                          <div className="flex-1 text-center sm:text-left space-y-1">
                            <div className="text-xs font-bold text-stone-900">
                              Scan with any UPI App
                            </div>
                            <p className="text-[11px] text-stone-500">
                              GPay, PhonePe, Paytm, BHIM, CRED or your mobile banking app.
                            </p>
                            <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                              <code className="text-[11px] font-mono bg-stone-100 px-2 py-0.5 rounded border border-stone-200 text-stone-800">
                                roamly.tamilnadu@okhdfcbank
                              </code>
                              <button
                                type="button"
                                onClick={handleCopyUpi}
                                className="p-1 hover:bg-stone-100 rounded text-stone-600"
                                title="Copy UPI VPA"
                              >
                                {upiCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Or Enter Your UPI ID (VPA)
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={upiId}
                              onChange={(e) => setUpiId(e.target.value)}
                              placeholder="e.g. yourname@oksbi"
                              className="flex-1 text-xs px-3 py-2 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                            />
                            <button
                              type="button"
                              onClick={() => setUpiId('karthik.sub@okaxis')}
                              className="px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-200 hover:bg-stone-300 rounded-xl whitespace-nowrap"
                            >
                              Auto-fill Demo
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Method 2: Credit / Debit Card */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                            placeholder="4532 0000 0000 8821"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[11px] font-bold text-stone-600 block mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                              placeholder="12/28"
                            />
                          </div>
                          <div>
                            <label className="text-[11px] font-bold text-stone-600 block mb-1">
                              CVV / CVC
                            </label>
                            <input
                              type="password"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                              placeholder="•••"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[11px] font-bold text-stone-600 block mb-1">
                            Cardholder Name
                          </label>
                          <input
                            type="text"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="w-full text-xs uppercase px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                            placeholder="NAME AS PRINTED"
                          />
                        </div>
                      </div>
                    )}

                    {/* Method 3: Net Banking */}
                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-3">
                        <label className="text-[11px] font-bold text-stone-600 block mb-1">
                          Select Banking Institution
                        </label>
                        <select
                          value={selectedBank}
                          onChange={(e) => setSelectedBank(e.target.value)}
                          className="w-full text-xs px-3.5 py-2.5 rounded-xl border border-stone-300 focus:outline-none focus:border-stone-900 bg-white"
                        >
                          <option value="State Bank of India">State Bank of India (SBI)</option>
                          <option value="HDFC Bank">HDFC Bank</option>
                          <option value="ICICI Bank">ICICI Bank</option>
                          <option value="Axis Bank">Axis Bank</option>
                          <option value="Canara Bank">Canara Bank</option>
                          <option value="Indian Bank">Indian Bank</option>
                          <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                        </select>
                        <p className="text-[11px] text-stone-500">
                          You will be directed to your bank's authenticated gateway portal to authorize the transaction.
                        </p>
                      </div>
                    )}

                  </div>
                </div>

                {errorMessage && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

              </div>

              {/* Right 5 Cols: Order Summary & Authorize CTA */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Destination mini card */}
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 space-y-3">
                  <div className="flex gap-3">
                    <img
                      src={dest.imageUrl}
                      alt={dest.title}
                      className="w-20 h-20 rounded-xl object-cover shrink-0"
                    />
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-[#C25E3E] uppercase tracking-wider block">
                        {dest.district}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 leading-tight">
                        {dest.title}
                      </h4>
                      <p className="text-[11px] text-stone-500">
                        {dest.durationDays} Days / {dest.durationNights} Nights
                      </p>
                    </div>
                  </div>

                  <div className="text-xs text-stone-600 border-t border-stone-200/80 pt-2 space-y-1">
                    <div className="flex justify-between">
                      <span>Departure:</span>
                      <span className="font-semibold text-stone-800">
                        {new Date(startDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Travelers:</span>
                      <span className="font-semibold text-stone-800">
                        {adults} Adult{adults > 1 ? 's' : ''}{childrenCount > 0 ? `, ${childrenCount} Child` : ''}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Final Bill Breakdown */}
                <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2 text-xs">
                  <div className="flex justify-between text-stone-600">
                    <span>Base package</span>
                    <span className="font-semibold tabular-nums">{formatCurrency(basePrice)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Heritage Scholar Pass</span>
                    <span className="font-semibold tabular-nums">+{formatCurrency(addonsTotal)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>GST ({adminSettings.gstRatePercent}%)</span>
                    <span className="font-semibold tabular-nums">+{formatCurrency(taxesAndGst)}</span>
                  </div>
                  <div className="flex justify-between text-stone-600">
                    <span>Booking & platform fee</span>
                    <span className="font-semibold tabular-nums">+{formatCurrency(adminSettings.convenienceFeeINR)}</span>
                  </div>

                  <div className="border-t border-stone-300 pt-2 flex justify-between items-baseline text-base font-extrabold text-stone-900">
                    <span>Total Amount (INR)</span>
                    <span className="text-lg text-[#C25E3E] tabular-nums">{formatCurrency(totalAmount)}</span>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-4 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
                >
                  <Lock className="w-4 h-4 text-emerald-400" />
                  <span>Pay {formatCurrency(totalAmount)} Now</span>
                </button>

                <div className="text-[10px] text-center text-stone-500 leading-tight">
                  By clicking Pay, you agree to Roamly's flexible cancellation policy & Tamil Nadu tourism terms.
                </div>

              </div>

            </form>
          )}

        </div>

      </div>

    </div>
  );
};
