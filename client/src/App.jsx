/* 彩色課程工作檯：淺色、投影優先；中文以閱讀／寫作分級目錄主導，英數保留單題示範。 */
import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Calculator, Check, ChevronRight, CircleHelp, Languages, LayoutDashboard, PenLine, Play, Sparkles, X } from 'lucide-react';
import curriculumDB from './data/curriculumDB.json';
import chineseCatalog from './data/chineseCatalog';
import { getChineseQuestionBank } from './data/questionBanks/chinese/index.js';
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
import { playCompletionSound, playCorrectSound } from './lib/feedbackAudio';
import TeacherFeedbackSettings from './components/TeacherFeedbackSettings';
import ParagraphMarkActivity from './components/ParagraphMarkActivity';
import ExamTimer from './components/ExamTimer';

const SUBJECTS = {
  中文: { icon: BookOpen, color: 'chinese', english: 'Chinese', copy: '語文示範' },
  英文: { icon: Languages, color: 'english', english: 'English', copy: 'English demo' },
  數學: { icon: Calculator, color: 'math', english: 'Mathematics', copy: '數學示範' },
};
const GRADES = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

function Brand() {
  return <div className="brand" aria-label="EduQuest"><span className="brand-mark"><i></i><i></i><i></i><Sparkles size={24} /></span><span><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></span></div>;
}

function Header({ onHome, action }) {
  return <header className="topbar"><Brand /><div className="topbar-right"><span className="demo-pill">課堂試玩・每科一題</span><ExamTimer /><TeacherFeedbackSettings />{action}{onHome && <button className="icon-button" onClick={onHome} aria-label="返回首頁"><LayoutDashboard size={20} /></button>}</div></header>;
}

function Home({ onStart }) {
  return <main className="site-shell home-page"><Header /><div className="floaters" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><section className="home-hero"><div className="hero-copy"><span className="kicker"><Sparkles size={15} /> EDUQUEST・暫定名稱</span><h1>為下一堂課，<em>留下清楚的起點。</em></h1><p>先建立小一至小六的中、英、數課程框架。中文目錄與日後試題庫會按年級放在選關流程內；英文和數學暫保留一題示範，待你逐科補上內容。</p><div className="hero-actions"><button className="primary-button" onClick={onStart}><Play size={18} fill="currentColor" /> 開始選年級與學科 <ChevronRight size={18} /></button><span>先選年級，再開啟今天的課堂。</span></div></div><aside className="launch-desk"><div className="desk-heading"><span>今天的開課檯</span><b>三步設定</b></div><ol><li><b>01</b><div><strong>選擇年級</strong><small>P1 至 P6</small></div></li><li><b>02</b><div><strong>選擇學科</strong><small>中文、英文、數學</small></div></li><li><b>03</b><div><strong>開啟課程或示範題</strong><small>中文目錄、英文或數學試玩</small></div></li></ol><div className="desk-note"><CircleHelp size={17} /><span>中文目錄已按分級重點整理。</span></div></aside></section><section className="class-start-strip" aria-label="今天課堂的開課路徑"><div className="start-step"><span>1</span><div><b>先選年級</b><small>P1 至 P6</small></div></div><i></i><div className="start-step subject-step"><span>2</span><div><b>再選學科</b><small><em className="chinese-dot">中文</em><em className="english-dot">英文</em><em className="math-dot">數學</em></small></div></div><i></i><div className="start-step"><span>3</span><div><b>開啟課堂</b><small>中文目錄或示範題</small></div></div></section><section className="home-stats"><article><b>6</b><span>小學年級</span></article><article><b>3</b><span>核心學科</span></article><article><b>18</b><span>可操作示範題</span></article></section><section className="subject-intro"><div><span className="kicker">三科課程框架</span><h2>中、英、數<br />先把位置準備好。</h2></div><div className="subject-intro-list">{Object.entries(SUBJECTS).map(([name, subject]) => { const Icon = subject.icon; return <span className={`subject-mini ${subject.color}`} key={name}><Icon size={18} /><b>{name}</b><small>{subject.english}</small></span>; })}</div></section></main>;
}

