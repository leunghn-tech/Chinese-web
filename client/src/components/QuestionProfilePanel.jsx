import { BookMarked, Filter, Target, Tags } from 'lucide-react';
import { useMemo, useState } from 'react';

const difficultyClass = { 基礎: 'foundation', 應用: 'application', 進階: 'advanced', 挑戰: 'challenge' };
const difficultyOrder = ['全部', '基礎', '應用', '進階', '挑戰'];

export default function QuestionProfilePanel({ questionBank }) {
  const [activeUnitId, setActiveUnitId] = useState(questionBank.units[0]?.id);
  const [activeDifficulty, setActiveDifficulty] = useState('全部');
  const activeUnit = useMemo(() => questionBank.units.find((unit) => unit.id === activeUnitId) || questionBank.units[0], [activeUnitId, questionBank]);
  const visibleQuestions = activeUnit.questions.filter((question) => activeDifficulty === '全部' || question.difficulty === activeDifficulty);
  const counts = activeUnit.questions.reduce((result, question) => ({ ...result, [question.difficulty]: (result[question.difficulty] || 0) + 1 }), {});

  return <section className="question-profile-panel" aria-label="教師題目標記"><header className="question-profile-head"><div><span><Tags size={16} /> 教師題目標記</span><h3>按難度與學習目標選擇練習</h3><p>每一道題目已標記難度及對應學習目標；可先選單元，再按能力篩選題目。</p></div><aside><Target size={18} /><b>全部題目已標記</b><small>可作分層指派參考</small></aside></header><div className="question-unit-tabs" role="tablist" aria-label="選擇中文單元">{questionBank.units.map((unit) => <button key={unit.id} role="tab" aria-selected={activeUnit.id === unit.id} className={activeUnit.id === unit.id ? 'active' : ''} onClick={() => { setActiveUnitId(unit.id); setActiveDifficulty('全部'); }}><span>{unit.area}</span><b>{unit.title}</b><small>{unit.questions.length} 題</small></button>)}</div><section className="question-profile-workspace"><div className="profile-objective"><span><BookMarked size={16} /> 本單元學習目標</span><b>{activeUnit.learningObjective}</b></div><div className="profile-filter"><span><Filter size={15} /> 篩選難度</span><div>{difficultyOrder.map((difficulty) => <button key={difficulty} className={activeDifficulty === difficulty ? 'active' : ''} onClick={() => setActiveDifficulty(difficulty)}>{difficulty}{difficulty !== '全部' && counts[difficulty] ? <small>{counts[difficulty]}</small> : null}</button>)}</div></div><div className="question-profile-list">{visibleQuestions.map((question, index) => <article key={question.id}><span className="question-number">{String(activeUnit.questions.indexOf(question) + 1).padStart(2, '0')}</span><div><h4>{question.prompt}</h4><p><strong>學習目標：</strong>{question.learningObjective}</p></div><span className={`difficulty-label ${difficultyClass[question.difficulty]}`}>{question.difficulty}</span></article>)}{visibleQuestions.length === 0 && <div className="question-profile-empty">此單元目前沒有「{activeDifficulty}」題目。</div>}</div></section></section>;
}
