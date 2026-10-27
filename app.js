// 出発地は東京駅の想定。時間は電車・車のおおよその目安。
const questions = [
  {
    id: "stay",
    text: "何日くらい行けそう？",
    hint: "日数で候補をしぼります。",
    choices: [
      { label: "日帰り", note: "朝出て夜には帰る", stay: "day", score: {} },
      { label: "1泊2日", note: "週末にゆっくり", stay: "1night", score: { onsen: 1 } },
      { label: "2泊以上", note: "遠くまで行ける", stay: "2night", score: {} }
    ]
  },
  {
    id: "budget",
    text: "予算は1人いくらくらい？",
    hint: "交通費と宿代をふくめた目安です。",
    choices: [
      { label: "1万円まで", note: "気軽に行きたい", budget: 1, score: {} },
      { label: "3万円まで", note: "少しだけぜいたく", budget: 2, score: {} },
      { label: "3万円より上", note: "せっかくなら奮発", budget: 3, score: {} }
    ]
  },
  {
    id: "company",
    text: "だれと行く？",
    hint: "同行者に合う過ごし方を優先します。",
    choices: [
      { label: "ひとり", note: "自分のペースで", score: { solo: 3, culture: 1 } },
      { label: "友達", note: "わいわい楽しみたい", score: { thrill: 2, food: 2 } },
      { label: "恋人・夫婦", note: "雰囲気を大事にしたい", score: { romance: 3, relax: 1 } },
      { label: "家族・子ども", note: "安心して楽しみたい", score: { family: 3, nature: 1 } }
    ]
  },
  {
    id: "mood",
    text: "いまの気分は？",
    hint: "いちばん近いものを選んでください。",
    choices: [
      { label: "ゆっくり休みたい", note: "何もしない時間がほしい", score: { relax: 3, onsen: 2 } },
      { label: "わくわくしたい", note: "体を動かして遊びたい", score: { thrill: 3, family: 1 } },
      { label: "非日常にひたりたい", note: "景色や空気を変えたい", score: { romance: 2, nature: 2 } },
      { label: "いろいろ見たい", note: "あちこち歩いて回りたい", score: { culture: 2, city: 2, food: 1 } }
    ]
  },
  {
    id: "view",
    text: "見たい景色は？",
    hint: "旅先の写真を思い浮かべて。",
    choices: [
      { label: "海", note: "波の音と広い空", score: { sea: 3 } },
      { label: "山・森・湖", note: "緑と澄んだ空気", score: { mountain: 2, nature: 2 } },
      { label: "街・夜景", note: "にぎやかな通りと光", score: { city: 3, night: 2 } },
      { label: "古い町並み", note: "寺社やレトロな通り", score: { culture: 3 } }
    ]
  },
  {
    id: "fun",
    text: "いちばんの楽しみは？",
    hint: "最後の質問です。",
    choices: [
      { label: "温泉", note: "お湯につかってのんびり", score: { onsen: 3, relax: 2 } },
      { label: "食べ歩き", note: "ご当地グルメが主役", score: { food: 3, city: 1 } },
      { label: "体験・アクティビティ", note: "遊んで思い出を作る", score: { thrill: 3, nature: 1 } },
      { label: "写真・景色", note: "きれいな景色を残したい", score: { romance: 2, nature: 1, sea: 1 } }
    ]
  }
];

