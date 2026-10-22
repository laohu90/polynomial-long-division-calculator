import React from 'react';
import { Delete, Eraser, X } from 'lucide-react';

interface MathKeypadProps {
  onInsert: (value: string) => void;
  onBackspace: () => void;
  onClear: () => void;
  onClose: () => void;
}

export const MathKeypad: React.FC<MathKeypadProps> = ({
  onInsert,
  onBackspace,
  onClear,
  onClose,
}) => {
  const keys = [
    { label: 'x', value: 'x', primary: true },
    { label: 'x²', value: 'x^2', primary: true },
    { label: 'x³', value: 'x^3', primary: true },
    { label: 'x⁴', value: 'x^4', primary: true },
    { label: 'xⁿ', value: 'x^' },

    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
    { label: '+', value: ' + ', op: true },
    { label: '−', value: ' - ', op: true },

    { label: '4', value: '4' },
    { label: '5', value: '5' },
    { label: '6', value: '6' },
    { label: '(', value: '(' },
    { label: ')', value: ')' },

    { label: '1', value: '1' },
    { label: '2', value: '2' },
    { label: '3', value: '3' },
    { label: '/', value: '/' },
    { label: '^', value: '^' },

    { label: '0', value: '0' },
    { label: '.', value: '.' },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 shadow-md">
      <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200 text-xs font-semibold text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Quick Math Keypad
        </span>
        <button
          onClick={onClose}
          type="button"
          className="text-slate-400 hover:text-slate-600 p-0.5 rounded transition"
          aria-label="Close keypad"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        {keys.map((k, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onInsert(k.value)}
            className={`h-10 sm:h-11 rounded-lg text-sm sm:text-base font-semibold flex items-center justify-center transition-all active:scale-95 shadow-xs ${
              k.primary
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : k.op
                ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-200'
                : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
            }`}
          >
            {k.label}
          </button>
        ))}

        <button
          type="button"
          onClick={onBackspace}
          className="h-10 sm:h-11 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-sm font-semibold flex items-center justify-center transition-all active:scale-95 shadow-xs"
          title="Backspace"
        >
          <Delete className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onClear}
          className="h-10 sm:h-11 col-span-2 bg-slate-200 text-slate-700 hover:bg-slate-300 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 transition-all active:scale-95 shadow-xs"
          title="Clear Input"
        >
          <Eraser className="w-3.5 h-3.5" /> Clear
        </button>
      </div>
    </div>
  );
};
