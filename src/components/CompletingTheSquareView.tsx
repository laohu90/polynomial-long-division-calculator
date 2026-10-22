import React from 'react';
import { CompletingTheSquareResult } from '../math/completingTheSquare';
import { Sparkles, ArrowRight, CheckCircle2, Info } from 'lucide-react';

interface CompletingTheSquareViewProps {
  result: CompletingTheSquareResult;
}

export const CompletingTheSquareView: React.FC<CompletingTheSquareViewProps> = ({ result }) => {
  const {
    standardForm,
    vertexForm,
    vertex,
    axisOfSymmetry,
    direction,
    extremaType,
    extremaValue,
    roots,
    yIntercept,
    steps,
  } = result;

  return (
    <div className="space-y-6">
      {/* SUMMARY BANNER */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/80 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-emerald-200/60">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/80 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Completing the Square Result
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2">
              Quadratic Form Conversion
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600">
            <span>Parabola opens {direction === 'up' ? 'Upward (∪)' : 'Downward (∩)'}</span>
          </div>
        </div>

        {/* Transition from Standard to Vertex Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-white/90 p-4 rounded-xl border border-slate-200">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Standard Form</div>
            <div className="font-mono text-base sm:text-lg font-bold text-slate-800">
              f(x) = {standardForm}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-indigo-500 shrink-0 hidden md:block" />
            <div>
              <div className="text-xs font-medium text-indigo-600 mb-1">Vertex Form [a(x - h)² + k]</div>
              <div className="font-mono text-base sm:text-lg font-bold text-indigo-700">
                {vertexForm}
              </div>
            </div>
          </div>
        </div>

        {/* KEY PARABOLA PROPERTIES GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4">
          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500">Vertex (h, k)</div>
            <div className="font-mono font-bold text-slate-800 text-sm sm:text-base mt-1">
              ({vertex.hDisplay}, {vertex.kDisplay})
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500">Axis of Symmetry</div>
            <div className="font-mono font-bold text-indigo-700 text-sm sm:text-base mt-1">
              {axisOfSymmetry}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500">{extremaType === 'minimum' ? 'Minimum Value' : 'Maximum Value'}</div>
            <div className="font-mono font-bold text-emerald-700 text-sm sm:text-base mt-1">
              {vertex.kDisplay}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500">y-Intercept</div>
            <div className="font-mono font-bold text-slate-800 text-sm sm:text-base mt-1">
              {yIntercept}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs col-span-2 sm:col-span-1">
            <div className="text-[11px] font-semibold text-slate-500">Discriminant Δ</div>
            <div className="font-mono font-bold text-slate-800 text-sm sm:text-base mt-1">
              {result.discriminant.toString()}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs col-span-2 sm:col-span-1">
            <div className="text-[11px] font-semibold text-slate-500">Roots / Zeros</div>
            <div className="font-mono font-bold text-purple-700 text-xs sm:text-sm mt-1 truncate" title={roots.display}>
              {roots.display}
            </div>
          </div>
        </div>
      </div>

      {/* STEP BY STEP DECOMPOSITION */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
        <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>Detailed Step-by-Step Algebraic Decomposition</span>
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
            {steps.length} Steps
          </span>
        </h4>

        <div className="space-y-4">
          {steps.map((st) => (
            <div
              key={st.stepNumber}
              className="border border-slate-200 rounded-xl p-4 sm:p-5 hover:border-indigo-300 transition-colors bg-white shadow-2xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-md">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Step {st.stepNumber}: {st.title}
                </span>

                {st.formulaHighlight && (
                  <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    Rule: {st.formulaHighlight}
                  </span>
                )}
              </div>

              {/* Expression box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-3 my-2 font-mono text-sm sm:text-base font-bold text-slate-800 overflow-x-auto">
                {st.expression}
              </div>

              {/* Explanation text */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                {st.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
