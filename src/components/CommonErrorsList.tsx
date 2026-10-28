import React from 'react';
import { translations, Language } from '../i18n/translations';
import { AlertTriangle, CheckCircle2, Lightbulb } from 'lucide-react';

interface CommonErrorsListProps {
  lang: Language;
}

export const CommonErrorsList: React.FC<CommonErrorsListProps> = ({ lang }) => {
  const t = translations[lang];

  const items = [
    { title: t.error1Title, desc: t.error1Desc },
    { title: t.error2Title, desc: t.error2Desc },
    { title: t.error3Title, desc: t.error3Desc },
    { title: t.error4Title, desc: t.error4Desc },
  ];

  return (
    <div className="w-full bg-slate-900/80 border border-amber-500/30 rounded-2xl p-4 sm:p-6 shadow-xl my-8">
      <h3 className="text-base sm:text-lg font-bold text-amber-300 flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-amber-400" />
        {t.commonErrorsTitle}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <div key={i} className="p-4 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1.5">
            <h4 className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              {item.title}
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed pl-6">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
