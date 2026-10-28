import { Fraction } from './Fraction';

export interface LongDivisionStep {
  stepIndex: number;
  currentDividend: Polynomial;
  leadingDividendTerm: { coeff: Fraction; power: number };
  leadingDivisorTerm: { coeff: Fraction; power: number };
  quotientTerm: { coeff: Fraction; power: number };
  product: Polynomial;
  subtracted: Polynomial;
  broughtDownTerm: { coeff: Fraction; power: number } | null;
  newRemainder: Polynomial;
  explanationEn: string;
  explanationZh: string;
}

export interface RuffiniStep {
  colIndex: number;
  degree: number;
  coeff: Fraction;
  broughtDown: Fraction;
  product: Fraction;
  sum: Fraction;
  explanationEn: string;
  explanationZh: string;
}

export interface LongDivisionResult {
  dividend: Polynomial;
  divisor: Polynomial;
  quotient: Polynomial;
  remainder: Polynomial;
  steps: LongDivisionStep[];
  ruffini: {
    root: Fraction; // root c = -b/a for divisor (ax + b)
    divisorCoeffA: Fraction;
    topRow: Fraction[]; // Dividend coefficients
    multRow: Fraction[]; // Multipliers added
    resultRow: Fraction[]; // Resulting coefficients (last is remainder)
    finalQuotientCoeffs: Fraction[];
    ruffiniSteps: RuffiniStep[];
    isApplicable: boolean;
  } | null;
  asymptote: {
    type: 'linear' | 'horizontal' | 'none';
    equation: string;
    latex: string;
  } | null;
}

export interface CompletingSquareResult {
  original: Polynomial;
  a: Fraction;
  b: Fraction;
  c: Fraction;
  h: Fraction; // -b / (2a)
  k: Fraction; // c - b^2 / (4a)
  vertex: { x: Fraction; y: Fraction };
  discriminant: Fraction; // b^2 - 4ac
  roots: {
    type: 'two_real' | 'one_real' | 'complex';
    x1Str: string;
    x2Str: string;
    x1Latex: string;
    x2Latex: string;
    numericValues?: [number, number];
  };
  axisOfSymmetry: string;
  yIntercept: { x: number; y: Fraction };
  openingDirection: 'up' | 'down';
  extremum: { type: 'minimum' | 'maximum'; value: Fraction; atX: Fraction };
  steps: {
    stepIndex: number;
    titleEn: string;
    titleZh: string;
    latex: string;
    textEn: string;
    textZh: string;
  }[];
}

export class Polynomial {
  /**
   * Coefficients stored from highest power down to power 0.
   * e.g. 2x^3 - x^2 + 4 -> coeffs = [2, -1, 0, 4]
   */
  readonly coeffs: Fraction[];

  constructor(coeffs: (Fraction | number | string | bigint)[]) {
    const fracs = coeffs.map(c => c instanceof Fraction ? c : Fraction.fromNumber(Number(c)));
    
    // Trim leading zero coefficients, keeping at least [0]
    let start = 0;
    while (start < fracs.length - 1 && fracs[start].isZero()) {
      start++;
    }
    this.coeffs = fracs.slice(start);
  }

  static ZERO = new Polynomial([Fraction.ZERO]);

  get degree(): number {
    if (this.isZero()) return 0;
    return this.coeffs.length - 1;
  }

  isZero(): boolean {
    return this.coeffs.length === 1 && this.coeffs[0].isZero();
  }

  getCoeff(power: number): Fraction {
    const deg = this.degree;
    if (power < 0 || power > deg) return Fraction.ZERO;
    const idx = deg - power;
    return this.coeffs[idx] || Fraction.ZERO;
  }

  get leadingCoeff(): Fraction {
    return this.coeffs[0] || Fraction.ZERO;
  }

  add(other: Polynomial): Polynomial {
    const maxDeg = Math.max(this.degree, other.degree);
    const newCoeffs: Fraction[] = [];
    for (let p = maxDeg; p >= 0; p--) {
      newCoeffs.push(this.getCoeff(p).add(other.getCoeff(p)));
    }
    return new Polynomial(newCoeffs);
  }

  sub(other: Polynomial): Polynomial {
    const maxDeg = Math.max(this.degree, other.degree);
    const newCoeffs: Fraction[] = [];
    for (let p = maxDeg; p >= 0; p--) {
      newCoeffs.push(this.getCoeff(p).sub(other.getCoeff(p)));
    }
    return new Polynomial(newCoeffs);
  }

