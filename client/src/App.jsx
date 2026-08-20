import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Calculator, Check, ChevronRight, CircleHelp, Languages, LayoutDashboard, PenLine, Play, Sparkles, X } from 'lucide-react';
import curriculumDB from './data/curriculumDB.json';
import chineseCatalog from './data/chineseCatalog';
import { getChineseQuestionBank } from './data/questionBanks/chinese/index.js';
import { getEnglishQuestionBank } from './data/questionBanks/english';
import EnglishCatalog from './components/EnglishCatalog';
import UnifiedChineseCatalog from './components/UnifiedChineseCatalog';
import EnglishChoiceActivity from './components/EnglishChoiceActivity';
import EnglishSentenceActivity from './components/EnglishSentenceActivity';
import EnglishSentenceRewriteActivity from './components/EnglishSentenceRewriteActivity';
import EnglishVerbMemoryActivity from './components/EnglishVerbMemoryActivity';
import WordMatchActivity from './components/WordMatchActivity';
import RadicalSortActivity from './components/RadicalSortActivity';
import PunctuationDropActivity from './components/PunctuationDropActivity';
import StoryStructureActivity from './components/StoryStructureActivity';
import SentenceExpandActivity from './components/SentenceExpandActivity';
import P2WritingActivity from './components/P2WritingActivity';
import FormatSortActivity from './components/FormatSortActivity';
import P3StudyActivity from './components/P3StudyActivity';
import ChoiceWorksheetActivity from './components/ChoiceWorksheetActivity';
import TaleReadingActivity from './components/TaleReadingActivity';
import ParagraphMarkActivity from './components/ParagraphMarkActivity';
import QuestionProfilePanel from './components/QuestionProfilePanel';
import TeacherFeedbackSettings from './components/TeacherFeedbackSettings';
import ExamTimer from './components/ExamTimer';
import { playCompletionSound, playCorrectSound } from './lib/feedbackAudio';

const SUBJECTS = {
  中文: { icon: BookOpen, color: 'chinese', english: 'Chinese' },
  英文: { icon: Languages, color: 'english', english: 'English' },
  數學: { icon: Calculator, color: 'math', english: 'Mathematics' },
};
const GRADES = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];
const GRADE_LABELS = ['一', '二', '三', '四', '五', '六'];
const SUBJECT_COVERS = {
  中文: '/manus-storage/course-cover-chinese_f886bfdd.png',
  英文: '/manus-storage/course-cover-english-v2_ded2565b.png',
  數學: '/manus-storage/course-cover-math-v2_ad8e426e.png',
};

function Brand() {
  return <div className="brand" aria-label="EduQuest"><span className="brand-mark"><i></i><i></i><i></i><Sparkles size={24} /></span><span><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></span></div>;
}

function Header({ onHome, action }) {
  return <header className="topbar"><Brand /><div className="topbar-right"><span className="demo-pill">課堂試玩・可儲存進度</span><ExamTimer /><TeacherFeedbackSettings />{action}{onHome && <button className="icon-button" onClick={onHome} aria-label="返回首頁"><LayoutDashboard size={20} /></button>}</div></header>;
}