function CourseCard({ topic, onOpen, onCatalog }) {
  const subject = SUBJECTS[topic.subject];
  const Icon = subject.icon;
  const isChinese = topic.subject === '中文';
  const openCard = () => isChinese ? onCatalog(topic.grade) : onOpen(topic);
  return <article className={`course-card ${subject.color} clickable-card`} role="link" tabIndex={0} onClick={openCard} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); openCard(); } }} aria-label={isChinese ? `開啟 ${topic.grade} 中文課程目錄` : `開啟 ${topic.title} 示範題`}><div className="course-card-icon"><Icon size={27} /></div><div className="course-card-main"><span>{topic.subject}・{subject.english}</span><h3>{isChinese ? `${topic.grade} 中文課程目錄` : topic.title}</h3><p>{isChinese ? '閱讀與寫作分級重點，已可從此開啟題庫與互動練習。' : topic.description}</p>{isChinese && <span className="course-card-hint">點擊整張卡即可開始</span>}</div><div className="course-card-action"><small>{isChinese ? '閱讀・寫作' : '示範題 01'}</small><button className="course-card-cta" onClick={(event) => { event.stopPropagation(); openCard(); }}>{isChinese ? '查看目錄' : '開啟示範'} <ChevronRight size={17} /></button></div></article>;
}

function Courses({ onBack, onOpen, onCatalog }) {
  const [grade, setGrade] = useState('P1');
  const gradeTopics = useMemo(() => curriculumDB.topics.filter((topic) => topic.grade === grade), [grade]);
  return <main className="site-shell courses-page"><Header onHome={onBack} action={<button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回首頁</button>} /><section className="course-header"><div><span className="kicker">今天開課</span><h1>選擇今天的<br /><em>年級與學科。</em></h1><p>目前為展示架構。每一個年級都有中文、英文、數學三科；中文已先整理完整分級目錄，英文和數學保留一題可試玩的示範題。</p></div><div className="course-summary"><span>已建立</span><b>6 年級 × 3 學科</b><small>中文目錄 + 18 個示範練習</small></div></section><div className="route-trail" aria-label="課堂設定步驟"><span className="done"><b>01</b> 選年級</span><i></i><span className="active"><b>02</b> 選學科</span><i></i><span><b>03</b> 查看目錄或試玩</span></div><section className="course-workbench"><aside className="grade-rail"><span>年級</span>{GRADES.map((item) => <button className={grade === item ? 'active' : ''} onClick={() => setGrade(item)} key={item}><b>{item}</b><small>小{['一','二','三','四','五','六'][GRADES.indexOf(item)]}</small></button>)}</aside><div className="subject-workspace"><div className="workspace-heading"><span className="grade-chip">{grade}・小{['一','二','三','四','五','六'][GRADES.indexOf(grade)]}</span><h2>選一科，查看目錄或試玩示範。</h2></div><div className="course-stack">{gradeTopics.map((topic) => <CourseCard key={topic.id} topic={topic} onOpen={onOpen} onCatalog={onCatalog} />)}</div><p className="workspace-note">中文科目錄已按目前提供的分級重點整理；英文和數學將在日後上載課程範疇後逐步擴充。</p></div></section></main>;
}

