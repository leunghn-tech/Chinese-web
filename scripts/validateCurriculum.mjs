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
const p2Bank = (await import('../client/src/data/questionBanks/chinese/p2.js')).default;
const p2ContextUnit = p2Bank.units.find((unit) => unit.id === 'P2-CN-R01');
const p2ConnectorUnit = p2Bank.units.find((unit) => unit.id === 'P2-CN-R02');
const p2TaleUnit = p2Bank.units.find((unit) => unit.id === 'P2-CN-R03');
const p2PortraitUnit = p2Bank.units.find((unit) => unit.id === 'P2-CN-W01');
const p2PracticalUnit = p2Bank.units.find((unit) => unit.id === 'P2-CN-W02');
const p2FormatUnit = p2Bank.units.find((unit) => unit.id === 'P2-CN-W03');
const p3Bank = (await import('../client/src/data/questionBanks/chinese/p3.js')).default;
const p3InfoUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-R01');
const p3IdiomUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-R02');
const p3ParagraphMarkUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-R03');
const p3MetaphorUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-R04');
const p3PersonificationUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-R05');
const p3ParallelismUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-R06');
const p3ParagraphStructureUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-W01');
const p3SensoryUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-W02');
const p3NarrativeUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-W03');
const p3GenreUnit = p3Bank.units.find((unit) => unit.id === 'P3-CN-R07');
const p4Bank = (await import('../client/src/data/questionBanks/chinese/p4.js')).default;
const p4RequiredUnits = [
  ['字詞辨析', 'P4-CN-R01'], ['段意歸納', 'P4-CN-R02'], ['重組句子', 'P4-CN-R03'], ['進階標點', 'P4-CN-R04'], ['句子改寫', 'P4-CN-R05'],
  ['順敘與倒敘', 'P4-CN-W01'], ['人物與步移描寫', 'P4-CN-W02'], ['說明方法', 'P4-CN-W03'], ['實用文格式', 'P4-CN-W04'],
];
const p5Bank = (await import('../client/src/data/questionBanks/chinese/p5.js')).default;
const p5RequiredUnits = [
  ['進階重組句子', 'P5-CN-R01'], ['修辭手法與作用', 'P5-CN-R02'], ['篇章理解與推論', 'P5-CN-R03'],
  ['記敘文應試', 'P5-CN-W01'], ['說明文應試', 'P5-CN-W02'], ['進階實用文', 'P5-CN-W03'], ['審題與文體', 'P5-CN-W04'],
];
const p6Bank = (await import('../client/src/data/questionBanks/chinese/p6.js')).default;
const p6RequiredUnits = [
  ['文言虛詞與句式', 'P6-CN-R01'], ['深層主旨', 'P6-CN-R02'], ['夾敘夾議', 'P6-CN-W01'], ['抒情描寫', 'P6-CN-W02'],
  ['全套實用文', 'P6-CN-W03'], ['高分字詞與修辭', 'P6-CN-W04'], ['模擬改錯', 'P6-CN-W05'],
];
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

if (!p2ContextUnit) errors.push('缺少 P2「利用上下文推測字詞意思」題庫單元。');
else {
  if (p2ContextUnit.interaction !== 'context-choice') errors.push('P2 上下文推測字詞意思必須使用 context-choice 互動。');
  if (p2ContextUnit.questions.length < 10) errors.push('P2 上下文推測字詞意思至少需要十題。');
  for (const question of p2ContextUnit.questions) if (!question.target || !question.context || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的上下文推測資料。`);
}

if (!p2ConnectorUnit) errors.push('缺少 P2「常見關聯詞」題庫單元。');
else {
  if (p2ConnectorUnit.interaction !== 'connector-cloze') errors.push('P2 常見關聯詞必須使用 connector-cloze 互動。');
  if (p2ConnectorUnit.questions.length < 10) errors.push('P2 常見關聯詞至少需要十題。');
  for (const question of p2ConnectorUnit.questions) if (!question.context || !question.sentence || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的關聯詞資料。`);
}

