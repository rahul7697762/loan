'use client';

import React, { useState } from 'react';
import { X, Phone, Lock, CheckCircle2, Loader2, ArrowRight, ShieldCheck } from 'lucide-react';

interface ApplyLoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ApplyLoanModal({ isOpen, onClose }: ApplyLoanModalProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successData, setSuccessData] = useState<{ redirectUrl: string } | null>(null);
  const [countdown, setCountdown] = useState(3);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const digitsOnly = phoneNumber.replace(/\D/g, '');
    if (digitsOnly.length < 8) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      // Trigger Meta Pixel Lead Conversion Event
      if (typeof window !== 'undefined' && (window as any).fbq) {
        try {
          (window as any).fbq('track', 'Lead');
        } catch (e) {
          console.error('Meta pixel lead event error:', e);
        }
      }

      setSuccessData({ redirectUrl: data.redirectUrl });
      setLoading(false);

      let timerCount = 3;
      const interval = setInterval(() => {
        timerCount -= 1;
        setCountdown(timerCount);
        if (timerCount <= 0) {
          clearInterval(interval);
          window.location.href = data.redirectUrl;
        }
      }, 800);
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Something went wrong. Please try again.');
    }
  };

  const resetAndClose = () => {
    setPhoneNumber('');
    setError('');
    setSuccessData(null);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#0066c0]" />

        {/* Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!successData ? (
          <div>
            {/* Header */}
            <div className="text-center mb-6 pt-2">
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-blue-50 text-[#0066c0] flex items-center justify-center shadow-xs border border-blue-100">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Loan Application</h2>
              <p className="text-xs text-slate-500 mt-1">
                Enter your mobile number to proceed.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Mobile / Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    placeholder="e.g. +1 987 654 3210"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#0066c0] focus:bg-white focus:ring-2 focus:ring-blue-600/20 transition-all font-medium text-base"
                  />
                </div>
                {error && <p className="text-xs text-red-600 mt-1.5 font-semibold">{error}</p>}
              </div>

              <div className="bg-blue-50/50 p-3 rounded-xl border border-blue-100 flex items-start gap-2 text-[11px] text-slate-600">
                <Lock className="w-4 h-4 text-[#0066c0] shrink-0 mt-0.5" />
                <span>
                  Your information is encrypted and transmitted securely.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-6 bg-[#0066c0] hover:bg-[#00529b] text-white font-black text-sm uppercase tracking-wider rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Continue</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          /* Success Screen & Redirection Indicator */
          <div className="text-center py-4 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-50 text-[#0066c0] flex items-center justify-center border border-blue-200 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900">Application Received</h3>
            <p className="text-sm text-slate-600">
              Your number <span className="font-bold text-[#0066c0]">{phoneNumber}</span> has been recorded.
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <p>Redirecting you to the next step in...</p>
              <div className="text-3xl font-black text-[#0066c0]">{countdown}s</div>
            </div>

            <a
              href={successData.redirectUrl}
              className="inline-flex items-center gap-2 text-xs font-bold text-[#0066c0] hover:underline pt-2"
            >
              <span>Click here if not redirected automatically</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
