/* 中文題庫索引：課程頁只透過此檔讀取各級題庫，日後可逐級獨立編寫與驗收。 */
import p1 from './p1';
import p2 from './p2';
import p3 from './p3';
import p4 from './p4';
import p5 from './p5';
import p6 from './p6';

export const chineseQuestionBanks = { P1: p1, P2: p2, P3: p3, P4: p4, P5: p5, P6: p6 };

export function getChineseQuestionBank(grade) {
  return chineseQuestionBanks[grade] || p1;
}