  mul(other: Polynomial): Polynomial {
    if (this.isZero() || other.isZero()) return Polynomial.ZERO;
    const resDeg = this.degree + other.degree;
    const resCoeffs: Fraction[] = Array(resDeg + 1).fill(null).map(() => Fraction.ZERO);

    for (let p1 = this.degree; p1 >= 0; p1--) {
      for (let p2 = other.degree; p2 >= 0; p2--) {
        const pRes = p1 + p2;
        const idx = resDeg - pRes;
        const prod = this.getCoeff(p1).mul(other.getCoeff(p2));
        resCoeffs[idx] = resCoeffs[idx].add(prod);
      }
    }
    return new Polynomial(resCoeffs);
  }

  mulMonial(coeff: Fraction, power: number): Polynomial {
    if (coeff.isZero()) return Polynomial.ZERO;
    const newCoeffs = this.coeffs.map(c => c.mul(coeff));
    for (let i = 0; i < power; i++) {
      newCoeffs.push(Fraction.ZERO);
    }
    return new Polynomial(newCoeffs);
  }

  evaluate(x: number): number {
    let sum = 0;
    const deg = this.degree;
    for (let p = deg; p >= 0; p--) {
      sum += this.getCoeff(p).toNumber() * Math.pow(x, p);
    }
    return sum;
  }

  toString(useMissingZeros = false): string {
    if (this.isZero()) return '0';

    const deg = this.degree;
    let result = '';

    for (let p = deg; p >= 0; p--) {
      const coeff = this.getCoeff(p);

      if (coeff.isZero()) {
        if (useMissingZeros && deg > 0) {
          const signStr = result === '' ? '' : ' + ';
          result += `${signStr}0x^${p}`;
        }
        continue;
      }

      const term = coeff.toSignedTermString('x', p, result === '');
      result += term;
    }

    return result || '0';
  }

  toLatex(useMissingZeros = false): string {
    if (this.isZero()) return '0';

    const deg = this.degree;
    let result = '';

    for (let p = deg; p >= 0; p--) {
      const coeff = this.getCoeff(p);

      if (coeff.isZero()) {
        if (useMissingZeros && deg > 0) {
          const signStr = result === '' ? '' : ' + ';
          const pStr = p === 1 ? 'x' : `x^{${p}}`;
          result += `${signStr}0${pStr}`;
        }
        continue;
      }

      const term = coeff.toSignedLatex('x', p, result === '');
      result += term;
    }

    return result || '0';
  }

  /**
   * Pre-process and normalize user string input:
   * 1. Unicode superscripts (⁰¹²³⁴⁵⁶⁷⁸⁹) -> ^0, ^1, ^2...
   * 2. Minus & multiply symbols normalization
   * 3. Validate illegal characters (e.g., 'hello world')
   */
  static normalizeInput(input: string): string {
    if (!input) return '';

    let s = input.trim();

    // Map unicode superscripts
    const superscriptMap: Record<string, string> = {
      '⁰': '^0', '¹': '^1', '²': '^2', '³': '^3', '⁴': '^4',
      '⁵': '^5', '⁶': '^6', '⁷': '^7', '⁸': '^8', '⁹': '^9',
    };

    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, char => superscriptMap[char] || char);

    // Normalize multiplication and minus operators
    s = s.replace(/[×·]/g, '*');
    s = s.replace(/[−–]/g, '-');
    s = s.replace(/X/g, 'x');

    return s;
  }

  /**
   * Robust Polynomial Parser with syntax validation
   */
  static parse(rawInput: string): Polynomial {
    const s = Polynomial.normalizeInput(rawInput);

    if (!s) {
      throw new Error('Input expression cannot be empty.');
    }

    // Check for invalid characters (only numbers, x, +, -, *, /, ^, ., (, ), spaces are valid)
    const invalidCharsMatch = s.match(/[^0-9xX\+\-\*\/\^\.\(\)\s]/g);
    if (invalidCharsMatch) {
      const uniqueInvalid = Array.from(new Set(invalidCharsMatch)).join(', ');
      throw new Error(
        `Invalid character(s) '${uniqueInvalid}'. Only variable 'x', digits, and operators (+, -, *, /, ^, ()) are allowed.`
      );
    }

    // Check for dangling operator at the end
    if (/[+\-*\/^]\s*$/.test(s)) {
      throw new Error(`Incomplete expression ending with operator '${s.slice(-1)}'. Expected a term after the operator.`);
    }

    try {
      // Parse expression tree or sum of monomial terms
      return parsePolynomialExpression(s);
    } catch (err: any) {
      throw new Error(err?.message || 'Failed to parse polynomial expression. Example format: 2x^3 - x^2 - 7x + 2');
    }
  }
}

