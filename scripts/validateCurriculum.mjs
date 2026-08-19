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
const p1StoryUnit = p1Bank.units.find((unit) => unit.id === 'P1-CN-R04');
const p1SentenceUnit = p1Bank.units.find((unit) => unit.id === 'P1-CN-W01');
if (!p1WordUnit) errors.push('缺少 P1「認讀基礎字詞」題庫單元。');
else {
  if (p1WordUnit.interaction !== 'word-match') errors.push('P1 認讀基礎字詞必須使用 word-match 互動。');
  if (p1WordUnit.questions.length < 10) errors.push('P1 認讀基礎字詞至少需要 10 組配對題。');
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
  if (p1RadicalUnit.questions.length < 10) errors.push('P1 常用部首認識至少需要 10 題。');
  for (const question of p1RadicalUnit.questions) {
    if (!question.prompt || !question.explanation || !question.character || !question.radical || !question.radicalName) errors.push(`${question.id} 缺少部首題必要資料。`);
    if (!Array.isArray(question.choices) || question.choices.length !== 4) errors.push(`${question.id} 必須有四個候選部首。`);
    if (!question.choices?.includes(question.radical)) errors.push(`${question.id} 的正確部首必須包含在候選中。`);
    if (new Set(question.choices || []).size !== question.choices?.length) errors.push(`${question.id} 的候選部首不可重複。`);
  }
}

const p1PunctuationUnit = p1Bank.units.find((unit) => unit.id === 'P1-CN-R03');
if (!p1PunctuationUnit) errors.push('缺少 P1「基本標點符號」題庫單元。');
else {
  if (p1PunctuationUnit.interaction !== 'punctuation-drop') errors.push('P1 基本標點符號必須使用 punctuation-drop 互動。');
  if (p1PunctuationUnit.questions.length < 10) errors.push('P1 基本標點符號至少需要 10 題。');
  for (const question of p1PunctuationUnit.questions) {
    if (!question.prompt || !question.before || !question.answer || !question.explanation) errors.push(`${question.id} 缺少標點題必要資料。`);
    if (!Array.isArray(question.choices) || question.choices.length !== 3) errors.push(`${question.id} 必須有三個候選標點。`);
    if (!question.choices?.includes(question.answer)) errors.push(`${question.id} 的正確標點必須包含在候選中。`);
  }
}

if (!p1StoryUnit) errors.push('缺少 P1「短文起、承、轉、合」題庫單元。');
else {
  if (p1StoryUnit.interaction !== 'story-structure') errors.push('P1 短文起、承、轉、合必須使用 story-structure 互動。');
  if (!Array.isArray(p1StoryUnit.stories) || p1StoryUnit.stories.length < 3) errors.push('P1 短文起、承、轉、合至少需要三篇短文。');
  if (p1StoryUnit.questions.length < 12) errors.push('P1 短文起、承、轉、合至少需要十二條問題。');
  const storyQuestionIds = [];
  for (const [index, story] of (p1StoryUnit.stories || []).entries()) {
    if (!story.id || !story.title || !Array.isArray(story.paragraphs) || story.paragraphs.length !== 4) errors.push('每篇 P1 短文必須有名稱及四段內容。');
    if (!Array.isArray(story.questions) || story.questions.length < 4) errors.push(`短文「${story.title || '未命名'}」至少需要四條問題。`);
    if (story.questions?.length !== 4) errors.push(`短文「${story.title || '未命名'}」必須剛好有四條問題。`);
    const paragraphIds = story.paragraphs?.map((paragraph) => paragraph.id) || [];
    for (const paragraph of story.paragraphs || []) if (!paragraph.id || !paragraph.text) errors.push('P1 短文段落缺少編號或文字。');
    for (const question of story.questions || []) {
      storyQuestionIds.push(question.id);
      if (!question.prompt || !question.stage || !question.answer || !question.explanation) errors.push(`${question.id} 缺少短文題必要資料。`);
      if (!paragraphIds.includes(question.answer)) errors.push(`${question.id} 的答案必須對應所屬短文中的段落。`);
    }
  }
  if (new Set(storyQuestionIds).size !== storyQuestionIds.length) errors.push('短文閱讀問題不可重複。');
  if (p1StoryUnit.questions.length !== storyQuestionIds.length) errors.push('短文單元的總題數必須等於各篇短文問題數之和。');
}

if (!p1SentenceUnit) errors.push('缺少 P1「句子擴寫」題庫單元。');
else {
  if (p1SentenceUnit.interaction !== 'sentence-expand') errors.push('P1 句子擴寫必須使用 sentence-expand 互動。');
  if (p1SentenceUnit.questions.length < 10) errors.push('P1 句子擴寫至少需要十題。');
  for (const question of p1SentenceUnit.questions) {
    const parts = question.parts || {};
    for (const key of ['time', 'person', 'place', 'action']) {
      const part = parts[key];
      if (!part?.label || !part.answer || !Array.isArray(part.choices) || part.choices.length !== 3) errors.push(`${question.id} 的「${key}」資料不完整。`);
      if (part && !part.choices.includes(part.answer)) errors.push(`${question.id} 的「${key}」正確答案必須包含在候選中。`);
    }
    if (!question.prompt || !question.explanation) errors.push(`${question.id} 缺少句子擴寫題幹或解析。`);
  }
}

if (errors.length) {
  console.error(JSON.stringify({ status: 'invalid', errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ status: 'valid', mode: database.mode, topics: database.topics.length, grades, subjects, questionsPerTopic: 1, p1WordMatchQuestions: p1WordUnit.questions.length, p1RadicalQuestions: p1RadicalUnit.questions.length, p1PunctuationQuestions: p1PunctuationUnit.questions.length, p1StoryStructureQuestions: p1StoryUnit.questions.length, p1SentenceExpandQuestions: p1SentenceUnit.questions.length }, null, 2));
