/* P2 數與代數：三位數、加減、乘法概念與九九表，從具象分組走向算式。 */
const numericChoices = (answer) => [answer, answer + 1, Math.max(0, answer - 1), answer + 2];
const makeLine = (unitId, rows) => rows.map(([prompt, answer, start, end, step, explanation], index) => ({ id: `${unitId}-Q${String(index + 1).padStart(2, '0')}`, prompt, answer, line: { start, end, step }, explanation }));
const makeChoice = (unitId, rows) => rows.map(([prompt, answer, choices, explanation], index) => ({ id: `${unitId}-Q${String(index + 1).padStart(2, '0')}`, prompt, answer, choices: choices || numericChoices(answer), explanation }));
const withGroupVisuals = (questions, groups) => questions.map((question, index) => ({ ...question, visual: { type: 'groups', ...groups[index] } }));

const p2MathBank = {
  grade: 'P2', subject: '數學',
  units: [
    { id: 'P2-MATH-A01', area: '數與代數', title: '三位數數線', objective: '在數線上認讀及比較三位數，理解每一刻度的數值。', interaction: 'math-number-line', questions: makeLine('P2-MATH-A01', [
      ['請在數線上點選 120。', 120, 100, 200, 10, '100 後第二個十是 120。'], ['請在數線上點選 150。', 150, 100, 200, 10, '150 在 100 和 200 的中間。'], ['請在數線上點選 190。', 190, 100, 200, 10, '190 比 200 少 10。'], ['請在數線上點選 230。', 230, 200, 300, 10, '200 後第三個十是 230。'], ['請在數線上點選 305。', 305, 300, 310, 1, '305 比 300 多 5。'], ['請在數線上點選 360。', 360, 300, 400, 10, '360 是 300 後第六個十。'], ['請在數線上點選 420。', 420, 400, 500, 10, '420 比 400 多 20。'], ['請在數線上點選 508。', 508, 500, 510, 1, '508 比 510 少 2。'], ['請在數線上點選 650。', 650, 600, 700, 10, '650 在 600 和 700 的中間。'], ['請在數線上點選 900。', 900, 800, 900, 10, '900 是這條數線最右邊的數。'],
    ]) },
    { id: 'P2-MATH-A02', area: '數與代數', title: '三位數加減', objective: '運用位值及進退位概念計算三位數加法和減法。', interaction: 'math-choice', questions: makeChoice('P2-MATH-A02', [
      ['125 + 34 = ?', 159, null, '125 加 30 是 155，再加 4 是 159。'], ['208 + 71 = ?', 279, null, '208 加 70 是 278，再加 1 是 279。'], ['346 + 120 = ?', 466, null, '346 加 100、20，得到 466。'], ['487 + 56 = ?', 543, null, '487 加 50 是 537，再加 6 是 543。'], ['600 − 125 = ?', 475, null, '600 減 100、20、5，得到 475。'], ['352 − 40 = ?', 312, null, '352 減 4 個十是 312。'], ['470 − 128 = ?', 342, null, '470 減 100 是 370，再減 28 是 342。'], ['903 − 200 = ?', 703, null, '903 減 2 個百是 703。'], ['715 + 85 = ?', 800, null, '715 加 80 是 795，再加 5 是 800。'], ['500 − 267 = ?', 233, null, '500 減 200 是 300，再減 67 是 233。'],
    ]) },
    { id: 'P2-MATH-A03', area: '數與代數', title: '乘法分組', objective: '把相同數量的組別連結至乘法算式，理解乘法是連加的簡便寫法。', interaction: 'math-choice', questions: withGroupVisuals(makeChoice('P2-MATH-A03', [
      ['有 3 組蘋果，每組 4 個。共有多少個？', 12, null, '3 組 4 個是 3 × 4 = 12。'], ['2 個盒子，每盒有 5 支筆。共有多少支？', 10, null, '2 × 5 = 10。'], ['4 張桌子，每張有 3 本書。共有多少本？', 12, null, '4 × 3 = 12。'], ['5 包餅乾，每包 2 塊。共有多少塊？', 10, null, '5 × 2 = 10。'], ['3 袋橙，每袋 6 個。共有多少個？', 18, null, '3 × 6 = 18。'], ['4 個花瓶，每瓶有 5 朵花。共有多少朵？', 20, null, '4 × 5 = 20。'], ['2 排椅子，每排有 8 張。共有多少張。', 16, null, '2 × 8 = 16。'], ['5 組貼紙，每組有 4 張。共有多少張？', 20, null, '5 × 4 = 20。'], ['3 隊學生，每隊有 7 人。共有多少人？', 21, null, '3 × 7 = 21。'], ['4 個袋子，每袋有 2 個球。共有多少個球？', 8, null, '4 × 2 = 8。'],
    ]), [{ kind: 'apple', groups: 3, each: 4 }, { kind: 'pencil', groups: 2, each: 5 }, { kind: 'book', groups: 4, each: 3 }, { kind: 'biscuit', groups: 5, each: 2 }, { kind: 'orange', groups: 3, each: 6 }, { kind: 'flower', groups: 4, each: 5 }, { kind: 'chair', groups: 2, each: 8 }, { kind: 'sticker', groups: 5, each: 4 }, { kind: 'pupil', groups: 3, each: 7 }, { kind: 'ball', groups: 4, each: 2 }]) },
    { id: 'P2-MATH-A04', area: '數與代數', title: '九九表快手', objective: '熟練 2 至 9 的乘法表，並用乘法解決簡單生活題。', interaction: 'math-choice', questions: makeChoice('P2-MATH-A04', [
      ['2 × 7 = ?', 14, null, '2 × 7 = 14。'], ['3 × 8 = ?', 24, null, '3 × 8 = 24。'], ['4 × 6 = ?', 24, null, '4 × 6 = 24。'], ['5 × 9 = ?', 45, null, '5 × 9 = 45。'], ['6 × 7 = ?', 42, null, '6 × 7 = 42。'], ['8 × 8 = ?', 64, null, '8 × 8 = 64。'], ['9 × 4 = ?', 36, null, '9 × 4 = 36。'], ['7 × 3 = ?', 21, null, '7 × 3 = 21。'], ['6 × 5 = ?', 30, null, '6 × 5 = 30。'], ['9 × 9 = ?', 81, null, '9 × 9 = 81。'],
    ]) },
  ],
};

export default p2MathBank;
