import { mkdir, writeFile } from 'node:fs/promises';
import { makePrimaryChineseQuestions } from './primaryChineseContent.mjs';

const grades = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6'];
const engines = ['race', 'puzzle', 'rpg', 'chest', 'race'];
const icons = ['Gauge', 'Puzzle', 'Shield', 'LockKeyhole', 'Sparkles'];
const choice = (prompt, options, answerIndex, explanation, extra = {}) => ({ type: 'choice', prompt, options, answerIndex, explanation, ...extra });
const puzzle = (prompt, tokens, correctOrder, explanation, extra = {}) => ({ type: 'puzzle', prompt, tokens, correctOrder, explanation, ...extra });
const text = (prompt, answer, hint, explanation, extra = {}) => ({ type: 'text', prompt, answer, hint, explanation, ...extra });

const chineseMap = {
  P1:['常用字、標點與生活語文','完整句子表達','兒歌與童話閱讀','看圖寫句','生活禮貌與簡單應用'], P2:['故事順序與重點','四素句寫作','寓言與因果閱讀','標點符號運用','賀卡、通知與生活應用'], P3:['記敍文主旨與細節','段落結構與閱讀策略','日記與書信寫作','比喻與擬人','成語、古詩與生活表達'], P4:['散文與說明文閱讀','中心思想與寫作目的','人物景物描寫','排比、反問與修改文章','段落寫作與修辭應用'], P5:['小說、劇本與科普閱讀','篇章結構與過渡','議論文論點論據','說明方法與修辭效果','說明與議論寫作應用'], P6:['閱讀策略與篇章理解','夾敍夾議寫作','實用文與演講辭','論證與建議寫作','專題研習與資料表達'],
  S1:['白話與論語閱讀','記敍描寫與抒情','比喻擬人排比對偶','唐詩宋詞與現代散文','儒家思想與傳統美德'], S2:['世說新語與篇章結構','說明文與議論文','舉例對比比喻論證','文言虛詞與實詞','水滸傳選段與辯論'], S3:['多文體比較閱讀','實用文報告與評論','史記選段與寫作風格','現代詩散文與古典詩詞','文化精神與高階思維'], S4:['DSE白話文閱讀','DSE文言文詞句翻譯','指定篇章研讀','長文寫作立意與結構','實用文寫作'], S5:['DSE閱讀手法與評價','文言文文化內涵','情境寫作與選材','聆聽資訊與立場','綜合能力資料篩選'], S6:['DSE閱讀比較與推論','指定篇章整合','長文語言與修辭','說話討論與短講','綜合寫作與應試策略'],
};
const englishMap = {
  P1:['Phonics and Alphabet','Classroom Instructions','Family Animals Food Vocabulary','I am He is She is','Picture Book Reading'], P2:['High-frequency Words and Phonics','Present Continuous','Likes and Questions','School Weather Actions Vocabulary','Simple Story Writing'], P3:['Past Tense and Comparatives','People Places Transport','Connectors and but because','Postcards and Diaries','Information Text Reading'], P4:['Past Tense and Future Forms','Modal Verbs','Stories Letters Reports','Health Environment Travel','Fact and Opinion'], P5:['Past Continuous','Comparatives Superlatives and Connectors','Explanatory and Narrative Writing','Technology Culture Nature Vocabulary','Purpose Main Ideas and Details'], P6:['Present Perfect and Basic Passive','Simple Relative Clauses','Academic Vocabulary','Novel Drama Poetry Reading','Persuasive Writing and Editing'],
  S1:['Text Main Ideas and Details','Tense Consistency','Modal Verbs Questions and Negatives','School Family Food Vocabulary','Paragraphs Letters and Stories'], S2:['Fact Opinion and Devices','Present Perfect and Passive','Reported Speech','Environment Technology Health','Narrative Explanatory Opinion Writing'], S3:['Author Purpose and Tone','First and Second Conditionals','Relative Clauses Gerunds Infinitives','Advanced Passive Voice','Reports and Proposals'], S4:['DSE Reading Skills','Practical Writing','Narrative Descriptive Writing','Listening and Integrated Tasks','Discussion and Individual Response'], S5:['Inference and Word Meaning','Email Report Review Writing','Argumentative Writing','Integrated Source Selection','Speaking Interaction'], S6:['DSE Multi-text Reading','Genre Register and Organisation','Extended Writing','Listening Integration','Group Discussion Strategy'],
};
const mathMap = {
  P1:[['1–100與位值','Numbers 1–100 and Place Value'],['兩位數加減','Two-digit Addition and Subtraction'],['基本平面與立體圖形','Basic 2D and 3D Shapes'],['長度時間與日期','Length Time and Dates'],['象形圖與簡單規律','Pictographs and Simple Patterns']], P2:[['1000以內與乘除初步','Numbers to 1000 and Early Multiplication Division'],['2、5、10乘法表','2 5 10 Times Tables'],['角與平行垂直','Angles Parallel and Perpendicular Lines'],['長度重量與時間','Length Mass and Time'],['棒形圖與符號規律','Bar Charts and Symbolic Patterns']], P3:[['四位數與乘除','Four-digit Numbers and Operations'],['分數與小數初步','Introduction to Fractions and Decimals'],['三角形四邊形與周長','Triangles Quadrilaterals and Perimeter'],['容量面積與秒','Capacity Area and Seconds'],['統計表與簡單方程','Data Tables and Simple Equations']], P4:[['大數乘除與因數倍數','Large Numbers Operations Factors Multiples'],['同分母分數與小數加減','Like Fractions and Decimal Addition Subtraction'],['對稱角與周長面積','Symmetry Angles Perimeter Area'],['單位換算','Unit Conversion'],['折線圖與代數式','Line Graphs and Algebraic Expressions']], P5:[['分數小數百分數','Fractions Decimals Percentages'],['平均數與質合數','Mean Prime and Composite Numbers'],['平行四邊形梯形面積','Areas of Parallelograms and Trapezia'],['體積與24小時制','Volume and 24-hour Time'],['圓形圖與一元方程','Pie Charts and Linear Equations']], P6:[['分數四則與比比例','Fraction Operations Ratio Proportion'],['圓與角度','Circles and Angles'],['速度體積表面積','Speed Volume Surface Area'],['平均數中位數','Mean and Median'],['公式代入與方程應用','Substitution and Equation Applications']],
  S1:[['整數分數與百分數','Integers Fractions and Percentages'],['比比例與有理數','Ratio Proportion and Rational Numbers'],['代數式與一元一次方程','Algebraic Expressions and Linear Equations'],['角三角形與四邊形','Angles Triangles and Quadrilaterals'],['圖表與集中趨勢','Data Displays and Central Tendency']], S2:[['二元一次方程','Simultaneous Linear Equations'],['展開因式分解與不等式','Expansion Factorisation and Inequalities'],['畢氏定理與相似三角形','Pythagoras and Similar Triangles'],['面積體積與幾何應用','Area Volume and Geometric Applications'],['概率與統計圖表','Probability and Statistical Graphs']], S3:[['一元一次方程應用','Applications of Linear Equations'],['因式分解指數律與根式','Factorisation Indices and Surds'],['三角比圓與幾何證明','Trigonometry Circles and Geometric Proof'],['圓錐球體與體積','Cones Spheres Area and Volume'],['概率計算與統計誤用','Probability Calculation and Statistical Misuse']], S4:[['指數與對數函數','Exponential and Logarithmic Functions'],['二次函數與多項式','Quadratic Functions and Polynomials'],['方程不等式與數列','Equations Inequalities and Sequences'],['直線圓與三角學','Lines Circles and Trigonometry'],['排列組合與概率','Permutations Combinations and Probability']], S5:[['對數與增長','Logarithms and Growth'],['函數與多項式方程','Functions and Polynomial Equations'],['坐標幾何與軌跡','Coordinate Geometry and Loci'],['三維空間幾何','Three-dimensional Geometry'],['統計抽樣與離差','Statistics Sampling and Dispersion']], S6:[['DSE代數整合','DSE Algebra Consolidation'],['DSE三角學與幾何','DSE Trigonometry and Geometry'],['DSE概率與統計','DSE Probability and Statistics'],['數學建模','Mathematical Modelling'],['DSE綜合解難','DSE Mixed Problem Solving']],
};

