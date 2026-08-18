import database from '../client/src/data/curriculumDB.json' with { type: 'json' };

const expectedTitles = {
  P1:['認讀生字與基本筆畫','簡單量詞與單句','認識句號及問號'],
  P2:['字形結構','部首','複雜量詞','陳述、疑問及祈使句'],
  P3:['成語運用及理解','複句','排比、反覆及擬物手法'],
  P4:['成語深化','多音字辨析','條件複句','比喻及擬人手法','寓言故事'],
  P5:['分辨近義詞','貶義及褒義詞','絕句與律詩格式','誇張手法'],
  P6:['文言實詞及虛詞','複雜複句','錯句修改','借代'],
};

const topics = database.topics;
const totalQuestions = topics.reduce((total, topic) => total + topic.questions.length, 0);
const expectedTopicCount = Object.values(expectedTitles).reduce((total, titles) => total + titles.length, 0);
const wrongSubjects = topics.filter((topic) => topic.subject !== '中文');
const wrongGrades = topics.filter((topic) => !/^P[1-6]$/.test(topic.grade));
const wrongTopicShape = topics.filter((topic) => topic.questions.length !== 15 || topic.engine !== (topic.title === '寓言故事' ? 'puzzle' : 'race') || topic.questions.some((question) => question.type !== 'choice' || !question.explanation || !question.prompt || !Array.isArray(question.options) || question.options.length !== 4 || new Set(question.options.map(String)).size !== 4 || question.answerIndex < 0 || question.answerIndex > 3));
const mappingErrors = Object.entries(expectedTitles).flatMap(([grade, titles]) => titles.flatMap((title, index) => {
  const topic = topics.find((item) => item.id === `${grade}-中文-${index + 1}`);
  return !topic || topic.title !== title ? [`${grade}-中文-${index + 1}`] : [];
}));
const duplicateQuestionTopics = topics.filter((topic) => new Set(topic.questions.map((question) => question.prompt)).size !== 15);
const genericTemplateErrors = topics.flatMap((topic) => topic.questions.filter((question) => /最適合用來完成哪一項課堂任務|第.+題：把詞語排成完整句子/.test(question.prompt)).map((question) => ({ topic:topic.id, prompt:question.prompt })));
const strokeTopic = topics.find((topic) => topic.id === 'P1-中文-1');
const strokeGridErrors = !strokeTopic || strokeTopic.questions.some((question) => question.visualType !== 'stroke-grid' || !question.character || !Array.isArray(question.strokes) || !question.targetOrder || question.strokes[question.targetOrder - 1] !== question.options[question.answerIndex]);
const radicalTopic = topics.find((topic) => topic.id === 'P2-中文-2');
const radicalBuildErrors = !radicalTopic || radicalTopic.questions.some((question) => question.visualType !== 'radical-build' || !question.targetCharacter || !Array.isArray(question.components) || !Array.isArray(question.correctParts) || question.correctParts.length !== 2 || question.correctParts.some((index) => !question.components[index]));
const connectorTopic = topics.find((topic) => topic.id === 'P3-中文-2');
const connectorFillErrors = !connectorTopic || connectorTopic.questions.some((question) => question.visualType !== 'connector-fill' || !question.studyText || !question.fillSentence || !question.fillSentence.includes('＿＿') || !question.options.includes(question.options[question.answerIndex]));
const classicalTopic = topics.find((topic) => topic.id === 'P6-中文-1');
const classicalMarkErrors = !classicalTopic || classicalTopic.questions.some((question) => question.visualType !== 'classical-mark' || !Array.isArray(question.markers) || !question.targetId || !question.markers.some((marker) => marker.id === question.targetId && marker.gloss));
const fableTopic = topics.find((topic) => topic.id === 'P4-中文-5');
const fableSortErrors = !fableTopic || fableTopic.questions.some((question) => question.visualType !== 'fable-sort' || !question.fableTitle || !Array.isArray(question.steps) || question.steps.length !== 3 || !Array.isArray(question.initialOrder) || !Array.isArray(question.correctOrder) || question.initialOrder.length !== 3 || question.correctOrder.length !== 3 || new Set(question.correctOrder).size !== 3 || question.correctOrder.some((id) => !question.steps.some((step) => step.id === id)));
const applicationTopicTitles = new Set(['成語運用及理解','成語深化','絕句與律詩格式']);
const applicationMaterialErrors = topics.filter((topic) => applicationTopicTitles.has(topic.title) && topic.questions.some((question) => !question.studyLabel || !question.studyText));

if (topics.length !== expectedTopicCount || totalQuestions !== expectedTopicCount * 15 || wrongSubjects.length || wrongGrades.length || wrongTopicShape.length || mappingErrors.length || duplicateQuestionTopics.length || genericTemplateErrors.length || strokeGridErrors || radicalBuildErrors || connectorFillErrors || classicalMarkErrors || fableSortErrors || applicationMaterialErrors.length || database.availableSubjects?.join(',') !== '中文' || database.availableGrades?.join(',') !== 'P1,P2,P3,P4,P5,P6') {
  console.error({ topicCount:topics.length, totalQuestions, wrongSubjects:wrongSubjects.map((topic) => topic.id), wrongGrades:wrongGrades.map((topic) => topic.id), wrongTopicShape:wrongTopicShape.map((topic) => topic.id), mappingErrors, duplicateQuestionTopics:duplicateQuestionTopics.map((topic) => topic.id), genericTemplateErrors, strokeGridErrors, radicalBuildErrors, connectorFillErrors, classicalMarkErrors, fableSortErrors, applicationMaterialErrors:applicationMaterialErrors.map((topic) => topic.id) });
  process.exit(1);
}

console.log(JSON.stringify({ status:'valid', topics:topics.length, totalQuestions, grades:database.availableGrades, subjects:database.availableSubjects, questionsPerTopic:15, strokeGridQuestions:strokeTopic.questions.length, radicalBuildQuestions:radicalTopic.questions.length, connectorFillQuestions:connectorTopic.questions.length, fableSortQuestions:fableTopic.questions.length, classicalMarkQuestions:classicalTopic.questions.length, applicationMaterialQuestions:topics.filter((topic) => applicationTopicTitles.has(topic.title)).reduce((total, topic) => total + topic.questions.length, 0), mappingErrors:0 }, null, 2));
