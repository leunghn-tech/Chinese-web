/* 英文科核心文法目錄：按年級列出可用於備課及日後題庫擴充的學習路徑。 */
const englishCatalog = {
  P1: {
    grade: 'P1', gradeLabel: '小一',
    focus: '從名詞、代名詞與簡單句子開始，建立英文句子的基本骨架。',
    summary: '小一先認識人物、物件和位置，再以 a／an／the、to be／to have 組成生活化的簡單句子。',
    coreTopics: [
      { title: 'Nouns 名詞', detail: '可數／不可數名詞、規則複數（+s／-es）及 child → children 等不規則複數。', goal: '辨認名詞數量，正確使用單數與複數形式。' },
      { title: 'Pronouns 代名詞', detail: '主格 I, you, he, she, it, we, they；所有格形容詞 my, your, his, her, its, our, their。', goal: '以合適代名詞代替人物或物件。' },
      { title: 'Articles 冠詞', detail: 'a／an／the 的基礎分工與常見用法。', goal: '按名詞及發音選用合適冠詞。' },
      { title: 'Verb to be & to have', detail: 'am／is／are、have／has 與不同人稱配搭。', goal: '寫出正確的主語與動詞配搭。' },
      { title: 'Prepositions 地方介詞', detail: 'in, on, under, near, behind, next to。', goal: '用位置介詞描述人和物件的位置。' },
    ],
  },
  P2: {
    grade: 'P2', gradeLabel: '小二',
    focus: '把句子放進時間與生活情境，分辨正在發生的事與日常習慣。',
    summary: '小二以現在進行式、一般現在式和 Wh-Questions 建立提問與回答的能力，並以 can／can’t 表達能力。',
    coreTopics: [
      { title: 'Present Continuous Tense', detail: 'be + V-ing 結構；時間提示 now, look, listen。', goal: '描述正在發生的動作。' },
      { title: 'Simple Present Tense', detail: '表達事實與習慣；always, usually, every day 等時間詞。', goal: '用一般現在式說明日常習慣和事實。' },
      { title: 'Wh-Questions 疑問詞', detail: 'Who, What, Where, When, What time, How many。', goal: '提出及回答基本資料問題。' },
      { title: 'Modal Verb 情態動詞', detail: 'can／can’t 表示能力與不能做到的事。', goal: '以 can／can’t 準確表達能力。' },
    ],
  },
  P3: {
    grade: 'P3', gradeLabel: '小三',
    focus: '從現在走向過去，並以代名詞、連接詞與數量詞連結更完整的意思。',
    summary: '小三重點是一般過去式及不規則動詞，同時擴展代名詞、因果連接與數量表達。',
    coreTopics: [
      { title: 'Simple Past Tense', detail: '一般過去式與 yesterday, last night, ... ago 等時間提示。', goal: '用正確時態描述已發生的事件。' },
      { title: 'Irregular Verbs 不規則動詞', detail: 'go → went、buy → bought、see → saw 等常用變化。', goal: '辨認並運用常見不規則動詞過去式。' },
      { title: 'Pronouns 代名詞全集', detail: '賓格 me, him, them；所有格代名詞 mine, hers, theirs。', goal: '按句中位置選用主格、賓格及所有格形式。' },
      { title: 'Connectors 基礎連接詞', detail: 'and, but, or, because。', goal: '以連接詞清楚表達並列、轉折、選擇和原因。' },
      { title: 'Quantifiers 數量詞', detail: 'some／any；How many／How much 的分工。', goal: '按名詞及句式選用合適數量詞與問句。' },
    ],
  },
  P4: {
    grade: 'P4', gradeLabel: '小四',
    focus: '比較、修飾與推論並進，讓句子更準確、更有層次。',
    summary: '小四分辨形容詞與副詞，掌握比較級、情態動詞、反身代名詞及進階連接詞。',
    coreTopics: [
      { title: 'Adjectives & Adverbs', detail: '形容詞修飾名詞；副詞（常見 -ly）修飾動詞。', goal: '分辨形容詞與副詞的句法作用。' },
      { title: 'Comparatives & Superlatives', detail: '+er／+est、more／most；good → better → best。', goal: '比較兩者或多者時選用正確形式。' },
      { title: 'Modal Verbs 進階情態動詞', detail: 'must／mustn’t、should／shouldn’t、have to。', goal: '分辨強制、禁止、建議與必要性。' },
      { title: 'Reflexive Pronouns 反身代名詞', detail: 'myself, himself, herself, ourselves, themselves。', goal: '在需要反指主語時正確使用反身代名詞。' },
      { title: 'Connectors 進階連接詞', detail: 'when, if, although。', goal: '用時間、條件及讓步關係連結句子。' },
      { title: 'Reading Comprehension 閱讀理解', detail: '閱讀短篇材料，找出事實、詞義、推論與主旨，並以文中線索支持答案。', goal: '在短篇材料中選取明確資料並作合理推論。' },
    ],
  },
  P5: {
    grade: 'P5', gradeLabel: '小五',
    focus: '掌握完成、被動與關係從句，讓訊息表達更精確。',
    summary: '小五以現在完成式、被動語態和關係從句建立較成熟的句子結構，並學習關聯連接詞。',
    coreTopics: [
      { title: 'Present Perfect Tense', detail: 'have／has + past participle（動詞第三態）結構。', goal: '描述與現在有關的已完成經驗或事情。' },
      { title: 'Since, For & Time Markers', detail: 'since／for；already, yet, ever, never, just。', goal: '以時間提示準確表達完成式的時間關係。' },
      { title: 'Passive Voice 被動語態', detail: 'Object + am／is／are／was／were + P.P. 的初階用法。', goal: '把焦點放在動作承受者，完成主動與被動轉換。' },
      { title: 'Relative Clauses 關係從句', detail: 'who 修飾人、which 修飾物、whose 表示所屬。', goal: '以關係代名詞合併有關連的句子。' },
      { title: 'Correlative Conjunctions', detail: 'both...and..., either...or..., neither...nor...。', goal: '用成對連接詞清楚表達並列和選擇關係。' },
      { title: 'Advanced Reading 閱讀理解', detail: '閱讀較長材料，結合細節、詞義、事件次序、推論及主旨作答。', goal: '以文中資料和合理推論回答多題組合。' },
    ],
  },
  P6: {
    grade: 'P6', gradeLabel: '小六',
    focus: '整合條件、轉述與非限定動詞，為中學英語句式打穩基礎。',
    summary: '小六重點是三類 If-Clauses、間接引語、V-ing／to V 選擇及常用短語動詞。',
    coreTopics: [
      { title: 'Conditional Sentences', detail: 'If-Clauses Type 0 真理、Type 1 未來可能、Type 2 假設語氣。', goal: '按真實性與時間選用合適條件句結構。' },
      { title: 'Reported Speech 間接引語', detail: '直接對話轉述；時態後退、代名詞及時間詞變換。', goal: '把直接說話準確改寫成第三人稱轉述。' },
      { title: 'Gerunds & Infinitives', detail: 'enjoy, dislike, look forward to 後接 V-ing；decide, want, hope, agree 後接 to V。', goal: '按動詞搭配選用 V-ing 或 to + verb。' },
      { title: 'Phrasal Verbs 短語動詞', detail: 'look up, look after, put off, call off, set off。', goal: '在語境中理解並運用常用短語動詞。' },
      { title: 'Advanced Reading 閱讀理解', detail: '閱讀較長材料，結合細節、詞義、轉述、條件句、推論及評估證據作答。', goal: '以文本證據支持高階理解及評估答案。' },
    ],
  },
};

export default englishCatalog;
