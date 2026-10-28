import React from 'react';
import { Delete, RotateCcw } from 'lucide-react';

interface MathKeyboardProps {
  onInsert: (val: string) => void;
  onDelete: () => void;
  onClear: () => void;
  lang: 'en' | 'zh';
}

export const MathKeyboard: React.FC<MathKeyboardProps> = ({ onInsert, onDelete, onClear, lang }) => {
  const keys = [
    { label: 'x', value: 'x', aria: 'variable x' },
    { label: 'x²', value: 'x²', aria: 'x squared' },
    { label: 'x³', value: 'x³', aria: 'x cubed' },
    { label: '^', value: '^', aria: 'exponent power' },
    { label: '(', value: '(', aria: 'open parenthesis' },
    { label: ')', value: ')', aria: 'close parenthesis' },
    { label: '+', value: '+', aria: 'plus' },
    { label: '-', value: '-', aria: 'minus' },
    { label: '*', value: '*', aria: 'multiply' },
    { label: '/', value: '/', aria: 'divide or fraction' },
  ];

  const numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

  return (
    <div className="bg-slate-800/80 border border-slate-700/80 rounded-xl p-3 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {lang === 'zh' ? '数学输入助手' : 'Math Keyboard'}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onDelete}
            title={lang === 'zh' ? '退格' : 'Backspace'}
            className="p-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-700/60 hover:bg-slate-600 rounded-lg transition active:scale-95"
            aria-label="Backspace"
          >
            <Delete className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={onClear}
            title={lang === 'zh' ? '清空' : 'Clear'}
            className="p-1.5 text-xs font-medium text-red-400 hover:text-red-300 bg-red-950/30 hover:bg-red-900/40 border border-red-800/40 rounded-lg transition active:scale-95 flex items-center gap-1"
            aria-label="Clear all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="text-[11px]">{lang === 'zh' ? '清空' : 'Clear'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-1.5 mb-2">
        {keys.map(k => (
          <button
            key={k.label}
            type="button"
            onClick={() => onInsert(k.value)}
            className="py-1.5 px-2 bg-slate-700/50 hover:bg-indigo-600/80 hover:text-white text-indigo-300 font-mono font-medium text-sm rounded-lg border border-slate-600/40 transition active:scale-95 flex items-center justify-center"
            aria-label={k.aria}
          >
            {k.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {numbers.map(num => (
          <button
            key={num}
            type="button"
            onClick={() => onInsert(num)}
            className="py-1.5 px-2 bg-slate-900/60 hover:bg-slate-700 text-slate-200 font-mono font-medium text-sm rounded-lg border border-slate-700/60 transition active:scale-95 flex items-center justify-center"
            aria-label={`number ${num}`}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  );
};