if (!p2TaleUnit) errors.push('缺少 P2「寓言故事與童話大意」題庫單元。');
else {
  if (p2TaleUnit.interaction !== 'tale-reading') errors.push('P2 寓言故事與童話大意必須使用 tale-reading 互動。');
  if (!Array.isArray(p2TaleUnit.stories) || p2TaleUnit.stories.length !== 3) errors.push('P2 寓言故事與童話必須包含三篇故事。');
  if (p2TaleUnit.questions.length !== 9) errors.push('P2 寓言故事與童話必須共九題。');
  for (const story of p2TaleUnit.stories || []) {
    if (!story.id || !story.title || !story.type || !story.text || !Array.isArray(story.questions) || story.questions.length !== 3) errors.push(`P2 故事「${story.title || '未命名'}」資料不完整或不是三題。`);
    for (const question of story.questions || []) if (!question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的故事閱讀資料。`);
  }
}

if (!p2PortraitUnit) errors.push('缺少 P2「基礎人物描寫：外貌特徵」題庫單元。');
else {
  if (p2PortraitUnit.interaction !== 'writing-choice' || p2PortraitUnit.writingType !== 'portrait') errors.push('P2 基礎人物描寫必須使用 portrait writing-choice 互動。');
  if (p2PortraitUnit.questions.length < 10) errors.push('P2 基礎人物描寫至少需要十題。');
  for (const question of p2PortraitUnit.questions) if (!question.profile || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的人物描寫資料。`);
}

if (!p2PracticalUnit) errors.push('缺少 P2「簡單日記與書信」題庫單元。');
else {
  if (p2PracticalUnit.interaction !== 'writing-choice' || p2PracticalUnit.writingType !== 'practical') errors.push('P2 簡單日記與書信必須使用 practical writing-choice 互動。');
  if (p2PracticalUnit.questions.length < 10) errors.push('P2 簡單日記與書信至少需要十題。');
  for (const question of p2PracticalUnit.questions) if (!question.document || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的日記或書信資料。`);
}

if (!p2FormatUnit) errors.push('缺少 P2「日記與書信格式排序」題庫單元。');
else {
  if (p2FormatUnit.interaction !== 'format-sort') errors.push('P2 日記與書信格式排序必須使用 format-sort 互動。');
  if (p2FormatUnit.questions.length < 10) errors.push('P2 日記與書信格式排序至少需要十組。');
  for (const question of p2FormatUnit.questions) {
    if (!question.title || !question.type || !question.explanation || !Array.isArray(question.blocks) || question.blocks.length < 3) errors.push(`${question.id} 缺少完整的格式排序資料。`);
    const orders = question.blocks?.map((block) => block.order) || [];
    if (new Set(orders).size !== orders.length || !orders.every((order, index) => order === index)) errors.push(`${question.id} 的格式卡次序必須由零開始且不可重複。`);
  }
}

if (!p3InfoUnit) errors.push('缺少 P3「短篇說明文閱讀理解」題庫單元。');
else {
  if (p3InfoUnit.interaction !== 'p3-reading') errors.push('P3 短篇說明文閱讀理解必須使用 p3-reading 互動。');
  if (p3InfoUnit.questions.length < 10) errors.push('P3 短篇說明文閱讀理解至少需要十題。');
  for (const question of p3InfoUnit.questions) if (!question.title || !question.text || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的說明文閱讀資料。`);
}

if (!p3IdiomUnit) errors.push('缺少 P3「基礎成語運用」題庫單元。');
else {
  if (p3IdiomUnit.interaction !== 'p3-idiom') errors.push('P3 基礎成語運用必須使用 p3-idiom 互動。');
  if (p3IdiomUnit.questions.length < 10) errors.push('P3 基礎成語運用至少需要十題。');
  for (const question of p3IdiomUnit.questions) if (!question.context || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的成語資料。`);
}

if (!p3ParagraphMarkUnit) errors.push('缺少 P3「說明文段落重點標記」題庫單元。');
else {
  if (p3ParagraphMarkUnit.interaction !== 'paragraph-mark') errors.push('P3 說明文段落重點標記必須使用 paragraph-mark 互動。');
  if (p3ParagraphMarkUnit.questions.length < 10) errors.push('P3 說明文段落重點標記至少需要十題。');
  for (const question of p3ParagraphMarkUnit.questions) if (!question.title || !question.prompt || !question.answer || !question.explanation || question.paragraphs?.length < 3 || !question.paragraphs.some((paragraph) => paragraph.id === question.answer)) errors.push(`${question.id} 缺少完整的段落標記資料。`);
}

for (const [name, unit] of [['比喻', p3MetaphorUnit], ['擬人', p3PersonificationUnit], ['排比', p3ParallelismUnit]]) {
  if (!unit) errors.push(`缺少 P3「${name}手法」題庫單元。`);
  else {
    if (unit.interaction !== 'p3-figure') errors.push(`P3 ${name}手法必須使用 p3-figure 互動。`);
    if (unit.questions.length < 10) errors.push(`P3 ${name}手法至少需要十題。`);
    for (const question of unit.questions) if (!question.hint || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的${name}資料。`);
  }
}

