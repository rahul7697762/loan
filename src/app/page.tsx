'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ApplyLoanModal from '@/components/ApplyLoanModal';
import { ArrowRight, Zap, Smartphone, Wallet, Clock, FileCheck, Building, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bank partner list
  const bankPartners = [
    { name: 'HDFC Bank', color: 'bg-blue-900 text-white' },
    { name: 'ICICI Bank', color: 'bg-orange-600 text-white' },
    { name: 'Axis Bank', color: 'bg-rose-800 text-white' },
    { name: 'SBI Bank', color: 'bg-sky-600 text-white' },
    { name: 'Kotak Bank', color: 'bg-red-700 text-white' },
    { name: 'IndusInd', color: 'bg-purple-800 text-white' },
  ];

  return (
    <div className="min-h-screen bg-[#0042b3] text-white flex flex-col justify-between selection:bg-yellow-400 selection:text-blue-950 font-sans">
      {/* Top Navbar */}
      <Navbar onApplyClick={() => setIsModalOpen(true)} />

      {/* Main Banner Hero Section (Compact Above-The-Fold Layout) */}
      <main className="flex-grow flex flex-col items-center justify-center p-2 sm:p-4 py-2 sm:py-6 relative z-10 w-full">
        
        {/* HERO BANNER CARD */}
        <div className="w-full max-w-xl bg-gradient-to-b from-[#0056d6] via-[#0047ba] to-[#003699] rounded-3xl shadow-2xl overflow-hidden border border-blue-400/30 relative">
          
          {/* Top Banner Titles */}
          <div className="pt-4 sm:pt-6 pb-2 px-4 text-center space-y-1.5 sm:space-y-2 relative z-10">
            <span className="text-xs sm:text-base font-bold text-blue-100 tracking-wide block">
              Get funds with our
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-none drop-shadow-md">
              Instant Personal Loan
            </h1>
            
            {/* White Badge Box */}
            <div className="pt-1 inline-block">
              <div className="bg-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-1.5 sm:py-2 shadow-lg border border-blue-100">
                <span className="text-xl sm:text-3xl font-black text-[#0047ba] tracking-tight">
                  Upto ₹50 Lakhs
                </span>
              </div>
            </div>
          </div>

          {/* Central Image & Graphic Section */}
          <div className="relative w-full h-44 sm:h-64 my-1 flex items-center justify-center">
            
            {/* Background Neon Glowing Rings Effect */}
            <div className="absolute w-40 sm:w-64 h-40 sm:h-64 rounded-full border-4 border-cyan-400/40 shadow-[0_0_40px_rgba(34,211,238,0.4)] animate-pulse pointer-events-none" />

            {/* Floating Circular Badge Icons */}
            <div className="absolute top-1 left-4 sm:left-10 bg-white text-[#0047ba] p-2 sm:p-3 rounded-xl shadow-lg border border-blue-100 z-20">
              <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="absolute bottom-6 left-2 sm:left-8 bg-white text-[#0047ba] p-2 sm:p-3 rounded-xl shadow-lg border border-blue-100 z-20">
              <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="absolute top-1 right-4 sm:right-10 bg-white text-[#0047ba] p-2 sm:p-3 rounded-xl shadow-lg border border-blue-100 z-20">
              <FileCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            <div className="absolute bottom-6 right-2 sm:right-8 bg-white text-[#0047ba] p-2 sm:p-3 rounded-xl shadow-lg border border-blue-100 z-20">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-full max-w-[220px] sm:max-w-xs mx-auto z-10">
              <Image
                src="/hero_banner.png"
                alt="Instant Personal Loan Approval"
                fill
                className="object-contain drop-shadow-xl"
                priority
              />
            </div>
          </div>

          {/* White Feature Bar */}
          <div className="bg-white py-3 sm:py-4 px-4 border-t border-b border-blue-100 relative z-20">
            <div className="max-w-md mx-auto grid grid-cols-2 divide-x divide-slate-200">
              
              {/* Feature 1 */}
              <div className="flex items-center justify-center gap-2.5 pr-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 shadow-xs">
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 fill-[#0047ba]" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs sm:text-sm font-black text-slate-900 block">
                    Quick Disbursal
                  </span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center justify-center gap-2.5 pl-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 text-[#0047ba] flex items-center justify-center shrink-0 shadow-xs">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="text-left leading-tight">
                  <span className="text-xs sm:text-sm font-black text-slate-900 block">
                    100% Digital
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Yellow CTA Button Area */}
          <div className="bg-gradient-to-b from-[#003db3] to-[#002f8a] p-4 sm:p-6 text-center relative z-20 flex flex-col items-center justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full max-w-sm py-3.5 sm:py-4 px-6 sm:px-8 bg-[#ffcc00] hover:bg-[#e6b800] text-[#002b80] font-black text-base sm:text-lg uppercase tracking-wider rounded-full shadow-2xl hover:scale-105 active:scale-98 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer border-2 border-yellow-200"
            >
              <span>APPLY NOW</span>
              <ArrowRight className="w-5 h-5 text-[#002b80]" />
            </button>

            <span className="text-[10px] text-blue-200/80 mt-2 block self-start">
              T&C Apply*
            </span>
          </div>

        </div>

        {/* BANKING PARTNERS SECTION */}
        <section className="w-full max-w-xl mt-6 bg-white/95 text-slate-900 rounded-3xl p-5 sm:p-6 shadow-xl border border-blue-200/60">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Building className="w-5 h-5 text-[#0047ba]" />
              <h2 className="text-sm sm:text-base font-black text-slate-900 uppercase tracking-wider">
                Partnered With Leading Banks
              </h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Verified Partners
            </span>
          </div>

          {/* Bank Logos Badges Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            {bankPartners.map((bank, idx) => (
              <div
                key={idx}
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-50 hover:bg-blue-50/70 border border-slate-200 rounded-2xl p-3 text-center space-y-1 cursor-pointer transition-all duration-200 group"
              >
                <div className={`w-8 h-8 mx-auto rounded-xl ${bank.color} font-black text-xs flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                  {bank.name.substring(0, 2)}
                </div>
                <span className="text-[11px] font-bold text-slate-800 block truncate">
                  {bank.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Low Rates
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Fast Approval
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Zero Hidden Charges
            </span>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-blue-200/90 bg-[#003699]">
        <p>&copy; {new Date().getFullYear()} Bajaj Referral Partner. All rights reserved.</p>
      </footer>

      {/* Apply Loan Modal */}
      <ApplyLoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
