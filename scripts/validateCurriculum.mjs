import database from '../client/src/data/curriculumDB.json' with { type: 'json' };

const expectedByEngine = { race: 'choice', puzzle: 'puzzle', rpg: 'choice', chest: 'text', composition: 'composition' };
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
const pictureWritingTopic = database.topics.find((topic) => topic.id === 'P1-中文-4');
const pictureWritingErrors = !pictureWritingTopic || pictureWritingTopic.engine !== 'composition' || pictureWritingTopic.questions.length !== 15 || pictureWritingTopic.questions.some((question) => question.type !== 'composition' || !question.scene?.title || !question.scene?.alt || !question.hintWords?.length || !question.sampleAnswer);
const primaryChineseTopicSpec = {
  P1:[['常用字與標點','race'],['完整句子表達','puzzle'],['兒歌與童話閱讀','rpg'],['看圖寫句','composition'],['節日與禮貌','race']],
  P2:[['故事順序與重點','race'],['四素句寫作','puzzle'],['寓言與因果','rpg'],['標點符號運用','chest'],['神話與傳說','race']],
  P3:[['記敍文主旨','race'],['段落結構與閱讀策略','puzzle'],['日記與書信','rpg'],['比喻與擬人','chest'],['成語與古詩','race']],
  P4:[['散文說明文與成語故事','race'],['中心思想與寫作目的','puzzle'],['人物景物描寫','rpg'],['排比反問與修改文章','chest'],['唐詩宋詞與傳統藝術','race']],
  P5:[['小說劇本與科普閱讀','race'],['篇章結構與過渡','puzzle'],['議論文論點論據','rpg'],['說明方法與修辭效果','chest'],['成語故事與古典小說','race']],
  P6:[['世說新語與閱讀策略','race'],['夾敍夾議寫作','puzzle'],['實用文與演講辭','rpg'],['仁義禮智信文化','chest'],['專題研習與高階思維','race']],
};
const primaryChineseMappingErrors = Object.entries(primaryChineseTopicSpec).flatMap(([grade, topics]) => topics.flatMap(([title, engine], index) => { const topic = database.topics.find((item) => item.id === `${grade}-中文-${index + 1}`); return !topic || topic.title !== title || topic.engine !== engine || topic.questions.some((question) => question.type !== expectedByEngine[engine]) ? [`${grade}-中文-${index + 1}`] : []; }));
const bilingualGaps = seniorMath.filter((topic) => !topic.bilingual || !topic.titleEn || topic.questions.some((question) => !question.promptEn || !question.explanationEn));
const totalQuestions = database.topics.reduce((total, topic) => total + topic.questions.length, 0);
const malformedQuestions = database.topics.flatMap((topic) => topic.questions.map((question, index) => ({ topic: topic.id, index, question })).filter(({ question }) => (question.type === 'choice' && (!Array.isArray(question.options) || question.options.length !== 4 || new Set(question.options.map(String)).size !== 4 || question.answerIndex < 0 || question.answerIndex > 3)) || (question.type === 'puzzle' && (!question.tokens?.length || !question.correctOrder?.length)) || (question.type === 'text' && !String(question.answer).trim()) || (question.type === 'composition' && (!question.scene?.title || !question.hintWords?.length || !question.sampleAnswer || !question.explanation))));
const answerKey = (question) => question.type === 'choice' ? String(question.options[question.answerIndex]) : question.type === 'puzzle' ? question.correctOrder.join('|') : String(question.answer).trim();
const duplicateQuestionTopics = database.topics.filter((topic) => new Set(topic.questions.map((question) => question.prompt)).size !== expectedQuestionCount(topic));
const duplicateAnswerTopics = database.topics.filter((topic) => new Set(topic.questions.map(answerKey)).size !== expectedQuestionCount(topic));

if (counts.topics !== 180 || totalQuestions !== 1950 || invalid.length || bilingualGaps.length || malformedQuestions.length || duplicateQuestionTopics.length || duplicateAnswerTopics.length || primaryChinese.length !== 30 || primaryChineseReading.length !== 6 || primaryChineseQuestionCountErrors.length || primaryChineseReadingErrors.length || pictureWritingErrors || primaryChineseMappingErrors.length || seniorMath.length !== 30 || uniqueIds.size !== counts.topics || Object.values(counts.subjects).some((count) => count !== 60) || Object.values(counts.grades).some((count) => count !== 15)) {
  console.error({ counts, totalQuestions, invalid: invalid.map((topic) => topic.id), bilingualGaps: bilingualGaps.map((topic) => topic.id), malformedQuestions: malformedQuestions.map(({ topic, index }) => `${topic}#${index + 1}`), duplicateQuestionTopics: duplicateQuestionTopics.map((topic) => topic.id), duplicateAnswerTopics: duplicateAnswerTopics.map((topic) => topic.id), primaryChineseQuestionCountErrors: primaryChineseQuestionCountErrors.map((topic) => topic.id), primaryChineseReadingErrors: primaryChineseReadingErrors.map((topic) => topic.id), pictureWritingErrors, primaryChineseMappingErrors, uniqueIds: uniqueIds.size });
  process.exit(1);
}

console.log(JSON.stringify({ status: 'valid', ...counts, totalQuestions, primaryChineseTopics: primaryChinese.length, primaryChineseReadingTopics: primaryChineseReading.length, pictureWritingTopic: pictureWritingTopic?.id, primaryChineseMappingErrors: primaryChineseMappingErrors.length, seniorMathBilingualTopics: seniorMath.length, uniqueIds: uniqueIds.size }, null, 2));
