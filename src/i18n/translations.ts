export type Language = 'en' | 'es' | 'fr' | 'pt' | 'zh';

export interface FaqItem {
  q: string;
  a: string;
}

export interface PracticeProblemData {
  id: string;
  category: string;
  title: string;
  dividend?: string;
  divisor?: string;
  quadratic?: string;
  targetMode: 'division' | 'completing_square';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hint: string;
  answerSummary: string;
}

export interface Translations {
  appName: string;
  heroTagline: string;
  heroSubtitle: string;
  navDivision: string;
  navCompleteSquare: string;
  navGuide: string;
  navFaq: string;
  dividendLabel: string;
  divisorLabel: string;
  quadraticLabel: string;
  dividendPlaceholder: string;
  divisorPlaceholder: string;
  quadraticPlaceholder: string;
  calculateBtn: string;
  clearBtn: string;
  randomPresetBtn: string;
  mathKeypadBtn: string;
  showPaddingToggle: string;
  resultHeader: string;
  quotientLabel: string;
  remainderLabel: string;
  summaryFormLabel: string;
  busStopViewTab: string;
  stepByStepTab: string;
  syntheticTab: string;
  verificationTab: string;
  asymptoteTab: string;
  completingSquareTab: string;
  stepCounter: string;
  nextStepBtn: string;
  prevStepBtn: string;
  showAllStepsBtn: string;
  copySolutionBtn: string;
  copiedNotice: string;
  copyLatexBtn: string;
  printBtn: string;
  exactDivisionBadge: string;
  nonZeroRemainderBadge: string;
  missingTermsAlert: string;
  missingTermsDesc: string;
  syntheticNotApplicable: string;
  slantAsymptoteFound: string;
  slantAsymptoteDesc: string;
  vertexLabel: string;
  vertexFormLabel: string;
  symmetryAxisLabel: string;
  rootsLabel: string;
  yInterceptLabel: string;
  directionLabel: string;
  extremaLabel: string;
  presetsTitle: string;
  eduTitle: string;
  eduSubtitle: string;
  faqTitle: string;
  footerNote: string;
  usFormatLabel: string;
  intlFormatLabel: string;
  signFlipLabel: string;
  flippedPrefix: string;
  broughtDownLabel: string;
  geometricModelTitle: string;
  geometricModelDesc: string;
  graphTabLabel: string;
  geometryTabLabel: string;
  stepsTabLabel: string;
  verificationProofTitle: string;
  verificationProofDesc: string;
  errorZeroDivisor: string;
  errorInvalidSyntax: string;
  errorQuadraticDegree: string;

  // Step template generators
  divideLeadingDesc: (leadDiv: string, leadDvr: string, qTerm: string) => string;
  multiplyDivisorDesc: (qTerm: string, divisor: string, prod: string) => string;
  subtractSignFlipDesc: (prod: string, negated: string, rem: string) => string;
  bringDownDesc: (term: string | null, line: string) => string;
  syntheticDropLeadDesc: (col: number, p: number, c: string) => string;
  syntheticStepDesc: (col: number, p: number, prev: string, root: string, prod: string, top: string, sum: string) => string;
  syntheticDivisorAdjustmentDesc: (aStr: string) => string;

  // Educational section
  rules: { title: string; desc: string }[];
  comparisonTable: {
    headers: [string, string, string];
    rows: [string, string, string][];
  };
  studentMistakes: { title: string; items: string[] };
  faqs: FaqItem[];
  practiceProblems: PracticeProblemData[];
}