const destinations = [
  {
    name: "鎌倉・江ノ島", area: "神奈川", access: "東京から電車で約1時間", stays: ["day", "1night"], budget: 1,
    profile: { culture: 3, sea: 2, romance: 2, food: 2, solo: 1 },
    plan: "朝は鎌倉の寺社と小町通り、午後は江ノ電で海へ。夕日を見て帰る王道コース。",
    actions: ["江ノ電の1日乗車券を使う", "小町通りで食べ歩き", "江ノ島で夕日を見る"]
  },
  {
    name: "箱根", area: "神奈川", access: "東京から電車で約1時間半", stays: ["day", "1night"], budget: 2,
    profile: { onsen: 3, relax: 3, mountain: 2, romance: 2, nature: 1 },
    plan: "登山電車とロープウェイで山を上がり、芦ノ湖をめぐって温泉で締める。",
    actions: ["周遊パスで乗り物をまとめる", "芦ノ湖の遊覧船に乗る", "日帰り温泉か宿でゆっくり"]
  },
  {
    name: "横浜（みなとみらい・中華街）", area: "神奈川", access: "東京から電車で約30分", stays: ["day"], budget: 1,
    profile: { city: 3, night: 3, food: 2, romance: 2, family: 1 },
    plan: "中華街で食べ歩き、山下公園を歩いて、夜はみなとみらいの夜景。",
    actions: ["中華街は昼前に着く", "赤レンガ倉庫を散歩", "夜景は大さん橋から"]
  },
  {
    name: "熱海", area: "静岡", access: "東京から新幹線で約45分", stays: ["day", "1night"], budget: 2,
    profile: { onsen: 3, sea: 2, relax: 2, food: 2, night: 1 },
    plan: "駅前の商店街で食べ歩き、海辺を散歩して、温泉でのんびり。",
    actions: ["駅前の商店街で食べ歩き", "海沿いのサンビーチを散歩", "日帰り温泉に入る"]
  },
  {
    name: "伊豆高原・伊東", area: "静岡", access: "東京から電車で約2時間", stays: ["1night", "2night"], budget: 2,
    profile: { sea: 2, nature: 2, relax: 2, onsen: 2, family: 2, thrill: 1 },
    plan: "海の見える遊歩道や大室山、小さな美術館をめぐって温泉宿へ。",
    actions: ["城ヶ崎海岸のつり橋を渡る", "大室山のリフトに乗る", "温泉つきの宿を選ぶ"]
  },
  {
    name: "下田", area: "静岡", access: "東京から電車で約2時間半〜3時間", stays: ["1night", "2night"], budget: 2,
    profile: { sea: 3, romance: 2, relax: 2, nature: 1 },
    plan: "白い砂浜と青い海。何もしない時間を楽しむ南伊豆の海旅。",
    actions: ["白浜海岸で海をながめる", "ペリーロードを散歩", "海鮮の店を1軒決めておく"]
  },
  {
    name: "河口湖・富士五湖", area: "山梨", access: "東京から電車・バスで約2時間", stays: ["day", "1night"], budget: 2,
    profile: { nature: 3, mountain: 2, romance: 2, family: 1, thrill: 1 },
    plan: "湖ごしの富士山を見ながらサイクリングやロープウェイ。晴れた日がおすすめ。",
    actions: ["天気予報で富士山が見える日を選ぶ", "湖畔をレンタサイクルで回る", "ロープウェイで展望台へ"]
  },
  {
    name: "勝沼・甲府（ぶどうとワイン）", area: "山梨", access: "東京から電車で約1時間半", stays: ["day", "1night"], budget: 2,
    profile: { food: 3, relax: 2, romance: 2, culture: 1 },
    plan: "ワイナリーやぶどう畑をめぐって、ほうとうを食べる大人の日帰り。",
    actions: ["ワイナリーを2軒に絞る", "旬の果物狩りを調べる", "名物のほうとうを食べる"]
  },
  {
    name: "清里・八ヶ岳", area: "山梨", access: "東京から電車で約2時間半", stays: ["1night", "2night"], budget: 2,
    profile: { mountain: 3, nature: 3, relax: 2, family: 1 },
    plan: "高原の牧場とソフトクリーム、星空。空気のおいしさを味わう1泊旅。",
    actions: ["牧場でソフトクリーム", "高原の散歩道を歩く", "夜は星空を見上げる"]
  },
  {
    name: "軽井沢", area: "長野", access: "東京から新幹線で約1時間", stays: ["day", "1night"], budget: 2,
    profile: { nature: 2, relax: 2, romance: 3, food: 1, culture: 1 },
    plan: "林の中のカフェと旧軽井沢の通り、アウトレット。避暑地らしい上品な休日。",
    actions: ["旧軽井沢銀座を散歩", "森の中のカフェで休む", "雲場池を一周する"]
  },
  {
    name: "草津温泉", area: "群馬", access: "東京からバスで約4時間", stays: ["1night", "2night"], budget: 2,
    profile: { onsen: 3, relax: 3, culture: 1, night: 1 },
    plan: "湯畑のまわりを浴衣で歩き、いくつもの湯をめぐる温泉らしい温泉旅。",
    actions: ["湯畑の近くに宿をとる", "共同浴場や日帰り湯をめぐる", "夜の湯畑ライトアップを見る"]
  },
  {
    name: "伊香保温泉", area: "群馬", access: "東京から電車・バスで約2時間半", stays: ["1night"], budget: 2,
    profile: { onsen: 3, culture: 2, relax: 2, romance: 1 },
    plan: "石段街をのぼりながら射的や温泉まんじゅう。レトロな温泉街で1泊。",
    actions: ["石段街を上まで歩く", "温泉まんじゅうを食べ比べ", "石段の近くの宿に泊まる"]
  },
  {
    name: "日光", area: "栃木", access: "東京から電車で約2時間", stays: ["day", "1night"], budget: 2,
    profile: { culture: 3, nature: 2, mountain: 2, family: 1 },
    plan: "東照宮をじっくり見て、いろは坂の先の中禅寺湖や華厳の滝へ。",
    actions: ["東照宮は朝いちばんに", "華厳の滝を見に行く", "名物の湯波（ゆば）を食べる"]
  },
  {
    name: "那須高原", area: "栃木", access: "東京から新幹線とバスで約2時間", stays: ["1night", "2night"], budget: 2,
    profile: { family: 3, nature: 2, thrill: 2, relax: 1, onsen: 1 },
    plan: "牧場や動物とふれあえる施設、遊園地がまとまった高原。家族旅行の定番。",
    actions: ["動物とふれあえる施設を1つ選ぶ", "牧場のソフトクリーム", "車があると回りやすい"]
  },
  {
    name: "鬼怒川温泉", area: "栃木", access: "東京から特急で約2時間", stays: ["1night"], budget: 2,
    profile: { onsen: 3, family: 2, thrill: 1, relax: 2 },
    plan: "渓谷沿いの温泉宿に泊まり、ライン下りやテーマパークで遊ぶ。",
    actions: ["渓谷の見える宿を選ぶ", "ライン下りに乗る", "近くのテーマパークも候補に"]
  },
  {
    name: "宇都宮", area: "栃木", access: "東京から新幹線で約50分", stays: ["day"], budget: 1,
    profile: { food: 3, city: 1, solo: 2, culture: 1 },
    plan: "餃子の店をはしごして、大谷石の地下空間を見に行くグルメ日帰り。",
    actions: ["餃子の店を2〜3軒はしご", "大谷資料館の地下空間へ", "帰りにおみやげの冷凍餃子"]
  },
  {
    name: "川越", area: "埼玉", access: "東京から電車で約40分〜1時間", stays: ["day"], budget: 1,
    profile: { culture: 3, food: 2, romance: 1, solo: 1 },
    plan: "蔵造りの町並みと菓子屋横丁。小江戸を着物で歩くのも楽しい。",
    actions: ["時の鐘を見に行く", "菓子屋横丁で駄菓子", "さつまいものスイーツを食べる"]
  },
  {
    name: "秩父・長瀞", area: "埼玉", access: "東京から特急で約1時間半", stays: ["day", "1night"], budget: 1,
    profile: { nature: 3, thrill: 2, culture: 1, family: 1, food: 1 },
    plan: "長瀞のライン下りで川をくだり、秩父神社と名物グルメをめぐる。",
    actions: ["長瀞のライン下りに乗る", "岩畳を歩く", "わらじかつ丼を食べる"]
  },
  {
    name: "高尾山", area: "東京", access: "新宿から電車で約1時間", stays: ["day"], budget: 1,
    profile: { mountain: 3, nature: 2, solo: 2, family: 1, food: 1 },
    plan: "ケーブルカーも使える初心者向けの山。山頂の景色と下山後のとろろそば。",
    actions: ["歩きやすい靴で行く", "行きはケーブルカーも可", "下山後に温泉とそば"]
  },
  {
    name: "奥多摩", area: "東京", access: "新宿から電車で約2時間", stays: ["day", "1night"], budget: 1,
    profile: { nature: 3, mountain: 2, thrill: 2, solo: 2 },
    plan: "渓谷沿いの遊歩道や鍾乳洞。都内とは思えない深い緑を歩く。",
    actions: ["渓谷の遊歩道を歩く", "鍾乳洞に入る", "日の入り前に帰りの電車を確認"]
  },
  {
    name: "浅草・谷根千", area: "東京", access: "都内", stays: ["day"], budget: 1,
    profile: { culture: 3, food: 2, solo: 2, city: 1 },
    plan: "浅草寺と仲見世、そこから谷中・根津・千駄木の下町を食べ歩き。",
    actions: ["浅草寺は朝が空いている", "谷中銀座で食べ歩き", "夕方は隅田川沿いを散歩"]
  },
  {
    name: "お台場・豊洲", area: "東京", access: "都内", stays: ["day"], budget: 1,
    profile: { city: 2, night: 3, sea: 1, romance: 2, family: 2 },
    plan: "海沿いを歩いて体験型の施設で遊び、夜はレインボーブリッジの夜景。",
    actions: ["体験型の施設を1つ予約", "海沿いの遊歩道を歩く", "夜景は日没後30分ごろ"]
  },
  {
    name: "三浦半島・城ヶ島", area: "神奈川", access: "東京から電車で約1時間半", stays: ["day"], budget: 1,
    profile: { sea: 3, food: 2, nature: 1, solo: 1 },
    plan: "海沿いの岩場を歩いて、三崎港でまぐろを食べる海の日帰り。",
    actions: ["電車とバスのお得なきっぷを調べる", "城ヶ島の海辺を歩く", "三崎港でまぐろ"]
  },
  {
    name: "房総・鴨川", area: "千葉", access: "東京から特急で約2時間", stays: ["day", "1night"], budget: 2,
    profile: { sea: 3, family: 2, thrill: 1, relax: 1 },
    plan: "水族館でシャチのショー、海の見える宿でのんびり。",
    actions: ["水族館のショーの時間を確認", "海の見える宿を選ぶ", "朝の海辺を散歩"]
  },
  {
    name: "ひたちなか・大洗", area: "茨城", access: "東京から特急で約1時間半", stays: ["day"], budget: 1,
    profile: { nature: 2, sea: 2, family: 2, romance: 1, food: 1 },
    plan: "季節の花で丘が染まる公園と、海の上の鳥居、水族館をめぐる。",
    actions: ["公園の花の見ごろを調べる", "大洗の海の鳥居を見る", "水族館も候補に"]
  },
  {
    name: "仙台・松島", area: "宮城", access: "東京から新幹線で約1時間半", stays: ["1night", "2night"], budget: 3,
    profile: { food: 3, sea: 2, culture: 2, city: 1 },
    plan: "牛たんとずんだを食べて、松島の島々を遊覧船から眺める。",
    actions: ["松島の遊覧船に乗る", "牛たんの店を決めておく", "仙台駅でずんだシェイク"]
  },
  {
    name: "京都", area: "京都", access: "東京から新幹線で約2時間15分", stays: ["1night", "2night"], budget: 3,
    profile: { culture: 3, romance: 2, solo: 2, food: 1 },
    plan: "朝の寺社は空いていて静か。エリアを1〜2つに絞ってゆっくり歩く。",
    actions: ["人気の寺社は朝いちばんに", "エリアを2つまでに絞る", "夜は町家の店で食事"]
  },
  {
    name: "金沢", area: "石川", access: "東京から新幹線で約2時間半", stays: ["1night", "2night"], budget: 3,
    profile: { culture: 3, food: 3, romance: 1 },
    plan: "兼六園と茶屋街を歩き、近江町市場で海鮮。食も街並みも楽しめる。",
    actions: ["近江町市場は昼前に", "ひがし茶屋街を散歩", "兼六園は朝が空いている"]
  },
  {
    name: "大阪", area: "大阪", access: "東京から新幹線で約2時間半", stays: ["1night", "2night"], budget: 3,
    profile: { city: 3, food: 3, night: 2, thrill: 2 },
    plan: "道頓堀で食べ倒れ、テーマパークや新世界でとことん遊ぶにぎやか旅。",
    actions: ["粉もんの店をはしご", "テーマパークは前売り券を", "夜の道頓堀を歩く"]
  },
  {
    name: "札幌・小樽", area: "北海道", access: "東京から飛行機で約1時間半", stays: ["2night"], budget: 3,
    profile: { food: 3, city: 2, nature: 2, night: 1, romance: 1 },
    plan: "札幌でラーメンとスープカレー、小樽で運河とガラス細工。",
    actions: ["小樽運河は夕方がきれい", "朝は市場で海鮮丼", "夜は札幌の夜景"]
  },
  {
    name: "沖縄本島", area: "沖縄", access: "東京から飛行機で約2時間半", stays: ["2night"], budget: 3,
    profile: { sea: 3, relax: 3, romance: 2, family: 1 },
    plan: "青い海とのんびりした島時間。移動は少なめにして海辺で過ごす。",
    actions: ["レンタカーを早めに予約", "1日は移動しない日を作る", "夕日の見える浜へ"]
  }
];

