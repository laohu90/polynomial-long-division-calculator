import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, AlertOctagon } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface EducationalGuideProps {
  currentLang: Language;
}

export const EducationalGuide: React.FC<EducationalGuideProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="mt-14 space-y-12">
      {/* GUIDE HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          <BookOpen className="w-3.5 h-3.5" />
          {currentLang === 'zh'
            ? '高中代数与微积分先修权威指南'
            : currentLang === 'es'
            ? 'Guía Completa de Álgebra y Precálculo'
            : currentLang === 'fr'
            ? 'Guide Complet du Second Degré et Polynômes'
            : currentLang === 'pt'
            ? 'Guia Definitivo de Álgebra e Pré-Cálculo'
            : 'Algebra 2 & Precalculus Master Guide'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 tracking-tight">
          {t.eduTitle}
        </h2>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          {t.eduSubtitle}
        </p>
      </div>

      {/* 4 CORE STEPS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {t.rules.map((rule, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-2xl border shadow-2xs transition-all ${
              idx === 2
                ? 'bg-amber-50/40 border-amber-200 hover:border-amber-400'
                : 'bg-white border-slate-200 hover:border-indigo-300'
            }`}
          >
            <div
              className={`w-8 h-8 rounded-lg font-bold flex items-center justify-center text-sm mb-3 ${
                idx === 2 ? 'bg-amber-600 text-white' : 'bg-indigo-600 text-white'
              }`}
            >
              {idx + 1}
            </div>
            <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-1.5">
              <span>{rule.title}</span>
              {idx === 2 && (
                <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">
                  {currentLang === 'zh' ? '易错重点' : 'Vital'}
                </span>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {rule.desc}
            </p>
          </div>
        ))}
      </div>

      {/* COMPARISON TABLE: Long Division vs Synthetic Division */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>{t.comparisonTable.headers[1]} vs. {t.comparisonTable.headers[2]}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          {currentLang === 'zh'
            ? '精准辨析适用场景，告别考试失分与冗长计算。'
            : 'Understanding when to use which method saves exam time and eliminates arithmetic errors.'}
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="p-3.5">{t.comparisonTable.headers[0]}</th>
                <th className="p-3.5 text-indigo-700">{t.comparisonTable.headers[1]}</th>
                <th className="p-3.5 text-emerald-700">{t.comparisonTable.headers[2]}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              {t.comparisonTable.rows.map((row, rIdx) => (
                <tr key={rIdx}>
                  <td className="p-3.5 font-semibold text-slate-900">{row[0]}</td>
                  <td className="p-3.5">{row[1]}</td>
                  <td className="p-3.5 font-semibold text-amber-700">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TOP 4 STUDENT MISTAKES CALLOUT */}
      <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-5 sm:p-7">
        <h3 className="text-lg font-bold text-rose-950 mb-3 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-rose-600" />
          <span>{t.studentMistakes.title}</span>
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm text-rose-900">
          {t.studentMistakes.items.map((item, iIdx) => (
            <li key={iIdx} className="flex items-start gap-2.5">
              <span className="font-bold text-rose-700">{iIdx + 1}.</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ ACCORDION SECTION */}
      <div id="faqs" className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 shadow-xs">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          <span>{t.faqTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          {currentLang === 'zh'
            ? '针对高中代数与微积分先修的搜索高频疑难解析'
            : 'Clear answers to common questions about polynomial long division and factoring.'}
        </p>

        <div className="space-y-3">
          {t.faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-800 text-sm sm:text-base hover:bg-slate-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-indigo-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
