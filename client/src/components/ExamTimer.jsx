/* 呈分試正向計時器：只在教師開始後記錄，供單元結算摘要顯示。 */
import { Pause, Play, RotateCcw, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';
import { setExamTimerState } from '../lib/examTimerStore';

export default function ExamTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => { setExamTimerState({ seconds, running, hasStarted }); }, [seconds, running, hasStarted]);
  useEffect(() => {
    const pause = () => setRunning(false);
    window.addEventListener('eduquest:pause-exam-timer', pause);
    return () => window.removeEventListener('eduquest:pause-exam-timer', pause);
  }, []);

  const reset = () => { setSeconds(0); setRunning(false); setHasStarted(false); };
  const toggle = () => { if (!running) setHasStarted(true); setRunning((value) => !value); };
  const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return <div className={`exam-timer ${running ? 'is-running' : ''}`} aria-label="呈分試正向計時器"><Timer size={16} /><span>已用</span><b>{display}</b><button onClick={toggle} aria-label={running ? '暫停計時' : '開始計時'}>{running ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}</button><button onClick={reset} aria-label="重設計時"><RotateCcw size={14} /></button></div>;
}