const reasonLabels = {
  relax: "ゆっくり休みたい",
  thrill: "体を動かして遊びたい",
  romance: "雰囲気を大事にしたい",
  nature: "自然にふれたい",
  city: "街を楽しみたい",
  sea: "海が見たい",
  mountain: "山や高原の空気がほしい",
  culture: "町並みや歴史を見たい",
  night: "夜景も楽しみたい",
  solo: "自分のペースで回りたい",
  food: "ご当地グルメが楽しみ",
  onsen: "温泉に入りたい",
  family: "家族で安心して楽しみたい"
};

const stayLabels = { day: "日帰り", "1night": "1泊", "2night": "2泊以上" };
const budgetLabels = { 1: "〜1万円", 2: "〜3万円", 3: "3万円〜" };

const state = { step: 0, picks: [], ranked: [], shown: 0 };

const $ = (id) => document.getElementById(id);
const introScreen = $("intro-screen");
const quizScreen = $("quiz-screen");
const resultScreen = $("result-screen");
const answersWrap = $("answers");
const backBtn = $("back-btn");
const shareFeedback = $("share-feedback");

function openScreen(screen) {
  [introScreen, quizScreen, resultScreen].forEach((s) => s.classList.add("hidden"));
  screen.classList.remove("hidden");
  window.scrollTo(0, 0);
}

