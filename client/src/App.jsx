/* 彩色課程工作檯：淺色、投影優先，以年級與三科課程帶主導首頁和展示題流程。 */
import { useMemo, useState } from 'react';
import { ArrowLeft, BookOpen, Calculator, Check, ChevronRight, CircleHelp, Languages, LayoutDashboard, Play, Sparkles, X } from 'lucide-react';
import curriculumDB from './data/curriculumDB.json';

const SUBJECTS = {
  中文: { icon: BookOpen, color: 'chinese', english: 'Chinese', copy: '語文示範' },
  英文: { icon: Languages, color: 'english', english: 'English', copy: 'English demo' },
  數學: { icon: Calculator, color: 'math', english: 'Mathematics', copy: '數學示範' },
};
const GRADES = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6'];

function Brand() {
  return <div className="brand" aria-label="EduQuest"><span className="brand-mark"><i></i><i></i><i></i><Sparkles size={24} /></span><span><b>Edu<span>Quest</span></b><small>PRIMARY CLASSROOM DEMO</small></span></div>;
}

function Header({ onHome, action }) {
  return <header className="topbar"><Brand /><div className="topbar-right"><span className="demo-pill">課堂試玩・每科一題</span>{action}{onHome && <button className="icon-button" onClick={onHome} aria-label="返回首頁"><LayoutDashboard size={20} /></button>}</div></header>;
}

function Home({ onStart }) {
  return <main className="site-shell home-page"><Header /><div className="floaters" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div><section className="home-hero"><div className="hero-copy"><span className="kicker"><Sparkles size={15} /> EDUQUEST・暫定名稱</span><h1>為下一堂課，<em>留下清楚的起點。</em></h1><p>先建立小一至小六的中、英、數課程框架。現在每級每科提供一題可操作示範；正式課程內容可待你逐科上載後再加入。</p><div className="hero-actions"><button className="primary-button" onClick={onStart}><Play size={18} fill="currentColor" /> 開始選年級與學科 <ChevronRight size={18} /></button><span>先試一題，再決定下一步。</span></div></div><aside className="launch-desk"><div className="desk-heading"><span>今天的開課檯</span><b>三步設定</b></div><ol><li><b>01</b><div><strong>選擇年級</strong><small>P1 至 P6</small></div></li><li><b>02</b><div><strong>選擇學科</strong><small>中文、英文、數學</small></div></li><li><b>03</b><div><strong>試玩示範題</strong><small>每科暫設一題</small></div></li></ol><div className="desk-note"><CircleHelp size={17} /><span>正式課程可日後逐科補上。</span></div></aside></section><section className="home-stats"><article><b>6</b><span>小學年級</span></article><article><b>3</b><span>核心學科</span></article><article><b>18</b><span>可操作示範題</span></article></section><section className="subject-intro"><div><span className="kicker">THE COURSE FRAME</span><h2>中、英、數<br />先把位置準備好。</h2></div><div className="subject-intro-list">{Object.entries(SUBJECTS).map(([name, subject]) => { const Icon = subject.icon; return <span className={`subject-mini ${subject.color}`} key={name}><Icon size={18} /><b>{name}</b><small>{subject.english}</small></span>; })}</div></section></main>;
}

function CourseCard({ topic, onOpen }) {
  const subject = SUBJECTS[topic.subject];
  const Icon = subject.icon;
  return <article className={`course-card ${subject.color}`}><div className="course-card-icon"><Icon size={27} /></div><div className="course-card-main"><span>{topic.subject}・{subject.english}</span><h3>{topic.title}</h3><p>{topic.description}</p></div><div className="course-card-action"><small>示範題 01</small><button onClick={() => onOpen(topic)}>開啟示範 <ChevronRight size={17} /></button></div></article>;
}

function Courses({ onBack, onOpen }) {
  const [grade, setGrade] = useState('P1');
  const gradeTopics = useMemo(() => curriculumDB.topics.filter((topic) => topic.grade === grade), [grade]);
  return <main className="site-shell courses-page"><Header onHome={onBack} action={<button className="text-button" onClick={onBack}><ArrowLeft size={17} /> 返回首頁</button>} /><section className="course-header"><div><span className="kicker">CLASS SETUP</span><h1>選擇今天的<br /><em>年級與學科。</em></h1><p>目前為展示架構。每一個年級都有中文、英文、數學三科，並附一題可直接試玩的示範題。</p></div><div className="course-summary"><span>已建立</span><b>6 年級 × 3 學科</b><small>共 18 個示範練習</small></div></section><div className="route-trail" aria-label="課堂設定步驟"><span className="done"><b>01</b> 選年級</span><i></i><span className="active"><b>02</b> 選學科</span><i></i><span><b>03</b> 試玩一題</span></div><section className="course-workbench"><aside className="grade-rail"><span>年級</span>{GRADES.map((item) => <button className={grade === item ? 'active' : ''} onClick={() => setGrade(item)} key={item}><b>{item}</b><small>小{['一','二','三','四','五','六'][GRADES.indexOf(item)]}</small></button>)}</aside><div className="subject-workspace"><div className="workspace-heading"><span className="grade-chip">{grade}・小{['一','二','三','四','五','六'][GRADES.indexOf(grade)]}</span><h2>選一科，開啟一題示範。</h2></div><div className="course-stack">{gradeTopics.map((topic) => <CourseCard key={topic.id} topic={topic} onOpen={onOpen} />)}</div><p className="workspace-note">展示版只保留一題，以便先確認介面與流程；正式內容將按日後上載的課程範疇加入。</p></div></section></main>;
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
  const previewView = params.get('view');
  const previewTopic = previewView === 'demo' ? curriculumDB.topics.find((item) => item.id === params.get('topic')) || null : null;
  const [screen, setScreen] = useState(previewTopic ? 'demo' : previewView === 'courses' ? 'courses' : 'home');
  const [topic, setTopic] = useState(previewTopic);
  const openDemo = (selectedTopic) => { setTopic(selectedTopic); setScreen('demo'); };
  if (screen === 'courses') return <Courses onBack={() => setScreen('home')} onOpen={openDemo} />;
  if (screen === 'demo' && topic) return <Demo topic={topic} onBack={() => setScreen('courses')} />;
  return <Home onStart={() => setScreen('courses')} />;
}
