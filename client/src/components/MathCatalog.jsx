/* 彩色課程工作檯：數學目錄以綠色索引、單元卡、教師計時器與完成進度，讓教師直接開啟數與代數練習。 */
import { ArrowLeft, Calculator, ChevronRight, LayoutDashboard, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getMathQuestionBank } from '../data/questionBanks/math';
import ExamTimer from './ExamTimer';
import '../mathLearning.css';

const GRADES = ['P1', 'P2', 'P3'];
const LABELS = { P1: '小一', P2: '小二', P3: '小三' };

function Brand() { return <div className="brand" aria-label="EduQuest"><span className="brand-mark"><i></i><i></i><i></i><Sparkles size={24} /></span><span><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></span></div>; }

export default function MathCatalog({ initialGrade = 'P1', onBack, onHome, completedUnits, onStartUnit }) {
  const [grade, setGrade] = useState(GRADES.includes(initialGrade) ? initialGrade : 'P1');
  useEffect(() => setGrade(GRADES.includes(initialGrade) ? initialGrade : 'P1'), [initialGrade]);
  const bank = getMathQuestionBank(grade);
  const total = bank.units.reduce((sum, unit) => sum + unit.questions.length, 0);
  return <main className="site-shell math-catalog-page"><header className="topbar"><Brand /><div className="topbar-right"><span className="demo-pill">數學・P1–P3</span><ExamTimer /><button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回選科</button><button className="icon-button" onClick={onHome} aria-label="返回首頁"><LayoutDashboard size={20} /></button></div></header><section className="math-catalog-hero"><div><span className="kicker"><Calculator size={15} /> 數學課程目錄</span><h1>{LABELS[grade]} 數學・<em>數與代數</em></h1><p>以數線、十格框、生活情境與算式練習，建立清晰的數感和運算策略。教師可在右上角開啟正向計時，再直接選擇單元開始。</p></div><strong>{total} 題</strong></section><section className="math-catalog-workbench"><aside className="math-grade-rail"><span>年級</span>{GRADES.map((item) => <button className={grade === item ? 'active' : ''} onClick={() => setGrade(item)} key={item}><b>{item}</b><small>{LABELS[item]}</small></button>)}</aside><section className="math-catalog-content"><div className="math-directory-heading"><span>{grade}・數與代數</span><h2>選擇一個單元，開始互動練習。</h2><p>每個單元均有十題，完成後會顯示答對題數、正確率及教師已計時間。</p></div><div className="math-unit-grid">{bank.units.map((unit) => { const progress = completedUnits[unit.id]; const completed = Math.min(Array.isArray(progress) ? progress.length : progress || 0, unit.questions.length); const percent = Math.round((completed / unit.questions.length) * 100); return <button className="math-unit-card" key={unit.id} onClick={() => onStartUnit(unit)}><div><span>{unit.interaction === 'math-number-line' ? '數線互動' : unit.interaction === 'math-ten-frame' ? '十格框互動' : '應用練習'}</span><b>{unit.questions.length} 題</b></div><h3>{unit.title}</h3><p>{unit.objective}</p><footer><small>{completed ? `${completed} 題已完成` : '開始練習'} </small><i><b style={{ width: `${percent}%` }} /></i><ChevronRight size={17} /></footer></button>; })}</div></section></section></main>;
}
