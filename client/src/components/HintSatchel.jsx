import { Lightbulb } from 'lucide-react';
import { useEffect, useState } from 'react';

const readTeacherSettings = () => {
  try { return JSON.parse(window.localStorage.getItem('eduquest-feedback-settings') || '{}'); } catch { return {}; }
};

export default function HintSatchel({ hint, title = '拆題提示' }) {
  const [enabled, setEnabled] = useState(() => readTeacherSettings().hintSatchel === true);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sync = (event) => setEnabled(event.detail?.hintSatchel === true);
    window.addEventListener('eduquest-feedback-settings', sync);
    return () => window.removeEventListener('eduquest-feedback-settings', sync);
  }, []);
  useEffect(() => { setOpen(false); }, [hint, enabled]);

  if (!enabled || !hint) return null;
  return <aside className={`hint-satchel ${open ? 'open' : ''}`}><button type="button" className="hint-satchel-trigger" onClick={() => setOpen((value) => !value)} aria-expanded={open}><span><Lightbulb size={18} /> 提示錦囊 <small>老師已啟用</small></span><b>{open ? '收起' : '打開'}</b></button>{open && <div className="hint-satchel-content"><span>{title}</span><p>{hint}</p></div>}</aside>;
}
