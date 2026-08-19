/* 課堂鼓勵音效：只在學生點選或拖放互動後啟動，避免自動播放及外部音檔載入。 */
const playSequence = (notes, startDelay = 0) => {
  if (typeof window === 'undefined') return;
  try { if (JSON.parse(window.localStorage.getItem('eduquest-feedback-settings') || '{}').sound === false) return; } catch { /* 使用預設音效設定。 */ }
  const Context = window.AudioContext || window.webkitAudioContext;
  if (!Context) return;
  try {
    const context = new Context();
    const start = context.currentTime + startDelay;
    notes.forEach(({ frequency, offset, duration = 0.11, gain = 0.045 }) => {
      const oscillator = context.createOscillator();
      const volume = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(frequency, start + offset);
      volume.gain.setValueAtTime(0.0001, start + offset);
      volume.gain.exponentialRampToValueAtTime(gain, start + offset + 0.018);
      volume.gain.exponentialRampToValueAtTime(0.0001, start + offset + duration);
      oscillator.connect(volume).connect(context.destination);
      oscillator.start(start + offset);
      oscillator.stop(start + offset + duration + 0.02);
    });
    window.setTimeout(() => context.close(), 1200);
  } catch { /* 沒有音效支援時保留視覺回饋。 */ }
};

export const playCorrectSound = () => playSequence([{ frequency: 659, offset: 0 }, { frequency: 784, offset: 0.1 }]);
export const playCompletionSound = () => playSequence([{ frequency: 523, offset: 0 }, { frequency: 659, offset: 0.09 }, { frequency: 784, offset: 0.18 }, { frequency: 1047, offset: 0.29, duration: 0.18, gain: 0.06 }]);