/**
 * Helper to parse algebraic polynomial expressions including parentheses,
 * explicit `*` multiplication, implicit multiplication (`2x`, `(x-1)(x+2)`), and fractions.
 */
function parsePolynomialExpression(expr: string): Polynomial {
  // Replace spaces
  const clean = expr.replace(/\s+/g, '');
  if (!clean) return Polynomial.ZERO;

  // Simple token parser for Polynomial arithmetic
  return parseAddSub(clean);
}

function parseAddSub(str: string): Polynomial {
  let depth = 0;
  const terms: { op: '+' | '-'; text: string }[] = [];
  let currentToken = '';
  let currentOp: '+' | '-' = '+';

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;

    if (depth === 0 && (ch === '+' || ch === '-') && i > 0 && str[i - 1] !== '^' && str[i - 1] !== '*' && str[i - 1] !== '/') {
      terms.push({ op: currentOp, text: currentToken });
      currentOp = ch;
      currentToken = '';
    } else {
      currentToken += ch;
    }
  }

  if (currentToken) {
    terms.push({ op: currentOp, text: currentToken });
  }

  let result = Polynomial.ZERO;

  for (const t of terms) {
    const poly = parseMulImplicit(t.text);
    if (t.op === '+') {
      result = result.add(poly);
    } else {
      result = result.sub(poly);
    }
  }

  return result;
}

function parseMulImplicit(str: string): Polynomial {
  // Handle explicit '*' or implicit juxtaposition like 2x, (x-1)(x+2), 3(x+2)
  // First insert '*' between implicit multiplication pairs
  // e.g. 2x -> 2*x, (x-1)(x+2) -> (x-1)*(x+2), 3(x+2) -> 3*(x+2), x(x-1) -> x*(x-1)
  let s = str;
  s = s.replace(/(\d|(?:[a-zA-Z\)]))(\()/g, '$1*$2');
  s = s.replace(/(\))([a-zA-Z\d])/g, '$1*$2');
  s = s.replace(/(\d)([a-zA-Z])/g, '$1*$2');

  let depth = 0;
  const factors: string[] = [];
  let currentToken = '';

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    else if (ch === ')') depth--;

    if (depth === 0 && ch === '*') {
      if (currentToken) factors.push(currentToken);
      currentToken = '';
    } else {
      currentToken += ch;
    }
  }

  if (currentToken) factors.push(currentToken);

  if (factors.length === 0) return Polynomial.ZERO;

  let result = new Polynomial([1]);
  for (const factor of factors) {
    const p = parseFactor(factor);
    result = result.mul(p);
  }

  return result;
}