const chineseBase = [
  ['下列哪項最能幫助找出篇章主旨？',['綜合題目、重點句和全文內容','只看第一個字','只數標點','跳過所有段落'],0,'主旨要從題目、中心句、段意和全文內容綜合判斷。'],['「比喻」的主要作用是甚麼？',['以具體事物說明抽象內容，使形象鮮明','把句子變短','只列出數字','重複詞語'],0,'比喻能令表達更生動具體。'],['議論文要令觀點有說服力，應加入甚麼？',['合適論據和例子','無關故事','重複句子','沒有根據的結論'],0,'論點要有論據支持。'],['「雖然下雨，＿＿我們仍出發。」應填甚麼？',['但是','所以','因為','因此'],0,'「雖然……但是……」表示轉折。'],['文言文翻譯最重要的是甚麼？',['理解詞義句式並通順表達','逐字照搬','只翻標點','任意增添情節'],0,'翻譯要忠實、通順。'],['聆聽演講時，哪種做法有效？',['記錄關鍵詞並歸納','只看窗外','忽略目的','只記第一句'],0,'關鍵詞有助歸納要點。'],['實用文首先注意甚麼？',['目的、對象和格式','只追求字數','一定用古文','不需稱謂'],0,'實用文須切合目的、對象及格式。'],['「己所不欲，勿施於人」強調甚麼？',['推己及人、尊重別人','只顧自己','做事越快越好','甚麼都不做'],0,'意即不把自己不想承受的事強加給別人。'],['修改文章時應檢查甚麼？',['切題、結構、語句和標點','只加感嘆號','刪所有標點','不再閱讀'],0,'修改要兼顧內容、結構和語言。'],['記敍文常交代哪組要素？',['時間、地點、人物、事件','公式、圖表、定理、證明','音標、詞根、詞綴','樣本、母體、組距'],0,'記敍文常交代時間、地點、人物及事件。'],
];
const englishBase = [
  ['Choose the correct verb: “She ___ to school every day.”',['walk','walks','walking','walked'],1,'She is third-person singular, so the present simple verb is walks.'],['Choose the opposite of “ancient”.',['modern','quiet','narrow','honest'],0,'Modern is the opposite of ancient.'],['Which connector shows a reason?',['because','but','although','then'],0,'Because introduces a reason.'],['Choose the best modal verb: “You ___ wear a helmet when cycling.”',['should','would','might','used'],0,'Should is used to give advice.'],['Which sentence is in the past tense?',['They visited the museum.','They visit the museum.','They are visit the museum.','They will visited the museum.'],0,'Visited is the regular past tense form.'],['What is the main purpose of a topic sentence?',['To state the main idea of a paragraph','To list every example','To repeat the title','To end an email'],0,'A topic sentence states a paragraph’s main idea.'],['Choose the correct passive form: “The cake ___ by Tom.”',['was made','made','is making','has make'],0,'The passive voice uses be + past participle.'],['Which word is a noun?',['decision','quickly','beautiful','because'],0,'Decision names a thing or idea.'],['Choose the correct conditional: “If it rains, we ___ inside.”',['will stay','stayed','would stayed','are stay'],0,'The first conditional uses present simple plus will.'],['What should a formal email include?',['A clear subject, greeting, purpose and closing','Only emojis','No paragraphs','A random title'],0,'Formal emails need a clear structure and suitable register.'],
];
function makeLanguagePuzzles(subject, title, gradeIndex) {
  const chineseSets = [
    [['我','今天','去','圖書館'],['我','今天','去','圖書館'],'主語、時間、動詞、地點可組成完整句子。'],
    [['同學們','認真','溫習','功課'],['同學們','認真','溫習','功課'],'先寫主語，再寫動作及受詞。'],
    [['小明','正在','閱讀','故事書'],['小明','正在','閱讀','故事書'],'「正在」放在動詞前表示動作進行中。'],
    [['因為','下雨','所以','帶雨傘'],['因為','下雨','所以','帶雨傘'],'「因為……所以……」表示因果關係。'],
    [['媽媽','煮了','美味的','晚餐'],['媽媽','煮了','美味的','晚餐'],'形容詞「美味的」修飾名詞「晚餐」。'],
    [['我們','一起','愛護','環境'],['我們','一起','愛護','環境'],'主語後接副詞、動詞及受詞。'],
    [['作者','用','比喻','描寫景物'],['作者','用','比喻','描寫景物'],'表達方式可用「用……描寫……」組織。'],
    [['閱讀時','要','抓緊','重點'],['閱讀時','要','抓緊','重點'],'時間短語可放在句首，提出閱讀策略。'],
    [['論點','需要','論據','支持'],['論點','需要','論據','支持'],'議論文中，論點要有論據支持。'],
    [['小組討論','要','回應','別人意見'],['小組討論','要','回應','別人意見'],'說話時要聆聽並回應別人意見。'],
  ];
  const englishPrimary = [
    [['I','am','Tom'],['I','am','Tom'],'Use I + am for a self-introduction.'],
    [['Sit','down'],['Sit','down'],'An instruction begins with a base verb.'],
    [['She','is','reading'],['She','is','reading'],'Use She + is + verb-ing.'],
    [['I','like','apples'],['I','like','apples'],'Use I + like + noun to state a preference.'],
    [['We','went','home'],['We','went','home'],'Went is the past tense of go.'],
    [['The','cat','is','small'],['The','cat','is','small'],'The subject comes before the be verb and adjective.'],
    [['I','will','help','you'],['I','will','help','you'],'Use will + base verb for the future.'],
    [['You','should','drink','water'],['You','should','drink','water'],'Use should + base verb for advice.'],
    [['They','are','playing','football'],['They','are','playing','football'],'Use are + verb-ing with they.'],
    [['My','family','is','kind'],['My','family','is','kind'],'A singular subject takes is.'],
  ];
  const englishSecondary = [
    [['The','writer','states','the','main idea'],['The','writer','states','the','main idea'],'A clear subject and verb start the sentence.'],
    [['Students','should','give','reasons'],['Students','should','give','reasons'],'Use should + base verb for advice.'],
    [['She','has','finished','her homework'],['She','has','finished','her homework'],'Present perfect uses has/have + past participle.'],
    [['The','report','was','written','carefully'],['The','report','was','written','carefully'],'Passive voice uses be + past participle.'],
    [['If','it rains','we','will stay inside'],['If','it rains','we','will stay inside'],'First conditional: If + present, will + verb.'],
    [['The','student','who spoke','was confident'],['The','student','who spoke','was confident'],'A relative clause gives extra information about a noun.'],
    [['We','need','to consider','different views'],['We','need','to consider','different views'],'Need to is followed by a base verb.'],
    [['The','speaker','explained','the evidence'],['The','speaker','explained','the evidence'],'A past-tense verb describes a completed action.'],
    [['In','my opinion','the plan','is practical'],['In','my opinion','the plan','is practical'],'A discourse phrase can introduce an opinion.'],
    [['The','group','reached','a conclusion'],['The','group','reached','a conclusion'],'Use past tense to report a completed discussion.'],
  ];
  const sets = subject === '中文' ? chineseSets : gradeIndex < 6 ? englishPrimary : englishSecondary;
  return sets.map(([tokens, correctOrder, explanation], i) => puzzle(`${title}｜第${i + 1}題：${subject === '中文' ? '把詞語排成正確句子。' : 'Arrange the words to make a correct sentence.'}`, tokens, correctOrder, explanation));
}
function makeLanguageVault(subject, title, gradeIndex) {
  const chineseSets = [
    ['句號','一句話說完，可用甚麼標點符號結束？','提示：三個字。','句號表示一句話完結。'],
    ['事件','四素句包括時間、地點、人物和甚麼？','提示：兩個字。','四素句的最後一項是事件。'],
    ['主旨','閱讀篇章時，要找出作者最想表達的中心思想，稱為甚麼？','提示：兩個字。','主旨是篇章最核心的意思。'],
    ['比喻','把一種事物比作另一種事物的修辭手法是甚麼？','提示：兩個字。','比喻能令描寫更生動具體。'],
    ['論據','議論文中，用來支持論點的材料稱為甚麼？','提示：兩個字。','論據可以是事例、數據或道理。'],
    ['過渡','文章中連接上下文、令結構自然的部分稱為甚麼？','提示：兩個字。','過渡能令篇章脈絡更清晰。'],
    ['仁','「仁、義、禮、智、信」中的第一項是甚麼？','提示：一個字。','仁強調關愛他人。'],
    ['翻譯','把文言文準確轉為白話文的工作稱為甚麼？','提示：兩個字。','翻譯要做到忠實和通順。'],
    ['立意','寫作時確定文章中心思想的步驟稱為甚麼？','提示：兩個字。','立意決定文章的方向和深度。'],
    ['歸納','把多項資料整理成要點的思維方法稱為甚麼？','提示：兩個字。','歸納能把零散資料整理為重點。'],
  ];
  const englishPrimary = [
    ['am','Complete: “I ___ a pupil.”','Hint: Use the be verb for I.','I is followed by am.'],
    ['is','Complete: “She ___ my friend.”','Hint: Use the be verb for she.','She is followed by is.'],
    ['reading','Complete: “I am ___ a book.”','Hint: Use verb-ing.','Present continuous uses am/is/are + verb-ing.'],
    ['like','Complete: “I ___ apples.”','Hint: It shows a preference.','Use like to state a preference.'],
    ['went','Complete: “We ___ home yesterday.”','Hint: Past tense of go.','Went is the past tense of go.'],
    ['will','Complete: “I ___ visit Grandma tomorrow.”','Hint: Future helper word.','Will + base verb expresses the future.'],
    ['should','Complete: “You ___ wash your hands.”','Hint: It gives advice.','Should gives advice.'],
    ['because','Complete: “I stayed home ___ it rained.”','Hint: It shows a reason.','Because introduces a reason.'],
    ['books','Complete: “There are three ___.”','Hint: More than one book.','Plural countable nouns usually add -s.'],
    ['happy','Complete: “I am ___ today.”','Hint: It describes a feeling.','Happy is an adjective for a feeling.'],
  ];
  const englishSecondary = [
    ['has','Complete: “She ___ finished her work.”','Hint: Present perfect helper.','She has finished is present perfect.'],
    ['was','Complete: “The letter ___ written yesterday.”','Hint: Passive be verb in past tense.','Was written is passive voice in the past.'],
    ['because','Complete: “The writer agrees ___ the evidence is strong.”','Hint: It introduces a reason.','Because introduces a reason.'],
    ['should','Complete: “Students ___ check their work.”','Hint: It gives advice.','Should is used for advice.'],
    ['will','Complete: “If it rains, we ___ stay inside.”','Hint: First conditional helper.','First conditional uses will + base verb.'],
    ['who','Complete: “The student ___ spoke is confident.”','Hint: Relative pronoun for people.','Who introduces a relative clause about a person.'],
    ['to','Complete: “We need ___ consider both sides.”','Hint: It follows need.','Need to is followed by a base verb.'],
    ['reported','Complete: “The news was ___ clearly.”','Hint: Past participle.','Passive voice uses was + past participle.'],
    ['opinion','Complete: “In my ___, the plan works.”','Hint: It introduces a view.','In my opinion introduces a personal view.'],
    ['conclusion','Complete: “The group reached a ___.”','Hint: A final decision.','A conclusion is the final outcome of a discussion.'],
  ];
  const sets = subject === '中文' ? chineseSets : gradeIndex < 6 ? englishPrimary : englishSecondary;
  return sets.map(([answer, prompt, hint, explanation], i) => text(`${title}｜第${i + 1}題：${prompt}`, answer, hint, explanation));
}
function makeMathQuestion(topic, gradeIndex, i) {
  const bilingual = gradeIndex >= 6; const group = topic.slot; const a = 4 + i + gradeIndex; const b = 2 + (i % 4); const prefix = `${topic.title}｜第${i + 1}題：`;
  if (group === 1) { const p = 10 + i * 5; const answer = p / 100; return choice(`${prefix}${p}% 化為小數是？`, [String(answer),String(answer + .1),String(answer + 1),String(p)], 0, `${p}% = ${p} ÷ 100 = ${answer}。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: ${p}% as a decimal is?`, explanationEn:`${p}% = ${p} ÷ 100 = ${answer}.` } : {}); }
  if (group === 2) { const answer = b + 3; return text(`${prefix}解方程 2x + ${b} = ${2 * answer + b}，輸入 x。`, String(answer), `提示：先減 ${b}，再除以 2。`, `2x = ${2 * answer}，所以 x = ${answer}。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: Solve 2x + ${b} = ${2 * answer + b}. Enter x.`, explanationEn:`2x = ${2 * answer}, so x = ${answer}.` } : {}); }
  if (group === 3) { const base = 5 + i; const height = 4 + (i % 3); const answer = base * height / 2; return choice(`${prefix}底為${base}厘米、高為${height}厘米的三角形面積是？`, [String(answer),String(base * height),String(base + height),String(answer + 2)], 0, `三角形面積 = 底 × 高 ÷ 2 = ${base} × ${height} ÷ 2 = ${answer}平方厘米。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: A triangle has base ${base} cm and height ${height} cm. Its area is?`, explanationEn:`Area = base × height ÷ 2 = ${answer} cm².` } : {}); }
  if (group === 4) { const values = [i + 4, i + 6, i + 8]; const answer = i + 6; return choice(`${prefix}${values.join('、')} 的平均數是？`, [String(answer),String(answer + 1),String(answer - 1),String(values.reduce((x,y)=>x+y,0))], 0, `平均數 = (${values.join(' + ')}) ÷ 3 = ${answer}。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: What is the mean of ${values.join(', ')}?`, explanationEn:`Mean = (${values.join(' + ')}) ÷ 3 = ${answer}.` } : {}); }
  const answer = a + b; return choice(`${prefix}${a} + ${b} = ?`, [String(answer - 1),String(answer),String(answer + 1),String(answer + 2)], 1, `${a} 加 ${b} 等於 ${answer}。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: ${a} + ${b} = ?`, explanationEn:`${a} plus ${b} equals ${answer}.` } : {});
}