for (const [name, unit] of [['總—分—總段落結構', p3ParagraphStructureUnit], ['五感描寫', p3SensoryUnit], ['記敘文六要素', p3NarrativeUnit]]) {
  if (!unit) errors.push(`缺少 P3「${name}」題庫單元。`);
  else {
    if (unit.interaction !== 'p3-figure' || unit.area !== '寫作') errors.push(`P3 ${name}必須使用寫作互動。`);
    if (unit.questions.length < 10) errors.push(`P3 ${name}至少需要十題。`);
    for (const question of unit.questions) if (!question.hint || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的${name}資料。`);
  }
}

if (!p3GenreUnit) errors.push('缺少 P3「進階記敘、科普與抒情文」題庫單元。');
else {
  if (p3GenreUnit.interaction !== 'p3-figure') errors.push('P3 進階篇章閱讀必須使用閱讀工作紙互動。');
  if (p3GenreUnit.questions.length < 10) errors.push('P3 進階篇章閱讀至少需要十題。');
  for (const question of p3GenreUnit.questions) if (!question.hint || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer)) errors.push(`${question.id} 缺少完整的進階篇章閱讀資料。`);
}

for (const [name, id] of p4RequiredUnits) {
  const unit = p4Bank.units.find((item) => item.id === id);
  if (!unit) errors.push(`缺少 P4「${name}」題庫單元。`);
  else {
    if (unit.interaction !== 'p3-figure') errors.push(`P4 ${name}必須使用呈分試工作紙互動。`);
    if (unit.questions.length !== 10) errors.push(`P4 ${name}必須剛好有十題。`);
    for (const question of unit.questions) if (!question.hint || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer) || new Set(question.choices).size !== 4) errors.push(`${question.id} 缺少完整且唯一的小四呈分試資料。`);
  }
}

for (const [name, id] of p5RequiredUnits) {
  const unit = p5Bank.units.find((item) => item.id === id);
  if (!unit) errors.push(`缺少 P5「${name}」題庫單元。`);
  else {
    if (unit.interaction !== 'p3-figure') errors.push(`P5 ${name}必須使用呈分試工作紙互動。`);
    if (unit.questions.length !== 10) errors.push(`P5 ${name}必須剛好有十題。`);
    for (const question of unit.questions) if (!question.hint || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer) || new Set(question.choices).size !== 4) errors.push(`${question.id} 缺少完整且唯一的小五呈分試資料。`);
  }
}

for (const [name, id] of p6RequiredUnits) {
  const unit = p6Bank.units.find((item) => item.id === id);
  if (!unit) errors.push(`缺少 P6「${name}」題庫單元。`);
  else {
    if (unit.interaction !== 'p3-figure') errors.push(`P6 ${name}必須使用呈分試工作紙互動。`);
    if (unit.questions.length !== 10) errors.push(`P6 ${name}必須剛好有十題。`);
    const ids = unit.questions.map((question) => question.id);
    if (new Set(ids).size !== ids.length) errors.push(`P6 ${name}的問題編號不可重複。`);
    for (const question of unit.questions) if (!question.hint || !question.prompt || !question.answer || !question.explanation || question.choices?.length !== 4 || !question.choices.includes(question.answer) || new Set(question.choices).size !== 4) errors.push(`${question.id} 缺少完整且唯一的小六呈分試資料。`);
  }
}

if (errors.length) {
  console.error(JSON.stringify({ status: 'invalid', errors }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ status: 'valid', mode: database.mode, topics: database.topics.length, grades, subjects, questionsPerTopic: 1, p1WordMatchQuestions: p1WordUnit.questions.length, p1RadicalQuestions: p1RadicalUnit.questions.length, p1PunctuationQuestions: p1PunctuationUnit.questions.length, p1StoryStructureQuestions: p1StoryUnit.questions.length, p1SentenceExpandQuestions: p1SentenceUnit.questions.length, p2ContextQuestions: p2ContextUnit.questions.length, p2ConnectorQuestions: p2ConnectorUnit.questions.length, p2TaleQuestions: p2TaleUnit.questions.length, p2PortraitQuestions: p2PortraitUnit.questions.length, p2PracticalQuestions: p2PracticalUnit.questions.length, p2FormatQuestions: p2FormatUnit.questions.length, p3InfoQuestions: p3InfoUnit.questions.length, p3IdiomQuestions: p3IdiomUnit.questions.length, p3ParagraphMarkQuestions: p3ParagraphMarkUnit.questions.length, p3MetaphorQuestions: p3MetaphorUnit.questions.length, p3PersonificationQuestions: p3PersonificationUnit.questions.length, p3ParallelismQuestions: p3ParallelismUnit.questions.length, p6ExamUnits: p6Bank.units.length, p6ExamQuestions: p6Bank.units.reduce((total, unit) => total + unit.questions.length, 0) }, null, 2));
