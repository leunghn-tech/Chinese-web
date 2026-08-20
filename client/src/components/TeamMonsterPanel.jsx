// EduQuest「彩色課程工作檯」：低小課堂合作模式以全班合力值與迷思獸生命條，將每題答對轉化為可見學習進度。
import { Heart, ShieldCheck, Sparkles, Swords, UsersRound, Zap } from 'lucide-react';

export default function TeamMonsterPanel({ current, total, monsterHp, monsterMaxHp, teamPower, status = 'ready' }) {
  const hpPercent = Math.max(0, Math.round((monsterHp / monsterMaxHp) * 100));
  const copy = status === 'hit' ? '全班命中！迷思獸被知識光束擊中。' : status === 'retry' ? '迷思獸正在防守，先找出提示，再合力再試。' : '全班先商量，再選出最有把握的答案。';
  return <section className={`team-monster-panel ${status}`} aria-label="全班合作打怪獸狀態"><header><span><UsersRound size={17} /> 全班合力打怪獸</span><small>第 {current}／{total} 題</small></header><div className="team-monster-stage"><section className="team-side"><div className="team-emblem"><ShieldCheck size={28} /></div><div><b>同學隊伍</b><span><Zap size={14} /> 合力值 {teamPower}</span></div></section><div className="battle-path" aria-hidden="true"><i></i><Sparkles size={20} /><i></i></div><section className={`monster-side ${monsterHp <= 0 ? 'defeated' : ''}`}><div className="monster-orb"><i></i><i></i><b>!</b></div><div><b>迷思獸</b><span><Heart size={14} fill="currentColor" /> 生命 {monsterHp}／{monsterMaxHp}</span></div></section></div><div className="monster-health" aria-label={`迷思獸生命：${monsterHp}／${monsterMaxHp}`}><i style={{ width: `${hpPercent}%` }} /></div><p className="battle-coach"><Swords size={16} /> {copy}</p></section>;
}
