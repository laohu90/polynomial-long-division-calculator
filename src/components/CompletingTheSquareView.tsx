import React, { useState } from 'react';
import { CompletingTheSquareResult } from '../math/completingTheSquare';
import { Fraction } from '../math/fraction';
import { Sparkles, ArrowRight, CheckCircle2, Box, TrendingUp, Layers } from 'lucide-react';

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
    a,
    b,
    c,
  } = result;

  const [activeSubTab, setActiveSubTab] = useState<'steps' | 'geometry' | 'graph'>('steps');

  // Values for geometric square model
  const bOverAVal = b.div(a);
  const halfBVal = bOverAVal.div(new Fraction(2n, 1n));
  const magicTermVal = halfBVal.mul(halfBVal);

  // Values for SVG Parabola Graph
  const hNum = vertex.h.toNumber();
  const kNum = vertex.k.toNumber();
  const aNum = a.toNumber();

  // Generate SVG curve points around vertex
  const xRange = 8;
  const numPoints = 60;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const xVal = hNum - xRange + (2 * xRange * i) / numPoints;
    const yVal = aNum * Math.pow(xVal - hNum, 2) + kNum;
    points.push({ x: xVal, y: yVal });
  }

  // SVG dimensions
  const svgWidth = 460;
  const svgHeight = 240;
  const minX = hNum - xRange;
  const maxX = hNum + xRange;
  const minY = Math.min(-5, kNum - (direction === 'up' ? 2 : 15));
  const maxY = Math.max(15, kNum + (direction === 'up' ? 15 : 2));

  const scaleX = (x: number) => ((x - minX) / (maxX - minX)) * (svgWidth - 60) + 30;
  const scaleY = (y: number) => svgHeight - (((y - minY) / (maxY - minY)) * (svgHeight - 40) + 20);

  const polylineStr = points
    .filter((pt) => pt.y >= minY - 5 && pt.y <= maxY + 5)
    .map((pt) => `${scaleX(pt.x).toFixed(1)},${scaleY(pt.y).toFixed(1)}`)
    .join(' ');

  return (
    <div className="space-y-6">
      {/* SUMMARY BANNER */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 border border-emerald-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-emerald-200/60">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/80 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Completing the Square Result
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mt-2">
              Standard Form to Vertex Form Conversion
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-600">
            <span>Parabola opens {direction === 'up' ? 'Upward (∪)' : 'Downward (∩)'}</span>
          </div>
        </div>

        {/* Transition from Standard to Vertex Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-white/90 p-4 rounded-2xl border border-slate-200">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">Standard Form</div>
            <div className="font-mono text-base sm:text-lg font-bold text-slate-800">
              f(x) = {standardForm}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-indigo-500 shrink-0 hidden md:block" />
            <div>
              <div className="text-xs font-medium text-indigo-600 mb-1">
                Vertex Form [a(x - h)² + k]
              </div>
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
            <div className="text-[11px] font-semibold text-slate-500">
              {extremaType === 'minimum' ? 'Minimum Value' : 'Maximum Value'}
            </div>
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
            <div
              className="font-mono font-bold text-purple-700 text-xs sm:text-sm mt-1 truncate"
              title={roots.display}
            >
              {roots.display}
            </div>
          </div>
        </div>
      </div>

      {/* VIEW TABS: Steps vs Geometric Visualizer vs Parabola Plot */}
      <div className="flex border-b border-slate-200 gap-1 text-xs sm:text-sm font-bold">
        <button
          type="button"
          onClick={() => setActiveSubTab('steps')}
          className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubTab === 'steps'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Step-by-Step Derivation ({steps.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('geometry')}
          className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubTab === 'geometry'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Box className="w-4 h-4" />
          <span>Geometric Area Model</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('graph')}
          className={`px-4 py-2.5 border-b-2 transition-all flex items-center gap-1.5 ${
            activeSubTab === 'graph'
              ? 'border-emerald-600 text-emerald-700 bg-emerald-50/40'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Parabola Graph</span>
        </button>
      </div>

      {/* SUB-TAB 1: DETAILED STEP BY STEP DECOMPOSITION */}
      {activeSubTab === 'steps' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs">
          <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>Detailed Algebraic Decomposition</span>
          </h4>

          <div className="space-y-4">
            {steps.map((st) => (
              <div
                key={st.stepNumber}
                className="border border-slate-200 rounded-2xl p-4 sm:p-5 hover:border-emerald-300 transition-colors bg-white shadow-2xs"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Step {st.stepNumber}: {st.title}
                  </span>

                  {st.formulaHighlight && (
                    <span className="text-xs font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      Rule: {st.formulaHighlight}
                    </span>
                  )}
                </div>

                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 my-2 font-mono text-sm sm:text-base font-bold text-slate-800 overflow-x-auto">
                  {st.expression}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: GEOMETRIC AREA MODEL (WHY IT IS CALLED COMPLETING THE SQUARE) */}
      {activeSubTab === 'geometry' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Box className="w-5 h-5 text-emerald-600" />
              <span>Why is it called "Completing the Square"? (Visual Area Model)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Ancient Greek and Babylonian mathematicians solved quadratics geometrically by
              physically completing a literal square!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
            {/* Geometric Square Diagram */}
            <div className="flex flex-col items-center justify-center">
              <div className="grid grid-cols-[140px_80px] grid-rows-[140px_80px] gap-1.5 font-mono text-xs font-bold text-center">
                {/* Top-left: Main x * x square */}
                <div className="bg-indigo-100 border-2 border-indigo-400 rounded-lg flex flex-col items-center justify-center text-indigo-900 p-2 shadow-xs">
                  <span>Main Square</span>
                  <span className="text-sm font-extrabold mt-1">x²</span>
                  <span className="text-[10px] text-indigo-600 mt-1">Dim: x × x</span>
                </div>

                {/* Top-right: Right rectangle */}
                <div className="bg-sky-100 border-2 border-sky-400 rounded-lg flex flex-col items-center justify-center text-sky-900 p-1 shadow-xs">
                  <span>Half Rect</span>
                  <span className="text-xs font-extrabold mt-1">({halfBVal.toString()})x</span>
                  <span className="text-[10px] text-sky-600">x × {halfBVal.toString()}</span>
                </div>

                {/* Bottom-left: Bottom rectangle */}
                <div className="bg-sky-100 border-2 border-sky-400 rounded-lg flex flex-col items-center justify-center text-sky-900 p-1 shadow-xs">
                  <span>Half Rect</span>
                  <span className="text-xs font-extrabold mt-1">({halfBVal.toString()})x</span>
                  <span className="text-[10px] text-sky-600">{halfBVal.toString()} × x</span>
                </div>

                {/* Bottom-right: THE MISSING CORNER (THE SQUARE THAT COMPLETES IT!) */}
                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg flex flex-col items-center justify-center text-amber-950 p-1 shadow-xs animate-pulse">
                  <span className="text-[10px] uppercase font-bold text-amber-800">Completed!</span>
                  <span className="text-xs font-extrabold mt-0.5">({halfBVal.toString()})²</span>
                  <span className="text-[10px] text-amber-900 font-bold">={magicTermVal.toString()}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-3 text-center">
                Full Completed Square has side length <span className="text-indigo-700 font-bold">(x + {halfBVal.toString()})</span>
              </span>
            </div>

            {/* Explanation of the Area Model */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="font-bold text-slate-800 text-sm">How the Geometry Works:</div>
              <ul className="space-y-2 list-disc list-inside leading-relaxed text-slate-600">
                <li>
                  Start with the area <span className="font-mono font-bold text-indigo-700">x²</span> (blue box).
                </li>
                <li>
                  Take the linear term <span className="font-mono font-bold text-slate-800">{bOverAVal.toString()}x</span> and divide it equally into two rectangles of area <span className="font-mono font-bold text-sky-700">{halfBVal.toString()}x</span>.
                </li>
                <li>
                  Place one on the right and one on the bottom. An empty corner is left open!
                </li>
                <li>
                  To <b>"complete"</b> this into one big square of side length <span className="font-mono font-bold text-indigo-700">(x + {halfBVal.toString()})</span>, you must add the missing corner piece: <span className="font-mono font-bold text-amber-800">({halfBVal.toString()})² = {magicTermVal.toString()}</span>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: PARABOLA GRAPH */}
      {activeSubTab === 'graph' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                <span>Interactive Parabola Cartesian Graph</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                Plotting f(x) = {standardForm} with vertex ({vertex.hDisplay}, {vertex.kDisplay})
              </p>
            </div>
            <span className="text-xs bg-slate-100 font-mono px-2.5 py-1 rounded-lg text-slate-700">
              Axis of Symmetry: {axisOfSymmetry}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex justify-center overflow-x-auto">
            <svg width={svgWidth} height={svgHeight} className="overflow-visible select-none">
              {/* Grid Lines */}
              <line
                x1={scaleX(minX)}
                y1={scaleY(0)}
                x2={scaleX(maxX)}
                y2={scaleY(0)}
                stroke="#94a3b8"
                strokeWidth="1.5"
              />
              <line
                x1={scaleX(0)}
                y1={scaleY(minY)}
                x2={scaleX(0)}
                y2={scaleY(maxY)}
                stroke="#94a3b8"
                strokeWidth="1.5"
              />

              {/* Axis of Symmetry Dashed Line */}
              <line
                x1={scaleX(hNum)}
                y1={scaleY(minY)}
                x2={scaleX(hNum)}
                y2={scaleY(maxY)}
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              {/* Parabola Curve */}
              <polyline
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2.5"
                points={polylineStr}
              />

              {/* Vertex Point */}
              <circle
                cx={scaleX(hNum)}
                cy={scaleY(kNum)}
                r="5"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="2"
              />

              {/* Labels */}
              <text
                x={scaleX(hNum) + 8}
                y={scaleY(kNum) - 8}
                fill="#047857"
                fontSize="11"
                fontWeight="bold"
                fontFamily="monospace"
              >
                Vertex ({vertex.hDisplay}, {vertex.kDisplay})
              </text>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};
