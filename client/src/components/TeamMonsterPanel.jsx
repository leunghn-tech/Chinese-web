// EduQuest「彩色課程工作檯」：低小課堂合作模式以全班合力值與迷思獸生命條，將每題答對轉化為可見學習進度。
import { Heart, ShieldCheck, Sparkles, Swords, UsersRound, Zap } from 'lucide-react';

const TEAM_MONSTERS = [
  { id: 'cloud', name: '算術雲獸', tag: '把數字迷霧吹走', mark: '＋', messages: { ready: '算術雲獸放出數字迷霧，全班先商量再出招！', hit: '答得清楚！算術雲獸的一團迷霧被算式吹散了。', retry: '算術雲獸把數字藏進雲裡，一起圈出已知量再試。', defeated: '雲霧散開了！全班的算式把算術雲獸送回天空。' } },
  { id: 'octo', name: '錯號章魚', tag: '找對運算符號', mark: '×', messages: { ready: '錯號章魚揮動觸手，想把運算符號弄亂！', hit: '找對了！錯號章魚縮起一條觸手。', retry: '錯號章魚把加減乘除藏起來，慢慢找線索再試。', defeated: '全班成功分辨運算！錯號章魚害羞地游走了。' } },
  { id: 'compass', name: '方位小怪', tag: '指準方向與位置', mark: '↗', messages: { ready: '方位小怪轉來轉去，等你們用方向把牠帶回正路！', hit: '方向正確！方位小怪轉回一小步。', retry: '方位小怪又轉錯了，一起看看位置、圖形或刻度再試。', defeated: '全班指路成功！方位小怪找到回家的方向了。' } },
];

export const pickTeamMonster = () => TEAM_MONSTERS[Math.floor(Math.random() * TEAM_MONSTERS.length)];

export default function TeamMonsterPanel({ current, total, monsterHp, monsterMaxHp, teamPower, status = 'ready', monster = TEAM_MONSTERS[0] }) {
  const hpPercent = Math.max(0, Math.round((monsterHp / monsterMaxHp) * 100));
  const phase = monsterHp <= 0 ? 'defeated' : status;
  return <section className={`team-monster-panel monster-${monster.id} ${phase}`} aria-label={`全班合作打怪獸狀態：${monster.name}`}><header><span><UsersRound size={17} /> 全班合力打怪獸</span><small>{monster.tag}・第 {current}／{total} 題</small></header><div className="team-monster-stage"><section className="team-side"><div className="team-emblem"><ShieldCheck size={28} /></div><div><b>同學隊伍</b><span><Zap size={14} /> 合力值 {teamPower}</span></div></section><div className="battle-path" aria-hidden="true"><i></i><Sparkles size={20} /><i></i></div><section className={`monster-side ${monsterHp <= 0 ? 'defeated' : ''}`}><div className="monster-orb"><i></i><i></i><b>{monster.mark}</b></div><div><b>{monster.name}</b><span><Heart size={14} fill="currentColor" /> 生命 {monsterHp}／{monsterMaxHp}</span></div></section></div><div className="monster-health" aria-label={`${monster.name}生命：${monsterHp}／${monsterMaxHp}`}><i style={{ width: `${hpPercent}%` }} /></div><p className="battle-coach"><Swords size={16} /> {monster.messages[phase]}</p></section>;
}
