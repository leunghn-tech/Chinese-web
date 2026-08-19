/* P1 中文題庫：日後只在此檔案加入小一題目，不影響其他年級。 */
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
    { id: 'P1-CN-R04', area: '閱讀', title: '短文起、承、轉、合', questions: [] },
    { id: 'P1-CN-W01', area: '寫作', title: '句子擴寫', questions: [] },
  ],
};
