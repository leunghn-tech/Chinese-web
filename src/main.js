/* 青柚書院：以原生 JavaScript 驅動的書頁式學習卡、即時回饋遊戲與可見學習進度。 */

const classicalUnits = [
  { id: "ren", label: "論語", title: "《論語》論仁", summary: "仁的核心是「愛人」；由克己復禮、推己及人到終身守仁。", points: ["仁的本質是愛人。", "實踐仁須克己復禮，並做到「己所不欲，勿施於人」。", "君子須臾不離仁；志士仁人可「殺身成仁」。"] },
  { id: "xiao", label: "論語", title: "《論語》論孝", summary: "孝不只是供養，更以敬、禮、體念和珍惜父母為本。", points: ["孝須發自內心的恭敬，不可只養不敬。", "生事死葬皆要合禮。", "遠遊必有方，並懂得體念父母、珍惜相處。"] },
  { id: "junzi", label: "論語", title: "《論語》論君子", summary: "以義為本、嚴於律己、和而不同，是君子的人格標準。", points: ["君子喻於義，小人喻於利。", "君子求諸己，成人之美，和而不同。", "以義為質、以禮行之、以遜出之、以信成之。"] },
  { id: "fish", label: "先秦諸子", title: "《孟子．魚我所欲也》", summary: "以魚與熊掌為喻，闡明義比生命重要，當捨生取義。", points: ["中心觀點是「捨生取義」。", "人人皆有本心，賢人能保持而不喪失。", "批評見利忘義、失其本心的人。"] },
  { id: "xiaoyao", label: "先秦諸子", title: "《莊子．逍遙遊》（節錄）", summary: "真正逍遙在於無所待：超越依賴與執念，順應自然。", points: ["鯤鵬、小大之辨引出境界差異。", "即使列子仍有所待，未達真正自由。", "至人無己、神人無功、聖人無名。"] },
  { id: "persuade", label: "先秦諸子", title: "《荀子．勸學》（節錄）", summary: "後天學習能超越先天限制；關鍵是積累、堅持、專一與善假。", points: ["「青出於藍」說明學習可使人進步。", "善假輿馬舟楫，懂得借助外物。", "「鍥而不舍」與「用心一也」說明堅持和專一。"] },
  { id: "lianpo", label: "史傳", title: "《廉頗藺相如列傳》（節錄）", summary: "藺相如以智勇完璧歸趙，維護國家尊嚴與利益。", points: ["故事聚焦「完璧歸趙」。", "藺相如沉著機智、不畏強秦、不辱使命。", "表現「先國家之急而後私讎」的愛國精神。"] },
  { id: "chushi", label: "奏議", title: "諸葛亮《出師表》", summary: "北伐前向後主陳情勸諫，表達報先帝、忠陛下與興復漢室的決心。", points: ["勸後主廣開言路、賞罰分明、親賢遠佞。", "追述自身經歷，抒發感恩與忠誠。", "以北定中原、興復漢室為決心。"] },
  { id: "shishuo", label: "議論", title: "韓愈《師說》", summary: "從師是解惑明道之路；擇師要看道，不受年齡與地位限制。", points: ["老師的職責是傳道、受業、解惑。", "「道之所存，師之所存」是擇師標準。", "批判士大夫以從師為恥的風氣。"] },
  { id: "xishan", label: "遊記", title: "柳宗元《始得西山宴遊記》", summary: "由被貶的惴慄到登西山後物我冥合，從自然中獲得精神解脫。", points: ["「始得」既指發現西山，也指心靈覺醒。", "由恆惴慄轉為「心凝形釋，與萬化冥合」。", "寄寓不與培塿為類的高潔品格。"] },
  { id: "sixstates", label: "議論", title: "蘇洵《六國論》", summary: "六國破滅，弊在賂秦；割地求和只會加速滅亡。", points: ["以「抱薪救火」比喻賂秦的後果。", "不賂者亦因賂者而亡。", "借古諷今，告誡北宋勿重蹈覆轍。"] },
  { id: "mountain", label: "詩歌", title: "王維《山居秋暝》", summary: "清幽秋山中動靜相映，寄託高潔情懷與歸隱之志。", points: ["明月松間照、清泉石上流，構成清幽畫面。", "竹喧、蓮動以動襯靜。", "「王孫自可留」反用典故，表達歸隱。"] },
  { id: "moon", label: "詩歌", title: "李白《月下獨酌》（其一）", summary: "以浪漫想像邀月伴影，在孤獨中自我開解，走向超脫。", points: ["「獨酌無相親」點出孤獨。", "「對影成三人」以想像消解孤獨。", "表現孤高自許、善於自解的曠達。"] },
  { id: "nian", label: "詞", title: "蘇軾《念奴嬌．赤壁懷古》", summary: "寫赤壁壯闊之景，懷想周瑜，感嘆人生與歷史。", points: ["上闋寫大江、亂石、驚濤，氣勢雄偉。", "下闋遙想周瑜英姿，借古抒懷。", "以「人生如夢」抒發曠達中的感慨。"] },
  { id: "sheng", label: "詞", title: "李清照《聲聲慢．秋情》", summary: "層層寫秋日孤寂，寄寓個人愁苦與國破家亡之痛。", points: ["「尋尋覓覓」寫內心若有所失。", "疊字營造淒清節奏，深化愁緒。", "雁、黃花、梧桐細雨都是觸發愁情的意象。"] },
];