function Home({ onStart }) {
  return <main className="site-shell home-page"><Header /><div className="floaters" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><section className="home-hero"><div className="hero-copy"><span className="kicker"><Sparkles size={15} /> EDUQUEST・課堂工作檯</span><h1>今天的課堂，<em>從這裡開始。</em></h1><p>先選年級，再選學科，再開啟對應的目錄或任務。中文各級已設目錄與題庫；小一英文已加入字母、詞彙、例句聽讀、句子拼砌與入門文法練習。</p><div className="hero-actions"><button className="primary-button" onClick={onStart}><Play size={18} fill="currentColor" /> 開始選年級與學科 <ChevronRight size={18} /></button><span>先選年級，再開啟今天的課堂。</span></div><div className="home-subject-bands" aria-label="今日課堂的三個學科"><span className="chinese"><b>中文</b><small>閱讀・寫作</small></span><span className="english"><b>英文</b><small>字母・詞彙・文法</small></span><span className="math"><b>數學</b><small>思考・運算</small></span></div></div><aside className="launch-desk"><div className="desk-heading"><span>今天的開課檯</span><b>三步設定</b></div><ol><li><b>01</b><div><strong>選擇年級</strong><small>P1 至 P6</small></div></li><li><b>02</b><div><strong>選擇學科</strong><small>中文、英文、數學</small></div></li><li><b>03</b><div><strong>開啟課程或示範題</strong><small>目錄與互動練習</small></div></li></ol><div className="desk-note"><CircleHelp size={17} /><span>小一英文已可直接開始練習。</span></div></aside></section><section className="class-start-strip"><div className="start-step"><span>1</span><div><b>先選年級</b><small>P1 至 P6</small></div></div><i></i><div className="start-step subject-step"><span>2</span><div><b>再選學科</b><small><em className="chinese-dot">中文</em><em className="english-dot">英文</em><em className="math-dot">數學</em></small></div></div><i></i><div className="start-step"><span>3</span><div><b>開啟課堂</b><small>目錄或示範題</small></div></div></section><section className="home-stats"><article><b>6</b><span>小學年級</span></article><article><b>3</b><span>核心學科</span></article><article><b>60</b><span>小一英文練習題</span></article></section></main>;
}

function CourseCard({ topic, onOpen, onCatalog }) {
  const subject = SUBJECTS[topic.subject];
  const Icon = subject.icon;
  const isChinese = topic.subject === '中文';
  const isEnglish = topic.subject === '英文';
  const isCatalog = isChinese || isEnglish;
  const openCard = () => isCatalog ? onCatalog(topic.grade, topic.subject) : onOpen(topic);
  const description = isChinese ? '閱讀、寫作與分級練習' : isEnglish ? '核心文法與互動題庫' : topic.description;
  return <button type="button" className={`course-card ${subject.color} clickable-card`} onClick={openCard} aria-label={isCatalog ? `開啟 ${topic.grade} ${topic.subject}課程目錄` : `開啟 ${topic.title} 示範題`}><div className="course-card-icon"><Icon size={27} /></div><div className="course-card-main"><span>{topic.grade}・{topic.subject}</span><h3>{topic.subject}</h3><p>{description}</p></div><div className="course-card-action"><strong className="course-card-cta">{isCatalog ? '開啟課程' : '開啟示範'} <ChevronRight size={17} /></strong></div></button>;
}

function Courses({ onBack, onOpen, onCatalog }) {
  const [grade, setGrade] = useState('P1');
  const gradeTopics = useMemo(() => curriculumDB.topics.filter((topic) => topic.grade === grade), [grade]);
  const gradeIndex = GRADES.indexOf(grade);
  return <main className="site-shell courses-page"><Header onHome={onBack} action={<button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回首頁</button>} /><section className="course-header"><div><span className="kicker">今天開課</span><h1>選擇今天的<br /><em>年級與學科。</em></h1><p>每一個年級都有中文、英文、數學三科。中文已整理分級目錄；小一英文已先開放字母、生活詞彙與基礎文法四個互動單元。</p></div><div className="course-summary"><span>已建立</span><b>6 年級 × 3 學科</b><small>中文目錄 + 小一英文題庫</small></div></section><div className="route-trail"><span className="done"><b>01</b> 選年級</span><i></i><span className="active"><b>02</b> 選學科</span><i></i><span><b>03</b> 查看目錄或試玩</span></div><section className="course-workbench"><aside className="grade-rail"><span>年級</span>{GRADES.map((item, index) => <button className={grade === item ? 'active' : ''} onClick={() => setGrade(item)} key={item}><b>{item}</b><small>小{GRADE_LABELS[index]}</small></button>)}</aside><div className="subject-workspace"><div className="workspace-heading"><span className="grade-chip">{grade}・小{GRADE_LABELS[gradeIndex]}</span><h2>選一科，查看目錄或試玩示範。</h2></div><div className="course-stack">{gradeTopics.map((topic) => <CourseCard key={topic.id} topic={topic} onOpen={onOpen} onCatalog={onCatalog} />)}</div><p className="workspace-note">中文各級目錄已按分級重點整理；小一英文可開啟四個入門單元，其他英文與數學內容將逐步擴充。</p></div></section></main>;
}

