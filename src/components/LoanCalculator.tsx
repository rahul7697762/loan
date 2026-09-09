'use client';

import React, { useState } from 'react';
import { DollarSign, Calendar, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';

interface LoanCalculatorProps {
  onApplyClick: () => void;
}

export default function LoanCalculator({ onApplyClick }: LoanCalculatorProps) {
  const [amount, setAmount] = useState<number>(10000);
  const [months, setMonths] = useState<number>(12);
  const interestRatePerYear = 12; // 12% p.a.

  // Simple EMI calculation formula: EMI = [P x R x (1+R)^N]/[(1+R)^N-1]
  const monthlyRate = interestRatePerYear / 12 / 100;
  const emi = Math.round(
    (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );

  const totalPayment = emi * months;
  const totalInterest = totalPayment - amount;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" /> EMI Calculator
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-white">Customize Your Loan</h3>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-xs text-slate-400 block">Interest Rate</span>
          <span className="text-sm font-bold text-emerald-400">12% p.a.</span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Slider 1: Loan Amount */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-emerald-400" /> Loan Amount
            </label>
            <span className="text-xl font-bold text-emerald-400">
              ${amount.toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1">
            <span>$1,000</span>
            <span>$25,000</span>
            <span>$50,000</span>
          </div>
        </div>

        {/* Slider 2: Tenure */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-400" /> Tenure (Months)
            </label>
            <span className="text-xl font-bold text-teal-400">{months} Months</span>
          </div>
          <input
            type="range"
            min="3"
            max="60"
            step="3"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-medium mt-1">
            <span>3 Mths</span>
            <span>24 Mths</span>
            <span>60 Mths</span>
          </div>
        </div>
      </div>

      {/* Summary Box */}
      <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 gap-4 bg-slate-950/60 p-4 rounded-2xl">
        <div>
          <span className="text-xs text-slate-400 block mb-0.5">Estimated Monthly EMI</span>
          <span className="text-2xl sm:text-3xl font-extrabold text-white">
            ${emi.toLocaleString()}
          </span>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 block mb-0.5">Total Payable</span>
          <span className="text-lg font-bold text-slate-300">
            ${totalPayment.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-400 block">
            (${totalInterest.toLocaleString()} interest)
          </span>
        </div>
      </div>

      {/* Action CTA */}
      <button
        onClick={onApplyClick}
        className="mt-6 w-full py-4 px-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 font-bold text-base rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.01] transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer"
      >
        <TrendingUp className="w-5 h-5" />
        <span>Get Approved for ${amount.toLocaleString()} Now</span>
        <ArrowRight className="w-5 h-5 ml-1" />
      </button>
    </div>
  );
}
