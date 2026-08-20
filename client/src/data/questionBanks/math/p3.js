/* P3 數與代數：五位數、乘除、運算順序與分數初步，連接小三核心計算能力。 */
const numericChoices = (answer) => [answer, answer + 1, Math.max(0, answer - 1), answer + 2];
const makeLine = (unitId, rows) => rows.map(([prompt, answer, start, end, step, explanation], index) => ({ id: `${unitId}-Q${String(index + 1).padStart(2, '0')}`, prompt, answer, line: { start, end, step }, explanation }));
const makeChoice = (unitId, rows) => rows.map(([prompt, answer, choices, explanation], index) => ({ id: `${unitId}-Q${String(index + 1).padStart(2, '0')}`, prompt, answer, choices: choices || numericChoices(answer), explanation }));
const withShareVisuals = (questions, groups) => questions.map((question, index) => ({ ...question, visual: { type: 'share', ...groups[index] } }));
const withFractionVisuals = (questions, fractions) => questions.map((question, index) => fractions[index] ? ({ ...question, visual: { type: 'fraction', ...fractions[index] } }) : question);

const p3MathBank = {
  grade: 'P3', subject: '數學',
  units: [
    { id: 'P3-MATH-A01', area: '數與代數', title: '五位數數線', objective: '在數線上認讀五位數，掌握千位及萬位數的相對位置。', interaction: 'math-number-line', questions: makeLine('P3-MATH-A01', [
      ['請在數線上點選 12,000。', 12000, 10000, 20000, 1000, '10,000 後第二個千是 12,000。'], ['請在數線上點選 15,000。', 15000, 10000, 20000, 1000, '15,000 在 10,000 和 20,000 的中間。'], ['請在數線上點選 19,000。', 19000, 10000, 20000, 1000, '19,000 比 20,000 少 1,000。'], ['請在數線上點選 23,000。', 23000, 20000, 30000, 1000, '20,000 後第三個千是 23,000。'], ['請在數線上點選 30,500。', 30500, 30000, 31000, 100, '30,500 比 30,000 多 500。'], ['請在數線上點選 36,000。', 36000, 30000, 40000, 1000, '36,000 是 30,000 後第六個千。'], ['請在數線上點選 42,000。', 42000, 40000, 50000, 1000, '42,000 比 40,000 多 2,000。'], ['請在數線上點選 50,800。', 50800, 50000, 51000, 100, '50,800 比 51,000 少 200。'], ['請在數線上點選 65,000。', 65000, 60000, 70000, 1000, '65,000 在 60,000 和 70,000 的中間。'], ['請在數線上點選 90,000。', 90000, 80000, 90000, 1000, '90,000 是這條數線最右邊的數。'],
    ]) },
    { id: 'P3-MATH-A02', area: '數與代數', title: '乘法進階', objective: '運用乘法表及拆分策略完成兩位數乘一位數和生活情境題。', interaction: 'math-choice', questions: makeChoice('P3-MATH-A02', [
      ['24 × 3 = ?', 72, null, '20 × 3 = 60，4 × 3 = 12，共 72。'], ['15 × 4 = ?', 60, null, '10 × 4 = 40，5 × 4 = 20，共 60。'], ['32 × 2 = ?', 64, null, '32 的兩倍是 64。'], ['18 × 5 = ?', 90, null, '10 × 5 = 50，8 × 5 = 40，共 90。'], ['27 × 3 = ?', 81, null, '20 × 3 = 60，7 × 3 = 21，共 81。'], ['14 × 6 = ?', 84, null, '10 × 6 = 60，4 × 6 = 24，共 84。'], ['25 × 4 = ?', 100, null, '25 的 4 倍是 100。'], ['36 × 2 = ?', 72, null, '36 加 36 等於 72。'], ['19 × 5 = ?', 95, null, '20 × 5 = 100，再減 5 是 95。'], ['42 × 2 = ?', 84, null, '42 的兩倍是 84。'],
    ]) },
    { id: 'P3-MATH-A03', area: '數與代數', title: '平均分與除法', objective: '把平均分組及包含除情境寫成除法算式，理解商與餘數。', interaction: 'math-choice', questions: withShareVisuals(makeChoice('P3-MATH-A03', [
      ['24 顆糖平均分給 6 人，每人有多少顆？', 4, null, '24 ÷ 6 = 4。'], ['35 本書每 5 本放一疊，可放多少疊？', 7, null, '35 ÷ 5 = 7。'], ['42 個球平均放入 7 個袋，每袋有多少個？', 6, null, '42 ÷ 7 = 6。'], ['32 張貼紙每人分 4 張，可分給多少人？', 8, null, '32 ÷ 4 = 8。'], ['45 支鉛筆平均分給 9 人，每人有多少支？', 5, null, '45 ÷ 9 = 5。'], ['50 個蘋果每袋放 10 個，共要多少袋？', 5, null, '50 ÷ 10 = 5。'], ['29 粒珠平均分給 4 人，每人 7 粒後，餘下多少粒？', 1, null, '4 × 7 = 28，29 − 28 = 1。'], ['38 支旗每 6 支一組，可組成 6 組後，餘下多少支？', 2, null, '6 × 6 = 36，38 − 36 = 2。'], ['56 ÷ 8 = ?', 7, null, '因為 8 × 7 = 56。'], ['63 ÷ 9 = ?', 7, null, '因為 9 × 7 = 63。'],
    ]), [{ groups: 6, each: 4, kind: 'sweet' }, { groups: 5, each: 7, kind: 'book' }, { groups: 7, each: 6, kind: 'ball' }, { groups: 8, each: 4, kind: 'sticker' }, { groups: 9, each: 5, kind: 'pencil' }, { groups: 5, each: 10, kind: 'apple' }, { groups: 4, each: 7, remainder: 1, kind: 'bead' }, { groups: 6, each: 6, remainder: 2, kind: 'flag' }, { groups: 8, each: 7, kind: 'dot' }, { groups: 9, each: 7, kind: 'dot' }]) },
    { id: 'P3-MATH-A04', area: '數與代數', title: '四則運算次序', objective: '在沒有括號的算式中，先完成乘除，再進行加減。', interaction: 'math-choice', questions: makeChoice('P3-MATH-A04', [
      ['3 + 4 × 2 = ?', 11, null, '先算 4 × 2 = 8，再加 3，得 11。'], ['20 − 3 × 4 = ?', 8, null, '先算 3 × 4 = 12，20 − 12 = 8。'], ['18 ÷ 3 + 5 = ?', 11, null, '先算 18 ÷ 3 = 6，再加 5。'], ['6 × 5 − 7 = ?', 23, null, '先算 6 × 5 = 30，再減 7。'], ['24 ÷ 6 + 9 = ?', 13, null, '先算 24 ÷ 6 = 4，再加 9。'], ['8 + 12 ÷ 3 = ?', 12, null, '先算 12 ÷ 3 = 4，再加 8。'], ['5 × 4 + 6 = ?', 26, null, '先算 5 × 4 = 20，再加 6。'], ['30 − 16 ÷ 4 = ?', 26, null, '先算 16 ÷ 4 = 4，再用 30 − 4。'], ['7 + 3 × 5 = ?', 22, null, '先算 3 × 5 = 15，再加 7。'], ['48 ÷ 8 + 14 = ?', 20, null, '先算 48 ÷ 8 = 6，再加 14。'],
    ]) },
    { id: 'P3-MATH-A05', area: '數與代數', title: '分數初步', objective: '認識分子、分母及同分母分數的大小，連結平均分的生活情境。', interaction: 'math-choice', questions: withFractionVisuals(makeChoice('P3-MATH-A05', [
      ['把一個蛋糕平均分成 4 份，吃了 1 份，是全個蛋糕的幾分之幾？', '1/4', ['1/4', '1/3', '2/4', '4/1'], '平均分成 4 份，取其中 1 份，是 1/4。'], ['把 8 個橙平均分成 4 組，每組有幾個？', 2, null, '8 ÷ 4 = 2。'], ['哪一個分數較大？', '3/5', ['2/5', '3/5', '1/5', '0/5'], '分母相同時，分子較大的分數較大。'], ['哪一個分數表示一半？', '1/2', ['1/2', '1/3', '2/3', '1/4'], '一個整體平均分成 2 份，取 1 份就是一半。'], ['把一條紙帶平均分成 6 份，塗了 4 份，是多少？', '4/6', ['4/6', '6/4', '2/6', '1/6'], '總共 6 份，塗了 4 份，是 4/6。'], ['在 1/8、5/8、3/8 中，哪一個最大？', '5/8', ['1/8', '5/8', '3/8', '0/8'], '分母相同，5 個八分之一最多。'], ['2/7 表示甚麼？', '把整體平均分成 7 份，取其中 2 份。', ['把整體平均分成 7 份，取其中 2 份。', '把整體分成 2 份，取 7 份。', '有 2 個整體和 7 份。', '把整體平均分成 2 份，取 7 份。'], '分母 7 表示平均分成 7 份；分子 2 表示取 2 份。'], ['哪一個與 2/4 有相同分母？', '3/4', ['3/4', '2/3', '4/2', '1/2'], '2/4 和 3/4 的分母都是 4。'], ['一個西瓜平均切成 10 片，吃了 7 片，是幾分之幾？', '7/10', ['7/10', '10/7', '3/10', '1/10'], '總共 10 片，吃了 7 片，是 7/10。'], ['哪一個分數最小？', '1/6', ['1/6', '2/6', '4/6', '5/6'], '分母相同時，分子最小的分數最小。'],
    ]), [{ total: 4, filled: 1, label: '1/4' }, null, { total: 5, filled: 3, label: '3/5' }, { total: 2, filled: 1, label: '1/2' }, { total: 6, filled: 4, label: '4/6' }, { total: 8, filled: 5, label: '5/8' }, { total: 7, filled: 2, label: '2/7' }, { total: 4, filled: 2, label: '2/4' }, { total: 10, filled: 7, label: '7/10' }, { total: 6, filled: 1, label: '1/6' }]) },
    { id: 'P3-MATH-A06', area: '量度', title: '量度圖解進階', objective: '運用量尺、量杯和時鐘圖解解決長度、容量和時間的生活問題。', interaction: 'math-measurement', questions: [
      { id: 'P3-MATH-A06-Q01', prompt: '這條絲帶長多少 cm？', visual: { type: 'ruler', value: 26, max: 30 }, answer: '26 cm', choices: ['24 cm', '25 cm', '26 cm', '30 cm'], explanation: '絲帶右端對準 26 cm。' },
      { id: 'P3-MATH-A06-Q02', prompt: '由 15 cm 延長到 28 cm，共增加多少 cm？', visual: { type: 'ruler', value: 28, startValue: 15, max: 30 }, answer: '13 cm', choices: ['12 cm', '13 cm', '15 cm', '28 cm'], explanation: '28 − 15 = 13。' },
      { id: 'P3-MATH-A06-Q03', prompt: '水壺中有多少 mL 水？', visual: { type: 'cup', value: 750, max: 1000 }, answer: '750 mL', choices: ['500 mL', '650 mL', '750 mL', '1 000 mL'], explanation: '液面對準 750 mL。' },
      { id: 'P3-MATH-A06-Q04', prompt: '由 300 mL 加至 700 mL，增加多少 mL？', visual: { type: 'cup', value: 700, startValue: 300, max: 1000 }, answer: '400 mL', choices: ['300 mL', '400 mL', '500 mL', '700 mL'], explanation: '700 − 300 = 400。' },
      { id: 'P3-MATH-A06-Q05', prompt: '時鐘顯示甚麼時間？', visual: { type: 'clock', hour: 8, minute: 45 }, answer: '8:45', choices: ['8:15', '8:30', '8:45', '9:45'], explanation: '長針指向 9，短針接近 9，表示 8:45。' },
      { id: 'P3-MATH-A06-Q06', prompt: '由 2:15 到 3:00，經過多久？', visual: { type: 'clock', hour: 2, minute: 15, endHour: 3, endMinute: 0 }, answer: '45 分鐘', choices: ['30 分鐘', '45 分鐘', '1 小時', '1 小時 15 分鐘'], explanation: '由 2:15 到 3:00 是 45 分鐘。' },
      { id: 'P3-MATH-A06-Q07', prompt: '旅行車於 9:30 出發，11:00 到達，車程多久？', visual: { type: 'clock', hour: 9, minute: 30, endHour: 11, endMinute: 0 }, answer: '1 小時 30 分鐘', choices: ['1 小時', '1 小時 30 分鐘', '2 小時', '2 小時 30 分鐘'], explanation: '由 9:30 到 10:30 是 1 小時，再到 11:00 是 30 分鐘。' },
      { id: 'P3-MATH-A06-Q08', prompt: '較適合用 L 量度的是哪一項？', visual: { type: 'cup', value: 1000, max: 1000 }, answer: '一桶水的容量', choices: ['一枝鉛筆的長度', '一桶水的容量', '上課的時間', '一本書的厚度'], explanation: '較大量的液體容量可用升 L 量度。' },
      { id: 'P3-MATH-A06-Q09', prompt: '運動由 3:20 開始，4:05 結束，經過多久？', visual: { type: 'clock', hour: 3, minute: 20, endHour: 4, endMinute: 5 }, answer: '45 分鐘', choices: ['35 分鐘', '40 分鐘', '45 分鐘', '55 分鐘'], explanation: '由 3:20 到 4:00 是 40 分鐘，再加 5 分鐘。' },
      { id: 'P3-MATH-A06-Q10', prompt: '兩條繩子分別長 18 cm 和 26 cm，相差多少 cm？', visual: { type: 'ruler', value: 26, startValue: 18, max: 30 }, answer: '8 cm', choices: ['6 cm', '8 cm', '18 cm', '26 cm'], explanation: '26 − 18 = 8。' },
    ] },
    { id: 'P3-MATH-A07', area: '數與代數', title: '切餅分數操作', objective: '把切餅拖到分數盤，並以點選作替代，從彩色部分讀出分數。', interaction: 'math-fraction-pie', questions: [
      { id: 'P3-MATH-A07-Q01', prompt: '把 1 塊切餅拖入 4 等份的圓餅盤。完成後表示哪個分數？', total: 4, target: 1, answer: '1/4', choices: ['1/4', '1/2', '2/4', '4/1'], explanation: '4 等份中有 1 份彩色，是 1/4。' },
      { id: 'P3-MATH-A07-Q02', prompt: '把 2 塊切餅拖入 4 等份的圓餅盤。完成後表示哪個分數？', total: 4, target: 2, answer: '2/4', choices: ['1/4', '2/4', '3/4', '4/2'], explanation: '4 等份中有 2 份彩色，是 2/4。' },
      { id: 'P3-MATH-A07-Q03', prompt: '把 3 塊切餅拖入 5 等份的圓餅盤。完成後表示哪個分數？', total: 5, target: 3, answer: '3/5', choices: ['2/5', '3/5', '4/5', '5/3'], explanation: '5 等份中有 3 份彩色，是 3/5。' },
      { id: 'P3-MATH-A07-Q04', prompt: '把 1 塊切餅拖入 2 等份的圓餅盤。完成後表示哪個分數？', total: 2, target: 1, answer: '1/2', choices: ['1/2', '1/3', '2/2', '2/1'], explanation: '2 等份中有 1 份彩色，是一半。' },
      { id: 'P3-MATH-A07-Q05', prompt: '把 4 塊切餅拖入 6 等份的圓餅盤。完成後表示哪個分數？', total: 6, target: 4, answer: '4/6', choices: ['3/6', '4/6', '5/6', '6/4'], explanation: '6 等份中有 4 份彩色，是 4/6。' },
      { id: 'P3-MATH-A07-Q06', prompt: '把 5 塊切餅拖入 8 等份的圓餅盤。完成後表示哪個分數？', total: 8, target: 5, answer: '5/8', choices: ['4/8', '5/8', '6/8', '8/5'], explanation: '8 等份中有 5 份彩色，是 5/8。' },
      { id: 'P3-MATH-A07-Q07', prompt: '把 2 塊切餅拖入 7 等份的圓餅盤。完成後表示哪個分數？', total: 7, target: 2, answer: '2/7', choices: ['1/7', '2/7', '3/7', '7/2'], explanation: '7 等份中有 2 份彩色，是 2/7。' },
      { id: 'P3-MATH-A07-Q08', prompt: '把 7 塊切餅拖入 10 等份的圓餅盤。完成後表示哪個分數？', total: 10, target: 7, answer: '7/10', choices: ['5/10', '6/10', '7/10', '10/7'], explanation: '10 等份中有 7 份彩色，是 7/10。' },
      { id: 'P3-MATH-A07-Q09', prompt: '把 1 塊切餅拖入 6 等份的圓餅盤。完成後表示哪個分數？', total: 6, target: 1, answer: '1/6', choices: ['1/5', '1/6', '2/6', '6/1'], explanation: '6 等份中有 1 份彩色，是 1/6。' },
      { id: 'P3-MATH-A07-Q10', prompt: '把 3 塊切餅拖入 8 等份的圓餅盤。完成後表示哪個分數？', total: 8, target: 3, answer: '3/8', choices: ['2/8', '3/8', '4/8', '8/3'], explanation: '8 等份中有 3 份彩色，是 3/8。' },
    ] },
    { id: 'P3-MATH-A08', area: '數與代數', title: '分數比較操作', objective: '用點選或拖曳分數圓餅至比較框，判斷同分母分數的大小。', interaction: 'math-fraction-compare', questions: [
      { id: 'P3-MATH-A08-Q01', prompt: '在 2/5 和 3/5 中，哪一個較大？', left: { total: 5, filled: 2 }, right: { total: 5, filled: 3 }, answer: '3/5', choices: ['2/5', '3/5'], explanation: '分母相同時，彩色部分較多的 3/5 較大。' },
      { id: 'P3-MATH-A08-Q02', prompt: '在 1/4 和 3/4 中，哪一個較大？', left: { total: 4, filled: 1 }, right: { total: 4, filled: 3 }, answer: '3/4', choices: ['1/4', '3/4'], explanation: '4 等份中，3 份比 1 份多。' },
      { id: 'P3-MATH-A08-Q03', prompt: '在 5/8 和 3/8 中，哪一個較大？', left: { total: 8, filled: 5 }, right: { total: 8, filled: 3 }, answer: '5/8', choices: ['5/8', '3/8'], explanation: '8 等份中，5 份比 3 份多。' },
      { id: 'P3-MATH-A08-Q04', prompt: '在 2/6 和 4/6 中，哪一個較大？', left: { total: 6, filled: 2 }, right: { total: 6, filled: 4 }, answer: '4/6', choices: ['2/6', '4/6'], explanation: '6 等份中，4 份比 2 份多。' },
      { id: 'P3-MATH-A08-Q05', prompt: '在 1/10 和 7/10 中，哪一個較大？', left: { total: 10, filled: 1 }, right: { total: 10, filled: 7 }, answer: '7/10', choices: ['1/10', '7/10'], explanation: '10 等份中，7 份較多。' },
      { id: 'P3-MATH-A08-Q06', prompt: '在 2/7 和 6/7 中，哪一個較大？', left: { total: 7, filled: 2 }, right: { total: 7, filled: 6 }, answer: '6/7', choices: ['2/7', '6/7'], explanation: '7 等份中，6 份較多。' },
      { id: 'P3-MATH-A08-Q07', prompt: '在 3/9 和 8/9 中，哪一個較大？', left: { total: 9, filled: 3 }, right: { total: 9, filled: 8 }, answer: '8/9', choices: ['3/9', '8/9'], explanation: '9 等份中，8 份較多。' },
      { id: 'P3-MATH-A08-Q08', prompt: '在 4/5 和 2/5 中，哪一個較大？', left: { total: 5, filled: 4 }, right: { total: 5, filled: 2 }, answer: '4/5', choices: ['4/5', '2/5'], explanation: '5 等份中，4 份較多。' },
      { id: 'P3-MATH-A08-Q09', prompt: '在 1/3 和 2/3 中，哪一個較大？', left: { total: 3, filled: 1 }, right: { total: 3, filled: 2 }, answer: '2/3', choices: ['1/3', '2/3'], explanation: '3 等份中，2 份較多。' },
      { id: 'P3-MATH-A08-Q10', prompt: '在 5/6 和 4/6 中，哪一個較大？', left: { total: 6, filled: 5 }, right: { total: 6, filled: 4 }, answer: '5/6', choices: ['5/6', '4/6'], explanation: '6 等份中，5 份較多。' },
    ] },
  ],
};

export default p3MathBank;
