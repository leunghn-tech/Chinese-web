/* P1 數與代數：數線、十格框、單雙數及香港硬幣，以具象操作建立 100 以內數感。 */
const numericChoices = (answer) => {
  const offsets = answer > 2 ? [0, 1, -1, 2] : [0, 1, 2, 3];
  return offsets.map((offset) => answer + offset);
};
const makeLine = (unitId, rows) => rows.map(([prompt, answer, start, end, step, explanation], index) => ({ id: `${unitId}-Q${String(index + 1).padStart(2, '0')}`, prompt, answer, line: { start, end, step }, explanation }));
const makeFrame = (unitId, rows) => rows.map(([prompt, answer, initial, removed, explanation], index) => ({ id: `${unitId}-Q${String(index + 1).padStart(2, '0')}`, prompt, answer, frame: { initial, removed }, choices: numericChoices(answer), explanation }));
const makeChoice = (unitId, rows) => rows.map(([prompt, answer, choices, explanation], index) => ({ id: `${unitId}-Q${String(index + 1).padStart(2, '0')}`, prompt, answer, choices, explanation }));
const withCoinVisuals = (questions, combinations) => questions.map((question, index) => ({ ...question, visual: { type: 'coins', coins: combinations[index] } }));
const withShoppingPrompts = (questions) => questions.map((question) => {
  const items = question.items || [{ item: question.item, price: question.price }];
  const names = items.map(({ item }) => item).join('、');
  return { ...question, prompt: `購物籃限額是 $${question.limit}。請把${names}加入購物籃，計算合計後可找回多少元？` };
});

