import React from 'react';
import { ShieldCheck, Lock, Award, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Col 1 */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-lg font-bold text-white">FlexiLoan</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Fast, secure, and transparent digital lending solutions. Get loan approvals directly into your bank account with zero paperwork.
          </p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Loan Products</h4>
          <ul className="space-y-2 text-xs">
            <li className="hover:text-emerald-400 cursor-pointer">Instant Personal Loan</li>
            <li className="hover:text-emerald-400 cursor-pointer">Emergency Credit Line</li>
            <li className="hover:text-emerald-400 cursor-pointer">Business Expansion Loan</li>
            <li className="hover:text-emerald-400 cursor-pointer">Education & Student Cash</li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Trust & Security</h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>256-bit SSL Encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <span>RBI / Partner Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-4 h-4 text-emerald-400" />
              <span>100% Digital & Paperless</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} FlexiLoan Finance Corp. All rights reserved.</p>
        <p className="mt-2 sm:mt-0">Powered by Next.js & Supabase</p>
      </div>
    </footer>
  );
}
