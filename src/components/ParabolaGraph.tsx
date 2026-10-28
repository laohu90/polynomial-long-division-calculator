import React from 'react';
import { CompletingSquareResult } from '../math/Polynomial';

interface ParabolaGraphProps {
  result: CompletingSquareResult;
  lang: 'en' | 'zh';
}

export const ParabolaGraph: React.FC<ParabolaGraphProps> = ({ result, lang }) => {
  const { a, vertex, roots, yIntercept, axisOfSymmetry } = result;

  const h = vertex.x.toNumber();
  const k = vertex.y.toNumber();
  const aVal = a.toNumber();

  // Dynamic axis range centered around vertex (h, k)
  const xSpan = 8;
  const xMin = Math.floor(h - xSpan / 2);
  const xMax = Math.ceil(h + xSpan / 2);

  // Compute y values at xMin, xMax, vertex
  const yAtMin = aVal * Math.pow(xMin - h, 2) + k;
  const yAtMax = aVal * Math.pow(xMax - h, 2) + k;

  let yMin = Math.min(k, yAtMin, yAtMax, 0) - 2;
  let yMax = Math.max(k, yAtMin, yAtMax, 0) + 2;

  // Clamp vertical bounds for clean rendering
  if (yMax - yMin > 40) {
    if (aVal > 0) {
      yMax = yMin + 30;
    } else {
      yMin = yMax - 30;
    }
  }

  const width = 600;
  const height = 400;
  const padding = 50;

  // Coordinate mapping functions
  const toSvgX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * (width - 2 * padding);
  const toSvgY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * (height - 2 * padding);

  // Generate SVG path for parabola curve
  const pointsCount = 100;
  const pathPoints: string[] = [];
  for (let i = 0; i <= pointsCount; i++) {
    const x = xMin + (i / pointsCount) * (xMax - xMin);
    const y = aVal * Math.pow(x - h, 2) + k;
    const sx = toSvgX(x);
    const sy = toSvgY(y);
    pathPoints.push(`${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
  }
  const pathD = pathPoints.join(' ');

  // Generate numerical ticks for X axis
  const xTicks: number[] = [];
  const xStep = (xMax - xMin) <= 10 ? 1 : 2;
  for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x += xStep) {
    xTicks.push(x);
  }

  // Generate numerical ticks for Y axis
  const yTicks: number[] = [];
  const yRange = yMax - yMin;
  const yStep = yRange > 20 ? 5 : yRange > 10 ? 2 : 1;
  const startY = Math.ceil(yMin / yStep) * yStep;
  for (let y = startY; y <= yMax; y += yStep) {
    yTicks.push(y);
  }

  const svgXAxisY = toSvgY(0);
  const svgYAxisX = toSvgX(0);

  const isXAxisVisible = svgXAxisY >= padding && svgXAxisY <= height - padding;
  const isYAxisVisible = svgYAxisX >= padding && svgYAxisX <= width - padding;

  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-2xl p-4 shadow-xl overflow-hidden">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
          {lang === 'zh' ? '抛物线图表 (含坐标轴刻度数字)' : 'Parabola Graph (with Axis Numerical Ticks)'}
        </h3>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-indigo-400 inline-block"></span>
            y = {result.original.toString()}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-400 border border-dashed border-emerald-400 inline-block"></span>
            {lang === 'zh' ? '对称轴' : 'Axis'}
          </span>
        </div>
      </div>

      <div className="relative w-full aspect-[3/2] max-h-[420px]">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full bg-slate-950/70 rounded-xl overflow-visible font-sans text-xs select-none"
        >
          <defs>
            <linearGradient id="parabolaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#818cf8" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#c084fc" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Grid lines */}
          {xTicks.map(x => {
            const sx = toSvgX(x);
            return (
              <line
                key={`grid-x-${x}`}
                x1={sx}
                y1={padding}
                x2={sx}
                y2={height - padding}
                stroke="#334155"
                strokeWidth="0.75"
                strokeDasharray="3 3"
                opacity="0.4"
              />
            );
          })}
          {yTicks.map(y => {
            const sy = toSvgY(y);
            return (
              <line
                key={`grid-y-${y}`}
                x1={padding}
                y1={sy}
                x2={width - padding}
                y2={sy}
                stroke="#334155"
                strokeWidth="0.75"
                strokeDasharray="3 3"
                opacity="0.4"
              />
            );
          })}

          {/* X Axis Line */}
          {isXAxisVisible ? (
            <line
              x1={padding - 10}
              y1={svgXAxisY}
              x2={width - padding + 10}
              y2={svgXAxisY}
              stroke="#94a3b8"
              strokeWidth="1.75"
            />
          ) : null}

          {/* Y Axis Line */}
          {isYAxisVisible ? (
            <line
              x1={svgYAxisX}
              y1={padding - 10}
              x2={svgYAxisX}
              y2={height - padding + 10}
              stroke="#94a3b8"
              strokeWidth="1.75"
            />
          ) : null}

          {/* X Axis Ticks and Labels (Fixing Issue #6!) */}
          {xTicks.map(x => {
            const sx = toSvgX(x);
            const sy = isXAxisVisible ? svgXAxisY : height - padding;
            return (
              <g key={`xtick-${x}`}>
                <line x1={sx} y1={sy - 4} x2={sx} y2={sy + 4} stroke="#cbd5e1" strokeWidth="1.5" />
                <text
                  x={sx}
                  y={sy + 18}
                  fill="#cbd5e1"
                  fontSize="11"
                  textAnchor="middle"
                  fontWeight="500"
                >
                  {x}
                </text>
              </g>
            );
          })}

          {/* Y Axis Ticks and Labels (Fixing Issue #6!) */}
          {yTicks.map(y => {
            const sy = toSvgY(y);
            const sx = isYAxisVisible ? svgYAxisX : padding;
            return (
              <g key={`ytick-${y}`}>
                <line x1={sx - 4} y1={sy} x2={sx + 4} y2={sy} stroke="#cbd5e1" strokeWidth="1.5" />
                <text
                  x={sx - 8}
                  y={sy + 4}
                  fill="#cbd5e1"
                  fontSize="11"
                  textAnchor="end"
                  fontWeight="500"
                >
                  {y}
                </text>
              </g>
            );
          })}

          {/* Axis Labels */}
          <text x={width - padding + 25} y={isXAxisVisible ? svgXAxisY + 4 : height - padding} fill="#818cf8" fontWeight="bold">
            X
          </text>
          <text x={isYAxisVisible ? svgYAxisX : padding} y={padding - 20} fill="#818cf8" fontWeight="bold" textAnchor="middle">
            Y
          </text>

          {/* Axis of Symmetry Dashed Line */}
          <line
            x1={toSvgX(h)}
            y1={padding}
            x2={toSvgX(h)}
            y2={height - padding}
            stroke="#34d399"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />

          {/* Parabola Curve */}
          <path d={pathD} fill="none" stroke="url(#parabolaGrad)" strokeWidth="3" filter="url(#glow)" />

          {/* Vertex Point Marker */}
          <g transform={`translate(${toSvgX(h)}, ${toSvgY(k)})`}>
            <circle r="6" fill="#f43f5e" stroke="#ffffff" strokeWidth="2" filter="url(#glow)" />
            <text
              x={10}
              y={k >= 0 ? -10 : 18}
              fill="#f43f5e"
              fontSize="12"
              fontWeight="bold"
              className="drop-shadow-md"
            >
              Vertex ({vertex.x.toString()}, {vertex.y.toString()})
            </text>
          </g>

          {/* Real Roots Markers (if discriminant >= 0) */}
          {roots.numericValues && roots.numericValues.map((rx, idx) => {
            if (rx < xMin || rx > xMax) return null;
            const sx = toSvgX(rx);
            const sy = toSvgY(0);
            return (
              <g key={`root-${idx}`} transform={`translate(${sx}, ${sy})`}>
                <circle r="4.5" fill="#fbbf24" stroke="#ffffff" strokeWidth="1.5" />
                <text
                  x={0}
                  y={22}
                  fill="#fbbf24"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  x{idx + 1}={rx.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* Y-intercept Marker */}
          {(() => {
            const yInt = yIntercept.y.toNumber();
            if (yInt >= yMin && yInt <= yMax && isYAxisVisible) {
              const sx = toSvgX(0);
              const sy = toSvgY(yInt);
              return (
                <g transform={`translate(${sx}, ${sy})`}>
                  <circle r="4" fill="#38bdf8" stroke="#ffffff" strokeWidth="1.5" />
                  <text x={-10} y={-8} fill="#38bdf8" fontSize="10" textAnchor="end">
                    (0, {yIntercept.y.toString()})
                  </text>
                </g>
              );
            }
            return null;
          })()}
        </svg>
      </div>
    </div>
  );
};
