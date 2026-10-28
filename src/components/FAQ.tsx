import React, { useState } from 'react';
import { translations, Language } from '../i18n/translations';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQProps {
  lang: Language;
}

export const FAQ: React.FC<FAQProps> = ({ lang }) => {
  const t = translations[lang];
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: t.faq1Q, a: t.faq1A },
    { q: t.faq2Q, a: t.faq2A },
    { q: t.faq3Q, a: t.faq3A },
    { q: t.faq4Q, a: t.faq4A },
  ];

  return (
    <div className="w-full bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-4 sm:p-6 shadow-xl my-8">
      <h3 className="text-base sm:text-lg font-bold text-indigo-300 flex items-center gap-2 mb-4">
        <HelpCircle className="w-5 h-5 text-indigo-400" />
        {t.faqTitle}
      </h3>

      <div className="space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-slate-200 hover:text-white flex items-center justify-between gap-3 transition"
              >
                <span>{faq.q}</span>
                {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-400 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />}
              </button>

              {isOpen && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-900 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