const topics = [];
grades.forEach((grade, gradeIndex) => {
  const add = (subject, title, index, titleEn = '') => {
    const bilingual = subject === '數學' && gradeIndex >= 6; const isWritingWorkshop = /^P[1-6]$/.test(grade) && subject === '中文' && index === 3; const topic = { id:`${grade}-${subject}-${index + 1}`, grade, subject, title, titleEn, description:`${grade} ${subject}・${title}課程任務`, engine:isWritingWorkshop ? 'composition' : engines[index], icon:isWritingWorkshop ? 'PenLine' : icons[index], difficulty:gradeIndex < 6 ? '基礎' : gradeIndex < 9 ? '初中' : 'DSE', curriculumArea:title, bilingual, slot:index };
    if (subject === '中文' && gradeIndex < 6) topic.questions = makePrimaryChineseQuestions(grade, index, title);
    else if (subject === '數學') topic.questions = Array.from({length:10},(_,i)=>makeMathQuestionByEngine(topic, gradeIndex, i));
    else if (topic.engine === 'puzzle') topic.questions = makeLanguagePuzzles(subject, title, gradeIndex);
    else if (topic.engine === 'chest') topic.questions = makeLanguageVault(subject, title, gradeIndex);
    else { const base = subject === '中文' ? chineseBase : englishBase; topic.questions = base.map(([stem,options,answerIndex,explanation])=>choice(`${title}｜${stem}`, options, answerIndex, explanation)); }
    topics.push(topic);
  };
  chineseMap[grade].forEach((title,index)=>add('中文',title,index)); englishMap[grade].forEach((title,index)=>add('英文',title,index)); mathMap[grade].forEach(([title,titleEn],index)=>add('數學',title,index,titleEn));
});

