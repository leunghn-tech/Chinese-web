import { CarFront, Flag, Zap } from 'lucide-react';

export default function RaceEngine({ question, onAnswer, disabled }) {
  return <div className="engine race-engine">
    <div className="race-track" aria-hidden="true"><div className="finish-line"><Flag /></div><div className="race-car"><CarFront /></div><div className="speed-trail"></div></div>
    <div className="engine-intro"><span className="engine-tag"><Zap size={15} /> 選擇競速</span><h2>衝過終點線！</h2><p>選對答案，知識賽車立即加速。</p></div>
    <div className="question-card"><p className="question-number">QUICK PICK</p><h3>{question.prompt}</h3>{question.promptEn && <p className="question-translation">{question.promptEn}</p>}<div className="answer-grid">{question.options.map((option, index) => <button key={option} disabled={disabled} onClick={() => onAnswer(index === question.answerIndex, option)} className="answer-btn race-answer"><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div></div>
  </div>;
}
