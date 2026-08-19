/* 共用試卷工作紙：以年級、範疇、正向計時與四選一訂正呈現閱讀及寫作操練。 */
import { BookOpen, Check, ChevronRight, Lightbulb, RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import ExamTimer from './ExamTimer';
import UnitResultSummary from './UnitResultSummary';
import { pauseExamTimer } from '../lib/examTimerStore';

const shuffle = (items) => { const copied = [...items]; for (let index = copied.length - 1; index > 0; index -= 1) { const swap = Math.floor(Math.random() * (index + 1)); [copied[index], copied[swap]] = [copied[swap], copied[index]]; } return copied; };
function Frame({ unit, label }) { return <header className="activity-workbench-frame"><span className="activity-file-tab">{unit.grade}<br />中文</span><div className="activity-brand-lockup"><span className="activity-brand-mark"><i></i><i></i><i></i><Sparkles size={18} /></span><div><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></div></div><div className="activity-course-file"><span>{unit.grade}・中國語文</span><b>{unit.area}・{unit.title}</b></div><ExamTimer /><div className="activity-task-stamp"><span>課堂工作紙</span><b>{label}</b></div></header>; }
function Celebration() { return <div className="celebration-burst" aria-hidden="true"><i>★</i><i>✦</i><i>●</i><i>✦</i><i>★</i></div>; }

export default function P3StudyActivity({ unit, onBack, onComplete }) {
  const [questions, setQuestions] = useState(() => shuffle(unit.questions));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [round, setRound] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const question = questions[questionIndex];
  const isInfo = unit.interaction === 'p3-reading';
  const isFigure = unit.interaction === 'p3-figure' && ['比喻', '擬人', '排比'].includes(unit.figureType);
  const isWriting = unit.area === '寫作';
  const isExam = ['P4', 'P5', 'P6'].includes(unit.grade);
  const choices = useMemo(() => shuffle(question.choices), [question, round]);
  const resetQuestion = () => { setSelected(null); setFeedback(null); setRound((value) => value + 1); };
  const replay = () => { setQuestions(shuffle(unit.questions)); setQuestionIndex(0); setShowSummary(false); setAttempts(0); setCorrectCount(0); resetQuestion(); };
  const answer = (choice) => { if (feedback) return; setSelected(choice); const correct = choice === question.answer; setAttempts((value) => value + 1); if (correct) setCorrectCount((value) => value + 1); setFeedback({ correct }); };
  const next = () => { if (questionIndex >= questions.length - 1) { pauseExamTimer(); onComplete?.(unit); setShowSummary(true); return; } setQuestionIndex((value) => value + 1); resetQuestion(); };
  if (showSummary) return <main className="site-shell p3-study-page"><Frame unit={unit} label="結算" /><Celebration /><UnitResultSummary unit={unit} total={questions.length} correct={correctCount} attempts={attempts} onBack={onBack} onReplay={replay} title={`${unit.grade}${isWriting ? '寫作' : '閱讀'}任務完成`} description={isWriting ? `你已完成「${unit.title}」的呈分試線索練習。` : `你已完成「${unit.title}」的閱讀線索操練。`} /></main>;
  return <main className="site-shell p3-study-page"><Frame unit={unit} label={`任務 ${questionIndex + 1} / ${questions.length}`} /><header className="match-topbar"><button onClick={onBack} className="match-back">返回中文目錄</button><div><span>{unit.area}・{unit.title}</span><b>第 {questionIndex + 1} / {questions.length} 題</b></div><div className="match-progress"><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div></header><section className="p3-study-stage"><div className="match-heading"><span>{isInfo ? <BookOpen size={16} /> : <Lightbulb size={16} />} {isExam ? (isWriting ? '呈分試寫作基本功' : '呈分試閱讀語句操練') : isWriting ? '寫作線索練習' : isInfo ? '短篇說明文閱讀' : isFigure ? `${unit.figureType}辨認任務` : '閱讀線索練習'}</span><h1>{question.prompt}</h1><p>{isExam ? '先讀試卷材料，再依題目要求選出唯一最合適的答案。' : isWriting ? '先讀寫作材料，再選出最符合題目的句子或資料。' : isInfo ? '先閱讀短文，再用文章中的資料找出答案。' : isFigure ? '先閱讀修辭小提示和句子，再選出符合手法的例子。' : '先閱讀材料，再選出最符合題目的答案。'}</p></div><section className={`p3-source-card ${isInfo ? 'info-source' : 'idiom-source'}`}><div><span>{isExam ? '試卷材料' : isWriting ? '寫作材料' : isInfo ? '說明文小閱讀' : isFigure ? `${unit.figureType}小提示` : '閱讀提示'}</span><b>{isInfo ? question.title : unit.title}</b></div><p>{isInfo ? question.text : question.hint || question.context}</p></section><section className="p3-choice-bank"><div className="bank-title"><span>選擇答案</span><small>每次重玩會重新排列</small></div><div>{choices.map((choice, index) => <button key={choice} disabled={Boolean(feedback)} onClick={() => answer(choice)} className={selected === choice ? feedback?.correct ? 'selected-correct' : 'selected-wrong' : ''}><span>{String.fromCharCode(65 + index)}</span><b>{choice}</b></button>)}</div></section>{feedback && <div className={`p3-feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>{feedback.correct ? <><Check size={20} /><div><b>答對了！</b><p>{question.explanation}</p></div></> : <><X size={20} /><div><b>再看看題目中的線索。</b><p>{isExam ? '請回到試卷材料，圈出與題目要求直接相關的關鍵詞。' : isWriting ? '留意題目要求的段落角色、感官或記敘要素。' : isInfo ? '答案可以從短文中找到。' : isFigure ? '留意提示中的手法特點，再找出最符合的句子。' : '重讀材料中的關鍵詞，再作答。'}</p></div></>}<div className="complete-actions">{feedback.correct ? <button onClick={next}>{questionIndex === questions.length - 1 ? '查看結算' : '下一題'} <ChevronRight size={17} /></button> : <button onClick={resetQuestion}><RotateCcw size={16} /> 重新作答</button>}<button onClick={onBack} className="back-to-catalog">返回題目板</button></div></div>}</section></main>;
}
