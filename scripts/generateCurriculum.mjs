import { mkdir, writeFile } from 'node:fs/promises';
import { primaryChineseUserScopeTopics } from './primaryChineseUserScope.mjs';

const outputDirectory = new URL('../client/src/data/', import.meta.url);
await mkdir(outputDirectory, { recursive: true });

const curriculum = {
  version: 'primary-chinese-user-scope-v1',
  status: '小學中文指定課程已載入；英文、數學及中學課程待補充。',
  availableGrades: ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'],
  availableSubjects: ['中文'],
  topics: primaryChineseUserScopeTopics,
  summary: {
    totalTopics: primaryChineseUserScopeTopics.length,
    totalQuestions: primaryChineseUserScopeTopics.reduce((sum, topic) => sum + topic.questions.length, 0),
    questionsPerTopic: 15,
  },
};

await writeFile(new URL('curriculumDB.json', outputDirectory), `${JSON.stringify(curriculum, null, 2)}\n`, 'utf8');
console.log(`Generated ${curriculum.summary.totalTopics} user-scoped primary Chinese topics with ${curriculum.summary.totalQuestions} questions.`);
