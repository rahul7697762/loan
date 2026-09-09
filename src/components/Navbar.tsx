'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface NavbarProps {
  onApplyClick: () => void;
}

export default function Navbar({ onApplyClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Official Bajaj Markets Logo */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-36 sm:w-48 h-10 sm:h-14">
            <Image
              src="/bajaj_official_logo.png"
              alt="Bajaj Markets Logo"
              fill
              className="object-contain object-left group-hover:scale-105 transition-transform duration-200"
              priority
            />
          </div>
        </Link>

        {/* Primary CTA Button */}
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
