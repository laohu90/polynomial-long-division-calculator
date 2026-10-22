import React from 'react';
import { SyntheticDivisionResult } from '../math/syntheticDivision';
import { ArrowDown, AlertCircle, CheckCircle2 } from 'lucide-react';

interface SyntheticDivisionViewProps {
  synthetic: SyntheticDivisionResult;
}

export const SyntheticDivisionView: React.FC<SyntheticDivisionViewProps> = ({ synthetic }) => {
  if (!synthetic.isApplicable) {
    return (
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base mb-1">Synthetic Division Not Applicable</h4>
            <p className="text-sm leading-relaxed text-amber-800">
              {synthetic.reason ||
                'Synthetic division requires a linear divisor with degree 1 (such as x - c or ax + b). For quadratic or higher degree divisors, please use Polynomial Long Division.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { rootDisplay, columns, quotient, remainder, divisorLeadingCoef, stepsExplanation } =
    synthetic;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>Synthetic Division (Ruffini's Rule)</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              Fast-Track Method
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Testing root <span className="font-mono font-bold text-slate-700">c = {rootDisplay}</span> against dividend coefficients.
          </p>
        </div>

        {!divisorLeadingCoef.isOne() && (
          <div className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg">
            Note: Divisor leading coeff is {divisorLeadingCoef.toString()}, quotient coefficients divided by {divisorLeadingCoef.toString()}.
          </div>
        )}
      </div>

      {/* SYNTHETIC DIVISION TABLEAU */}
      <div className="overflow-x-auto pb-4">
        <div className="inline-block font-mono text-sm sm:text-base">
          {/* TOP ROW: Root | Coefficients */}
          <div className="flex items-center">
            {/* Root box */}
            <div className="w-20 sm:w-24 px-2 py-2 text-center font-bold text-indigo-700 bg-indigo-50 border-r-2 border-b-2 border-slate-800 rounded-tl-lg">
              {rootDisplay}
            </div>

            {/* Dividend Coefficients */}
            <div className="flex items-center pl-4 gap-3 sm:gap-6">
              {columns.map((col, idx) => (
                <div
                  key={`div-c-${idx}`}
                  className="w-16 sm:w-20 py-2 text-right font-bold text-slate-800"
                >
                  {col.dividendCoef.toString()}
                </div>
              ))}
            </div>
          </div>

          {/* MIDDLE ROW: Multiplied carries */}
          <div className="flex items-center border-b-2 border-slate-800">
            {/* Left blank */}
            <div className="w-20 sm:w-24 px-2 py-2 border-r-2 border-slate-800"></div>

            {/* Carries */}
            <div className="flex items-center pl-4 gap-3 sm:gap-6">
              {columns.map((col, idx) => (
                <div
                  key={`carry-${idx}`}
                  className="w-16 sm:w-20 py-2 text-right font-semibold text-rose-600"
                >
                  {col.productVal !== null ? col.productVal.toSignedString(false) : (
                    <span className="flex justify-center text-slate-400">
                      <ArrowDown className="w-4 h-4" />
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* BOTTOM ROW: Resulting Quotient & Remainder */}
          <div className="flex items-center pt-2">
            {/* Left blank */}
            <div className="w-20 sm:w-24"></div>

            {/* Bottom sums */}
            <div className="flex items-center pl-4 gap-3 sm:gap-6">
              {columns.map((col, idx) => {
                const isRemainder = idx === columns.length - 1;
                return (
                  <div
                    key={`res-${idx}`}
                    className={`w-16 sm:w-20 py-2 text-right font-bold ${
                      isRemainder
                        ? 'text-emerald-700 bg-emerald-50 rounded border border-emerald-300'
                        : 'text-indigo-800'
                    }`}
                  >
                    {col.resultVal.toString()}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* SYNTHETIC SUMMARY */}
      <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-3 text-sm">
        <div>
          <span className="text-slate-500 font-medium">Quotient Polynomial: </span>
          <span className="font-mono font-bold text-indigo-700 text-base">{quotient.toString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Remainder: </span>
          <span className="font-mono font-bold text-emerald-700 text-base">{remainder.toString()}</span>
          {remainder.isZero() && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Factor of P(x)
            </span>
          )}
        </div>
      </div>

      {/* Step by Step Breakdown */}
      <div className="mt-6">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
          Step-by-Step Ruffini Explanation:
        </h4>
        <ol className="space-y-2 text-xs sm:text-sm text-slate-600 list-decimal list-inside pl-1">
          {stepsExplanation.map((exp, idx) => (
            <li key={idx} className="leading-relaxed">
              {exp}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};
