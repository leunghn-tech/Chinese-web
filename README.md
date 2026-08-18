# EduQuest 邊學邊玩

EduQuest 是以 React、Vite、Tailwind CSS 和 Lucide Icons 製作的遊戲化互動教學 SPA。平台覆蓋 P1 至 S6 的中文、英文和數學，並以單一 `client/src/data/curriculumDB.json` 資料庫驅動 180 個可玩 Topic。

## 啟動方式

在專案根目錄執行 `pnpm install`，然後執行 `pnpm dev` 開啟本地預覽。`pnpm build` 可驗證正式打包，`pnpm check` 進行型別檢查；`node scripts/validateCurriculum.mjs` 會核對題庫總數、科目、年級和引擎型別。

## 遊戲系統

平台包含選擇競速、文字拆解／拼圖、RPG 怪物對戰及寶箱密碼鎖四個可重用遊戲引擎。所有引擎共用全域 XP、每局三顆生命、答錯三秒解析、Game Over 和結算戰報。每答對一題增加 10 XP。

## 示範關卡

可在網址附上 `?demo=race`、`?demo=puzzle`、`?demo=rpg` 或 `?demo=chest`，直接開啟指定遊戲引擎的示範題目。