function QuestionBankStatus({ questionBank, questionCount, completedUnits, onStartUnit }) {
  const readyCount = questionBank.units.filter((unit) => unit.questions.length > 0).length;
  return <section className="question-bank-status"><div className="bank-overview"><div><span>本級試題庫</span><b>{readyCount} 個單元可開始</b><small>共 {questionBank.units.length} 個單元入口，已加入 {questionCount} 題。</small></div><strong className="bank-total-chip">{questionCount} 題</strong></div><div className="bank-unit-grid">{questionBank.units.map((unit) => { const ready = unit.questions.length > 0; const savedProgress = completedUnits[unit.id]; const completed = Math.min(Array.isArray(savedProgress) ? savedProgress.length : savedProgress || 0, unit.questions.length); const percent = unit.questions.length ? Math.round((completed / unit.questions.length) * 100) : 0; const content = <><div className="bank-unit-card-top"><span>{unit.area}</span><b className="bank-unit-count">{unit.questions.length} 題</b></div><strong>{unit.title}</strong><div className="bank-unit-progress"><span>{ready ? `${completed} / ${unit.questions.length} 題已完成` : '題庫準備中'}</span><i><b style={{ width: `${percent}%` }} /></i></div></>; return ready ? <button key={unit.id} className="bank-unit-card ready" onClick={() => onStartUnit(unit)}>{content}<ChevronRight size={18} /></button> : <article key={unit.id} className="bank-unit-card pending">{content}</article>; })}</div></section>;
}

function ChineseCatalog({ onBack, onHome, initialGrade, onStartUnit, completedUnits }) {
  const requestedGrade = new URLSearchParams(window.location.search).get('grade');
  const [grade, setGrade] = useState(GRADES.includes(initialGrade) ? initialGrade : GRADES.includes(requestedGrade) ? requestedGrade : 'P1');
  const catalog = chineseCatalog[grade];
  const questionBank = getChineseQuestionBank(grade);
  const questionCount = questionBank.units.reduce((total, unit) => total + unit.questions.length, 0);
  return <main className="site-shell catalog-page"><Header onHome={onHome} action={<button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回選科</button>} /><section className="catalog-header"><div><span className="kicker"><BookOpen size={15} /> 中文課程目錄</span><h1>中文課程，<br /><em>從閱讀走向寫作。</em></h1><p>以下按你提供的小一至小六重點整理。每級以「閱讀」和「寫作」兩條學習線並行，方便備課與後續補入題庫。</p></div><aside className="catalog-key"><span>分級方式</span><b>閱讀 × 寫作</b><small>目前版本：中文科目錄</small></aside></section><div className="route-trail catalog-route"><span className="done"><b>01</b> 選年級</span><i></i><span className="active"><b>02</b> 查看中文目錄</span><i></i><span><b>03</b> 開始練習</span></div><section className="catalog-workbench"><aside className="catalog-grade-rail"><span>選擇年級</span>{GRADES.map((item, index) => <button className={grade === item ? 'active' : ''} onClick={() => setGrade(item)} key={item}><b>{item}</b><small>小{['一','二','三','四','五','六'][index]}</small></button>)}</aside><div className="catalog-content"><div className="catalog-grade-heading"><span>{catalog.grade}・{catalog.gradeLabel}</span><h2>{catalog.focus}</h2><p>{catalog.summary}</p></div><div className="catalog-columns"><article className="catalog-area reading"><div className="catalog-area-head"><span className="catalog-icon"><BookOpen size={24} /></span><div><b>閱讀</b><small>閱讀重點</small></div></div><ul>{catalog.reading.map((item) => <li key={item}>{item}</li>)}</ul></article><article className="catalog-area writing"><div className="catalog-area-head"><span className="catalog-icon"><PenLine size={24} /></span><div><b>寫作</b><small>寫作重點</small></div></div><ul>{catalog.writing.map((item) => <li key={item}>{item}</li>)}</ul></article></div><QuestionBankStatus questionBank={questionBank} questionCount={questionCount} completedUnits={completedUnits} onStartUnit={onStartUnit} /><div className="catalog-note"><CircleHelp size={17} /><span>本目錄只根據目前提供的中文分級範疇整理；練習題、篇章及活動可於日後確認教材後再逐項加入。</span></div></div></section></main>;
}

function Feedback({ state, topic, onTryAgain, onBack }) {
  if (!state) return null;
  const correct = state.correct;
  return <aside className={`answer-feedback ${correct ? 'correct' : 'incorrect'}`} role="status"><div className="feedback-symbol">{correct ? <Check size={24} /> : <X size={24} />}</div><div><b>{correct ? '答對了！' : '這次未選中正確答案。'}</b><p>{correct ? '示範流程完成，可以返回選科或再試一次。' : <>正確答案是「{topic.options[topic.answerIndex]}」。{topic.explanation}</>}</p><div className="feedback-actions"><button className="ghost-button" onClick={onBack}>返回選科</button><button className="feedback-primary" onClick={onTryAgain}>{correct ? '再試一題' : '重新作答'} <ChevronRight size={17} /></button></div></div></aside>;
}

