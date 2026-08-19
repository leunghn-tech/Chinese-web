# EduQuest 邊學邊玩

EduQuest 是以 React、Vite、Tailwind CSS 和 Lucide Icons 製作的遊戲化互動教學 SPA。平台覆蓋 P1 至 S6 的中文、英文和數學，並以單一 `curriculumDB.json` 資料庫驅動 180 個可玩 Topic。

## 啟動方式

在專案根目錄安裝套件後執行 `pnpm dev`，即可開啟本地預覽。執行 `pnpm build` 可驗證正式打包，`pnpm check` 進行型別檢查，`node scripts/validateCurriculum.mjs` 可核對題庫的 Topic 數量與引擎型別。

## 四種遊戲引擎

| 引擎 | 遊玩方式 | 適用內容 |
|---|---|---|
| 選擇競速 | 單選快答，答對推進賽車 | 計算、單字、量詞、成語 |
| 文字拆解／拼圖 | 按正確順序點選文字或字母 | 句子重組、拼寫、數字排序 |
| RPG 怪物對戰 | 以正確知識發動技能 | 文言文、時態、分數概念 |
| 寶箱密碼鎖 | 輸入推導後的答案 | 方程、幾何、語文填空 |

所有關卡共用全域 XP、每局三顆生命、三秒錯題解析及結算戰報。每答對一題增加 10 XP。

## 示範關卡

開啟以下查詢參數可直接載入指定引擎：`?demo=race`、`?demo=puzzle`、`?demo=rpg`、`?demo=chest`。
