import React from 'react';
import { LongDivisionResult } from '../math/longDivision';
import { Polynomial } from '../math/polynomial';
import { HelpCircle, ChevronRight, Zap } from 'lucide-react';

interface StepByStepExplanationProps {
  result: LongDivisionResult;
  currentStepIndex: number;
  showAllSteps: boolean;
}

export const StepByStepExplanation: React.FC<StepByStepExplanationProps> = ({
  result,
  currentStepIndex,
  showAllSteps,
}) => {
  const { steps, divisor } = result;

  const displaySteps = showAllSteps ? steps : steps.slice(0, currentStepIndex + 1);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>Detailed Walkthrough & Sign-Flip Guide</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {steps.length} Division Iterations
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Follow the 4-step golden rule: <b>Divide</b> → <b>Multiply</b> → <b>Subtract (Flip Signs)</b> → <b>Bring Down</b>.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {displaySteps.map((step, idx) => (
          <div
            key={idx}
            className="border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-indigo-300 transition-colors bg-white shadow-2xs"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
              <span className="text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                Iteration #{step.stepNumber}: Finding term {Polynomial.formatTerm(step.quotientTerm, true)}
              </span>
              <span className="text-xs font-mono text-slate-500">
                Current Working Poly: {step.currentWorkingPoly.toString()}
              </span>
            </div>

            {/* 4 Micro Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
              {/* Step A: Divide */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">1</span>
                  Divide Leading Terms
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Divide <span className="font-mono font-bold text-slate-900">{Polynomial.formatTerm(step.leadingDividendTerm, true)}</span> by <span className="font-mono font-bold text-slate-900">{Polynomial.formatTerm(step.leadingDivisorTerm, true)}</span>.
                </p>
                <div className="font-mono text-indigo-700 font-bold mt-1 bg-white p-1.5 rounded border border-slate-200 text-center">
                  {Polynomial.formatTerm(step.leadingDividendTerm, true)} ÷ {Polynomial.formatTerm(step.leadingDivisorTerm, true)} = {Polynomial.formatTerm(step.quotientTerm, true)}
                </div>
              </div>

              {/* Step B: Multiply */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">2</span>
                  Multiply by Divisor
                </div>
                <p className="text-slate-600 leading-relaxed">
                  Multiply <span className="font-mono font-bold text-slate-900">{Polynomial.formatTerm(step.quotientTerm, true)}</span> by the full divisor <span className="font-mono font-bold text-slate-900">({divisor.toString()})</span>.
                </p>
                <div className="font-mono text-slate-800 font-bold mt-1 bg-white p-1.5 rounded border border-slate-200 text-center">
                  {Polynomial.formatTerm(step.quotientTerm, true)} · ({divisor.toString()}) = {step.product.toString()}
                </div>
              </div>

              {/* Step C: Subtract (Sign Flip!) */}
              <div className="bg-amber-50/60 p-3 rounded-lg border border-amber-200">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                  <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">3</span>
                  Subtract (Flip Every Sign)
                </div>
                <p className="text-amber-800 leading-relaxed">
                  Invert the signs of <span className="font-mono font-bold">({step.product.toString()})</span> to get <span className="font-mono font-bold text-rose-700">({step.subtractionNegated.toString()})</span> and add to the dividend line.
                </p>
                <div className="font-mono text-emerald-800 font-bold mt-1 bg-white p-1.5 rounded border border-amber-300 text-center">
                  Remainder: {step.newRemainder.toString()}
                </div>
              </div>

              {/* Step D: Bring Down */}
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">4</span>
                  Bring Down Next Term
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {step.broughtDownTerm ? (
                    <>
                      Bring down the next available term <span className="font-mono font-bold text-indigo-700">{Polynomial.formatTerm(step.broughtDownTerm, false)}</span> to continue the division.
                    </>
                  ) : (
                    'All available terms have been processed or degree is lower than divisor.'
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