function QuestionBankStatus({ questionBank, completedUnits, onStartUnit }) {
  const questionCount = questionBank.units.reduce((total, unit) => total + unit.questions.length, 0);
  const readyCount = questionBank.units.filter((unit) => unit.questions.length > 0).length;
  return <section className="question-bank-status"><div className="bank-overview"><div><span>本級試題庫</span><b>{readyCount} 個單元可開始</b><small>共 {questionBank.units.length} 個單元入口，已加入 {questionCount} 題。</small></div><strong className="bank-total-chip">{questionCount} 題</strong></div><div className="bank-unit-grid">{questionBank.units.map((unit) => { const completed = Math.min(Array.isArray(completedUnits[unit.id]) ? completedUnits[unit.id].length : completedUnits[unit.id] || 0, unit.questions.length); const percent = unit.questions.length ? Math.round((completed / unit.questions.length) * 100) : 0; const content = <><div className="bank-unit-card-top"><span>{unit.area}</span><b className="bank-unit-count">{unit.questions.length} 題</b></div><strong>{unit.title}</strong><div className="bank-unit-progress"><span>{completed} / {unit.questions.length} 題已完成</span><i><b style={{ width: `${percent}%` }} /></i></div></>; return <button key={unit.id} className="bank-unit-card ready" onClick={() => onStartUnit(unit)}>{content}<ChevronRight size={18} /></button>; })}</div></section>;
}

