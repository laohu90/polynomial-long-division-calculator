import React from 'react';
import { LongDivisionResult } from '../math/longDivision';
import { TrendingUp, AlertTriangle } from 'lucide-react';

interface SlantAsymptoteViewProps {
  result: LongDivisionResult;
}

export const SlantAsymptoteView: React.FC<SlantAsymptoteViewProps> = ({ result }) => {
  const { dividend, divisor, quotient, remainder, slantAsymptote } = result;

  const hasSlant = dividend.degree - divisor.degree === 1;

  if (!hasSlant) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-700">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base mb-1">No Slant (Oblique) Asymptote</h4>
            <p className="text-sm leading-relaxed text-slate-600">
              A rational function has a slant asymptote only when the degree of the numerator
              (dividend) is exactly one greater than the degree of the denominator (divisor).
              Here, degree of dividend is <b>{dividend.degree}</b> and degree of divisor is{' '}
              <b>{divisor.degree}</b> (difference is {dividend.degree - divisor.degree}).
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span>Slant (Oblique) Asymptote Analysis</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              Precalculus & AP Calculus
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Behavior of the rational function f(x) = P(x) / D(x) as x approaches ±∞.
          </p>
        </div>
      </div>

      {/* Hero Equation Box */}
      <div className="bg-indigo-50/70 border border-indigo-200 rounded-xl p-5 text-center">
        <div className="text-xs font-semibold text-indigo-800 uppercase tracking-wider mb-1">
          Equation of the Slant Asymptote:
        </div>
        <div className="font-mono text-xl sm:text-2xl font-extrabold text-indigo-950">
          {slantAsymptote}
        </div>
        <div className="text-xs text-indigo-700 mt-2">
          (Obtained directly from the non-remainder quotient polynomial Q(x))
        </div>
      </div>

      {/* Mathematical derivation */}
      <div className="space-y-3 text-xs sm:text-sm text-slate-700">
        <div className="font-bold text-slate-800 uppercase tracking-wide text-xs">
          Theoretical Proof (Limit at Infinity):
        </div>
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono space-y-2">
          <div>
            f(x) = [{dividend.toString()}] / [{divisor.toString()}]
          </div>
          <div>
            f(x) = ({quotient.toString()}) + [({remainder.toString()}) / ({divisor.toString()})]
          </div>
          <div className="text-indigo-700 font-semibold pt-1">
            lim (x → ±∞) [({remainder.toString()}) / ({divisor.toString()})] = 0
          </div>
        </div>
        <p className="text-slate-600 leading-relaxed">
          Because the degree of the remainder is strictly less than the divisor, the fractional
          term approaches 0 as x becomes very large positive or negative. Therefore, the graph of
          the rational function approaches the line <b>{slantAsymptote}</b>.
        </p>
      </div>
    </div>
  );
};
