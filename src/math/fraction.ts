/**
 * Exact Fraction arithmetic to prevent floating-point rounding errors
 * in polynomial calculations (e.g., 1/3, -5/2, etc.).
 */

export class Fraction {
  readonly num: bigint;
  readonly den: bigint;

  constructor(numerator: bigint | number, denominator: bigint | number = 1n) {
    let n = typeof numerator === 'bigint' ? numerator : BigInt(Math.round(numerator));
    let d = typeof denominator === 'bigint' ? denominator : BigInt(Math.round(denominator));

    if (d === 0n) {
      throw new Error('Denominator cannot be zero');
    }

    if (d < 0n) {
      n = -n;
      d = -d;
    }

    const g = Fraction.gcd(n < 0n ? -n : n, d);
    this.num = n / g;
    this.den = d / g;
  }

  static gcd(a: bigint, b: bigint): bigint {
    while (b !== 0n) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  }

  static fromString(str: string): Fraction {
    const clean = str.replace(/\s+/g, '');
    if (!clean) return new Fraction(0n, 1n);

    // check if it's a fraction "p/q"
    if (clean.includes('/')) {
      const parts = clean.split('/');
      if (parts.length === 2) {
        const n = BigInt(parts[0]);
        const d = BigInt(parts[1]);
        return new Fraction(n, d);
      }
    }

    // check if decimal
    if (clean.includes('.')) {
      const sign = clean.startsWith('-') ? -1n : 1n;
      const unsignedStr = clean.replace('-', '');
      const [intPart, decPart] = unsignedStr.split('.');
      const den = 10n ** BigInt(decPart.length);
      const num = BigInt(intPart) * den + BigInt(decPart);
      return new Fraction(sign * num, den);
    }

    return new Fraction(BigInt(clean), 1n);
  }

  static zero(): Fraction {
    return new Fraction(0n, 1n);
  }

  static one(): Fraction {
    return new Fraction(1n, 1n);
  }

  add(other: Fraction): Fraction {
    return new Fraction(
      this.num * other.den + other.num * this.den,
      this.den * other.den
    );
  }

  sub(other: Fraction): Fraction {
    return new Fraction(
      this.num * other.den - other.num * this.den,
      this.den * other.den
    );
  }

  mul(other: Fraction): Fraction {
    return new Fraction(this.num * other.num, this.den * other.den);
  }

  div(other: Fraction): Fraction {
    if (other.isZero()) {
      throw new Error('Division by zero fraction');
    }
    return new Fraction(this.num * other.den, this.den * other.num);
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

  isNegative(): boolean {
    return this.num < 0n;
  }

  toNumber(): number {
    return Number(this.num) / Number(this.den);
  }

  toString(): string {
    if (this.den === 1n) {
      return this.num.toString();
    }
    return `${this.num}/${this.den}`;
  }

  toSignedString(isLeading: boolean = false): string {
    if (this.isZero()) return '0';
    const isNeg = this.isNegative();
    const absFrac = this.abs();
    const valStr = absFrac.toString();

    if (isLeading) {
      return isNeg ? `-${valStr}` : valStr;
    }
    return isNeg ? `- ${valStr}` : `+ ${valStr}`;
  }

  toLatex(): string {
    if (this.den === 1n) {
      return this.num.toString();
    }
    if (this.isNegative()) {
      return `-\\frac{${-this.num}}{${this.den}}`;
    }
    return `\\frac{${this.num}}{${this.den}}`;
  }
}
