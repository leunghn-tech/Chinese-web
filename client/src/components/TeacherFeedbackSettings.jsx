/* 教師設定面板：以本機儲存記錄音效、動畫、提示與低小全班戰鬥的門檻／傷害偏好，並通知活動頁立即更新。 */
import { Gauge, Lightbulb, Settings2, Sparkles, Swords, Volume2, VolumeX, X } from 'lucide-react';
import { useState } from 'react';
import '../battleSettings.css';

const BATTLE_DEFAULTS = { skillStreak: 3, ultimateStreak: 5, baseDamage: 10, skillBonusDamage: 15, ultimateBonusDamage: 35 };
const DEFAULTS = { sound: true, animation: true, hintSatchel: false, firstWordHint: false, battle: BATTLE_DEFAULTS };
const readSettings = () => { try { const stored = JSON.parse(window.localStorage.getItem('eduquest-feedback-settings') || '{}'); return { ...DEFAULTS, ...stored, battle: { ...BATTLE_DEFAULTS, ...(stored.battle || {}) } }; } catch { return DEFAULTS; } };
const saveSettings = (next) => { window.localStorage.setItem('eduquest-feedback-settings', JSON.stringify(next)); window.dispatchEvent(new CustomEvent('eduquest-feedback-settings', { detail: next })); };

export default function TeacherFeedbackSettings() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(readSettings);
  const update = (key) => { const next = { ...settings, [key]: !settings[key] }; setSettings(next); saveSettings(next); };
  const updateBattle = (key, rawValue) => {
    const value = Number(rawValue);
    const battle = { ...settings.battle, [key]: value };
    if (key === 'skillStreak') battle.skillStreak = Math.min(Math.max(2, value), battle.ultimateStreak - 1);
    if (key === 'ultimateStreak') battle.ultimateStreak = Math.max(Math.min(8, value), battle.skillStreak + 1);
    if (['baseDamage', 'skillBonusDamage', 'ultimateBonusDamage'].includes(key)) battle[key] = Math.min(Math.max(5, value), 60);
    const next = { ...settings, battle };
    setSettings(next);
    saveSettings(next);
  };
  return <div className="teacher-settings"><button className="teacher-settings-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="開啟教師回饋設定"><Settings2 size={17} /> 教師設定</button>{open && <aside className="teacher-settings-panel"><button className="settings-close" onClick={() => setOpen(false)} aria-label="關閉設定"><X size={16} /></button><span>課堂回饋設定</span><b>控制全站鼓勵與提示</b><p>設定會儲存在這部裝置，下次開啟仍會保留。</p><button className={`settings-toggle ${settings.sound ? 'on' : ''}`} onClick={() => update('sound')}><span>{settings.sound ? <Volume2 size={18} /> : <VolumeX size={18} />} 音效</span><i>{settings.sound ? '開啟' : '關閉'}</i></button><button className={`settings-toggle ${settings.animation ? 'on' : ''}`} onClick={() => update('animation')}><span><Sparkles size={18} /> 動畫</span><i>{settings.animation ? '開啟' : '關閉'}</i></button><button className={`settings-toggle ${settings.hintSatchel ? 'on' : ''}`} onClick={() => update('hintSatchel')}><span><Lightbulb size={18} /> 提示錦囊</span><i>{settings.hintSatchel ? '開啟' : '關閉'}</i></button><button className={`settings-toggle ${settings.firstWordHint ? 'on' : ''}`} onClick={() => update('firstWordHint')}><span><Lightbulb size={18} /> 提示首詞</span><i>{settings.firstWordHint ? '開啟' : '關閉'}</i></button><section className="battle-settings-section"><header><Gauge size={17} /><div><span>低小全班打怪獸</span><b>連勝與傷害設定</b></div></header><p><Swords size={14} /> 每局開始前調整，會立即套用到新一題。</p><div className="battle-setting-grid"><label>技能連勝門檻<input type="number" min="2" max={settings.battle.ultimateStreak - 1} value={settings.battle.skillStreak} onChange={(event) => updateBattle('skillStreak', event.target.value)} /><small>第 {settings.battle.skillStreak} 題連答正確</small></label><label>終極技連勝門檻<input type="number" min={settings.battle.skillStreak + 1} max="8" value={settings.battle.ultimateStreak} onChange={(event) => updateBattle('ultimateStreak', event.target.value)} /><small>第 {settings.battle.ultimateStreak} 題連答正確</small></label><label>一般攻擊傷害<input type="number" min="5" max="60" step="5" value={settings.battle.baseDamage} onChange={(event) => updateBattle('baseDamage', event.target.value)} /><small>每題答對</small></label><label>技能額外傷害<input type="number" min="5" max="60" step="5" value={settings.battle.skillBonusDamage} onChange={(event) => updateBattle('skillBonusDamage', event.target.value)} /><small>連勝技能加成</small></label><label>終極技額外傷害<input type="number" min="5" max="60" step="5" value={settings.battle.ultimateBonusDamage} onChange={(event) => updateBattle('ultimateBonusDamage', event.target.value)} /><small>終極技能加成</small></label></div></section></aside>}</div>;
}
