import p1MathBank from './p1.js';
import p2MathBank from './p2.js';
import p3MathBank from './p3.js';

export const mathQuestionBanks = { P1: p1MathBank, P2: p2MathBank, P3: p3MathBank };
export const getMathQuestionBank = (grade) => mathQuestionBanks[grade] || null;
