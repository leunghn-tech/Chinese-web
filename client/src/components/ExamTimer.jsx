/* 呈分試倒數計時器：教師選擇時限後，可開始、暫停或重設，全站頂部均可看見。 */
import { Pause, Play, RotateCcw, Timer } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ExamTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return undefined;
    const timer = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [running]);

  const reset = () => { setSeconds(0); setRunning(false); };
  const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return <div className={`exam-timer ${running ? 'is-running' : ''}`} aria-label="呈分試正向計時器"><Timer size={16} /><span>已用</span><b>{display}</b><button onClick={() => setRunning((value) => !value)} aria-label={running ? '暫停計時' : '開始計時'}>{running ? <Pause size={15} /> : <Play size={15} fill="currentColor" />}</button><button onClick={reset} aria-label="重設計時"><RotateCcw size={14} /></button></div>;
}
