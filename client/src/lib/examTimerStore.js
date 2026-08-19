/* 呈分試計時狀態：只記錄教師主動開始後的正向時間，供結算摘要擷取。 */
let timerState = { seconds: 0, hasStarted: false, running: false };

export function setExamTimerState(nextState) {
  timerState = { ...timerState, ...nextState };
}

export function getExamTimerSnapshot() {
  return { ...timerState };
}

export function pauseExamTimer() {
  window.dispatchEvent(new CustomEvent('eduquest:pause-exam-timer'));
}
