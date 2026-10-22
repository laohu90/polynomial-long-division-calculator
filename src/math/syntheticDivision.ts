import { Fraction } from './fraction';
import { Polynomial } from './polynomial';

export interface SyntheticDivisionColumn {
  power: number;
  dividendCoef: Fraction;
  productVal: Fraction | null; // null for first column
  resultVal: Fraction;
}

export interface SyntheticDivisionResult {
  isApplicable: boolean;
  reason?: string;
  root: Fraction; // c from (x - c) or -b/a from (ax + b)
  rootDisplay: string;
  divisorLeadingCoef: Fraction;
  columns: SyntheticDivisionColumn[];
  quotient: Polynomial;
  remainder: Fraction;
  isExact: boolean;
  stepsExplanation: string[];
}

export function performSyntheticDivision(
  dividend: Polynomial,
  divisor: Polynomial
): SyntheticDivisionResult {
  // Synthetic division is applicable ONLY when divisor degree is 1
  if (divisor.degree !== 1) {
    return {
      isApplicable: false,
      reason: 'Synthetic division can only be used when the divisor is linear (degree 1, like x - c or ax + b). For higher-degree divisors, use Polynomial Long Division.',
      root: Fraction.zero(),
      rootDisplay: '',
      divisorLeadingCoef: Fraction.one(),
      columns: [],
      quotient: Polynomial.zero(),
      remainder: Fraction.zero(),
      isExact: false,
      stepsExplanation: [],
    };
  }

  // Divisor is a*x + b
  const a = divisor.getCoefficient(1);
  const b = divisor.getCoefficient(0);

  // Root c is -b / a
  const root = b.negate().div(a);
  const rootDisplay = root.toString();

  // Get all dividend coefficients in descending order (including missing zero terms)
  const dense = dividend.getDenseCoefficients();
  const columns: SyntheticDivisionColumn[] = [];
  const stepsExplanation: string[] = [];

  let runningSum = Fraction.zero();

  for (let i = 0; i < dense.length; i++) {
    const item = dense[i];
    if (i === 0) {
      // First column: drop down directly
      runningSum = item.coef;
      columns.push({
        power: item.power,
        dividendCoef: item.coef,
        productVal: null,
        resultVal: runningSum,
      });
      stepsExplanation.push(
        `Column 1 (x^${item.power}): Bring down the leading coefficient ${item.coef.toString()} directly to the bottom row.`
      );
    } else {
      // Multiply previous bottom row sum by root
      const product = runningSum.mul(root);
      runningSum = item.coef.add(product);
      columns.push({
        power: item.power,
        dividendCoef: item.coef,
        productVal: product,
        resultVal: runningSum,
      });
      stepsExplanation.push(
        `Column ${i + 1} (x^${item.power}): Multiply previous result (${columns[i - 1].resultVal.toString()}) by root (${rootDisplay}) = ${product.toString()}. Add to top coefficient (${item.coef.toString()}) to get ${runningSum.toString()}.`
      );
    }
  }

  // The last column is the remainder
  const remainder = columns[columns.length - 1].resultVal;

  // The remaining columns form the quotient
  // Note: if divisor was (ax + b) where a != 1, divide the quotient coefficients by a
  const rawQuotientTerms = columns.slice(0, columns.length - 1).map((col, idx) => {
    const power = dividend.degree - 1 - idx;
    const adjustedCoef = a.isOne() ? col.resultVal : col.resultVal.div(a);
    return {
      power,
      coef: adjustedCoef,
    };
  });

  if (!a.isOne()) {
    stepsExplanation.push(
      `Since the divisor coefficient of x is ${a.toString()} (not 1), divide all quotient coefficients by ${a.toString()}.`
    );
  }

  const quotient = new Polynomial(rawQuotientTerms);
  const isExact = remainder.isZero();

  return {
    isApplicable: true,
    root,
    rootDisplay,
    divisorLeadingCoef: a,
    columns,
    quotient,
    remainder,
    isExact,
    stepsExplanation,
  };
}
