import database from '../client/src/data/curriculumDB.json' with { type: 'json' };

const expectedByEngine = { race: 'choice', puzzle: 'puzzle', rpg: 'choice', chest: 'text' };
const counts = {
  topics: database.topics.length,
  subjects: Object.fromEntries(database.meta.subjects.map((subject) => [subject, database.topics.filter((topic) => topic.subject === subject).length])),
  engines: Object.fromEntries(Object.keys(expectedByEngine).map((engine) => [engine, database.topics.filter((topic) => topic.engine === engine).length])),
  grades: Object.fromEntries(database.meta.grades.map((grade) => [grade, database.topics.filter((topic) => topic.grade === grade).length])),
};

const expectedQuestionCount = (topic) => topic.subject === '中文' && /^P[1-6]$/.test(topic.grade) ? 15 : 10;
const invalid = database.topics.filter((topic) => topic.questions.length !== expectedQuestionCount(topic) || topic.questions.some((question) => question.type !== expectedByEngine[topic.engine] || !question.explanation));
const uniqueIds = new Set(database.topics.map((topic) => topic.id));
const seniorMath = database.topics.filter((topic) => topic.subject === '數學' && /^S[1-6]$/.test(topic.grade));
const primaryChinese = database.topics.filter((topic) => topic.subject === '中文' && /^P[1-6]$/.test(topic.grade));
const primaryChineseReading = primaryChinese.filter((topic) => topic.id.endsWith('-3'));
const primaryChineseQuestionCountErrors = primaryChinese.filter((topic) => topic.questions.length !== 15);
const primaryChineseReadingErrors = primaryChineseReading.filter((topic) => topic.questions.length !== 15 || topic.questions.some((question) => !question.passageId || !question.passageText));
const bilingualGaps = seniorMath.filter((topic) => !topic.bilingual || !topic.titleEn || topic.questions.some((question) => !question.promptEn || !question.explanationEn));
const totalQuestions = database.topics.reduce((total, topic) => total + topic.questions.length, 0);
const malformedQuestions = database.topics.flatMap((topic) => topic.questions.map((question, index) => ({ topic: topic.id, index, question })).filter(({ question }) => (question.type === 'choice' && (!Array.isArray(question.options) || question.options.length !== 4 || new Set(question.options.map(String)).size !== 4 || question.answerIndex < 0 || question.answerIndex > 3)) || (question.type === 'puzzle' && (!question.tokens?.length || !question.correctOrder?.length)) || (question.type === 'text' && !String(question.answer).trim())));
const answerKey = (question) => question.type === 'choice' ? String(question.options[question.answerIndex]) : question.type === 'puzzle' ? question.correctOrder.join('|') : String(question.answer).trim();
const duplicateQuestionTopics = database.topics.filter((topic) => new Set(topic.questions.map((question) => question.prompt)).size !== expectedQuestionCount(topic));
const duplicateAnswerTopics = database.topics.filter((topic) => new Set(topic.questions.map(answerKey)).size !== expectedQuestionCount(topic));

if (counts.topics !== 180 || totalQuestions !== 1950 || invalid.length || bilingualGaps.length || malformedQuestions.length || duplicateQuestionTopics.length || duplicateAnswerTopics.length || primaryChinese.length !== 30 || primaryChineseReading.length !== 6 || primaryChineseQuestionCountErrors.length || primaryChineseReadingErrors.length || seniorMath.length !== 30 || uniqueIds.size !== counts.topics || Object.values(counts.subjects).some((count) => count !== 60) || Object.values(counts.grades).some((count) => count !== 15)) {
  console.error({ counts, totalQuestions, invalid: invalid.map((topic) => topic.id), bilingualGaps: bilingualGaps.map((topic) => topic.id), malformedQuestions: malformedQuestions.map(({ topic, index }) => `${topic}#${index + 1}`), duplicateQuestionTopics: duplicateQuestionTopics.map((topic) => topic.id), duplicateAnswerTopics: duplicateAnswerTopics.map((topic) => topic.id), primaryChineseQuestionCountErrors: primaryChineseQuestionCountErrors.map((topic) => topic.id), primaryChineseReadingErrors: primaryChineseReadingErrors.map((topic) => topic.id), uniqueIds: uniqueIds.size });
  process.exit(1);
}

console.log(JSON.stringify({ status: 'valid', ...counts, totalQuestions, primaryChineseTopics: primaryChinese.length, primaryChineseReadingTopics: primaryChineseReading.length, seniorMathBilingualTopics: seniorMath.length, uniqueIds: uniqueIds.size }, null, 2));
