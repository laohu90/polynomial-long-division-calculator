import { Fraction } from './fraction';

export interface Term {
  coef: Fraction;
  power: number;
}

export class Polynomial {
  readonly terms: Term[]; // sorted by power descending, no zero terms (unless entire poly is 0)

  constructor(terms: Term[] = []) {
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

  static zero(): Polynomial {
    return new Polynomial([{ power: 0, coef: Fraction.zero() }]);
  }

  static term(coef: Fraction | number | bigint, power: number): Polynomial {
    const c = coef instanceof Fraction ? coef : new Fraction(coef);
    return new Polynomial([{ coef: c, power }]);
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
    return new Polynomial([...this.terms, ...other.terms]);
  }

  sub(other: Polynomial): Polynomial {
    const negOther = other.terms.map((t) => ({
      power: t.power,
      coef: t.coef.negate(),
    }));
    return new Polynomial([...this.terms, ...negOther]);
  }

  mul(other: Polynomial): Polynomial {
    if (this.isZero() || other.isZero()) return Polynomial.zero();
    const newTerms: Term[] = [];
    for (const t1 of this.terms) {
      for (const t2 of other.terms) {
        newTerms.push({
          power: t1.power + t2.power,
          coef: t1.coef.mul(t2.coef),
        });
      }
    }
    return new Polynomial(newTerms);
  }

  mulTerm(term: Term): Polynomial {
    if (term.coef.isZero() || this.isZero()) return Polynomial.zero();
    return new Polynomial(
      this.terms.map((t) => ({
        power: t.power + term.power,
        coef: t.coef.mul(term.coef),
      }))
    );
  }

  negate(): Polynomial {
    return new Polynomial(
      this.terms.map((t) => ({ power: t.power, coef: t.coef.negate() }))
    );
  }

  /**
   * Evaluates polynomial at x = val (using Fraction)
   */
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

  /**
   * Format single term to string, e.g. -3x^2, + x, - 5
   */
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

  toString(variable: string = 'x'): string {
    if (this.isZero()) return '0';
    return this.terms
      .map((t, idx) => Polynomial.formatTerm(t, idx === 0, variable))
      .join('');
  }

  toHtmlString(variable: string = 'x'): string {
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
          varStr = variable;
        } else if (power > 1) {
          varStr = `${variable}<sup>${power}</sup>`;
        }
        return `${signStr}${coefStr}${varStr}`;
      })
      .join('');
  }

  toPaddedString(variable: string = 'x'): string {
    if (this.isZero()) return '0';
    const dense = this.getDenseCoefficients();
    return dense
      .map((t, idx) => {
        if (t.coef.isZero()) {
          const varStr = t.power === 0 ? '0' : t.power === 1 ? `0${variable}` : `0${variable}^${t.power}`;
          return idx === 0 ? varStr : ` + ${varStr}`;
        }
        return Polynomial.formatTerm(t, idx === 0, variable);
      })
      .join('');
  }

  /**
   * Parse arbitrary polynomial strings like:
   * "3x^3 - 2x^2 + 4x - 5"
   * "x^4 - 16"
   * "-x^2 + 3/4x - 1"
   * "(2x - 5)"
   */
  static parse(input: string, variable: string = 'x'): Polynomial {
    let clean = input.trim();
    if (!clean) return Polynomial.zero();

    // Strip outer parentheses
    if (clean.startsWith('(') && clean.endsWith(')')) {
      clean = clean.slice(1, -1).trim();
    }

    // Replace '**' with '^'
    clean = clean.replace(/\*\*/g, '^');
    // Normalize spaces
    clean = clean.replace(/\s+/g, ' ');

    // Normalize variable to lower-case 'x'
    const varRegex = new RegExp(variable, 'gi');
    clean = clean.replace(varRegex, 'x');

    // Tokenize terms: match signed chunks like "+3x^2", "-x", "4"
    // Insert '+' before '-' if not preceded by an operator or at start
    let formatted = '';
    for (let i = 0; i < clean.length; i++) {
      const ch = clean[i];
      if (ch === '-' && i > 0 && clean[i - 1] !== ' ' && clean[i - 1] !== '+' && clean[i - 1] !== '-' && clean[i - 1] !== '^' && clean[i - 1] !== '/') {
        formatted += ' -';
      } else if (ch === '+' && i > 0 && clean[i - 1] !== ' ' && clean[i - 1] !== '^' && clean[i - 1] !== '/') {
        formatted += ' +';
      } else {
        formatted += ch;
      }
    }

    const tokens = formatted.split(/\s+/).filter(Boolean);
    const terms: Term[] = [];

    for (const rawToken of tokens) {
      let tok = rawToken.trim();
      if (!tok || tok === '+') continue;

      let sign = 1n;
      if (tok.startsWith('+')) {
        tok = tok.slice(1);
      } else if (tok.startsWith('-')) {
        sign = -1n;
        tok = tok.slice(1);
      }

      if (!tok) continue;

      if (!tok.includes('x')) {
        // Pure constant
        const frac = Fraction.fromString(tok);
        terms.push({
          power: 0,
          coef: sign === -1n ? frac.negate() : frac,
        });
      } else {
        // Contains 'x'
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
        } else {
          frac = Fraction.fromString(coefStr);
        }

        terms.push({
          power,
          coef: sign === -1n ? frac.negate() : frac,
        });
      }
    }

    return new Polynomial(terms);
  }
}