function resetQuiz() {
  state.step = 0;
  state.picks = [];
  state.ranked = [];
  openScreen(introScreen);
}

function buildScore() {
  const score = {};
  state.picks.forEach((pick) => {
    Object.entries(pick.score).forEach(([key, point]) => {
      score[key] = (score[key] || 0) + point;
    });
  });
  return score;
}

function rankDestinations() {
  const score = buildScore();
  const stay = state.picks[0].stay;
  const budget = state.picks[1].budget;
  return destinations
    .map((dest) => {
      const weight = Object.values(dest.profile).reduce((a, b) => a + b, 0);
      // 特徴の多い行き先ばかり出ないよう、特徴の合計で割ってならす
      let match = (Object.entries(dest.profile).reduce((total, [key, point]) => total + point * (score[key] || 0), 0) * 3) / Math.sqrt(weight);
      // 日数と予算は好みより優先する。合わない行き先は大きく下げる
      if (!dest.stays.includes(stay)) match -= 60;
      if (dest.budget > budget) match -= 40 * (dest.budget - budget);
      // 2泊以上なら遠くの行き先を少し優先
      if (stay === "2night" && dest.budget === 3) match += 6;
      return { dest, match };
    })
    .sort((a, b) => b.match - a.match)
    .map((r) => r.dest);
}

