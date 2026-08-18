# EduQuest 架構

| 層級 | 位置 | 職責 |
|---|---|---|
| 資料層 | `client/src/data/curriculumDB.json` | 180 個 Topic、題目、解析、引擎對應。 |
| 狀態層 | `client/src/App.jsx` | 路由畫面、全域 XP、選中的 Topic、局部遊戲 session。 |
| 遊戲層 | `client/src/engines/*` | Race、Puzzle、RPG、Chest 四種可重用引擎。 |
| 介面層 | `client/src/ui/*` | HUD、Lobby、Level Select、Result、共享反饋元件。 |
| 樣式層 | `client/src/index.css` | 遊戲化色彩、響應式佈局、成功／錯誤／粒子動畫。 |

每個引擎只讀取標準化 Topic 的 `questions` 陣列，並回傳 `{ correct, explanation, answer }` 事件給 App 的統一 session handler。這樣新增 Topic 無需增加新頁面或新遊戲邏輯。
