export type Language = 'en' | 'zh';

export const translations = {
  en: {
    siteTitle: 'Polynomial Math Suite',
    tagline: 'Step-by-Step Polynomial Long Division & Completing the Square Calculator',
    toolLongDivision: 'Polynomial Long Division',
    toolCompletingSquare: 'Completing the Square',

    // Headings & Tool Titles
    longDivisionTitle: 'Polynomial Long Division Calculator',
    longDivisionDesc: 'Divide polynomials with exact fractions, step-by-step US & European layouts, synthetic division (Ruffini), and asymptote calculation.',
    completingSquareTitle: 'Completing the Square Calculator',
    completingSquareDesc: 'Transform quadratic expressions into vertex form y = a(x - h)² + k, calculate vertex, roots, axis of symmetry, and plot the interactive parabola.',

    // Inputs
    dividendLabel: 'Dividend Polynomial P(x)',
    divisorLabel: 'Divisor Polynomial D(x)',
    quadraticLabel: 'Quadratic Polynomial P(x)',
    dividendPlaceholder: 'e.g. 2x³ - x² - 7x + 2 or (x⁴-1)',
    divisorPlaceholder: 'e.g. x - 2 or (2x - 3)',
    quadraticPlaceholder: 'e.g. 3x² + 12x + 7 or -2x² + 8x - 5',
    calculateBtn: 'Calculate Solution',
    clearBtn: 'Clear Inputs',
    exampleLabel: 'Quick Examples:',

    // Tabs
    tabSteps: 'Step-by-Step Solution',
    tabBusStop: 'US / European Vertical Layout',
    tabRuffini: 'Synthetic Division (Ruffini)',
    tabAsymptote: 'Asymptotes & Summary',
    tabGraph: 'Parabola Plot & Properties',
    tabVerification: 'Expansion Verification',

    // Labels & Buttons
    missingZeroToggle: 'Show Missing Terms (+ 0xᵏ)',
    europeanLayoutToggle: 'Use European Vertical Layout',
    copyMarkdown: 'Copy Markdown',
    copyLatex: 'Copy LaTeX',
    copySuccess: 'Copied to clipboard!',
    copyFailed: 'Copy failed. Please select text to copy manually.',
    copyUrl: 'Copy Share Link',

    // Division Output
    quotientLabel: 'Quotient Q(x)',
    remainderLabel: 'Remainder R(x)',
    resultEquation: 'Standard Division Identity:',
    obliqueAsymptote: 'Oblique / Slant Asymptote:',
    horizontalAsymptote: 'Horizontal Asymptote:',

    // Completing Square Output
    vertexFormLabel: 'Vertex Form:',
    vertexLabel: 'Vertex (h, k):',
    rootsLabel: 'Roots (X-intercepts):',
    discriminantLabel: 'Discriminant (Δ):',
    axisOfSymmetryLabel: 'Axis of Symmetry:',
    yInterceptLabel: 'Y-Intercept:',
    extremumLabel: 'Extremum:',

    // Ruffini
    ruffiniTitle: 'Synthetic Division (Ruffini\'s Rule)',
    ruffiniRoot: 'Root (c = -b/a):',
    ruffiniNotApplicable: 'Synthetic division is applicable only when the divisor is linear (degree 1), e.g. x - c or ax + b.',
    ruffiniCoeffRow: 'Dividend Coeffs',
    ruffiniMultRow: 'Multiplier (× c)',
    ruffiniResultRow: 'Result Coeffs',

    // Steps Wording
    stepHeader: 'Step',
    dividePhase: 'Divide',
    multiplyPhase: 'Multiply',
    subtractPhase: 'Subtract (Flip Signs)',
    bringDownPhase: 'Bring Down Next Term',

    // Graph Ticks & Axis
    xAxisLabel: 'X Axis',
    yAxisLabel: 'Y Axis',
    graphTitle: 'Interactive Parabola Visualization',

    // Common Errors Section
    commonErrorsTitle: 'Common Algebraic Pitfalls & Tips',
    error1Title: '1. Forgetting to pad missing polynomial terms',
    error1Desc: 'When dividing x⁴ - 1 by x - 1, write dividend as x⁴ + 0x³ + 0x² + 0x - 1 to keep column alignment aligned correctly.',
    error2Title: '2. Sign reversal during subtraction',
    error2Desc: 'Remember: Subtracting a negative polynomial term turns it into addition (+)! Always flip all signs of the product before adding.',
    error3Title: '3. Non-monic linear divisor (ax + b)',
    error3Desc: 'In Ruffini synthetic division with divisor ax + b, remember to divide the raw result coefficients by "a" to get the actual quotient!',
    error4Title: '4. Exponent syntax',
    error4Desc: 'Use ^ for powers (e.g. x^3) or standard Unicode superscripts (x³, x²). Omit multiplication sign between coefficient and variable (e.g. 2x).',

    // FAQ Section
    faqTitle: 'Frequently Asked Questions',
    faq1Q: 'How does polynomial long division work?',
    faq1A: 'Polynomial long division divides a dividend polynomial P(x) by a divisor D(x) to yield a quotient Q(x) and remainder R(x) such that P(x) = D(x)·Q(x) + R(x), where degree(R) < degree(D).',
    faq2Q: 'When can I use Ruffini synthetic division?',
    faq2A: 'Synthetic division is a shortcut for polynomial long division when the divisor is linear of the form (x - c) or (ax + b).',
    faq3Q: 'How do you complete the square for ax² + bx + c when a ≠ 1?',
    faq3A: 'First factor "a" out of the x² and x terms to get a(x² + (b/a)x) + c. Then add and subtract ((b/a)/2)² inside the brackets, convert to perfect square a(x + b/2a)² and simplify the remaining constant.',
    faq4Q: 'Does this calculator handle non-monic divisors and exact fractions?',
    faq4A: 'Yes! All calculations use exact rational BigInt fraction arithmetic so no rounding errors occur (e.g., (x²+1) ÷ (2x-3) yields Q = 1/2 x + 3/4 with exact Remainder = 13/4).',

    // Math Keyboard
    keyboardTitle: 'Math Soft Keyboard',

    // Accessibility
    errorAlertTitle: 'Calculation Error',
    languageSwitch: '切换到中文',
  },
  zh: {
    siteTitle: '多项式数学套件',
    tagline: '多项式长除法、综合除法 (Ruffini) 与配方法分步求解器',
    toolLongDivision: '多项式长除法',
    toolCompletingSquare: '配方法 (顶点式)',

    // Headings & Tool Titles
    longDivisionTitle: '多项式长除法计算器',
    longDivisionDesc: '支持精确分数运算、中美/欧美竖式排版、Ruffini综合除法逐列详解及斜渐近线计算。',
    completingSquareTitle: '配方法 (Completing the Square) 计算器',
    completingSquareDesc: '将二次多项式转化为顶点式 y = a(x - h)² + k，计算顶点、根、对称轴并绘制带刻度的抛物线图。',

    // Inputs
    dividendLabel: '被除式 P(x)',
    divisorLabel: '除式 D(x)',
    quadraticLabel: '二次多项式 P(x)',
    dividendPlaceholder: '例如：2x³ - x² - 7x + 2 或 (x⁴-1)',
    divisorPlaceholder: '例如：x - 2 或 (2x - 3)',
    quadraticPlaceholder: '例如：3x² + 12x + 7 或 -2x² + 8x - 5',
    calculateBtn: '开始计算',
    clearBtn: '清空输入',
    exampleLabel: '精选经典例题：',

    // Tabs
    tabSteps: '分步推导过程',
    tabBusStop: '竖式图解排版 (US/Euro)',
    tabRuffini: '综合除法 (Ruffini 列式)',
    tabAsymptote: '渐近线与等式汇总',
    tabGraph: '抛物线图像与性质',
    tabVerification: '代数展开验算',

    // Labels & Buttons
    missingZeroToggle: '显示缺失补零项 (+ 0xᵏ)',
    europeanLayoutToggle: '切换为欧洲竖式格式',
    copyMarkdown: '复制 Markdown 格式',
    copyLatex: '复制 LaTeX 格式',
    copySuccess: '已成功复制到剪贴板！',
    copyFailed: '复制失败，请手动选中文本进行复制。',
    copyUrl: '复制页面分享链接',

    // Division Output
    quotientLabel: '商式 Q(x)',
    remainderLabel: '余式 R(x)',
    resultEquation: '多项式除法恒等式：',
    obliqueAsymptote: '斜渐近线 (Oblique Asymptote)：',
    horizontalAsymptote: '水平渐近线 (Horizontal Asymptote)：',

    // Completing Square Output
    vertexFormLabel: '最终顶点式：',
    vertexLabel: '抛物线顶点 (h, k)：',
    rootsLabel: '方程的根 (X 轴交点)：',
    discriminantLabel: '判别式 (Δ = b² - 4ac)：',
    axisOfSymmetryLabel: '对称轴方程：',
    yInterceptLabel: 'Y 轴截距：',
    extremumLabel: '极值：',

    // Ruffini
    ruffiniTitle: '综合除法 (Ruffini 列式)',
    ruffiniRoot: '根 (c = -b/a)：',
    ruffiniNotApplicable: '仅当除式为一次线性多项式 (如 x - c 或 ax + b) 时适用综合除法。',
    ruffiniCoeffRow: '被除式系数',
    ruffiniMultRow: '乘数 (× c)',
    ruffiniResultRow: '计算结果',

    // Steps Wording
    stepHeader: '第 %d 步',
    dividePhase: '一除 (Divide)',
    multiplyPhase: '二乘 (Multiply)',
    subtractPhase: '三减 (Subtract 变号)',
    bringDownPhase: '四拉 (Bring down)',

    // Graph Ticks & Axis
    xAxisLabel: 'X 轴',
    yAxisLabel: 'Y 轴',
    graphTitle: '抛物线动态可视化图表',

    // Common Errors Section
    commonErrorsTitle: '常见算理错误与防错提示',
    error1Title: '1. 忘记缺项补零',
    error1Desc: '计算 (x⁴ - 1) ÷ (x - 1) 时，请将被除式补全为 x⁴ + 0x³ + 0x² + 0x - 1，确保竖式中同次项上下对齐。',
    error2Title: '2. 竖式相减时符号弄错',
    error2Desc: '切记：减去一个负数等于加上正数！竖式相减时，请先将第二行的每一项变号（正变负、负变正），再与上一行相加。',
    error3Title: '3. 首项系数不为 1 的线性除式 (ax + b)',
    error3Desc: '在综合除法中，若除式为 ax + b (如 2x - 3)，算出的底行系数需再除以系数 a 才是真正的商式系数！',
    error4Title: '4. 表达式输入规范',
    error4Desc: '幂次可用 ^ 表示 (如 x^3) 或 Unicode 上标 (x³, x²)。系数与变量间可省略乘号 (如 2x)。',

    // FAQ Section
    faqTitle: '常见问题解答 (FAQ)',
    faq1Q: '什么是多项式长除法？',
    faq1A: '多项式长除法是一种将被除式 P(x) 除以除式 D(x) 得到商式 Q(x) 和余式 R(x) 的代数算法，满足 P(x) = D(x)·Q(x) + R(x)，且余式次数小于除式次数。',
    faq2Q: '什么时候可以使用综合除法 (Ruffini\'s Rule)？',
    faq2A: '当除式为一次线性多项式 (x - c) 或 (ax + b) 时，可以使用更简便的综合除法。',
    faq3Q: '当二次项系数 a ≠ 1 时如何配方？',
    faq3A: '先从二次项和一次项中提取系数 a 得到 a[x² + (b/a)x] + c，再在括号内加上并减去 ((b/a)/2)²，化为 a(x + b/2a)² 并合并外侧常数。',
    faq4Q: '计算器是否支持非首一除式和精确分数？',
    faq4A: '完全支持！本系统采用 BigInt 实施有理数无损精确计算，例如 (x²+1) ÷ (2x-3) 输出精确商 Q = 1/2 x + 3/4，余式 R = 13/4。',

    // Math Keyboard
    keyboardTitle: '数学软键盘',

    // Accessibility
    errorAlertTitle: '计算错误',
    languageSwitch: 'Switch to English',
  },
};
