
const params = new URLSearchParams(location.search);
let mode = params.get("mode") === "vivid" ? "vivid" : "calm";

const questions = [
  {
    id: "mood",
    text: "いま欲しい空気感は？",
    hint: "気分に近いものをひとつ選んでください。",
    choices: [
      { label: "ゆったり", note: "深呼吸できる時間が欲しい", score: { relax: 3, culture: 1 } },
      { label: "刺激的", note: "テンション高めでいきたい", score: { thrill: 3, night: 2 } },
      { label: "ロマンチック", note: "物語っぽい空気が好き", score: { romance: 3, sea: 1 } },
      { label: "カオス", note: "予想外の展開に惹かれる", score: { thrill: 2, city: 2, night: 2 } }
    ]
  },
  {
    id: "view",
    text: "惹かれる景色は？",
    hint: "旅先の背景をイメージして選んでください。",
    choices: [
      { label: "森林・大地", note: "自然に包まれたい", score: { nature: 3, relax: 2 } },
      { label: "ネオン街", note: "光と音の密度を浴びたい", score: { city: 3, night: 2 } },
      { label: "海辺", note: "波音と開放感が好き", score: { sea: 3, romance: 2 } },
      { label: "高原・山", note: "空気の透明度を重視", score: { mountain: 3, nature: 2 } }
    ]
  },
  {
    id: "company",
    text: "だれと旅する？",
    hint: "同行者で旅の解釈が変わります。",
    choices: [
      { label: "ひとり", note: "自分のペース重視", score: { solo: 3, culture: 1 } },
      { label: "友達", note: "体験共有で盛り上がりたい", score: { thrill: 2, city: 1 } },
      { label: "恋人", note: "雰囲気を大切にしたい", score: { romance: 3, sea: 1 } },
      { label: "家族", note: "安心して楽しみたい", score: { relax: 2, culture: 2 } }
    ]
  },
  {
    id: "season",
    text: "いま想像している季節は？",
    hint: "体感温度を決めるイメージで。",
    choices: [
      { label: "春", note: "軽やかに出かけたい", score: { culture: 2, relax: 1 } },
      { label: "夏", note: "熱量のある時間がいい", score: { sea: 2, thrill: 2 } },
      { label: "秋", note: "余韻のある景色が好き", score: { romance: 2, culture: 2 } },
      { label: "冬", note: "濃い体験に寄せたい", score: { night: 2, city: 1, mountain: 1 } }
    ]
  },
  {
    id: "purpose",
    text: "今回の旅で満たしたいものは？",
    hint: "最後に、旅の目的を選んでください。",
    choices: [
      { label: "癒し", note: "リセットしたい", score: { relax: 3, nature: 1 } },
      { label: "冒険", note: "未知の体験を取りにいく", score: { thrill: 3, mountain: 1 } },
      { label: "文化体験", note: "学びや発見を楽しみたい", score: { culture: 3, city: 1 } },
      { label: "高揚感", note: "ドキドキを優先したい", score: { night: 3, romance: 1 } }
    ]
  }
];

const destinations = [
  {
    name: "北海道",
    profile: { nature: 3, relax: 2, mountain: 2, culture: 1 },
    calmPlan: "広い自然の中で温泉やローカルグルメをゆっくり巡る旅。",
    vividTag: "雪夜 ロマンス"
  },
  {
    name: "東京",
    profile: { city: 3, thrill: 2, culture: 2, night: 2 },
    calmPlan: "昼はアートや街歩き、夜はネオン散策で刺激を回収する旅。",
    vividTag: "都会 密室スリル"
  },
  {
    name: "沖縄",
    profile: { sea: 3, relax: 2, romance: 2, thrill: 1 },
    calmPlan: "海辺で解放感を感じながら、島時間で心拍を整える旅。",
    vividTag: "南国 甘美バカンス"
  },
  {
    name: "長野",
    profile: { mountain: 3, nature: 2, relax: 1, culture: 2 },
    calmPlan: "高原と温泉、地元文化を組み合わせて静かな達成感を得る旅。",
    vividTag: "秘湯 禁断トリップ"
  },
  {
    name: "神戸",
    profile: { romance: 3, city: 2, culture: 2, night: 1 },
    calmPlan: "港町の夜景と洋館エリアを巡り、少し背伸びした旅時間を楽しむ。",
    vividTag: "港町 艶めきデート"
  }
];

const state = {
  step: 0,
  picks: []
};

const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const questionLabel = document.getElementById("question-label");
const questionHint = document.getElementById("question-hint");
const answersWrap = document.getElementById("answers");
const progressStep = document.getElementById("progress-step");
const progressFill = document.getElementById("progress-fill");
const backBtn = document.getElementById("back-btn");
const destinationEl = document.getElementById("destination");
const descEl = document.getElementById("desc");
const reasonsEl = document.getElementById("reasons");
const planCopyEl = document.getElementById("plan-copy");
const inviteArea = document.getElementById("invite-area");
const searchLink = document.getElementById("search-link");
const modeSwitch = document.getElementById("mode-switch");

function setMode(nextMode, updateUrl = true) {
  mode = nextMode === "vivid" ? "vivid" : "calm";
  document.body.dataset.mode = mode;

  if (mode === "vivid") {
    modeSwitch.textContent = "現在: 大人モード";
    modeSwitch.classList.add("active");
  } else {
    modeSwitch.textContent = "現在: 通常モード";
    modeSwitch.classList.remove("active");
  }

  if (updateUrl) {
    const url = new URL(location.href);
    if (mode === "vivid") {
      url.searchParams.set("mode", "vivid");
    } else {
      url.searchParams.delete("mode");
    }
    history.replaceState({}, "", url);
  }
}

