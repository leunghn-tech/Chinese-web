import { CarFront, Flag, Zap } from 'lucide-react';

export default function RaceEngine({ question, onAnswer, disabled }) {
  const isStrokeGrid = question.visualType === 'stroke-grid';
  const isApplication = Boolean(question.studyText);
  return <div className={`engine race-engine ${isStrokeGrid ? 'stroke-race' : ''} ${isApplication ? 'application-race' : ''}`}>
    <div className="race-track" aria-hidden="true"><div className="finish-line"><Flag /></div><div className="race-car"><CarFront /></div><div className="speed-trail"></div></div>
    <div className="engine-intro"><span className="engine-tag"><Zap size={15} /> 選擇競速</span><h2>衝過終點線！</h2><p>選對答案，知識賽車立即加速。</p></div>
    <div className={`question-card ${isStrokeGrid ? 'stroke-question-card' : ''} ${isApplication ? 'application-question-card' : ''}`}><p className="question-number">{isStrokeGrid ? '筆順方格' : isApplication ? '情境任務' : 'QUICK PICK'}</p>{isStrokeGrid && <section className="stroke-grid-panel" aria-label={`「${question.character}」字的筆順方格`}><div className="hanzi-grid" aria-hidden="true"><i></i><i></i><b>{question.character}</b><span>第 {question.targetOrder} 筆</span></div><div className="stroke-task-copy"><strong>看清字形，再選筆畫次序。</strong><p>目標：找出「{question.character}」的第 <em>{question.targetOrder}</em> 筆。</p><div className="stroke-slots" aria-label="筆畫位置">{question.strokes.map((_, index) => <span key={index} className={index + 1 === question.targetOrder ? 'target' : index + 1 < question.targetOrder ? 'before' : ''}>{index + 1}</span>)}</div></div></section>}{isApplication && <section className="application-passage"><span>{question.studyLabel || '閱讀材料'}</span><p>{question.studyText}</p></section>}<h3>{question.prompt}</h3>{question.promptEn && <p className="question-translation">{question.promptEn}</p>}<div className="answer-grid">{question.options.map((option, index) => <button key={option} disabled={disabled} onClick={() => onAnswer(index === question.answerIndex, option)} className="answer-btn race-answer"><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div></div>
  </div>;
}
