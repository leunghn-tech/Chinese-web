/* 課堂工作紙：讓小一學生以時間、人物、地點、動作四張詞卡完成具體完整句子。 */
import { Check, ChevronRight, PenLine, RotateCcw, Sparkles, Trophy, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import UnitResultSummary from './UnitResultSummary';
import { pauseExamTimer } from '../lib/examTimerStore';

const shuffle = (items) => { const shuffled = [...items]; for (let index = shuffled.length - 1; index > 0; index -= 1) { const swapIndex = Math.floor(Math.random() * (index + 1)); [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]; } return shuffled; };

function WorkbenchFrame({ unit, taskLabel }) {
  return <header className="activity-workbench-frame writing-workbench"><span className="activity-file-tab">P1<br />寫作</span><div className="activity-brand-lockup"><span className="activity-brand-mark"><i></i><i></i><i></i><Sparkles size={18} /></span><div><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></div></div><div className="activity-course-file"><span>小一・中國語文</span><b>{unit.area}・{unit.title}</b></div><div className="activity-task-stamp"><span>課堂工作紙</span><b>{taskLabel}</b></div></header>;
}

export default function SentenceExpandActivity({ unit, onBack, onComplete }) {
  const [questions, setQuestions] = useState(() => shuffle(unit.questions));
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [shuffleRound, setShuffleRound] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [hadWrong, setHadWrong] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const question = questions[questionIndex];
  const partEntries = Object.entries(question.parts);
  const optionOrder = useMemo(() => Object.fromEntries(partEntries.map(([key, part]) => [key, shuffle(part.choices)])), [question, shuffleRound]);
  const completed = partEntries.every(([key, part]) => answers[key] === part.answer);

  const resetQuestion = () => { setAnswers({}); setFeedback(null); setHadWrong(false); setShuffleRound((round) => round + 1); };
  const replay = () => { setQuestions(shuffle(unit.questions)); setQuestionIndex(0); setShowSummary(false); setCorrectCount(0); resetQuestion(); };
  const chooseOption = (key, option) => {
    const part = question.parts[key];
    if (answers[key]) return;
    if (option !== part.answer) {
      setHadWrong(true);
      setFeedback({ correct: false, key, option });
      window.setTimeout(() => setFeedback(null), 850);
      return;
    }
    const nextAnswers = { ...answers, [key]: option };
    setAnswers(nextAnswers);
    if (partEntries.every(([partKey, item]) => nextAnswers[partKey] === item.answer)) setFeedback({ correct: true });
  };
  const nextQuestion = () => {
    const nextCorrect = correctCount + (hadWrong ? 0 : 1);
    if (questionIndex >= questions.length - 1) { setCorrectCount(nextCorrect); pauseExamTimer(); onComplete?.(unit); setShowSummary(true); return; }
    setCorrectCount(nextCorrect);
    setQuestionIndex((index) => index + 1);
    resetQuestion();
  };

  if (showSummary) return <main className="site-shell sentence-expand-page"><WorkbenchFrame unit={unit} taskLabel="結算" /><UnitResultSummary unit={unit} total={questions.length} correct={correctCount} attempts={questions.length} onBack={onBack} onReplay={replay} title="句子擴寫完成" description="你已練習在句子中清楚交代時間、人物、地點和動作。" noun="個完整句子" /></main>;

  return <main className="site-shell sentence-expand-page"><WorkbenchFrame unit={unit} taskLabel={`任務 ${questionIndex + 1} / ${questions.length}`} /><header className="match-topbar"><button onClick={onBack} className="match-back">返回中文目錄</button><div><span>{unit.area}・{unit.title}</span><b>第 {questionIndex + 1} / {questions.length} 題</b></div><div className="match-progress" aria-label={`進度 ${questionIndex + 1} / ${questions.length}`}><i style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div></header><section className="sentence-expand-stage"><div className="match-heading"><span><PenLine size={16} /> 句子擴寫任務</span><h1>{question.prompt}</h1><p>依次選出時間、人物、地點和動作；每選對一項，完整句子會逐步寫在工作紙上。</p></div><section className="sentence-sheet"><div className="sentence-sheet-head"><span>完整句子</span><small>四個要素：時間・人物・地點・動作</small></div><p className="expanded-sentence">{partEntries.map(([key, part], index) => <span key={key} className={answers[key] ? 'filled' : ''}>{answers[key] || `［${part.label}］`}{index === 0 || index === 1 ? '，' : index === 2 ? '' : '。'}</span>)}</p><small>{completed ? '四個要素都齊全，這是一句完整的句子。' : '按下方分類選擇最合適的詞語。'}</small></section><section className="expand-choice-grid">{partEntries.map(([key, part]) => <article key={key} className={`expand-choice-card ${answers[key] ? 'right' : ''} ${feedback?.correct === false && feedback.key === key ? 'wrong' : ''}`}><div><span>{part.label}</span><b>{answers[key] || `選一個${part.label}`}</b></div><div className="expand-options">{optionOrder[key].map((option) => <button key={option} disabled={Boolean(answers[key])} onClick={() => chooseOption(key, option)} className={feedback?.correct === false && feedback.key === key && feedback.option === option ? 'wrong' : ''}>{option}</button>)}</div></article>)}</section>{feedback && !completed && <div className="match-feedback incorrect"><X size={19} /> 這個詞未符合「{question.parts[feedback.key]?.label}」；請再看故事情境。</div>}{completed && <div className="match-complete"><div><span><Check size={20} /> 句子擴寫完成</span><b>句子寫得很清楚！</b><p>{question.explanation}</p></div><div className="complete-actions"><button onClick={resetQuestion}><RotateCcw size={16} /> 隨機再試一次</button><button onClick={nextQuestion}>{questionIndex === questions.length - 1 ? '查看結算' : '下一題'} <ChevronRight size={17} /></button></div></div>}</section></main>;
}
