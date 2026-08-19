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
    { id: 'P1-CN-R02', area: '閱讀', title: '常用部首認識', questions: [] },
    { id: 'P1-CN-R03', area: '閱讀', title: '基本標點符號', questions: [] },
    { id: 'P1-CN-R04', area: '閱讀', title: '短文起、承、轉、合', questions: [] },
    { id: 'P1-CN-W01', area: '寫作', title: '句子擴寫', questions: [] },
  ],
};
