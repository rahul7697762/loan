'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ApplyLoanModal from '@/components/ApplyLoanModal';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf9f9] text-slate-900 flex flex-col justify-between selection:bg-[#0066c0] selection:text-white relative overflow-hidden">
      {/* Background Image Layer (Loan illustration in background with subtle overlay) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.12] sm:opacity-[0.15]">
        <Image
          src="/loan_illustration.png"
          alt="Background Illustration"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Ambient Lighting in Logo Colors */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#0066c0]/10 rounded-full blur-[100px] sm:blur-[140px] pointer-events-none z-0" />

      {/* Navbar */}
      <Navbar onApplyClick={() => setIsModalOpen(true)} />

      {/* Mobile-First Centered Hero Container */}
      <main className="flex-grow flex items-center justify-center px-4 py-8 sm:py-16 relative z-10 w-full">
        <div className="w-full max-w-lg bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-3xl p-6 sm:p-12 shadow-2xl text-center space-y-6 sm:space-y-8 relative overflow-hidden">
          {/* Top Royal Blue Accent Line */}
          <div className="absolute top-0 left-0 right-0 h-2 sm:h-2.5 bg-[#0066c0]" />

          {/* Logo Badge Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-2xl bg-blue-50 text-[#0066c0] flex items-center justify-center border border-blue-100 shadow-xs">
            <ShieldCheck className="w-8 h-8 sm:w-9 sm:h-9" />
          </div>

          {/* Heading */}
          <div className="space-y-2 sm:space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Apply For Loan
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 max-w-sm mx-auto">
              Select below to begin your application.
            </p>
          </div>

          {/* Primary Action Button (Logo Color: Royal Blue) */}
          <div className="pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 sm:py-5 px-6 sm:px-8 bg-[#0066c0] hover:bg-[#00529b] text-white font-black text-sm sm:text-base uppercase tracking-wider rounded-full shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
            >
              <span>APPLY FOR LOAN</span>
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="py-4 sm:py-6 text-center text-xs text-slate-400 border-t border-slate-200/80 bg-white/90 relative z-10">
        <p>&copy; {new Date().getFullYear()} FlexiLoan Finance. All rights reserved.</p>
      </footer>

      {/* Apply Loan Modal */}
      <ApplyLoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
