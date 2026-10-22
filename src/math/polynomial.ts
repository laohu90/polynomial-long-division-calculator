import { Fraction } from './fraction';

export interface Term {
  coef: Fraction;
  power: number;
}

export class Polynomial {
  readonly terms: Term[]; // sorted by power descending, no zero terms (unless entire poly is 0)
  readonly variable: string;

  constructor(terms: Term[] = [], variable: string = 'x') {
    this.variable = variable || 'x';

    // Combine like terms and remove zeros
    const powerMap = new Map<number, Fraction>();
    for (const t of terms) {
      const cur = powerMap.get(t.power) || Fraction.zero();
      powerMap.set(t.power, cur.add(t.coef));
    }

    const filtered: Term[] = [];
    for (const [power, coef] of powerMap.entries()) {
      if (!coef.isZero()) {
        filtered.push({ power, coef });
      }
    }

    // Sort descending by power
    filtered.sort((a, b) => b.power - a.power);

    if (filtered.length === 0) {
      this.terms = [{ power: 0, coef: Fraction.zero() }];
    } else {
      this.terms = filtered;
    }
  }

  static zero(variable: string = 'x'): Polynomial {
    return new Polynomial([{ power: 0, coef: Fraction.zero() }], variable);
  }

  static term(coef: Fraction | number | bigint, power: number, variable: string = 'x'): Polynomial {
    const c = coef instanceof Fraction ? coef : new Fraction(coef);
    return new Polynomial([{ coef: c, power }], variable);
  }

  get degree(): number {
    if (this.isZero()) return -1;
    return this.terms[0].power;
  }

  get leadingTerm(): Term {
    return this.terms[0];
  }

  get leadingCoefficient(): Fraction {
    return this.terms[0].coef;
  }

  isZero(): boolean {
    return this.terms.length === 1 && this.terms[0].coef.isZero();
  }

  isConstant(): boolean {
    return this.degree <= 0;
  }

  getCoefficient(power: number): Fraction {
    const t = this.terms.find((term) => term.power === power);
    return t ? t.coef : Fraction.zero();
  }

  /**
   * Returns a dense array of coefficients from degree down to 0, including 0s.
   * e.g., x^3 - 1 -> [1, 0, 0, -1]
   */
  getDenseCoefficients(): { power: number; coef: Fraction }[] {
    const deg = Math.max(0, this.degree);
    const result: { power: number; coef: Fraction }[] = [];
    for (let p = deg; p >= 0; p--) {
      result.push({ power: p, coef: this.getCoefficient(p) });
    }
    return result;
  }

  add(other: Polynomial): Polynomial {
    return new Polynomial([...this.terms, ...other.terms], this.variable);
  }

  sub(other: Polynomial): Polynomial {
    const negOther = other.terms.map((t) => ({
      power: t.power,
      coef: t.coef.negate(),
    }));
    return new Polynomial([...this.terms, ...negOther], this.variable);
  }

  mul(other: Polynomial): Polynomial {
    if (this.isZero() || other.isZero()) return Polynomial.zero(this.variable);
    const newTerms: Term[] = [];
    for (const t1 of this.terms) {
      for (const t2 of other.terms) {
        newTerms.push({
          power: t1.power + t2.power,
          coef: t1.coef.mul(t2.coef),
        });
      }
    }
    return new Polynomial(newTerms, this.variable);
  }

  mulTerm(term: Term): Polynomial {
    if (term.coef.isZero() || this.isZero()) return Polynomial.zero(this.variable);
    return new Polynomial(
      this.terms.map((t) => ({
        power: t.power + term.power,
        coef: t.coef.mul(term.coef),
      })),
      this.variable
    );
  }

  negate(): Polynomial {
    return new Polynomial(
      this.terms.map((t) => ({ power: t.power, coef: t.coef.negate() })),
      this.variable
    );
  }

  evaluate(val: Fraction): Fraction {
    let result = Fraction.zero();
    for (const t of this.terms) {
      let xPower = Fraction.one();
      for (let i = 0; i < t.power; i++) {
        xPower = xPower.mul(val);
      }
      result = result.add(t.coef.mul(xPower));
    }
    return result;
  }

  static formatTerm(term: Term, isLeading: boolean, variable: string = 'x'): string {
    const { coef, power } = term;
    if (coef.isZero()) return isLeading ? '0' : '';

    const isNeg = coef.isNegative();
    const absC = coef.abs();
    const signStr = isLeading ? (isNeg ? '-' : '') : isNeg ? ' - ' : ' + ';

    let coefStr = '';
    if (power === 0) {
      coefStr = absC.toString();
    } else {
      coefStr = absC.isOne() ? '' : absC.toString();
    }

    let varStr = '';
    if (power === 1) {
      varStr = variable;
    } else if (power > 1) {
      varStr = `${variable}^${power}`;
    }

    return `${signStr}${coefStr}${varStr}`;
  }