const p1MathBank = {
  grade: 'P1', subject: '數學',
  units: [
    { id: 'P1-MATH-A01', area: '數與代數', title: '數線小偵察', objective: '在 100 以內的數線上認讀、比較及找出指定數字。', interaction: 'math-number-line', questions: makeLine('P1-MATH-A01', [
      ['請在數線上點選 4。', 4, 0, 10, 1, '4 在 0 後的第四格。'], ['請在數線上點選 7。', 7, 0, 10, 1, '由 0 向右數七格就是 7。'], ['請在數線上點選 10。', 10, 0, 10, 1, '10 是這條數線最右邊的數。'], ['請在數線上點選 12。', 12, 10, 20, 1, '12 比 10 多 2。'], ['請在數線上點選 15。', 15, 10, 20, 1, '15 在 10 和 20 的中間。'], ['請在數線上點選 20。', 20, 10, 20, 1, '20 是這條數線最右邊的數。'], ['請在數線上點選 25。', 25, 20, 30, 1, '25 在 20 和 30 的中間。'], ['請在數線上點選 40。', 40, 0, 50, 10, '每一大格是 10；第四個刻度是 40。'], ['請在數線上點選 70。', 70, 50, 100, 10, '50 後第二個十是 70。'], ['請在數線上點選 95。', 95, 90, 100, 1, '95 比 100 少 5。'],
    ]) },
    { id: 'P1-MATH-A02', area: '數與代數', title: '十格框湊十', objective: '以十格框理解數的組合，找出湊成 10 所需的數量。', interaction: 'math-ten-frame', questions: makeFrame('P1-MATH-A02', [
      ['十格框已有 1 個點。還要幾個點才是 10？', 9, 1, 0, '10 − 1 = 9。'], ['十格框已有 2 個點。還要幾個點才是 10？', 8, 2, 0, '10 − 2 = 8。'], ['十格框已有 3 個點。還要幾個點才是 10？', 7, 3, 0, '10 − 3 = 7。'], ['十格框已有 4 個點。還要幾個點才是 10？', 6, 4, 0, '10 − 4 = 6。'], ['十格框已有 5 個點。還要幾個點才是 10？', 5, 5, 0, '5 和 5 合起來是 10。'], ['十格框已有 6 個點。還要幾個點才是 10？', 4, 6, 0, '10 − 6 = 4。'], ['十格框已有 7 個點。還要幾個點才是 10？', 3, 7, 0, '10 − 7 = 3。'], ['十格框已有 8 個點。還要幾個點才是 10？', 2, 8, 0, '10 − 8 = 2。'], ['十格框已有 9 個點。還要幾個點才是 10？', 1, 9, 0, '10 − 9 = 1。'], ['十格框已有 0 個點。還要幾個點才是 10？', 10, 0, 0, '空的十格框需要 10 個點。'],
    ]) },
    { id: 'P1-MATH-A03', area: '數與代數', title: '十格框減法', objective: '在十格框中看出劃走後的數量，完成 10 以內減法。', interaction: 'math-ten-frame', questions: makeFrame('P1-MATH-A03', [
      ['十格框有 9 個點，劃走 2 個，還有多少個？', 7, 9, 2, '9 − 2 = 7。'], ['十格框有 8 個點，劃走 3 個，還有多少個？', 5, 8, 3, '8 − 3 = 5。'], ['十格框有 7 個點，劃走 1 個，還有多少個？', 6, 7, 1, '7 − 1 = 6。'], ['十格框有 10 個點，劃走 4 個，還有多少個？', 6, 10, 4, '10 − 4 = 6。'], ['十格框有 6 個點，劃走 2 個，還有多少個？', 4, 6, 2, '6 − 2 = 4。'], ['十格框有 5 個點，劃走 5 個，還有多少個？', 0, 5, 5, '5 − 5 = 0。'], ['十格框有 9 個點，劃走 5 個，還有多少個？', 4, 9, 5, '9 − 5 = 4。'], ['十格框有 8 個點，劃走 6 個，還有多少個？', 2, 8, 6, '8 − 6 = 2。'], ['十格框有 4 個點，劃走 1 個，還有多少個？', 3, 4, 1, '4 − 1 = 3。'], ['十格框有 7 個點，劃走 4 個，還有多少個？', 3, 7, 4, '7 − 4 = 3。'],
    ]) },
    { id: 'P1-MATH-A04', area: '數與代數', title: '單數還是雙數？', objective: '以兩個兩個配對的概念辨認 20 以內單數和雙數。', interaction: 'math-choice', questions: makeChoice('P1-MATH-A04', [
      ['哪一個是雙數？', 4, [4, 3, 5, 7], '4 可以兩個兩個配對，沒有剩下。'], ['哪一個是單數？', 9, [8, 9, 10, 12], '9 兩個兩個配對後會剩下 1 個。'], ['哪一個是雙數？', 16, [15, 16, 17, 19], '16 可平均分成兩組，每組 8 個。'], ['哪一個是單數？', 13, [12, 14, 13, 18], '13 配對後會有 1 個剩下。'], ['哪一個是雙數？', 20, [19, 17, 20, 15], '20 可以完整地兩個兩個配對。'], ['哪一個是單數？', 1, [2, 4, 1, 6], '1 不能配成一對，所以是單數。'], ['哪一個是雙數？', 10, [9, 10, 11, 13], '10 是 5 對。'], ['哪一個是單數？', 7, [6, 8, 7, 14], '7 兩個兩個數會剩下 1。'], ['哪一個是雙數？', 18, [17, 18, 19, 15], '18 可以分成 9 對。'], ['哪一個是單數？', 11, [10, 12, 14, 11], '11 配對後有 1 個剩下。'],
    ]) },
    { id: 'P1-MATH-A05', area: '數與代數', title: '香港硬幣小幫手', objective: '認識 1、2、5、10 元硬幣，計算簡單硬幣組合。', interaction: 'math-choice', questions: withCoinVisuals(makeChoice('P1-MATH-A05', [
      ['1 枚 $5 硬幣和 2 枚 $1 硬幣，共有多少元？', 7, [7, 6, 8, 5], '$5 + $1 + $1 = $7。'], ['2 枚 $2 硬幣，共有多少元？', 4, [2, 3, 4, 5], '$2 + $2 = $4。'], ['1 枚 $10 硬幣和 1 枚 $5 硬幣，共有多少元？', 15, [10, 12, 15, 16], '$10 + $5 = $15。'], ['3 枚 $1 硬幣和 1 枚 $2 硬幣，共有多少元？', 5, [4, 5, 6, 7], '$1 + $1 + $1 + $2 = $5。'], ['2 枚 $5 硬幣，共有多少元？', 10, [5, 8, 10, 12], '$5 + $5 = $10。'], ['1 枚 $10 硬幣、1 枚 $2 硬幣和 1 枚 $1 硬幣，共有多少元？', 13, [11, 12, 13, 14], '$10 + $2 + $1 = $13。'], ['4 枚 $1 硬幣，共有多少元？', 4, [1, 3, 4, 5], '$1 + $1 + $1 + $1 = $4。'], ['1 枚 $5 硬幣、1 枚 $2 硬幣和 2 枚 $1 硬幣，共有多少元？', 9, [8, 9, 10, 11], '$5 + $2 + $1 + $1 = $9。'], ['哪一組硬幣剛好是 $10？', '$5 + $5', ['$5 + $5', '$5 + $2', '$2 + $2 + $2', '$1 + $1 + $1 + $1'], '$5 + $5 剛好是 $10。'], ['哪一組硬幣剛好是 $6？', '$5 + $1', ['$2 + $2', '$5 + $1', '$1 + $1 + $1 + $1', '$5 + $2'], '$5 加 $1 是 $6。'],
    ]), [[5, 1, 1], [2, 2], [10, 5], [1, 1, 1, 2], [5, 5], [10, 2, 1], [1, 1, 1, 1], [5, 2, 1, 1], [5, 5], [5, 1]]) },
    { id: 'P1-MATH-A06', area: '數與代數', title: '港幣找續購物籃', objective: '把多件物品加入購物籃，在限額內計算總價及找續。', interaction: 'math-shopping', questions: withShoppingPrompts([
      { id: 'P1-MATH-A06-Q01', limit: 10, items: [{ item: '鉛筆', icon: '✏️', price: 3 }, { item: '橡皮擦', icon: '◼', price: 4 }], paidCoins: [10], answer: 3, choices: [1, 2, 3, 4], explanation: '$3 + $4 = $7；$10 − $7 = $3。' },
      { id: 'P1-MATH-A06-Q02', limit: 20, items: [{ item: '尺', icon: '━', price: 5 }, { item: '小筆記簿', icon: '▤', price: 8 }], paidCoins: [10, 10], answer: 7, choices: [5, 6, 7, 8], explanation: '$5 + $8 = $13；$20 − $13 = $7。' },
      { id: 'P1-MATH-A06-Q03', limit: 15, items: [{ item: '貼紙包', icon: '★', price: 6 }, { item: '鉛筆', icon: '✏️', price: 3 }, { item: '橡皮擦', icon: '◼', price: 4 }], paidCoins: [10, 5], answer: 2, choices: [1, 2, 3, 4], explanation: '$6 + $3 + $4 = $13；$15 − $13 = $2。' },
      { id: 'P1-MATH-A06-Q04', limit: 20, items: [{ item: '故事書', icon: '▰', price: 10 }, { item: '尺', icon: '━', price: 6 }], paidCoins: [10, 10], answer: 4, choices: [2, 3, 4, 5], explanation: '$10 + $6 = $16；$20 − $16 = $4。' },
      { id: 'P1-MATH-A06-Q05', limit: 20, items: [{ item: '水樽', icon: '♢', price: 12 }, { item: '鉛筆', icon: '✏️', price: 3 }, { item: '橡皮擦', icon: '◼', price: 4 }], paidCoins: [10, 10], answer: 1, choices: [1, 2, 3, 5], explanation: '$12 + $3 + $4 = $19；$20 − $19 = $1。' },
      { id: 'P1-MATH-A06-Q06', limit: 25, items: [{ item: '小筆記簿', icon: '▤', price: 8 }, { item: '顏色筆', icon: '✦', price: 9 }, { item: '橡皮擦', icon: '◼', price: 2 }], paidCoins: [10, 10, 5], answer: 6, choices: [4, 5, 6, 7], explanation: '$8 + $9 + $2 = $19；$25 − $19 = $6。' },
      { id: 'P1-MATH-A06-Q07', limit: 30, items: [{ item: '美術材料包', icon: '✿', price: 17 }, { item: '尺', icon: '━', price: 5 }, { item: '貼紙包', icon: '★', price: 2 }], paidCoins: [10, 10, 10], answer: 6, choices: [4, 5, 6, 7], explanation: '$17 + $5 + $2 = $24；$30 − $24 = $6。' },
      { id: 'P1-MATH-A06-Q08', limit: 20, items: [{ item: '文件夾', icon: '▣', price: 11 }, { item: '鉛筆', icon: '✏️', price: 3 }, { item: '橡皮擦', icon: '◼', price: 4 }], paidCoins: [10, 10], answer: 2, choices: [1, 2, 3, 4], explanation: '$11 + $3 + $4 = $18；$20 − $18 = $2。' },
      { id: 'P1-MATH-A06-Q09', limit: 25, items: [{ item: '故事書', icon: '▰', price: 14 }, { item: '水樽', icon: '♢', price: 8 }], paidCoins: [10, 10, 5], answer: 3, choices: [1, 2, 3, 4], explanation: '$14 + $8 = $22；$25 − $22 = $3。' },
      { id: 'P1-MATH-A06-Q10', limit: 30, items: [{ item: '顏色筆', icon: '✦', price: 9 }, { item: '小筆記簿', icon: '▤', price: 8 }, { item: '故事書', icon: '▰', price: 10 }], paidCoins: [10, 10, 10], answer: 3, choices: [1, 2, 3, 5], explanation: '$9 + $8 + $10 = $27；$30 − $27 = $3。' },
    ]) },
  ],
};

export default p1MathBank;