function parseFactor(str: string): Polynomial {
  let s = str.trim();
  if (!s) return Polynomial.ZERO;

  // Check if enclosed in parentheses: ( ... ) or ( ... )^power
  if (s.startsWith('(')) {
    let depth = 0;
    let closingIdx = -1;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === '(') depth++;
      else if (s[i] === ')') {
        depth--;
        if (depth === 0) {
          closingIdx = i;
          break;
        }
      }
    }

    if (closingIdx !== -1) {
      const inner = s.substring(1, closingIdx);
      const innerPoly = parseAddSub(inner);
      const rest = s.substring(closingIdx + 1).trim();

      if (rest.startsWith('^')) {
        const pStr = rest.substring(1);
        const power = parseInt(pStr, 10);
        if (isNaN(power) || power < 0) {
          throw new Error(`Invalid exponent '${pStr}' after parentheses.`);
        }
        let powPoly = new Polynomial([1]);
        for (let i = 0; i < power; i++) {
          powPoly = powPoly.mul(innerPoly);
        }
        return powPoly;
      } else if (!rest) {
        return innerPoly;
      }
    }
  }

  // Handle term like -2x^3, 5/2x^2, x^4, 7, 13/4
  // Check for '^' exponent
  let power = 0;
  let baseStr = s;

  if (s.includes('^')) {
    const parts = s.split('^');
    if (parts.length > 2) throw new Error(`Multiple '^' symbols in term '${s}'`);
    baseStr = parts[0];
    power = parseInt(parts[1], 10);
    if (isNaN(power) || power < 0) {
      throw new Error(`Invalid exponent '${parts[1]}' in term '${s}'`);
    }
  }

  // Parse coefficient and variable
  let coeffFrac = Fraction.ONE;

  if (baseStr === 'x' || baseStr === '+x') {
    if (power === 0) power = 1;
    coeffFrac = Fraction.ONE;
  } else if (baseStr === '-x') {
    if (power === 0) power = 1;
    coeffFrac = new Fraction(-1n);
  } else if (baseStr.endsWith('x')) {
    if (power === 0) power = 1;
    const coeffPart = baseStr.slice(0, -1);
    if (coeffPart === '' || coeffPart === '+') coeffFrac = Fraction.ONE;
    else if (coeffPart === '-') coeffFrac = new Fraction(-1n);
    else {
      const parsed = Fraction.parseString(coeffPart);
      if (!parsed) throw new Error(`Cannot parse coefficient '${coeffPart}'`);
      coeffFrac = parsed;
    }
  } else {
    // Pure number / constant fraction
    const parsed = Fraction.parseString(baseStr);
    if (!parsed) throw new Error(`Cannot parse term '${baseStr}'`);
    coeffFrac = parsed;
  }

  // Construct monomial
  const coeffs: Fraction[] = [coeffFrac];
  for (let i = 0; i < power; i++) {
    coeffs.push(Fraction.ZERO);
  }

  return new Polynomial(coeffs);
}

/**
 * Execute Polynomial Long Division
 */
