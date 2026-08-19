/* 小二寓言與童話閱讀：同一篇故事連接主角、事情及大意三題，支援隨機故事與隨機答案。 */
import { BookOpen, Check, ChevronRight, RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const shuffle = (items) => { const shuffled = [...items]; for (let index = shuffled.length - 1; index > 0; index -= 1) { const swapIndex = Math.floor(Math.random() * (index + 1)); [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]; } return shuffled; };
const createSession = (stories) => { const story = stories[Math.floor(Math.random() * stories.length)] || stories[0]; return { story, questions: shuffle(story.questions) }; };
function WorkbenchFrame({ unit, taskLabel }) { return <header className="activity-workbench-frame"><span className="activity-file-tab">P2<br />中文</span><div className="activity-brand-lockup"><span className="activity-brand-mark"><i></i><i></i><i></i><Sparkles size={18} /></span><div><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></div></div><div className="activity-course-file"><span>P2・中國語文</span><b>{unit.area}・{unit.title}</b></div><div className="activity-task-stamp"><span>課堂工作紙</span><b>{taskLabel}</b></div></header>; }

export default function TaleReadingActivity({ unit, onBack, onComplete }) {
  const [session, setSession] = useState(() => createSession(unit.stories));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [shuffleRound, setShuffleRound] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const { story, questions } = session;
  const question = questions[questionIndex];
  const choices = useMemo(() => shuffle(question.choices), [question, shuffleRound]);
  const resetQuestion = () => { setSelected(null); setFeedback(null); setShuffleRound((round) => round + 1); };
  const replay = () => { setSession(createSession(unit.stories)); setQuestionIndex(0); setShowSummary(false); resetQuestion(); };
  const answer = (choice) => { if (feedback) return; setSelected(choice); setFeedback({ correct: choice === question.answer }); };
  const nextQuestion = () => { if (questionIndex >= questions.length - 1) { onComplete?.(unit, questions.map((item) => item.id)); setShowSummary(true); return; } setQuestionIndex((index) => index + 1); resetQuestion(); };
  if (showSummary) return <main className="site-shell tale-reading-page"><WorkbenchFrame unit={unit} taskLabel="結算" /><section className="activity-summary"><span><Trophy size={28} /> 故事閱讀完成</span><h1>《{story.title}》<br /><em>三題閱讀任務完成。</em></h1><p>你已找出故事主角、重要事情和大意。隨機重玩會換一篇小二故事。</p><div className="summary-score"><b>3</b><span>題全部完成</span></div><div className="summary-actions"><button onClick={onBack}>返回中文目錄</button><button onClick={replay}><RotateCcw size={17} /> 隨機閱讀另一篇</button></div></section></main>;
  return <main className="site-shell tale-reading-page"><WorkbenchFrame unit={unit} taskLabel={`故事題 ${questionIndex + 1} / ${questions.length}`} /><header className="match-topbar"><button onClick={onBack} className="match-back">返回中文目錄</button><div><span>{unit.area}・{unit.title}</span><b>第 {questionIndex + 1} / {questions.length} 題</b></div><div className="match-progress"><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div></header><section className="tale-reading-stage"><div className="match-heading"><span><Sparkles size={16} /> 寓言與童話閱讀</span><h1>{question.prompt}</h1><p>老師提示：先讀完整故事，再從人物、事情和結尾找出答案。</p></div><section className="tale-paper"><div><span><BookOpen size={17} /> {story.type}</span><b>{story.title}</b><small>{story.intro}</small></div><p>{story.text}</p></section><section className="worksheet-options"><div className="bank-title"><span>選擇答案</span><small>每次重玩會重新排列</small></div><div>{choices.map((choice, index) => <button key={choice} disabled={Boolean(feedback)} onClick={() => answer(choice)} className={`${selected === choice ? feedback?.correct ? 'selected-correct' : 'selected-wrong' : ''}`}><span>{String.fromCharCode(65 + index)}</span><b>{choice}</b></button>)}</div></section>{feedback && <div className={`worksheet-feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>{feedback.correct ? <><Check size={20} /><div><b>答對了！</b><p>{question.explanation}</p></div></> : <><X size={20} /><div><b>這個答案未能從故事找到。</b><p>請再看人物、事情和結尾的線索。</p></div></>}<div className="complete-actions">{feedback.correct ? <button onClick={nextQuestion}>{questionIndex === questions.length - 1 ? '查看結算' : '下一題'} <ChevronRight size={17} /></button> : <button onClick={resetQuestion}><RotateCcw size={16} /> 重新作答</button>}<button onClick={onBack}>返回題目板</button></div></div>}</section></main>;
}
