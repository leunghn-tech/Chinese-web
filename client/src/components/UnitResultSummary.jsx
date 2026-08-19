/* 教師成績摘要：所有單元結算共用，固定呈現答對題數、正確率與教師計時狀態。 */
import { BarChart3, CheckCircle2, Clock3, RotateCcw, Trophy } from 'lucide-react';
import { useState } from 'react';
import { getExamTimerSnapshot } from '../lib/examTimerStore';

const formatTime = (seconds) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export default function UnitResultSummary({ unit, total, correct, attempts, onBack, onReplay, title = '任務完成', description, noun = '題' }) {
  const [timer] = useState(() => getExamTimerSnapshot());
  const accuracy = attempts ? Math.round((correct / attempts) * 100) : 0;
  return <section className="activity-summary teacher-result-summary">
    <span><Trophy size={28} /> {title}</span>
    <h1>已完成全部<br /><em>{total} {noun}練習。</em></h1>
    <p>{description}</p>
    <section className="teacher-score-panel" aria-label="教師成績摘要">
      <div className="teacher-score-heading"><BarChart3 size={18} /><b>教師成績摘要</b><small>本次作答</small></div>
      <div className="teacher-score-grid">
        <div><CheckCircle2 size={18} /><strong>{correct} / {total}</strong><span>答對題數</span></div>
        <div><BarChart3 size={18} /><strong>{accuracy}%</strong><span>正確率</span></div>
        <div className={timer.hasStarted ? 'timed' : 'untimed'}><Clock3 size={18} /><strong>{timer.hasStarted ? formatTime(timer.seconds) : '未計時'}</strong><span>{timer.hasStarted ? '本次作答時間' : '教師未啟動計時'}</span></div>
      </div>
    </section>
    <div className="summary-actions"><button onClick={onBack} className="back-to-catalog">返回中文目錄</button><button onClick={onReplay}><RotateCcw size={17} /> 隨機重玩</button></div>
  </section>;
}
