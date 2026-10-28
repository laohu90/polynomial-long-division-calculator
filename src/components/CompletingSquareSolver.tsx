import React, { useState } from 'react';
import { CompletingSquareResult } from '../math/Polynomial';
import { MathView } from '../math/MathView';
import { ParabolaGraph } from './ParabolaGraph';
import { copyToClipboard } from '../utils/clipboard';
import { translations, Language } from '../i18n/translations';
import { Copy, Check, Sparkles, Activity, FileText, BarChart2 } from 'lucide-react';

interface CompletingSquareSolverProps {
  result: CompletingSquareResult;
  lang: Language;
}

export const CompletingSquareSolver: React.FC<CompletingSquareSolverProps> = ({ result, lang }) => {
  const [activeTab, setActiveTab] = useState<'steps' | 'graph'>('steps');
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  const t = translations[lang];

  const handleCopy = async (type: 'markdown' | 'latex') => {
    let content = '';

    if (type === 'markdown') {
      content = `### ${t.completingSquareTitle}\n\n`;
      content += `**${t.quadraticLabel}:** y = ${result.original.toString()}\n`;
      content += `**${t.vertexFormLabel}:** ${result.steps[result.steps.length - 1].latex}\n\n`;
      content += `**${t.vertexLabel}** (${result.vertex.x.toString()}, ${result.vertex.y.toString()})\n`;
      content += `**${t.discriminantLabel}** ${result.discriminant.toString()}\n`;
      content += `**${t.rootsLabel}** ${result.roots.x1Str}, ${result.roots.x2Str}\n\n`;

      content += `#### ${t.tabSteps}\n`;
      result.steps.forEach(s => {
        content += `**Step ${s.stepIndex}:** ${lang === 'zh' ? s.textZh : s.textEn}\n`;
      });
    } else {
      content = `\\begin{aligned}\n`;
      content += `y &= ${result.original.toLatex()} \\\\\n`;
      result.steps.forEach(s => {
        content += `&= ${s.latex} \\\\\n`;
      });
      content += `\\text{Vertex} &= \\left(${result.vertex.x.toLatex()}, ${result.vertex.y.toLatex()}\\right)\n`;
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
      {/* Top Controls & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            {t.toolCompletingSquare}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            P(x) = <span className="text-emerald-300">{result.original.toString()}</span>
          </h2>
        </div>

        {/* Copy Buttons */}
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

      {/* Copy Notification Toast */}
      {copyStatus ? (
        <div role="alert" aria-live="assertive" className="mt-3 p-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs rounded-xl flex items-center gap-2 shadow-lg animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{copyStatus}</span>
        </div>
      ) : null}

      {/* Primary Result Banner */}
      <div className="my-6 p-5 bg-gradient-to-r from-emerald-950/40 via-indigo-950/40 to-slate-900 border border-emerald-500/30 rounded-2xl text-center shadow-lg">
        <span className="text-xs uppercase font-bold text-emerald-400 tracking-wider block mb-2">
          {t.vertexFormLabel}
        </span>
        <div className="text-xl sm:text-2xl font-mono font-bold text-emerald-200">
          <MathView latex={result.steps[result.steps.length - 1].latex} inline />
        </div>
      </div>

      {/* Quadratic Properties Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">{t.vertexLabel}</span>
          <span className="text-sm font-bold text-indigo-300 font-mono">
            ({result.vertex.x.toString()}, {result.vertex.y.toString()})
          </span>
        </div>

        <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">{t.discriminantLabel}</span>
          <span className="text-sm font-bold text-emerald-300 font-mono">
            Δ = {result.discriminant.toString()}
          </span>
        </div>

        <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">{t.axisOfSymmetryLabel}</span>
          <span className="text-sm font-bold text-amber-300 font-mono">
            {result.axisOfSymmetry}
          </span>
        </div>

        <div className="p-3 bg-slate-800/60 border border-slate-700/50 rounded-xl">
          <span className="text-[11px] font-semibold text-slate-400 uppercase block">{t.extremumLabel}</span>
          <span className="text-sm font-bold text-sky-300 font-mono">
            {result.extremum.type === 'minimum' ? (lang === 'zh' ? '最小值' : 'Min') : (lang === 'zh' ? '最大值' : 'Max')}{' '}
            = {result.extremum.value.toString()}
          </span>
        </div>
      </div>

      {/* Tabs selector */}
      <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('steps')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'steps'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
          }`}
        >
          <FileText className="w-4 h-4" />
          {t.tabSteps}
        </button>

        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition flex items-center gap-1.5 ${
            activeTab === 'graph'
              ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30'
              : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700/80'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          {t.tabGraph}
        </button>
      </div>

      {/* Tab 1: Step-by-Step Completing the Square */}
      {activeTab === 'steps' && (
        <div className="space-y-4">
          {result.steps.map(step => (
            <div
              key={step.stepIndex}
              className="p-4 sm:p-5 bg-slate-800/50 border border-slate-700/60 rounded-2xl shadow-md transition hover:border-slate-600"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-emerald-600/30 border border-emerald-400 text-emerald-300 text-xs font-bold flex items-center justify-center">
                  {step.stepIndex}
                </span>
                <h4 className="text-sm font-bold text-white">
                  {lang === 'zh' ? step.titleZh : step.titleEn}
                </h4>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-3 leading-relaxed">
                {lang === 'zh' ? step.textZh : step.textEn}
              </p>

              <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 text-center text-sm font-mono overflow-x-auto">
                <MathView latex={step.latex} />
              </div>
            </div>
          ))}

          {/* Roots Analysis Sub-box */}
          <div className="p-4 bg-slate-800/40 border border-indigo-500/30 rounded-2xl mt-6">
            <h4 className="text-sm font-bold text-indigo-300 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              {t.rootsLabel}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm font-mono text-slate-200">
              <MathView latex={result.roots.x1Latex} inline />
              {result.roots.x2Latex !== result.roots.x1Latex && (
                <div className="mt-1">
                  <MathView latex={result.roots.x2Latex} inline />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Parabola Graph */}
      {activeTab === 'graph' && (
        <div>
          <ParabolaGraph result={result} lang={lang} />
        </div>
      )}
    </div>
  );
};