export const translations: Record<Language, Translations> = {
  en: {
    appName: 'PolyMath Step-by-Step Solver',
    heroTagline: 'Polynomial Long Division & Completing the Square Calculator',
    heroSubtitle: 'Free step-by-step solver with authentic bus-stop bracket layout, sign-flip subtraction highlights, missing term zero-padding, synthetic division, and full quotient verification.',
    navDivision: 'Polynomial Division',
    navCompleteSquare: 'Completing the Square',
    navGuide: 'How It Works',
    navFaq: 'FAQs',
    dividendLabel: 'Dividend P(x) (Numerator / Top)',
    divisorLabel: 'Divisor D(x) (Denominator / Bottom)',
    quadraticLabel: 'Quadratic Polynomial ax² + bx + c',
    dividendPlaceholder: 'e.g. 2x^3 - x^2 - 7x + 2 or x^4 - 16',
    divisorPlaceholder: 'e.g. x - 2 or 2x^2 + 1',
    quadraticPlaceholder: 'e.g. 2x^2 + 8x - 10 or x^2 - 6x + 5',
    calculateBtn: 'Calculate with Steps',
    clearBtn: 'Clear',
    randomPresetBtn: 'Load Example',
    mathKeypadBtn: 'Math Keyboard',
    showPaddingToggle: 'Show Missing Zero Terms (+0xᵏ)',
    resultHeader: 'Solution & Step-by-Step Breakdown',
    quotientLabel: 'Quotient Q(x)',
    remainderLabel: 'Remainder R(x)',
    summaryFormLabel: 'Division Algorithm Form',
    busStopViewTab: 'Bus-Stop Bracket (Visual)',
    stepByStepTab: 'Step Explanations',
    syntheticTab: 'Synthetic Division',
    verificationTab: 'Proof & Verification',
    asymptoteTab: 'Slant Asymptote',
    completingSquareTab: 'Completing Square Steps',
    stepCounter: 'Step {current} of {total}',
    nextStepBtn: 'Next Step →',
    prevStepBtn: '← Previous',
    showAllStepsBtn: 'Show All Steps',
    copySolutionBtn: 'Copy Steps (Markdown)',
    copiedNotice: 'Copied to clipboard!',
    copyLatexBtn: 'Copy LaTeX',
    printBtn: 'Print / Save PDF',
    exactDivisionBadge: 'Exact Division (R = 0)',
    nonZeroRemainderBadge: 'Remainder ≠ 0',
    missingTermsAlert: 'Missing Degree Alert',
    missingTermsDesc: 'This polynomial skipped degrees. We inserted placeholder zero coefficients (+0x) so columns align properly for subtraction.',
    syntheticNotApplicable: 'Synthetic division requires a linear divisor in the form of (x - c) or (ax + b). Since this divisor has degree ≥ 2, use Long Division.',
    slantAsymptoteFound: 'Slant (Oblique) Asymptote Detected!',
    slantAsymptoteDesc: 'Because the degree of the dividend is exactly 1 higher than the divisor, the rational function has an oblique asymptote at y = Q(x).',
    vertexLabel: 'Vertex (h, k)',
    vertexFormLabel: 'Vertex Form',
    symmetryAxisLabel: 'Axis of Symmetry',
    rootsLabel: 'Roots / Zeros (x-intercepts)',
    yInterceptLabel: 'y-Intercept',
    directionLabel: 'Parabola Direction',
    extremaLabel: 'Extremum (Min / Max)',
    presetsTitle: 'Quick Practice Presets (High School & College Algebra)',
    eduTitle: 'Mastering Polynomial Long Division & Factoring',
    eduSubtitle: 'Clear rules, step-by-step algorithms, and common pitfalls explained for US High School Algebra 2 and Precalculus.',
    faqTitle: 'Frequently Asked Questions (FAQ)',
    footerNote: 'Designed for High School Algebra 2, AP Precalculus, and College Algebra students & educators.',
    usFormatLabel: '🇺🇸 US Format',
    intlFormatLabel: '🇪🇺 European / Latin',
    signFlipLabel: 'Sign Flip',
    flippedPrefix: 'Flipped:',
    broughtDownLabel: 'Brought down from dividend',
    geometricModelTitle: 'Why is it called "Completing the Square"? (Visual Area Model)',
    geometricModelDesc: 'Ancient mathematicians solved quadratics geometrically by completing a literal square!',
    graphTabLabel: 'Parabola Graph',
    geometryTabLabel: 'Geometric Area Model',
    stepsTabLabel: 'Step-by-Step Derivation',
    verificationProofTitle: 'Algebraic Proof & Check',
    verificationProofDesc: 'By the Division Algorithm: Dividend = (Divisor · Quotient) + Remainder',
    errorZeroDivisor: 'Divisor cannot be zero! Division by zero is undefined.',
    errorInvalidSyntax: 'Invalid polynomial syntax. Please check exponents and signs.',
    errorQuadraticDegree: 'Please enter a valid quadratic polynomial with degree 2 (e.g. 2x^2 + 8x - 10).',

    divideLeadingDesc: (leadDiv, leadDvr, qTerm) =>
      `Divide leading term (${leadDiv}) by leading divisor term (${leadDvr}) to get quotient term: ${qTerm}`,
    multiplyDivisorDesc: (qTerm, divisor, prod) =>
      `Multiply quotient term (${qTerm}) by divisor (${divisor}): product is (${prod})`,
    subtractSignFlipDesc: (prod, negated, rem) =>
      `Subtract (${prod}) from current dividend line. Flip all signs to (${negated}) and add, resulting in remainder: (${rem})`,
    bringDownDesc: (term, line) =>
      term
        ? `Bring down the next term (${term}) to form the new active line: (${line})`
        : `All terms have been brought down.`,
    syntheticDropLeadDesc: (col, p, c) =>
      `Column ${col} (degree ${p}): Bring down leading coefficient ${c} directly to the bottom row.`,
    syntheticStepDesc: (col, p, prev, root, prod, top, sum) =>
      `Column ${col} (degree ${p}): Multiply previous sum (${prev}) by root (${root}) = ${prod}. Add to top coefficient (${top}) to get ${sum}.`,
    syntheticDivisorAdjustmentDesc: (aStr) =>
      `Because divisor leading coefficient is ${aStr} (not 1), divide all quotient coefficients by ${aStr}.`,

    rules: [
      {
        title: '1. Divide',
        desc: 'Divide the first term of the current dividend by the first term of the divisor. Write this result on the top quotient bar.',
      },
      {
        title: '2. Multiply',
        desc: 'Multiply the new quotient term by every single term of the divisor polynomial. Write the product directly underneath the dividend.',
      },
      {
        title: '3. Subtract (Flip Signs)',
        desc: 'Subtract the multiplied polynomial. Remember: distribute a negative sign to flip + to - and - to +, then add!',
      },
      {
        title: '4. Bring Down',
        desc: 'Bring down the next term from the original dividend. Repeat steps 1–4 until the remainder degree is lower than the divisor.',
      },
    ],
    comparisonTable: {
      headers: ['Feature', 'Polynomial Long Division', 'Synthetic Division (Ruffini)'],
      rows: [
        ['Applicable Divisors', 'Any degree (linear, quadratic, cubic, etc.)', 'Linear divisors ONLY (x - c or ax + b)'],
        ['Variables Written Out?', 'Yes, full variables and powers shown', 'No, only numerical coefficients'],
        ['Missing Degree Handling', 'Must insert +0xᵏ placeholders', 'Must insert 0 in coefficient row'],
        ['Slant Asymptotes', 'Supports both linear and non-linear denominators', 'Works only when denominator is degree 1'],
        ['Speed on Paper', 'Slower, visual vertical alignment', 'Very fast, compact 3-row grid'],
      ],
    },
    studentMistakes: {
      title: 'Top 4 Homework & Exam Mistakes Students Make',
      items: [
        'Forgetting the parenthesis sign flip: Subtracting -(2x² - 4x) becomes -2x² + 4x, not -2x² - 4x.',
        'Skipping placeholder zeros: If your problem has x³ - 1, forgetting +0x² + 0x will cause you to subtract a constant from an x term.',
        'Stopping too early: You must continue dividing until the degree of the remainder is strictly smaller than the divisor.',
        'Forgetting divisor coefficient a in Synthetic Division: When dividing by (2x - 3), synthetic division root is 3/2, but you must divide quotient coefficients by 2!',
      ],
    },
    faqs: [
      {
        q: 'What is polynomial long division and when is it used?',
        a: 'Polynomial long division is an algebraic algorithm used to divide a polynomial by another polynomial of equal or lower degree. It is fundamental in Algebra 2 and Precalculus for factoring higher-degree polynomials, finding slant/oblique asymptotes, finding rational zeros, and computing partial fraction decomposition.',
      },
      {
        q: 'Why do you flip the signs during the subtraction step?',
        a: 'In long division, subtracting an expression is mathematically identical to distributing a negative sign (-1) across every term and adding. Forgetting to flip the signs of every term inside the parentheses is the #1 reason students get division homework wrong!',
      },
      {
        q: 'How do you handle missing terms (e.g. x³ - 8 divided by x - 2)?',
        a: 'Whenever a polynomial skips powers, you must insert placeholder zero coefficients: x³ + 0x² + 0x - 8. This keeps all like terms in straight vertical columns so you never subtract unlike powers.',
      },
      {
        q: 'When can I use Synthetic Division instead of Long Division?',
        a: 'Synthetic division is a shortcut that works ONLY when the divisor is linear (degree 1) in the form (x - c) or (ax + b). If your divisor is quadratic or higher, polynomial long division is mandatory.',
      },
      {
        q: 'What is Completing the Square and why is it useful?',
        a: 'Completing the square converts ax² + bx + c into vertex form a(x - h)² + k. It directly reveals the vertex (h, k), line of symmetry x = h, extremum value, and allows solving quadratic equations without the quadratic formula.',
      },
      {
        q: 'How does polynomial division reveal a slant (oblique) asymptote?',
        a: 'When numerator degree is exactly 1 higher than denominator, dividing gives f(x) = mx + b + R(x)/D(x). As x approaches infinity, R(x)/D(x) approaches 0, meaning the curve approaches the line y = mx + b.',
      },
    ],
    practiceProblems: [
      {
        id: 'p1',
        category: 'Long Division',
        title: 'Missing Degree Trap: (x⁴ - 1) ÷ (x - 1)',
        dividend: 'x^4 - 1',
        divisor: 'x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: 'Remember to insert placeholder zeros for x³, x², and x: x⁴ + 0x³ + 0x² + 0x - 1.',
        answerSummary: 'Quotient: x³ + x² + x + 1, Remainder: 0 (Exact Division)',
      },
      {
        id: 'p2',
        category: 'Long Division',
        title: 'Precalculus Slant Asymptote: (2x³ + 3x² - x + 4) ÷ (x² - 1)',
        dividend: '2x^3 + 3x^2 - x + 4',
        divisor: 'x^2 - 1',
        targetMode: 'division',
        difficulty: 'Hard',
        hint: 'Since degree of numerator is 3 and denominator is 2, the quotient gives the slant asymptote y = 2x + 3.',
        answerSummary: 'Quotient: 2x + 3, Remainder: x + 7. Slant Asymptote: y = 2x + 3',
      },
      {
        id: 'p3',
        category: 'Synthetic Division',
        title: 'Non-Monic Linear Divisor: (4x³ - 6x² + 8x - 5) ÷ (2x - 1)',
        dividend: '4x^3 - 6x^2 + 8x - 5',
        divisor: '2x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: 'Divisor root is c = 1/2. After synthetic division, divide the quotient coefficients by 2!',
        answerSummary: 'Quotient: 2x² - 2x + 3, Remainder: -2',
      },
      {
        id: 'p4',
        category: 'Completing the Square',
        title: 'Vertex Form of a Monic Quadratic: x² - 6x + 5',
        quadratic: 'x^2 - 6x + 5',
        targetMode: 'completing_square',
        difficulty: 'Easy',
        hint: 'Half of -6 is -3. Square it to get (-3)² = 9. Add and subtract 9.',
        answerSummary: 'Vertex Form: (x - 3)² - 4. Vertex: (3, -4), Roots: x = 1, x = 5',
      },
      {
        id: 'p5',
        category: 'Completing the Square',
        title: 'Factor Out Coefficient a ≠ 1: 3x² + 12x + 7',
        quadratic: '3x^2 + 12x + 7',
        targetMode: 'completing_square',
        difficulty: 'Hard',
        hint: 'Factor out 3 from first two terms: 3(x² + 4x) + 7. Magic number is (4/2)² = 4.',
        answerSummary: 'Vertex Form: 3(x + 2)² - 5. Vertex: (-2, -5), Min Value: -5',
      },
      {
        id: 'p6',
        category: 'Completing the Square',
        title: 'Negative Leading Coefficient (Parabola Peak): -x² + 4x + 12',
        quadratic: '-x^2 + 4x + 12',
        targetMode: 'completing_square',
        difficulty: 'Medium',
        hint: 'Factor out -1: -(x² - 4x) + 12. Notice the sign of the linear term flips to -4x.',
        answerSummary: 'Vertex Form: -(x - 2)² + 16. Vertex (Max Peak): (2, 16)',
      },
    ],
  },

  es: {
    appName: 'PolyMath Calculadora Paso a Paso',
    heroTagline: 'Calculadora de División Larga de Polinomios y Método de Completar el Cuadrado',
    heroSubtitle: 'Solucionador gratuito paso a paso con formato de galera, inversión de signos en restas, relleno de términos faltantes y verificación completa.',
    navDivision: 'División de Polinomios',
    navCompleteSquare: 'Completar el Cuadrado',
    navGuide: 'Cómo Funciona',
    navFaq: 'Preguntas Frecuentes',
    dividendLabel: 'Dividendo P(x) (Numerador)',
    divisorLabel: 'Divisor D(x) (Denominador)',
    quadraticLabel: 'Polinomio Cuadrático ax² + bx + c',
    dividendPlaceholder: 'ej. 2x^3 - x^2 - 7x + 2 o x^4 - 16',
    divisorPlaceholder: 'ej. x - 2 o 2x^2 + 1',
    quadraticPlaceholder: 'ej. 2x^2 + 8x - 10 o x^2 - 6x + 5',
    calculateBtn: 'Calcular con Pasos',
    clearBtn: 'Limpiar',
    randomPresetBtn: 'Cargar Ejemplo',
    mathKeypadBtn: 'Teclado Matemático',
    showPaddingToggle: 'Mostrar Términos Cero Faltantes (+0xᵏ)',
    resultHeader: 'Solución y Desglose Paso a Paso',
    quotientLabel: 'Cociente Q(x)',
    remainderLabel: 'Residuo / Resto R(x)',
    summaryFormLabel: 'Forma del Algoritmo de la División',
    busStopViewTab: 'Disposición en Galera (Visual)',
    stepByStepTab: 'Explicación de Pasos',
    syntheticTab: 'División Sintética (Ruffini)',
    verificationTab: 'Comprobación / Prueba',
    asymptoteTab: 'Asíntota Oblicua',
    completingSquareTab: 'Pasos de Completar Cuadrado',
    stepCounter: 'Paso {current} de {total}',
    nextStepBtn: 'Siguiente Paso →',
    prevStepBtn: '← Anterior',
    showAllStepsBtn: 'Mostrar Todos los Pasos',
    copySolutionBtn: 'Copiar Pasos (Markdown)',
    copiedNotice: '¡Copiado al portapapeles!',
    copyLatexBtn: 'Copiar LaTeX',
    printBtn: 'Imprimir / Guardar PDF',
    exactDivisionBadge: 'División Exacta (R = 0)',
    nonZeroRemainderBadge: 'Residuo ≠ 0',
    missingTermsAlert: 'Aviso de Términos Faltantes',
    missingTermsDesc: 'Este polinomio omite grados. Insertamos coeficientes cero (+0x) para alinear las columnas verticalmente.',
    syntheticNotApplicable: 'La regla de Ruffini requiere un divisor lineal (x - c o ax + b). Con grado ≥ 2, utilice la división larga.',
    slantAsymptoteFound: '¡Asíntota Oblicua Detectada!',
    slantAsymptoteDesc: 'Dado que el grado del dividendo supera en 1 al divisor, la función posee una asíntota oblicua en y = Q(x).',
    vertexLabel: 'Vértice (h, k)',
    vertexFormLabel: 'Forma Canónica / Vértice',
    symmetryAxisLabel: 'Eje de Simetría',
    rootsLabel: 'Raíces / Ceros (Cortes con eje X)',
    yInterceptLabel: 'Intersección con eje Y',
    directionLabel: 'Orientación de la Parábola',
    extremaLabel: 'Extremo (Mínimo / Máximo)',
    presetsTitle: 'Ejemplos Prácticos Rápidos (Álgebra y Precálculo)',
    eduTitle: 'Dominando la División de Polinomios y Factorización',
    eduSubtitle: 'Reglas claras, cambio de signos y errores comunes explicados paso a paso.',
    faqTitle: 'Preguntas Frecuentes (FAQ)',
    footerNote: 'Herramienta diseñada para estudiantes y profesores de Álgebra y Precálculo.',
    usFormatLabel: '🇺🇸 Formato EE.UU.',
    intlFormatLabel: '🇪🇺 Formato Europeo / Galera',
    signFlipLabel: 'Inversión de Signo',
    flippedPrefix: 'Invertido:',
    broughtDownLabel: 'Bajado del dividendo',
    geometricModelTitle: '¿Por qué se llama "Completar el Cuadrado"? (Modelo de Área)',
    geometricModelDesc: '¡Los matemáticos antiguos resolvían ecuaciones cuadráticas completando un cuadrado geométrico real!',
    graphTabLabel: 'Gráfica de Parábola',
    geometryTabLabel: 'Modelo Geométrico de Área',
    stepsTabLabel: 'Deducción Paso a Paso',
    verificationProofTitle: 'Comprobación Algebraica Real',
    verificationProofDesc: 'Por el Algoritmo de la División: Dividendo = (Divisor · Cociente) + Resto',
    errorZeroDivisor: '¡El divisor no puede ser cero! La división por cero es indefinida.',
    errorInvalidSyntax: 'Sintaxis de polinomio no válida. Revise exponentes y signos.',
    errorQuadraticDegree: 'Introduzca un polinomio cuadrático de grado 2 (ej. 2x^2 + 8x - 10).',

    divideLeadingDesc: (leadDiv, leadDvr, qTerm) =>
      `Dividir el término principal (${leadDiv}) por el término divisor (${leadDvr}) para obtener el término del cociente: ${qTerm}`,
    multiplyDivisorDesc: (qTerm, divisor, prod) =>
      `Multiplicar el término del cociente (${qTerm}) por el divisor (${divisor}): el producto es (${prod})`,
    subtractSignFlipDesc: (prod, negated, rem) =>
      `Restar (${prod}) del dividendo actual. Invertir signos a (${negated}) y sumar, obteniendo el residuo: (${rem})`,
    bringDownDesc: (term, line) =>
      term
        ? `Bajar el siguiente término (${term}) para formar la nueva línea activa: (${line})`
        : `Todos los términos han sido bajados.`,
    syntheticDropLeadDesc: (col, p, c) =>
      `Columna ${col} (grado ${p}): Bajar el coeficiente principal ${c} directamente a la fila inferior.`,
    syntheticStepDesc: (col, p, prev, root, prod, top, sum) =>
      `Columna ${col} (grado ${p}): Multiplicar resultado anterior (${prev}) por la raíz (${root}) = ${prod}. Sumar al coeficiente superior (${top}) para obtener ${sum}.`,
    syntheticDivisorAdjustmentDesc: (aStr) =>
      `Dado que el coeficiente principal del divisor es ${aStr} (distinto de 1), dividir todos los coeficientes del cociente por ${aStr}.`,

    rules: [
      {
        title: '1. Dividir',
        desc: 'Dividir el primer término del dividendo actual por el primer término del divisor. Escribir el resultado en el cociente.',
      },
      {
        title: '2. Multiplicar',
        desc: 'Multiplicar el nuevo término del cociente por cada término del divisor. Escribir el producto debajo del dividendo.',
      },
      {
        title: '3. Restar (Cambiar Signos)',
        desc: 'Restar el polinomio multiplicado. ¡Recuerde distribuir el signo negativo invirtiendo + por - y - por +!',
      },
      {
        title: '4. Bajar Término',
        desc: 'Bajar el siguiente término del dividendo original y repetir hasta que el grado del resto sea menor que el divisor.',
      },
    ],
    comparisonTable: {
      headers: ['Característica', 'División Larga de Polinomios', 'División Sintética (Ruffini)'],
      rows: [
        ['Divisores Aplicables', 'Cualquier grado (lineal, cuadrático, etc.)', 'Únicamente divisores lineales (x - c o ax + b)'],
        ['¿Se Escriben Variables?', 'Sí, variables y exponentes completos', 'No, sólo coeficientes numéricos'],
        ['Términos Faltantes', 'Obligatorio insertar +0xᵏ', 'Obligatorio insertar 0 en la fila'],
        ['Asíntotas Oblicuas', 'Admite denominadores de cualquier grado', 'Funciona sólo si el denominador es grado 1'],
        ['Rapidez en Papel', 'Más lento, disposición visual vertical', 'Muy rápido, cuadrícula de 3 filas'],
      ],
    },
    studentMistakes: {
      title: 'Top 4 Errores Comunes de los Estudiantes en Exámenes',
      items: [
        'Olvidar el cambio de signo en los paréntesis: Al restar -(2x² - 4x) queda -2x² + 4x, no -2x² - 4x.',
        'Omitir los ceros en grados faltantes: Si tiene x³ - 1, olvidar +0x² + 0x provocará restar constantes con términos en x.',
        'Detener la división antes de tiempo: Debe continuar hasta que el grado del resto sea estrictamente menor que el divisor.',
        'Olvidar dividir por el coeficiente a en Ruffini: Al dividir por (2x - 3), la raíz es 3/2, ¡pero luego debe dividir el cociente entre 2!',
      ],
    },
    faqs: [
      {
        q: '¿Qué es la división de polinomios y cuándo se utiliza?',
        a: 'Es un algoritmo algebraico para dividir un polinomio entre otro de igual o menor grado. Es fundamental en Álgebra y Precálculo para factorizar polinomios, hallar asíntotas oblicuas y raíces racionales.',
      },
      {
        q: '¿Por qué se cambian los signos en el paso de resta?',
        a: 'Restar una expresión equivale a multiplicar por -1 todos sus términos y sumar. Olvidar cambiar los signos dentro del paréntesis es el error número 1 en tareas escolares.',
      },
      {
        q: '¿Cómo actuar ante polinomios incompletos (ej. x³ - 8 entre x - 2)?',
        a: 'Debe rellenar los grados ausentes con coeficientes cero: x³ + 0x² + 0x - 8, asegurando que las columnas queden perfectamente alineadas.',
      },
      {
        q: '¿Cuándo usar la regla de Ruffini en lugar de la división larga?',
        a: 'Ruffini o división sintética sólo es aplicable si el divisor es de grado 1 (x - c o ax + b). Si el divisor es cuadrático o superior, es obligatorio usar la división larga.',
      },
      {
        q: '¿Para qué sirve completar el cuadrado?',
        a: 'Permite transformar ax² + bx + c en la forma canónica a(x - h)² + k, obteniendo inmediatamente el vértice (h, k), el eje de simetría y el valor máximo o mínimo.',
      },
      {
        q: '¿Cómo revela la división una asíntota oblicua?',
        a: 'Si el grado del numerador supera en exactamente 1 al denominador, el cociente lineal resultante y = mx + b representa la asíntota oblicua de la curva.',
      },
    ],
    practiceProblems: [
      {
        id: 'p1',
        category: 'División Larga',
        title: 'Trampa de Grados Faltantes: (x⁴ - 1) ÷ (x - 1)',
        dividend: 'x^4 - 1',
        divisor: 'x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: 'Inserte ceros para x³, x² y x: x⁴ + 0x³ + 0x² + 0x - 1.',
        answerSummary: 'Cociente: x³ + x² + x + 1, Resto: 0 (División Exacta)',
      },
      {
        id: 'p2',
        category: 'División Larga',
        title: 'Asíntota Oblicua: (2x³ + 3x² - x + 4) ÷ (x² - 1)',
        dividend: '2x^3 + 3x^2 - x + 4',
        divisor: 'x^2 - 1',
        targetMode: 'division',
        difficulty: 'Hard',
        hint: 'Como el grado es 3 y 2, el cociente lineal da la asíntota oblicua y = 2x + 3.',
        answerSummary: 'Cociente: 2x + 3, Resto: x + 7. Asíntota: y = 2x + 3',
      },
      {
        id: 'p3',
        category: 'División Sintética',
        title: 'Divisor no Mónico: (4x³ - 6x² + 8x - 5) ÷ (2x - 1)',
        dividend: '4x^3 - 6x^2 + 8x - 5',
        divisor: '2x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: 'La raíz es c = 1/2. Al final, divida los coeficientes del cociente entre 2.',
        answerSummary: 'Cociente: 2x² - 2x + 3, Resto: -2',
      },
      {
        id: 'p4',
        category: 'Completar Cuadrado',
        title: 'Vértice de Cuadrática Mónica: x² - 6x + 5',
        quadratic: 'x^2 - 6x + 5',
        targetMode: 'completing_square',
        difficulty: 'Easy',
        hint: 'La mitad de -6 es -3. Cuadrado: (-3)² = 9. Sume y reste 9.',
        answerSummary: 'Forma Canónica: (x - 3)² - 4. Vértice: (3, -4), Raíces: x = 1, x = 5',
      },
      {
        id: 'p5',
        category: 'Completar Cuadrado',
        title: 'Factorizar Coeficiente a ≠ 1: 3x² + 12x + 7',
        quadratic: '3x^2 + 12x + 7',
        targetMode: 'completing_square',
        difficulty: 'Hard',
        hint: 'Factorice 3: 3(x² + 4x) + 7. El número mágico es (4/2)² = 4.',
        answerSummary: 'Forma Canónica: 3(x + 2)² - 5. Vértice: (-2, -5), Mínimo: -5',
      },
      {
        id: 'p6',
        category: 'Completar Cuadrado',
        title: 'Coeficiente Negativo (Máximo): -x² + 4x + 12',
        quadratic: '-x^2 + 4x + 12',
        targetMode: 'completing_square',
        difficulty: 'Medium',
        hint: 'Factorice -1: -(x² - 4x) + 12. Tenga cuidado con el signo dentro del paréntesis.',
        answerSummary: 'Forma Canónica: -(x - 2)² + 16. Vértice (Punto Máximo): (2, 16)',
      },
    ],
  },

  fr: {
    appName: 'PolyMath Résolveur Étape par Étape',
    heroTagline: 'Calculatrice de Division Polynomiale Euclidienne et Forme Canonique',
    heroSubtitle: 'Résolvez pas à pas les divisions de polynômes avec la potence classique, le changement de signe aux soustractions, le complétement des termes manquants et la vérification.',
    navDivision: 'Division Polynomiale',
    navCompleteSquare: 'Forme Canonique (Carré)',
    navGuide: 'Méthode',
    navFaq: 'FAQ',
    dividendLabel: 'Dividende P(x) (Numérateur)',
    divisorLabel: 'Diviseur D(x) (Dénominateur)',
    quadraticLabel: 'Polynôme du Second Degré ax² + bx + c',
    dividendPlaceholder: 'ex. 2x^3 - x^2 - 7x + 2 ou x^4 - 16',
    divisorPlaceholder: 'ex. x - 2 ou 2x^2 + 1',
    quadraticPlaceholder: 'ex. 2x^2 + 8x - 10 ou x^2 - 6x + 5',
    calculateBtn: 'Calculer avec Étapes',
    clearBtn: 'Effacer',
    randomPresetBtn: 'Charger un Exemple',
    mathKeypadBtn: 'Clavier Mathématique',
    showPaddingToggle: 'Afficher les termes nuls (+0xᵏ)',
    resultHeader: 'Solution et Décomposition Pas à Pas',
    quotientLabel: 'Quotient Q(x)',
    remainderLabel: 'Reste R(x)',
    summaryFormLabel: 'Égalité Euclidienne',
    busStopViewTab: 'Disposition en Potence',
    stepByStepTab: 'Détail des Calculs',
    syntheticTab: 'Schéma de Ruffini / Horner',
    verificationTab: 'Preuve et Vérification',
    asymptoteTab: 'Asymptote Oblique',
    completingSquareTab: 'Étapes Forme Canonique',
    stepCounter: 'Étape {current} sur {total}',
    nextStepBtn: 'Étape Suivante →',
    prevStepBtn: '← Précédent',
    showAllStepsBtn: 'Afficher Tout',
    copySolutionBtn: 'Copier (Markdown)',
    copiedNotice: 'Copié dans le presse-papiers !',
    copyLatexBtn: 'Copier LaTeX',
    printBtn: 'Imprimer / PDF',
    exactDivisionBadge: 'Division Exacte (Reste = 0)',
    nonZeroRemainderBadge: 'Reste ≠ 0',
    missingTermsAlert: 'Degrés Manquants',
    missingTermsDesc: 'Des puissances sont absentes. Nous avons inséré des zéros pour aligner les colonnes.',
    syntheticNotApplicable: 'La méthode synthétique nécessite un diviseur de degré 1 (x - c). Utilisez la division euclidienne.',
    slantAsymptoteFound: 'Asymptote Oblique Trouvée !',
    slantAsymptoteDesc: 'Le degré du dividende surpasse de 1 celui du diviseur : la courbe admet l\'asymptote oblique y = Q(x).',
    vertexLabel: 'Sommet (α, β)',
    vertexFormLabel: 'Forme Canonique',
    symmetryAxisLabel: 'Axe de Symétrie',
    rootsLabel: 'Racines / Zéros',
    yInterceptLabel: 'Ordonnée à l\'origine',
    directionLabel: 'Sens de la Parabole',
    extremaLabel: 'Extremum (Min / Max)',
    presetsTitle: 'Exemples Typiques du Lycée et Prépa',
    eduTitle: 'Guide de la Division Polynomiale et Factorisation',
    eduSubtitle: 'Toutes les étapes pour réussir sans erreur de signe.',
    faqTitle: 'Foire Aux Questions (FAQ)',
    footerNote: 'Conçu pour les étudiants et enseignants en mathématiques.',
    usFormatLabel: '🇺🇸 Format Américain',
    intlFormatLabel: '🇪🇺 Format Potence Européen',
    signFlipLabel: 'Inversion de Signe',
    flippedPrefix: 'Inversé :',
    broughtDownLabel: 'Abaissé du dividende',
    geometricModelTitle: 'Pourquoi "Compléter le Carré" ? (Modèle Géométrique)',
    geometricModelDesc: 'Les géomètres anciens complétaient littéralement un carré géométrique !',
    graphTabLabel: 'Graphique Parabole',
    geometryTabLabel: 'Modèle Géométrique d\'Aire',
    stepsTabLabel: 'Calculs Pas à Pas',
    verificationProofTitle: 'Vérification Algébrique',
    verificationProofDesc: 'Identité euclidienne : Dividende = (Diviseur · Quotient) + Reste',
    errorZeroDivisor: 'Le diviseur ne peut pas être nul !',
    errorInvalidSyntax: 'Syntaxe invalide. Vérifiez les exposants et signes.',
    errorQuadraticDegree: 'Veuillez entrer un polynôme de degré 2 (ex. 2x^2 + 8x - 10).',

    divideLeadingDesc: (leadDiv, leadDvr, qTerm) =>
      `Diviser le terme dominant (${leadDiv}) par le terme dominant du diviseur (${leadDvr}) pour obtenir le terme du quotient : ${qTerm}`,
    multiplyDivisorDesc: (qTerm, divisor, prod) =>
      `Multiplier le terme du quotient (${qTerm}) par le diviseur (${divisor}) : produit égal à (${prod})`,
    subtractSignFlipDesc: (prod, negated, rem) =>
      `Soustraire (${prod}). Inverser les signes en (${negated}) et additionner pour trouver le reste : (${rem})`,
    bringDownDesc: (term, line) =>
      term
        ? `Abaisser le terme suivant (${term}) pour former la ligne suivante : (${line})`
        : `Tous les termes ont été traités.`,
    syntheticDropLeadDesc: (col, p, c) =>
      `Colonne ${col} (degré ${p}) : Abaisser directement le coefficient dominant ${c} dans la ligne inférieure.`,
    syntheticStepDesc: (col, p, prev, root, prod, top, sum) =>
      `Colonne ${col} (degré ${p}) : Multiplier le résultat (${prev}) par la racine (${root}) = ${prod}. Ajouter à (${top}) = ${sum}.`,
    syntheticDivisorAdjustmentDesc: (aStr) =>
      `Le coefficient dominant étant ${aStr}, diviser tous les coefficients du quotient par ${aStr}.`,

    rules: [
      {
        title: '1. Diviser',
        desc: 'Diviser le premier terme du dividende par le premier terme du diviseur et placer le résultat au quotient.',
      },
      {
        title: '2. Multiplier',
        desc: 'Multiplier ce monôme par tous les termes du diviseur et inscrire le produit sous le dividende.',
      },
      {
        title: '3. Soustraire (Changer les Signes)',
        desc: 'Distribuer le signe moins sur chaque terme du produit et additionner verticalement.',
      },
      {
        title: '4. Abaisser',
        desc: 'Abaisser le terme suivant du dividende et répéter jusqu\'à ce que le degré du reste soit strictement inférieur.',
      },
    ],
    comparisonTable: {
      headers: ['Critère', 'Division Euclidienne Longue', 'Schéma de Ruffini / Horner'],
      rows: [
        ['Diviseurs Compatibles', 'Tout degré (linéaire, quadratique, etc.)', 'Diviseurs de degré 1 uniquement (x - c)'],
        ['Écriture des Variables', 'Complète avec puissances de x', 'Non, uniquement coefficients numériques'],
        ['Puissances Manquantes', 'Obligation d\'insérer +0xᵏ', 'Obligation d\'insérer 0 dans la ligne'],
        ['Asymptote Oblique', 'Supporte les dénominateurs de tout degré', 'Fonctionne si dénominateur est de degré 1'],
        ['Rapidité sur Papier', 'Plus verbeux mais très clair', 'Extrêmement rapide'],
      ],
    },
    studentMistakes: {
      title: 'Top 4 des Pièges aux Examens',
      items: [
        'Oublier de distribuer le signe moins : -(2x² - 4x) donne -2x² + 4x.',
        'Oublier les puissances manquantes : pour x³ - 1, ne pas oublier +0x² + 0x.',
        'S\'arrêter trop tôt : continuer tant que degré du reste ≥ degré du diviseur.',
        'Oublier de diviser par a dans Ruffini avec (2x - 3).',
      ],
    },
    faqs: [
      {
        q: 'Qu\'est-ce que la division euclidienne de polynômes ?',
        a: 'C\'est l\'algorithme permettant de décomposer un polynôme sous la forme P(x) = D(x)Q(x) + R(x) avec deg(R) < deg(D).',
      },
      {
        q: 'Pourquoi inverse-t-on les signes à la soustraction ?',
        a: 'Soustraire revient à multiplier par -1 puis additionner. C\'est la source d\'erreur numéro 1.',
      },
      {
        q: 'Que faire en cas de degré manquant ?',
        a: 'Il est impératif d\'insérer un coefficient nul (ex. 0x) pour aligner les colonnes.',
      },
      {
        q: 'Quand utiliser Ruffini / Horner ?',
        a: 'Exclusivement lorsque le diviseur est du premier degré (x - c ou ax + b).',
      },
      {
        q: 'À quoi sert la forme canonique (compléter le carré) ?',
        a: 'Elle met en évidence les coordonnées du sommet de la parabole et ses racines sans formule quadratique.',
      },
      {
        q: 'Comment trouver l\'asymptote oblique ?',
        a: 'Si deg(P) = deg(D) + 1, le quotient Q(x) donne directement l\'équation de la droite asymptote y = mx + b.',
      },
    ],
    practiceProblems: [
      {
        id: 'p1',
        category: 'Division Euclidienne',
        title: 'Piège du Degré Manquant : (x⁴ - 1) ÷ (x - 1)',
        dividend: 'x^4 - 1',
        divisor: 'x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: 'Complétez avec 0x³ + 0x² + 0x.',
        answerSummary: 'Quotient : x³ + x² + x + 1, Reste : 0',
      },
      {
        id: 'p2',
        category: 'Division Euclidienne',
        title: 'Asymptote Oblique : (2x³ + 3x² - x + 4) ÷ (x² - 1)',
        dividend: '2x^3 + 3x^2 - x + 4',
        divisor: 'x^2 - 1',
        targetMode: 'division',
        difficulty: 'Hard',
        hint: 'Le quotient affine donne l\'asymptote y = 2x + 3.',
        answerSummary: 'Quotient : 2x + 3, Reste : x + 7',
      },
      {
        id: 'p3',
        category: 'Schéma de Ruffini',
        title: 'Diviseur non unitaire : (4x³ - 6x² + 8x - 5) ÷ (2x - 1)',
        dividend: '4x^3 - 6x^2 + 8x - 5',
        divisor: '2x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: 'Racine c = 1/2. Divisez le quotient final par 2.',
        answerSummary: 'Quotient : 2x² - 2x + 3, Reste : -2',
      },
      {
        id: 'p4',
        category: 'Forme Canonique',
        title: 'Polynôme Unitaire : x² - 6x + 5',
        quadratic: 'x^2 - 6x + 5',
        targetMode: 'completing_square',
        difficulty: 'Easy',
        hint: 'Prenez la moitié de -6 soit -3, au carré = 9.',
        answerSummary: 'Forme Canonique : (x - 3)² - 4. Sommet : (3, -4)',
      },
      {
        id: 'p5',
        category: 'Forme Canonique',
        title: 'Facteur a ≠ 1 : 3x² + 12x + 7',
        quadratic: '3x^2 + 12x + 7',
        targetMode: 'completing_square',
        difficulty: 'Hard',
        hint: 'Factorisez 3 : 3(x² + 4x) + 7.',
        answerSummary: 'Forme Canonique : 3(x + 2)² - 5. Sommet : (-2, -5)',
      },
      {
        id: 'p6',
        category: 'Forme Canonique',
        title: 'Coefficient négatif : -x² + 4x + 12',
        quadratic: '-x^2 + 4x + 12',
        targetMode: 'completing_square',
        difficulty: 'Medium',
        hint: 'Factorisez -1 : -(x² - 4x) + 12.',
        answerSummary: 'Forme Canonique : -(x - 2)² + 16. Sommet maximum : (2, 16)',
      },
    ],
  },

  pt: {
    appName: 'PolyMath Calculadora Passo a Passo',
    heroTagline: 'Calculadora de Divisão de Polinômios e Método de Completar Quadrados',
    heroSubtitle: 'Solucionador gratuito passo a passo com layout visual por chave, inversão de sinais nas subtrações, preenchimento de termos ausentes e prova real.',
    navDivision: 'Divisão de Polinômios',
    navCompleteSquare: 'Completar Quadrados',
    navGuide: 'Como Funciona',
    navFaq: 'Perguntas Frequentes',
    dividendLabel: 'Dividendo P(x) (Numerador)',
    divisorLabel: 'Divisor D(x) (Denominador)',
    quadraticLabel: 'Polinômio Quadrático ax² + bx + c',
    dividendPlaceholder: 'ex. 2x^3 - x^2 - 7x + 2 ou x^4 - 16',
    divisorPlaceholder: 'ex. x - 2 ou 2x^2 + 1',
    quadraticPlaceholder: 'ex. 2x^2 + 8x - 10 ou x^2 - 6x + 5',
    calculateBtn: 'Calcular com Passos',
    clearBtn: 'Limpar',
    randomPresetBtn: 'Carregar Exemplo',
    mathKeypadBtn: 'Teclado Matemático',
    showPaddingToggle: 'Exibir Termos Nulos (+0xᵏ)',
    resultHeader: 'Solução e Resolução Passo a Passo',
    quotientLabel: 'Quociente Q(x)',
    remainderLabel: 'Resto R(x)',
    summaryFormLabel: 'Identidade Fundamental da Divisão',
    busStopViewTab: 'Método da Chave (Visual)',
    stepByStepTab: 'Explicação dos Passos',
    syntheticTab: 'Briot-Ruffini (Divisão Sintética)',
    verificationTab: 'Prova Real / Verificação',
    asymptoteTab: 'Assíntota Oblíqua',
    completingSquareTab: 'Passos Completar Quadrado',
    stepCounter: 'Passo {current} de {total}',
    nextStepBtn: 'Próximo Passo →',
    prevStepBtn: '← Anterior',
    showAllStepsBtn: 'Ver Todos os Passos',
    copySolutionBtn: 'Copiar Passos (Markdown)',
    copiedNotice: 'Copiado para a área de transferência!',
    copyLatexBtn: 'Copiar LaTeX',
    printBtn: 'Imprimir / Salvar PDF',
    exactDivisionBadge: 'Divisão Exata (Resto = 0)',
    nonZeroRemainderBadge: 'Resto ≠ 0',
    missingTermsAlert: 'Atenção aos Termos Ausentes',
    missingTermsDesc: 'O polinômio pulou expoentes. Adicionamos coeficientes zero (+0x) para alinhar as colunas corretamente.',
    syntheticNotApplicable: 'O dispositivo de Briot-Ruffini aplica-se a divisores de grau 1. Para grau ≥ 2, utilize a chave.',
    slantAsymptoteFound: 'Assíntota Oblíqua Identificada!',
    slantAsymptoteDesc: 'Como o grau do dividendo é 1 unidade maior que o do divisor, há assíntota oblíqua em y = Q(x).',
    vertexLabel: 'Vértice (Xv, Yv)',
    vertexFormLabel: 'Forma Canônica',
    symmetryAxisLabel: 'Eixo de Simetria',
    rootsLabel: 'Raízes / Zeros',
    yInterceptLabel: 'Interseção no eixo Y',
    directionLabel: 'Concavidade da Parábola',
    extremaLabel: 'Ponto Extremo (Mínimo / Máximo)',
    presetsTitle: 'Exemplos Prontos para Treinar (Ensino Médio e Pré-Cálculo)',
    eduTitle: 'Dominando a Divisão de Polinômios e Fatoração',
    eduSubtitle: 'Regras de sinais, algoritmo da chave e método de Briot-Ruffini.',
    faqTitle: 'Perguntas Frequentes (FAQ)',
    footerNote: 'Criado para alunos do Ensino Médio, Pré-Vestibular e Cálculo.',
    usFormatLabel: '🇺🇸 Formato Americano',
    intlFormatLabel: '🇪🇺 Método da Chave Europeu',
    signFlipLabel: 'Inversão de Sinal',
    flippedPrefix: 'Invertido:',
    broughtDownLabel: 'Baixado do dividendo',
    geometricModelTitle: 'Por que "Completar o Quadrado"? (Modelo de Área)',
    geometricModelDesc: 'Antigos matemáticos completavam literalmente a área de um quadrado geométrico!',
    graphTabLabel: 'Gráfico da Parábola',
    geometryTabLabel: 'Modelo Geométrico de Área',
    stepsTabLabel: 'Dedução Passo a Passo',
    verificationProofTitle: 'Prova Real / Verificação',
    verificationProofDesc: 'Pela Identidade da Divisão: Dividendo = (Divisor · Quociente) + Resto',
    errorZeroDivisor: 'O divisor não pode ser zero!',
    errorInvalidSyntax: 'Sintaxe inválida. Verifique os expoentes e sinais.',
    errorQuadraticDegree: 'Insira um polinômio quadrático de grau 2 (ex. 2x^2 + 8x - 10).',

    divideLeadingDesc: (leadDiv, leadDvr, qTerm) =>
      `Dividir o termo líder (${leadDiv}) pelo termo líder do divisor (${leadDvr}) para obter o termo do quociente: ${qTerm}`,
    multiplyDivisorDesc: (qTerm, divisor, prod) =>
      `Multiplicar o termo do quociente (${qTerm}) pelo divisor (${divisor}): produto obtido é (${prod})`,
    subtractSignFlipDesc: (prod, negated, rem) =>
      `Subtrair (${prod}). Inverter os sinais para (${negated}) e somar, obtendo o resto: (${rem})`,
    bringDownDesc: (term, line) =>
      term
        ? `Baixar o próximo termo (${term}) para formar a nova linha: (${line})`
        : `Todos os termos foram baixados.`,
    syntheticDropLeadDesc: (col, p, c) =>
      `Coluna ${col} (grau ${p}): Baixar o coeficiente líder ${c} diretamente para a linha inferior.`,
    syntheticStepDesc: (col, p, prev, root, prod, top, sum) =>
      `Coluna ${col} (grau ${p}): Multiplicar o resultado anterior (${prev}) pela raiz (${root}) = ${prod}. Somar ao termo superior (${top}) para obter ${sum}.`,
    syntheticDivisorAdjustmentDesc: (aStr) =>
      `Como o coeficiente do divisor é ${aStr} (diferente de 1), dividir todos os termos do quociente por ${aStr}.`,

    rules: [
      {
        title: '1. Dividir',
        desc: 'Divida o primeiro termo do dividendo pelo primeiro termo do divisor e anote no quociente.',
      },
      {
        title: '2. Multiplicar',
        desc: 'Multiplique esse termo por cada termo do divisor e anote o produto embaixo do dividendo.',
      },
      {
        title: '3. Subtrair (Inverter Sinais)',
        desc: 'Subtraia o produto: inverta os sinais (+ para - e - para +) e some verticalmente.',
      },
      {
        title: '4. Baixar Termo',
        desc: 'Baixe o próximo termo do dividendo original e repita os passos 1 a 4 até o resto ter grau menor.',
      },
    ],
    comparisonTable: {
      headers: ['Aspecto', 'Divisão Longa por Chave', 'Dispositivo de Briot-Ruffini'],
      rows: [
        ['Divisores Aplicáveis', 'Qualquer grau (linear, quadrático, etc.)', 'Apenas divisores lineares (x - c ou ax + b)'],
        ['Variáveis Escritas?', 'Sim, variáveis e potências completas', 'Não, apenas coeficientes numéricos'],
        ['Termos Ausentes', 'Obrigatório inserir +0xᵏ', 'Obrigatório colocar 0 na linha'],
        ['Assíntotas Oblíquas', 'Permite qualquer denominador', 'Funciona apenas se denominador for grau 1'],
        ['Velocidade no Papel', 'Mais detalhado e visual', 'Muito rápido, grade de 3 linhas'],
      ],
    },
    studentMistakes: {
      title: 'Top 4 Erros Mais Comuns em Provas e Vestibulares',
      items: [
        'Esquecer de trocar o sinal na subtração: -(2x² - 4x) vira -2x² + 4x.',
        'Pular coeficientes zero: para x³ - 1, não esquecer de +0x² + 0x.',
        'Parar antes da hora: continue dividindo até o grau do resto ser estritamente menor que o do divisor.',
        'Esquecer de dividir por a em Briot-Ruffini com divisores como 2x - 3.',
      ],
    },
    faqs: [
      {
        q: 'O que é a divisão de polinômios e para que serve?',
        a: 'É o método de dividir P(x) por D(x) obtendo um quociente Q(x) e resto R(x). Essencial para fatoração e assíntotas.',
      },
      {
        q: 'Por que invertemos os sinais na subtração?',
        a: 'Subtrair é o mesmo que multiplicar por -1 e somar. Esquecer de inverter o sinal é o erro mais comum.',
      },
      {
        q: 'Como agir quando o polinômio é incompleto?',
        a: 'Insira termos nulos como 0x² e 0x para manter o alinhamento das colunas.',
      },
      {
        q: 'Quando usar Briot-Ruffini?',
        a: 'Apenas quando o divisor for do 1º grau (grau 1). Para divisores de 2º grau ou mais, use a chave.',
      },
      {
        q: 'Para que serve completar quadrados?',
        a: 'Converte a equação na forma canônica a(x - h)² + k, revelando o vértice da parábola imediatamente.',
      },
      {
        q: 'Como encontrar a assíntota oblíqua?',
        a: 'Se o grau do dividendo for exatamente 1 maior que o do divisor, o quociente fornece a reta y = mx + b.',
      },
    ],
    practiceProblems: [
      {
        id: 'p1',
        category: 'Divisão por Chave',
        title: 'Armadilha do Grau Ausente: (x⁴ - 1) ÷ (x - 1)',
        dividend: 'x^4 - 1',
        divisor: 'x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: 'Preencha com 0x³ + 0x² + 0x.',
        answerSummary: 'Quociente: x³ + x² + x + 1, Resto: 0 (Divisão Exata)',
      },
      {
        id: 'p2',
        category: 'Divisão por Chave',
        title: 'Assíntota Oblíqua: (2x³ + 3x² - x + 4) ÷ (x² - 1)',
        dividend: '2x^3 + 3x^2 - x + 4',
        divisor: 'x^2 - 1',
        targetMode: 'division',
        difficulty: 'Hard',
        hint: 'O quociente afim fornece a assíntota y = 2x + 3.',
        answerSummary: 'Quociente: 2x + 3, Resto: x + 7',
      },
      {
        id: 'p3',
        category: 'Briot-Ruffini',
        title: 'Divisor não Mônico: (4x³ - 6x² + 8x - 5) ÷ (2x - 1)',
        dividend: '4x^3 - 6x^2 + 8x - 5',
        divisor: '2x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: 'Raiz c = 1/2. Ao final, divida os coeficientes do quociente por 2.',
        answerSummary: 'Quociente: 2x² - 2x + 3, Resto: -2',
      },
      {
        id: 'p4',
        category: 'Completar Quadrados',
        title: 'Polinômio Mônico: x² - 6x + 5',
        quadratic: 'x^2 - 6x + 5',
        targetMode: 'completing_square',
        difficulty: 'Easy',
        hint: 'Metade de -6 é -3; (-3)² = 9. Some e subtraia 9.',
        answerSummary: 'Forma Canônica: (x - 3)² - 4. Vértice: (3, -4)',
      },
      {
        id: 'p5',
        category: 'Completar Quadrados',
        title: 'Fatorar Coeficiente a ≠ 1: 3x² + 12x + 7',
        quadratic: '3x^2 + 12x + 7',
        targetMode: 'completing_square',
        difficulty: 'Hard',
        hint: 'Coloque 3 em evidência: 3(x² + 4x) + 7.',
        answerSummary: 'Forma Canônica: 3(x + 2)² - 5. Vértice: (-2, -5)',
      },
      {
        id: 'p6',
        category: 'Completar Quadrados',
        title: 'Coeficiente Negativo (Ponto Máximo): -x² + 4x + 12',
        quadratic: '-x^2 + 4x + 12',
        targetMode: 'completing_square',
        difficulty: 'Medium',
        hint: 'Coloque -1 em evidência: -(x² - 4x) + 12.',
        answerSummary: 'Forma Canônica: -(x - 2)² + 16. Vértice: (2, 16)',
      },
    ],
  },

  zh: {
    appName: 'PolyMath 多项式分步求解器',
    heroTagline: '多项式长除法计算器与配方法拆解过程',
    heroSubtitle: '高中代数与微积分先修神器！提供经典竖式（Bus-stop Bracket）对齐排版、变号相减高亮、缺失项补零、综合除法与乘积验算全套步骤。',
    navDivision: '多项式长除法',
    navCompleteSquare: '配方法拆解',
    navGuide: '算法原理',
    navFaq: '常见疑问 (FAQ)',
    dividendLabel: '被除式 P(x)（分子 / 被除多项式）',
    divisorLabel: '除式 D(x)（分母 / 除数多项式）',
    quadraticLabel: '二次多项式 ax² + bx + c',
    dividendPlaceholder: '例如：2x^3 - x^2 - 7x + 2 或 x^4 - 16',
    divisorPlaceholder: '例如：x - 2 或 2x^2 + 1',
    quadraticPlaceholder: '例如：2x^2 + 8x - 10 或 x^2 - 6x + 5',
    calculateBtn: '立即开始分步计算',
    clearBtn: '清空输入',
    randomPresetBtn: '载入典型题例',
    mathKeypadBtn: '数学软键盘',
    showPaddingToggle: '显示缺失项补零 (+0xᵏ)',
    resultHeader: '计算结果与详细推导拆解',
    quotientLabel: '商式 Q(x)',
    remainderLabel: '余式 R(x)',
    summaryFormLabel: '多项式除法恒等式',
    busStopViewTab: '经典竖式排版 (Bus-Stop)',
    stepByStepTab: '推导文字详解',
    syntheticTab: '综合除法 (Ruffini 规则)',
    verificationTab: '代数展开验算',
    asymptoteTab: '斜渐近线分析',
    completingSquareTab: '配方法拆解过程',
    stepCounter: '第 {current} 步 / 共 {total} 步',
    nextStepBtn: '下一步 →',
    prevStepBtn: '← 上一步',
    showAllStepsBtn: '展开全部步骤',
    copySolutionBtn: '复制解题过程 (Markdown)',
    copiedNotice: '已成功复制到剪贴板！',
    copyLatexBtn: '复制 LaTeX 代码',
    printBtn: '打印 / 导出 PDF',
    exactDivisionBadge: '整除 (余式 R = 0)',
    nonZeroRemainderBadge: '带余除法 (余式 R ≠ 0)',
    missingTermsAlert: '多项式存在缺项提醒',
    missingTermsDesc: '原被除式中部分幂次缺失（如 x³ 直接到常数），我们已自动插入 0x 占位符，确保列对齐时相减绝不出现错位！',
    syntheticNotApplicable: '综合除法（鲁菲尼法则）仅适用于一次一次项除式 (x - c 或 ax + b)。当前除式次数 ≥ 2，必须使用多项式长除法。',
    slantAsymptoteFound: '发现斜渐近线 (Slant / Oblique Asymptote)！',
    slantAsymptoteDesc: '因为被除式次数比除式次数恰好高出 1 次，当 x 趋于无穷大时，该有理函数的斜渐近线方程为 y = Q(x)。',
    vertexLabel: '抛物线顶点 (h, k)',
    vertexFormLabel: '顶点式 (Vertex Form)',
    symmetryAxisLabel: '对称轴方程',
    rootsLabel: '方程的解 / 根 (x 轴截距)',
    yInterceptLabel: 'y 轴截距',
    directionLabel: '抛物线开口方向',
    extremaLabel: '最值 (极大值 / 极小值)',
    presetsTitle: '精选高频课后练习题库（美高 Algebra 2 / Precalculus）',
    eduTitle: '多项式长除法与配方法核心算法指南',
    eduSubtitle: '告别易错变号与漏项，4步黄金口诀带你吃透考试痛点。',
    faqTitle: 'Google 常见搜索疑问解答 (FAQ)',
    footerNote: '专为美高高中代数、预备微积分以及大学先修数学学生与教师设计。',
    usFormatLabel: '🇺🇸 美式竖式 (Bus-Stop)',
    intlFormatLabel: '🇪🇺 欧式 / 拉美竖式 (框式)',
    signFlipLabel: '符号翻转',
    flippedPrefix: '变号为:',
    broughtDownLabel: '从被除式移下',
    geometricModelTitle: '为什么叫做“配方法”？（几何面积模型）',
    geometricModelDesc: '古代巴比伦与古希腊数学家通过真正“拼补成一个完整的正方形”来解二次方程！',
    graphTabLabel: '抛物线坐标图',
    geometryTabLabel: '几何面积拼图模型',
    stepsTabLabel: '分步代数推导',
    verificationProofTitle: '展开还原验算 (Proof)',
    verificationProofDesc: '依据除法算法恒等式：被除式 = (除式 · 商式) + 余式',
    errorZeroDivisor: '除式不能为零！除以零在代数中未定义。',
    errorInvalidSyntax: '多项式语法无效，请检查指数与正负符号。',
    errorQuadraticDegree: '请输入最高次数为 2 的二次多项式（例如：2x^2 + 8x - 10）。',

    divideLeadingDesc: (leadDiv, leadDvr, qTerm) =>
      `将被除式当前首项 (${leadDiv}) 除以除式首项 (${leadDvr})，求得商式项：${qTerm}`,
    multiplyDivisorDesc: (qTerm, divisor, prod) =>
      `将商式项 (${qTerm}) 乘以除式全体 (${divisor})：乘积为 (${prod})`,
    subtractSignFlipDesc: (prod, negated, rem) =>
      `从当前被除式中减去乘积。每一项符号翻转为 (${negated}) 后相加，得到新余式：(${rem})`,
    bringDownDesc: (term, line) =>
      term
        ? `移下下一项 (${term})，组成下一轮工作多项式：(${line})`
        : `原多项式所有项已处理完毕。`,
    syntheticDropLeadDesc: (col, p, c) =>
      `第 ${col} 列 (次数 ${p})：将首项系数 ${c} 直接落到最底行。`,
    syntheticStepDesc: (col, p, prev, root, prod, top, sum) =>
      `第 ${col} 列 (次数 ${p})：将前一列底部和 (${prev}) 乘以测试根 (${root}) = ${prod}，加到顶部系数 (${top})，得 ${sum}。`,
    syntheticDivisorAdjustmentDesc: (aStr) =>
      `由于除式首项系数为 ${aStr}（非 1），须将综合除法所得商式的所有系数整体除以 ${aStr}。`,

    rules: [
      {
        title: '1. 相除 (Divide)',
        desc: '将被除式当前最高次项除以除式最高次项，将结果写在上方商式栏。',
      },
      {
        title: '2. 相乘 (Multiply)',
        desc: '用刚才求出的商式单项乘以除式中的每一项，并将乘积写在对应列的下方。',
      },
      {
        title: '3. 相减变号 (Subtract & Flip)',
        desc: '将被除式减去相乘得到的多项式。牢记负号分配律：正变负、负变正，然后合并同类项！',
      },
      {
        title: '4. 移项下落 (Bring Down)',
        desc: '将被除式中的下一项移下来，重复第 1–4 步，直到余式次数严格小于除式次数。',
      },
    ],
    comparisonTable: {
      headers: ['功能对比', '多项式长除法 (Long Division)', '综合除法 (Ruffini 规则)'],
      rows: [
        ['适用除式', '任意次数（一次式、二次式、三次式等）', '仅适用于一次式（x - c 或 ax + b）'],
        ['是否书写变量', '是，保留完整的未知数和幂次', '否，只书写纯数字系数'],
        ['缺项处理方式', '必须插入 +0xᵏ 补齐列宽', '必须在对应位置填 0'],
        ['斜渐近线推导', '支持各种分母情况', '仅适用于一次分母'],
        ['草稿纸书写速度', '步骤详细、排版严密', '三行搞定、速度极快'],
      ],
    },
    studentMistakes: {
      title: '高频失分点：学生考试常犯的 4 大错误',
      items: [
        '忘记括号变号：相减 -(2x² - 4x) 必须变为 -2x² + 4x，绝不是 -2x² - 4x。',
        '漏掉补零项：遇到 x³ - 1，若不补齐 +0x² + 0x，会导致常数项与含 x 项错误相减。',
        '提前终止除法：必须一直除到余式的最高次数严格小于除式的次数才可停止。',
        '非首一除式漏除：如除以 (2x - 3) 时，根为 3/2，综合除法算完后必须把商式所有系数除以 2！',
      ],
    },
    faqs: [
      {
        q: '什么是多项式长除法？什么时候必须使用？',
        a: '多项式长除法是用来将一个多项式除以另一个次数相同或更低多项式的算法。广泛应用于高中代数因式分解、微积分求斜渐近线以及部分分式展开。',
      },
      {
        q: '为什么减法这一步必须每一项都变号？',
        a: '从被除式减去乘积，数学本质等于将负号（-1）分配给括号内的每一项后再相加。漏掉变号是学生做长除法扣分的最常见原因。',
      },
      {
        q: '原多项式缺项时怎么处理？',
        a: '必须补入系数为 0 的占位项（例如 x³ - 8 补为 x³ + 0x² + 0x - 8），以确保上下列按同类项严格对齐。',
      },
      {
        q: '什么时候可以用综合除法代替长除法？',
        a: '综合除法仅在除式为一次一次项（如 x - c 或 ax + b）时才可用。如果除式是二次或更高次数，必须使用长除法。',
      },
      {
        q: '配方法有什么用？',
        a: '配方法将一般式 ax² + bx + c 转化为顶点式 a(x - h)² + k，能一目了然看出抛物线顶点坐标、对称轴与最值，且不需要求根公式就能解方程。',
      },
      {
        q: '长除法如何求出斜渐近线 (Slant Asymptote)？',
        a: '当分子次数恰好比分母高出 1 次时，除出的商式就是一条斜直线 y = mx + b。由于余数部分随 x 趋近于无穷大而趋近于 0，函数图像逼近该直线。',
      },
    ],
    practiceProblems: [
      {
        id: 'p1',
        category: '多项式长除法',
        title: '缺项陷阱题：(x⁴ - 1) ÷ (x - 1)',
        dividend: 'x^4 - 1',
        divisor: 'x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: '请务必补齐 x³、x² 和 x 项：x⁴ + 0x³ + 0x² + 0x - 1。',
        answerSummary: '商式：x³ + x² + x + 1，余式：0（整除）',
      },
      {
        id: 'p2',
        category: '多项式长除法',
        title: '预备微积分斜渐近线：(2x³ + 3x² - x + 4) ÷ (x² - 1)',
        dividend: '2x^3 + 3x^2 - x + 4',
        divisor: 'x^2 - 1',
        targetMode: 'division',
        difficulty: 'Hard',
        hint: '分子 3 次、分母 2 次，除出的商式 2x + 3 即为斜渐近线方程 y = 2x + 3。',
        answerSummary: '商式：2x + 3，余式：x + 7。斜渐近线：y = 2x + 3',
      },
      {
        id: 'p3',
        category: '综合除法',
        title: '非首一一次除式：(4x³ - 6x² + 8x - 5) ÷ (2x - 1)',
        dividend: '4x^3 - 6x^2 + 8x - 5',
        divisor: '2x - 1',
        targetMode: 'division',
        difficulty: 'Medium',
        hint: '除式根为 c = 1/2。算完后需将商式系数统一除以 2。',
        answerSummary: '商式：2x² - 2x + 3，余式：-2',
      },
      {
        id: 'p4',
        category: '配方法',
        title: '标准首一二次方程顶点式：x² - 6x + 5',
        quadratic: 'x^2 - 6x + 5',
        targetMode: 'completing_square',
        difficulty: 'Easy',
        hint: '-6 的一半是 -3，平方得 9。在括号内加 9 减 9。',
        answerSummary: '顶点式：(x - 3)² - 4。顶点：(3, -4)，根：x = 1, x = 5',
      },
      {
        id: 'p5',
        category: '配方法',
        title: '提公因数 a ≠ 1：3x² + 12x + 7',
        quadratic: '3x^2 + 12x + 7',
        targetMode: 'completing_square',
        difficulty: 'Hard',
        hint: '前两项提取 3：3(x² + 4x) + 7。半平方配方数为 (4/2)² = 4。',
        answerSummary: '顶点式：3(x + 2)² - 5。顶点：(-2, -5)，极小值：-5',
      },
      {
        id: 'p6',
        category: '配方法',
        title: '负系数开口向下最高峰：-x² + 4x + 12',
        quadratic: '-x^2 + 4x + 12',
        targetMode: 'completing_square',
        difficulty: 'Medium',
        hint: '提取负号：-(x² - 4x) + 12。注意一次项变号。',
        answerSummary: '顶点式：-(x - 2)² + 16。顶点 (极大值)：(2, 16)',
      },
    ],
  },
};
