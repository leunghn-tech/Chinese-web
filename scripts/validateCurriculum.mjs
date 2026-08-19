import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const databasePath = path.join(here, '../client/src/data/curriculumDB.json');
const database = JSON.parse(fs.readFileSync(databasePath, 'utf8'));
const p1Bank = (await import('../client/src/data/questionBanks/chinese/p1.js')).default;
const grades = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
const subjects = ['中文', '英文', '數學'];
const expected = grades.flatMap((grade) => subjects.map((subject) => `${grade}-${subject === '英文' ? 'English' : subject}`));
const ids = database.topics.map((topic) => topic.id);
const errors = [];

if (database.mode !== 'demo-only') errors.push('資料庫必須標示為 demo-only。');
if (database.topics.length !== 18) errors.push(`應有 18 個示範單元，實際為 ${database.topics.length}。`);
for (const id of expected) if (!ids.includes(id)) errors.push(`缺少示範單元：${id}`);
for (const topic of database.topics) {
  if (topic.options?.length !== 4) errors.push(`${topic.id} 必須有四個選項。`);
  if (!Number.isInteger(topic.answerIndex) || topic.answerIndex < 0 || topic.answerIndex > 3) errors.push(`${topic.id} 的答案索引無效。`);
  if (!topic.prompt || !topic.explanation) errors.push(`${topic.id} 缺少題幹或解析。`);
}

const p1WordUnit = p1Bank.units.find((unit) => unit.id === 'P1-CN-R01');
const p1RadicalUnit = p1Bank.units.find((unit) => unit.id === 'P1-CN-R02');
if (!p1WordUnit) errors.push('缺少 P1「認讀基礎字詞」題庫單元。');
else {
  if (p1WordUnit.interaction !== 'word-match') errors.push('P1 認讀基礎字詞必須使用 word-match 互動。');
  if (p1WordUnit.questions.length < 5) errors.push('P1 認讀基礎字詞至少需要 5 組配對題。');
  for (const question of p1WordUnit.questions) {
    if (!question.prompt || !question.explanation) errors.push(`${question.id} 缺少題幹或解析。`);
    if (!Array.isArray(question.matches) || question.matches.length !== 3) errors.push(`${question.id} 必須包含 3 張字詞配對卡。`);
    const matchIds = question.matches?.map((item) => item.id) || [];
    const words = question.matches?.map((item) => item.word) || [];
    if (new Set(matchIds).size !== matchIds.length || new Set(words).size !== words.length) errors.push(`${question.id} 的配對卡不可重複。`);
    for (const item of question.matches || []) if (!item.symbol || !item.meaning) errors.push(`${question.id} 的配對卡缺少圖意或意思。`);
  }
}

if (!p1RadicalUnit) errors.push('缺少 P1「常用部首認識」題庫單元。');
else {
  if (p1RadicalUnit.interaction !== 'radical-sort') errors.push('P1 常用部首認識必須使用 radical-sort 互動。');
  if (p1RadicalUnit.questions.length < 6) errors.push('P1 常用部首認識至少需要 6 題。');
  for (const question of p1RadicalUnit.questions) {
    if (!question.prompt || !question.explanation || !question.character || !question.radical || !question.radicalName) errors.push(`${question.id} 缺少部首題必要資料。`);
    if (!Array.isArray(question.choices) || question.choices.length !== 4) errors.push(`${question.id} 必須有四個候選部首。`);
    if (!question.choices?.includes(question.radical)) errors.push(`${question.id} 的正確部首必須包含在候選中。`);
    if (new Set(question.choices || []).size !== question.choices?.length) errors.push(`${question.id} 的候選部首不可重複。`);
  }
}

if (errors.length) {
  console.error(JSON.stringify({ status: 'invalid', errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ status: 'valid', mode: database.mode, topics: database.topics.length, grades, subjects, questionsPerTopic: 1, p1WordMatchQuestions: p1WordUnit.questions.length, p1RadicalQuestions: p1RadicalUnit.questions.length }, null, 2));
