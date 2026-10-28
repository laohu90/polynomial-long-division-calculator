import React, { useState } from 'react';
import { LongDivisionResult } from '../math/Polynomial';
import { MathView } from '../math/MathView';
import { copyToClipboard } from '../utils/clipboard';
import { translations, Language } from '../i18n/translations';
import { Copy, Check, Info, LayoutGrid, FileText, Share2, Sparkles, ArrowRight } from 'lucide-react';

interface LongDivisionSolverProps {
  result: LongDivisionResult;
  lang: Language;
}

export const LongDivisionSolver: React.FC<LongDivisionSolverProps> = ({ result, lang }) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'busstop' | 'ruffini' | 'asymptote' | 'verification'>('steps');
  const [showMissingZeros, setShowMissingZeros] = useState(true);
  const [isEuropeanLayout, setIsEuropeanLayout] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const t = translations[lang];

  const handleCopy = async (type: 'markdown' | 'latex') => {
    let content = '';

    if (type === 'markdown') {
      content = `### ${t.longDivisionTitle}\n\n`;
      content += `**${t.dividendLabel}:** ${result.dividend.toString()}\n`;
      content += `**${t.divisorLabel}:** ${result.divisor.toString()}\n\n`;
      content += `**${t.quotientLabel}:** ${result.quotient.toString()}\n`;
      content += `**${t.remainderLabel}:** ${result.remainder.toString()}\n\n`;
      content += `**${t.resultEquation}**\n`;
      content += `$$${result.dividend.toLatex()} = (${result.divisor.toLatex()})(${result.quotient.toLatex()}) + ${result.remainder.toLatex()}$$\n\n`;

      content += `#### ${t.tabSteps}\n`;
      result.steps.forEach(s => {
        content += `**Step ${s.stepIndex}:** ${lang === 'zh' ? s.explanationZh : s.explanationEn}\n`;
      });
    } else {
      content = `\\begin{aligned}\n`;
      content += `P(x) &= ${result.dividend.toLatex()} \\\\\n`;
      content += `D(x) &= ${result.divisor.toLatex()} \\\\\n`;
      content += `Q(x) &= ${result.quotient.toLatex()} \\\\\n`;
      content += `R(x) &= ${result.remainder.toLatex()} \\\\\n`;
      content += `${result.dividend.toLatex()} &= (${result.divisor.toLatex()})(${result.quotient.toLatex()}) + (${result.remainder.toLatex()})\n`;
      content += `\\end{aligned}`;
    }

    const ok = await copyToClipboard(content);
    if (ok) {
      setCopyStatus(t.copySuccess);
    } else {
      setCopyStatus(t.copyFailed);
    }
    setTimeout(() => setCopyStatus(null), 3000);
  };

  return (
    <div className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
      {/* Top Controls & Main Identity */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {t.toolLongDivision}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {t.dividendLabel}: <span className="text-indigo-300">{result.dividend.toString(showMissingZeros)}</span> ÷ <span className="text-emerald-300">{result.divisor.toString()}</span>
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleCopy('markdown')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition flex items-center gap-1.5 active:scale-95"
          >
            <Copy className="w-3.5 h-3.5 text-indigo-400" />
            {t.copyMarkdown}
          </button>
          <button
            onClick={() => handleCopy('latex')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition flex items-center gap-1.5 active:scale-95"
          >
            <Copy className="w-3.5 h-3.5 text-emerald-400" />
            {t.copyLatex}
          </button>
        </div>
      </div>

      {/* Copy Notification Alert */}
      {copyStatus ? (
        <div role="alert" aria-live="assertive" className="mt-3 p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2 shadow-lg animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{copyStatus}</span>
        </div>
      ) : null}

      {/* Summary Box */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-slate-800/60 border border-indigo-500/30 rounded-xl">
          <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider block mb-1">
            {t.quotientLabel}
          </span>
          <div className="text-lg font-mono font-bold text-indigo-200">
            <MathView latex={`Q(x) = ${result.quotient.toLatex()}`} inline />
          </div>
        </div>

        <div className="p-4 bg-slate-800/60 border border-emerald-500/30 rounded-xl">
          <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider block mb-1">
            {t.remainderLabel}
          </span>
          <div className="text-lg font-mono font-bold text-emerald-200">
            <MathView latex={`R(x) = ${result.remainder.toLatex()}`} inline />
          </div>
        </div>
      </div>

      {/* Responsive Result Tabs Bar (Fixing Issue #6 horizontal overflow truncation at 580px!) */}
      <div className="relative mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 pt-1 border-b border-slate-800 flex-nowrap shrink-0">
          <button
            onClick={() => setActiveTab('steps')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'steps'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <FileText className="w-4 h-4" />
            {t.tabSteps}
          </button>

          <button
            onClick={() => setActiveTab('busstop')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'busstop'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            {t.tabBusStop}
          </button>

          <button
            onClick={() => setActiveTab('ruffini')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'ruffini'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <Share2 className="w-4 h-4" />
            {t.tabRuffini}
          </button>

          <button
            onClick={() => setActiveTab('asymptote')}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'asymptote'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
            }`}
          >
            <Info className="w-4 h-4" />
            {t.tabAsymptote}
          </button>
        </div>
      </div>

      {/* Tab 1: Detailed Step-by-Step Breakdown */}
      {activeTab === 'steps' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={showMissingZeros}
                onChange={e => setShowMissingZeros(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-700"
              />
              {t.missingZeroToggle}
            </label>
          </div>

          <div className="space-y-4">
            {result.steps.map(step => (
              <div
                key={step.stepIndex}
                className="p-4 sm:p-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl shadow-md transition hover:border-slate-600"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-indigo-600/30 border border-indigo-400 text-indigo-300 text-xs font-bold flex items-center justify-center">
                    {step.stepIndex}
                  </span>
                  <h4 className="text-sm font-bold text-white">
                    {t.stepHeader.replace('%d', String(step.stepIndex))}
                  </h4>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 mb-3 leading-relaxed">
                  {lang === 'zh' ? step.explanationZh : step.explanationEn}
                </p>

                {/* Mathematical Equation View for this step */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-xs sm:text-sm font-mono overflow-x-auto">
                  <div className="flex flex-col gap-1.5 text-slate-300">
                    <div className="flex items-center gap-2 text-indigo-400">
                      <span className="font-semibold">{t.dividePhase}:</span>
                      <MathView latex={`\\frac{${step.leadingDividendTerm.coeff.toSignedLatex('x', step.leadingDividendTerm.power, true)}}{${step.leadingDivisorTerm.coeff.toSignedLatex('x', step.leadingDivisorTerm.power, true)}} = ${step.quotientTerm.coeff.toSignedLatex('x', step.quotientTerm.power, true)}`} inline />
                    </div>

                    <div className="flex items-center gap-2 text-emerald-400">
                      <span className="font-semibold">{t.multiplyPhase}:</span>
                      <MathView latex={`(${step.quotientTerm.coeff.toSignedLatex('x', step.quotientTerm.power, true)})(${result.divisor.toLatex()}) = ${step.product.toLatex()}`} inline />
                    </div>

                    <div className="flex items-center gap-2 text-amber-400">
                      <span className="font-semibold">{t.subtractPhase}:</span>
                      <MathView latex={`- (${step.product.toLatex()}) \\implies ${step.subtracted.toLatex()}`} inline />
                    </div>

                    {step.broughtDownTerm ? (
                      <div className="flex items-center gap-2 text-sky-400">
                        <span className="font-semibold">{t.bringDownPhase}:</span>
                        <span>{step.broughtDownTerm.coeff.toSignedTermString('x', step.broughtDownTerm.power, false)}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: US Bus-Stop / European Vertical Layout */}
      {activeTab === 'busstop' && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <label className="flex items-center gap-2 text-xs font-medium text-slate-300 cursor-pointer bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700">
              <input
                type="checkbox"
                checked={isEuropeanLayout}
                onChange={e => setIsEuropeanLayout(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 text-indigo-600 focus:ring-indigo-500 bg-slate-700"
              />
              {t.europeanLayoutToggle}
            </label>
          </div>

          <div className="p-4 sm:p-6 bg-slate-950 border border-slate-800 rounded-2xl overflow-x-auto font-mono text-sm sm:text-base leading-relaxed text-slate-200">
            {isEuropeanLayout ? (
              /* European Format: Dividend | Divisor
                                           -----------------
                                           Remainder| Quotient */
              <div className="min-w-[400px]">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2 mb-3">
                  <span className="text-indigo-300 font-bold">{result.dividend.toString(showMissingZeros)}</span>
                  <div className="border-l-2 border-slate-600 pl-4">
                    <span className="text-emerald-300 font-bold">{result.divisor.toString()}</span>
                  </div>
                </div>
                <div className="space-y-2 text-slate-400">
                  {result.steps.map(s => (
                    <div key={s.stepIndex} className="pl-4">
                      <div className="text-red-400">- ({s.product.toString()})</div>
                      <div className="border-t border-slate-700 my-1"></div>
                      <div className="text-indigo-200 font-semibold">{s.newRemainder.toString()}</div>
                    </div>
                  ))}
                  <div className="mt-4 pt-3 border-t-2 border-indigo-500 flex justify-between">
                    <span className="text-xs text-slate-400 uppercase">Quotient:</span>
                    <span className="text-indigo-300 font-bold">{result.quotient.toString()}</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Classic US Bus-Stop Format:
                         Q(x)
                    -----------
                 D(x) ) P(x)
              */
              <div className="min-w-[400px] flex flex-col items-start font-mono">
                {/* Quotient on top */}
                <div className="pl-32 font-bold text-indigo-300 pb-1">
                  {result.quotient.toString()}
                </div>

                {/* Top line over dividend */}
                <div className="flex items-center">
                  <span className="text-emerald-300 font-bold pr-2">{result.divisor.toString()}</span>
                  <span className="text-slate-400 font-bold text-lg">)</span>
                  <span className="border-t-2 border-indigo-400 pl-2 pr-4 font-bold text-white py-1">
                    {result.dividend.toString(showMissingZeros)}
                  </span>
                </div>

                {/* Intermediate subtraction steps */}
                <div className="pl-32 space-y-2 mt-2 w-full">
                  {result.steps.map(s => (
                    <div key={s.stepIndex} className="space-y-1">
                      <div className="text-amber-400">
                        - ({s.product.toString()})
                      </div>
                      <div className="border-t border-slate-700 w-48"></div>
                      <div className="text-indigo-200 font-semibold">
                        {s.newRemainder.toString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 3: Synthetic Division (Ruffini's Rule) */}
      {activeTab === 'ruffini' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-800/50 border border-slate-700/60 rounded-2xl">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {t.ruffiniTitle}
            </h3>

            {result.ruffini && result.ruffini.isApplicable ? (
              <div className="space-y-6">
                <div className="text-xs sm:text-sm text-slate-300">
                  <span className="font-semibold text-amber-300">{t.ruffiniRoot}</span>{' '}
                  <MathView latex={`c = ${result.ruffini.root.toLatex()}`} inline />
                  {!result.ruffini.divisorCoeffA.isOne() && (
                    <div className="mt-2 text-xs text-amber-400 bg-amber-950/40 p-2.5 rounded-lg border border-amber-800/40">
                      {lang === 'zh'
                        ? `注意：除式首项系数 a = ${result.ruffini.divisorCoeffA.toString()} ≠ 1。最底行未除以 a 的结果系数需除以 a 得到真正商式系数。`
                        : `Note: Divisor leading coefficient a = ${result.ruffini.divisorCoeffA.toString()} ≠ 1. Raw result row must be divided by 'a' to yield final quotient coefficients.`}
                    </div>
                  )}
                </div>

                {/* Ruffini Table Grid */}
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse font-mono text-center text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b-2 border-slate-700 text-slate-400">
                        <th className="py-2 px-3 text-left font-sans text-xs uppercase">{t.ruffiniCoeffRow}</th>
                        <th className="py-2 px-3 text-amber-400 border-r-2 border-slate-600 font-bold">
                          c = {result.ruffini.root.toString()}
                        </th>
                        {result.ruffini.topRow.map((val, i) => (
                          <th key={i} className="py-2 px-4 text-indigo-300 font-bold">
                            {val.toString()}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <td className="py-2 px-3 text-left font-sans text-xs uppercase">{t.ruffiniMultRow}</td>
                        <td className="border-r-2 border-slate-600"></td>
                        {result.ruffini.multRow.map((val, i) => (
                          <td key={i} className="py-2 px-4 text-emerald-400">
                            {i === 0
                              ? ''
                              : val.isNegative()
                              ? val.toString()
                              : val.isZero()
                              ? '0'
                              : `+ ${val.toString()}`}
                          </td>
                        ))}
                      </tr>
                      <tr className="bg-slate-950/80 font-bold border-t-2 border-indigo-500 text-white">
                        <td className="py-3 px-3 text-left font-sans text-xs uppercase">{t.ruffiniResultRow}</td>
                        <td className="border-r-2 border-slate-600"></td>
                        {result.ruffini.resultRow.map((val, i) => (
                          <td
                            key={i}
                            className={`py-3 px-4 ${
                              i === result.ruffini!.resultRow.length - 1
                                ? 'text-amber-400 bg-amber-950/30 font-extrabold border-l border-amber-500/30'
                                : 'text-indigo-200'
                            }`}
                          >
                            {val.toString()}
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Column Explanations */}
                <div className="space-y-3 mt-4 pt-4 border-t border-slate-800">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {lang === 'zh' ? '逐列演算过程说明' : 'Column-by-Column Explanations'}
                  </h4>
                  {result.ruffini.ruffiniSteps.map(st => (
                    <div key={st.colIndex} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                      <div>{lang === 'zh' ? st.explanationZh : st.explanationEn}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 bg-amber-950/30 border border-amber-800/40 text-amber-300 text-xs sm:text-sm rounded-xl">
                {t.ruffiniNotApplicable}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Asymptote & Summary */}
      {activeTab === 'asymptote' && (
        <div className="space-y-6">
          <div className="p-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Info className="w-5 h-5 text-indigo-400" />
              {t.resultEquation}
            </h3>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-center text-sm sm:text-base font-mono overflow-x-auto">
              <MathView
                latex={`${result.dividend.toLatex()} = (${result.divisor.toLatex()})(${result.quotient.toLatex()}) ${
                  result.remainder.isZero()
                    ? ''
                    : result.remainder.leadingCoeff.isNegative()
                    ? result.remainder.toLatex()
                    : `+ ${result.remainder.toLatex()}`
                }`}
              />
            </div>

            <div className="pt-4 border-t border-slate-800">
              {result.asymptote ? (
                <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl text-xs sm:text-sm text-indigo-200 space-y-1">
                  <span className="font-bold uppercase text-indigo-400 block">
                    {result.asymptote.type === 'linear' ? t.obliqueAsymptote : t.horizontalAsymptote}
                  </span>
                  <MathView latex={result.asymptote.latex} inline />
                </div>
              ) : (
                <div className="text-xs text-slate-400 italic">
                  {lang === 'zh'
                    ? '被除式次数与除式次数之差不为 0 或 1，无线性/水平渐近线。'
                    : 'Degree difference is not 0 or 1, so no linear/horizontal asymptote exists.'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
