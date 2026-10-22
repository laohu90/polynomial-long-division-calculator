import React, { useState } from 'react';
import { Target, Eye, Play } from 'lucide-react';
import { Language, translations, PracticeProblemData } from '../i18n/translations';

interface PracticeProblemsProps {
  onLoadProblem: (problem: PracticeProblemData) => void;
  currentLang: Language;
}

export const PracticeProblems: React.FC<PracticeProblemsProps> = ({
  onLoadProblem,
  currentLang,
}) => {
  const t = translations[currentLang];
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [revealedHints, setRevealedHints] = useState<Record<string, boolean>>({});

  const problems = t.practiceProblems;

  const categories = [
    'All',
    ...Array.from(new Set(problems.map((p) => p.category))),
  ];

  const filtered =
    activeCategory === 'All' ? problems : problems.filter((p) => p.category === activeCategory);

  const toggleHint = (id: string) => {
    setRevealedHints((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-indigo-600" />
            {currentLang === 'zh'
              ? '精选典型题库'
              : currentLang === 'es'
              ? 'Ejercicios Prácticos Seleccionados'
              : currentLang === 'fr'
              ? 'Exercices Types Sélectionnés'
              : currentLang === 'pt'
              ? 'Exercícios Práticos Selecionados'
              : 'Curated Practice Problems'}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
            {t.presetsTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {currentLang === 'zh'
              ? '先在草稿纸上动手计算，再点击查看提示或一键载入解题器验证！'
              : 'Test your skills on paper first, then check hints or load directly into the step-by-step solver.'}
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
          {categories.map((cat) => (
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
              {cat === 'All' ? (currentLang === 'zh' ? '全部' : 'All') : cat}
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
                      <b>{currentLang === 'zh' ? '解题锦囊：' : 'Key Strategy: '}</b> {prob.hint}
                    </div>
                    <div className="pt-1 border-t border-amber-200 font-mono font-semibold text-slate-800">
                      {currentLang === 'zh' ? '参考答案：' : 'Answer: '} {prob.answerSummary}
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
                  <span>
                    {isHintOpen
                      ? currentLang === 'zh'
                        ? '收起提示'
                        : 'Hide Hint'
                      : currentLang === 'zh'
                      ? '查看提示与速算结果'
                      : 'Reveal Hint & Answer'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => onLoadProblem(prob)}
                  className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-lg transition flex items-center gap-1 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>
                    {currentLang === 'zh'
                      ? '载入求解器演算'
                      : currentLang === 'es'
                      ? 'Cargar en Calculadora'
                      : currentLang === 'fr'
                      ? 'Résoudre pas à pas'
                      : currentLang === 'pt'
                      ? 'Carregar no Solucionador'
                      : 'Load into Solver'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
