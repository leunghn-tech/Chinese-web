import p1MathBank from './p1.js';
import p2MathBank from './p2.js';
import p3MathBank from './p3.js';
import p4MathBank from './p4.js';
import p5MathBank from './p5.js';
import p6MathBank from './p6.js';

export const mathQuestionBanks = { P1: p1MathBank, P2: p2MathBank, P3: p3MathBank, P4: p4MathBank, P5: p5MathBank, P6: p6MathBank };
export const getMathQuestionBank = (grade) => mathQuestionBanks[grade] || null;