function reasonsFor(dest) {
  const score = buildScore();
  const reasons = Object.keys(dest.profile)
    .filter((key) => score[key])
    .sort((a, b) => dest.profile[b] * score[b] - dest.profile[a] * score[a])
    .slice(0, 2)
    .map((key) => reasonLabels[key]);
  const stay = state.picks[0].stay;
  if (dest.stays.includes(stay)) reasons.push(`${stayLabels[stay]}で行ける`);
  return reasons;
}

function updateProgress() {
  const total = questions.length;
  $("progress-step").textContent = `${state.step + 1} / ${total}`;
  $("progress-fill").style.width = `${Math.max((state.step / total) * 100, 4)}%`;
  backBtn.disabled = state.step === 0;
}

function showQuestion() {
  openScreen(quizScreen);
  const q = questions[state.step];
  $("question-text").textContent = q.text;
  $("question-hint").textContent = q.hint;
  updateProgress();

  answersWrap.innerHTML = "";
  q.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    const title = document.createElement("span");
    title.className = "answer-title";
    title.textContent = choice.label;
    const meta = document.createElement("span");
    meta.className = "answer-meta";
    meta.textContent = choice.note;
    button.append(title, meta);
    button.addEventListener("click", () => selectChoice(choice));
    answersWrap.appendChild(button);
  });
}