function openScreen(screen) {
  introScreen.classList.add("hidden");
  quizScreen.classList.add("hidden");
  resultScreen.classList.add("hidden");
  screen.classList.remove("hidden");
}

function resetQuiz() {
  state.step = 0;
  state.picks = [];
  openScreen(introScreen);
}

function buildScore() {
  return state.picks.reduce((sum, pick) => {
    Object.entries(pick.score).forEach(([key, point]) => {
      sum[key] = (sum[key] || 0) + point;
    });
    return sum;
  }, {});
}

function getTopSignals(score, count = 3) {
  return Object.entries(score)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count);
}

function chooseDestination(score) {
  const ranked = destinations
    .map((dest) => {
      const match = Object.entries(dest.profile).reduce((total, [key, point]) => {
        return total + point * (score[key] || 0);
      }, 0);
      return { ...dest, match };
    })
    .sort((a, b) => b.match - a.match);

  return ranked[0];
}

function reasonText(signal, point) {
  const labels = {
    relax: "ゆったり回復したい気分",
    thrill: "刺激を求めるテンション",
    romance: "ロマン重視の感性",
    nature: "自然を求める志向",
    city: "都市エネルギーを浴びたい欲求",
    sea: "開放感と海辺への憧れ",
    mountain: "高低差のある景色への関心",
    culture: "文化体験への好奇心",
    night: "夜に強い高揚感",
    solo: "自分軸で動きたい意識"
  };

  const label = labels[signal] || signal;
  return `${label}（スコア ${point}）`;
}

function selectedSummary() {
  return state.picks.map((pick) => pick.label).join(" / ");
}

function updateProgress() {
  const total = questions.length;
  progressStep.textContent = `Q${state.step + 1} / Q${total}`;
  const ratio = (state.step / total) * 100;
  progressFill.style.width = `${Math.max(ratio, 4)}%`;
  backBtn.disabled = state.step === 0;
}

function showQuestion() {
  openScreen(quizScreen);
  const q = questions[state.step];
  questionLabel.textContent = `Question ${state.step + 1}`;
  questionText.textContent = q.text;
  questionHint.textContent = q.hint;
  updateProgress();

  answersWrap.innerHTML = "";
  q.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.innerHTML = `<span class="answer-title">${choice.label}</span><span class="answer-meta">${choice.note}</span>`;
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
  showResult();
}

function goBack() {
  if (state.step === 0) {
    return;
  }
  state.step -= 1;
  showQuestion();
}

function resultDescription(placeName, score) {
  const top = getTopSignals(score, 2).map(([key]) => reasonText(key, score[key]).split("（")[0]);
  return `あなたの旅テンションは「${top.join(" × ")}」タイプ。今は ${placeName} が最も噛み合います。`;
}

function buildSearchLink(destination, score) {
  const topSignal = getTopSignals(score, 1)[0]?.[0] || "culture";
  const signalWordMap = {
    relax: "癒し",
    thrill: "刺激",
    romance: "ロマンチック",
    nature: "自然",
    city: "都会",
    sea: "海",
    mountain: "高原",
    culture: "文化",
    night: "夜景",
    solo: "一人旅"
  };

  if (mode === "vivid") {
    const keyword = `${destination.vividTag} ${signalWordMap[topSignal] || "異文化"}`;
    return {
      href: `https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=${encodeURIComponent(keyword)}`,
      label: "大人向けキーワードを探す"
    };
  }

  const keyword = `${destination.name} 旅行 ${signalWordMap[topSignal] || "観光"}`;
  return {
    href: `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
    label: "旅先情報を検索する"
  };
}

function showResult() {
  const score = buildScore();
  const destination = chooseDestination(score);
  const topSignals = getTopSignals(score, 3);
  const linkData = buildSearchLink(destination, score);

  destinationEl.textContent = destination.name;
  descEl.textContent = resultDescription(destination.name, score);
  planCopyEl.textContent = `${destination.calmPlan}（選択: ${selectedSummary()}）`;
  searchLink.href = linkData.href;
  searchLink.textContent = linkData.label;

  reasonsEl.innerHTML = "";
  topSignals.forEach(([signal, point]) => {
    const li = document.createElement("li");
    li.textContent = reasonText(signal, point);
    reasonsEl.appendChild(li);
  });

  if (mode === "calm") {
    inviteArea.classList.remove("hidden");
  } else {
    inviteArea.classList.add("hidden");
  }

  progressFill.style.width = "100%";
  openScreen(resultScreen);
}

document.getElementById("start-btn").addEventListener("click", showQuestion);
document.getElementById("retry-btn").addEventListener("click", resetQuiz);
document.getElementById("back-btn").addEventListener("click", goBack);
document.getElementById("invite-btn").addEventListener("click", () => {
  setMode("vivid");
  showResult();
});
modeSwitch.addEventListener("click", () => {
  setMode(mode === "calm" ? "vivid" : "calm");
  if (!resultScreen.classList.contains("hidden") && state.picks.length === questions.length) {
    showResult();
  }
});

setMode(mode, false);
resetQuiz();
