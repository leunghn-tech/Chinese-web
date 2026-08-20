/* P4 英文題庫：以修飾、比較、情態、反身代名詞及進階連接詞提升句子精確度。 */
const makeQuestions = (unitId, rows) => rows.map(([symbol, sentence, answer, choices, explanation], index) => ({
  id: `${unitId}-Q${String(index + 1).padStart(2, '0')}`,
  prompt: '選出最合適的英文答案。', symbol, sentence, answer, choices: choices.split('|'), explanation,
}));

const p4EnglishBank = {
  grade: 'P4', subject: '英文',
  units: [
    { id: 'P4-EN-G01', area: '修飾語', title: '形容詞還是副詞？', objective: '分辨修飾名詞的形容詞與修飾動詞的副詞。', interaction: 'english-adjective-choice', questions: makeQuestions('P4-EN-G01', [
      ['🐢', 'The turtle walks ___.', 'slowly', 'slowly|slow|slowness|slower', 'walks 是動詞，應用副詞 slowly 修飾。'],
      ['🌞', 'It is a ___ day.', 'sunny', 'sunny|sunnyly|sun|sunnily', 'day 是名詞，應用形容詞 sunny 修飾。'],
      ['🎤', 'Amy sings ___.', 'beautifully', 'beautifully|beautiful|beauty|more beautiful', 'sings 是動詞，應用副詞 beautifully 修飾。'],
      ['🐶', 'The dog is very ___.', 'friendly', 'friendly|friendlily|friend|more friend', 'be 動詞後用形容詞 friendly。'],
      ['🏃', 'Tom runs ___.', 'quickly', 'quickly|quick|quickness|quicker', 'runs 是動詞，應用副詞 quickly。'],
      ['📘', 'This is an ___ book.', 'interesting', 'interesting|interestingly|interest|interestedly', 'book 是名詞，應用形容詞 interesting。'],
      ['🧹', 'Please speak ___.', 'quietly', 'quietly|quiet|quieter|quietness', 'speak 是動詞，應用副詞 quietly。'],
      ['😊', 'She has a ___ smile.', 'lovely', 'lovely|lovelily|love|lovelier', 'smile 是名詞，應用形容詞 lovely。'],
      ['🚗', 'Dad drives ___.', 'carefully', 'carefully|careful|carefulness|more careful', 'drives 是動詞，應用副詞 carefully。'],
      ['🦁', 'The lion is ___.', 'strong', 'strong|strongly|strength|stronger', 'be 動詞後用形容詞 strong。'],
    ]) },
    { id: 'P4-EN-G02', area: '比較與描述', title: '誰比較厲害？', objective: '正確使用比較級與最高級，包括 +er／+est、more／most 與不規則變化。', interaction: 'english-comparative-choice', questions: makeQuestions('P4-EN-G02', [
      ['🐘', 'An elephant is ___ than a dog.', 'bigger', 'bigger|biggest|more big|big', '兩者比較用比較級；big 變 bigger。'],
      ['🏔️', 'Mount Tai is one of the ___ mountains in China.', 'most famous', 'most famous|more famous|famous|famouser', '多者比較且是其中之一，用最高級 most famous。'],
      ['🍎', 'This apple is ___ than that one.', 'sweeter', 'sweeter|sweetest|more sweet|sweet', '兩個蘋果比較，用比較級 sweeter。'],
      ['🏃', 'Ben is the ___ runner in the class.', 'fastest', 'fastest|faster|most fast|fast', '全班多人比較，用最高級 fastest。'],
      ['📕', 'This book is ___ than that book.', 'more interesting', 'more interesting|most interesting|interestinger|interesting', '較長形容詞用 more + adjective。'],
      ['🏫', 'Today is the ___ day of my life.', 'best', 'best|better|goodest|good', 'good 的最高級是不規則變化 best。'],
      ['🐇', 'A rabbit is ___ than a turtle.', 'faster', 'faster|fastest|more fast|fast', '兩者比較，用 faster。'],
      ['🌊', 'The blue whale is the ___ animal.', 'largest', 'largest|larger|most large|large', '多者比較，用最高級 largest。'],
      ['😊', 'Mum is ___ at cooking than Dad.', 'better', 'better|best|gooder|good', 'good 的比較級是不規則變化 better。'],
      ['🧩', 'This puzzle is ___ than the last one.', 'more difficult', 'more difficult|most difficult|difficulter|difficult', '較長形容詞用 more difficult。'],
    ]) },
    { id: 'P4-EN-G03', area: '情態動詞', title: '規則與建議', objective: '分辨 must、mustn’t、should、shouldn’t 及 have to 的語氣。', interaction: 'english-advanced-modal-choice', questions: makeQuestions('P4-EN-G03', [
      ['🚦', 'You ___ stop when the light is red.', 'must', 'must|mustn’t|shouldn’t|can’t', '交通規則表示必要，使用 must。'],
      ['🚫', 'You ___ run in the corridor.', 'mustn’t', 'mustn’t|must|should|have to', '禁止做某事，使用 mustn’t。'],
      ['🤒', 'You ___ see a doctor if you are sick.', 'should', 'should|shouldn’t|mustn’t|can’t', '給予建議，使用 should。'],
      ['🍬', 'You ___ eat too much candy.', 'shouldn’t', 'shouldn’t|should|must|have to', '建議不要做某事，使用 shouldn’t。'],
      ['🎒', 'We ___ wear a uniform at school.', 'have to', 'have to|mustn’t|shouldn’t|can’t', '學校規定表示必須，使用 have to。'],
      ['📱', 'Students ___ use phones during the test.', 'mustn’t', 'mustn’t|must|should|have to', '考試時禁止使用電話，使用 mustn’t。'],
      ['🛌', 'You ___ go to bed early tonight.', 'should', 'should|mustn’t|can’t|have to', '給予健康建議，使用 should。'],
      ['🧹', 'I ___ clean my room every Saturday.', 'have to', 'have to|mustn’t|shouldn’t|can’t', '固定責任，使用 have to。'],
      ['💧', 'You ___ waste water.', 'shouldn’t', 'shouldn’t|should|must|have to', '環保建議，使用 shouldn’t。'],
      ['🧯', 'We ___ touch the fire alarm.', 'mustn’t', 'mustn’t|must|should|have to', '安全規則禁止觸碰，使用 mustn’t。'],
    ]) },
    { id: 'P4-EN-G04', area: '代名詞', title: '自己動手！', objective: '在需要反指主語時正確使用反身代名詞。', interaction: 'english-reflexive-choice', questions: makeQuestions('P4-EN-G04', [
      ['📝', 'I did my homework by ___.', 'myself', 'myself|yourself|himself|ourselves', '主語是 I，反身代名詞用 myself。'],
      ['🪞', 'Tom looked at ___ in the mirror.', 'himself', 'himself|herself|myself|themselves', 'Tom 是男生，反身代名詞用 himself。'],
      ['🎂', 'Amy made the cake by ___.', 'herself', 'herself|himself|yourself|ourselves', 'Amy 是女生，反身代名詞用 herself。'],
      ['🧹', 'We cleaned the room by ___.', 'ourselves', 'ourselves|themselves|yourself|myself', '主語是 We，反身代名詞用 ourselves。'],
      ['🎨', 'The children painted the wall by ___.', 'themselves', 'themselves|ourselves|himself|herself', 'children 是複數，反身代名詞用 themselves。'],
      ['📚', 'You can read the book by ___.', 'yourself', 'yourself|myself|himself|ourselves', '主語是 You，反身代名詞用 yourself。'],
      ['🐱', 'The cat hurt ___.', 'itself', 'itself|himself|herself|themselves', 'cat 在此用 it，反身代名詞用 itself。'],
      ['🎹', 'My brother taught ___ to play the piano.', 'himself', 'himself|herself|myself|ourselves', 'brother 是男生，反身代名詞用 himself。'],
      ['🍳', 'My sister cooked dinner by ___.', 'herself', 'herself|himself|yourself|ourselves', 'sister 是女生，反身代名詞用 herself。'],
      ['🏆', 'We enjoyed ___ at the party.', 'ourselves', 'ourselves|themselves|myself|yourself', '主語是 We，反身代名詞用 ourselves。'],
    ]) },
    { id: 'P4-EN-G05', area: '句子連結', title: '時間、條件與轉折', objective: '用 when、if、although 連結較複雜的句子關係。', interaction: 'english-advanced-connector-choice', questions: makeQuestions('P4-EN-G05', [
      ['⏰', 'Call me ___ you get home.', 'when', 'when|if|although|because', '表示事情發生的時間，用 when。'],
      ['🌧️', '___ it rains, we will stay inside.', 'If', 'If|When|Although|Because', '表示條件，用 If。'],
      ['☀️', '___ it was hot, we played football.', 'Although', 'Although|If|When|Because', '前後有讓步轉折，用 Although。'],
      ['🏠', 'I do my homework ___ I get home.', 'when', 'when|if|although|or', '表示回家後的時間，用 when。'],
      ['🧥', '___ it is cold, wear a coat.', 'If', 'If|Although|When|But', '表示可能發生的條件，用 If。'],
      ['🏃', '___ Ben was tired, he finished the race.', 'Although', 'Although|If|When|Because', '雖然疲累但完成比賽，表示轉折讓步。'],
      ['📕', 'I will read a book ___ I have time.', 'if', 'if|although|when|and', '表示有時間這個條件，用 if。'],
        ['🍽️', '___ you eat, wash your hands.', 'When', 'When|Although|If|Because', '表示進食時的時間關係，用 When。'],
      ['🎉', '___ the bell rang, the students left the class.', 'When', 'When|If|Although|Because', '鐘響是離開課室的時間點，用 When。'],
      ['🌂', '___ it was raining, we went for a walk.', 'Although', 'Although|If|When|Because', '雖然下雨仍散步，表示讓步。'],
    ]) },
  ],
};

export default p4EnglishBank;
