import React from 'react';
import { SyntheticDivisionResult } from '../math/syntheticDivision';
import { ArrowDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface SyntheticDivisionViewProps {
  synthetic: SyntheticDivisionResult;
  currentLang: Language;
}

export const SyntheticDivisionView: React.FC<SyntheticDivisionViewProps> = ({
  synthetic,
  currentLang,
}) => {
  const t = translations[currentLang];

  if (!synthetic.isApplicable) {
    return (
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-amber-900">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-base mb-1">{t.syntheticTab}</h4>
            <p className="text-sm leading-relaxed text-amber-800">
              {t.syntheticNotApplicable}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const { rootDisplay, columns, quotient, remainder, divisorLeadingCoef } = synthetic;

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
            <span>{t.syntheticTab}</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100">
              Ruffini
            </span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {currentLang === 'zh' ? '测试根：' : 'Testing Root: '}
            <span className="font-mono font-bold text-slate-700">c = {rootDisplay}</span>
          </p>
        </div>

        {!divisorLeadingCoef.isOne() && (
          <div className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-1 rounded-lg">
            {t.syntheticDivisorAdjustmentDesc(divisorLeadingCoef.toString())}
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
      <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-sm">
        <div>
          <span className="text-slate-500 font-medium">{t.quotientLabel}: </span>
          <span className="font-mono font-bold text-indigo-700 text-base">{quotient.toString()}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">{t.remainderLabel}: </span>
          <span className="font-mono font-bold text-emerald-700 text-base">{remainder.toString()}</span>
          {remainder.isZero() && (
            <span className="text-xs bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {t.exactDivisionBadge}
            </span>
          )}
        </div>
      </div>

      {/* Step by Step Breakdown in Active Language */}
      <div className="mt-6">
        <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-3">
          {currentLang === 'zh'
            ? '综合除法分步原理解析：'
            : currentLang === 'es'
            ? 'Explicación Paso a Paso de Ruffini:'
            : currentLang === 'fr'
            ? 'Explication Étape par Étape (Horner / Ruffini) :'
            : currentLang === 'pt'
            ? 'Explicação Passo a Passo de Briot-Ruffini:'
            : 'Step-by-Step Ruffini Explanation:'}
        </h4>
        <ol className="space-y-2 text-xs sm:text-sm text-slate-600 list-decimal list-inside pl-1">
          {columns.map((col, idx) => {
            if (idx === 0) {
              return (
                <li key={idx} className="leading-relaxed">
                  {t.syntheticDropLeadDesc(1, col.power, col.dividendCoef.toString())}
                </li>
              );
            }
            const prevVal = columns[idx - 1].resultVal.toString();
            const prodVal = col.productVal ? col.productVal.toString() : '0';
            const topVal = col.dividendCoef.toString();
            const sumVal = col.resultVal.toString();
            return (
              <li key={idx} className="leading-relaxed">
                {t.syntheticStepDesc(idx + 1, col.power, prevVal, rootDisplay, prodVal, topVal, sumVal)}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};
