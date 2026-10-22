import { Fraction } from './fraction';
import { Polynomial } from './polynomial';

export interface CompletingTheSquareStep {
  stepNumber: number;
  title: string;
  expression: string;
  latex?: string;
  description: string;
  formulaHighlight?: string;
}

export interface CompletingTheSquareResult {
  a: Fraction;
  b: Fraction;
  c: Fraction;
  standardForm: string;
  vertexForm: string;
  vertex: { h: Fraction; k: Fraction; hDisplay: string; kDisplay: string };
  axisOfSymmetry: string;
  direction: 'up' | 'down';
  extremaType: 'minimum' | 'maximum';
  extremaValue: string;
  discriminant: Fraction;
  roots: {
    type: 'real_two' | 'real_one' | 'complex';
    display: string;
    root1: string;
    root2: string;
  };
  yIntercept: string;
  steps: CompletingTheSquareStep[];
}

export function performCompletingTheSquare(poly: Polynomial): CompletingTheSquareResult {
  if (poly.degree > 2) {
    throw new Error('Completing the square applies to quadratic polynomials of degree 2 (e.g. ax² + bx + c).');
  }

  const a = poly.getCoefficient(2);
  const b = poly.getCoefficient(1);
  const c = poly.getCoefficient(0);

  if (a.isZero()) {
    throw new Error('Coefficient "a" of x² cannot be 0 for a quadratic polynomial.');
  }

  const steps: CompletingTheSquareStep[] = [];

  // Standard form string
  const stdForm = poly.toString();

  // Step 1: Write down standard form
  steps.push({
    stepNumber: 1,
    title: 'Identify Coefficients',
    expression: `f(x) = ${stdForm}`,
    description: `Identify the quadratic coefficients: a = ${a.toString()}, b = ${b.toString()}, c = ${c.toString()}.`,
    formulaHighlight: 'f(x) = ax² + bx + c',
  });

  // Step 2: Factor out 'a' from the x terms if a != 1
  const bOverA = b.div(a);
  if (!a.isOne()) {
    const innerX = bOverA.isZero()
      ? 'x²'
      : `x² ${bOverA.toSignedString(false)}x`;
    const cStr = c.isZero() ? '' : ` ${c.toSignedString(false)}`;
    steps.push({
      stepNumber: 2,
      title: 'Factor Out the Leading Coefficient (a)',
      expression: `f(x) = ${a.toString()}(${innerX})${cStr}`,
      description: `Factor out a = ${a.toString()} from the terms containing x² and x.`,
      formulaHighlight: 'a(x² + (b/a)x) + c',
    });
  }

  // Step 3: Compute the term to complete the square: (b / (2a))²
  const halfB = bOverA.div(new Fraction(2n, 1n));
  const magicTerm = halfB.mul(halfB);

  steps.push({
    stepNumber: steps.length + 1,
    title: 'Calculate the "Magic Number" to Complete the Square',
    expression: `(${bOverA.toString()} / 2)² = (${halfB.toString()})² = ${magicTerm.toString()}`,
    description: `Take half of the linear coefficient inside the parentheses (${bOverA.toString()}), which is ${halfB.toString()}, and square it to get ${magicTerm.toString()}.`,
    formulaHighlight: '(b / 2a)²',
  });

  // Step 4: Add and subtract magic term inside parentheses
  const addedSubtracted = `f(x) = ${a.toString()}[ x² ${bOverA.toSignedString(false)}x + ${magicTerm.toString()} - ${magicTerm.toString()} ] ${c.toSignedString(false)}`;
  steps.push({
    stepNumber: steps.length + 1,
    title: 'Add and Subtract the Squared Term Inside Brackets',
    expression: addedSubtracted,
    description: `Add and subtract ${magicTerm.toString()} inside the bracket so the overall value of the expression remains unchanged.`,
    formulaHighlight: 'a[ x² + (b/a)x + (b/2a)² - (b/2a)² ] + c',
  });

  // Step 5: Collapse the perfect square trinomial
  const signH = halfB.isNegative() ? `- ${halfB.abs().toString()}` : `+ ${halfB.toString()}`;
  const binomialStr = `(x ${signH})²`;
  steps.push({
    stepNumber: steps.length + 1,
    title: 'Factor the Perfect Square Trinomial',
    expression: `f(x) = ${a.toString()}[ ${binomialStr} - ${magicTerm.toString()} ] ${c.toSignedString(false)}`,
    description: `The first three terms inside the bracket (x² ${bOverA.toSignedString(false)}x + ${magicTerm.toString()}) factor into the perfect square ${binomialStr}.`,
    formulaHighlight: 'x² + 2dx + d² = (x + d)²',
  });

  // Step 6: Distribute 'a' to the subtracted term and combine with 'c'
  const distributedSubtracted = a.mul(magicTerm).negate();
  const k = c.add(distributedSubtracted);
  const h = halfB.negate(); // vertex x = -b/(2a)

  const hSign = h.isNegative() ? `+ ${h.abs().toString()}` : `- ${h.toString()}`;
  const vertexBinomial = h.isZero() ? 'x²' : `(x ${hSign})²`;
  const aPrefix = a.isOne() ? '' : a.negate().isOne() ? '-' : `${a.toString()}`;
  const kStr = k.isZero() ? '' : ` ${k.toSignedString(false)}`;
  const vertexForm = `f(x) = ${aPrefix}${vertexBinomial}${kStr || ' + 0'}`;

  steps.push({
    stepNumber: steps.length + 1,
    title: 'Distribute and Combine Constants into Vertex Form',
    expression: vertexForm,
    description: `Multiply ${a.toString()} by -${magicTerm.toString()} to get ${distributedSubtracted.toString()}, and add constant c (${c.toString()}) to obtain k = ${k.toString()}.`,
    formulaHighlight: 'f(x) = a(x - h)² + k',
  });

  // Step 7: Solve for roots (setting f(x) = 0)
  // a(x - h)² + k = 0 => (x - h)² = -k/a
  const negKOverA = k.negate().div(a);
  // Discriminant: b² - 4ac
  const discriminant = b.mul(b).sub(new Fraction(4n, 1n).mul(a).mul(c));

  let rootsInfo: CompletingTheSquareResult['roots'];

  if (discriminant.isZero()) {
    rootsInfo = {
      type: 'real_one',
      display: `x = ${h.toString()} (Double Root / Multiplicity 2)`,
      root1: h.toString(),
      root2: h.toString(),
    };
    steps.push({
      stepNumber: steps.length + 1,
      title: 'Find the Roots (Set f(x) = 0)',
      expression: `${vertexForm} = 0  ⟹  (x - (${h.toString()}))² = 0  ⟹  x = ${h.toString()}`,
      description: `Since (x - h)² = 0, there is exactly one unique real solution (a double root).`,
      formulaHighlight: 'x = h',
    });
  } else if (!discriminant.isNegative()) {
    // Real roots
    const dNum = Number(discriminant.num);
    const dDen = Number(discriminant.den);
    const sqrtVal = Math.sqrt(dNum / dDen);
    const isPerfectSquare = Number.isInteger(sqrtVal);

    let r1Str: string;
    let r2Str: string;

    if (isPerfectSquare) {
      const sqrtFrac = new Fraction(BigInt(Math.round(sqrtVal * 1000)), 1000n);
      const r1 = b.negate().add(sqrtFrac).div(new Fraction(2n, 1n).mul(a));
      const r2 = b.negate().sub(sqrtFrac).div(new Fraction(2n, 1n).mul(a));
      r1Str = r1.toString();
      r2Str = r2.toString();
    } else {
      const approx1 = (h.toNumber() + Math.sqrt(negKOverA.toNumber())).toFixed(4);
      const approx2 = (h.toNumber() - Math.sqrt(negKOverA.toNumber())).toFixed(4);
      r1Str = `${h.toString()} + √(${negKOverA.toString()}) ≈ ${approx1}`;
      r2Str = `${h.toString()} - √(${negKOverA.toString()}) ≈ ${approx2}`;
    }

    rootsInfo = {
      type: 'real_two',
      display: `x₁ = ${r1Str},  x₂ = ${r2Str}`,
      root1: r1Str,
      root2: r2Str,
    };

    steps.push({
      stepNumber: steps.length + 1,
      title: 'Solve for x-Intercepts (Roots)',
      expression: `(x - (${h.toString()}))² = ${negKOverA.toString()}  ⟹  x = ${h.toString()} ± √(${negKOverA.toString()})`,
      description: `Take square root of both sides and add h (${h.toString()}) to isolate x.`,
      formulaHighlight: 'x = h ± √(-k/a)',
    });
  } else {
    // Complex roots
    const absNegKOverA = negKOverA.abs();
    const approx = Math.sqrt(absNegKOverA.toNumber()).toFixed(4);
    const r1Str = `${h.toString()} + ${approx}i`;
    const r2Str = `${h.toString()} - ${approx}i`;

    rootsInfo = {
      type: 'complex',
      display: `x = ${h.toString()} ± √(${absNegKOverA.toString()})i  (Complex Roots)`,
      root1: r1Str,
      root2: r2Str,
    };

    steps.push({
      stepNumber: steps.length + 1,
      title: 'Solve for Complex Roots',
      expression: `(x - (${h.toString()}))² = ${negKOverA.toString()}  ⟹  x = ${h.toString()} ± √(${absNegKOverA.toString()}) i`,
      description: `Since the right-hand side is negative, the parabola has no real x-intercepts. The solutions are complex conjugates.`,
      formulaHighlight: 'x = h ± i√|k/a|',
    });
  }

  const direction = a.isNegative() ? 'down' : 'up';
  const extremaType = a.isNegative() ? 'maximum' : 'minimum';

  return {
    a,
    b,
    c,
    standardForm: stdForm,
    vertexForm,
    vertex: {
      h,
      k,
      hDisplay: h.toString(),
      kDisplay: k.toString(),
    },
    axisOfSymmetry: `x = ${h.toString()}`,
    direction,
    extremaType,
    extremaValue: `${extremaType} value is ${k.toString()} at x = ${h.toString()}`,
    discriminant,
    roots: rootsInfo,
    yIntercept: `(0, ${c.toString()})`,
    steps,
  };
}
