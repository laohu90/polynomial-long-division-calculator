import React from 'react';
import { LongDivisionResult } from '../math/longDivision';
import { ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

interface VerificationViewProps {
  result: LongDivisionResult;
}

export const VerificationView: React.FC<VerificationViewProps> = ({ result }) => {
  const { dividend, divisor, quotient, remainder, verification } = result;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>Algebraic Proof & Check</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              Verified
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            By the Division Algorithm: Dividend = (Divisor · Quotient) + Remainder
          </p>
        </div>
      </div>

      {/* Main Algorithm Formula */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-sm sm:text-base text-slate-800 space-y-2">
        <div className="text-xs font-sans font-semibold text-slate-500 uppercase tracking-wider">
          Division Identity:
        </div>
        <div className="font-bold text-indigo-900 overflow-x-auto">
          P(x) = D(x) · Q(x) + R(x)
        </div>
      </div>

      {/* Expansion Breakdown */}
      <div className="space-y-4 text-xs sm:text-sm">
        {/* Step 1: Substitution */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="font-semibold text-slate-700 mb-1">
            1. Substitute Computed Polynomials:
          </div>
          <div className="font-mono text-slate-900 bg-slate-50 p-2.5 rounded-lg overflow-x-auto">
            ({divisor.toString()}) · ({quotient.toString()}) + ({remainder.toString()})
          </div>
        </div>

        {/* Step 2: Multiply Quotient & Divisor */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="font-semibold text-slate-700 mb-1">
            2. Expand the Product of Divisor and Quotient:
          </div>
          <div className="font-mono text-slate-900 bg-slate-50 p-2.5 rounded-lg overflow-x-auto">
            {verification.expandedProduct}
          </div>
        </div>

        {/* Step 3: Add Remainder */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="font-semibold text-slate-700 mb-1">
            3. Add the Remainder ({remainder.toString()}):
          </div>
          <div className="font-mono text-slate-900 bg-slate-50 p-2.5 rounded-lg overflow-x-auto">
            {verification.addRemainder}
          </div>
        </div>

        {/* Conclusion */}
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/70 text-emerald-950 flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>The expanded result matches the original Dividend: {dividend.toString()}</span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white px-2.5 py-1 rounded-md">
            Q.E.D.
          </span>
        </div>
      </div>
    </div>
  );
};
