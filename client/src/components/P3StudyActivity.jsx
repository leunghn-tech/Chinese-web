/* 小三工作紙：說明文以文章線索作答；成語以生活情境選擇最合適的表達。 */
import { BookOpen, Check, ChevronRight, Lightbulb, RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const shuffle = (items) => { const copied = [...items]; for (let index = copied.length - 1; index > 0; index -= 1) { const swap = Math.floor(Math.random() * (index + 1)); [copied[index], copied[swap]] = [copied[swap], copied[index]]; } return copied; };
function Frame({ unit, label }) { return <header className="activity-workbench-frame"><span className="activity-file-tab">P3<br />中文</span><div className="activity-brand-lockup"><span className="activity-brand-mark"><i></i><i></i><i></i><Sparkles size={18} /></span><div><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></div></div><div className="activity-course-file"><span>P3・中國語文</span><b>{unit.area}・{unit.title}</b></div><div className="activity-task-stamp"><span>課堂工作紙</span><b>{label}</b></div></header>; }
function Celebration() { return <div className="celebration-burst" aria-hidden="true"><i>★</i><i>✦</i><i>●</i><i>✦</i><i>★</i></div>; }

export default function P3StudyActivity({ unit, onBack, onComplete }) {
  const [questions, setQuestions] = useState(() => shuffle(unit.questions));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [round, setRound] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const question = questions[questionIndex];
  const isInfo = unit.interaction === 'p3-reading';
  const choices = useMemo(() => shuffle(question.choices), [question, round]);
  const resetQuestion = () => { setSelected(null); setFeedback(null); setRound((value) => value + 1); };
  const replay = () => { setQuestions(shuffle(unit.questions)); setQuestionIndex(0); setShowSummary(false); resetQuestion(); };
  const answer = (choice) => { if (feedback) return; setSelected(choice); const correct = choice === question.answer; setFeedback({ correct }); };
  const next = () => { if (questionIndex >= questions.length - 1) { onComplete?.(unit); setShowSummary(true); return; } setQuestionIndex((value) => value + 1); resetQuestion(); };
  if (showSummary) return <main className="site-shell p3-study-page"><Frame unit={unit} label="結算" /><section className="activity-summary"><Celebration /><span><Trophy size={28} /> 小三閱讀任務完成</span><h1>你已完成全部<br /><em>{questions.length} 題練習。</em></h1><p>{isInfo ? '你已從短篇說明文找出重點資料與主要意思。' : '你已從生活情境選出合適的基礎成語。'}</p><div className="summary-score"><b>{questions.length}</b><span>題全部完成</span></div><div className="summary-actions"><button onClick={onBack} className="back-to-catalog">返回中文目錄</button><button onClick={replay}><RotateCcw size={17} /> 隨機重玩</button></div></section></main>;
  return <main className="site-shell p3-study-page"><Frame unit={unit} label={`任務 ${questionIndex + 1} / ${questions.length}`} /><header className="match-topbar"><button onClick={onBack} className="match-back">返回中文目錄</button><div><span>{unit.area}・{unit.title}</span><b>第 {questionIndex + 1} / {questions.length} 題</b></div><div className="match-progress"><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div></header><section className="p3-study-stage"><div className="match-heading"><span>{isInfo ? <BookOpen size={16} /> : <Lightbulb size={16} />} {isInfo ? '短篇說明文閱讀' : '成語生活情境'}</span><h1>{question.prompt}</h1><p>{isInfo ? '先閱讀短文，再用文章中的資料找出答案。' : '先讀生活情境，再選出意思最貼切的成語。'}</p></div><section className={`p3-source-card ${isInfo ? 'info-source' : 'idiom-source'}`}><div><span>{isInfo ? '說明文小閱讀' : '生活情境'}</span><b>{question.title}</b></div><p>{isInfo ? question.text : question.context}</p></section><section className="p3-choice-bank"><div className="bank-title"><span>選擇答案</span><small>每次重玩會重新排列</small></div><div>{choices.map((choice, index) => <button key={choice} disabled={Boolean(feedback)} onClick={() => answer(choice)} className={selected === choice ? feedback?.correct ? 'selected-correct' : 'selected-wrong' : ''}><span>{String.fromCharCode(65 + index)}</span><b>{choice}</b></button>)}</div></section>{feedback && <div className={`p3-feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>{feedback.correct ? <><Check size={20} /><div><b>答對了！</b><p>{question.explanation}</p></div></> : <><X size={20} /><div><b>再看看題目中的線索。</b><p>{isInfo ? '答案可以從短文中找到。' : '想想情境最接近哪個成語的意思。'}</p></div></>}<div className="complete-actions">{feedback.correct ? <button onClick={next}>{questionIndex === questions.length - 1 ? '查看結算' : '下一題'} <ChevronRight size={17} /></button> : <button onClick={resetQuestion}><RotateCcw size={16} /> 重新作答</button>}<button onClick={onBack} className="back-to-catalog">返回題目板</button></div></div>}</section></main>;
}
