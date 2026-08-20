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
    { id: 'P2-MATH-A05', area: '量度', title: '量度看圖', objective: '閱讀尺、量杯和時鐘圖解，選出合適量度單位、刻度及時間。', interaction: 'math-measurement', questions: [
      { id: 'P2-MATH-A05-Q01', prompt: '這枝鉛筆長多少厘米？', visual: { type: 'ruler', value: 12, max: 20 }, answer: '12 cm', choices: ['10 cm', '12 cm', '14 cm', '20 cm'], explanation: '鉛筆右端對準 12 cm 刻度。' },
      { id: 'P2-MATH-A05-Q02', prompt: '這條緞帶長多少厘米？', visual: { type: 'ruler', value: 18, max: 20 }, answer: '18 cm', choices: ['16 cm', '17 cm', '18 cm', '20 cm'], explanation: '緞帶由 0 cm 開始，到 18 cm 結束。' },
      { id: 'P2-MATH-A05-Q03', prompt: '量杯中的果汁約有多少毫升？', visual: { type: 'cup', value: 300, max: 500 }, answer: '300 mL', choices: ['100 mL', '200 mL', '300 mL', '500 mL'], explanation: '液面對準 300 mL 刻度。' },
      { id: 'P2-MATH-A05-Q04', prompt: '這瓶水較適合用哪個單位量度？', visual: { type: 'cup', value: 500, max: 500 }, answer: 'mL', choices: ['cm', 'mL', 'kg', 'h'], explanation: '飲品容量通常用毫升 mL 表示。' },
      { id: 'P2-MATH-A05-Q05', prompt: '時鐘顯示甚麼時間？', visual: { type: 'clock', hour: 3, minute: 0 }, answer: '3:00', choices: ['2:00', '3:00', '3:30', '4:00'], explanation: '短針指向 3，長針指向 12。' },
      { id: 'P2-MATH-A05-Q06', prompt: '時鐘顯示甚麼時間？', visual: { type: 'clock', hour: 7, minute: 30 }, answer: '7:30', choices: ['7:00', '7:30', '8:00', '8:30'], explanation: '長針指向 6，表示半小時；短針在 7 和 8 中間。' },
      { id: 'P2-MATH-A05-Q07', prompt: '課堂由 9:00 開始，10:00 結束，共多少小時？', visual: { type: 'clock', hour: 9, minute: 0, endHour: 10, endMinute: 0 }, answer: '1 小時', choices: ['30 分鐘', '1 小時', '2 小時', '3 小時'], explanation: '由 9:00 到 10:00 是 1 小時。' },
      { id: 'P2-MATH-A05-Q08', prompt: '哪一個物品較適合用 cm 量度？', visual: { type: 'ruler', value: 15, max: 20 }, answer: '課本的闊度', choices: ['果汁容量', '課本的闊度', '上課時間', '水缸容量'], explanation: '課本的長或闊可用厘米 cm 量度。' },
      { id: 'P2-MATH-A05-Q09', prompt: '量杯中的水由 200 mL 加至 400 mL，增加了多少？', visual: { type: 'cup', value: 400, startValue: 200, max: 500 }, answer: '200 mL', choices: ['100 mL', '200 mL', '300 mL', '400 mL'], explanation: '400 mL − 200 mL = 200 mL。' },
      { id: 'P2-MATH-A05-Q10', prompt: '由 4:00 到 4:30，經過多久？', visual: { type: 'clock', hour: 4, minute: 0, endHour: 4, endMinute: 30 }, answer: '30 分鐘', choices: ['15 分鐘', '30 分鐘', '45 分鐘', '1 小時'], explanation: '長針由 12 走到 6，經過 30 分鐘。' },
    ] },
  ],
};

export default p2MathBank;
