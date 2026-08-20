import { ArrowLeft, BookOpen, ChevronRight, LayoutDashboard, PenLine, Sparkles } from 'lucide-react';
import { useEffect, useState } from 'react';
import chineseCatalog from '../data/chineseCatalog';
import { getChineseQuestionBank } from '../data/questionBanks/chinese';
import { getChinesePracticeLink } from '../data/catalogPracticeLinks';

const GRADES = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
const GRADE_LABELS = ['一', '二', '三', '四', '五', '六'];

function Brand() { return <div className="brand" aria-label="EduQuest"><span className="brand-mark"><i></i><i></i><i></i><Sparkles size={24} /></span><span><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></span></div>; }

function TopicCard({ unit, grade, catalog, completedUnits, onStart }) {
  const progress = completedUnits[unit.id];
  const completed = Math.min(Array.isArray(progress) ? progress.length : progress || 0, unit.questions.length);
  const [strand, index] = getChinesePracticeLink(grade, unit.id) || [unit.area === '寫作' ? 'writing' : 'reading', 0];
  const topic = catalog[strand]?.[index] || unit.title;
  const objective = unit.questions[0]?.learningObjective || '掌握本課題的中文學習重點。';
  const Icon = strand === 'writing' ? PenLine : BookOpen;
  return <button className={`subject-topic-card chinese-topic-card ${strand}`} onClick={() => onStart(unit)}><div className="subject-topic-meta"><span><Icon size={14} /> {strand === 'writing' ? '寫作課題' : '閱讀課題'}</span><b>{unit.questions.length} 題</b></div><h3>{topic}</h3><p>{unit.title}・{objective}</p><small>{completed ? `${completed} 題已完成` : '開始練習'} <ChevronRight size={15} /></small></button>;
}

export default function UnifiedChineseCatalog({ initialGrade = 'P1', onBack, onHome, completedUnits, onStartUnit }) {
  const [grade, setGrade] = useState(initialGrade);
  useEffect(() => setGrade(initialGrade), [initialGrade]);
  const catalog = chineseCatalog[grade];
  const bank = getChineseQuestionBank(grade);
  const questionCount = bank.units.reduce((total, unit) => total + unit.questions.length, 0);
  return <main className="site-shell catalog-page unified-catalog-page chinese-unified-page"><header className="topbar"><Brand /><div className="topbar-right"><span className="demo-pill">中文・P1–P6</span><button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回選科</button><button className="icon-button" onClick={onHome} aria-label="返回首頁"><LayoutDashboard size={20} /></button></div></header><section className="subject-catalog-hero chinese-hero"><div><span className="kicker"><BookOpen size={15} /> 中文課題</span><h1>{catalog.gradeLabel} 中文</h1><p>{catalog.focus}</p></div><strong>{questionCount} 題</strong></section><section className="catalog-workbench unified-workbench chinese-workbench"><aside className="catalog-grade-rail"><span>年級</span>{GRADES.map((item, index) => <button className={grade === item ? 'active' : ''} onClick={() => setGrade(item)} key={item}><b>{item}</b><small>小{GRADE_LABELS[index]}</small></button>)}</aside><div className="catalog-content unified-catalog-content"><div className="subject-grade-heading"><span>{grade}・課題與練習</span><h2>選擇課題，直接開始練習。</h2></div><section className="subject-topic-grid">{bank.units.map((unit) => <TopicCard key={unit.id} unit={unit} grade={grade} catalog={catalog} completedUnits={completedUnits} onStart={onStartUnit} />)}</section></div></section></main>;
}
