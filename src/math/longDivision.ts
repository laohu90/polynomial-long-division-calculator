import { Fraction } from './fraction';
import { Polynomial, Term } from './polynomial';

export interface DivisionStep {
  stepNumber: number;
  currentWorkingPoly: Polynomial;
  leadingDividendTerm: Term;
  leadingDivisorTerm: Term;
  quotientTerm: Term;
  product: Polynomial;
  subtractionNegated: Polynomial;
  newRemainder: Polynomial;
  broughtDownTerm: Term | null;
  newLine: Polynomial;
  explanation: {
    divide: string;
    multiply: string;
    subtract: string;
    bringDown: string;
  };
}

export interface VerificationStep {
  divisorTimesQuotient: string;
  expandedProduct: string;
  addRemainder: string;
  simplifiedMatchesDividend: boolean;
}

export interface GridColumn {
  power: number;
  label: string; // e.g. "x^3", "x^2", "x", "1"
}

export interface GridRow {
  type: 'quotient' | 'dividend' | 'multiply' | 'subtraction' | 'remainder' | 'divider';
  label?: string;
  cells: { power: number; text: string; isHighlighted?: boolean; isSignFlipped?: boolean }[];
}

export interface LongDivisionResult {
  dividend: Polynomial;
  divisor: Polynomial;
  quotient: Polynomial;
  remainder: Polynomial;
  steps: DivisionStep[];
  isExact: boolean;
  missingDividendPowers: number[];
  dividendPadded: Polynomial;
  divisorPadded: Polynomial;
  slantAsymptote: string | null;
  verification: VerificationStep;
  allPowers: number[]; // All column powers descending
  gridRows: GridRow[];
}

