/* 中文題庫索引：課程頁只透過此檔讀取各級題庫，日後可逐級獨立編寫與驗收。 */
import p1 from './p1.js';
import p2 from './p2.js';
import p3 from './p3.js';
import p4 from './p4.js';
import p5 from './p5.js';
import p6 from './p6.js';
import { annotateChineseQuestionBank, chineseQuestionUnitMetadata } from './metadata.js';

export { chineseQuestionUnitMetadata };
export const chineseQuestionBanks = {
  P1: annotateChineseQuestionBank(p1),
  P2: annotateChineseQuestionBank(p2),
  P3: annotateChineseQuestionBank(p3),
  P4: annotateChineseQuestionBank(p4),
  P5: annotateChineseQuestionBank(p5),
  P6: annotateChineseQuestionBank(p6),
};

export function getChineseQuestionBank(grade) {
  return chineseQuestionBanks[grade] || p1;
}