export function performLongDivision(dividend: Polynomial, divisor: Polynomial): LongDivisionResult {
  if (divisor.isZero()) {
    throw new Error('Division by zero is undefined. Divisor polynomial cannot be zero.');
  }

  const steps: LongDivisionStep[] = [];
  let currentRem = dividend;
  let quotientCoeffs: Fraction[] = Array(Math.max(0, dividend.degree - divisor.degree + 1)).fill(null).map(() => Fraction.ZERO);

  let stepIndex = 1;

  while (!currentRem.isZero() && currentRem.degree >= divisor.degree) {
    const leadRemCoeff = currentRem.leadingCoeff;
    const leadRemPower = currentRem.degree;

    const leadDivCoeff = divisor.leadingCoeff;
    const leadDivPower = divisor.degree;

    const qCoeff = leadRemCoeff.div(leadDivCoeff);
    const qPower = leadRemPower - leadDivPower;

    // Record term in quotient polynomial
    const qIndex = (dividend.degree - divisor.degree) - qPower;
    if (qIndex >= 0 && qIndex < quotientCoeffs.length) {
      quotientCoeffs[qIndex] = qCoeff;
    }

    const quotientTerm = { coeff: qCoeff, power: qPower };
    const product = divisor.mulMonial(qCoeff, qPower);

    const newRem = currentRem.sub(product);

    // Wording refinement for Issue #7: Check if there is an un-lowered term in original dividend to bring down
    let broughtDownTerm: { coeff: Fraction; power: number } | null = null;
    const targetBringDownPower = leadRemPower - 1;
    if (
      targetBringDownPower >= 0 &&
      currentRem.getCoeff(targetBringDownPower).isZero() &&
      !dividend.getCoeff(targetBringDownPower).isZero()
    ) {
      broughtDownTerm = { coeff: dividend.getCoeff(targetBringDownPower), power: targetBringDownPower };
    }

    const qTermStr = qCoeff.toSignedTermString('x', qPower, true);
    const prodStr = product.toString();

    let explanationEn = `1. Divide: ${leadRemCoeff.toSignedTermString('x', leadRemPower, true)} ÷ ${leadDivCoeff.toSignedTermString('x', leadDivPower, true)} = ${qTermStr}. 2. Multiply: (${qTermStr}) × (${divisor.toString()}) = ${prodStr}. 3. Subtract: Subtract (${prodStr}) from ${currentRem.toString()} to get remainder ${newRem.toString()}.`;
    let explanationZh = `1. 一除：首项 ${leadRemCoeff.toSignedTermString('x', leadRemPower, true)} ÷ ${leadDivCoeff.toSignedTermString('x', leadDivPower, true)} = ${qTermStr}。 2. 二乘：用 ${qTermStr} 乘以除式 (${divisor.toString()}) 得到 ${prodStr}。 3. 三减：从余式 ${currentRem.toString()} 中减去 (${prodStr}) 得到新余式 ${newRem.toString()}。`;

    if (broughtDownTerm) {
      explanationEn += ` 4. Bring down next term ${broughtDownTerm.coeff.toSignedTermString('x', broughtDownTerm.power, true)} from dividend P(x).`;
      explanationZh += ` 4. 四拉：从被除式 P(x) 中落下下一项 ${broughtDownTerm.coeff.toSignedTermString('x', broughtDownTerm.power, true)}。`;
    }

    steps.push({
      stepIndex,
      currentDividend: currentRem,
      leadingDividendTerm: { coeff: leadRemCoeff, power: leadRemPower },
      leadingDivisorTerm: { coeff: leadDivCoeff, power: leadDivPower },
      quotientTerm,
      product,
      subtracted: product.mulMonial(new Fraction(-1n), 0),
      broughtDownTerm,
      newRemainder: newRem,
      explanationEn,
      explanationZh,
    });

    currentRem = newRem;
    stepIndex++;
  }

  const quotient = new Polynomial(quotientCoeffs);
  const remainder = currentRem;

  // Calculate Asymptote (Linear/Oblique, Horizontal, or None)
  let asymptote: LongDivisionResult['asymptote'] = null;
  if (dividend.degree === divisor.degree + 1) {
    asymptote = {
      type: 'linear',
      equation: `y = ${quotient.toString()}`,
      latex: `y = ${quotient.toLatex()}`,
    };
  } else if (dividend.degree === divisor.degree) {
    asymptote = {
      type: 'horizontal',
      equation: `y = ${quotient.toString()}`,
      latex: `y = ${quotient.toLatex()}`,
    };
  }

  // Calculate Synthetic Division (Ruffini's Rule) if divisor is linear: ax + b
  let ruffini: LongDivisionResult['ruffini'] = null;
  if (divisor.degree === 1) {
    const a = divisor.getCoeff(1);
    const b = divisor.getCoeff(0);
    // Root c = -b / a
    const root = b.negate().div(a);

    const topRow: Fraction[] = [];
    for (let p = dividend.degree; p >= 0; p--) {
      topRow.push(dividend.getCoeff(p));
    }

    const multRow: Fraction[] = [Fraction.ZERO];
    const resultRow: Fraction[] = [topRow[0]];
    const ruffiniSteps: RuffiniStep[] = [];

    ruffiniSteps.push({
      colIndex: 0,
      degree: dividend.degree,
      coeff: topRow[0],
      broughtDown: topRow[0],
      product: Fraction.ZERO,
      sum: topRow[0],
      explanationEn: `Bring down the first coefficient ${topRow[0].toString()}.`,
      explanationZh: `直接落下首项系数 ${topRow[0].toString()}。`,
    });

    for (let i = 1; i < topRow.length; i++) {
      const prevResult = resultRow[i - 1];
      const prod = prevResult.mul(root);
      multRow.push(prod);
      const sum = topRow[i].add(prod);
      resultRow.push(sum);

      const deg = dividend.degree - i;
      ruffiniSteps.push({
        colIndex: i,
        degree: deg,
        coeff: topRow[i],
        broughtDown: topRow[i],
        product: prod,
        sum,
        explanationEn: `Multiply ${prevResult.toString()} by root c = ${root.toString()} to get ${prod.toString()}. Add to column coeff ${topRow[i].toString()} to get ${sum.toString()}.`,
        explanationZh: `用 ${prevResult.toString()} 乘以根 c = ${root.toString()} 得到 ${prod.toString()}。与列系数 ${topRow[i].toString()} 相加得到 ${sum.toString()}。`,
      });
    }

    // Adjust quotient coefficients by factor 'a' if a != 1
    const rawQuotientCoeffs = resultRow.slice(0, resultRow.length - 1);
    const finalQuotientCoeffs = rawQuotientCoeffs.map(c => c.div(a));

    ruffini = {
      root,
      divisorCoeffA: a,
      topRow,
      multRow,
      resultRow,
      finalQuotientCoeffs,
      ruffiniSteps,
      isApplicable: true,
    };
  }

  return {
    dividend,
    divisor,
    quotient,
    remainder,
    steps,
    ruffini,
    asymptote,
  };
}

/**
 * Execute Completing the Square for quadratic expressions ax^2 + bx + c
 */
