import { ArrowLeft, ChevronRight, RotateCcw, Sparkles, Trophy } from 'lucide-react';
import { useState } from 'react';
import { pauseExamTimer } from '../lib/examTimerStore';
import HintSatchel from './HintSatchel';

const shuffle = (items) => {
  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) { const swapIndex = Math.floor(Math.random() * (index + 1)); [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]]; }
  return shuffled;
};

function Frame({ unit, label }) {
  const grade = unit.id.split('-')[0];
  const hint = '先看圖像並大聲讀出動詞原形；翻卡前先猜一猜過去式，翻卡後再讀完整例句，把變化與情境連起來。';
  return <><header className="activity-workbench-frame english-activity-frame"><span className="activity-file-tab">{grade}<br />ENGLISH</span><div className="activity-brand-lockup"><span className="activity-brand-mark"><i></i><i></i><i></i><Sparkles size={18} /></span><div><b>Edu<span>Quest</span></b><small>小學課堂展示版</small></div></div><div className="activity-course-file"><span>小三・英文</span><b>{unit.area}・{unit.title}</b></div><div className="activity-task-stamp"><span>圖像記憶卡</span><b>{label}</b></div></header>{label !== '結算' && <HintSatchel hint={hint} title="不規則動詞記憶錦囊" />}</>;
}

export default function EnglishVerbMemoryActivity({ unit, onBack, onComplete }) {
  const [cards, setCards] = useState(() => shuffle(unit.questions));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const card = cards[index];
  const next = () => { if (index >= cards.length - 1) { pauseExamTimer(); onComplete?.(unit, cards.map((item) => item.id)); setShowSummary(true); return; } setIndex((value) => value + 1); setFlipped(false); };
  const replay = () => { setCards(shuffle(unit.questions)); setIndex(0); setFlipped(false); setShowSummary(false); };
  if (showSummary) return <main className="site-shell english-choice-page"><Frame unit={unit} label="結算" /><section className="english-summary activity-summary"><span><Trophy size={22} /> 完成記憶</span><h1>不規則動詞記憶卡完成了！</h1><p>你已翻閱 {cards.length} 張圖像記憶卡。現在可再玩一次，或返回英文目錄。</p><div><button onClick={onBack} className="english-back-button"><ArrowLeft size={17} /> 返回英文目錄</button><button onClick={replay} className="english-primary-button"><RotateCcw size={17} /> 隨機再看一次</button></div></section></main>;
  return <main className="site-shell english-choice-page"><Frame unit={unit} label={`記憶卡 ${index + 1} / ${cards.length}`} /><header className="match-topbar english-match-topbar"><button onClick={onBack} className="match-back">返回英文目錄</button><div><span>{unit.area}・{unit.title}</span><b>第 {index + 1} / {cards.length} 張</b></div><div className="match-progress"><i style={{ width: `${((index + 1) / cards.length) * 100}%` }} /></div></header><section className="english-activity-stage memory-stage"><div className="match-heading"><span><Sparkles size={16} /> 圖像記憶卡</span><h1>先看圖像與原形，翻卡記住過去式。</h1><p>老師提示：先大聲讀出原形，再翻卡讀一次過去式和例句。</p></div><button className={`verb-memory-card ${flipped ? 'flipped' : ''}`} onClick={() => setFlipped((value) => !value)} aria-label="翻轉不規則動詞記憶卡"><div className="verb-memory-face front"><span>{card.symbol}</span><small>原形 / BASE FORM</small><b>{card.baseWord}</b><em>{card.translation}</em><i>點一下翻卡</i></div><div className="verb-memory-face back"><small>過去式 / PAST FORM</small><b>{card.pastWord}</b><p>{card.sentence}</p><i>點一下翻回原形</i></div></button><div className="verb-memory-actions"><span>{flipped ? '讀完例句後，可前往下一張。' : '翻卡前，先猜一猜過去式。'}</span><button onClick={next}>{index === cards.length - 1 ? '完成記憶卡' : '下一張'} <ChevronRight size={17} /></button></div></section></main>;
}