const techniques = [
  { id: "metaphor", label: "修辭", title: "比喻", summary: "用相似的事物打比方，令抽象感受變得具體可感。", points: ["由本體、喻體、喻詞構成。", "看相似關係，不是見到「像」便一定是比喻。", "可把靜態畫面寫活。"] },
  { id: "metonymy", label: "修辭", title: "借代", summary: "用相關的事物代替本體，不直接說出原名。", points: ["借代靠相關，不是相似。", "可用部分代整體、具體代抽象。", "要與借喻仔細分辨。"] },
  { id: "couplet", label: "修辭", title: "對偶", summary: "兩句字數相等、結構相同，意思相對或相近。", points: ["限於兩句，與三句或以上的排比不同。", "能形成整齊節奏。", "常令說理精警、畫面凝練。"] },
  { id: "parallel", label: "修辭", title: "排比", summary: "三句或以上結構相同、語氣一致的句子並列。", points: ["重點是並列句式與語勢。", "可層層強調，增強氣勢。", "不要只指出重複，應說明其內容效果。"] },
  { id: "rhetorical", label: "修辭", title: "反問", summary: "明知故問，答案藏在問句中，用以加強語氣。", points: ["反問不需要自答。", "與設問的自問自答不同。", "能令立場更有力度。"] },
  { id: "question", label: "修辭", title: "設問", summary: "先提出問題，再自行回答，以引起注意和引導思考。", points: ["設問必須有答案。", "常用於段首引出內容。", "使說理更清晰。"] },
  { id: "contrast", label: "修辭", title: "對比", summary: "把相反或相對的事物／情況並列，突出差異。", points: ["雙方沒有主次之分。", "可同時帶出批判與頌揚。", "要和有主次的襯托區分。"] },
  { id: "personification", label: "修辭", title: "擬人", summary: "把物當作人來寫，賦予人的動作或情感。", points: ["不會另列一個喻體。", "能使景物生動有情。", "與比喻的相似關係不同。"] },
  { id: "symbol", label: "表現", title: "象徵", summary: "用具體事物代表抽象概念或精神，意義多由全文賦予。", points: ["象徵義在篇章中較穩定。", "與句子層面的比喻不同。", "要由物象連回主題。"] },
  { id: "foil", label: "表現", title: "襯托", summary: "用次要事物烘托主要事物；可分正襯與反襯。", points: ["襯托有主次之分。", "正襯為同向烘托。", "反襯以相反情況突出主體。"] },
  { id: "scene", label: "表現", title: "借景抒情", summary: "借景物抒發情感，可分融情入景與觸景生情。", points: ["融情入景是先有情再選景。", "觸景生情是先見景後生情。", "答題須指出景、情及兩者關係。"] },
  { id: "blend", label: "表現", title: "情景交融", summary: "景中有情、情中有景，二者密不可分。", points: ["景情如水乳交融。", "不只單向借景抒情。", "可令情感含蓄而深厚。"] },
  { id: "object", label: "表現", title: "托物言志", summary: "借具體事物表達志趣、理想或品格。", points: ["核心是「志」：操守、抱負或理想。", "和借物抒情的「情」不同。", "例：蓮可寄託不隨俗流的高潔志向。"] },
  { id: "small", label: "表現", title: "以小見大", summary: "從細微小事或尋常物件，反映時代主題或人生哲理。", points: ["由小切入而見大主題。", "並非小題大做。", "常見於散文與記敘文。"] },
  { id: "suppress", label: "表現", title: "欲揚先抑", summary: "先壓低、貶抑，再抬高、頌揚，形成情感反差。", points: ["有明確先後次序。", "前抑後揚，主次分明。", "可突出最終讚揚並增加張力。"] },
  { id: "ending", label: "結構", title: "卒章顯志", summary: "在文章結尾點明主旨或深意。", points: ["重點是結尾揭示主旨。", "與首尾呼應的前後照應不同。", "有收束全文、深化題旨之效。"] },
];

