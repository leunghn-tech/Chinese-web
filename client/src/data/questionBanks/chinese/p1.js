/* P1 中文題庫：日後只在此檔案加入小一題目，不影響其他年級。 */
const storyStructureStories = [
  {
    id: 'P1-CN-R04-S01', title: '雨天遠足', intro: '先讀完整短文，再按問題找出最合適的段落。這一篇短文共有六條練習問題。',
    paragraphs: [
      { id: 'S1-P1', text: '星期五早上，小琪和同學到郊外遠足。天氣晴朗，大家都很期待。' },
      { id: 'S1-P2', text: '他們沿著小路走，看見小鳥在樹上唱歌，也看見蝴蝶在花間飛舞。' },
      { id: 'S1-P3', text: '忽然，天空下起大雨，大家連忙跑到涼亭避雨。' },
      { id: 'S1-P4', text: '不久，雨停了，天空出現彩虹。小琪覺得這次遠足十分難忘。' },
    ],
    questions: [
      { id: 'P1-CN-R04-Q01', stage: '起', prompt: '哪一段先交代時間、人物和遠足活動？', answer: 'S1-P1', explanation: '第一段交代星期五早上、小琪和同學，以及到郊外遠足，是故事的開始。' },
      { id: 'P1-CN-R04-Q02', stage: '承', prompt: '哪一段承接開始，寫他們沿路看見的景物？', answer: 'S1-P2', explanation: '第二段寫小鳥、蝴蝶和花，讓故事順著遠足活動發展。' },
      { id: 'P1-CN-R04-Q03', stage: '轉', prompt: '哪一段令故事出現明顯變化？', answer: 'S1-P3', explanation: '第三段由晴天忽然變成下大雨，故事出現轉變。' },
      { id: 'P1-CN-R04-Q04', stage: '合', prompt: '哪一段交代雨後結果和小琪的感受？', answer: 'S1-P4', explanation: '第四段寫雨停、看見彩虹和難忘感受，收束整個故事。' },
      { id: 'P1-CN-R04-Q05', stage: '轉', prompt: '哪一段最適合放「忽然」這個表示變化的詞？', answer: 'S1-P3', explanation: '「忽然」用來提示事情突然改變；短文中正是第三段突然下起大雨。' },
      { id: 'P1-CN-R04-Q06', stage: '合', prompt: '哪一段最能讓讀者知道故事已經結束？', answer: 'S1-P4', explanation: '第四段寫出事件結果和人物感受，令文章有完整的結尾。' },
    ],
  },
  {
    id: 'P1-CN-R04-S02', title: '校園植樹日', intro: '先讀完整短文，再找出每一段在故事中的作用。這一篇短文共有四條練習問題。',
    paragraphs: [
      { id: 'S2-P1', text: '星期三早上，小安和同學到學校花園參加植樹日。大家戴上手套，準備種小樹苗。' },
      { id: 'S2-P2', text: '老師教大家先挖泥土，再放入樹苗，最後把泥土蓋好和澆水。' },
      { id: 'S2-P3', text: '可是，小明的水壺忽然倒了，水全流到地上。他很着急。' },
      { id: 'S2-P4', text: '老師拿來另一個水壺，大家一起把樹苗澆好。小安看見小樹苗站得直直的，十分高興。' },
    ],
    questions: [
      { id: 'P1-CN-R04-Q07', stage: '起', prompt: '哪一段介紹植樹日的時間、人物和活動？', answer: 'S2-P1', explanation: '第一段交代星期三早上、小安和同學，以及到學校花園種樹，是故事的開始。' },
      { id: 'P1-CN-R04-Q08', stage: '承', prompt: '哪一段寫老師教大家怎樣種樹？', answer: 'S2-P2', explanation: '第二段寫挖泥土、放樹苗、蓋泥土和澆水，承接植樹活動的發展。' },
      { id: 'P1-CN-R04-Q09', stage: '轉', prompt: '哪一段出現了令事情改變的小問題？', answer: 'S2-P3', explanation: '第三段的水壺忽然倒了，令小明着急，是故事的轉變。' },
      { id: 'P1-CN-R04-Q10', stage: '合', prompt: '哪一段寫出問題解決後的結果和感受？', answer: 'S2-P4', explanation: '第四段寫老師幫忙、樹苗澆好和小安高興，為故事作結。' },
    ],
  },
  {
    id: 'P1-CN-R04-S03', title: '圖書館借書', intro: '先讀完整短文，再按問題找出最合適的段落。這一篇短文共有四條練習問題。',
    paragraphs: [
      { id: 'S3-P1', text: '星期日下午，小朗和媽媽到圖書館。他想借一本有關海洋的圖畫書。' },
      { id: 'S3-P2', text: '小朗找到《小鯨魚的家》，安靜地坐在椅子上閱讀，知道海洋要保持清潔。' },
      { id: 'S3-P3', text: '正當他準備借書時，他發現借書證不在口袋裏，便四處尋找。' },
      { id: 'S3-P4', text: '媽媽在書包的小袋裏找到借書證。小朗借到圖畫書，答應以後把借書證放好。' },
    ],
    questions: [
      { id: 'P1-CN-R04-Q11', stage: '起', prompt: '哪一段交代小朗到哪裏和想借甚麼書？', answer: 'S3-P1', explanation: '第一段交代星期日下午、小朗到圖書館和想借海洋圖畫書，是故事的開始。' },
      { id: 'P1-CN-R04-Q12', stage: '承', prompt: '哪一段寫小朗找到書後閱讀到的內容？', answer: 'S3-P2', explanation: '第二段寫小朗找到《小鯨魚的家》並閱讀海洋要保持清潔，承接借書活動。' },
      { id: 'P1-CN-R04-Q13', stage: '轉', prompt: '哪一段出現了借書前的小意外？', answer: 'S3-P3', explanation: '第三段發現借書證不在口袋裏，令事情出現變化。' },
      { id: 'P1-CN-R04-Q14', stage: '合', prompt: '哪一段寫出找到借書證後的結果？', answer: 'S3-P4', explanation: '第四段寫媽媽找到借書證、小朗借到書和答應收好借書證，完整結束故事。' },
    ],
  },
];

