import database from '../client/src/data/curriculumDB.json' with { type: 'json' };

const expectedByEngine = { race: 'choice', puzzle: 'puzzle', rpg: 'choice', chest: 'text' };
const counts = {
  topics: database.topics.length,
  subjects: Object.fromEntries(database.meta.subjects.map((subject) => [subject, database.topics.filter((topic) => topic.subject === subject).length])),
  engines: Object.fromEntries(Object.keys(expectedByEngine).map((engine) => [engine, database.topics.filter((topic) => topic.engine === engine).length])),
  grades: Object.fromEntries(database.meta.grades.map((grade) => [grade, database.topics.filter((topic) => topic.grade === grade).length])),
};

const invalid = database.topics.filter((topic) => !topic.questions.length || topic.questions.some((question) => question.type !== expectedByEngine[topic.engine] || !question.explanation));
const uniqueIds = new Set(database.topics.map((topic) => topic.id));

if (counts.topics !== 180 || invalid.length || uniqueIds.size !== counts.topics || Object.values(counts.subjects).some((count) => count !== 60) || Object.values(counts.grades).some((count) => count !== 15)) {
  console.error({ counts, invalid: invalid.map((topic) => topic.id), uniqueIds: uniqueIds.size });
  process.exit(1);
}

console.log(JSON.stringify({ status: 'valid', ...counts, uniqueIds: uniqueIds.size }, null, 2));
