'use client';

import React from 'react';
import Link from 'next/link';

interface NavbarProps {
  onApplyClick: () => void;
}

export default function Navbar({ onApplyClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Bajaj Markets Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex items-center">
            {/* Logo Box */}
            <div className="bg-[#0066c0] px-3 sm:px-3.5 py-1.5 flex flex-col items-center justify-center rounded-l-md shadow-xs">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" viewBox="0 0 100 100" fill="currentColor">
                <path d="M 20 15 C 70 15, 90 35, 60 50 C 90 65, 70 85, 20 85 C 50 78, 70 65, 45 50 C 70 35, 50 22, 20 15 Z" />
              </svg>
              <span className="text-[9px] sm:text-[10px] font-black tracking-wider text-white uppercase leading-none mt-0.5">
                BAJAJ
              </span>
            </div>
            {/* MARKETS Text */}
            <div className="pl-2 sm:pl-2.5">
              <span className="text-lg sm:text-2xl font-black tracking-wider text-[#0066c0] uppercase">
                MARKETS
              </span>
            </div>
          </div>
        </Link>

        {/* Primary Logo Blue CTA Button */}
        <button
          onClick={onApplyClick}
          className="relative inline-flex items-center justify-center px-5 sm:px-7 py-2 sm:py-2.5 text-xs font-black tracking-wider uppercase text-white bg-[#0066c0] hover:bg-[#00529b] rounded-full shadow-md shadow-blue-600/20 hover:shadow-blue-600/35 active:scale-95 transition-all duration-200 cursor-pointer"
        >
          APPLY NOW
        </button>
      </div>
    </header>
  );
}
