# EduQuest 題庫擴充架構

EduQuest 採用 **一個 Vite／React 入口 + 每級獨立題庫資料模組**，而不是為每一級、每一單元建立獨立 HTML 頁。`client/index.html` 只負責載入網站和字體；首頁、選關、目錄與練習畫面由 `client/src/App.jsx` 管理，避免重複的頁面結構和樣式。

| 位置 | 角色 | 日後擴充方式 |
| --- | --- | --- |
| `client/index.html` | 網站啟動入口與基本 SEO 資訊 | 通常不需為題目改動 |
| `client/src/App.jsx` | 首頁、年級選關、課程目錄與共用畫面流程 | 僅在新增全新互動流程時調整 |
| `client/src/data/questionBanks/chinese/p1.js` 至 `p6.js` | 各級中文單元與題目資料 | 逐級、逐單元加入真實題目 |
| `client/src/data/questionBanks/chinese/index.js` | 各級題庫統一匯出 | 新增年級或題庫類別時更新索引 |

每條題目資料將保留在所屬年級檔案的 `questions` 陣列中。下一步可從 P1 的第一個單元開始，逐題加入題幹、選項、正解、解析和所需互動類型；其他年級檔案不會受到影響。