const matchPairs = [
  { term: "象徵", definition: "用具體事物代表抽象概念或精神，意義多由全文賦予。" },
  { term: "襯托", definition: "用次要事物烘托主要事物，有正襯與反襯。" },
  { term: "借景抒情", definition: "借景物抒發情感；可辨融情入景與觸景生情。" },
  { term: "托物言志", definition: "借具體事物表達志趣、理想或品格，重點在「志」。" },
  { term: "設問", definition: "先提出問題，再自行回答，以引起注意和引導思考。" },
];

const quiz = [
  { q: "《孟子．魚我所欲也》以「魚與熊掌」為喻，中心觀點是甚麼？", options: ["因利忘義", "捨生取義", "安於貧困", "以小見大"], answer: 1, note: "筆記指出：本文以魚與熊掌為喻，論證道義比生命更重要，中心是「捨生取義」。" },
  { q: "《師說》提出的擇師核心標準是甚麼？", options: ["年齡較長", "地位較高", "道之所在", "名聲較大"], answer: 2, note: "韓愈認為「道之所存，師之所存」，年齡和地位都不是唯一準則。" },
  { q: "《山居秋暝》中，哪一組詩句以動襯靜？", options: ["空山新雨後，天氣晚來秋", "明月松間照，清泉石上流", "竹喧歸浣女，蓮動下漁舟", "隨意春芳歇，王孫自可留"], answer: 2, note: "浣女歸來的竹喧、漁舟返航的蓮動，反襯山間幽靜。" },
  { q: "下列哪一項最符合「反問」的定義？", options: ["先問後答，引導讀者思考", "明知故問，答案藏於問句中以加強語氣", "把兩個相反事物並列", "把人的情感投射到景物"], answer: 1, note: "設問需要自問自答；反問的答案已在問句內，用來加強語氣。" },
  { q: "閱讀理解答題的「黃金三步」正確次序是？", options: ["認手法 → 找證據 → 講作用", "講作用 → 認手法 → 找證據", "找證據 → 背定義 → 寫感想", "列主旨 → 查字典 → 選例子"], answer: 0, note: "筆記明示：先認手法，再扣文本證據，最後說明內容、情感或結構作用。" },
];

const app = document.querySelector("#app");
let store = JSON.parse(localStorage.getItem("qingyou-progress-v1") || "null") || { read: [], matched: false, quizDone: false, quizIndex: 0, quizScore: 0 };
let activeTab = "classical";
let selectedTerm = null;
let matchedTerms = new Set();
let quizAnswered = false;