function selectChoice(choice) {
  state.picks[state.step] = choice;
  state.step += 1;
  if (state.step < questions.length) {
    showQuestion();
    return;
  }
  state.ranked = rankDestinations();
  showResult(0);
}

function goBack() {
  if (state.step === 0) return;
  state.step -= 1;
  state.picks = state.picks.slice(0, state.step);
  showQuestion();
}

function mapsDirUrl(dest) {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest.name.replace(/（.*）/, "") + " " + dest.area)}`;
}

function mapsStayUrl(dest) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(dest.name.replace(/（.*）/, "") + " 宿")}`;
}

function guideUrl(dest) {
  return `https://www.google.com/search?q=${encodeURIComponent(dest.name.replace(/（.*）/, "") + " 観光 モデルコース")}`;
}

function showResult(index) {
  state.shown = index;
  const dest = state.ranked[index];
  const stay = state.picks[0].stay;

  $("destination").textContent = dest.name;
  $("result-meta").textContent = `${dest.area}・${dest.access}・${budgetLabels[dest.budget]}`;
  $("plan").textContent = dest.plan;

  const reasons = $("reasons");
  reasons.innerHTML = "";
  reasonsFor(dest).forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    reasons.appendChild(li);
  });

  const actions = $("actions");
  actions.innerHTML = "";
  dest.actions.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    actions.appendChild(li);
  });

  $("route-link").href = mapsDirUrl(dest);
  $("guide-link").href = guideUrl(dest);
  const stayLink = $("stay-link");
  stayLink.href = mapsStayUrl(dest);
  stayLink.classList.toggle("hidden", stay === "day");

  const others = $("others");
  others.innerHTML = "";
  state.ranked.slice(0, 3).forEach((d, i) => {
    if (i === index) return;
    const button = document.createElement("button");
    button.type = "button";
    button.className = "other-btn";
    const name = document.createElement("strong");
    name.textContent = d.name;
    const meta = document.createElement("span");
    meta.textContent = d.access;
    button.append(name, meta);
    button.addEventListener("click", () => showResult(i));
    others.appendChild(button);
  });

  shareFeedback.textContent = "";
  $("progress-fill").style.width = "100%";
  openScreen(resultScreen);
  resultScreen.classList.remove("result-animate");
  void resultScreen.offsetWidth;
  resultScreen.classList.add("result-animate");
}

async function shareResult() {
  const dest = state.ranked[state.shown];
  const text = `TripTuneの旅先診断で「${dest.name}」になりました。${dest.plan}`;
  const url = location.origin + location.pathname;
  try {
    if (navigator.share) {
      await navigator.share({ title: "TripTune", text, url });
      return;
    }
    await navigator.clipboard.writeText(`${text}\n${url}`);
    shareFeedback.textContent = "結果をコピーしました。LINEなどに貼りつけて送れます。";
  } catch (e) {
    if (e && e.name === "AbortError") return;
    shareFeedback.textContent = "コピーできませんでした。画面を長押ししてコピーしてください。";
  }
}

$("start-btn").addEventListener("click", showQuestion);
$("retry-btn").addEventListener("click", resetQuiz);
backBtn.addEventListener("click", goBack);
$("share-btn").addEventListener("click", shareResult);

resetQuiz();
