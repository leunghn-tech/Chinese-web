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
const primaryChineseWriting = primaryChinese.filter((topic) => topic.id.endsWith('-4'));
const primaryChineseWritingErrors = primaryChineseWriting.filter((topic) => topic.engine !== 'composition' || topic.questions.length !== 15 || topic.questions.some((question) => question.type !== 'composition' || !question.hintWords?.length || !question.sampleAnswer || !question.explanation));
const primaryChineseGenericPromptErrors = primaryChinese.flatMap((topic) => topic.questions.map((question, index) => ({ topic: topic.id, index, prompt:question.prompt })).filter(({ prompt }) => /最適合用來完成哪一項課堂任務|認識「.+」的意思和實際應用/.test(prompt || '')));
const primaryChineseTopicSpec = {
  P1:[['聆聽、說話與生活語文','race'],['常用字、詞語與句子表達','puzzle'],['兒歌、童話與閱讀理解','rpg'],['看圖寫句與筆順','composition'],['品德情意、思維與語文自學','race']],
  P2:[['閱讀、標點與生活語文','race'],['四素句與句子組織','puzzle'],['童話、寓言與閱讀理解','rpg'],['標點、通知與賀卡寫作','composition'],['品德情意、思維與語文自學','race']],
  P3:[['閱讀、文學與品德情意','race'],['段落結構與閱讀策略','puzzle'],['記敍文、說明文與閱讀理解','rpg'],['日記、書信與修辭寫作','composition'],['文學、品德情意與語文自學','race']],
  P4:[['閱讀、文學與中華文化','race'],['中心思想、寫作目的與表達方式','puzzle'],['散文、說明文與閱讀理解','rpg'],['描寫、說明與修辭寫作','composition'],['品德情意、思維與語文自學','race']],
  P5:[['閱讀、文學與中華文化','race'],['篇章結構、修辭與閱讀策略','puzzle'],['小說、劇本、科普與閱讀理解','rpg'],['議論、說明與篇章佈局寫作','composition'],['文學、中華文化、品德情意與語文自學','race']],
  P6:[['閱讀、文學與中華文化','race'],['預測、提問、澄清與摘要','puzzle'],['淺易文言文與閱讀理解','rpg'],['夾敍夾議、建議書與演講辭','composition'],['中華文化、思維與語文自學','race']],
};
const primaryChineseMappingErrors = Object.entries(primaryChineseTopicSpec).flatMap(([grade, topics]) => topics.flatMap(([title, engine], index) => { const topic = database.topics.find((item) => item.id === `${grade}-中文-${index + 1}`); return !topic || topic.title !== title || topic.engine !== engine || topic.questions.some((question) => question.type !== expectedByEngine[engine]) ? [`${grade}-中文-${index + 1}`] : []; }));
const bilingualGaps = seniorMath.filter((topic) => !topic.bilingual || !topic.titleEn || topic.questions.some((question) => !question.promptEn || !question.explanationEn));
const totalQuestions = database.topics.reduce((total, topic) => total + topic.questions.length, 0);
const malformedQuestions = database.topics.flatMap((topic) => topic.questions.map((question, index) => ({ topic: topic.id, index, question })).filter(({ question }) => (question.type === 'choice' && (!Array.isArray(question.options) || question.options.length !== 4 || new Set(question.options.map(String)).size !== 4 || question.answerIndex < 0 || question.answerIndex > 3)) || (question.type === 'puzzle' && (!question.tokens?.length || !question.correctOrder?.length)) || (question.type === 'text' && !String(question.answer).trim()) || (question.type === 'composition' && (!question.hintWords?.length || !question.sampleAnswer || !question.explanation))));
const answerKey = (question) => question.type === 'choice' ? String(question.options[question.answerIndex]) : question.type === 'puzzle' ? question.correctOrder.join('|') : String(question.answer).trim();
const duplicateQuestionTopics = database.topics.filter((topic) => new Set(topic.questions.map((question) => question.prompt)).size !== expectedQuestionCount(topic));
const duplicateAnswerTopics = database.topics.filter((topic) => new Set(topic.questions.map(answerKey)).size !== expectedQuestionCount(topic));

if (counts.topics !== 180 || totalQuestions !== 1950 || invalid.length || bilingualGaps.length || malformedQuestions.length || duplicateQuestionTopics.length || duplicateAnswerTopics.length || primaryChinese.length !== 30 || primaryChineseReading.length !== 6 || primaryChineseQuestionCountErrors.length || primaryChineseReadingErrors.length || pictureWritingErrors || primaryChineseWriting.length !== 6 || primaryChineseWritingErrors.length || primaryChineseGenericPromptErrors.length || primaryChineseMappingErrors.length || seniorMath.length !== 30 || uniqueIds.size !== counts.topics || Object.values(counts.subjects).some((count) => count !== 60) || Object.values(counts.grades).some((count) => count !== 15)) {
  console.error({ counts, totalQuestions, invalid: invalid.map((topic) => topic.id), bilingualGaps: bilingualGaps.map((topic) => topic.id), malformedQuestions: malformedQuestions.map(({ topic, index }) => `${topic}#${index + 1}`), duplicateQuestionTopics: duplicateQuestionTopics.map((topic) => topic.id), duplicateAnswerTopics: duplicateAnswerTopics.map((topic) => topic.id), primaryChineseQuestionCountErrors: primaryChineseQuestionCountErrors.map((topic) => topic.id), primaryChineseReadingErrors: primaryChineseReadingErrors.map((topic) => topic.id), pictureWritingErrors, primaryChineseWritingErrors: primaryChineseWritingErrors.map((topic) => topic.id), primaryChineseGenericPromptErrors, primaryChineseMappingErrors, uniqueIds: uniqueIds.size });
  process.exit(1);
}

console.log(JSON.stringify({ status: 'valid', ...counts, totalQuestions, primaryChineseTopics: primaryChinese.length, primaryChineseReadingTopics: primaryChineseReading.length, primaryChineseWritingTopics: primaryChineseWriting.length, pictureWritingTopic: pictureWritingTopic?.id, primaryChineseMappingErrors: primaryChineseMappingErrors.length, seniorMathBilingualTopics: seniorMath.length, uniqueIds: uniqueIds.size }, null, 2));