function progressPercent() {
  const totalRead = classicalUnits.length + techniques.length;
  return Math.min(100, Math.round((store.read.length / totalRead) * 60 + (store.matched ? 20 : 0) + (store.quizDone ? 20 : 0)));
}
function save() { localStorage.setItem("qingyou-progress-v1", JSON.stringify(store)); }
function unitCard(unit) {
  const complete = store.read.includes(unit.id);
  const featured = ["ren", "fish", "lianpo", "mountain", "metaphor", "symbol", "object"].includes(unit.id);
  return `<button class="topic-card ${complete ? "is-complete" : ""} ${featured ? "is-featured" : ""}" type="button" data-unit="${unit.id}" aria-expanded="false">
    <span class="card-top"><span class="topic-pill">${unit.label}</span><span class="card-status">${complete ? "已研讀 ✓" : "點擊研讀"}</span></span>
    <h3>${unit.title}</h3><p class="summary">${unit.summary}</p>
    <div class="topic-detail"><ul>${unit.points.map((point) => `<li>${point}</li>`).join("")}</ul></div>
    <span class="card-foot">${complete ? "重溫重點 ↗" : "展開三個重點 →"}</span>
  </button>`;
}
function renderStudy() {
  const units = activeTab === "classical" ? classicalUnits : techniques;
  const query = document.querySelector("#study-search")?.value.trim().toLowerCase() || "";
  const shown = units.filter((unit) => `${unit.title} ${unit.summary} ${unit.points.join(" ")}`.toLowerCase().includes(query));
  const routeStops = activeTab === "classical"
    ? [{ index: 0, title: "第一站・修身與選擇", note: "由仁、孝、君子到義，先建立價值核心。" }, { index: 3, title: "第二站・諸子思辨", note: "以魚熊、小大、勸學，看見不同的生命視角。" }, { index: 6, title: "第三站・史傳與議論", note: "把人物品格、忠誠、求師與國事寫成可分析的證據。" }, { index: 11, title: "第四站・山水與詞情", note: "從景物、想像到懷古與愁情，練習讀出言外之意。" }]
    : [{ index: 0, title: "第一站・修辭辨認", note: "先讀懂句子如何把畫面、語氣和節奏寫出來。" }, { index: 8, title: "第二站・表現手法", note: "由物象、景物和材料，推回作者真正想說的主題。" }, { index: 15, title: "第三站・篇章收束", note: "辨別文章在結尾如何點明與深化主旨。" }];
  const routeMarkup = (stop) => `<div class="route-stop"><span class="leaf-book" aria-hidden="true"><i></i><i></i><i></i><i></i></span><div><strong>${stop.title}</strong><span>${stop.note}</span></div><small>ROUTE NODE</small></div>`;
  document.querySelector("#study-grid").innerHTML = shown.length ? shown.map((unit, index) => `${routeStops.find((stop) => stop.index === index) ? routeMarkup(routeStops.find((stop) => stop.index === index)) : ""}${unitCard(unit)}`).join("") : `<p class="empty-message">找不到相關重點。試試搜尋「仁」、「借景」或「對比」。</p>`;
  document.querySelector("#study-count").textContent = `顯示 ${shown.length} 項`;
  document.querySelectorAll(".topic-card").forEach((card) => card.addEventListener("click", () => {
    const id = card.dataset.unit;
    const isOpen = card.classList.toggle("is-open");
    card.setAttribute("aria-expanded", String(isOpen));
    if (!store.read.includes(id)) { store.read.push(id); save(); updateProgress(); renderStudy(); }
  }));
}
function renderMatching() {
  const definitions = [...matchPairs].sort((a, b) => (a.term > b.term ? 1 : -1));
  document.querySelector("#match-terms").innerHTML = matchPairs.map((pair) => `<button class="match-choice ${selectedTerm === pair.term ? "selected" : ""} ${matchedTerms.has(pair.term) ? "matched" : ""}" type="button" data-term="${pair.term}" ${matchedTerms.has(pair.term) ? "disabled" : ""}>${pair.term}</button>`).join("");
  document.querySelector("#match-definitions").innerHTML = definitions.map((pair) => `<button class="match-choice ${matchedTerms.has(pair.term) ? "matched" : ""}" type="button" data-definition="${pair.term}" ${matchedTerms.has(pair.term) ? "disabled" : ""}>${pair.definition}</button>`).join("");
  document.querySelectorAll("[data-term]").forEach((button) => button.addEventListener("click", () => { selectedTerm = button.dataset.term; renderMatching(); }));
  document.querySelectorAll("[data-definition]").forEach((button) => button.addEventListener("click", () => {
    const feedback = document.querySelector("#match-feedback");
    if (!selectedTerm) { feedback.textContent = "先選擇左欄的一個手法。"; feedback.className = "game-feedback error"; return; }
    if (button.dataset.definition === selectedTerm) {
      matchedTerms.add(selectedTerm); selectedTerm = null; feedback.textContent = "答對了！把定義和手法連起來，才是真正掌握。"; feedback.className = "game-feedback";
      if (matchedTerms.size === matchPairs.length) { store.matched = true; save(); updateProgress(); document.querySelector("#match-finish").classList.add("visible"); }
    } else { feedback.textContent = "還差一點，回看兩者的核心關係再試。"; feedback.className = "game-feedback error"; selectedTerm = null; }
    renderMatching();
  }));
}
function renderQuiz() {
  const index = Math.min(store.quizIndex, quiz.length - 1); const current = quiz[index];
  document.querySelector("#quiz-counter").textContent = `第 ${index + 1} / ${quiz.length} 題`;
  document.querySelector("#quiz-dots").innerHTML = quiz.map((_, dotIndex) => `<span class="${dotIndex <= index ? "active" : ""}"></span>`).join("");
  document.querySelector("#quiz-question").textContent = current.q;
  document.querySelector("#quiz-options").innerHTML = current.options.map((option, optionIndex) => `<button class="quiz-option" type="button" data-answer="${optionIndex}" data-letter="${String.fromCharCode(65 + optionIndex)}">${option}</button>`).join("");
  document.querySelector("#quiz-explain").textContent = "選擇一個最合適的答案。";
  document.querySelector("#quiz-next").classList.remove("visible"); quizAnswered = false;
  document.querySelectorAll("[data-answer]").forEach((button) => button.addEventListener("click", () => {
    if (quizAnswered) return; quizAnswered = true;
    const picked = Number(button.dataset.answer); const correct = picked === current.answer;
    document.querySelectorAll("[data-answer]").forEach((option) => { option.disabled = true; if (Number(option.dataset.answer) === current.answer) option.classList.add("correct"); });
    if (!correct) button.classList.add("incorrect"); else store.quizScore += 1;
    document.querySelector("#quiz-explain").textContent = `${correct ? "答對！" : "正確答案已標示。"}${current.note}`;
    const next = document.querySelector("#quiz-next"); next.classList.add("visible"); next.textContent = index === quiz.length - 1 ? "查看本輪結果" : "下一題 →";
  }));
}
function updateProgress() {
  const progress = progressPercent(); const totalRead = classicalUnits.length + techniques.length;
  document.querySelectorAll("[data-progress-number]").forEach((node) => node.textContent = progress);
  document.querySelectorAll("[data-progress-bar]").forEach((node) => node.style.width = `${progress}%`);
  document.querySelector("#progress-ring").style.setProperty("--progress", progress);
  document.querySelector("#read-total").textContent = `${store.read.length} / ${totalRead}`;
  document.querySelector("#dash-read").textContent = `${store.read.length} / ${totalRead}`;
  document.querySelector("#dash-game").textContent = `${Number(store.matched) + Number(store.quizDone)} / 2`;
  const badges = [
    [store.read.length >= 1, "badge-first"],
    [store.read.length >= 6, "badge-reader"],
    [store.matched && store.quizDone, "badge-game"],
    [progress >= 100, "badge-star"],
  ];
  badges.forEach(([unlocked, id]) => document.querySelector(`#${id}`).classList.toggle("unlocked", Boolean(unlocked)));
}

