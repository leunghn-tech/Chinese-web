import { Puzzle, RotateCcw, WandSparkles } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PuzzleEngine({ question, onAnswer, disabled, questionKey }) {
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
