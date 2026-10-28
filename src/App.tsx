import React, { useState, useEffect } from 'react';
import { Polynomial, performLongDivision, performCompletingSquare, LongDivisionResult, CompletingSquareResult } from './math/Polynomial';
import { LongDivisionSolver } from './components/LongDivisionSolver';
import { CompletingSquareSolver } from './components/CompletingSquareSolver';
import { MathKeyboard } from './components/MathKeyboard';
import { CommonErrorsList } from './components/CommonErrorsList';
import { FAQ } from './components/FAQ';
import { translations, Language } from './i18n/translations';
import { copyToClipboard } from './utils/clipboard';
import {
  Calculator,
  Grid,
  Globe,
  Keyboard as KeyboardIcon,
  AlertCircle,
  Sparkles,
  Link as LinkIcon,
  Check,
  HelpCircle,
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [activeTool, setActiveTool] = useState<'long-division' | 'completing-the-square'>('long-division');

  // Long Division Inputs
  const [dividendInput, setDividendInput] = useState('2x³ - x² - 7x + 2');
  const [divisorInput, setDivisorInput] = useState('x - 2');

  // Completing Square Input
  const [quadraticInput, setQuadraticInput] = useState('3x² + 12x + 7');

  // Focused Input Field Tracker for Soft Keyboard
  const [focusedInput, setFocusedInput] = useState<'dividend' | 'divisor' | 'quadratic'>('dividend');
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Calculation Results
  const [divisionResult, setDivisionResult] = useState<LongDivisionResult | null>(null);
  const [squareResult, setSquareResult] = useState<CompletingSquareResult | null>(null);

  // Error & Status State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [shareToast, setShareToast] = useState<string | null>(null);

  const t = translations[lang];

  // 1. Initial State Restoration from URL search params & hash (Fixing Issue #1!)
  useEffect(() => {
    const parseUrlParams = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash.replace('#', '');

      const toolParam = searchParams.get('tool') || hash;
      const pParam = searchParams.get('p');
      const dParam = searchParams.get('d');

      if (toolParam === 'completing-the-square') {
        setActiveTool('completing-the-square');
        document.title = 'Completing the Square Calculator with Steps & Graph | Math Suite';
        if (pParam) {
          setQuadraticInput(pParam);
        }
      } else {
        setActiveTool('long-division');
        document.title = 'Polynomial Long Division Calculator with Steps & Ruffini | Math Suite';
        if (pParam) setDividendInput(pParam);
        if (dParam) setDivisorInput(dParam);
      }
    };

    parseUrlParams();
  }, []);

  // 2. Synchronize URL query search parameters whenever inputs or tool state changes (Fixing Issue #1!)
  useEffect(() => {
    const searchParams = new URLSearchParams();
    searchParams.set('tool', activeTool);

    if (activeTool === 'long-division') {
      if (dividendInput.trim()) searchParams.set('p', dividendInput.trim());
      if (divisorInput.trim()) searchParams.set('d', divisorInput.trim());
    } else {
      if (quadraticInput.trim()) searchParams.set('p', quadraticInput.trim());
    }

    const newUrl = `${window.location.pathname}?${searchParams.toString()}#${activeTool}`;
    window.history.replaceState(null, '', newUrl);
  }, [activeTool, dividendInput, divisorInput, quadraticInput]);

  const switchTool = (tool: 'long-division' | 'completing-the-square') => {
    setActiveTool(tool);
    setErrorMessage(null);

    if (tool === 'completing-the-square') {
      document.title = 'Completing the Square Calculator with Steps & Graph | Math Suite';
    } else {
      document.title = 'Polynomial Long Division Calculator with Steps & Ruffini | Math Suite';
    }
  };

  // Perform calculation automatically or on demand
  const handleCalculate = () => {
    setErrorMessage(null);

    if (activeTool === 'long-division') {
      if (!dividendInput.trim() || !divisorInput.trim()) {
        setDivisionResult(null);
        return;
      }

      try {
        const dividend = Polynomial.parse(dividendInput);
        const divisor = Polynomial.parse(divisorInput);

        // Divisor zero check (Fixing Issue #3)
        if (divisor.isZero()) {
          throw new Error(
            lang === 'zh'
              ? '除法运算错误：除式不能为 0 (除以 0 在数学上未定义)。'
              : 'Division by zero is undefined. The divisor polynomial cannot be 0.'
          );
        }

        const res = performLongDivision(dividend, divisor);
        setDivisionResult(res);
      } catch (err: any) {
        setDivisionResult(null);
        setErrorMessage(
          err?.message || (lang === 'zh' ? '输入数据解析错误，请检查输入表达式。' : 'Error parsing input expression. Please check format.')
        );
      }
    } else {
      if (!quadraticInput.trim()) {
        setSquareResult(null);
        return;
      }

      try {
        const poly = Polynomial.parse(quadraticInput);
        const res = performCompletingSquare(poly);
        setSquareResult(res);
      } catch (err: any) {
        setSquareResult(null);
        setErrorMessage(
          err?.message || (lang === 'zh' ? '输入数据解析错误，请检查输入表达式。' : 'Error parsing input expression. Please check format.')
        );
      }
    }
  };

  // Recalculate on input changes
  useEffect(() => {
    handleCalculate();
  }, [dividendInput, divisorInput, quadraticInput, activeTool, lang]);

  // Insert value into current focused input field via soft keyboard
  const handleKeyboardInsert = (val: string) => {
    if (focusedInput === 'dividend') {
      setDividendInput(prev => prev + val);
    } else if (focusedInput === 'divisor') {
      setDivisorInput(prev => prev + val);
    } else {
      setQuadraticInput(prev => prev + val);
    }
  };

  const handleKeyboardDelete = () => {
    if (focusedInput === 'dividend') {
      setDividendInput(prev => prev.slice(0, -1));
    } else if (focusedInput === 'divisor') {
      setDivisorInput(prev => prev.slice(0, -1));
    } else {
      setQuadraticInput(prev => prev.slice(0, -1));
    }
  };

  const handleKeyboardClear = () => {
    if (focusedInput === 'dividend') {
      setDividendInput('');
    } else if (focusedInput === 'divisor') {
      setDivisorInput('');
    } else {
      setQuadraticInput('');
    }
  };

  // Fix Issue #1: Copy Share Link containing exact P(x) & D(x) query parameters!
  const handleShareLink = async () => {
    const fullShareUrl = window.location.href;
    const ok = await copyToClipboard(fullShareUrl);
    if (ok) {
      setShareToast(lang === 'zh' ? '包含当前多项式的分享链接已复制！' : 'Share link with current polynomial copied!');
    } else {
      setShareToast(t.copyFailed);
    }
    setTimeout(() => setShareToast(null), 3000);
  };

  // Preset Handlers
  const presetsLongDivision = [
    { label: '(2x³−x²−7x+2) ÷ (x−2)', dividend: '2x³ - x² - 7x + 2', divisor: 'x - 2' },
    { label: '(x⁴−1) ÷ (x−1)', dividend: 'x⁴ - 1', divisor: 'x - 1' },
    { label: '(x⁶−1) ÷ (x²+x+1)', dividend: 'x⁶ - 1', divisor: 'x² + x + 1' },
    { label: '(2x³+3x²−x+4) ÷ (x²−1)', dividend: '2x³ + 3x² - x + 4', divisor: 'x² - 1' },
    { label: '(x²+1) ÷ (2x−3)', dividend: 'x² + 1', divisor: '2x - 3' },
  ];

  const presetsCompletingSquare = [
    { label: '3x² + 12x + 7', val: '3x² + 12x + 7' },
    { label: '-2x² + 8x - 5', val: '-2x² + 8x - 5' },
    { label: 'x² - 6x + 5', val: 'x² - 6x + 5' },
    { label: '2x² - 4x + 10', val: '2x² - 4x + 10' },
  ];

  const isInputEmpty =
    activeTool === 'long-division'
      ? !dividendInput.trim() || !divisorInput.trim()
      : !quadraticInput.trim();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Header Bar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                {t.siteTitle}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">{t.tagline}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share link button */}
            <button
              onClick={handleShareLink}
              className="p-2 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl border border-slate-700/80 transition active:scale-95"
              title={t.copyUrl}
            >
              <LinkIcon className="w-4 h-4" />
            </button>

            {/* Soft Keyboard Toggle Button */}
            <button
              onClick={() => setShowKeyboard(!showKeyboard)}
              className={`p-2 rounded-xl border transition active:scale-95 flex items-center gap-1.5 text-xs font-semibold ${
                showKeyboard
                  ? 'bg-indigo-600 text-white border-indigo-500'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700/80'
              }`}
              title={t.keyboardTitle}
            >
              <KeyboardIcon className="w-4 h-4" />
              <span className="hidden md:inline">{t.keyboardTitle}</span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'zh' : 'en')}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-semibold transition flex items-center gap-1.5 active:scale-95"
            >
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.languageSwitch}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Tool Switcher Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1.5 bg-slate-900 border border-slate-800 rounded-2xl shadow-inner max-w-full overflow-x-auto">
            <button
              onClick={() => switchTool('long-division')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTool === 'long-division'
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Calculator className="w-4 h-4" />
              {t.toolLongDivision}
            </button>

            <button
              onClick={() => switchTool('completing-the-square')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 whitespace-nowrap ${
                activeTool === 'completing-the-square'
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-4 h-4" />
              {t.toolCompletingSquare}
            </button>
          </div>
        </div>

        {/* Share Link Toast */}
        {shareToast && (
          <div role="alert" aria-live="assertive" className="mb-4 p-3 bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 text-xs rounded-xl flex items-center gap-2 shadow-lg animate-fade-in">
            <Check className="w-4 h-4 text-indigo-400 shrink-0" />
            <span>{shareToast}</span>
          </div>
        )}

        {/* Input Form Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl mb-8">
          <h2 className="text-lg font-bold text-white mb-1">
            {activeTool === 'long-division' ? t.longDivisionTitle : t.completingSquareTitle}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-6">
            {activeTool === 'long-division' ? t.longDivisionDesc : t.completingSquareDesc}
          </p>

          {activeTool === 'long-division' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.dividendLabel}
                  </label>
                  <input
                    type="text"
                    value={dividendInput}
                    onChange={e => setDividendInput(e.target.value)}
                    onFocus={() => setFocusedInput('dividend')}
                    placeholder={t.dividendPlaceholder}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {t.divisorLabel}
                  </label>
                  <input
                    type="text"
                    value={divisorInput}
                    onChange={e => setDivisorInput(e.target.value)}
                    onFocus={() => setFocusedInput('divisor')}
                    placeholder={t.divisorPlaceholder}
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              {/* Quick Presets for Long Division */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-400 mr-2 block sm:inline mb-1.5 sm:mb-0">
                  {t.exampleLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetsLongDivision.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setDividendInput(p.dividend);
                        setDivisorInput(p.divisor);
                      }}
                      className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-indigo-300 font-mono text-xs rounded-lg border border-slate-700/60 transition active:scale-95"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {t.quadraticLabel}
                </label>
                <input
                  type="text"
                  value={quadraticInput}
                  onChange={e => setQuadraticInput(e.target.value)}
                  onFocus={() => setFocusedInput('quadratic')}
                  placeholder={t.quadraticPlaceholder}
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700/80 rounded-xl text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                />
              </div>

              {/* Quick Presets for Completing Square */}
              <div className="pt-2">
                <span className="text-xs font-semibold text-slate-400 mr-2 block sm:inline mb-1.5 sm:mb-0">
                  {t.exampleLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {presetsCompletingSquare.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setQuadraticInput(p.val)}
                      className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-emerald-300 font-mono text-xs rounded-lg border border-slate-700/60 transition active:scale-95"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Optional Math Soft Keyboard */}
          {showKeyboard && (
            <div className="mt-4">
              <MathKeyboard
                onInsert={handleKeyboardInsert}
                onDelete={handleKeyboardDelete}
                onClear={handleKeyboardClear}
                lang={lang}
              />
            </div>
          )}
        </div>

        {/* Accessibility Error Alert Banner (Fixing Issue #3 & #8) */}
        {errorMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-8 p-4 bg-red-950/90 border border-red-500/50 text-red-200 text-xs sm:text-sm rounded-2xl shadow-xl flex items-start gap-3 animate-shake"
          >
            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h3 className="font-bold text-red-300">{t.errorAlertTitle}</h3>
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Empty Input Guidance Box (Fixing Issue #4!) */}
        {isInputEmpty && !errorMessage && (
          <div
            role="status"
            aria-live="polite"
            className="mb-8 p-6 bg-slate-900/60 border border-dashed border-slate-700 rounded-2xl text-center shadow-lg"
          >
            <HelpCircle className="w-8 h-8 text-indigo-400 mx-auto mb-2 opacity-80" />
            <h3 className="text-sm sm:text-base font-bold text-slate-200 mb-1">
              {lang === 'zh' ? '请输入多项式进行计算' : 'Please Enter a Polynomial Expression'}
            </h3>
            <p className="text-xs text-slate-400 mb-4 max-w-md mx-auto leading-relaxed">
              {lang === 'zh'
                ? '在上方输入框中填入多项式表达式，或点击下方按钮载入经典求解例题。'
                : 'Type a polynomial expression into the input field above, or click below to load a sample problem.'}
            </p>
            <button
              onClick={() => {
                if (activeTool === 'long-division') {
                  setDividendInput('2x³ - x² - 7x + 2');
                  setDivisorInput('x - 2');
                } else {
                  setQuadraticInput('3x² + 12x + 7');
                }
              }}
              className="px-4 py-2 bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold rounded-xl transition shadow-md active:scale-95"
            >
              {lang === 'zh' ? '载入默认例题' : 'Load Default Example'}
            </button>
          </div>
        )}

        {/* Solver Output View */}
        {activeTool === 'long-division' && divisionResult ? (
          <LongDivisionSolver result={divisionResult} lang={lang} />
        ) : null}

        {activeTool === 'completing-the-square' && squareResult ? (
          <CompletingSquareSolver result={squareResult} lang={lang} />
        ) : null}

        {/* Educational Content & FAQs */}
        <CommonErrorsList lang={lang} />
        <FAQ lang={lang} />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} Polynomial Math Suite — High Precision Division & Completing the Square Solver.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => switchTool('long-division')}
              className="hover:text-slate-300 transition"
            >
              Long Division
            </button>
            <button
              onClick={() => switchTool('completing-the-square')}
              className="hover:text-slate-300 transition"
            >
              Completing the Square
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
