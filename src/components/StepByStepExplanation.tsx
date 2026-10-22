import React from 'react';
import { LongDivisionResult } from '../math/longDivision';
import { Polynomial } from '../math/polynomial';
import { Zap } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface StepByStepExplanationProps {
  result: LongDivisionResult;
  currentStepIndex: number;
  showAllSteps: boolean;
  currentLang: Language;
}

export const StepByStepExplanation: React.FC<StepByStepExplanationProps> = ({
  result,
  currentStepIndex,
  showAllSteps,
  currentLang,
}) => {
  const t = translations[currentLang];
  const { steps, divisor, dividend } = result;

  const displaySteps = showAllSteps ? steps : steps.slice(0, currentStepIndex + 1);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>{t.stepsTabLabel}</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
              {steps.length} {currentLang === 'zh' ? '次除法迭代' : 'Iterations'}
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            <b>1. Divide</b> → <b>2. Multiply</b> → <b>3. Subtract (Flip Signs)</b> → <b>4. Bring Down</b>
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {displaySteps.map((step, idx) => {
          const qTermStr = Polynomial.formatTerm(step.quotientTerm, true, dividend.variable);
          const leadDivStr = Polynomial.formatTerm(step.leadingDividendTerm, true, dividend.variable);
          const leadDvrStr = Polynomial.formatTerm(step.leadingDivisorTerm, true, divisor.variable);
          const prodStr = step.product.toString();
          const negProdStr = step.subtractionNegated.toString();
          const remStr = step.newRemainder.toString();
          const broughtDownStr = step.broughtDownTerm
            ? Polynomial.formatTerm(step.broughtDownTerm, false, dividend.variable)
            : null;

          return (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-indigo-300 transition-colors bg-white shadow-2xs"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                <span className="text-xs sm:text-sm font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md inline-flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  {currentLang === 'zh'
                    ? `第 ${step.stepNumber} 轮：求商式项 ${qTermStr}`
                    : `Iteration #${step.stepNumber}: Term ${qTermStr}`}
                </span>
                <span className="text-xs font-mono text-slate-500">
                  {currentLang === 'zh' ? '当前被除式行：' : 'Working Line: '} {step.currentWorkingPoly.toString()}
                </span>
              </div>

              {/* 4 Micro Steps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs sm:text-sm">
                {/* Step A: Divide */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      1
                    </span>
                    {t.rules[0]?.title || '1. Divide'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.divideLeadingDesc(leadDivStr, leadDvrStr, qTermStr)}
                  </p>
                  <div className="font-mono text-indigo-700 font-bold mt-1 bg-white p-1.5 rounded-lg border border-slate-200 text-center">
                    {leadDivStr} ÷ {leadDvrStr} = {qTermStr}
                  </div>
                </div>

                {/* Step B: Multiply */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    {t.rules[1]?.title || '2. Multiply'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.multiplyDivisorDesc(qTermStr, divisor.toString(), prodStr)}
                  </p>
                  <div className="font-mono text-slate-800 font-bold mt-1 bg-white p-1.5 rounded-lg border border-slate-200 text-center">
                    {qTermStr} · ({divisor.toString()}) = {prodStr}
                  </div>
                </div>

                {/* Step C: Subtract (Sign Flip!) */}
                <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                    <span className="w-4 h-4 rounded-full bg-amber-600 text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    {t.rules[2]?.title || '3. Subtract (Flip Signs)'}
                  </div>
                  <p className="text-amber-800 leading-relaxed">
                    {t.subtractSignFlipDesc(prodStr, negProdStr, remStr)}
                  </p>
                  <div className="font-mono text-emerald-800 font-bold mt-1 bg-white p-1.5 rounded-lg border border-amber-300 text-center">
                    {t.remainderLabel}: {remStr}
                  </div>
                </div>

                {/* Step D: Bring Down */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-700 flex items-center gap-1.5 mb-1 text-xs uppercase tracking-wider">
                    <span className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                      4
                    </span>
                    {t.rules[3]?.title || '4. Bring Down'}
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {t.bringDownDesc(broughtDownStr, remStr)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