app.innerHTML = `
  <div class="site-shell">
    <header class="topbar"><a class="brand" href="#top" aria-label="返回頁首"><span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span><span></span></span><span class="brand-copy"><strong>言點教育</strong><small>燃亮你心・DSE CHINESE STUDY</small></span></a><nav class="topnav" aria-label="主要導覽"><a href="#study">學習區</a><a href="#games">遊戲挑戰</a><a href="#progress">我的進度</a></nav><div class="top-progress"><div class="mini-progress"><span data-progress-bar></span></div><b><span data-progress-number>0</span>% 已完成</b></div></header>
    <main id="main-content">
      <section class="hero" id="top"><div class="hero-copy"><div class="educator-signature"><span class="leaf-book" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span><b>言點教育</b>・<em>燃亮你心</em></span></div><span class="eyebrow">為中學生而設的 DSE 中文溫習</span><h1>把每一篇<br>讀成你的<em>得分點</em></h1><p class="hero-text">從指定文言的主旨與名句，到白話文的寫作手法；用一張張短學習卡、一題題即時回饋，把看似複雜的內容拆成今天就能完成的小勝利。</p><div class="hero-actions"><a class="btn btn-primary" href="#study">由今日重點開始 <span aria-hidden="true">→</span></a><a class="btn btn-quiet" href="#games">先挑戰一題</a></div><div class="hero-proof"><span>已整理</span><strong>12 篇篇章 + 3 則《論語》專題</strong><span>・</span><span>高頻白話手法</span></div><div class="task-rail"><span class="task-badge">1</span><div><strong>下一任務：讀懂「仁」的三層意思</strong><p>打開第一張學習卡，再用自己的話說出：愛人、克己、守仁。</p></div><div class="route-steps"><span>研讀</span><i></i><span>配對</span><i></i><span>小測</span><i></i><span>徽章</span></div></div></div><div class="hero-art" aria-label="開啟的中文筆記本插畫"><div class="desk-shadow"></div><div class="open-book"><div class="page"><div class="ink-stroke medium"></div><div class="ink-stroke short"></div><div class="ink-stroke"></div><div class="ink-stroke green"></div></div><div class="page"><div class="ink-stroke short"></div><div class="ink-stroke"></div><div class="ink-stroke medium"></div><div class="ink-stroke green"></div></div></div><div class="floating-note note-one">認手法<br>找證據<br>講作用</div><div class="floating-note note-two">仁・義・志<br>一頁一重點</div></div></section>
      <section class="dashboard-strip" aria-label="今日學習概況"><div class="dash-cell"><h2>今日主線：由意象到答題</h2><p>先用學習卡掌握概念，再在遊戲中測試自己能否分辨手法與主旨。</p></div><div class="dash-cell"><span class="dash-value" id="dash-read">0 / 31</span><p>已研讀學習卡</p></div><div class="dash-cell"><span class="dash-value" id="dash-game">0 / 2</span><p>已完成挑戰</p></div></section>
      <section class="section study-section" id="study"><div class="section-head"><div><span class="section-label">01 / 學習區</span><h2>把長篇筆記，<br>折成一頁一重點。</h2><span class="margin-note">先抓主旨，再背證據</span></div><p>內容按你上載的《指定文言經典篇章精讀》及《白話文手法大全》整理。點開卡片即記錄為已研讀；先讀摘要，再用三個提示把關鍵概念說成自己的話。</p></div><div class="route-marker"><i></i><b>今日閱讀架</b><span></span><span>帶折角的卡是必記重點</span></div><div class="study-toolrow"><div class="tabs" role="tablist" aria-label="內容類別"><button class="tab" type="button" role="tab" data-tab="classical" aria-selected="true">指定文言精讀</button><button class="tab" type="button" role="tab" data-tab="techniques" aria-selected="false">白話寫作手法</button></div><label class="search-box"><input id="study-search" type="search" placeholder="搜尋篇章或手法" aria-label="搜尋篇章或手法" /></label></div><div class="study-meta"><span id="study-count">顯示 15 項</span><span>研讀進度：<strong id="read-total">0 / 31</strong></span></div><div class="study-grid" id="study-grid"></div></section>
      <section class="section game-section" id="games"><div class="section-head"><div><span class="section-label">02 / 遊戲挑戰區</span><h2>不是死背，<br>是把判斷練成反射。</h2><span class="margin-note">錯題提示就是下一次的得分點</span></div><p>每一題都回扣筆記中的定義、篇章主旨或答題方法。錯了並不扣分：看回提示，再作一次有根據的選擇。</p></div><div class="route-marker"><i></i><b>第二站：主動提取</b><span></span><span>先配對，再快問快答</span></div><div class="game-deck"><article class="game-card"><div class="game-kicker">MATCH / 配對挑戰</div><h3>手法連連看</h3><p>先選左欄手法，再選右欄最貼切的定義。全部配對成功，即完成本關。</p><div class="match-board"><div class="match-column" id="match-terms"></div><div class="match-column" id="match-definitions"></div></div><p class="game-feedback" id="match-feedback" aria-live="polite">從左欄揀一個手法開始。</p><div class="game-finish" id="match-finish">完成配對！你已解鎖「概念連線」的 20% 進度。</div></article><article class="game-card"><div class="game-kicker">QUICK QUIZ / 快問快答</div><h3>30 秒小測</h3><p>5 題內完成一輪：篇章、手法與答題策略混合出題。</p><div class="quiz-progress"><span id="quiz-counter"></span><div class="quiz-dots" id="quiz-dots"></div></div><div class="quiz-question" id="quiz-question"></div><div class="quiz-options" id="quiz-options"></div><div class="quiz-explain" id="quiz-explain" aria-live="polite"></div><button class="btn btn-primary quiz-next" id="quiz-next" type="button"></button></article></div></section>
      <section class="section progress-section" id="progress"><div class="progress-layout"><div><div class="progress-ring" id="progress-ring" style="--progress: 0"><div class="progress-number"><strong data-progress-number>0</strong><span>研習完成度</span></div><span class="progress-leaf-mark" aria-hidden="true"><span class="leaf-book"><i></i><i></i><i></i><i></i></span></span></div></div><div class="progress-copy"><span class="section-label">03 / 學習進度</span><h2>每次回來，<br>都看得見自己前進。</h2><span class="margin-note">把完成感留在今天</span><p>你的進度只儲存在這部裝置上。研讀學習卡可累積 60%，完成兩個遊戲各得 20%。把三種行動串起來，才是有節奏的溫習。</p><div class="route-marker"><i></i><b>第三站：收集徽章</b><span></span><span>讓看過變成記得</span></div><div class="badge-list"><div class="badge" id="badge-first"><span class="badge-icon">一</span><div><strong>初探文海</strong><span>研讀第一張學習卡</span></div></div><div class="badge" id="badge-reader"><span class="badge-icon">六</span><div><strong>古文旅人</strong><span>研讀至少六張學習卡</span></div></div><div class="badge" id="badge-game"><span class="badge-icon">答</span><div><strong>判斷高手</strong><span>完成兩個遊戲挑戰</span></div></div><div class="badge" id="badge-star"><span class="badge-icon">星</span><div><strong>奪星準備</strong><span>完成全部研習任務</span></div></div></div><button type="button" class="reset-btn" id="reset-progress">重設此裝置的學習進度</button></div></div></section>
      <section class="study-tip"><div class="study-tip-inner"><div><h2>答題時，別只寫出術語。</h2><p>用「文中運用＿＿寫＿＿，突出＿＿，從而表達／深化＿＿。」把手法、證據和效果連成完整答案。</p></div><a class="btn" href="#study">回到學習卡</a></div></section>
    </main>
    <footer class="footer"><p>言點教育．燃亮你心・繁體中文學習內容</p><p>資料根據所上載的指定文言與白話文寫作手法筆記整理。</p></footer>
  </div>`;