function makePrimaryGeometryQuestion(topic, gradeIndex, i) {
  if (gradeIndex === 0) {
    const bank = [
      ['像太陽一樣圓圓的平面圖形是？',['圓形','正方形','三角形','長方形'],0,'圓形沒有角和直邊。'],
      ['有三條邊的平面圖形是？',['正方形','三角形','圓形','長方形'],1,'三角形有三條邊。'],
      ['四條邊一樣長的圖形是？',['長方形','圓形','正方形','三角形'],2,'正方形有四條一樣長的邊。'],
      ['像課本封面的圖形通常是？',['三角形','長方形','圓形','球'],1,'課本封面通常是長方形。'],
      ['像皮球的立體圖形是？',['球','圓柱','圓錐','正方體'],0,'皮球是球形。'],
      ['像汽水罐的立體圖形是？',['球','圓柱','圓錐','長方體'],1,'汽水罐的上下兩面是圓形，屬圓柱。'],
      ['像生日帽的立體圖形是？',['圓錐','圓柱','球','正方體'],0,'生日帽是圓錐形。'],
      ['排隊時，站在同學前面可說在他的哪個方向？',['前','後','左','右'],0,'面向同一方向時，前面在同學的前方。'],
      ['面向黑板時，窗戶在你的左邊，方向是？',['前','後','左','右'],2,'窗戶在左邊，就是左方。'],
      ['面向黑板時，書包在你的右邊，方向是？',['前','後','左','右'],3,'書包在右邊，就是右方。'],
    ]; const [prompt, options, answerIndex, explanation] = bank[i]; return choice(`${topic.title}｜第${i + 1}題：${prompt}`, options, answerIndex, explanation);
  }
  if (gradeIndex === 1) {
    const bank = [
      ['直角是多少度？',['90','45','180','360'],0,'直角是 90°。'],['兩條永不相交而距離相等的直線叫甚麼？',['垂直線','平行線','曲線','斜線'],1,'平行線永不相交且距離相等。'],['兩條直線相交成直角叫甚麼？',['平行線','垂直線','曲線','水平線'],1,'垂直線相交成 90°。'],['三角形有多少條邊？',['2','3','4','5'],1,'三角形有三條邊。'],['四邊形有多少條邊？',['三邊','四邊','五邊','六邊'],1,'四邊形有四條邊。'],['正方形有多少個直角？',['1','2','3','4'],3,'正方形有四個直角。'],['一條線段長 100 厘米，等於多少米？',['1','10','100','1000'],0,'100 厘米等於 1 米。'],['一小時有多少分鐘？',['30','45','60','100'],2,'一小時有 60 分鐘。'],['一星期有多少天？',['5','6','7','8'],2,'一星期有七天。'],['棒形圖最適合比較甚麼？',['類別數量','氣溫變化','字詞意思','故事人物'],0,'棒形圖可清楚比較不同類別的數量。'],
    ]; const [prompt, options, answerIndex, explanation] = bank[i]; return choice(`${topic.title}｜第${i + 1}題：${prompt}`, options, answerIndex, explanation);
  }
  if (gradeIndex === 2) { const length=i+2,width=3; const answer=2*(length+width); return choice(`${topic.title}｜第${i + 1}題：長方形長 ${length} cm、闊 ${width} cm，周長是？`,[String(answer),String(answer+1),String(answer+2),String(answer+3)],0,`周長 = 2 × (${length} + ${width}) = ${answer} cm。`); }
  if (gradeIndex === 3) { const side=i+2; const answer=side*side; return choice(`${topic.title}｜第${i + 1}題：正方形邊長 ${side} cm，面積是？`,[String(answer),String(answer+1),String(answer+2),String(answer+3)],0,`正方形面積 = ${side} × ${side} = ${answer} cm²。`); }
  if (gradeIndex === 4) { const base=i+3,height=2; const answer=base*height; return choice(`${topic.title}｜第${i + 1}題：平行四邊形底 ${base} cm、高 ${height} cm，面積是？`,[String(answer),String(base+height),String(base*height/2),String(answer+2)],0,`平行四邊形面積 = 底 × 高 = ${base} × ${height} = ${answer} cm²。`); }
  const angle=20+i*10; const answer=360-angle; return choice(`${topic.title}｜第${i + 1}題：一個圓的圓心角為 ${angle}°，餘下角度是？`,[String(answer),String(angle),String(answer-5),String(answer-10)],0,`整個圓是 360°，餘下角度 = 360 − ${angle} = ${answer}°。`);
}
function makeMathQuestionByEngine(topic, gradeIndex, i) {
  if (gradeIndex >= 6) return makeSeniorMathQuestion(topic, i);
  const bilingual = gradeIndex >= 6; const number = i + gradeIndex + 6; const extra = bilingual ? { promptEn:'', explanationEn:'' } : {};
  if (topic.engine === 'puzzle') {
    const tokens = [String(number + 4), String(number), String(number + 2)]; const order = [String(number), String(number + 2), String(number + 4)];
    return puzzle(`${topic.title}｜第${i + 1}題：由小至大排列數字。`, tokens, order, `由小至大：${order.join('、')}。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: Arrange the numbers in ascending order.`, explanationEn:`Ascending order: ${order.join(', ')}.` } : extra);
  }
  if (topic.engine === 'chest') {
    const answer = i + 5; const shift = i + 3;
    return text(`${topic.title}｜第${i + 1}題：解 2x + ${shift} = ${answer * 2 + shift}，輸入 x。`, String(answer), `提示：先減 ${shift}，再除以 2。`, `2x = ${answer * 2}，所以 x = ${answer}。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: Solve 2x + ${shift} = ${answer * 2 + shift}. Enter x.`, explanationEn:`2x = ${answer * 2}, so x = ${answer}.` } : extra);
  }
  if (topic.engine === 'rpg') {
    if (gradeIndex < 6) return makePrimaryGeometryQuestion(topic, gradeIndex, i);
    const base = 5 + i; const height = 4 + (i % 3); const answer = base * height / 2;
    return choice(`${topic.title}｜第${i + 1}題：底為${base}厘米、高為${height}厘米的三角形面積是？`, [String(answer), String(base * height), String(base + height), String(answer + 2)], 0, `三角形面積 = 底 × 高 ÷ 2 = ${answer}平方厘米。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: A triangle has base ${base} cm and height ${height} cm. Its area is?`, explanationEn:`Area = base × height ÷ 2 = ${answer} cm².` } : extra);
  }
  const a = number; const b = i + 2; const answer = a + b;
  return choice(`${topic.title}｜第${i + 1}題：${a} + ${b} = ?`, [String(answer - 1), String(answer), String(answer + 1), String(answer + 2)], 1, `${a} 加 ${b} 等於 ${answer}。`, bilingual ? { promptEn:`${topic.titleEn} | Question ${i + 1}: ${a} + ${b} = ?`, explanationEn:`${a} plus ${b} equals ${answer}.` } : extra);
}

