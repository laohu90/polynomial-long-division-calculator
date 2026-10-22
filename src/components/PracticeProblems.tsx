import React, { useState } from 'react';
import { Target, CheckCircle2, ChevronRight, Eye, Play } from 'lucide-react';
import { Language } from '../i18n/translations';

interface PracticeProblem {
  id: string;
  category: 'Long Division' | 'Synthetic Division' | 'Completing the Square';
  title: string;
  dividend?: string;
  divisor?: string;
  quadratic?: string;
  targetMode: 'division' | 'completing_square';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hint: string;
  answerSummary: string;
}

interface PracticeProblemsProps {
  onLoadProblem: (problem: PracticeProblem) => void;
  currentLang: Language;
}

export const PracticeProblems: React.FC<PracticeProblemsProps> = ({ onLoadProblem, currentLang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const problems: PracticeProblem[] = [
    {
      id: 'p1',
      category: 'Long Division',
      title: 'Missing Degree Trap: (x⁴ - 1) ÷ (x - 1)',
      dividend: 'x^4 - 1',
      divisor: 'x - 1',
      targetMode: 'division',
      difficulty: 'Medium',
      hint: 'Remember to insert placeholder zeros for x³, x², and x: x⁴ + 0x³ + 0x² + 0x - 1.',
      answerSummary: 'Quotient: x³ + x² + x + 1, Remainder: 0 (Exact Division)',
    },
    {
      id: 'p2',
      category: 'Long Division',
      title: 'Precalculus Slant Asymptote: (2x³ + 3x² - x + 4) ÷ (x² - 1)',
      dividend: '2x^3 + 3x^2 - x + 4',
      divisor: 'x^2 - 1',
      targetMode: 'division',
      difficulty: 'Hard',
      hint: 'Since degree of numerator is 3 and denominator is 2, the quotient gives the slant asymptote y = 2x + 3.',
      answerSummary: 'Quotient: 2x + 3, Remainder: x + 7. Slant Asymptote: y = 2x + 3',
    },
    {
      id: 'p3',
      category: 'Synthetic Division',
      title: 'Non-Monic Linear Divisor: (4x³ - 6x² + 8x - 5) ÷ (2x - 1)',
      dividend: '4x^3 - 6x^2 + 8x - 5',
      divisor: '2x - 1',
      targetMode: 'division',
      difficulty: 'Medium',
      hint: 'Divisor root is c = 1/2. After synthetic division, divide the quotient coefficients by 2!',
      answerSummary: 'Quotient: 2x² - 2x + 3, Remainder: -2',
    },
    {
      id: 'p4',
      category: 'Completing the Square',
      title: 'Vertex Form of a Monic Quadratic: x² - 6x + 5',
      quadratic: 'x^2 - 6x + 5',
      targetMode: 'completing_square',
      difficulty: 'Easy',
      hint: 'Half of -6 is -3. Square it to get (-3)² = 9. Add and subtract 9.',
      answerSummary: 'Vertex Form: (x - 3)² - 4. Vertex: (3, -4), Roots: x = 1, x = 5',
    },
    {
      id: 'p5',
      category: 'Completing the Square',
      title: 'Factor Out Coefficient a ≠ 1: 3x² + 12x + 7',
      quadratic: '3x^2 + 12x + 7',
      targetMode: 'completing_square',
      difficulty: 'Hard',
      hint: 'Factor out 3 from first two terms: 3(x² + 4x) + 7. Magic number is (4/2)² = 4.',
      answerSummary: 'Vertex Form: 3(x + 2)² - 5. Vertex: (-2, -5), Min Value: -5',
    },
    {
      id: 'p6',
      category: 'Completing the Square',
      title: 'Negative Leading Coefficient (Parabola Peak): -x² + 4x + 12',
      quadratic: '-x^2 + 4x + 12',
      targetMode: 'completing_square',
      difficulty: 'Medium',
      hint: 'Factor out -1: -(x² - 4x) + 12. Notice the sign of the linear term flips to -4x.',
      answerSummary: 'Vertex Form: -(x - 2)² + 16. Vertex (Max Peak): (2, 16)',
    },
  ];

  const filtered =
    activeCategory === 'All' ? problems : problems.filter((p) => p.category === activeCategory);

  const toggleHint = (id: string) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            Curated Practice Problems
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            Exam & Homework Challenge Problems
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Test yourself before viewing the full step-by-step resolution.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {['All', 'Long Division', 'Synthetic Division', 'Completing the Square'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeCategory === cat
                  ? 'bg-white text-indigo-700 shadow-2xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((prob) => {
          const isHintOpen = revealedHints[prob.id];

          return (
            <div
              key={prob.id}
              className="border border-slate-200 rounded-2xl p-5 hover:border-indigo-300 transition-all bg-white shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    {prob.category}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      prob.difficulty === 'Easy'
                        ? 'bg-emerald-100 text-emerald-800'
                        : prob.difficulty === 'Medium'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {prob.difficulty}
                  </span>
                </div>

                <h4 className="font-bold text-slate-800 text-sm sm:text-base mb-2">
                  {prob.title}
                </h4>

                {/* Problem Statement Box */}
                <div className="bg-slate-50 p-2.5 rounded-xl font-mono text-xs sm:text-sm text-slate-800 mb-3 border border-slate-200">
                  {prob.targetMode === 'division' ? (
                    <span>
                      ({prob.dividend}) ÷ ({prob.divisor})
                    </span>
                  ) : (
                    <span>f(x) = {prob.quadratic}</span>
                  )}
                </div>

                {/* Hint & Answer Accordion */}
                {isHintOpen && (
                  <div className="mt-2 p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-xs space-y-1.5 text-amber-900">
                    <div>
                      <b>Key Strategy:</b> {prob.hint}
                    </div>
                    <div className="pt-1 border-t border-amber-200 font-mono font-semibold text-slate-800">
                      Answer: {prob.answerSummary}
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => toggleHint(prob.id)}
                  className="text-xs font-semibold text-slate-600 hover:text-indigo-600 flex items-center gap-1 transition"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>{isHintOpen ? 'Hide Hint' : 'Reveal Hint & Answer'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onLoadProblem(prob)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition flex items-center gap-1"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Load into Solver</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
