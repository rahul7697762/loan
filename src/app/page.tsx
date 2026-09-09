'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ApplyLoanModal from '@/components/ApplyLoanModal';
import { Building, CheckCircle2, ChevronRight } from 'lucide-react';
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
    <div className="min-h-screen bg-[#faf9f9] text-slate-900 flex flex-col justify-between selection:bg-amber-400 selection:text-slate-950 font-sans">
      {/* Top Navbar */}
      <Navbar onApplyClick={() => setIsModalOpen(true)} />

      {/* Main Banner Hero Section (100% Mobile Friendly - Zero Text Cropping) */}
      <main className="flex-grow flex flex-col items-center justify-center p-2.5 sm:p-4 py-3 sm:py-6 relative z-10 w-full">
        
        {/* EXACT BANNER CARD CONTAINER */}
        <div className="w-full max-w-5xl bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl overflow-hidden relative">
          
          {/* Banner Graphic Image Container (Using object-contain so NO text is ever cropped) */}
          <div className="relative w-full aspect-[2/1] bg-white">
            <Image
              src="/bajaj_clean_hero_exact.png"
              alt="Bajaj Markets Personal Loan Eligibility Banner"
              fill
              className="object-contain object-center p-1 sm:p-2"
              priority
            />

            {/* Positioned Interactive Apply Now Button Overlay (Desktop & Tablet) */}
            <div className="hidden sm:block absolute bottom-[8%] left-[4%] z-20">
              <button
                onClick={() => setIsModalOpen(true)}
                className="relative group overflow-hidden px-8 py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#002b80] font-black text-lg rounded-full shadow-xl shadow-amber-400/40 hover:shadow-amber-400/60 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer border-2 border-yellow-200/90"
              >
                {/* Shine Sweep Effect */}
                <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                
                <span className="tracking-wide">Apply Now</span>
                <ChevronRight className="w-5 h-5 stroke-[3] group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Mobile Apply CTA Bar (Mobile Viewports - High Visibility) */}
          <div className="bg-gradient-to-r from-[#003db3] to-[#0056d6] p-3.5 sm:p-4 text-center flex flex-col items-center justify-center gap-2 px-4 border-t border-blue-400/30">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 px-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#002b80] font-black text-base uppercase tracking-wider rounded-full shadow-xl shadow-amber-400/40 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-yellow-200/90"
            >
              <span>APPLY NOW</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </button>
          </div>

        </div>

        {/* BANKING PARTNERS SECTION */}
        <section className="w-full max-w-5xl mt-4 sm:mt-5 bg-white border border-slate-200/90 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg sm:shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-2">
              <Building className="w-4 h-4 sm:w-5 sm:h-5 text-[#0056d6]" />
              <h2 className="text-xs sm:text-base font-black text-slate-900 uppercase tracking-wider">
                Partnered With Leading Banks
              </h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-emerald-200">
              Verified Partners
            </span>
          </div>

          {/* Bank Logos Badges Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-2.5">
            {bankPartners.map((bank, idx) => (
              <div
                key={idx}
                onClick={() => setIsModalOpen(true)}
                className="bg-slate-50 hover:bg-blue-50/70 border border-slate-200 rounded-xl sm:rounded-2xl p-2 sm:p-3 text-center space-y-1 cursor-pointer transition-all duration-200 group"
              >
                <div className={`w-7 h-7 sm:w-9 sm:h-9 mx-auto rounded-lg sm:rounded-xl ${bank.color} font-black text-[11px] sm:text-xs flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform`}>
                  {bank.name.substring(0, 2)}
                </div>
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-800 block truncate">
                  {bank.name}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-500">
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
      <footer className="py-3 sm:py-4 text-center text-xs text-slate-500 bg-white border-t border-slate-200/80">
        <p>&copy; {new Date().getFullYear()} Bajaj Referral Partner. All rights reserved.</p>
      </footer>

      {/* Apply Loan Modal */}
      <ApplyLoanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
