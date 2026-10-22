import React from 'react';
import { LongDivisionResult } from '../math/longDivision';
import { Polynomial } from '../math/polynomial';
import { CheckCircle2, ArrowDown, Sparkles } from 'lucide-react';

interface BusStopBracketProps {
  result: LongDivisionResult;
  currentStepIndex: number;
  showAllSteps: boolean;
  showPadding: boolean;
}

export const BusStopBracket: React.FC<BusStopBracketProps> = ({
  result,
  currentStepIndex,
  showAllSteps,
  showPadding,
}) => {
  const { divisor, quotient, dividend, steps, remainder, allPowers } = result;

  // Visible steps based on user navigation
  const visibleSteps = showAllSteps ? steps : steps.slice(0, currentStepIndex + 1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-7 shadow-xs overflow-x-auto">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 mb-5 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>Bus-Stop Long Division Layout</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
              US Textbook Notation
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Columns are strictly aligned by variable powers (x³, x², x, constant).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
            <span className="w-2.5 h-2.5 rounded bg-amber-400"></span> Sign Flip Active
          </span>
          <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span> Quotient Term
          </span>
        </div>
      </div>

      {/* Math Bracket Container */}
      <div className="inline-block min-w-full font-mono text-sm sm:text-base leading-relaxed select-text">
        {/* TOP ROW: Quotient terms above the line */}
        <div className="flex items-end pb-1.5 pl-32 sm:pl-44">
          <div className="grid grid-flow-col auto-cols-[minmax(90px,120px)] text-right">
            {allPowers.map((p) => {
              const c = quotient.getCoefficient(p);
              // Check if this power belongs to a step that is currently visible
              const stepForThisPower = steps.findIndex((s) => s.quotientTerm.power === p);
              const isVisibleInStepper =
                showAllSteps || (stepForThisPower !== -1 && stepForThisPower <= currentStepIndex);

              const isLead = p === quotient.degree;
              const termStr = c.isZero()
                ? ''
                : Polynomial.formatTerm({ coef: c, power: p }, isLead);

              return (
                <div
                  key={`q-${p}`}
                  className={`px-2 py-1 font-bold transition-all duration-300 ${
                    !c.isZero() && isVisibleInStepper
                      ? 'text-indigo-700 bg-indigo-50/70 rounded-md border border-indigo-100'
                      : 'text-transparent'
                  }`}
                >
                  {termStr || ' '}
                </div>
              );
            })}
          </div>
        </div>

        {/* DIVIDEND ROW WITH DIVISOR ON LEFT AND BRACKET */}
        <div className="flex items-stretch border-t-2 border-slate-800">
          {/* Divisor + Right parenthesis ')' */}
          <div className="w-32 sm:w-44 flex items-center justify-end pr-3 border-r-2 border-slate-800 text-slate-800 font-bold bg-slate-50/60 rounded-l-lg">
            <span>{divisor.toString()}</span>
          </div>

          {/* Dividend Terms Grid */}
          <div className="grid grid-flow-col auto-cols-[minmax(90px,120px)] text-right py-2 bg-slate-50/30">
            {allPowers.map((p) => {
              const c = dividend.getCoefficient(p);
              const isLead = p === dividend.degree;
              const isMissing = result.missingDividendPowers.includes(p) && p < dividend.degree;

              let text = '';
              if (!c.isZero()) {
                text = Polynomial.formatTerm({ coef: c, power: p }, isLead);
              } else if (isMissing && showPadding) {
                text = p === 0 ? '+ 0' : p === 1 ? '+ 0x' : `+ 0x^${p}`;
              }

              return (
                <div
                  key={`div-${p}`}
                  className={`px-2 py-1 font-semibold ${
                    isMissing && showPadding ? 'text-amber-600 bg-amber-50/60' : 'text-slate-800'
                  }`}
                >
                  {text || ' '}
                </div>
              );
            })}
          </div>
        </div>

        {/* REPEATED STEPS: MULTIPLICATION, SUBTRACTION BAR, REMAINDER LINE */}
        {visibleSteps.map((step, sIdx) => {
          const isCurrentActive = sIdx === currentStepIndex && !showAllSteps;

          return (
            <div
              key={`step-${sIdx}`}
              className={`transition-all duration-300 ${
                isCurrentActive ? 'bg-amber-50/40 rounded-lg p-1 -m-1' : ''
              }`}
            >
              {/* Product row with sign inversion indicator */}
              <div className="flex items-center pl-32 sm:pl-44 pt-2">
                <div className="w-8 -ml-8 flex items-center justify-center text-xs font-bold text-rose-600">
                  −(
                </div>
                <div className="grid grid-flow-col auto-cols-[minmax(90px,120px)] text-right">
                  {allPowers.map((p) => {
                    const c = step.product.getCoefficient(p);
                    const isLead = p === step.product.degree;
                    const text = c.isZero()
                      ? ''
                      : Polynomial.formatTerm({ coef: c, power: p }, isLead);

                    // Negated coefficient for flipped-sign tooltip
                    const negC = c.negate();
                    const flippedText = negC.isZero()
                      ? ''
                      : Polynomial.formatTerm({ coef: negC, power: p }, isLead);

                    return (
                      <div key={`prod-${sIdx}-${p}`} className="px-2 py-1 relative group">
                        <span className="text-rose-700 font-medium">{text || ' '}</span>
                        {text && (
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-5 right-2 bg-slate-900 text-amber-300 text-[10px] font-sans px-1.5 py-0.5 rounded shadow whitespace-nowrap z-20">
                            Flipped: {flippedText}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="text-xs font-bold text-rose-600 pl-1">)</div>
              </div>

              {/* Subtraction divider line */}
              <div className="flex items-center pl-32 sm:pl-44 py-1">
                <div className="w-full border-b border-slate-400"></div>
              </div>

              {/* Remainder line after subtraction */}
              <div className="flex items-center pl-32 sm:pl-44 pb-2">
                <div className="grid grid-flow-col auto-cols-[minmax(90px,120px)] text-right">
                  {allPowers.map((p) => {
                    const isLastStep = sIdx === steps.length - 1;
                    const c = step.newRemainder.getCoefficient(p);
                    const isLead = p === step.newRemainder.degree;
                    const isBroughtDown = step.broughtDownTerm && step.broughtDownTerm.power === p;

                    let text = '';
                    if (!c.isZero()) {
                      text = Polynomial.formatTerm({ coef: c, power: p }, isLead);
                    } else if (isLastStep && step.newRemainder.isZero() && p === 0) {
                      text = '0';
                    }

                    return (
                      <div
                        key={`rem-${sIdx}-${p}`}
                        className={`px-2 py-1 font-bold ${
                          isLastStep
                            ? 'text-emerald-700 bg-emerald-50 rounded'
                            : isBroughtDown
                            ? 'text-sky-700'
                            : 'text-slate-800'
                        }`}
                      >
                        {text || ' '}
                        {isBroughtDown && (
                          <span
                            className="inline-block ml-1 text-sky-500 text-xs"
                            title="Brought down from dividend"
                          >
                            <ArrowDown className="w-3 h-3 inline" />
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FINAL REMAINDER CALLOUT */}
      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/80 p-3.5 rounded-xl">
        <div className="flex items-center gap-2">
          {remainder.isZero() ? (
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Exact Division! Remainder R(x) = 0
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-800 bg-amber-100/80 px-2.5 py-1 rounded-lg">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Non-zero Remainder: R(x) = {remainder.toString()}
            </span>
          )}
        </div>

        <div className="text-xs sm:text-sm font-mono text-slate-700">
          <span className="text-slate-500 font-sans">Quotient:</span>{' '}
          <span className="font-bold text-indigo-700">{quotient.toString()}</span>
        </div>
      </div>
    </div>
  );
};
