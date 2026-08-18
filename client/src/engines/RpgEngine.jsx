import { Shield, Sparkles, Swords } from 'lucide-react';

export default function RpgEngine({ question, onAnswer, disabled }) {
  return <div className="engine rpg-engine">
    <div className="battlefield" aria-hidden="true"><div className="hero-avatar"><Shield /><span>你</span></div><div className="vs-orb">VS</div><div className="monster-avatar"><Swords /><span>迷思獸</span></div><div className="battle-spark spark-one"><Sparkles /></div><div className="battle-spark spark-two"><Sparkles /></div></div>
    <div className="engine-intro"><span className="engine-tag"><Swords size={15} /> RPG 怪物對戰</span><h2>用正確知識發動技能</h2><p>每個正確答案都會擊退迷思獸。</p></div>
    <div className="question-card battle-question"><p className="question-number">KNOWLEDGE SPELL</p><h3>{question.prompt}</h3><div className="battle-options">{question.options.map((option, index) => <button key={option} disabled={disabled} onClick={() => onAnswer(index === question.answerIndex, option)} className="answer-btn spell-answer"><span className="spell-icon">{['✦', '◈', '✧', '⬢'][index]}</span>{option}</button>)}</div></div>
  </div>;
}