  toString(customVar?: string): string {
    const v = customVar || this.variable;
    if (this.isZero()) return '0';
    return this.terms
      .map((t, idx) => Polynomial.formatTerm(t, idx === 0, v))
      .join('');
  }

  toHtmlString(customVar?: string): string {
    const v = customVar || this.variable;
    if (this.isZero()) return '0';
    return this.terms
      .map((t, idx) => {
        const { coef, power } = t;
        const isNeg = coef.isNegative();
        const absC = coef.abs();
        const signStr = idx === 0 ? (isNeg ? '-' : '') : isNeg ? ' − ' : ' + ';
        let coefStr = '';
        if (power === 0) {
          coefStr = absC.toString();
        } else {
          coefStr = absC.isOne() ? '' : absC.toString();
        }

        let varStr = '';
        if (power === 1) {
          varStr = v;
        } else if (power > 1) {
          varStr = `${v}<sup>${power}</sup>`;
        }
        return `${signStr}${coefStr}${varStr}`;
      })
      .join('');
  }

  toPaddedString(customVar?: string): string {
    const v = customVar || this.variable;
    if (this.isZero()) return '0';
    const dense = this.getDenseCoefficients();
    return dense
      .map((t, idx) => {
        if (t.coef.isZero()) {
          const varStr = t.power === 0 ? '0' : t.power === 1 ? `0${v}` : `0${v}^${t.power}`;
          return idx === 0 ? varStr : ` + ${varStr}`;
        }
        return Polynomial.formatTerm(t, idx === 0, v);
      })
      .join('');
  }

  /**
   * Detects the primary variable letter in input string (e.g. x, y, t, z, u, n).
   */
  static detectVariable(input: string): string {
    const match = input.match(/[a-zA-Z]/);
    return match ? match[0].toLowerCase() : 'x';
  }

  /**
   * Parse arbitrary polynomial strings like:
   * "2x^3 - x^2 - 7x + 2"
   * "x^4 - 16"
   * "-x^2 + 3/4x - 1"
   * "(2x - 5)"
   */
  static parse(input: string, explicitVar?: string): Polynomial {
    let raw = input.trim();
    if (!raw) return Polynomial.zero(explicitVar || 'x');

    const detectedVar = explicitVar || Polynomial.detectVariable(raw);

    // Strip outer parentheses
    if (raw.startsWith('(') && raw.endsWith(')')) {
      raw = raw.slice(1, -1).trim();
    }

    // Replace '**' with '^'
    raw = raw.replace(/\*\*/g, '^');

    // Normalize user's variable to lowercase 'x' for parsing
    const varRegex = new RegExp(detectedVar, 'gi');
    raw = raw.replace(varRegex, 'x');

    // Remove all whitespace
    const s = raw.replace(/\s+/g, '');

    // Replace '-' with '+-' so every term is separated by '+'
    // Do not replace if '-' is at start or preceded by operator '^', '/', '(', '+'
    let separated = '';
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (
        c === '-' &&
        i > 0 &&
        s[i - 1] !== '^' &&
        s[i - 1] !== '/' &&
        s[i - 1] !== '(' &&
        s[i - 1] !== '+'
      ) {
        separated += '+-';
      } else {
        separated += c;
      }
    }

    const tokens = separated.split('+').filter(Boolean);
    const terms: Term[] = [];

    for (const tok of tokens) {
      if (!tok) continue;

      if (!tok.includes('x')) {
        // Pure constant (e.g. "2", "-16", "3/4")
        const frac = Fraction.fromString(tok);
        terms.push({
          power: 0,
          coef: frac,
        });
      } else {
        // Contains 'x' (e.g. "2x^3", "-x^2", "-7x", "x", "-x", "1/2x^2")
        const parts = tok.split('x');
        let coefStr = parts[0];
        let powerStr = parts[1] || '';

        // Determine power
        let power = 1;
        if (powerStr.startsWith('^')) {
          power = parseInt(powerStr.slice(1), 10);
          if (isNaN(power)) power = 1;
        }

        // Determine coefficient
        let frac: Fraction;
        if (!coefStr || coefStr === '') {
          frac = Fraction.one();
        } else if (coefStr === '-') {
          frac = Fraction.one().negate();
        } else if (coefStr === '+') {
          frac = Fraction.one();
        } else {
          // If coefficient has parentheses like (1/2)x or (-3/4)x
          if (coefStr.startsWith('(') && coefStr.endsWith(')')) {
            coefStr = coefStr.slice(1, -1);
          }
          frac = Fraction.fromString(coefStr);
        }

        terms.push({
          power,
          coef: frac,
        });
      }
    }

    return new Polynomial(terms, detectedVar);
  }
}
