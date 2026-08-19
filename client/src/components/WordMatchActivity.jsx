/* P1 字詞配對活動：拖曳或點擊字詞卡，配對具體圖意；適合投影與觸控螢幕。 */
import { Check, ChevronRight, GripVertical, MousePointer2, RotateCcw, Sparkles, X } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function WordMatchActivity({ unit, onBack, onComplete }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [matches, setMatches] = useState({});
  const [selectedWordId, setSelectedWordId] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const question = unit.questions[questionIndex];
  const completed = Object.keys(matches).length === question.matches.length;
  const unmatchedWords = useMemo(() => question.matches.filter((item) => !Object.values(matches).includes(item.id)), [question, matches]);

  const resetQuestion = () => {
    setMatches({});
    setSelectedWordId(null);
    setFeedback(null);
  };

  const placeWord = (wordId, targetId) => {
    if (completed || matches[targetId]) return;
    const isCorrect = wordId === targetId;
    if (!isCorrect) {
      setFeedback({ correct: false, targetId, wordId });
      window.setTimeout(() => setFeedback(null), 760);
      return;
    }
    setMatches((current) => ({ ...current, [targetId]: wordId }));
    setSelectedWordId(null);
    setFeedback({ correct: true, targetId, wordId });
  };

  const nextQuestion = () => {
    if (questionIndex >= unit.questions.length - 1) {
      onComplete?.(unit);
      onBack();
      return;
    }
    setQuestionIndex((index) => index + 1);
    resetQuestion();
  };

  return <main className="site-shell word-match-page"><header className="match-topbar"><button onClick={onBack} className="match-back">返回中文目錄</button><div><span>{unit.area}・{unit.title}</span><b>第 {questionIndex + 1} / {unit.questions.length} 題</b></div><div className="match-progress" aria-label={`進度 ${questionIndex + 1} / ${unit.questions.length}`}><i style={{ width: `${((questionIndex + 1) / unit.questions.length) * 100}%` }} /></div></header><section className="match-stage"><div className="match-heading"><span><Sparkles size={16} /> 字詞配對任務</span><h1>{question.prompt}</h1><p>可以把字詞卡拖到圖意卡；在平板上，先點選字詞卡，再點選圖意卡即可。</p></div><section className="match-board"><div className="word-bank"><div className="bank-title"><span>字詞卡</span><small><GripVertical size={14} /> 拖曳或點選</small></div><div className="word-card-grid">{unmatchedWords.map((item) => <button key={item.id} draggable onDragStart={(event) => { event.dataTransfer.setData('wordId', item.id); setSelectedWordId(item.id); }} onDragEnd={() => setSelectedWordId(null)} onClick={() => setSelectedWordId((current) => current === item.id ? null : item.id)} className={`word-match-card ${selectedWordId === item.id ? 'selected' : ''}`}><span className="word-symbol">{item.symbol}</span><b>{item.word}</b><GripVertical size={16} /></button>)}{unmatchedWords.length === 0 && <div className="all-placed"><Check size={20} /> 全部已配對</div>}</div></div><div className="match-arrow" aria-hidden="true">→</div><div className="meaning-bank"><div className="bank-title"><span>圖意卡</span><small><MousePointer2 size={14} /> 選擇正確意思</small></div><div className="meaning-card-grid">{question.matches.map((item) => { const placed = matches[item.id]; const isWrong = feedback?.correct === false && feedback.targetId === item.id; const isRight = placed || feedback?.correct === true && feedback.targetId === item.id; const matchedItem = question.matches.find((word) => word.id === placed); return <button key={item.id} onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); placeWord(event.dataTransfer.getData('wordId'), item.id); }} onClick={() => selectedWordId && placeWord(selectedWordId, item.id)} className={`meaning-match-card ${isRight ? 'right' : ''} ${isWrong ? 'wrong' : ''}`}><span className="meaning-symbol">{item.symbol}</span><span className="meaning-copy">{placed ? <><small>已配對</small><b>{matchedItem.word}</b></> : <>{item.meaning}</>}</span>{isRight && <Check size={20} />}{isWrong && <X size={20} />}</button>; })}</div></div></section>{feedback && !completed && <div className={`match-feedback ${feedback.correct ? 'correct' : 'incorrect'}`}>{feedback.correct ? <><Check size={19} /> 配對正確，繼續完成其餘字詞。</> : <><X size={19} /> 這張字詞卡不符合圖意，請再想一想。</>}</div>}{completed && <div className="match-complete"><div><span><Check size={20} /> 全部配對正確</span><b>做得好！</b><p>{question.explanation}</p></div><div className="complete-actions"><button onClick={resetQuestion}><RotateCcw size={16} /> 再試一次</button><button onClick={nextQuestion}>{questionIndex === unit.questions.length - 1 ? '返回目錄' : '下一題'} <ChevronRight size={17} /></button></div></div>}</section></main>;
}