export default {
  grade: 'P1', subject: '中文',
  units: [
    {
      id: 'P1-CN-R01', area: '閱讀', title: '認讀基礎字詞', interaction: 'word-match',
      questions: [
        {
          id: 'P1-CN-R01-Q01', prompt: '把字詞卡拖到最合適的圖意卡。',
          matches: [
            { id: 'sun', word: '太陽', symbol: '☀️', meaning: '白天照亮大地' },
            { id: 'umbrella', word: '雨傘', symbol: '☂️', meaning: '下雨時用來遮雨' },
            { id: 'bag', word: '書包', symbol: '🎒', meaning: '上學時用來裝書本' },
          ],
          explanation: '太陽照亮大地；雨傘遮雨；書包用來裝書本。',
        },
        {
          id: 'P1-CN-R01-Q02', prompt: '看清圖意，配對正確的字詞。',
          matches: [
            { id: 'dog', word: '小狗', symbol: '🐶', meaning: '會汪汪叫的小動物' },
            { id: 'flower', word: '花朵', symbol: '🌷', meaning: '植物開出的彩色部分' },
            { id: 'moon', word: '月亮', symbol: '🌙', meaning: '晚上常在天空看見' },
          ],
          explanation: '小狗是小動物；花朵是植物的一部分；月亮常在晚上出現。',
        },
        {
          id: 'P1-CN-R01-Q03', prompt: '把生活用品和正確圖意配在一起。',
          matches: [
            { id: 'apple', word: '蘋果', symbol: '🍎', meaning: '紅色或綠色的水果' },
            { id: 'cup', word: '水杯', symbol: '🥛', meaning: '用來盛水喝水' },
            { id: 'shoes', word: '鞋子', symbol: '👟', meaning: '穿在腳上走路' },
          ],
          explanation: '蘋果是水果；水杯用來喝水；鞋子穿在腳上。',
        },
        {
          id: 'P1-CN-R01-Q04', prompt: '把校園字詞和圖意配對。',
          matches: [
            { id: 'gate', word: '校門', symbol: '🏫', meaning: '進入學校的門口' },
            { id: 'teacher', word: '老師', symbol: '🧑‍🏫', meaning: '在課室教導學生的人' },
            { id: 'classmate', word: '同學', symbol: '🧒', meaning: '和我一起上課的學生' },
          ],
          explanation: '校門在學校入口；老師教導學生；同學一起上課。',
        },
        {
          id: 'P1-CN-R01-Q05', prompt: '把出行和休憩的字詞配對。',
          matches: [
            { id: 'bus', word: '巴士', symbol: '🚌', meaning: '在路上載客的交通工具' },
            { id: 'light', word: '紅綠燈', symbol: '🚦', meaning: '過馬路時看它的顏色' },
            { id: 'park', word: '公園', symbol: '🌳', meaning: '可以散步和遊玩的地方' },
          ],
          explanation: '巴士載客；紅綠燈指示過路；公園可散步遊玩。',
        },
      ],
    },
    {
      id: 'P1-CN-R02', area: '閱讀', title: '常用部首認識', interaction: 'radical-sort',
      questions: [
        { id: 'P1-CN-R02-Q01', prompt: '「河」字的部首是哪一個？', character: '河', radical: '氵', radicalName: '三點水', choices: ['氵', '木', '口', '女'], explanation: '「河」的左邊是「氵」，表示它和水有關。' },
        { id: 'P1-CN-R02-Q02', prompt: '「林」字的部首是哪一個？', character: '林', radical: '木', radicalName: '木字旁', choices: ['日', '木', '扌', '口'], explanation: '「林」由兩個「木」組成，所以部首是「木」。' },
        { id: 'P1-CN-R02-Q03', prompt: '「媽」字的部首是哪一個？', character: '媽', radical: '女', radicalName: '女字旁', choices: ['女', '氵', '日', '木'], explanation: '「媽」的左邊是「女」，所以部首是「女」。' },
        { id: 'P1-CN-R02-Q04', prompt: '「問」字的部首是哪一個？', character: '問', radical: '口', radicalName: '口字旁', choices: ['扌', '口', '女', '木'], explanation: '「問」字裡有「口」，問話時要用口，所以部首是「口」。' },
        { id: 'P1-CN-R02-Q05', prompt: '「明」字的部首是哪一個？', character: '明', radical: '日', radicalName: '日字旁', choices: ['日', '氵', '口', '扌'], explanation: '「明」的左邊是「日」，表示太陽帶來光明。' },
        { id: 'P1-CN-R02-Q06', prompt: '「抱」字的部首是哪一個？', character: '抱', radical: '扌', radicalName: '提手旁', choices: ['女', '木', '扌', '日'], explanation: '「抱」的左邊是「扌」，表示用手做動作。' },
        { id: 'P1-CN-R02-Q07', prompt: '「奶」字的部首是哪一個？', character: '奶', radical: '女', radicalName: '女字旁', choices: ['女', '日', '口', '木'], explanation: '「奶」的左邊是「女」，所以部首是「女」。' },
        { id: 'P1-CN-R02-Q08', prompt: '「拍」字的部首是哪一個？', character: '拍', radical: '扌', radicalName: '提手旁', choices: ['氵', '扌', '女', '口'], explanation: '「拍」的左邊是「扌」，拍手時會用到手。' },
        { id: 'P1-CN-R02-Q09', prompt: '「喝」字的部首是哪一個？', character: '喝', radical: '口', radicalName: '口字旁', choices: ['木', '日', '口', '氵'], explanation: '「喝」和用口喝水有關，所以部首是「口」。' },
        { id: 'P1-CN-R02-Q10', prompt: '「洗」字的部首是哪一個？', character: '洗', radical: '氵', radicalName: '三點水', choices: ['女', '扌', '氵', '木'], explanation: '「洗」和水有關，左邊是「氵」。' },
      ],
    },
    {
      id: 'P1-CN-R03', area: '閱讀', title: '基本標點符號', interaction: 'punctuation-drop',
      questions: [
        { id: 'P1-CN-R03-Q01', prompt: '把正確標點拖到句子空格。', before: '今天天氣很好', after: '', answer: '。', choices: ['。', '？', '！'], explanation: '這是一句陳述句，句末用句號。' },
        { id: 'P1-CN-R03-Q02', prompt: '把正確標點拖到句子空格。', before: '你今天快樂嗎', after: '', answer: '？', choices: ['！', '？', '。'], explanation: '這是一句問句，句末用問號。' },
        { id: 'P1-CN-R03-Q03', prompt: '把正確標點拖到句子空格。', before: '小心車輛', after: '', answer: '！', choices: ['。', '！', '？'], explanation: '這是一句提醒，語氣較強，句末用感嘆號。' },
        { id: 'P1-CN-R03-Q04', prompt: '把正確標點拖到句子空格。', before: '花兒真美', after: '', answer: '！', choices: ['？', '。', '！'], explanation: '這是在讚美花兒，帶有強烈感受，句末用感嘆號。' },
        { id: 'P1-CN-R03-Q05', prompt: '把正確標點拖到句子空格。', before: '星期日你會去公園嗎', after: '', answer: '？', choices: ['。', '？', '！'], explanation: '這是在詢問別人，句末用問號。' },
        { id: 'P1-CN-R03-Q06', prompt: '把正確標點拖到句子空格。', before: '請把書放在桌上', after: '', answer: '。', choices: ['！', '。', '？'], explanation: '這是一句平靜的請求，句末用句號。' },
      ],
    },
    { id: 'P1-CN-R04', area: '閱讀', title: '短文起、承、轉、合', interaction: 'story-structure', stories: storyStructureStories, questions: storyStructureStories.flatMap((story) => story.questions) },
    { id: 'P1-CN-W01', area: '寫作', title: '句子擴寫', questions: [] },
  ],
};
