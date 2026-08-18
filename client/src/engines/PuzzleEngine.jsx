import { Puzzle, RotateCcw, WandSparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

function FableSort({ question, disabled, onAnswer, questionKey }) {
  const [order, setOrder] = useState(question.initialOrder);
  const [draggingId, setDraggingId] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  useEffect(() => { setOrder(question.initialOrder); setDraggingId(null); setDropIndex(null); setSubmitted(false); }, [questionKey]);
  const stepMap = Object.fromEntries(question.steps.map((step) => [step.id, step]));
  const correctCount = order.filter((id, index) => id === question.correctOrder[index]).length;
  const isComplete = correctCount === question.correctOrder.length;
  const moveCard = (from, to) => { if (from === to) return; setOrder((items) => { const next = [...items]; const [moved] = next.splice(from, 1); next.splice(to, 0, moved); return next; }); };
  const handleDrop = (event, targetIndex) => { event.preventDefault(); const sourceIndex = order.indexOf(event.dataTransfer.getData('text/plain')); if (sourceIndex >= 0) moveCard(sourceIndex, targetIndex); setDraggingId(null); setDropIndex(null); };
  const submit = () => { if (disabled || submitted) return; setSubmitted(true); window.setTimeout(() => onAnswer(isComplete, order.map((id) => stepMap[id].text).join(' → ')), isComplete ? 650 : 500); };
  return <div className="fable-sort" aria-label={`《${question.fableTitle}》情節排序`}><div className="fable-header"><span>寓言故事</span><h3>《{question.fableTitle}》</h3><p>{question.prompt}</p></div><div className="fable-progress"><span>已排正 {correctCount} / {question.correctOrder.length} 個情節</span><div><i style={{ width:`${correctCount / question.correctOrder.length * 100}%` }}></i></div></div><div className="fable-sort-list">{order.map((id, index) => { const step = stepMap[id]; const correct = id === question.correctOrder[index]; return <article key={id} draggable={!disabled && !submitted} onDragStart={(event) => { event.dataTransfer.setData('text/plain', id); event.dataTransfer.effectAllowed = 'move'; setDraggingId(id); }} onDragEnd={() => { setDraggingId(null); setDropIndex(null); }} onDragOver={(event) => event.preventDefault()} onDragEnter={() => setDropIndex(index)} onDragLeave={() => setDropIndex(null)} onDrop={(event) => handleDrop(event, index)} className={`${correct ? 'position-correct' : 'position-pending'} ${draggingId === id ? 'dragging' : ''} ${dropIndex === index ? 'drop-target' : ''}`}><span className="fable-step-number">{index + 1}</span><div><small>{correct ? '這個位置正確' : '拖曳調整次序'}</small><p>{step.text}</p></div><b>{correct ? '✓' : '↕'}</b></article>; })}</div><div className={`fable-hint ${isComplete ? 'complete' : ''}`}><b>{isComplete ? '次序完全正確！' : '綠色卡片已在正確位置。'}</b><p>{isComplete ? question.moral : '繼續拖曳其他情節，讓故事依起因、經過、結果排列。'}</p></div><button className="fable-submit" disabled={disabled || submitted} onClick={submit}>{isComplete ? '確認正確次序' : '提交目前次序'}</button></div>;
}

export default function PuzzleEngine({ question, onAnswer, disabled, questionKey }) {
  if (question.visualType === 'fable-sort') return <div className="engine puzzle-engine fable-puzzle-engine"><div className="puzzle-orbit" aria-hidden="true"><Puzzle /><WandSparkles /><Puzzle /></div><div className="engine-intro"><span className="engine-tag"><Puzzle size={15} /> 情節排序</span><h2>排好寓言故事次序！</h2><p>拖曳情節卡，讓故事從起因走到結果。</p></div><div className="question-card fable-question-card"><p className="question-number">FABLE TIMELINE</p><FableSort question={question} disabled={disabled} onAnswer={onAnswer} questionKey={questionKey} /></div></div>;
  const [picked, setPicked] = useState([]);
  useEffect(() => setPicked([]), [questionKey]);
  const choose = (token, index) => {
    if (disabled || picked.some((item) => item.index === index)) return;
    const next = [...picked, { token, index }]; setPicked(next);
    if (next.length === question.tokens.length) onAnswer(next.map((item) => item.token).join(' ') === question.correctOrder.join(' '), next.map((item) => item.token).join(' '));
  };
  return <div className="engine puzzle-engine">
    <div className="puzzle-orbit" aria-hidden="true"><Puzzle /><WandSparkles /><Puzzle /></div>
    <div className="engine-intro"><span className="engine-tag"><Puzzle size={15} /> 文字拆解</span><h2>把碎片拼成正確答案</h2><p>依照正確次序點選文字或字母。</p></div>
    <div className="question-card"><p className="question-number">ORDER QUEST</p><h3>{question.prompt}</h3>{question.promptEn && <p className="question-translation">{question.promptEn}</p>}<div className="puzzle-target">{picked.length ? picked.map((item, index) => <span key={`${item.index}-${index}`}>{item.token}</span>) : <em>在下方點選碎片，建立答案。</em>}</div><div className="token-row">{question.tokens.map((token, index) => <button disabled={disabled || picked.some((item) => item.index === index)} onClick={() => choose(token, index)} className="token-btn" key={`${token}-${index}`}>{token}</button>)}</div><button className="minor-btn" disabled={disabled || !picked.length} onClick={() => setPicked([])}><RotateCcw size={15} /> 清除重排</button></div>
  </div>;
}
