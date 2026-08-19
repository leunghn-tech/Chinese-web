/* 小二閱讀工作紙：以短文線索或生活句子推測意思、選擇關聯詞；每次開啟與重玩均重新排列題目及選項。 */
import { Check, ChevronRight, RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const shuffle = (items) => { const shuffled = [...items]; for (let index = shuffled.length - 1; index > 0; index -= 1) { const swapIndex = Math.floor(Math.random() * (index + 1)); [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]; } return shuffled; };
const labels = { 'context-choice': { name: '上下文線索任務', tip: '先讀完整句子，找出能幫助你猜意思的線索，再選擇答案。', sheet: '句子線索', prompt: '根據上下文推測詞義' }, 'connector-cloze': { name: '關聯詞填空任務', tip: '先看前後句的關係，再選出最合適的關聯詞，讓句子意思完整。', sheet: '生活情境句', prompt: '找出句子關係' } };

function WorkbenchFrame({ unit, taskLabel }) { const grade = unit.id.slice(0, 2); const label = labels[unit.interaction]; return <header className="activity-workbench-frame"><span className="activity-file-tab">{grade}<br />中文</span><div className="activity-brand-lockup"><span className="activity-brand-mark"><i></i><i></i><i></i><Sparkles size={18} /></span><div><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></div></div><div className="activity-course-file"><span>{grade}・中國語文</span><b>{unit.area}・{unit.title}</b></div><div className="activity-task-stamp"><span>課堂工作紙</span><b>{taskLabel || label.name}</b></div></header>; }

export default function ChoiceWorksheetActivity({ unit, onBack, onComplete }) {
  const [questions, setQuestions] = useState(() => shuffle(unit.questions));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [shuffleRound, setShuffleRound] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const question = questions[questionIndex];
  const label = labels[unit.interaction];
  const choices = useMemo(() => shuffle(question.choices), [question, shuffleRound]);
  const resetQuestion = () => { setSelected(null); setFeedback(null); setShuffleRound((round) => round + 1); };
  const replay = () => { setQuestions(shuffle(unit.questions)); setQuestionIndex(0); setShowSummary(false); resetQuestion(); };
  const answer = (choice) => { if (feedback) return; setSelected(choice); if (choice === question.answer) setFeedback({ correct: true }); else setFeedback({ correct: false }); };
  const nextQuestion = () => { if (questionIndex >= questions.length - 1) { onComplete?.(unit); setShowSummary(true); return; } setQuestionIndex((index) => index + 1); resetQuestion(); };
  if (showSummary) return <main className="site-shell choice-worksheet-page"><WorkbenchFrame unit={unit} taskLabel="結算" /><section className="activity-summary"><span><Trophy size={28} /> 閱讀任務完成</span><h1>你已完成全部<br /><em>{questions.length} 題閱讀練習。</em></h1><p>{unit.interaction === 'context-choice' ? '你已練習從句子線索推測生字詞意思。' : '你已練習從生活情境選出合適的關聯詞。'}</p><div className="summary-score"><b>{questions.length}</b><span>題全部完成</span></div><div className="summary-actions"><button onClick={onBack}>返回中文目錄</button><button onClick={replay}><RotateCcw size={17} /> 隨機重玩</button></div></section></main>;
  return <main className="site-shell choice-worksheet-page"><WorkbenchFrame unit={unit} taskLabel={`任務 ${questionIndex + 1} / ${questions.length}`} /><header className="match-topbar"><button onClick={onBack} className="match-back">返回中文目錄</button><div><span>{unit.area}・{unit.title}</span><b>第 {questionIndex + 1} / {questions.length} 題</b></div><div className="match-progress"><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div></header><section className="choice-worksheet-stage"><div className="match-heading"><span><Sparkles size={16} /> {label.name}</span><h1>{question.prompt}</h1><p>老師提示：{label.tip}</p></div><section className="context-paper"><div className="context-paper-head"><span>{label.sheet}</span><small>{label.prompt}</small></div><p>{question.context}</p>{unit.interaction === 'context-choice' && <strong>要推測的字詞：<em>{question.target}</em></strong>}{unit.interaction === 'connector-cloze' && <div className="connector-sentence">{question.sentence}</div>}</section><section className="worksheet-options"><div className="bank-title"><span>選擇答案</span><small>每次重玩會重新排列</small></div><div>{choices.map((choice, index) => <button key={choice} disabled={Boolean(feedback)} onClick={() => answer(choice)} className={`${selected === choice ? feedback?.correct ? 'selected-correct' : 'selected-wrong' : ''}`}><span>{String.fromCharCode(65 + index)}</span><b>{choice}</b></button>)}</div></section>{feedback && <div className={`worksheet-feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>{feedback.correct ? <><Check size={20} /><div><b>答對了！</b><p>{question.explanation}</p></div></> : <><X size={20} /><div><b>這個答案未符合句子線索。</b><p>請再讀一次情境，或選擇重新作答。</p></div></>}<div className="complete-actions">{feedback.correct ? <button onClick={nextQuestion}>{questionIndex === questions.length - 1 ? '查看結算' : '下一題'} <ChevronRight size={17} /></button> : <button onClick={resetQuestion}><RotateCcw size={16} /> 重新作答</button>}<button onClick={onBack}>返回題目板</button></div></div>}</section></main>;
}
