import { mkdir, writeFile } from 'node:fs/promises';

const grades = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
const choice = (prompt, options, answerIndex, explanation) => ({ type: 'choice', prompt, options, answerIndex, explanation });
const puzzle = (prompt, tokens, correctOrder, explanation) => ({ type: 'puzzle', prompt, tokens, correctOrder, explanation });
const text = (prompt, answer, hint, explanation) => ({ type: 'text', prompt, answer, hint, explanation });

const topics = {
  中文: [
    { key: 'classifier', title: '量詞衝刺', engine: 'race', icon: 'Layers', questions: () => [choice('「一＿＿雨傘」最合適的量詞是？', ['把', '張', '枝', '頂'], 3, '「頂」用於雨傘、帽子等有頂部覆蓋的物品。'), choice('「一＿＿書」最合適的量詞是？', ['本', '條', '匹', '座'], 0, '「本」用於書籍、簿冊。'), choice('「一＿＿魚」最合適的量詞是？', ['條', '件', '艘', '棵'], 0, '「條」可用於魚、褲、河流等細長事物。')] },
    { key: 'idiom', title: '成語快答', engine: 'race', icon: 'Sparkles', questions: () => [choice('「專心＿＿」形容精神集中，應填哪一項？', ['一致', '一意', '一心', '一眼'], 2, '「專心一意」指集中精神，專一不分心。'), choice('「守株待兔」比喻甚麼？', ['努力耕作', '死守狹隘經驗', '樂於助人', '勇敢冒險'], 1, '守株待兔諷刺不主動努力，只希望僥倖成功。'), choice('「畫蛇添足」最貼近哪個意思？', ['多做無益的事', '仔細觀察', '以少勝多', '互相合作'], 0, '畫蛇添足指做了多餘的事，反而弄巧成拙。')] },
    { key: 'reorder', title: '句式拼圖', engine: 'puzzle', icon: 'Puzzle', questions: () => [puzzle('把詞語排成正確句子。', ['今天', '圖書館', '我', '去'], ['我', '今天', '去', '圖書館'], '主語「我」在前，時間「今天」後接動詞「去」和地點「圖書館」。'), puzzle('把詞語排成正確句子。', ['很', '同學們', '認真', '溫習'], ['同學們', '很', '認真', '溫習'], '先寫主語「同學們」，再以副詞和形容詞修飾動作。')] },
    { key: 'classical', title: '文言勇者', engine: 'rpg', icon: 'ScrollText', questions: () => [choice('「學而時習之」中「習」的意思是？', ['睡覺', '溫習、練習', '旅行', '習慣'], 1, '「習」在這裡指溫習和練習。'), choice('「己所不欲，勿施於人」的意思最接近哪一項？', ['只顧自己', '不要把自己不喜歡的事強加於別人', '做事要快', '一定要聽從別人'], 1, '這句強調推己及人和尊重別人。'), choice('「溫故而知新」的「故」指甚麼？', ['故事', '舊有知識', '已故的人', '故鄉'], 1, '「故」指已學過的、舊有的知識。')] },
    { key: 'languageVault', title: '語文密碼鎖', engine: 'chest', icon: 'KeyRound', questions: () => [text('輸入「亡羊補牢」的下一句常用意思：比喻事情出了差錯以後，＿＿還不算晚。', '設法補救', '提示：四個字，從「設」開始。', '「亡羊補牢」比喻事情出了差錯以後，設法補救還不算晚。'), text('輸入「學而不思則罔，思而不學則＿＿。」的最後一字。', '殆', '提示：讀音是 dai。', '這句說明學習與思考要互相配合。')] },
  ],
  英文: [
    { key: 'wordDash', title: 'Word Dash', engine: 'race', icon: 'Languages', questions: () => [choice('Which word means 「快樂」?', ['happy', 'hungry', 'heavy', 'honest'], 0, 'happy means 快樂。'), choice('Choose the opposite of "big".', ['tall', 'small', 'wide', 'long'], 1, 'small 是 big 的相反詞。'), choice('Which word is a colour?', ['blue', 'book', 'bird', 'ball'], 0, 'blue 是顏色。')] },
    { key: 'spelling', title: 'Spelling Scramble', engine: 'puzzle', icon: 'SpellCheck', questions: () => [puzzle('Arrange the letters to spell a fruit.', ['p', 'a', 'l', 'p', 'e'], ['a', 'p', 'p', 'l', 'e'], 'apple 是「蘋果」。'), puzzle('Arrange the letters to spell an animal.', ['c', 't', 'a'], ['c', 'a', 't'], 'cat 是「貓」。')] },
    { key: 'sentence', title: 'Sentence Builder', engine: 'puzzle', icon: 'TextCursorInput', questions: () => [puzzle('Build a correct English sentence.', ['to', 'school', 'walk', 'I'], ['I', 'walk', 'to', 'school'], '英文基本語序是主語 + 動詞 + 其他成分。'), puzzle('Build a correct English sentence.', ['is', 'She', 'kind'], ['She', 'is', 'kind'], 'be 動詞要放在主語 She 後面。')] },
    { key: 'tense', title: 'Tense Master', engine: 'rpg', icon: 'Swords', questions: () => [choice('She ______ to school every day.', ['walk', 'walks', 'walking', 'walked'], 1, 'She 是第三人稱單數，現在式動詞加 s。'), choice('They ______ football yesterday.', ['play', 'plays', 'played', 'playing'], 2, 'yesterday 提示用過去式 played。'), choice('I ______ a student.', ['am', 'is', 'are', 'be'], 0, 'I 配 am。')] },
    { key: 'grammarVault', title: 'Grammar Vault', engine: 'chest', icon: 'LockKeyhole', questions: () => [text('Complete: "I ___ a student."', 'am', '提示：I 的 be 動詞。', '主語 I 要配 am。'), text('Complete: "She ___ my friend."', 'is', '提示：She 的 be 動詞。', '第三人稱單數 She 要配 is。')] },
  ],
  數學: [
    { key: 'calc', title: 'Calculation Dash', engine: 'race', icon: 'Gauge', questions: (level) => { const a = level + 3; const b = level + 5; return [choice(`${a} + ${b} = ?`, [String(a + b - 1), String(a + b), String(a + b + 1), String(a + b + 2)], 1, `${a} 加 ${b} 等於 ${a + b}。`), choice(`${a * 2} − ${b} = ?`, [String(a - b), String(a), String(a * 2 - b), String(a * 2 + b)], 2, `${a * 2} 減 ${b} 等於 ${a * 2 - b}。`), choice(`${a} × 2 = ?`, [String(a * 2), String(a + 2), String(a * 3), String(a - 2)], 0, `${a} 乘 2 等於 ${a * 2}。`)]; } },
    { key: 'numberOrder', title: 'Number Puzzle', engine: 'puzzle', icon: 'ArrowDownUp', questions: () => [puzzle('由小至大排列數字。', ['12', '7', '9'], ['7', '9', '12'], '先比較十位數；7 和 9 都小於 12。'), puzzle('由大至小排列數字。', ['15', '20', '18'], ['20', '18', '15'], '比較十位數可知 20 最大，15 最小。')] },
    { key: 'fractionBoss', title: 'Fraction Boss', engine: 'rpg', icon: 'Shield', questions: () => [choice('1/2 + 1/4 = ?', ['2/6', '3/4', '1/6', '2/4'], 1, '把 1/2 化成 2/4，2/4 + 1/4 = 3/4。'), choice('哪個分數等於 1/2？', ['2/3', '2/4', '3/4', '1/3'], 1, '2/4 同時除以 2 得 1/2。'), choice('3/5 的分子是？', ['3', '5', '8', '15'], 0, '分子是分數線上面的數字。')] },
    { key: 'equationVault', title: 'Equation Vault', engine: 'chest', icon: 'Vault', questions: (level) => { const a = level + 4; const b = level + 7; return [text(`解密：x + ${a} = ${a + b}，輸入 x。`, String(b), `提示：用 ${a + b} 減 ${a}。`, `x = ${a + b} − ${a} = ${b}。`), text(`解密：2x = ${b * 2}，輸入 x。`, String(b), `提示：兩邊同除以 2。`, `x = ${b * 2} ÷ 2 = ${b}。`)]; } },
    { key: 'geometryLock', title: 'Geometry Lock', engine: 'chest', icon: 'Triangle', questions: () => [text('三角形三個內角和是多少度？', '180', '提示：輸入數字。', '任何三角形的內角和都是 180 度。'), text('正方形有多少條相等的邊？', '4', '提示：輸入數字。', '正方形有四條相等的邊。')] },
  ],
};

const curriculum = [];
grades.forEach((grade, gradeIndex) => {
  Object.entries(topics).forEach(([subject, subjectTopics]) => {
    subjectTopics.forEach((topic, topicIndex) => {
      curriculum.push({
        id: `${grade}-${subject}-${topic.key}`,
        grade,
        subject,
        title: topic.title,
        description: `${grade} ${subject}・${topic.title}挑戰`,
        engine: topic.engine,
        icon: topic.icon,
        difficulty: gradeIndex < 4 ? '新手' : gradeIndex < 8 ? '進階' : '高手',
        skill: topic.key,
        questions: topic.questions(gradeIndex, topicIndex),
      });
    });
  });
});

const database = {
  meta: { title: 'EduQuest 邊學邊玩', topicCount: curriculum.length, subjects: ['中文', '英文', '數學'], grades },
  topics: curriculum,
};

await mkdir(new URL('../client/src/data/', import.meta.url), { recursive: true });
await writeFile(new URL('../client/src/data/curriculumDB.json', import.meta.url), `${JSON.stringify(database, null, 2)}\n`, 'utf8');
console.log(`Generated ${curriculum.length} playable topics.`);