document.querySelectorAll("[data-tab]").forEach((button) => button.addEventListener("click", () => { activeTab = button.dataset.tab; document.querySelectorAll("[data-tab]").forEach((tab) => tab.setAttribute("aria-selected", String(tab === button))); document.querySelector("#study-search").value = ""; renderStudy(); }));
document.querySelector("#study-search").addEventListener("input", renderStudy);
document.querySelector("#quiz-next").addEventListener("click", () => { if (store.quizIndex >= quiz.length - 1) { store.quizDone = true; store.quizIndex = 0; save(); updateProgress(); renderQuiz(); document.querySelector("#quiz-explain").textContent = `本輪完成！你答對 ${store.quizScore} 題。可再玩一次，鞏固概念。`; store.quizScore = 0; } else { store.quizIndex += 1; save(); renderQuiz(); } });
document.querySelector("#reset-progress").addEventListener("click", () => { if (window.confirm("確定要重設這部裝置的學習進度嗎？")) { store = { read: [], matched: false, quizDone: false, quizIndex: 0, quizScore: 0 }; matchedTerms = new Set(); selectedTerm = null; save(); updateProgress(); renderStudy(); renderMatching(); renderQuiz(); document.querySelector("#match-finish").classList.remove("visible"); } });

renderStudy(); renderMatching(); renderQuiz(); updateProgress();