function seniorChoice(topic, i, zh, en, answer, options, explanation, explanationEn) {
  return choice(`${topic.title}｜第${i + 1}題：${zh}`, options.map(String), options.findIndex((item) => String(item) === String(answer)), explanation, { promptEn:`${topic.titleEn} | Question ${i + 1}: ${en}`, explanationEn });
}
function seniorPuzzle(topic, i, zh, en, tokens, correctOrder, explanation, explanationEn) {
  return puzzle(`${topic.title}｜第${i + 1}題：${zh}`, tokens, correctOrder, explanation, { promptEn:`${topic.titleEn} | Question ${i + 1}: ${en}`, explanationEn });
}
function seniorText(topic, i, zh, en, answer, hint, explanation, explanationEn) {
  return text(`${topic.title}｜第${i + 1}題：${zh}`, String(answer), hint, explanation, { promptEn:`${topic.titleEn} | Question ${i + 1}: ${en}`, explanationEn });
}
function makeSeniorMathQuestion(topic, i) {
  const n = i + 2; const key = `${topic.grade}-${topic.slot}`;
  if (key === 'S1-0') { const p = n * 10; return seniorChoice(topic,i,`${p}% 化為小數是？`,`What is ${p}% as a decimal?`,p/100,[p/100,p/10,p,1+p/100],`${p}% = ${p} ÷ 100 = ${p/100}。`,`${p}% = ${p} ÷ 100 = ${p/100}.`); }
  if (key === 'S1-1') { const left=i+2,right=i+3; return seniorPuzzle(topic,i,`把比 ${left}：${right} 排成正確寫法。`,`Arrange the ratio ${left} to ${right} correctly.`,[String(right),'：',String(left)],[String(left),'：',String(right)],`比的前項在前、後項在後，寫作 ${left}：${right}。`,`The antecedent comes first, so the ratio is ${left}:${right}.`); }
  if (key === 'S1-2') { const a=n+3,b=n+5; return seniorChoice(topic,i,`化簡 ${a}x + ${b}x。`,`Simplify ${a}x + ${b}x.`,`${a+b}x`,[`${a+b}x`,`${a*b}x`,`${b-a}x`,`x²`],`同類項的係數相加：${a}x + ${b}x = ${a+b}x。`,`Add coefficients of like terms: ${a}x + ${b}x = ${a+b}x.`); }
  if (key === 'S1-3') { const a=40+i,b=50,answer=180-a-b; return seniorText(topic,i,`三角形另外兩角為 ${a}° 和 ${b}°，第三角是多少度？`,`Two angles of a triangle are ${a}° and ${b}°. Find the third angle.`,answer,'提示：三角形內角和是 180°。',`第三角 = 180 − ${a} − ${b} = ${answer}°。`,`Third angle = 180 − ${a} − ${b} = ${answer}°.`); }
  if (key === 'S1-4') { const vals=[n,n+2,n+4]; return seniorChoice(topic,i,`${vals.join('、')} 的平均數是？`,`What is the mean of ${vals.join(', ')}?`,n+2,[n+2,n+3,n+1,vals.reduce((x,y)=>x+y,0)],`平均數 = (${vals.join(' + ')}) ÷ 3 = ${n+2}。`,`Mean = (${vals.join(' + ')}) ÷ 3 = ${n+2}.`); }
  if (key === 'S2-0') { const x=n+1,y=n+2; return seniorChoice(topic,i,`若 x + y = ${x+y}，且 x = ${x}，則 y =？`,`If x + y = ${x+y} and x = ${x}, find y.`,y,[y,x,x+y,y+1],`y = ${x+y} − ${x} = ${y}。`,`y = ${x+y} − ${x} = ${y}.`); }
  if (key === 'S2-1') { const a=i+2,b=i+3; return seniorPuzzle(topic,i,`把 x² + ${a+b}x + ${a*b} 的因式分解排成正確形式。`,`Arrange the factorisation of x² + ${a+b}x + ${a*b}.`,[`${b})`,`(x +`,`${a})(x +`],[`(x +`,`${a})(x +`,`${b})`],`x² + ${a+b}x + ${a*b} = (x + ${a})(x + ${b})。`,`x² + ${a+b}x + ${a*b} = (x + ${a})(x + ${b}).`); }
  if (key === 'S2-2') { const a=3+i,b=4+i,c=Math.sqrt(a*a+b*b); return seniorChoice(topic,i,`直角三角形兩直角邊為 ${a} 和 ${b}，斜邊是？`,`A right triangle has legs ${a} and ${b}. Find the hypotenuse.`,c,[c,a+b,c+1,c-1],`由畢氏定理，c² = ${a}² + ${b}²，所以 c = ${c}。`,`By Pythagoras, c² = ${a}² + ${b}², so c = ${c}.`); }
  if (key === 'S2-3') { const r=n+2; return seniorText(topic,i,`半徑為 ${r} cm 的圓，直徑是多少 cm？`,`A circle has radius ${r} cm. Find its diameter.`,r*2,'提示：直徑 = 2 × 半徑。',`直徑 = 2 × ${r} = ${r*2} cm。`,`Diameter = 2 × ${r} = ${r*2} cm.`); }
  if (key === 'S2-4') { const favourable=n, total=n+4; return seniorChoice(topic,i,`袋中有 ${favourable} 個紅球和 4 個藍球，抽到紅球的概率是？`,`A bag has ${favourable} red and 4 blue balls. What is P(red)?`,`${favourable}/${total}`,[`${favourable}/${total}`,`1/${total}`,`${total}/${favourable}`,`${favourable+1}/${total}`],`有利結果除以總結果：${favourable}/${total}。`,`Favourable outcomes over total outcomes: ${favourable}/${total}.`); }
  if (key === 'S3-0') { const coefficient=i+2, constant=i+5, answer=i+3; return seniorChoice(topic,i,`解 ${coefficient}x + ${constant} = ${coefficient*answer+constant}。`,`Solve ${coefficient}x + ${constant} = ${coefficient*answer+constant}.`,answer,[answer,answer+1,answer-1,answer+2],`${coefficient}x = ${coefficient*answer}，所以 x = ${answer}。`,`${coefficient}x = ${coefficient*answer}, so x = ${answer}.`); }
  if (key === 'S3-1') { const a=i+1,b=i+2; return seniorPuzzle(topic,i,`把指數律 a${a===1?'':`^${a}`} × a^${b} 的結果排成正確式子。`,`Arrange the result of a^${a} × a^${b}.`,[`a^${a+b}`,'=',`a^${a} × a^${b}`],[`a^${a} × a^${b}`,'=',`a^${a+b}`],`同底數相乘，指數相加：${a} + ${b} = ${a+b}。`,`For equal bases, add indices: ${a} + ${b} = ${a+b}.`); }
  if (key === 'S3-2') { const centre=60+i*10, answer=centre/2; return seniorChoice(topic,i,`圓周角對同一弧所對的圓心角為 ${centre}°，圓周角是？`,`An arc subtends ${centre}° at the centre. Find the angle at the circumference.`,answer,[answer,centre,centre*2,answer+10],`同弧所對的圓周角等於圓心角的一半：${centre}° ÷ 2 = ${answer}°。`,`The angle at the circumference is half the central angle: ${centre}° ÷ 2 = ${answer}°.`); }
  if (key === 'S3-3') { const r=n; const h=3; return seniorText(topic,i,`圓錐體積 = 1/3 × 底面積 × 高。若底面積為 ${r*3} cm²、高為 ${h} cm，體積是多少 cm³？`,`Cone volume = 1/3 × base area × height. If base area is ${r*3} cm² and height is ${h} cm, find the volume.`,r*3,'提示：代入 1/3 × 底面積 × 高。',`體積 = 1/3 × ${r*3} × ${h} = ${r*3} cm³。`,`Volume = 1/3 × ${r*3} × ${h} = ${r*3} cm³.`); }
  if (key === 'S3-4') { const faces=i+2; return seniorChoice(topic,i,`一個公平轉盤分成 ${faces} 個相等部分，指針停在指定一格的概率是？`,`A fair spinner has ${faces} equal sectors. What is the probability of landing on one named sector?`,`1/${faces}`,[`1/${faces}`,`1/${faces-1}`,`${faces-1}/${faces+1}`,`3/${faces+2}`],`所有 ${faces} 格機會相等，指定一格的概率是 1/${faces}。`,`All ${faces} sectors are equally likely, so the probability is 1/${faces}.`); }
  if (key === 'S4-0') { const exponent=n; const answer=2**exponent; return seniorChoice(topic,i,`2 的 ${exponent} 次方是？`,`What is 2 to the power of ${exponent}?`,answer,[answer,answer+1,answer+2,Math.max(0,answer-1)],`2^${exponent} = ${answer}。`,`2^${exponent} = ${answer}.`); }
  if (key === 'S4-1') { const root=i+2; return seniorPuzzle(topic,i,`把 x² − ${root*root} = 0 的解題步驟排成正確次序。`,`Arrange the steps for solving x² − ${root*root} = 0.`,['求 x','因式分解',`令 x² − ${root*root} = 0`],[`令 x² − ${root*root} = 0`,'因式分解','求 x'],'先令方程為 0，再因式分解，最後求根。','Set the equation to zero, factorise, then find the roots.'); }
  if (key === 'S4-2') { const first=n, d=3; const answer=first+d; return seniorChoice(topic,i,`等差數列首項為 ${first}、公差為 ${d}，第二項是？`,`An arithmetic sequence has first term ${first} and common difference ${d}. What is the second term?`,answer,[answer,answer+1,answer+2,answer-1],`第二項 = 首項 + 公差 = ${answer}。`,`Second term = first term + common difference = ${answer}.`); }
  if (key === 'S4-3') { const m=n, c=2; return seniorText(topic,i,`直線 y = ${m}x + ${c}，當 x = 3 時，y 是？`,`For y = ${m}x + ${c}, find y when x = 3.`,m*3+c,'提示：把 x = 3 代入。',`y = ${m}(3) + ${c} = ${m*3+c}。`,`y = ${m}(3) + ${c} = ${m*3+c}.`); }
  if (key === 'S4-4') { const nItems=n+2; const answer=nItems*(nItems-1)/2; return seniorChoice(topic,i,`${nItems} 個不同物件任取 2 個的組合數是？`,`How many ways can 2 objects be chosen from ${nItems} different objects?`,answer,[answer,answer+1,answer-1,nItems],`C(${nItems},2) = ${nItems}×${nItems-1}÷2 = ${answer}。`,`C(${nItems},2) = ${nItems}×${nItems-1}÷2 = ${answer}.`); }
  if (key === 'S5-0') { const exponent=i+1, value=10**exponent; return seniorChoice(topic,i,`log₁₀(${value}) 的值是？`,`What is log₁₀(${value})?`,exponent,[exponent,exponent+1,exponent+2,Math.max(0,exponent-1)],`因為 10^${exponent} = ${value}，所以 log₁₀(${value}) = ${exponent}。`,`Since 10^${exponent} = ${value}, log₁₀(${value}) = ${exponent}.`); }
  if (key === 'S5-1') { const m=i+2,c=i+1; return seniorPuzzle(topic,i,`把函數 y = ${m}x + ${c} 排成正確式子。`,`Arrange the function y = ${m}x + ${c}.`,[`+ ${c}`,'y =',`${m}x`],['y =',`${m}x`,`+ ${c}`],`函數寫作 y = ${m}x + ${c}。`,`The function is written as y = ${m}x + ${c}.`); }
  if (key === 'S5-2') { const m=i+1; return seniorChoice(topic,i,`直線經過 (1,2) 和 (3,${2*m+2})，斜率是？`,`A line passes through (1,2) and (3,${2*m+2}). What is its gradient?`,m,[m,m+1,m+2,Math.max(0,m-1)],`斜率 = (${2*m+2}−2)÷(3−1) = ${m}。`,`Gradient = (${2*m+2}−2)÷(3−1) = ${m}.`); }
  if (key === 'S5-3') { const l=n, w=3, h=2; return seniorText(topic,i,`長方體長 ${l}、闊 ${w}、高 ${h}，體積是多少？`,`A cuboid has length ${l}, width ${w}, height ${h}. Find its volume.`,l*w*h,'提示：長 × 闊 × 高。',`體積 = ${l}×${w}×${h} = ${l*w*h}。`,`Volume = ${l}×${w}×${h} = ${l*w*h}.`); }
  if (key === 'S5-4') { const bank=[['抽樣調查中，哪一項有助提升代表性？','Which practice improves representativeness in a sample survey?','隨機抽樣',['隨機抽樣','只訪問朋友','只選一個年齡','刪去不喜歡的答案'],'隨機抽樣可減少選擇偏差。','Random sampling reduces selection bias.'],['若要減少抽樣誤差，哪個做法較合適？','Which practice can reduce sampling error?','增加樣本數',['增加樣本數','只問一人','縮小目標群體','刪除資料'],'較大的樣本通常可減少抽樣誤差。','A larger sample generally reduces sampling error.'],['要比較不同年級的意見，哪種抽樣較合適？','Which sampling method suits comparing different year groups?','分層抽樣',['分層抽樣','方便抽樣','只抽一班','隨意刪除答案'],'分層抽樣能讓各年級都有代表。','Stratified sampling gives each year group representation.'],['問卷問題應避免甚麼？','What should a survey question avoid?','引導性措辭',['引導性措辭','清楚用詞','中性語氣','完整選項'],'引導性措辭會影響受訪者的回答。','Leading wording can influence responses.'],['調查結果要代表全校，樣本應包括甚麼？','To represent the whole school, what should a sample include?','不同類別學生',['不同類別學生','只包括朋友','只包括一班','只包括同一性別'],'樣本應涵蓋目標群體的不同類別。','A sample should cover different groups in the target population.'],['未回覆問卷的情況稱為甚麼？','What is it called when selected respondents do not reply?','無回應',['無回應','平均數','眾數','組距'],'無回應可能造成調查偏差。','Non-response can cause survey bias.'],['重複調查時最應保持甚麼？','What should be kept consistent in a repeated survey?','同一程序',['同一程序','不同問題','不同標準','任意抽樣'],'一致程序有助比較不同調查結果。','Consistent procedures support fair comparison.'],['統計圖表標題的主要作用是甚麼？','What is the main purpose of a graph title?','說明資料內容',['說明資料內容','增加顏色','隱藏數據','代替數值'],'標題讓讀者知道圖表展示甚麼資料。','A title tells readers what data a graph shows.'],['有代表性的樣本應接近甚麼？','What should a representative sample resemble?','目標群體',['目標群體','個別朋友','單一小組','隨意答案'],'代表性樣本的特徵應接近目標群體。','A representative sample resembles the target population.'],['分析數據時，不應做甚麼？','What should not be done when analysing data?','選擇性刪除資料',['選擇性刪除資料','說明限制','核對數據','列出來源'],'選擇性刪除資料會扭曲結論。','Selective deletion of data can distort conclusions.']]; const [zh,en,answer,options,explanation,explanationEn]=bank[i]; return seniorChoice(topic,i,zh,en,answer,options,explanation,explanationEn); }
  if (key === 'S6-0') { const root=i+2; return seniorChoice(topic,i,`x² − ${root*root} 的因式分解是？`,`Factorise x² − ${root*root}.`,`(x − ${root})(x + ${root})`,[`(x − ${root})(x + ${root})`,`(x − ${root*root})(x + 1)`,`(x − ${root})²`,`x(x − ${root*root})`],`這是平方差：x² − ${root}² = (x−${root})(x+${root})。`,`This is a difference of squares: x² − ${root}² = (x−${root})(x+${root}).`); }
  if (key === 'S6-1') { const lower=String.fromCharCode(97+i), upper=lower.toUpperCase(); return seniorPuzzle(topic,i,`把正弦定理的 ${lower} 與角 ${upper} 的比值排成正確形式。`,`Arrange the sine-rule ratio using side ${lower} and angle ${upper}.`,[`sin ${upper}`,lower,'=', '÷'],[lower,'÷',`sin ${upper}`,'='],`正弦定理使用邊長 ${lower} 與其對角正弦 sin ${upper} 的比值。`,`The sine rule compares side ${lower} with sin ${upper}.`); }
  if (key === 'S6-2') { const faces=i+2; return seniorChoice(topic,i,`一個公平轉盤分成 ${faces} 個相等部分，轉到指定一格的概率是？`,`A fair spinner has ${faces} equal sectors. What is the probability of landing on one named sector?`,`1/${faces}`,[`1/${faces}`,`1/${faces-1}`,`${faces-1}/${faces+1}`,`3/${faces+2}`],`共有 ${faces} 個等可能結果，指定一格的概率是 1/${faces}。`,`There are ${faces} equally likely outcomes, so the probability is 1/${faces}.`); }
  if (key === 'S6-3') { const rate=n*10; return seniorText(topic,i,`模型 y = ${rate}x，當 x = 4 時，y 是？`,`For the model y = ${rate}x, find y when x = 4.`,rate*4,'提示：把 x = 4 代入。',`y = ${rate}×4 = ${rate*4}。`,`y = ${rate}×4 = ${rate*4}.`); }
  { const coefficient=i+2, answer=i+4; return seniorChoice(topic,i,`綜合解難：解 ${coefficient}x = ${coefficient*answer}。`,`Mixed problem solving: solve ${coefficient}x = ${coefficient*answer}.`,answer,[answer,answer+1,answer-1,answer+2],`兩邊同除以 ${coefficient}，x = ${answer}。`,`Divide both sides by ${coefficient}; x = ${answer}.`); }
}

const database = { meta:{ title:'EduQuest 邊學邊玩', topicCount:topics.length, questionPolicy:'P1–P6 中文每個 Topic 15 題；其餘 Topic 每個 10 題', totalQuestionCount:1950, subjects:['中文','英文','數學'], grades, curriculumSource:'pasted_content_2.txt' }, topics };
await mkdir(new URL('../client/src/data/',import.meta.url),{recursive:true});
await writeFile(new URL('../client/src/data/curriculumDB.json',import.meta.url),`${JSON.stringify(database,null,2)}\n`,'utf8');
console.log(`Generated ${topics.length} curriculum-aligned topics with 1950 questions (P1–P6 Chinese: 15 each; others: 10 each).`);
