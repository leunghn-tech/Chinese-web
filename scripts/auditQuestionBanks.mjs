/* 題庫審核：偵測中英文題目的精確重覆、材料相似度與選項／答案完整性；報告存放於專案外。 */
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const grades = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
const normalise = (value = '') => String(value).toLowerCase().replace(/\s+/gu, '');
const gramsNormalise = (value = '') => normalise(value).replace(/[「」『』（）()【】\[\],，。！？!?：:；;、—\-]/gu, '');
const textFields = ['hint', 'prompt', 'sentence', 'context', 'text', 'source', 'instruction', 'target', 'title', 'translation', 'baseWord', 'pastWord', 'before', 'after', 'clueChinese', 'symbol', 'scene', 'document', 'profile', '__auditContext'];

function questionText(question) {
  const blocks = Array.isArray(question.blocks) ? question.blocks.map((block) => block.text).join('｜') : '';
  const paragraphs = Array.isArray(question.paragraphs) ? question.paragraphs.map((paragraph) => paragraph.text).join('｜') : '';
  return [...textFields.map((field) => question[field]), blocks, paragraphs].filter(Boolean).join('｜');
}

function collectQuestions(value, collected = new Map()) {
  if (!value || typeof value !== 'object') return collected;
  if (Array.isArray(value)) { value.forEach((item) => collectQuestions(item, collected)); return collected; }
  if (Array.isArray(value.stories)) {
    value.stories.forEach((story) => story.questions.forEach((question) => collected.set(question.id, { ...question, __auditContext: `${story.title}｜${story.text || story.intro || ''}` })));
    return collected;
  }
  if (value.id && (value.prompt || value.sentence || value.context || value.source || value.target || value.answer || value.baseWord || value.blocks || value.parts || value.matches || value.character)) collected.set(value.id, value);
  Object.entries(value).forEach(([key, child]) => { if (key !== 'choices') collectQuestions(child, collected); });
  return collected;
}

function ngrams(value, size = 3) {
  const normalized = gramsNormalise(value);
  const grams = new Set();
  for (let index = 0; index <= normalized.length - size; index += 1) grams.add(normalized.slice(index, index + size));
  return grams;
}

function similarity(left, right) {
  const leftGrams = ngrams(left);
  const rightGrams = ngrams(right);
  if (!leftGrams.size || !rightGrams.size) return 0;
  let shared = 0;
  leftGrams.forEach((gram) => { if (rightGrams.has(gram)) shared += 1; });
  return shared / (leftGrams.size + rightGrams.size - shared);
}

const banks = [];
for (const subject of ['chinese', 'english']) {
  for (const grade of grades) {
    const module = await import(`../client/src/data/questionBanks/${subject}/${grade.toLowerCase()}.${subject === 'chinese' ? 'js' : 'js'}`);
    banks.push({ subject: subject === 'chinese' ? '中文' : '英文', grade, bank: module.default });
  }
}

const allQuestions = [];
const audit = { generatedAt: new Date().toISOString(), summary: {}, exactDuplicates: [], highSimilarityPairs: [], repeatedPromptPatterns: [], dataIssues: [] };
for (const { subject, grade, bank } of banks) {
  const unitSummaries = [];
  for (const unit of bank.units) {
    const questions = [...collectQuestions(unit).values()];
    const prompts = new Map();
    for (const question of questions) {
      const record = { subject, grade, unitId: unit.id, unitTitle: unit.title, id: question.id, question, text: questionText(question) };
      allQuestions.push(record);
      const prompt = normalise(question.prompt);
      if (prompt) prompts.set(prompt, [...(prompts.get(prompt) || []), question.id]);
      if (Array.isArray(question.choices)) {
        if (new Set(question.choices.map(normalise)).size !== question.choices.length) audit.dataIssues.push({ type: 'duplicate-choice', id: question.id, unitId: unit.id });
        if (question.answer && !question.choices.includes(question.answer)) audit.dataIssues.push({ type: 'answer-not-in-choices', id: question.id, unitId: unit.id });
      }
      if (question.choices && question.choices.length === 4 && unit.interaction?.includes('choice') && (!question.answer || !question.explanation)) audit.dataIssues.push({ type: 'missing-answer-or-explanation', id: question.id, unitId: unit.id });
    }
    for (const [prompt, ids] of prompts) if (ids.length >= 3) audit.repeatedPromptPatterns.push({ subject, grade, unitId: unit.id, prompt, count: ids.length, ids });
    unitSummaries.push({ id: unit.id, title: unit.title, questions: questions.length });
  }
  audit.summary[`${grade}-${subject}`] = { units: unitSummaries.length, questions: unitSummaries.reduce((total, unit) => total + unit.questions, 0), unitSummaries };
}

const exactIndex = new Map();
for (const record of allQuestions) {
  const question = record.question;
  const fingerprint = normalise(questionText(question));
  if (fingerprint.length < 10) continue;
  exactIndex.set(fingerprint, [...(exactIndex.get(fingerprint) || []), record]);
}
for (const records of exactIndex.values()) if (records.length > 1) {
  const distinctUnits = new Set(records.map((record) => record.unitId));
  const distinctInteractions = new Set(records.map((record) => record.question.interaction || record.unitId.split('-')[2]));
  const group = records.map(({ subject, grade, unitId, id }) => ({ subject, grade, unitId, id }));
  if (distinctUnits.size === 1 || distinctInteractions.size === 1) audit.exactDuplicates.push(group);
  else audit.crossModeReinforcement = [...(audit.crossModeReinforcement || []), group];
}

for (let leftIndex = 0; leftIndex < allQuestions.length; leftIndex += 1) {
  for (let rightIndex = leftIndex + 1; rightIndex < allQuestions.length; rightIndex += 1) {
    const left = allQuestions[leftIndex];
    const right = allQuestions[rightIndex];
    if (!left.text || !right.text || left.text.length < 14 || right.text.length < 14) continue;
    const score = similarity(left.text, right.text);
    if (score >= 0.72) audit.highSimilarityPairs.push({ score: Number(score.toFixed(2)), left: { subject: left.subject, grade: left.grade, unitId: left.unitId, id: left.id }, right: { subject: right.subject, grade: right.grade, unitId: right.unitId, id: right.id } });
  }
}
audit.highSimilarityPairs.sort((left, right) => right.score - left.score);

await mkdir('/home/ubuntu/question-bank-audit', { recursive: true });
const outputPath = resolve('/home/ubuntu/question-bank-audit/question-bank-audit.json');
await writeFile(outputPath, `${JSON.stringify(audit, null, 2)}\n`);
console.log(JSON.stringify({ outputPath, questionsReviewed: allQuestions.length, exactDuplicateGroups: audit.exactDuplicates.length, highSimilarityPairs: audit.highSimilarityPairs.length, dataIssues: audit.dataIssues.length }, null, 2));