function Demo({ topic, onBack }) {
  const [choice, setChoice] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const subject = SUBJECTS[topic.subject];
  const Icon = subject.icon;
  const answer = (index) => { if (feedback) return; setChoice(index); setFeedback({ correct: index === topic.answerIndex }); };
  const reset = () => { setChoice(null); setFeedback(null); };
  return <main className={`site-shell demo-page ${subject.color}`}><Header onHome={onBack} action={<button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回選科</button>} /><div className="route-trail demo-route" aria-label="課堂設定步驟"><span className="done"><b>01</b> 選年級</span><i></i><span className="done"><b>02</b> 選學科</span><i></i><span className="active"><b>03</b> 試玩一題</span></div><section className="demo-layout"><div className="demo-context"><span className={`subject-badge ${subject.color}`}><Icon size={17} /> {topic.subject}・{subject.english}</span><p>{topic.grade}・{topic.gradeLabel}</p><h1>{topic.title}</h1><span className="demo-caption">課堂示範 01 / 01</span><div className="demo-orbit" aria-hidden="true"><i></i><i></i><i></i></div></div><section className="question-sheet worksheet-card"><div className="sheet-tab">{topic.subject} 任務卡</div><div className="sheet-top"><span>試玩一題</span><small>{topic.grade}・{topic.gradeLabel}・{topic.description}</small></div><h2>{topic.prompt}</h2><div className="answer-options">{topic.options.map((option, index) => <button key={option} disabled={Boolean(feedback)} className={`${choice === index ? (index === topic.answerIndex ? 'selected-correct' : 'selected-wrong') : ''}`} onClick={() => answer(index)}><span>{String.fromCharCode(65 + index)}</span>{option}</button>)}</div><Feedback state={feedback} topic={topic} onTryAgain={reset} onBack={onBack} /></section></section></main>;
}

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const previewTopic = params.get('demo') ? curriculumDB.topics.find((item) => item.id === params.get('demo')) || curriculumDB.topics[0] : null;
  const previewConfig = params.get('activity') === 'p4-practical-writing' ? { grade: 'P4', id: 'P4-CN-W04' } : params.get('activity') === 'p4-word-analysis' ? { grade: 'P4', id: 'P4-CN-R01' } : params.get('activity') === 'p3-parallelism' ? { grade: 'P3', id: 'P3-CN-R06' } : params.get('activity') === 'p3-personification' ? { grade: 'P3', id: 'P3-CN-R05' } : params.get('activity') === 'p3-metaphor' ? { grade: 'P3', id: 'P3-CN-R04' } : params.get('activity') === 'p3-paragraph-mark' ? { grade: 'P3', id: 'P3-CN-R03' } : params.get('activity') === 'p3-idiom' ? { grade: 'P3', id: 'P3-CN-R02' } : params.get('activity') === 'p3-information-reading' ? { grade: 'P3', id: 'P3-CN-R01' } : params.get('activity') === 'p2-format-sort' ? { grade: 'P2', id: 'P2-CN-W03' } : params.get('activity') === 'p2-practical-writing' ? { grade: 'P2', id: 'P2-CN-W02' } : params.get('activity') === 'p2-person-description' ? { grade: 'P2', id: 'P2-CN-W01' } : params.get('activity') === 'p2-tale-reading' ? { grade: 'P2', id: 'P2-CN-R03' } : params.get('activity') === 'p2-connector-cloze' ? { grade: 'P2', id: 'P2-CN-R02' } : params.get('activity') === 'p1-sentence-expand' ? { grade: 'P1', id: 'P1-CN-W01' } : params.get('activity') === 'p1-story-structure' ? { grade: 'P1', id: 'P1-CN-R04' } : params.get('activity') === 'p1-punctuation-drop' ? { grade: 'P1', id: 'P1-CN-R03' } : params.get('activity') === 'p1-radical-sort' ? { grade: 'P1', id: 'P1-CN-R02' } : params.get('activity') === 'p1-word-match' ? { grade: 'P1', id: 'P1-CN-R01' } : null;
  const previewUnit = previewConfig ? getChineseQuestionBank(previewConfig.grade).units.find((unit) => unit.id === previewConfig.id) : null;
  const previewView = params.get('view');
  const [screen, setScreen] = useState(previewUnit ? 'activity' : previewTopic ? 'demo' : previewView === 'catalog' ? 'catalog' : previewView === 'courses' ? 'courses' : 'home');
  const [topic, setTopic] = useState(previewTopic);
  const [catalogGrade, setCatalogGrade] = useState(GRADES.includes(params.get('grade')) ? params.get('grade') : 'P1');
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
    const inspect = (node) => {
      if (!(node instanceof Element)) return;
      const nodes = [node, ...node.querySelectorAll('*')];
      nodes.forEach((item) => {
        const classes = item.classList;
        if (classes?.contains('activity-summary')) { if (Date.now() - lastComplete > 900) { lastComplete = Date.now(); playCompletionSound(); } return; }
        if (classes?.contains('selected-correct') || classes?.contains('correct-pop') || classes?.contains('match-complete') || classes?.contains('right')) {
          if (Date.now() - lastCorrect > 340) { lastCorrect = Date.now(); playCorrectSound(); }
        }
      });
    };
    const observer = new MutationObserver((mutations) => mutations.forEach((mutation) => {
      if (mutation.type === 'attributes') inspect(mutation.target);
      mutation.addedNodes.forEach(inspect);
    }));
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);
  const openDemo = (selectedTopic) => { setTopic(selectedTopic); setScreen('demo'); };
  const openCatalog = (grade = 'P1') => { setCatalogGrade(grade); setScreen('catalog'); };
  const markUnitCompleted = (unit, questionIds = unit.questions.map((question) => question.id)) => setCompletedUnits((current) => { const previous = Array.isArray(current[unit.id]) ? current[unit.id] : current[unit.id] >= unit.questions.length ? unit.questions.map((question) => question.id) : []; const next = { ...current, [unit.id]: [...new Set([...previous, ...questionIds])] }; window.localStorage.setItem('eduquest-unit-progress', JSON.stringify(next)); return next; });
  if (screen === 'activity' && activeUnit) return activeUnit.interaction === 'paragraph-mark' ? <ParagraphMarkActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'p3-reading' || activeUnit.interaction === 'p3-idiom' || activeUnit.interaction === 'p3-figure' ? <P3StudyActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'format-sort' ? <FormatSortActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'writing-choice' ? <P2WritingActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'tale-reading' ? <TaleReadingActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'context-choice' || activeUnit.interaction === 'connector-cloze' ? <ChoiceWorksheetActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'sentence-expand' ? <SentenceExpandActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'story-structure' ? <StoryStructureActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'punctuation-drop' ? <PunctuationDropActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : activeUnit.interaction === 'radical-sort' ? <RadicalSortActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} /> : <WordMatchActivity unit={activeUnit} onBack={() => setScreen('catalog')} onComplete={markUnitCompleted} />;
  if (screen === 'catalog') return <ChineseCatalog initialGrade={catalogGrade} onBack={() => setScreen('courses')} onHome={() => setScreen('home')} completedUnits={completedUnits} onStartUnit={(unit) => { setActiveUnit(unit); setScreen('activity'); }} />;
  if (screen === 'courses') return <Courses onBack={() => setScreen('home')} onOpen={openDemo} onCatalog={openCatalog} />;
  if (screen === 'demo' && topic) return <Demo topic={topic} onBack={() => setScreen('courses')} />;
  return <Home onStart={() => setScreen('courses')} />;
}
