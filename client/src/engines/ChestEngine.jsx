import { Archive, KeyRound, LockKeyhole, Send } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ChestEngine({ question, onAnswer, disabled, questionKey }) {
  const [value, setValue] = useState('');
  useEffect(() => setValue(''), [questionKey]);
  const submit = (event) => { event.preventDefault(); if (!value.trim() || disabled) return; const normal = value.trim().replaceAll('　', ' ').replaceAll(' ', '').toLowerCase(); const answer = String(question.answer).replaceAll(' ', '').toLowerCase(); onAnswer(normal === answer, value.trim()); };
  return <div className="engine chest-engine">
    <div className="chest-stage" aria-hidden="true"><div className="chest-glow"></div><div className="chest-icon"><Archive size={100} /><LockKeyhole size={33} /></div><KeyRound className="key-float" /></div>
    <div className="engine-intro"><span className="engine-tag"><KeyRound size={15} /> 寶箱密碼鎖</span><h2>解開知識寶箱</h2><p>計算或推導後輸入正確密碼。</p></div>
    <form className="question-card vault-question" onSubmit={submit}><p className="question-number">VAULT CODE</p><h3>{question.prompt}</h3><label className="code-field"><span>你的密碼</span><input disabled={disabled} value={value} onChange={(event) => setValue(event.target.value)} placeholder={question.hint} autoComplete="off" /></label><button className="unlock-btn" disabled={disabled || !value.trim()} type="submit"><Send size={17} /> 解除鎖定</button></form>
  </div>;
}
