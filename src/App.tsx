/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Calculator,
  RotateCcw,
  Copy,
  Check,
  Printer,
  Keyboard,
  Globe,
  HelpCircle,
  Code2,
  SquareFunction,
  AlertCircle,
  BookOpen,
  Target,
  Sparkles,
  ChevronDown,
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

  // Dynamically update document title and meta description for SEO
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
  const [showPresetsDropdown, setShowPresetsDropdown] = useState<boolean>(false);

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
        setCalcError(t.errorZeroDivisor);
        return;
      }

      const res = performPolynomialLongDivision(dividendPoly, divisorPoly);
      setDivisionResult(res);

      const syn = performSyntheticDivision(dividendPoly, divisorPoly);
      setSyntheticResult(syn);

      setCurrentStepIndex(0);
      setShowAllSteps(true);
    } catch (err: any) {
      setCalcError(err.message || t.errorInvalidSyntax);
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
      setCalcError(err.message || t.errorQuadraticDegree);
    }
  };

  // Run initial calculation on mount
  useEffect(() => {
    handleCalculateDivision();
    handleCalculateCompletingSquare();
  }, []);

  // Presets
  const divisionPresets = [
    { title: 'Classic (x - 2)', dividend: '2x^3 - x^2 - 7x + 2', divisor: 'x - 2' },
    { title: 'Missing Terms (x⁴ - 16)', dividend: 'x^4 - 16', divisor: 'x - 2' },
    { title: 'Slant Asymptote', dividend: '3x^3 + 2x^2 - x + 5', divisor: 'x^2 + 1' },
    { title: 'Divisor (2x - 3)', dividend: '4x^3 - 6x^2 + 2x - 1', divisor: '2x - 3' },
    { title: 'Quadratic Divisor', dividend: 'x^4 - 2x^3 + 3x^2 - 4x + 5', divisor: 'x^2 - 3x + 2' },
  ];

  const quadraticPresets = [
    { title: 'Standard (a = 2)', formula: '2x^2 + 8x - 10' },
    { title: 'Monic x² - 6x + 5', formula: 'x^2 - 6x + 5' },
    { title: 'Fractional Half x² + 5x + 3', formula: 'x^2 + 5x + 3' },
    { title: 'Negative Peak -x² + 4x + 12', formula: '-x^2 + 4x + 12' },
    { title: 'Complex Roots x² + 2x + 5', formula: 'x^2 + 2x + 5' },
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

  // Copy Markdown
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
        md += `1. **Step ${s.stepNumber}:** ${s.explanation.divide}\n`;
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
      md += `### Steps:\n`;
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
      {/* CLEAN MINIMAL HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          {/* Logo & Identity */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-base shadow-xs">
              ÷
            </div>
            <div>
              <span className="font-extrabold text-lg text-slate-900 tracking-tight">
                PolyMath
              </span>
              <span className="text-xs text-slate-500 font-medium ml-2 hidden sm:inline">
                Step-by-Step Algebra Solver
              </span>
            </div>
          </div>

          {/* Clean Segmented Mode Control */}
          <div className="inline-flex bg-slate-100 p-1 rounded-xl text-xs sm:text-sm font-semibold">
            <button
              onClick={() => {
                setMode('division');
                setActiveInput('dividend');
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                mode === 'division'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.navDivision}
            </button>
            <button
              onClick={() => {
                setMode('completing_square');
                setActiveInput('quadratic');
              }}
              className={`px-3.5 py-1.5 rounded-lg transition-all ${
                mode === 'completing_square'
                  ? 'bg-white text-slate-900 shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t.navCompleteSquare}
            </button>
          </div>

          {/* Language Picker & Quick Navigation */}
          <div className="flex items-center gap-3">
            <div className="relative flex items-center">
              <Globe className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as Language)}
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 hover:border-slate-300 focus:outline-none cursor-pointer"
                aria-label="Select Language"
              >
                <option value="en">🇺🇸 EN</option>
                <option value="es">🇪🇸 ES</option>
                <option value="fr">🇫🇷 FR</option>
                <option value="pt">🇧🇷 PT</option>
                <option value="zh">🇨🇳 中文</option>
              </select>
            </div>

            <a
              href="#study-guide"
              className="text-xs font-medium text-slate-600 hover:text-slate-900 hidden md:block"
            >
              {t.navGuide}
            </a>
          </div>
        </div>
      </header>

      {/* COMPACT CLEAN PAGE HERO */}
      <div className="border-b border-slate-100 bg-slate-50/50 py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'division' ? t.heroTagline : t.navCompleteSquare}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            {mode === 'division'
              ? 'Enter dividend and divisor to see the aligned bus-stop division bracket, sign-flip subtraction, and proof.'
              : 'Enter a quadratic polynomial ax² + bx + c to get vertex form, coordinates, axis of symmetry, and roots.'}
          </p>
        </div>
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex-1 w-full space-y-8">
        {/* INPUT CARD */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
          {mode === 'division' ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dividend Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.dividendLabel}
                    </label>
                  </div>
                  <input
                    type="text"
                    value={dividendInput}
                    onFocus={() => setActiveInput('dividend')}
                    onChange={(e) => setDividendInput(e.target.value)}
                    placeholder={t.dividendPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-base font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  />
                </div>

                {/* Divisor Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      {t.divisorLabel}
                    </label>
                  </div>
                  <input
                    type="text"
                    value={divisorInput}
                    onFocus={() => setActiveInput('divisor')}
                    onChange={(e) => setDivisorInput(e.target.value)}
                    placeholder={t.divisorPlaceholder}
                    className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-base font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition"
                  />
                </div>
              </div>

              {/* Presets & Toggles Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={showPadding}
                      onChange={(e) => setShowPadding(e.target.checked)}
                      className="w-3.5 h-3.5 rounded text-indigo-600 focus:ring-indigo-500 border-slate-300"
                    />
                    <span>{t.showPaddingToggle}</span>
                  </label>

                  {/* Quick Examples Dropdown */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPresetsDropdown(!showPresetsDropdown)}
                      className="text-indigo-600 font-semibold hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
                    >
                      <span>{t.randomPresetBtn}</span>
                      <ChevronDown className="w-3 h-3" />
                    </button>

                    {showPresetsDropdown && (
                      <div className="absolute left-0 top-6 w-60 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30">
                        {divisionPresets.map((p, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setDividendInput(p.dividend);
                              setDivisorInput(p.divisor);
                              setShowPresetsDropdown(false);
                              handleCalculateDivision(p.dividend, p.divisor);
                            }}
                            className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                          >
                            {p.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowKeypad(!showKeypad)}
                  className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>{t.mathKeypadBtn}</span>
                </button>
              </div>
            </div>
          ) : (
            /* Completing the square input */
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {t.quadraticLabel}
                </label>
                <input
                  type="text"
                  value={quadraticInput}
                  onFocus={() => setActiveInput('quadratic')}
                  onChange={(e) => setQuadraticInput(e.target.value)}
                  placeholder={t.quadraticPlaceholder}
                  className="w-full px-3.5 py-2.5 bg-slate-50/60 border border-slate-200 rounded-xl text-base font-mono text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition"
                />
              </div>

              {/* Presets Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPresetsDropdown(!showPresetsDropdown)}
                    className="text-emerald-700 font-semibold hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                  >
                    <span>{t.randomPresetBtn}</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>

                  {showPresetsDropdown && (
                    <div className="absolute left-0 top-6 w-60 bg-white border border-slate-200 rounded-xl shadow-lg p-1.5 z-30">
                      {quadraticPresets.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setQuadraticInput(p.formula);
                            setShowPresetsDropdown(false);
                            handleCalculateCompletingSquare(p.formula);
                          }}
                          className="w-full text-left px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 rounded-lg"
                        >
                          {p.title}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setShowKeypad(!showKeypad)}
                  className="text-slate-600 hover:text-slate-900 font-medium flex items-center gap-1"
                >
                  <Keyboard className="w-3.5 h-3.5" />
                  <span>{t.mathKeypadBtn}</span>
                </button>
              </div>
            </div>
          )}

          {/* Virtual Math Keypad */}
          {showKeypad && (
            <div className="mt-4 pt-3 border-t border-slate-100">
              <MathKeypad
                onInsert={handleKeypadInsert}
                onBackspace={handleKeypadBackspace}
                onClear={handleKeypadClear}
                onClose={() => setShowKeypad(false)}
              />
            </div>
          )}

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  mode === 'division' ? handleCalculateDivision() : handleCalculateCompletingSquare()
                }
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-xs transition active:scale-98 cursor-pointer flex items-center gap-2"
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
                className="p-2.5 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                title={t.clearBtn}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Export Toolbar */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-1 transition"
                title="Copy Markdown"
              >
                {copiedType === 'markdown' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">{t.copiedNotice}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Markdown</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleCopyLatex}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 font-medium flex items-center gap-1 transition"
                title="Copy LaTeX"
              >
                {copiedType === 'latex' ? (
                  <span className="text-emerald-700 font-bold">LaTeX Copied!</span>
                ) : (
                  <>
                    <Code2 className="w-3.5 h-3.5" />
                    <span>LaTeX</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition"
                title={t.printBtn}
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Syntax Error */}
          {calcError && (
            <div className="mt-3 p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{calcError}</span>
            </div>
          )}
        </div>

        {/* RESULTS: POLYNOMIAL DIVISION */}
        {mode === 'division' && divisionResult && !calcError && (
          <div className="space-y-5">
            {/* Direct Answer Summary Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-200/80">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.resultHeader}
                </span>
                <span
                  className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                    divisionResult.isExact
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {divisionResult.isExact ? t.exactDivisionBadge : t.nonZeroRemainderBadge}
                </span>
              </div>

              {/* Big Clean Output */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">
                    {t.quotientLabel}
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 mt-0.5">
                    {divisionResult.quotient.toString()}
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-500 uppercase">
                    {t.remainderLabel}
                  </div>
                  <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900 mt-0.5">
                    {divisionResult.remainder.toString()}
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm font-mono text-slate-700 bg-white p-2.5 rounded-xl border border-slate-200 overflow-x-auto">
                <span className="text-slate-400 font-sans">{t.summaryFormLabel}: </span>
                ({divisionResult.dividend.toString()}) = ({divisionResult.divisor.toString()}) · (
                <span className="font-bold text-slate-900">{divisionResult.quotient.toString()}</span>
                ) + ({divisionResult.remainder.toString()})
              </div>
            </div>

            {/* TAB SELECTOR */}
            <div className="flex border-b border-slate-200 gap-1 overflow-x-auto text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveDivisionTab('busstop')}
                className={`px-3.5 py-2.5 border-b-2 transition whitespace-nowrap ${
                  activeDivisionTab === 'busstop'
                    ? 'border-slate-900 text-slate-900 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.busStopViewTab}
              </button>

              <button
                type="button"
                onClick={() => setActiveDivisionTab('steps')}
                className={`px-3.5 py-2.5 border-b-2 transition whitespace-nowrap ${
                  activeDivisionTab === 'steps'
                    ? 'border-slate-900 text-slate-900 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.stepByStepTab}
              </button>

              <button
                type="button"
                onClick={() => setActiveDivisionTab('synthetic')}
                className={`px-3.5 py-2.5 border-b-2 transition whitespace-nowrap ${
                  activeDivisionTab === 'synthetic'
                    ? 'border-slate-900 text-slate-900 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.syntheticTab}
              </button>

              <button
                type="button"
                onClick={() => setActiveDivisionTab('verification')}
                className={`px-3.5 py-2.5 border-b-2 transition whitespace-nowrap ${
                  activeDivisionTab === 'verification'
                    ? 'border-slate-900 text-slate-900 font-bold'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {t.verificationTab}
              </button>

              {divisionResult.slantAsymptote && (
                <button
                  type="button"
                  onClick={() => setActiveDivisionTab('asymptote')}
                  className={`px-3.5 py-2.5 border-b-2 transition whitespace-nowrap ${
                    activeDivisionTab === 'asymptote'
                      ? 'border-slate-900 text-slate-900 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {t.asymptoteTab}
                </button>
              )}
            </div>

            {/* TAB CONTENTS */}
            {activeDivisionTab === 'busstop' && (
              <BusStopBracket
                result={divisionResult}
                currentStepIndex={currentStepIndex}
                showAllSteps={showAllSteps}
                showPadding={showPadding}
                currentLang={lang}
              />
            )}

            {activeDivisionTab === 'steps' && (
              <StepByStepExplanation
                result={divisionResult}
                currentStepIndex={currentStepIndex}
                showAllSteps={showAllSteps}
                currentLang={lang}
              />
            )}

            {activeDivisionTab === 'synthetic' && syntheticResult && (
              <SyntheticDivisionView synthetic={syntheticResult} currentLang={lang} />
            )}

            {activeDivisionTab === 'verification' && (
              <VerificationView result={divisionResult} />
            )}

            {activeDivisionTab === 'asymptote' && (
              <SlantAsymptoteView result={divisionResult} />
            )}
          </div>
        )}

        {/* RESULTS: COMPLETING THE SQUARE */}
        {mode === 'completing_square' && completingSquareResult && !calcError && (
          <CompletingTheSquareView result={completingSquareResult} currentLang={lang} />
        )}

        {/* PRACTICE PROBLEMS */}
        <div id="practice" className="pt-6">
          <PracticeProblems
            onLoadProblem={handleLoadPracticeProblem}
            currentLang={lang}
          />
        </div>

        {/* EDUCATIONAL STUDY GUIDE & FAQS */}
        <div id="study-guide" className="pt-6">
          <EducationalGuide currentLang={lang} />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-16 border-t border-slate-200 bg-slate-50/60 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-700">PolyMath Pro</span>
            <span className="ml-2">© 2026. {t.footerNote}</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#study-guide" className="hover:text-slate-900 transition">
              {t.navGuide}
            </a>
            <a href="#faqs" className="hover:text-slate-900 transition">
              {t.navFaq}
            </a>
            <a href="/sitemap.xml" className="hover:text-slate-900 transition">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