export function performCompletingSquare(poly: Polynomial): CompletingSquareResult {
  if (poly.degree > 2) {
    throw new Error(`Completing the square is designed for quadratic polynomials (degree 2). Given polynomial has degree ${poly.degree}.`);
  }

  const a = poly.getCoeff(2);
  const b = poly.getCoeff(1);
  const c = poly.getCoeff(0);

  if (a.isZero()) {
    throw new Error('Coefficient of x^2 cannot be zero for quadratic completing the square.');
  }

  // h = -b / (2a)
  const h = b.negate().div(a.mul(2));
  
  // k = c - b^2 / (4a)
  const bSquared = b.mul(b);
  const fourA = a.mul(4);
  const k = c.sub(bSquared.div(fourA));

  const vertex = { x: h, y: k };

  // Discriminant Delta = b^2 - 4ac
  const fourAC = a.mul(4).mul(c);
  const discriminant = bSquared.sub(fourAC);

  // Roots
  let rootsResult: CompletingSquareResult['roots'];
  const dVal = discriminant.toNumber();
  const aVal = a.toNumber();
  const bVal = b.toNumber();
  const cVal = c.toNumber();

  if (dVal > 0) {
    const sqrtD = Math.sqrt(dVal);
    const r1 = (-bVal + sqrtD) / (2 * aVal);
    const r2 = (-bVal - sqrtD) / (2 * aVal);

    let r1Latex = `\\frac{${b.negate().toLatex()} + \\sqrt{${discriminant.toLatex()}}}{${a.mul(2).toLatex()}}`;
    let r2Latex = `\\frac{${b.negate().toLatex()} - \\sqrt{${discriminant.toLatex()}}}{${a.mul(2).toLatex()}}`;

    if (Number.isInteger(sqrtD)) {
      const r1Frac = b.negate().add(Fraction.fromNumber(sqrtD)).div(a.mul(2));
      const r2Frac = b.negate().sub(Fraction.fromNumber(sqrtD)).div(a.mul(2));
      r1Latex = r1Frac.toLatex();
      r2Latex = r2Frac.toLatex();
    }

    rootsResult = {
      type: 'two_real',
      x1Str: `x_1 ≈ ${r1.toFixed(4)}`,
      x2Str: `x_2 ≈ ${r2.toFixed(4)}`,
      x1Latex: `x_1 = ${r1Latex}`,
      x2Latex: `x_2 = ${r2Latex}`,
      numericValues: [r1, r2],
    };
  } else if (dVal === 0) {
    const r = h;
    rootsResult = {
      type: 'one_real',
      x1Str: `x = ${r.toString()}`,
      x2Str: `x = ${r.toString()}`,
      x1Latex: `x = ${r.toLatex()}`,
      x2Latex: `x = ${r.toLatex()}`,
      numericValues: [r.toNumber(), r.toNumber()],
    };
  } else {
    // Complex roots
    const absD = Math.abs(dVal);
    const sqrtAbsD = Math.sqrt(absD);
    const realPart = -bVal / (2 * aVal);
    const imagPart = sqrtAbsD / (2 * Math.abs(aVal));

    rootsResult = {
      type: 'complex',
      x1Str: `x_1 = ${realPart.toFixed(4)} + ${imagPart.toFixed(4)}i`,
      x2Str: `x_2 = ${realPart.toFixed(4)} - ${imagPart.toFixed(4)}i`,
      x1Latex: `x_1 = ${Fraction.fromNumber(realPart).toLatex()} + \\frac{\\sqrt{${Math.abs(dVal)}}}{${a.mul(2).abs().toLatex()}}i`,
      x2Latex: `x_2 = ${Fraction.fromNumber(realPart).toLatex()} - \\frac{\\sqrt{${Math.abs(dVal)}}}{${a.mul(2).abs().toLatex()}}i`,
    };
  }

  // Steps breakdown
  const steps: CompletingSquareResult['steps'] = [];

  // Step 1: Identify coefficients
  steps.push({
    stepIndex: 1,
    titleEn: 'Identify Coefficients',
    titleZh: '确定系数 a, b, c',
    latex: `a = ${a.toLatex()}, \\quad b = ${b.toLatex()}, \\quad c = ${c.toLatex()}`,
    textEn: `Extract coefficients from standard quadratic form ax² + bx + c: a = ${a.toString()}, b = ${b.toString()}, c = ${c.toString()}.`,
    textZh: `从标准二次方程 ax² + bx + c 提取系数：a = ${a.toString()}, b = ${b.toString()}, c = ${c.toString()}。`,
  });

  // Step 2: Factor out a if a != 1
  const bOverA = b.div(a);
  if (!a.isOne()) {
    steps.push({
      stepIndex: 2,
      titleEn: 'Factor Out Leading Coefficient a',
      titleZh: '提取二次项系数 a',
      latex: `${a.toLatex()} \\left( x^2 ${bOverA.toSignedLatex('x', 1, false)} \\right) ${c.toSignedLatex('x', 0, false)}`,
      textEn: `Factor out ${a.toString()} from the x² and x terms.`,
      textZh: `从 x² 项与 x 项中提取 ${a.toString()}。`,
    });
  }

  // Step 3: Compute (b / (2a))^2 and complete square inside
  const halfBOverA = bOverA.div(2);
  const halfBOverASq = halfBOverA.mul(halfBOverA);

  const signInside = halfBOverA.isNegative() ? '-' : '+';
  const absHalfB = halfBOverA.abs();

  steps.push({
    stepIndex: steps.length + 1,
    titleEn: 'Add and Subtract (b / 2a)²',
    titleZh: '加上并减去配方常数项 (b / 2a)²',
    latex: `${a.isOne() ? '' : a.toLatex() + ' \\left['} x^2 ${bOverA.toSignedLatex('x', 1, false)} + \\left(${halfBOverA.toLatex()}\\right)^2 - \\left(${halfBOverA.toLatex()}\\right)^2 ${a.isOne() ? '' : '\\right]'} ${c.toSignedLatex('x', 0, false)}`,
    textEn: `Take half of x coefficient (${bOverA.toString()} / 2 = ${halfBOverA.toString()}), square it to get ${halfBOverASq.toString()}, then add and subtract inside.`,
    textZh: `取 x 项系数的一半 (${bOverA.toString()} / 2 = ${halfBOverA.toString()})，平方得到 ${halfBOverASq.toString()}，在式中加上并减去该项。`,
  });

  // Step 4: Express as a perfect square
  const minusAhSq = a.mul(halfBOverASq).negate();
  steps.push({
    stepIndex: steps.length + 1,
    titleEn: 'Write as Perfect Square',
    titleZh: '写为完全平方式形式',
    latex: `${a.isOne() ? '' : a.toLatex()} \\left( x ${signInside} ${absHalfB.toLatex()} \\right)^2 ${minusAhSq.toSignedLatex('x', 0, false)} ${c.toSignedLatex('x', 0, false)}`,
    textEn: `Combine the first three terms into perfect square (x ${signInside} ${absHalfB.toString()})² and expand outer constant.`,
    textZh: `将前三项化简为完全平方式 (x ${signInside} ${absHalfB.toString()})² 并展开常数项。`,
  });

  // Step 5: Final Vertex Form
  let vertexFormLatex = '';
  if (a.isOne()) {
    vertexFormLatex = `\\left( x ${signInside} ${absHalfB.toLatex()} \\right)^2 ${k.toSignedLatex('x', 0, false)}`;
  } else {
    vertexFormLatex = `${a.toLatex()} \\left( x ${signInside} ${absHalfB.toLatex()} \\right)^2 ${k.toSignedLatex('x', 0, false)}`;
  }

  steps.push({
    stepIndex: steps.length + 1,
    titleEn: 'Final Vertex Form: y = a(x - h)² + k',
    titleZh: '最终顶点式：y = a(x - h)² + k',
    latex: `y = ${vertexFormLatex}`,
    textEn: `Simplify constant terms to get vertex form y = a(x - h)² + k where vertex (h, k) = (${h.toString()}, ${k.toString()}).`,
    textZh: `合并常数项得到顶点式 y = a(x - h)² + k，其中顶点 (h, k) = (${h.toString()}, ${k.toString()})。`,
  });

  return {
    original: poly,
    a,
    b,
    c,
    h,
    k,
    vertex,
    discriminant,
    roots: rootsResult,
    axisOfSymmetry: `x = ${h.toString()}`,
    yIntercept: { x: 0, y: c },
    openingDirection: a.isPositive() ? 'up' : 'down',
    extremum: {
      type: a.isPositive() ? 'minimum' : 'maximum',
      value: k,
      atX: h,
    },
    steps,
  };
}