export function performPolynomialLongDivision(
  dividend: Polynomial,
  divisor: Polynomial
): LongDivisionResult {
  if (divisor.isZero()) {
    throw new Error('Divisor cannot be zero polynomial');
  }

  // Detect missing powers
  const divDeg = Math.max(0, dividend.degree);
  const missingDividendPowers: number[] = [];
  for (let p = divDeg; p >= 0; p--) {
    if (dividend.getCoefficient(p).isZero()) {
      missingDividendPowers.push(p);
    }
  }

  // Prepare padded polynomials
  const denseDividendTerms = dividend.getDenseCoefficients();
  const denseDivisorTerms = divisor.getDenseCoefficients();

  const dividendPadded = new Polynomial(
    denseDividendTerms.map((t) => ({ power: t.power, coef: t.coef }))
  );
  const divisorPadded = new Polynomial(
    denseDivisorTerms.map((t) => ({ power: t.power, coef: t.coef }))
  );

  // If degree(dividend) < degree(divisor)
  if (dividend.degree < divisor.degree) {
    const qZero = Polynomial.zero();
    const allPowers = Array.from({ length: divDeg + 1 }, (_, i) => divDeg - i);
    return {
      dividend,
      divisor,
      quotient: qZero,
      remainder: dividend,
      steps: [],
      isExact: dividend.isZero(),
      missingDividendPowers,
      dividendPadded,
      divisorPadded,
      slantAsymptote: null,
      verification: {
        divisorTimesQuotient: `(${divisor.toString()}) · (0)`,
        expandedProduct: '0',
        addRemainder: `0 + (${dividend.toString()}) = ${dividend.toString()}`,
        simplifiedMatchesDividend: true,
      },
      allPowers,
      gridRows: [],
    };
  }

  const quotientTerms: Term[] = [];
  const steps: DivisionStep[] = [];
  let currentRemainder = dividend;

  const maxDeg = Math.max(dividend.degree, divisor.degree);
  const allPowers: number[] = [];
  for (let p = maxDeg; p >= 0; p--) {
    allPowers.push(p);
  }

  const gridRows: GridRow[] = [];

  let stepCount = 0;
  const maxIterations = 50; // Safeguard

  while (
    !currentRemainder.isZero() &&
    currentRemainder.degree >= divisor.degree &&
    stepCount < maxIterations
  ) {
    stepCount++;
    const leadDiv = currentRemainder.leadingTerm;
    const leadDvr = divisor.leadingTerm;

    // Divide leading terms: leadDiv.coef / leadDvr.coef, leadDiv.power - leadDvr.power
    const qCoef = leadDiv.coef.div(leadDvr.coef);
    const qPower = leadDiv.power - leadDvr.power;
    const qTerm: Term = { coef: qCoef, power: qPower };
    quotientTerms.push(qTerm);

    // Multiply: qTerm * divisor
    const product = divisor.mulTerm(qTerm);

    // Subtract: currentRemainder - product
    const subtractionNegated = product.negate();
    const newRem = currentRemainder.sub(product);

    // Find the next term from dividend that is brought down
    let broughtDownTerm: Term | null = null;
    if (newRem.degree >= 0) {
      // Look for the next highest term in original dividend that wasn't included yet
      // In algebra, we bring down the term corresponding to the next power
      const nextPower = (leadDiv.power - 1);
      if (nextPower >= 0) {
        const coefInDiv = dividend.getCoefficient(nextPower);
        broughtDownTerm = { power: nextPower, coef: coefInDiv };
      }
    }

    const qTermStr = Polynomial.formatTerm(qTerm, quotientTerms.length === 1, dividend.variable);
    const leadDivStr = Polynomial.formatTerm(leadDiv, true, dividend.variable);
    const leadDvrStr = Polynomial.formatTerm(leadDvr, true, divisor.variable);

    const stepObj: DivisionStep = {
      stepNumber: stepCount,
      currentWorkingPoly: currentRemainder,
      leadingDividendTerm: leadDiv,
      leadingDivisorTerm: leadDvr,
      quotientTerm: qTerm,
      product,
      subtractionNegated,
      newRemainder: newRem,
      broughtDownTerm,
      newLine: newRem,
      explanation: {
        divide: `Divide leading term (${leadDivStr}) by leading term (${leadDvrStr}) to get quotient term: ${qTermStr}`,
        multiply: `Multiply (${qTermStr}) by divisor (${divisor.toString()}): result is (${product.toString()})`,
        subtract: `Subtract (${product.toString()}) from current dividend. Changing signs gives: (${subtractionNegated.toString()}), yielding remainder (${newRem.toString()})`,
        bringDown: broughtDownTerm
          ? `Bring down the next term (${Polynomial.formatTerm(broughtDownTerm, false, dividend.variable)}) to form the next line (${newRem.toString()})`
          : `No further terms to bring down.`,
      },
    };

    steps.push(stepObj);
    currentRemainder = newRem;
  }

  const quotient = new Polynomial(quotientTerms, dividend.variable);
  const finalRemainder = currentRemainder;
  const isExact = finalRemainder.isZero();

  // Slant asymptote check: degree(dividend) - degree(divisor) === 1
  let slantAsymptote: string | null = null;
  if (dividend.degree - divisor.degree === 1 && quotient.terms.length > 0) {
    slantAsymptote = `y = ${quotient.toString()}`;
  }

  // Verification step
  const expandedProduct = divisor.mul(quotient);
  const sumWithRemainder = expandedProduct.add(finalRemainder);
  const simplifiedMatchesDividend = sumWithRemainder.sub(dividend).isZero();

  const verification: VerificationStep = {
    divisorTimesQuotient: `(${divisor.toString()}) · (${quotient.toString()})`,
    expandedProduct: expandedProduct.toString(),
    addRemainder: `(${expandedProduct.toString()}) + (${finalRemainder.toString()}) = ${sumWithRemainder.toString()}`,
    simplifiedMatchesDividend,
  };

  // Build the Visual Grid Rows for classic bus-stop division view
  // 1. Quotient Row
  gridRows.push({
    type: 'quotient',
    label: 'Quotient',
    cells: allPowers.map((p) => {
      const c = quotient.getCoefficient(p);
      const isLead = p === quotient.degree;
      return {
        power: p,
        text: c.isZero() ? '' : Polynomial.formatTerm({ coef: c, power: p }, isLead),
        isHighlighted: true,
      };
    }),
  });

  // 2. Dividend Row
  gridRows.push({
    type: 'dividend',
    label: 'Dividend',
    cells: allPowers.map((p) => {
      const c = dividend.getCoefficient(p);
      const isLead = p === dividend.degree;
      return {
        power: p,
        text: c.isZero()
          ? missingDividendPowers.includes(p) && p < dividend.degree
            ? `+ 0x${p > 1 ? `^${p}` : ''}`
            : ''
          : Polynomial.formatTerm({ coef: c, power: p }, isLead),
      };
    }),
  });

  // 3. For each step, add multiply row, divider, and remainder line
  steps.forEach((step, sIdx) => {
    // Product row with minus sign
    gridRows.push({
      type: 'multiply',
      label: `− (Step ${sIdx + 1})`,
      cells: allPowers.map((p) => {
        const c = step.product.getCoefficient(p);
        const isLead = p === step.product.degree;
        return {
          power: p,
          text: c.isZero() ? '' : Polynomial.formatTerm({ coef: c, power: p }, isLead),
          isSignFlipped: true,
        };
      }),
    });

    // Divider bar
    gridRows.push({
      type: 'divider',
      cells: allPowers.map((p) => ({ power: p, text: '————' })),
    });

    // Subtraction Remainder line
    const isLast = sIdx === steps.length - 1;
    gridRows.push({
      type: 'remainder',
      label: isLast ? 'Final Remainder' : `Remainder ${sIdx + 1}`,
      cells: allPowers.map((p) => {
        const c = step.newRemainder.getCoefficient(p);
        const isLead = p === step.newRemainder.degree;
        return {
          power: p,
          text: c.isZero()
            ? (isLast && step.newRemainder.isZero() && p === 0 ? '0' : '')
            : Polynomial.formatTerm({ coef: c, power: p }, isLead),
          isHighlighted: isLast,
        };
      }),
    });
  });

  return {
    dividend,
    divisor,
    quotient,
    remainder: finalRemainder,
    steps,
    isExact,
    missingDividendPowers,
    dividendPadded,
    divisorPadded,
    slantAsymptote,
    verification,
    allPowers,
    gridRows,
  };
}
