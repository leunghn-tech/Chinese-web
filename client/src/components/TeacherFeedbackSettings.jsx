/* 教師設定面板：以本機儲存記錄音效與動畫偏好，並通知活動頁立即更新。 */
import { Settings2, Sparkles, Volume2, VolumeX, X } from 'lucide-react';
import { useState } from 'react';

const DEFAULTS = { sound: true, animation: true };
const readSettings = () => { try { return { ...DEFAULTS, ...JSON.parse(window.localStorage.getItem('eduquest-feedback-settings') || '{}') }; } catch { return DEFAULTS; } };
export default function TeacherFeedbackSettings() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState(readSettings);
  const update = (key) => { const next = { ...settings, [key]: !settings[key] }; setSettings(next); window.localStorage.setItem('eduquest-feedback-settings', JSON.stringify(next)); window.dispatchEvent(new CustomEvent('eduquest-feedback-settings', { detail: next })); };
  return <div className="teacher-settings"><button className="teacher-settings-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label="開啟教師回饋設定"><Settings2 size={17} /> 教師設定</button>{open && <aside className="teacher-settings-panel"><button className="settings-close" onClick={() => setOpen(false)} aria-label="關閉設定"><X size={16} /></button><span>課堂回饋設定</span><b>控制全站鼓勵效果</b><p>設定會儲存在這部裝置，下次開啟仍會保留。</p><button className={`settings-toggle ${settings.sound ? 'on' : ''}`} onClick={() => update('sound')}><span>{settings.sound ? <Volume2 size={18} /> : <VolumeX size={18} />} 音效</span><i>{settings.sound ? '開啟' : '關閉'}</i></button><button className={`settings-toggle ${settings.animation ? 'on' : ''}`} onClick={() => update('animation')}><span><Sparkles size={18} /> 動畫</span><i>{settings.animation ? '開啟' : '關閉'}</i></button></aside>}</div>;
}
