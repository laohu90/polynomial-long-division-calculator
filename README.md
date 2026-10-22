# Polynomial Long Division & Completing the Square Calculator (PolyMath Pro)

> A production-grade, step-by-step polynomial long division, synthetic division, and completing the square solver designed for High School Algebra 2, AP Precalculus, and College Algebra students & educators.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61dafb)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.x-38b2ac)](https://tailwindcss.com/)

---

## 🌟 Key Features

### 1. 🧮 Polynomial Long Division (Bus-Stop Bracket Layout)
- **Authentic American Bus-Stop Bracket**: Strictly column-aligned layout ($x^3, x^2, x, \text{constant}$) matching US algebra textbooks (Larson, Stewart, OpenStax).
- **Sign-Flip Subtraction Highlight**: Visual color-coded warning showing exactly how signs invert during subtraction ($-(2x^2 - 4x) \to -2x^2 + 4x$).
- **Missing Term Padding ($+0x^k$)**: Automatically identifies missing powers (e.g. $x^4 - 16$) and pads columns with $0x$ placeholders.
- **Algebraic Verification (Proof)**: Formally expands $(Q(x) \cdot D(x)) + R(x) = P(x)$ to prove the result is 100% accurate.
- **Slant (Oblique) Asymptote Detection**: Precalculus feature that identifies $y = Q(x)$ whenever $\deg(\text{Dividend}) - \deg(\text{Divisor}) = 1$.

### 2. ⚡ Synthetic Division (Ruffini's Rule)
- Automatically enabled when divisor is linear ($x - c$ or $ax + b$).
- Interactive 3-row synthetic division tableau (Root box, coefficients, product carries, sums).
- Automatic quotient adjustment when leading coefficient $a \neq 1$.

### 3. 📐 Completing the Square (配方法拆解过程)
- Step-by-step conversion from standard form $ax^2 + bx + c$ to vertex form $a(x - h)^2 + k$.
- Explicit calculation of $(b/2a)^2$ "magic number", factoring perfect square trinomial, and distributing constants.
- Full parabolic analysis: Vertex $(h, k)$, axis of symmetry $x = h$, roots/zeros (real or complex conjugates), direction of opening, and minimum/maximum values.

### 4. 🌍 5-Language Internationalization
- **English** (Default, tailored to US curriculum)
- **Español** (División de polinomios y método de completar el cuadrado)
- **Français** (Division polynomiale et forme canonique)
- **Português** (Divisão de polinômios e Briot-Ruffini)
- **中文** (多项式长除法与配方法拆解过程)

### 5. 📱 Mobile-Friendly & SEO Optimized
- Built-in Virtual Math Keypad for phone/tablet typing ($x, x^2, x^3, x^n, +, -, /$).
- Copy as Homework Markdown or LaTeX.
- Print-friendly layout (`@media print`) for homework sheets.
- Rich SEO tags, canonical URL, and Schema.org structured data (`WebApplication`, `HowTo`, `FAQPage`).

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### Installation
```bash
git clone https://github.com/laohu90/polynomial-long-division-calculator.git
cd polynomial-long-division-calculator
npm install
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```

---

## 🌐 Deploy to Vercel / Cloudflare Pages

This project is a standard Vite React SPA:
1. Connect your GitHub repository to [Vercel](https://vercel.com) or [Cloudflare Pages](https://pages.cloudflare.com).
2. Set Build Command: `npm run build`
3. Set Output Directory: `dist`
4. Deploy!

---

## 📄 License
MIT License. Free for students, educators, and commercial use.
