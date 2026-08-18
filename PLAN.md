# Game Plan: EduQuest 邊學邊玩

## Risk Tasks

### 1. 資料驅動的 180 個 Topic

- **Why isolated:** 題庫數量大，且每個 Topic 必須帶有年級、科目、引擎與可答題資料，不能靠獨立頁面分支。
- **Approach:** 以 `curriculumDB.json` 收錄 P1–S6、三科、每科每級五個 Topic；每個 Topic 連到所屬引擎和具體題目資料。
- **Verify:** JSON 的 `topicCount` 為 180；每個 Topic 都有題目、解析和有效引擎名稱。

### 2. 跨引擎玩家狀態與三秒錯題鎖定

- **Why isolated:** XP、生命值、回饋鎖定與結果頁需跨四種不同操作介面保持一致。
- **Approach:** React Context 保存全域 XP；局部 game session 保存心心、題序、答題紀錄及 cooldown。引擎僅發送統一的 `submitAnswer` 結果。
- **Verify:** 每次答對 XP +10；錯答扣一心並停留三秒顯示解析；三心耗盡立刻進入 Game Over。

## Main Build

建立大廳、選關頁、四種引擎舞台與結算畫面，並以單一 JSON 資料層提供所有課程內容。使用 Lucide 圖示、CSS 粒子與動畫作視覺回饋，不使用圖片佔位符，以符合使用者指定的圖示式多媒體限制。

- **Assets needed:** 無外部圖片；以 Lucide 圖示、CSS 軌道、角色輪廓、寶箱與粒子製作所有遊戲視覺。
- **Verify:** 所有畫面可由 Lobby 進入並返回；四種引擎均可完成一局；手機版無文字溢出；建置和瀏覽器 console 無錯誤。
