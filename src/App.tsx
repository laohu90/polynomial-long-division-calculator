/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  Sparkles,
  Copy,
  Check,
  Printer,
  Keyboard,
  Globe,
  Share2,
  BookOpen,
  HelpCircle,
  Code2,
  SquareFunction,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  Target,
} from 'lucide-react';
import { Polynomial } from './math/polynomial';
import { performPolynomialLongDivision, LongDivisionResult } from './math/longDivision';
import { performSyntheticDivision, SyntheticDivisionResult } from './math/syntheticDivision';
import { performCompletingTheSquare, CompletingTheSquareResult } from './math/completingTheSquare';
import { Language, translations } from './i18n/translations';
import { BusStopBracket } from './components/BusStopBracket';
import { SyntheticDivisionView } from './components/SyntheticDivisionView';
import { CompletingTheSquareView } from './components/CompletingTheSquareView';
import { VerificationView } from './components/VerificationView';
import { StepByStepExplanation } from './components/StepByStepExplanation';
import { SlantAsymptoteView } from './components/SlantAsymptoteView';
import { MathKeypad } from './components/MathKeypad';
import { EducationalGuide } from './components/EducationalGuide';
import { PracticeProblems } from './components/PracticeProblems';

export default function App() {
  // Localization
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  // Dynamically update document title, meta description, and html lang attribute for Google SEO
  useEffect(() => {
    document.documentElement.lang = lang;
    const titles: Record<Language, string> = {
      en: 'Polynomial Long Division Calculator with Steps | Free Step-by-Step Solver',
      es: 'Calculadora de División de Polinomios Paso a Paso | PolyMath Pro',
      fr: 'Calculatrice de Division Polynomiale avec Étapes | PolyMath Pro',
      pt: 'Calculadora de Divisão de Polinômios Passo a Passo | PolyMath Pro',
      zh: '多项式长除法计算器 带步骤与配方法拆解过程 | PolyMath Pro',
    };
    const descriptions: Record<Language, string> = {
      en: 'Free step-by-step polynomial long division, synthetic division, and completing the square calculator with US bus-stop bracket view and verification.',
      es: 'Calculadora gratuita paso a paso de división de polinomios y método de completar el cuadrado con formato tradicional de galera.',
      fr: 'Calculatrice gratuite étape par étape pour la division euclidienne de polynômes et la forme canonique.',
      pt: 'Calculadora passo a passo de divisão de polinômios pelo método da chave e dispositivo de Briot-Ruffini.',
      zh: '高中代数与微积分先修神器！提供经典竖式排版、变号相减高亮、缺失项补零、综合除法与配方法拆解全套步骤。',
    };

    document.title = titles[lang] || titles.en;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', descriptions[lang] || descriptions.en);
    }
  }, [lang]);

  // Mode: 'division' or 'completing_square'
  const [mode, setMode] = useState<'division' | 'completing_square'>('division');

  // Input states
  const [dividendInput, setDividendInput] = useState<string>('2x^3 - x^2 - 7x + 2');
  const [divisorInput, setDivisorInput] = useState<string>('x - 2');
  const [quadraticInput, setQuadraticInput] = useState<string>('2x^2 + 8x - 10');

  // Active input focus for virtual keypad
  const [activeInput, setActiveInput] = useState<'dividend' | 'divisor' | 'quadratic'>('dividend');
  const [showKeypad, setShowKeypad] = useState<boolean>(false);
  const [showPadding, setShowPadding] = useState<boolean>(true);

  // Stepper state for Long Division
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showAllSteps, setShowAllSteps] = useState<boolean>(true);

  // Active Tab in Division Result
  const [activeDivisionTab, setActiveDivisionTab] = useState<
    'busstop' | 'steps' | 'synthetic' | 'verification' | 'asymptote'
  >('busstop');

  // Copy notice feedback
  const [copiedType, setCopiedType] = useState<'markdown' | 'latex' | null>(null);

  // Calculation Results
  const [divisionResult, setDivisionResult] = useState<LongDivisionResult | null>(null);
  const [syntheticResult, setSyntheticResult] = useState<SyntheticDivisionResult | null>(null);
  const [completingSquareResult, setCompletingSquareResult] =
    useState<CompletingTheSquareResult | null>(null);
  const [calcError, setCalcError] = useState<string | null>(null);

  // Calculate division
  const handleCalculateDivision = (customDividend?: string, customDivisor?: string) => {
    try {
      setCalcError(null);
      const dInput = customDividend !== undefined ? customDividend : dividendInput;
      const dvrInput = customDivisor !== undefined ? customDivisor : divisorInput;

      const dividendPoly = Polynomial.parse(dInput);
      const divisorPoly = Polynomial.parse(dvrInput, dividendPoly.variable);

      if (divisorPoly.isZero()) {
        setCalcError('Divisor cannot be zero! Division by zero is undefined.');
        return;
      }

      const res = performPolynomialLongDivision(dividendPoly, divisorPoly);
      setDivisionResult(res);

      // Perform synthetic division if divisor is linear
      const syn = performSyntheticDivision(dividendPoly, divisorPoly);
      setSyntheticResult(syn);

      // Reset step index
      setCurrentStepIndex(0);
      setShowAllSteps(true);
    } catch (err: any) {
      setCalcError(err.message || 'Invalid polynomial syntax. Please check exponents and signs.');
    }
  };

  // Calculate Completing the Square
  const handleCalculateCompletingSquare = (customQuadratic?: string) => {
    try {
      setCalcError(null);
      const qInput = customQuadratic !== undefined ? customQuadratic : quadraticInput;
      const poly = Polynomial.parse(qInput);
      const res = performCompletingTheSquare(poly);
      setCompletingSquareResult(res);
    } catch (err: any) {
      setCalcError(
        err.message ||
          'Please enter a valid quadratic polynomial with degree 2 (e.g. 2x^2 + 8x - 10).'
      );
    }
  };

  // Run initial calculation on mount
  useEffect(() => {
    handleCalculateDivision();
    handleCalculateCompletingSquare();
  }, []);

  // Presets for quick practice
  const divisionPresets = [
    {
      title: 'High School Classic (x - 2)',
      dividend: '2x^3 - x^2 - 7x + 2',
      divisor: 'x - 2',
    },
    {
      title: 'Missing Degree Gap (x⁴ - 16)',
      dividend: 'x^4 - 16',
      divisor: 'x - 2',
    },
    {
      title: 'Precalculus Slant Asymptote',
      dividend: '3x^3 + 2x^2 - x + 5',
      divisor: 'x^2 + 1',
    },
    {
      title: 'Non-Monic Divisor (2x - 3)',
      dividend: '4x^3 - 6x^2 + 2x - 1',
      divisor: '2x - 3',
    },
    {
      title: 'Quadratic Divisor (x² - 3x + 2)',
      dividend: 'x^4 - 2x^3 + 3x^2 - 4x + 5',
      divisor: 'x^2 - 3x + 2',
    },
  ];

  const quadraticPresets = [
    { title: 'Standard (a = 2)', formula: '2x^2 + 8x - 10' },
    { title: 'Monic Quadratic', formula: 'x^2 - 6x + 5' },
    { title: 'Fractional Half (Odd b)', formula: 'x^2 + 5x + 3' },
    { title: 'Negative Parabola (Max)', formula: '-x^2 + 4x + 12' },
    { title: 'Complex Roots', formula: 'x^2 + 2x + 5' },
  ];

  // Keypad insert handlers
  const handleKeypadInsert = (val: string) => {
    if (mode === 'division') {
      if (activeInput === 'dividend') {
        setDividendInput((prev) => prev + val);
      } else {
        setDivisorInput((prev) => prev + val);
      }
    } else {
      setQuadraticInput((prev) => prev + val);
    }
  };

  const handleKeypadBackspace = () => {
    if (mode === 'division') {
      if (activeInput === 'dividend') {
        setDividendInput((prev) => prev.slice(0, -1));
      } else {
        setDivisorInput((prev) => prev.slice(0, -1));
      }
    } else {
      setQuadraticInput((prev) => prev.slice(0, -1));
    }
  };

  const handleKeypadClear = () => {
    if (mode === 'division') {
      if (activeInput === 'dividend') {
        setDividendInput('');
      } else {
        setDivisorInput('');
      }
    } else {
      setQuadraticInput('');
    }
  };

  // Copy solution to clipboard
  const handleCopyMarkdown = () => {
    if (mode === 'division' && divisionResult) {
      let md = `## Polynomial Long Division Solution\n\n`;
      md += `**Problem:** (${divisionResult.dividend.toString()}) ÷ (${divisionResult.divisor.toString()})\n\n`;
      md += `**Quotient:** \`${divisionResult.quotient.toString()}\`\n`;
      md += `**Remainder:** \`${divisionResult.remainder.toString()}\`\n\n`;
      md += `**Division Algorithm Form:**\n`;
      md += `$$(${divisionResult.dividend.toString()}) = (${divisionResult.divisor.toString()}) \\cdot (${divisionResult.quotient.toString()}) + (${divisionResult.remainder.toString()})$$\n\n`;
      md += `### Step-by-Step Breakdown:\n`;
      divisionResult.steps.forEach((s) => {
        md += `1. **Step ${s.stepNumber}:** Divide leading term -> ${s.explanation.divide}\n`;
        md += `   - Multiply: ${s.explanation.multiply}\n`;
        md += `   - Subtract & Flip Signs: ${s.explanation.subtract}\n`;
        if (s.broughtDownTerm) md += `   - Bring Down: ${s.explanation.bringDown}\n`;
      });
      navigator.clipboard.writeText(md);
      setCopiedType('markdown');
      setTimeout(() => setCopiedType(null), 2500);
    } else if (mode === 'completing_square' && completingSquareResult) {
      let md = `## Completing the Square Solution\n\n`;
      md += `**Original Standard Form:** \`f(x) = ${completingSquareResult.standardForm}\`\n`;
      md += `**Vertex Form:** \`${completingSquareResult.vertexForm}\`\n`;
      md += `**Vertex:** \`(${completingSquareResult.vertex.hDisplay}, ${completingSquareResult.vertex.kDisplay})\`\n`;
      md += `**Axis of Symmetry:** \`${completingSquareResult.axisOfSymmetry}\`\n`;
      md += `**Roots:** \`${completingSquareResult.roots.display}\`\n\n`;
      md += `### Step-by-Step Steps:\n`;
      completingSquareResult.steps.forEach((st) => {
        md += `1. **Step ${st.stepNumber} (${st.title}):** ${st.expression}\n   - ${st.description}\n`;
      });
      navigator.clipboard.writeText(md);
      setCopiedType('markdown');
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handleCopyLatex = () => {
    if (mode === 'division' && divisionResult) {
      const latex = `\\frac{${divisionResult.dividend.toString()}}{${divisionResult.divisor.toString()}} = ${divisionResult.quotient.toString()} + \\frac{${divisionResult.remainder.toString()}}{${divisionResult.divisor.toString()}}`;
      navigator.clipboard.writeText(latex);
      setCopiedType('latex');
      setTimeout(() => setCopiedType(null), 2500);
    } else if (mode === 'completing_square' && completingSquareResult) {
      const latex = `f(x) = ${completingSquareResult.vertexForm}`;
      navigator.clipboard.writeText(latex);
      setCopiedType('latex');
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLoadPracticeProblem = (prob: any) => {
    if (prob.targetMode === 'division') {
      setMode('division');
      setDividendInput(prob.dividend);
      setDivisorInput(prob.divisor);
      handleCalculateDivision(prob.dividend, prob.divisor);
    } else {
      setMode('completing_square');
      setQuadraticInput(prob.quadratic);
      handleCalculateCompletingSquare(prob.quadratic);
    }
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      {/* TOP HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 backdrop-blur-md bg-white/95">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-800 flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight flex items-center gap-1.5">
                PolyMath <span className="text-indigo-600 font-semibold text-xs px-2 py-0.5 rounded-md bg-indigo-50 border border-indigo-100">PRO</span>
              </span>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Algebra 2 & Precalculus Step-by-Step Solver
              </p>
            </div>
          </div>

          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs sm:text-sm font-semibold">
            <button
              onClick={() => {
                setMode('division');
                setActiveInput('dividend');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                mode === 'division'
                  ? 'bg-white text-indigo-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.navDivision}</span>
            </button>
            <button
              onClick={() => {
                setMode('completing_square');
                setActiveInput('quadratic');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                mode === 'completing_square'
                  ? 'bg-white text-emerald-700 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <SquareFunction className="w-3.5 h-3.5" />
              <span>{t.navCompleteSquare}</span>
            </button>
          </div>

          {/* Right Actions: Language Picker & Guide Link */}
          <div className="flex items-center gap-2">
            <div className="relative flex items-center">
              <Globe className="w-4 h-4 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
                aria-label="Select Language"
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Español</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="pt">🇧🇷 Português</option>
                <option value="zh">🇨🇳 中文</option>
              </select>
            </div>

            <a
              href="#faqs"
              className="text-xs font-semibold text-slate-600 hover:text-indigo-600 px-2 py-1.5 rounded-lg hover:bg-slate-50 transition hidden md:inline-flex items-center gap-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>{t.navFaq}</span>
            </a>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/60 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-bold text-indigo-700">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>US Curriculum Aligned: Common Core HSF-BF & HSA-APR</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {mode === 'division' ? t.heroTagline : 'Completing the Square Calculator with Steps'}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {mode === 'division'
              ? t.heroSubtitle
              : 'Effortlessly transform standard quadratic equations ax² + bx + c into vertex form a(x - h)² + k. Step-by-step breakdown of the "half & square" trick, vertex coordinates, line of symmetry, and exact roots.'}
          </p>
        </div>
      </div>

      {/* MAIN CALCULATOR CONTAINER */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full space-y-8">
        {/* INPUT CARD */}
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xs relative">
          {/* Quick Presets Bar */}
          <div className="mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {t.presetsTitle}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mode === 'division'
                ? divisionPresets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setDividendInput(p.dividend);
                        setDivisorInput(p.divisor);
                        handleCalculateDivision(p.dividend, p.divisor);
                      }}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 border border-slate-200 text-slate-700 transition"
                    >
                      {p.title}
                    </button>
                  ))
                : quadraticPresets.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setQuadraticInput(p.formula);
                        handleCalculateCompletingSquare(p.formula);
                      }}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 text-slate-700 transition"
                    >
                      {p.title}
                    </button>
                  ))}
            </div>
          </div>

          {/* INPUT FORM */}
          {mode === 'division' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Dividend Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                    {t.dividendLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={dividendInput}
                      onFocus={() => setActiveInput('dividend')}
                      onChange={(e) => setDividendInput(e.target.value)}
                      placeholder={t.dividendPlaceholder}
                      className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-base sm:text-lg font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-2xs"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Supported: Exponents like <code className="text-slate-600">x^3</code>, coefficients, fractions like <code className="text-slate-600">1/2x^2</code>, and custom variables like <code className="text-slate-600">t</code>
                  </span>
                </div>

                {/* Divisor Input */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                    {t.divisorLabel}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={divisorInput}
                      onFocus={() => setActiveInput('divisor')}
                      onChange={(e) => setDivisorInput(e.target.value)}
                      placeholder={t.divisorPlaceholder}
                      className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-base sm:text-lg font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-2xs"
                    />
                  </div>
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Linear: <code className="text-slate-600">x - 2</code>, Quadratic: <code className="text-slate-600">x^2 + 1</code>, or higher degree
                  </span>
                </div>
              </div>

              {/* Toggles & Keypad Trigger */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 cursor-pointer select-none text-xs sm:text-sm font-medium text-slate-600">
                  <input
                    type="checkbox"
                    checked={showPadding}
                    onChange={(e) => setShowPadding(e.target.checked)}
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                  />
                  <span>{t.showPaddingToggle}</span>
                </label>

                <button
                  type="button"
                  onClick={() => setShowKeypad(!showKeypad)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition ${
                    showKeypad
                      ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Keyboard className="w-4 h-4" />
                  <span>{t.mathKeypadBtn}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Completing Square Input */
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-1.5">
                  {t.quadraticLabel}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={quadraticInput}
                    onFocus={() => setActiveInput('quadratic')}
                    onChange={(e) => setQuadraticInput(e.target.value)}
                    placeholder={t.quadraticPlaceholder}
                    className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200 rounded-xl text-base sm:text-lg font-mono font-medium text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition shadow-2xs"
                  />
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Example formats: <code className="text-slate-600">2x^2 + 8x - 10</code>, <code className="text-slate-600">x^2 - 6x + 9</code>, <code className="text-slate-600">-3x^2 + 12x + 1</code>
                </span>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowKeypad(!showKeypad)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition ${
                    showKeypad
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700'
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Keyboard className="w-4 h-4" />
                  <span>{t.mathKeypadBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* Virtual Math Keypad Drawer */}
          {showKeypad && (
            <div className="mt-4 animate-in fade-in duration-200">
              <MathKeypad
                onInsert={handleKeypadInsert}
                onBackspace={handleKeypadBackspace}
                onClear={handleKeypadClear}
                onClose={() => setShowKeypad(false)}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-5 mt-5 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  mode === 'division' ? handleCalculateDivision() : handleCalculateCompletingSquare()
                }
                className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-sm shadow-indigo-200 transition-all active:scale-98 flex items-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>{t.calculateBtn}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  if (mode === 'division') {
                    setDividendInput('');
                    setDivisorInput('');
                  } else {
                    setQuadraticInput('');
                  }
                }}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t.clearBtn}</span>
              </button>
            </div>

            {/* Export Toolbar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
                title="Copy Solution in Markdown for Homework"
              >
                {copiedType === 'markdown' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">{t.copiedNotice}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-500" />
                    <span>{t.copySolutionBtn}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyLatex}
                className="px-3 py-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition"
                title="Copy LaTeX Expression"
              >
                {copiedType === 'latex' ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">LaTeX Copied!</span>
                  </>
                ) : (
                  <>
                    <Code2 className="w-4 h-4 text-slate-500" />
                    <span>{t.copyLatexBtn}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="p-2 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-900 transition"
                title="Print or Save as PDF Worksheet"
              >
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Syntax Error Notice */}
          {calcError && (
            <div className="mt-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{calcError}</span>
            </div>
          )}
        </div>

        {/* RESULTS SECTION FOR POLYNOMIAL DIVISION */}
        {mode === 'division' && divisionResult && !calcError && (
          <div className="space-y-6">
            {/* High Level Result Card */}
            <div className="bg-gradient-to-r from-indigo-50 via-sky-50 to-emerald-50 border border-indigo-200/80 rounded-3xl p-5 sm:p-7 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-indigo-200/60">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                    {t.resultHeader}
                  </h2>
                  {divisionResult.isExact ? (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {t.exactDivisionBadge}
                    </span>
                  ) : (
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900">
                      {t.nonZeroRemainderBadge}
                    </span>
                  )}
                </div>

                {divisionResult.slantAsymptote && (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900">
                    Oblique Asymptote: {divisionResult.slantAsymptote}
                  </span>
                )}
              </div>

              {/* Big Equation Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white/90 p-4 rounded-2xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {t.quotientLabel}
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-extrabold text-indigo-700">
                    {divisionResult.quotient.toString()}
                  </div>
                </div>

                <div className="bg-white/90 p-4 rounded-2xl border border-slate-200">
                  <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                    {t.remainderLabel}
                  </div>
                  <div className="font-mono text-xl sm:text-2xl font-extrabold text-slate-800">
                    {divisionResult.remainder.toString()}
                  </div>
                </div>
              </div>

              {/* Fractional Output Formula */}
              <div className="mt-4 bg-white/90 p-4 rounded-2xl border border-slate-200">
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                  {t.summaryFormLabel}
                </div>
                <div className="font-mono text-sm sm:text-base font-bold text-slate-900 overflow-x-auto py-1">
                  ({divisionResult.dividend.toString()}) ÷ ({divisionResult.divisor.toString()}) ={' '}
                  <span className="text-indigo-700">{divisionResult.quotient.toString()}</span>
                  {!divisionResult.remainder.isZero() && (
                    <span className="text-slate-700">
                      {' '}
                      + [({divisionResult.remainder.toString()}) / (
                      {divisionResult.divisor.toString()})]
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex border-b border-slate-200 gap-1 overflow-x-auto text-xs sm:text-sm font-bold">
              <button
                type="button"
                onClick={() => setActiveDivisionTab('busstop')}
                className={`px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                  activeDivisionTab === 'busstop'
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/30'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.busStopViewTab}
              </button>

              <button
                type="button"
                onClick={() => setActiveDivisionTab('steps')}
                className={`px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                  activeDivisionTab === 'steps'
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/30'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.stepByStepTab}
              </button>

              <button
                type="button"
                onClick={() => setActiveDivisionTab('synthetic')}
                className={`px-4 py-3 border-b-2 transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeDivisionTab === 'synthetic'
                    ? 'border-emerald-600 text-emerald-700 bg-emerald-50/30'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <span>{t.syntheticTab}</span>
                {syntheticResult?.isApplicable && (
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveDivisionTab('verification')}
                className={`px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                  activeDivisionTab === 'verification'
                    ? 'border-indigo-600 text-indigo-700 bg-indigo-50/30'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.verificationTab}
              </button>

              {divisionResult.slantAsymptote && (
                <button
                  type="button"
                  onClick={() => setActiveDivisionTab('asymptote')}
                  className={`px-4 py-3 border-b-2 transition-all whitespace-nowrap ${
                    activeDivisionTab === 'asymptote'
                      ? 'border-indigo-600 text-indigo-700 bg-indigo-50/30'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.asymptoteTab}
                </button>
              )}
            </div>

            {/* STEP STEPPER CONTROLLER */}
            {activeDivisionTab === 'busstop' && divisionResult.steps.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-bold text-slate-700">
                    {showAllSteps
                      ? `Viewing all ${divisionResult.steps.length} steps`
                      : `Step ${currentStepIndex + 1} of ${divisionResult.steps.length}`}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={currentStepIndex === 0 || showAllSteps}
                    onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition"
                  >
                    {t.prevStepBtn}
                  </button>

                  <button
                    type="button"
                    disabled={
                      currentStepIndex >= divisionResult.steps.length - 1 || showAllSteps
                    }
                    onClick={() =>
                      setCurrentStepIndex((prev) =>
                        Math.min(divisionResult.steps.length - 1, prev + 1)
                      )
                    }
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition"
                  >
                    {t.nextStepBtn}
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowAllSteps(!showAllSteps)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                      showAllSteps
                        ? 'bg-indigo-600 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {showAllSteps ? 'Switch to Step-by-Step' : t.showAllStepsBtn}
                  </button>
                </div>
              </div>
            )}

            {/* TAB CONTENTS */}
            {activeDivisionTab === 'busstop' && (
              <BusStopBracket
                result={divisionResult}
                currentStepIndex={currentStepIndex}
                showAllSteps={showAllSteps}
                showPadding={showPadding}
              />
            )}

            {activeDivisionTab === 'steps' && (
              <StepByStepExplanation
                result={divisionResult}
                currentStepIndex={currentStepIndex}
                showAllSteps={showAllSteps}
              />
            )}

            {activeDivisionTab === 'synthetic' && syntheticResult && (
              <SyntheticDivisionView synthetic={syntheticResult} />
            )}

            {activeDivisionTab === 'verification' && (
              <VerificationView result={divisionResult} />
            )}

            {activeDivisionTab === 'asymptote' && (
              <SlantAsymptoteView result={divisionResult} />
            )}
          </div>
        )}

        {/* RESULTS SECTION FOR COMPLETING THE SQUARE */}
        {mode === 'completing_square' && completingSquareResult && !calcError && (
          <CompletingTheSquareView result={completingSquareResult} />
        )}

        {/* CURATED PRACTICE PROBLEMS & QUIZ MODE */}
        <PracticeProblems
          onLoadProblem={handleLoadPracticeProblem}
          currentLang={lang}
        />

        {/* EDUCATIONAL GUIDE & FAQ (SEO OPTIMIZED) */}
        <EducationalGuide currentLang={lang} />
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-200 bg-slate-50/80 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <div className="font-bold text-slate-700 text-sm mb-1">
              PolyMath Step-by-Step Solver
            </div>
            <p className="leading-relaxed max-w-md">
              {t.footerNote} Accurate, free math tools for polynomial division, synthetic division,
              completing the square, and rational functions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            <span className="text-slate-400">© 2026 PolyMath Solver</span>
            <span className="text-slate-300">•</span>
            <a href="#root" className="hover:text-indigo-600 transition">Back to Top</a>
            <span className="text-slate-300">•</span>
            <a href="#faqs" className="hover:text-indigo-600 transition">Math FAQs</a>
            <span className="text-slate-300">•</span>
            <a href="/sitemap.xml" className="hover:text-indigo-600 transition">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
