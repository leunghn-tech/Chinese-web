// EduQuest 課堂音效：以 Web Audio 即時合成短促掌聲與怪獸技能音，避免外部音檔載入並遵守教師的「音效」設定。
const isSoundEnabled = () => {
  try { return JSON.parse(window.localStorage.getItem('eduquest-feedback-settings') || '{}').sound !== false; } catch { return true; }
};

const tone = (ctx, when, frequency, duration, type = 'sine', volume = 0.08) => {
  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, when);
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(volume, when + 0.025);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + duration);
  oscillator.connect(gain).connect(ctx.destination);
  oscillator.start(when);
  oscillator.stop(when + duration + 0.03);
};

const applause = (ctx, when) => {
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * 0.11), ctx.sampleRate);
  const output = buffer.getChannelData(0);
  for (let index = 0; index < output.length; index += 1) output[index] = (Math.random() * 2 - 1) * (1 - index / output.length);
  [0, 0.09, 0.18, 0.3, 0.43, 0.56].forEach((offset, index) => {
    const source = ctx.createBufferSource();
    const gain = ctx.createGain();
    source.buffer = buffer;
    gain.gain.setValueAtTime(0.11 - index * 0.008, when + offset);
    gain.gain.exponentialRampToValueAtTime(0.0001, when + offset + 0.1);
    source.connect(gain).connect(ctx.destination);
    source.start(when + offset);
  });
};

const soundRecipes = {
  cloud: { skill: [[523, 'sine'], [659, 'sine'], [784, 'triangle']], ultimate: [[523, 'sine'], [659, 'sine'], [784, 'triangle'], [1047, 'sine']] },
  octo: { skill: [[220, 'square'], [277, 'square'], [330, 'triangle']], ultimate: [[196, 'square'], [247, 'square'], [294, 'triangle'], [392, 'sine']] },
  compass: { skill: [[440, 'triangle'], [554, 'triangle'], [659, 'sine']], ultimate: [[392, 'triangle'], [523, 'triangle'], [659, 'sine'], [880, 'sine']] },
};

export const playBattleCelebration = (kind, monsterId) => {
  if (!isSoundEnabled() || typeof window === 'undefined') return;
  const AudioCtor = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtor) return;
  const ctx = new AudioCtor();
  const now = ctx.currentTime + 0.02;
  const notes = soundRecipes[monsterId]?.[kind] || soundRecipes.cloud[kind];
  if (kind === 'ultimate') applause(ctx, now);
  notes.forEach(([frequency, type], index) => tone(ctx, now + index * (kind === 'ultimate' ? 0.14 : 0.11), frequency, kind === 'ultimate' ? 0.24 : 0.16, type, kind === 'ultimate' ? 0.1 : 0.07));
  window.setTimeout(() => ctx.close(), 1800);
};
