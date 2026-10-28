/**
 * Fraction representation for exact rational arithmetic using BigInt.
 */

export class Fraction {
  readonly num: bigint;
  readonly den: bigint;

  constructor(num: bigint | number | string, den: bigint | number | string = 1n) {
    let n = typeof num === 'bigint' ? num : BigInt(Math.round(Number(num)));
    let d = typeof den === 'bigint' ? den : BigInt(Math.round(Number(den)));

    // Handle decimal or string numbers passed to constructor
    if (typeof num === 'number' || typeof num === 'string') {
      const parsed = Fraction.parseString(String(num));
      if (parsed) {
        n = parsed.num;
        d = parsed.den * (typeof den === 'bigint' ? den : BigInt(Math.round(Number(den))));
      }
    }

    if (d === 0n) {
      throw new Error('Division by zero in Fraction');
    }

    if (d < 0n) {
      n = -n;
      d = -d;
    }

    const g = Fraction.gcd(n < 0n ? -n : n, d);
    this.num = n / g;
    this.den = d / g;
  }

  static ZERO = new Fraction(0n, 1n);
  static ONE = new Fraction(1n, 1n);

  private static gcd(a: bigint, b: bigint): bigint {
    while (b !== 0n) {
      const t = b;
      b = a % b;
      a = t;
    }
    return a;
  }

  static parseString(str: string): Fraction | null {
    const s = str.trim().replace(/\s+/g, '');
    if (!s) return null;

    if (s.includes('/')) {
      const parts = s.split('/');
      if (parts.length !== 2) return null;
      const numP = Fraction.parseString(parts[0]);
      const denP = Fraction.parseString(parts[1]);
      if (!numP || !denP || denP.isZero()) return null;
      return numP.div(denP);
    }

    if (s.includes('.')) {
      const parts = s.split('.');
      if (parts.length !== 2) return null;
      const decPlaces = parts[1].length;
      const whole = parts[0] ? BigInt(parts[0]) : 0n;
      const sign = parts[0].startsWith('-') ? -1n : 1n;
      const fracPart = BigInt(parts[1]);
      const den = 10n ** BigInt(decPlaces);
      const absWhole = whole < 0n ? -whole : whole;
      const num = absWhole * den + fracPart;
      return new Fraction(sign * num, den);
    }

    try {
      const b = BigInt(s);
      return new Fraction(b, 1n);
    } catch {
      return null;
    }
  }

  static fromNumber(val: number): Fraction {
    if (Number.isInteger(val)) {
      return new Fraction(BigInt(val), 1n);
    }
    // Approximate floating point to exact fraction
    const str = val.toFixed(6);
    return Fraction.parseString(str) || new Fraction(0n, 1n);
  }

  add(other: Fraction | bigint | number): Fraction {
    const o = other instanceof Fraction ? other : Fraction.fromNumber(Number(other));
    return new Fraction(this.num * o.den + o.num * this.den, this.den * o.den);
  }

  sub(other: Fraction | bigint | number): Fraction {
    const o = other instanceof Fraction ? other : Fraction.fromNumber(Number(other));
    return new Fraction(this.num * o.den - o.num * this.den, this.den * o.den);
  }

  mul(other: Fraction | bigint | number): Fraction {
    const o = other instanceof Fraction ? other : Fraction.fromNumber(Number(other));
    return new Fraction(this.num * o.num, this.den * o.den);
  }

  div(other: Fraction | bigint | number): Fraction {
    const o = other instanceof Fraction ? other : Fraction.fromNumber(Number(other));
    if (o.isZero()) {
      throw new Error('Division by zero in Fraction');
    }
    return new Fraction(this.num * o.den, this.den * o.num);
  }

  negate(): Fraction {
    return new Fraction(-this.num, this.den);
  }

  abs(): Fraction {
    return new Fraction(this.num < 0n ? -this.num : this.num, this.den);
  }

  isZero(): boolean {
    return this.num === 0n;
  }

  isOne(): boolean {
    return this.num === 1n && this.den === 1n;
  }

  isNegativeOne(): boolean {
    return this.num === -1n && this.den === 1n;
  }

  isPositive(): boolean {
    return this.num > 0n;
  }

  isNegative(): boolean {
    return this.num < 0n;
  }

  isInteger(): boolean {
    return this.den === 1n;
  }

  equals(other: Fraction): boolean {
    return this.num === other.num && this.den === other.den;
  }

  toNumber(): number {
    return Number(this.num) / Number(this.den);
  }

  /**
   * Format as string: 3, -5, 13/4, -1/2
   */
  toString(): string {
    if (this.den === 1n) {
      return this.num.toString();
    }
    return `${this.num}/${this.den}`;
  }

  /**
   * Format for LaTeX: \frac{a}{b} or integer
   */
  toLatex(): string {
    if (this.den === 1n) {
      return this.num.toString();
    }
    if (this.num < 0n) {
      return `-\\frac{${-this.num}}{${this.den}}`;
    }
    return `\\frac{${this.num}}{${this.den}}`;
  }

  /**
   * Format signed for polynomial terms: + 3x^2, - 5/2x
   */
  toSignedTermString(varName = 'x', power = 1, isFirstTerm = false): string {
    if (this.isZero()) return '';

    let signStr = '';
    let absFrac = this.abs();

    if (isFirstTerm) {
      if (this.isNegative()) signStr = '-';
    } else {
      signStr = this.isPositive() ? ' + ' : ' - ';
    }

    let coeffStr = '';
    if (power === 0) {
      coeffStr = absFrac.toString();
    } else {
      if (absFrac.isOne()) {
        coeffStr = '';
      } else {
        coeffStr = absFrac.toString();
      }
    }

    let varStr = '';
    if (power === 1) {
      varStr = varName;
    } else if (power > 1) {
      varStr = `${varName}^${power}`;
    }

    return `${signStr}${coeffStr}${varStr}`;
  }

  /**
   * Format signed LaTeX for polynomial terms
   */
  toSignedLatex(varName = 'x', power = 1, isFirstTerm = false): string {
    if (this.isZero()) return '';

    let signStr = '';
    let absFrac = this.abs();

    if (isFirstTerm) {
      if (this.isNegative()) signStr = '-';
    } else {
      signStr = this.isPositive() ? ' + ' : ' - ';
    }

    let coeffStr = '';
    if (power === 0) {
      coeffStr = absFrac.toLatex();
    } else {
      if (absFrac.isOne()) {
        coeffStr = '';
      } else {
        coeffStr = absFrac.toLatex();
      }
    }

    let varStr = '';
    if (power === 1) {
      varStr = varName;
    } else if (power > 1) {
      varStr = `${varName}^{${power}}`;
    }

    return `${signStr}${coeffStr}${varStr}`;
  }
}
