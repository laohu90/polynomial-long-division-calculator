import React, { useState } from 'react';
import { CompletingTheSquareResult } from '../math/completingTheSquare';
import { Fraction } from '../math/fraction';
import { Sparkles, ArrowRight, CheckCircle2, Box, TrendingUp, Layers } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface CompletingTheSquareViewProps {
  result: CompletingTheSquareResult;
  currentLang: Language;
}

export const CompletingTheSquareView: React.FC<CompletingTheSquareViewProps> = ({
  result,
  currentLang,
}) => {
  const t = translations[currentLang];
  const {
    standardForm,
    vertexForm,
    vertex,
    axisOfSymmetry,
    direction,
    extremaType,
    roots,
    yIntercept,
    steps,
    a,
    b,
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

  const xRange = 8;
  const numPoints = 60;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= numPoints; i++) {
    const xVal = hNum - xRange + (2 * xRange * i) / numPoints;
    const yVal = aNum * Math.pow(xVal - hNum, 2) + kNum;
    points.push({ x: xVal, y: yVal });
  }

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
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-900 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-3 border-b border-slate-200">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {t.navCompleteSquare}
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {currentLang === 'zh'
                ? '一般式转顶点式 (Standard to Vertex Form)'
                : 'Standard Form to Vertex Form Conversion'}
            </h3>
          </div>
          <div className="text-xs font-semibold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
            <span>
              {direction === 'up'
                ? currentLang === 'zh'
                  ? '抛物线开口向上 (∪)'
                  : 'Parabola opens Upward (∪)'
                : currentLang === 'zh'
                ? '抛物线开口向下 (∩)'
                : 'Parabola opens Downward (∩)'}
            </span>
          </div>
        </div>

        {/* Transition from Standard to Vertex Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center bg-white/90 p-4 rounded-2xl border border-slate-200">
          <div>
            <div className="text-xs font-medium text-slate-500 mb-1">
              {currentLang === 'zh' ? '一般式 (Standard Form)' : 'Standard Form'}
            </div>
            <div className="font-mono text-base sm:text-lg font-bold text-slate-800">
              f(x) = {standardForm}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-indigo-500 shrink-0 hidden md:block" />
            <div>
              <div className="text-xs font-medium text-indigo-600 mb-1">
                {t.vertexFormLabel} [a(x - h)² + k]
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
            <div className="text-[11px] font-semibold text-slate-500">{t.vertexLabel}</div>
            <div className="font-mono font-bold text-slate-800 text-sm sm:text-base mt-1">
              ({vertex.hDisplay}, {vertex.kDisplay})
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500">{t.symmetryAxisLabel}</div>
            <div className="font-mono font-bold text-indigo-700 text-sm sm:text-base mt-1">
              {axisOfSymmetry}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500">{t.extremaLabel}</div>
            <div className="font-mono font-bold text-emerald-700 text-sm sm:text-base mt-1">
              {vertex.kDisplay}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs">
            <div className="text-[11px] font-semibold text-slate-500">{t.yInterceptLabel}</div>
            <div className="font-mono font-bold text-slate-800 text-sm sm:text-base mt-1">
              {yIntercept}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs col-span-2 sm:col-span-1">
            <div className="text-[11px] font-semibold text-slate-500">
              {currentLang === 'zh' ? '判别式 Δ' : 'Discriminant Δ'}
            </div>
            <div className="font-mono font-bold text-slate-800 text-sm sm:text-base mt-1">
              {result.discriminant.toString()}
            </div>
          </div>

          <div className="bg-white p-3 rounded-xl border border-slate-200 text-center shadow-2xs col-span-2 sm:col-span-1">
            <div className="text-[11px] font-semibold text-slate-500">{t.rootsLabel}</div>
            <div
              className="font-mono font-bold text-purple-700 text-xs sm:text-sm mt-1 truncate"
              title={roots.display}
            >
              {roots.display}
            </div>
          </div>
        </div>
      </div>

      {/* VIEW TABS */}
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
          <span>{t.stepsTabLabel} ({steps.length})</span>
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
          <span>{t.geometryTabLabel}</span>
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
          <span>{t.graphTabLabel}</span>
        </button>
      </div>

      {/* SUB-TAB 1: DETAILED STEP BY STEP DECOMPOSITION */}
      {activeSubTab === 'steps' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-xs">
          <h4 className="text-base sm:text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <span>{t.stepsTabLabel}</span>
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
                    {currentLang === 'zh'
                      ? `第 ${st.stepNumber} 步：${st.title}`
                      : `Step ${st.stepNumber}: ${st.title}`}
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

      {/* SUB-TAB 2: GEOMETRIC AREA MODEL */}
      {activeSubTab === 'geometry' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Box className="w-5 h-5 text-emerald-600" />
              <span>{t.geometricModelTitle}</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {t.geometricModelDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center bg-slate-50 p-6 rounded-2xl border border-slate-200">
            {/* Geometric Square Diagram */}
            <div className="flex flex-col items-center justify-center">
              <div className="grid grid-cols-[140px_80px] grid-rows-[140px_80px] gap-1.5 font-mono text-xs font-bold text-center">
                <div className="bg-indigo-100 border-2 border-indigo-400 rounded-lg flex flex-col items-center justify-center text-indigo-900 p-2 shadow-xs">
                  <span>{currentLang === 'zh' ? '原面积' : 'Main Square'}</span>
                  <span className="text-sm font-extrabold mt-1">x²</span>
                  <span className="text-[10px] text-indigo-600 mt-1">Dim: x × x</span>
                </div>

                <div className="bg-sky-100 border-2 border-sky-400 rounded-lg flex flex-col items-center justify-center text-sky-900 p-1 shadow-xs">
                  <span>{currentLang === 'zh' ? '半宽矩形' : 'Half Rect'}</span>
                  <span className="text-xs font-extrabold mt-1">({halfBVal.toString()})x</span>
                  <span className="text-[10px] text-sky-600">x × {halfBVal.toString()}</span>
                </div>

                <div className="bg-sky-100 border-2 border-sky-400 rounded-lg flex flex-col items-center justify-center text-sky-900 p-1 shadow-xs">
                  <span>{currentLang === 'zh' ? '半宽矩形' : 'Half Rect'}</span>
                  <span className="text-xs font-extrabold mt-1">({halfBVal.toString()})x</span>
                  <span className="text-[10px] text-sky-600">{halfBVal.toString()} × x</span>
                </div>

                <div className="bg-amber-200 border-2 border-amber-500 rounded-lg flex flex-col items-center justify-center text-amber-950 p-1 shadow-xs animate-pulse">
                  <span className="text-[10px] uppercase font-bold text-amber-800">
                    {currentLang === 'zh' ? '所补角块' : 'Completed!'}
                  </span>
                  <span className="text-xs font-extrabold mt-0.5">({halfBVal.toString()})²</span>
                  <span className="text-[10px] text-amber-900 font-bold">={magicTermVal.toString()}</span>
                </div>
              </div>
              <span className="text-xs font-semibold text-slate-500 mt-3 text-center">
                {currentLang === 'zh'
                  ? `拼成大正方形边长为 (x + ${halfBVal.toString()})`
                  : `Full Completed Square side length: (x + ${halfBVal.toString()})`}
              </span>
            </div>

            {/* Explanation of the Area Model */}
            <div className="space-y-3 text-xs sm:text-sm text-slate-700">
              <div className="font-bold text-slate-800 text-sm">
                {currentLang === 'zh' ? '几何原理解析：' : 'How the Area Model Works:'}
              </div>
              <ul className="space-y-2 list-disc list-inside leading-relaxed text-slate-600">
                {currentLang === 'zh' ? (
                  <>
                    <li>从边长为 x 的正方形面积 <span className="font-mono font-bold text-indigo-700">x²</span> 出发。</li>
                    <li>将一次项 <span className="font-mono font-bold text-slate-800">{bOverAVal.toString()}x</span> 均分为两块面积为 <span className="font-mono font-bold text-sky-700">{halfBVal.toString()}x</span> 的矩形。</li>
                    <li>分别摆放在大正方形的右侧和下侧，此时右下角会缺损一个正方形小角块。</li>
                    <li>为了“补全”成一个边长为 <span className="font-mono font-bold text-indigo-700">(x + {halfBVal.toString()})</span> 的大正方形，必须补入这个角块的面积：<span className="font-mono font-bold text-amber-800">({halfBVal.toString()})² = {magicTermVal.toString()}</span>。</li>
                  </>
                ) : (
                  <>
                    <li>Start with the area <span className="font-mono font-bold text-indigo-700">x²</span>.</li>
                    <li>Divide linear term <span className="font-mono font-bold text-slate-800">{bOverAVal.toString()}x</span> into two equal strips of <span className="font-mono font-bold text-sky-700">{halfBVal.toString()}x</span>.</li>
                    <li>Attach one to the right and one to the bottom, leaving an empty corner piece open.</li>
                    <li>To complete the square with side length <span className="font-mono font-bold text-indigo-700">(x + {halfBVal.toString()})</span>, add the missing corner piece: <span className="font-mono font-bold text-amber-800">({halfBVal.toString()})² = {magicTermVal.toString()}</span>.</li>
                  </>
                )}
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
                <span>{t.graphTabLabel}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-500">
                f(x) = {standardForm}
              </p>
            </div>
            <span className="text-xs bg-slate-100 font-mono px-2.5 py-1 rounded-lg text-slate-700">
              {t.symmetryAxisLabel}: {axisOfSymmetry}
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex justify-center overflow-x-auto">
            <svg width={svgWidth} height={svgHeight} className="overflow-visible select-none">
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

              <line
                x1={scaleX(hNum)}
                y1={scaleY(minY)}
                x2={scaleX(hNum)}
                y2={scaleY(maxY)}
                stroke="#6366f1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />

              <polyline
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2.5"
                points={polylineStr}
              />

              <circle
                cx={scaleX(hNum)}
                cy={scaleY(kNum)}
                r="5"
                fill="#10b981"
                stroke="#ffffff"
                strokeWidth="2"
              />

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