function ChineseCatalog({ onBack, onHome, initialGrade, onStartUnit, completedUnits }) {
  const [grade, setGrade] = useState(initialGrade || 'P1');
  const catalog = chineseCatalog[grade];
  const questionBank = getChineseQuestionBank(grade);
  return <main className="site-shell catalog-page"><Header onHome={onHome} action={<button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回選科</button>} /><section className="catalog-header"><div><span className="kicker"><BookOpen size={15} /> 中文課程目錄</span><h1>中文課程，<br /><em>從閱讀走向寫作。</em></h1><p>以下按分級重點整理。每級以「閱讀」和「寫作」兩條學習線並行，方便備課與開啟互動練習。</p></div><aside className="catalog-key"><span>分級方式</span><b>閱讀 × 寫作</b><small>目前版本：中文科目錄</small></aside></section><div className="route-trail catalog-route"><span className="done"><b>01</b> 選年級</span><i></i><span className="active"><b>02</b> 查看中文目錄</span><i></i><span><b>03</b> 開始練習</span></div><section className="catalog-workbench"><aside className="catalog-grade-rail"><span>選擇年級</span>{GRADES.map((item, index) => <button className={grade === item ? 'active' : ''} onClick={() => setGrade(item)} key={item}><b>{item}</b><small>小{GRADE_LABELS[index]}</small></button>)}</aside><div className="catalog-content"><div className="catalog-grade-heading"><span>{catalog.grade}・{catalog.gradeLabel}</span><h2>{catalog.focus}</h2><p>{catalog.summary}</p></div><div className="catalog-columns"><article className="catalog-area reading"><div className="catalog-area-head"><span className="catalog-icon"><BookOpen size={24} /></span><div><b>閱讀</b><small>閱讀重點</small></div></div><ul>{catalog.reading.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="catalog-area writing"><div className="catalog-area-head"><span className="catalog-icon"><PenLine size={24} /></span><div><b>寫作</b><small>寫作重點</small></div></div><ul>{catalog.writing.map((item) => <li key={item}>{item}</li>)}</ul></article></div><QuestionBankStatus questionBank={questionBank} completedUnits={completedUnits} onStartUnit={onStartUnit} /><QuestionProfilePanel questionBank={questionBank} /><div className="catalog-note"><CircleHelp size={17} /><span>本目錄依現有分級範疇整理；可從下方任務卡直接開始題庫練習。</span></div></div></section></main>;
}

function Demo({ topic, onBack }) {
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const subject = SUBJECTS[topic.subject];
  const Icon = subject.icon;
  const answer = (index) => { if (feedback) return; setChoice(index); setFeedback({ correct: index === topic.answerIndex }); };
  const reset = () => { setChoice(null); setFeedback(null); };
  return <main className={`site-shell demo-page ${subject.color}`}><Header onHome={onBack} action={<button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回選科</button>} /><div className="route-trail demo-route"><span className="done"><b>01</b> 選年級</span><i></i><span className="done"><b>02</b> 選學科</span><i></i><span className="active"><b>03</b> 試玩一題</span></div><section className="demo-layout"><div className="demo-context"><span className={`subject-badge ${subject.color}`}><Icon size={17} /> {topic.subject}・{subject.english}</span><p>{topic.grade}・{topic.gradeLabel}</p><h1>{topic.title}</h1><span className="demo-caption">課堂示範 01 / 01</span><div className="demo-orbit" aria-hidden="true"><i></i><i></i><i></i></div></div><section className="question-sheet worksheet-card"><div className="sheet-tab">{topic.subject} 任務卡</div><div className="sheet-top"><span>試玩一題</span><small>{topic.grade}・{topic.gradeLabel}・{topic.description}</small></div><h2>{topic.prompt}</h2><div className="answer-options">{topic.options.map((option, index) => <button key={option} disabled={Boolean(feedback)} className={choice === index ? (index === topic.answerIndex ? 'selected-correct' : 'selected-wrong') : ''} onClick={() => answer(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div>{feedback && <aside className={`answer-feedback ${feedback.correct ? 'correct' : 'incorrect'}`} role="status"><div className="feedback-symbol">{feedback.correct ? <Check size={24} /> : <X size={24} />}</div><div><b>{feedback.correct ? '答對了！' : '這次未選中正確答案。'}</b><p>{feedback.correct ? '示範流程完成，可以返回選科或再試一次。' : <>正確答案是「{topic.options[topic.answerIndex]}」。{topic.explanation}</>}</p><div className="feedback-actions"><button className="ghost-button" onClick={onBack}>返回選科</button><button className="feedback-primary" onClick={reset}>{feedback.correct ? '再試一題' : '重新作答'} <ChevronRight size={17} /></button></div></div></aside>}</section></section></main>;
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const previewTopic = params.get('demo') ? curriculumDB.topics.find((item) => item.id === params.get('demo')) || curriculumDB.topics[0] : null;
  const previewEnglishGrade = params.get('unit')?.split('-')[0];
  const previewEnglishUnit = previewEnglishGrade ? getEnglishQuestionBank(previewEnglishGrade)?.units.find((unit) => unit.id === params.get('unit')) || null : null;
  const previewChineseConfig = { 'p1-story': ['P1', 'P1-CN-R04'], 'p2-tale': ['P2', 'P2-CN-R03'], 'p6-classical': ['P6', 'P6-CN-R01'] }[params.get('activity')];
  const previewChineseUnit = previewChineseConfig ? getChineseQuestionBank(previewChineseConfig[0]).units.find((unit) => unit.id === previewChineseConfig[1]) || null : null;
  const previewUnit = previewEnglishUnit || previewChineseUnit;
  const chineseCatalogPreview = params.get('view') === 'chinese-catalog';
  const [screen, setScreen] = useState(previewUnit ? 'activity' : previewTopic ? 'demo' : params.get('view') === 'english-catalog' || chineseCatalogPreview ? 'catalog' : params.get('view') === 'courses' ? 'courses' : 'home');
  const [topic, setTopic] = useState(previewTopic);
  const [catalogGrade, setCatalogGrade] = useState(previewChineseConfig?.[0] || (GRADES.includes(params.get('grade')) ? params.get('grade') : 'P1'));
  const [catalogSubject, setCatalogSubject] = useState(params.get('view') === 'english-catalog' || previewEnglishUnit ? '英文' : '中文');
  const [activeUnit, setActiveUnit] = useState(previewUnit);
  const [completedUnits, setCompletedUnits] = useState(() => { try { return JSON.parse(window.localStorage.getItem('eduquest-unit-progress') || '{}'); } catch { return {}; } });
  useEffect(() => {
    const applyMotionPreference = (value) => { try { const settings = value || JSON.parse(window.localStorage.getItem('eduquest-feedback-settings') || '{}'); document.documentElement.dataset.eduquestAnimation = settings.animation === false ? 'off' : 'on'; } catch { document.documentElement.dataset.eduquestAnimation = 'on'; } };
    applyMotionPreference();
    const onSettingsChange = (event) => applyMotionPreference(event.detail);
    window.addEventListener('eduquest-feedback-settings', onSettingsChange);
    return () => window.removeEventListener('eduquest-feedback-settings', onSettingsChange);
  }, []);
  useEffect(() => {
    let lastCorrect = 0;
    let lastComplete = 0;
    const inspect = (node) => { if (!(node instanceof Element)) return; [node, ...node.querySelectorAll('*')].forEach((item) => { const classes = item.classList; if (classes?.contains('activity-summary') && Date.now() - lastComplete > 900) { lastComplete = Date.now(); playCompletionSound(); } if ((classes?.contains('selected-correct') || classes?.contains('correct-pop') || classes?.contains('right')) && Date.now() - lastCorrect > 340) { lastCorrect = Date.now(); playCorrectSound(); } }); };
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => { if (mutation.type === 'attributes') inspect(mutation.target); mutation.addedNodes.forEach(inspect); }));
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  const openDemo = (selectedTopic) => { setTopic(selectedTopic); setScreen('demo'); };
  const openCatalog = (grade = 'P1', subject = '中文') => { setCatalogGrade(grade); setCatalogSubject(subject); setScreen('catalog'); };
  const markUnitCompleted = (unit, questionIds = unit.questions.map((question) => question.id)) => setCompletedUnits((current) => { const previous = Array.isArray(current[unit.id]) ? current[unit.id] : current[unit.id] >= unit.questions.length ? unit.questions.map((question) => question.id) : []; const next = { ...current, [unit.id]: [...new Set([...previous, ...questionIds])] }; window.localStorage.setItem('eduquest-unit-progress', JSON.stringify(next)); return next; });
  if (screen === 'activity' && activeUnit) {
    const backToCatalog = () => { setCatalogGrade(activeUnit.grade); setCatalogSubject(activeUnit.id.includes('-EN-') ? '英文' : '中文'); setScreen('catalog'); };
    if (activeUnit.interaction === 'english-sentence-read' || activeUnit.interaction === 'english-sentence-build') return <EnglishSentenceActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'english-sentence-rewrite-conditional' || activeUnit.interaction === 'english-sentence-rewrite-reported') return <EnglishSentenceRewriteActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'english-verb-memory') return <EnglishVerbMemoryActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.id.includes('-EN-')) return <EnglishChoiceActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'paragraph-mark') return <ParagraphMarkActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'p3-reading' || activeUnit.interaction === 'p3-idiom' || activeUnit.interaction === 'p3-figure') return <P3StudyActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'format-sort') return <FormatSortActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'writing-choice') return <P2WritingActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'tale-reading') return <TaleReadingActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'context-choice' || activeUnit.interaction === 'connector-cloze') return <ChoiceWorksheetActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'sentence-expand') return <SentenceExpandActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'story-structure') return <StoryStructureActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'punctuation-drop') return <PunctuationDropActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    if (activeUnit.interaction === 'radical-sort') return <RadicalSortActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
    return <WordMatchActivity unit={activeUnit} onBack={backToCatalog} onComplete={markUnitCompleted} />;
  }
  if (screen === 'catalog') return catalogSubject === '英文' ? <EnglishCatalog initialGrade={catalogGrade} onBack={() => setScreen('courses')} onHome={() => setScreen('home')} completedUnits={completedUnits} onStartUnit={(unit) => { setActiveUnit(unit); setScreen('activity'); }} /> : <UnifiedChineseCatalog initialGrade={catalogGrade} onBack={() => setScreen('courses')} onHome={() => setScreen('home')} completedUnits={completedUnits} onStartUnit={(unit) => { setActiveUnit(unit); setScreen('activity'); }} />;
  if (screen === 'courses') return <Courses onBack={() => setScreen('home')} onOpen={openDemo} onCatalog={openCatalog} />;
  if (screen === 'demo' && topic) return <Demo topic={topic} onBack={() => setScreen('courses')} />;
  return <Home onStart={() => setScreen('courses')} />;
}
