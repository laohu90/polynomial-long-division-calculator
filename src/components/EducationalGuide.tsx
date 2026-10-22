import React, { useState } from 'react';
import { BookOpen, HelpCircle, ChevronDown, Check, AlertOctagon, Sparkles } from 'lucide-react';
import { Language, translations } from '../i18n/translations';

interface EducationalGuideProps {
  currentLang: Language;
}

export const EducationalGuide: React.FC<EducationalGuideProps> = ({ currentLang }) => {
  const t = translations[currentLang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is polynomial long division and when is it used?',
      a: 'Polynomial long division is an algebraic algorithm used to divide a polynomial (the dividend) by another polynomial (the divisor) of equal or lower degree. It is fundamental in Algebra 2 and Precalculus for factoring higher-degree polynomials, finding slant/oblique asymptotes, finding rational zeros, and computing partial fraction decomposition in Calculus.',
    },
    {
      q: 'Why do you flip the signs during the subtraction step?',
      a: 'In long division, you subtract the product: Dividend Line - (Quotient Term × Divisor). In algebra, subtracting an expression is mathematically identical to distributing a negative sign (-1) across every term and then adding them. Forgetting to flip the signs of every single term inside the parentheses is the #1 reason students get division homework wrong!',
    },
    {
      q: 'How do you handle missing terms (e.g. x³ - 8 divided by x - 2)?',
      a: 'Whenever a polynomial skips powers (like skipping x² and x in x³ - 8), you must insert placeholder zero coefficients: x³ + 0x² + 0x - 8. This keeps all like terms in straight vertical columns so you never accidentally subtract a constant from an x² term.',
    },
    {
      q: 'When can I use Synthetic Division instead of Polynomial Long Division?',
      a: 'Synthetic division (Ruffini\'s rule) is a shortcut that works ONLY when the divisor is linear (degree 1) in the form (x - c) or (ax + b). If your divisor is quadratic (like x² + 1) or higher, synthetic division cannot be used, and polynomial long division is mandatory.',
    },
    {
      q: 'What is Completing the Square and why is it useful?',
      a: 'Completing the square is a technique to convert a standard quadratic equation ax² + bx + c into vertex form a(x - h)² + k. It directly reveals the vertex (h, k), line of symmetry x = h, minimum or maximum value, and allows you to solve the quadratic equation without needing the quadratic formula.',
    },
    {
      q: 'How does polynomial division reveal a slant (oblique) asymptote?',
      a: 'When the degree of the numerator is exactly 1 higher than the denominator, dividing gives f(x) = mx + b + R(x)/D(x). As x approaches infinity, the fraction R(x)/D(x) shrinks to 0, meaning the curve approaches the line y = mx + b.',
    },
  ];

  return (
    <section className="mt-14 space-y-12">
      {/* GUIDE HEADER */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
          <BookOpen className="w-3.5 h-3.5" />
          Algebra 2 & Precalculus Master Guide
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
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
            1
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Divide</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Divide the first term of the current dividend by the first term of the divisor. Write this result on the top quotient bar.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
            2
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Multiply</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Multiply the new quotient term by every single term of the divisor polynomial. Write the product directly underneath the dividend.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 bg-amber-50/30 shadow-2xs hover:border-amber-400 transition-all">
          <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-bold flex items-center justify-center text-sm mb-3">
            3
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1 flex items-center gap-1.5">
            Subtract (Flip Signs)
            <span className="text-[10px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded">Vital</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Subtract the multiplied polynomial. Remember: distribute a negative sign to flip + to - and - to +, then add!
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs hover:border-indigo-300 transition-all">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold flex items-center justify-center text-sm mb-3">
            4
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Bring Down</h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Bring down the next term from the original dividend. Repeat steps 1–4 until the degree of the remainder is lower than the divisor.
          </p>
        </div>
      </div>

      {/* COMPARISON TABLE: Long Division vs Synthetic Division */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <span>Polynomial Long Division vs. Synthetic Division</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mb-6">
          Understanding when to use which method saves exam time and eliminates careless arithmetic errors.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-700 font-bold">
                <th className="p-3.5">Feature</th>
                <th className="p-3.5 text-indigo-700">Polynomial Long Division</th>
                <th className="p-3.5 text-emerald-700">Synthetic Division (Ruffini)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Applicable Divisors</td>
                <td className="p-3.5">Any degree (linear, quadratic, cubic, etc.)</td>
                <td className="p-3.5 font-semibold text-amber-700">Linear divisors ONLY (x - c or ax + b)</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Variables Written Out?</td>
                <td className="p-3.5">Yes, full variables and powers shown</td>
                <td className="p-3.5">No, only numerical coefficients</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Missing Degree Handling</td>
                <td className="p-3.5">Must insert +0xᵏ placeholders</td>
                <td className="p-3.5">Must insert 0 in coefficient row</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Slant Asymptotes</td>
                <td className="p-3.5">Supports both linear and non-linear denominators</td>
                <td className="p-3.5">Works only when denominator is degree 1</td>
              </tr>
              <tr>
                <td className="p-3.5 font-semibold text-slate-900">Speed on Paper</td>
                <td className="p-3.5">Slower, more writing, visual vertical alignment</td>
                <td className="p-3.5 font-semibold text-emerald-700">Very fast, compact 3-row grid</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* TOP 5 STUDENT MISTAKES CALLOUT */}
      <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 sm:p-8">
        <h3 className="text-lg font-bold text-rose-950 mb-3 flex items-center gap-2">
          <AlertOctagon className="w-5 h-5 text-rose-600" />
          <span>Top 4 Homework & Exam Mistakes Students Make</span>
        </h3>
        <ul className="space-y-3 text-xs sm:text-sm text-rose-900">
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-rose-700">1.</span>
            <span><b>Forgetting the parenthesis sign flip:</b> Subtracting -(2x² - 4x) becomes -2x² + 4x, not -2x² - 4x.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-rose-700">2.</span>
            <span><b>Skipping placeholder zeros:</b> If your problem has x³ - 1, forgetting +0x² + 0x will cause you to subtract constant 1 from an x term.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-rose-700">3.</span>
            <span><b>Stopping too early:</b> You must continue dividing until the degree of the remainder is strictly strictly smaller than the divisor.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="font-bold text-rose-700">4.</span>
            <span><b>Forgetting divisor coefficient 'a' in Synthetic Division:</b> When dividing by (2x - 3), synthetic division root is 3/2, but you must divide the final quotient coefficients by 2!</span>
          </li>
        </ul>
      </div>

      {/* FAQ ACCORDION SECTION */}
      <div id="faqs" className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-600" />
          <span>{t.faqTitle}</span>
        </h3>
        <p className="text-xs sm:text-sm text-slate-500 mb-6">
          Everything you need to know about polynomial division, factoring, and completing the square.
        </p>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-all"
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
