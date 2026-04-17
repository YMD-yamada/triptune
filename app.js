
const params = new URLSearchParams(location.search);
let mode = params.get("mode") === "vivid" ? "vivid" : "calm";

const storageKey = "triptune-favorites";
const historyKey = "triptune-history";
const premiumEmailKey = "triptune-premium-email";

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
  },
  {
    id: "pace",
    text: "旅のテンポはどれが理想？",
    hint: "詰め込み派か、余白派かを選んでください。",
    choices: [
      { label: "のんびり", note: "一日に1〜2個の予定で十分", score: { relax: 3, solo: 1 } },
      { label: "バランス型", note: "歩く時間も休む時間も欲しい", score: { culture: 2, romance: 1 } },
      { label: "アクティブ", note: "朝から夜まで動きたい", score: { thrill: 3, city: 1 } },
      { label: "夜型", note: "日没後から本番", score: { night: 3, city: 1 } }
    ]
  },
  {
    id: "budget",
    text: "今日はどんな贅沢をしたい？",
    hint: "お金の使い方にも旅の個性が出ます。",
    choices: [
      { label: "ご当地コスパ", note: "賢く楽しく遊びたい", score: { culture: 2, solo: 1 } },
      { label: "食に全振り", note: "グルメで満足度を上げたい", score: { culture: 2, relax: 1 } },
      { label: "体験に投資", note: "アクティビティ重視", score: { thrill: 2, mountain: 1, sea: 1 } },
      { label: "雰囲気重視", note: "景色やホテルに浸りたい", score: { romance: 2, night: 1 } }
    ]
  }
];

const destinations = [
  {
    name: "北海道",
    profile: { nature: 3, relax: 2, mountain: 2, culture: 1 },
    calmPlan: "広い自然の中で温泉やローカルグルメをゆっくり巡る旅。",
    vividTag: "雪夜 ロマンス",
    badge: "王道リトリート",
    scene: "温泉と雪景色で気持ちをほぐしたい日に向きやすいムードです。",
    actions: ["朝風呂のある宿を探す", "ローカルグルメを3つ候補に入れる", "移動時間も景色として楽しむ"],
    image: "ALPINE AIR"
  },
  {
    name: "東京",
    profile: { city: 3, thrill: 2, culture: 2, night: 2 },
    calmPlan: "昼はアートや街歩き、夜はネオン散策で刺激を回収する旅。",
    vividTag: "都会 密室スリル",
    badge: "高密度シティ",
    scene: "感度の高いスポットをはしごしたい日に強い選択肢。",
    actions: ["エリアを2つに絞って回遊する", "昼は展示、夜は夜景の導線を組む", "予約が必要な店を1つ入れる"],
    image: "CITY LIGHT"
  },
  {
    name: "沖縄",
    profile: { sea: 3, relax: 2, romance: 2, thrill: 1 },
    calmPlan: "海辺で解放感を感じながら、島時間で心拍を整える旅。",
    vividTag: "南国 甘美バカンス",
    badge: "開放感リゾート",
    scene: "考え込みすぎず、体をゆるめる休日を作りたい時に寄せやすいムードです。",
    actions: ["サンセットが見える場所を押さえる", "移動は少なめにして海辺時間を確保する", "島グルメを主役にする"],
    image: "SEA ESCAPE"
  },
  {
    name: "長野",
    profile: { mountain: 3, nature: 2, relax: 1, culture: 2 },
    calmPlan: "高原と温泉、地元文化を組み合わせて静かな達成感を得る旅。",
    vividTag: "秘湯 禁断トリップ",
    badge: "深呼吸マウンテン",
    scene: "空気の軽さや景色の抜け感で頭を切り替えたい人向け。",
    actions: ["朝の散歩ルートを先に決める", "温泉とカフェをセットで組む", "景色が良い時間帯に合わせて移動する"],
    image: "MOUNTAIN CALM"
  },
  {
    name: "神戸",
    profile: { romance: 3, city: 2, culture: 2, night: 1 },
    calmPlan: "港町の夜景と洋館エリアを巡り、少し背伸びした旅時間を楽しむ。",
    vividTag: "港町 艶めきデート",
    badge: "ムード先行型",
    scene: "景色・食・会話の3つを心地よく成立させたい日に向いています。",
    actions: ["夕暮れに港側へ寄る", "雰囲気の良いカフェを1軒予約する", "写真が映える通りを散歩する"],
    image: "HARBOR MOOD"
  }
];

const state = {
  step: 0,
  picks: [],
  result: null
};

const introScreen = document.getElementById("intro-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionText = document.getElementById("question-text");
const questionLabel = document.getElementById("question-label");
const questionHint = document.getElementById("question-hint");
const answersWrap = document.getElementById("answers");
const selectionTrail = document.getElementById("selection-trail");
const progressStep = document.getElementById("progress-step");
const progressFill = document.getElementById("progress-fill");
const backBtn = document.getElementById("back-btn");
const destinationEl = document.getElementById("destination");
const descEl = document.getElementById("desc");
const reasonsEl = document.getElementById("reasons");
const planCopyEl = document.getElementById("plan-copy");
const picksListEl = document.getElementById("picks-list");
const inviteArea = document.getElementById("invite-area");
const searchLink = document.getElementById("search-link");
const modeSwitch = document.getElementById("mode-switch");
const cardDestinationEl = document.getElementById("card-destination");
const cardCopyEl = document.getElementById("card-copy");
const cardTagsEl = document.getElementById("card-tags");
const shareNativeBtn = document.getElementById("share-native-btn");
const shareCopyBtn = document.getElementById("share-copy-btn");
const shareXLink = document.getElementById("share-x-link");
const shareFeedback = document.getElementById("share-feedback");
const favoriteBtn = document.getElementById("favorite-btn");
const favoriteFeedback = document.getElementById("favorite-feedback");
const favoritesList = document.getElementById("favorites-list");
const compareList = document.getElementById("compare-list");
const tripSceneEl = document.getElementById("trip-scene");
const planChecklist = document.getElementById("plan-checklist");
const confidenceMeter = document.getElementById("confidence-meter");
const confidenceLabel = document.getElementById("confidence-label");
const destinationBadge = document.getElementById("destination-badge");
const heroVisualText = document.getElementById("hero-visual-text");
const premiumForm = document.getElementById("premium-form");
const premiumEmail = document.getElementById("premium-email");
const premiumFeedback = document.getElementById("premium-feedback");
const historyList = document.getElementById("history-list");
const miniItineraryEl = document.getElementById("mini-itinerary");
const altDestinationsEl = document.getElementById("alt-destinations");
const shareImageBtn = document.getElementById("share-image-btn");
const compareFavoritesBtn = document.getElementById("compare-favorites-btn");
const compareFeedback = document.getElementById("compare-feedback");
const summaryChoiceEl = document.getElementById("summary-choice");
const summaryReasonEl = document.getElementById("summary-reason");
const summaryActionEl = document.getElementById("summary-action");
const detailsToggleBtn = document.getElementById("details-toggle-btn");
const detailsContent = document.getElementById("details-content");
let latestShareText = "";

function setFeedback(el, message) {
  if (el) {
    el.textContent = message;
  }
}

function loadFavorites() {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "[]");
  } catch (error) {
    return [];
  }
}

function saveFavorites(items) {
  localStorage.setItem(storageKey, JSON.stringify(items));
}

function loadHistory() {
  try {
    return JSON.parse(localStorage.getItem(historyKey) || "[]");
  } catch (error) {
    return [];
  }
}

function saveHistory(items) {
  localStorage.setItem(historyKey, JSON.stringify(items));
}

function topSignalWord(signal) {
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

  return signalWordMap[signal] || "旅";
}

function modeLabel() {
  return mode === "vivid" ? "大人モード" : "通常モード";
}

function ensurePremiumEmail() {
  const stored = localStorage.getItem(premiumEmailKey);
  if (stored) {
    premiumEmail.value = stored;
  }
}

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
  state.result = null;
  latestShareText = "";
  setFeedback(shareFeedback, "");
  setFeedback(favoriteFeedback, "");
  setFeedback(premiumFeedback, "");
  setFeedback(compareFeedback, "");
  openScreen(introScreen);
  renderSelectionTrail();
  if (detailsContent) {
    detailsContent.classList.add("hidden");
  }
  if (detailsToggleBtn) {
    detailsToggleBtn.textContent = "詳細を見る";
  }
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

  return ranked;
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

function renderSelectionTrail() {
  if (!selectionTrail) {
    return;
  }
  selectionTrail.innerHTML = "";
  if (state.picks.length === 0) {
    const empty = document.createElement("span");
    empty.className = "trail-chip";
    empty.textContent = "まだ未選択";
    selectionTrail.appendChild(empty);
    return;
  }

  state.picks.forEach((pick, index) => {
    const chip = document.createElement("span");
    chip.className = "trail-chip";
    chip.textContent = `Q${index + 1}: ${pick.label}`;
    selectionTrail.appendChild(chip);
  });
}

function renderPickChips() {
  if (!picksListEl) {
    return;
  }
  picksListEl.innerHTML = "";
  state.picks.forEach((pick, index) => {
    const chip = document.createElement("span");
    chip.className = "pick-chip";
    chip.textContent = `Q${index + 1}: ${pick.label}`;
    picksListEl.appendChild(chip);
  });
}

function renderCard(destination, topSignals) {
  if (!cardDestinationEl || !cardCopyEl || !cardTagsEl) {
    return;
  }
  cardDestinationEl.textContent = destination.name;
  cardCopyEl.textContent = `${mode === "vivid" ? "夜のムードまで含めて" : "今の気分に寄り添って"}、${destination.name} がしっくりきています。`;
  if (heroVisualText) {
    heroVisualText.textContent = destination.image;
  }
  cardTagsEl.innerHTML = "";
  topSignals.forEach(([signal]) => {
    const tag = document.createElement("span");
    tag.className = "card-tag";
    tag.textContent = topSignalWord(signal);
    cardTagsEl.appendChild(tag);
  });
}

function renderCompareList(ranked) {
  if (!compareList) {
    return;
  }
  compareList.innerHTML = "";
  ranked.slice(0, 3).forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "compare-card";
    const label = index === 0 ? "メイン提案" : `候補 ${index}`;
    card.innerHTML = `
      <strong>${item.name}</strong>
      <span>${label} / スコア感 ${item.match}</span>
      <p>${item.badge} — ${item.scene}</p>
    `;
    compareList.appendChild(card);
  });
}

function renderPlanChecklist(destination) {
  if (!planChecklist) {
    return;
  }
  planChecklist.innerHTML = "";
  destination.actions.forEach((action) => {
    const li = document.createElement("li");
    li.textContent = action;
    planChecklist.appendChild(li);
  });
}

function pickByQuestionId(id) {
  const index = questions.findIndex((q) => q.id === id);
  if (index === -1) {
    return null;
  }
  return state.picks[index] || null;
}

function buildDailyItinerary(destination, score) {
  const pace = pickByQuestionId("pace");
  const company = pickByQuestionId("company");
  const isNightHeavy = (score.night || 0) >= 6;
  const isRelaxHeavy = (score.relax || 0) >= 8;

  const slots = [];

  if (pace?.label === "夜型" || isNightHeavy) {
    slots.push({ time: "昼", text: `${destination.name} の中心部で軽く食べて、カフェか美術館で体温を下げる。` });
    slots.push({ time: "夕方", text: "移動は短めにして、夕景がきれいなエリアへ寄り道する。" });
    slots.push({ time: "夜", text: "夜景やネオン、落ち着いたバーなど、夜の密度を選んで締める。" });
  } else if (pace?.label === "のんびり" || isRelaxHeavy) {
    slots.push({ time: "朝", text: "朝食は近場で済ませ、無理のない出発時間にする。" });
    slots.push({ time: "昼", text: `${destination.name} で「歩くより座る」時間を多めに取る。` });
    slots.push({ time: "夕方", text: "温泉・公園・海辺など、呼吸が深くなる場所で締める。" });
  } else {
    slots.push({ time: "朝", text: `${destination.name} のメインエリアに早めに入り、混雑前に動く。` });
    slots.push({ time: "昼", text: "展示・展望・市場など、体感で楽しめるスポットを1つ厚めに入れる。" });
    slots.push({ time: "夕方", text: company?.label === "恋人" ? "景色の良い通りをゆっくり歩いて締める。" : "ご当地グルメで締め、翌日に備えて早めに休む。" });
  }

  return slots;
}

function renderMiniItinerary(destination, score) {
  if (!miniItineraryEl) {
    return;
  }
  miniItineraryEl.innerHTML = "";
  buildDailyItinerary(destination, score).forEach((slot) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${slot.time}</strong> ${slot.text}`;
    miniItineraryEl.appendChild(li);
  });
}

function renderAltDestinations(ranked) {
  if (!altDestinationsEl) {
    return;
  }
  altDestinationsEl.innerHTML = "";
  ranked.slice(1, 4).forEach((item) => {
    const card = document.createElement("div");
    card.className = "alt-destination-card";
    card.innerHTML = `
      <strong>${item.name}</strong>
      <span class="alt-meta">${item.badge} / スコア感 ${item.match}</span>
      <p class="alt-meta">${item.scene}</p>
    `;
    altDestinationsEl.appendChild(card);
  });
}

function renderHistory() {
  if (!historyList) {
    return;
  }
  const history = loadHistory();
  historyList.innerHTML = "";

  if (history.length === 0) {
    const empty = document.createElement("span");
    empty.className = "favorite-pill";
    empty.textContent = "最近の診断はまだありません";
    historyList.appendChild(empty);
    return;
  }

  history.forEach((item) => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <div>
        <strong>${item.destination}</strong>
        <p>${item.modeLabel} / ${item.createdAt}</p>
      </div>
      <span class="history-score">${item.signature}</span>
    `;
    historyList.appendChild(card);
  });
}

function renderFavorites() {
  if (!favoritesList) {
    return;
  }
  const favorites = loadFavorites();
  favoritesList.innerHTML = "";

  if (favorites.length === 0) {
    const empty = document.createElement("span");
    empty.className = "favorite-pill";
    empty.textContent = "まだ保存されていません";
    favoritesList.appendChild(empty);
    return;
  }

  favorites.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "favorite-card";
    row.innerHTML = `
      <div class="favorite-copy">
        <span class="favorite-title">${item.destination}</span>
        <span class="favorite-meta">${item.modeLabel} / ${item.summary}</span>
      </div>
      <button class="favorite-action" type="button" data-index="${index}">削除</button>
    `;
    favoritesList.appendChild(row);
  });

  favoritesList.querySelectorAll(".favorite-action").forEach((button) => {
    button.addEventListener("click", () => {
      const favoritesNext = loadFavorites();
      favoritesNext.splice(Number(button.dataset.index), 1);
      saveFavorites(favoritesNext);
      setFeedback(favoriteFeedback, "お気に入りから削除しました。");
      renderFavorites();
    });
  });
}

function updateConfidence(topSignals) {
  if (!confidenceMeter || !confidenceLabel) {
    return;
  }
  const total = topSignals.reduce((sum, [, point]) => sum + point, 0) || 1;
  const best = topSignals[0]?.[1] || 0;
  const second = topSignals[1]?.[1] || 0;
  const spread = Math.max(0, best - second);
  const clarity = Math.min(100, Math.round((best / total) * 55 + spread * 8));
  confidenceMeter.style.width = `${clarity}%`;
  confidenceLabel.textContent = `回答の傾向のはっきり度（参考） ${clarity}% — 科学的な正答率ではありません。`;
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
  setFeedback(shareFeedback, "");
  setFeedback(favoriteFeedback, "");
  setFeedback(compareFeedback, "");
  const q = questions[state.step];
  questionLabel.textContent = `Question ${state.step + 1}`;
  questionText.textContent = q.text;
  questionHint.textContent = q.hint;
  updateProgress();
  renderSelectionTrail();

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
  state.picks = state.picks.slice(0, state.step - 1);
  state.step -= 1;
  showQuestion();
}

function resultDescription(placeName, score) {
  const top = getTopSignals(score, 2).map(([key]) => reasonText(key, score[key]).split("（")[0]);
  return `あなたの旅テンションは「${top.join(" × ")}」タイプ。今回の回答では ${placeName} がいちばん近いイメージです。`;
}

function buildSearchLink(destination, score) {
  const topSignal = getTopSignals(score, 1)[0]?.[0] || "culture";
  if (mode === "vivid") {
    const keyword = `${destination.vividTag} ${topSignalWord(topSignal) || "異文化"}`;
    return {
      href: `https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=${encodeURIComponent(keyword)}`,
      label: "大人向けキーワードを探す"
    };
  }

  const keyword = `${destination.name} 旅行 ${topSignalWord(topSignal) || "観光"}`;
  return {
    href: `https://www.google.com/search?q=${encodeURIComponent(keyword)}`,
    label: "旅先情報を検索する"
  };
}

function shareDisclaimer() {
  return "※ 診断はエンタメ用途です。予約・割引・科学的な正答率とは無関係です。";
}

function buildSharePayload() {
  if (!state.result) {
    return null;
  }

  const url = new URL(location.href);
  const currentModeLabel = modeLabel();
  return {
    title: "TripTune 診断結果",
    text: [
      "TripTune 診断結果",
      `旅先: ${state.result.destination.name}`,
      `モード: ${currentModeLabel}`,
      state.result.description,
      `選択: ${selectedSummary()}`,
      `おすすめ: ${state.result.destination.calmPlan}`,
      shareDisclaimer(),
      url.toString()
    ].join("\n")
  };
}

async function shareResult() {
  const payload = buildSharePayload();
  if (!payload) {
    setFeedback(shareFeedback, "先に診断結果を作成してください。");
    return;
  }

  try {
    let file = null;
    try {
      file = await buildShareCardPngFile();
    } catch (e) {
      file = null;
    }

    if (navigator.share) {
      const shareData = { ...payload };
      if (file && navigator.canShare && navigator.canShare({ files: [file] })) {
        shareData.files = [file];
      }
      await navigator.share(shareData);
      setFeedback(shareFeedback, "シェア画面を開きました。");
      return;
    }

    await navigator.clipboard.writeText(payload.text);
    setFeedback(shareFeedback, "結果テキストをコピーしました。SNSに貼り付けて共有できます。");
  } catch (error) {
    setFeedback(shareFeedback, "シェアに失敗しました。もう一度お試しください。");
  }
}

async function copyShareText() {
  if (!latestShareText) {
    setFeedback(shareFeedback, "先に診断結果を作成してください。");
    return;
  }
  try {
    await navigator.clipboard.writeText(latestShareText);
    setFeedback(shareFeedback, "結果テキストをコピーしました。");
  } catch (error) {
    setFeedback(shareFeedback, "コピーに失敗しました。");
  }
}

function updateShareLink() {
  const shareUrl = new URL("https://twitter.com/intent/tweet");
  shareUrl.searchParams.set("text", `${latestShareText}\n${shareDisclaimer()}`);
  shareXLink.href = shareUrl.toString();
}

function saveCurrentFavorite() {
  if (!state.result) {
    setFeedback(favoriteFeedback, "先に診断結果を作成してください。");
    return;
  }

  const favorites = loadFavorites();
  const item = {
    destination: state.result.destination.name,
    summary: selectedSummary(),
    modeLabel: modeLabel()
  };

  const exists = favorites.some((favorite) => {
    return favorite.destination === item.destination && favorite.summary === item.summary && favorite.modeLabel === item.modeLabel;
  });

  if (exists) {
    setFeedback(favoriteFeedback, "この結果はすでに保存されています。");
    return;
  }

  favorites.unshift(item);
  saveFavorites(favorites.slice(0, 6));
  setFeedback(favoriteFeedback, "お気に入りに保存しました。");
  renderFavorites();
}

function saveHistoryEntry(destination, topSignals) {
  const history = loadHistory();
  const entry = {
    destination: destination.name,
    modeLabel: modeLabel(),
    signature: topSignals.map(([signal]) => topSignalWord(signal)).join(" / "),
    createdAt: new Date().toLocaleDateString("ja-JP")
  };
  history.unshift(entry);
  saveHistory(history.slice(0, 5));
  renderHistory();
}

function submitPremiumLead(event) {
  event.preventDefault();
  if (!premiumEmail || !premiumFeedback) {
    return;
  }
  const email = premiumEmail.value.trim();

  if (!email || !email.includes("@")) {
    setFeedback(premiumFeedback, "メールアドレスを入力してください。");
    return;
  }

  localStorage.setItem(premiumEmailKey, email);
  setFeedback(
    premiumFeedback,
    "このデモではメールは端末内にだけ保存され、送信はしていません。本番では送信先APIと利用規約を接続してください。"
  );
}

function compareFavoritesAsText() {
  const favorites = loadFavorites();
  if (favorites.length < 2) {
    setFeedback(compareFeedback, "比較するには、お気に入りを2件以上保存してください。");
    return;
  }

  const lines = favorites.map((item, index) => {
    return `${index + 1}. ${item.destination}（${item.modeLabel}）— ${item.summary}`;
  });
  setFeedback(compareFeedback, lines.join(" / "));
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split("");
  const lines = [];
  let line = "";

  words.forEach((char) => {
    const test = line + char;
    if (ctx.measureText(test).width > maxWidth && line.length > 0) {
      lines.push(line);
      line = char;
    } else {
      line = test;
    }
  });

  if (line) {
    lines.push(line);
  }
  return lines;
}

async function buildShareCardPngFile() {
  if (!state.result) {
    return null;
  }

  const width = 1080;
  const height = 1350;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return null;
  }

  const gradient = ctx.createLinearGradient(0, 0, width, height);
  if (mode === "vivid") {
    gradient.addColorStop(0, "#2a103f");
    gradient.addColorStop(1, "#ff3d9b");
  } else {
    gradient.addColorStop(0, "#1f2b6c");
    gradient.addColorStop(1, "#6f7dff");
  }
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.font = "600 36px 'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif";
  ctx.fillText("TripTune", 80, 120);

  ctx.font = "700 84px 'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif";
  const title = state.result.destination.name;
  wrapText(ctx, title, width - 160).forEach((line, i) => {
    ctx.fillText(line, 80, 240 + i * 96);
  });

  ctx.font = "400 40px 'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif";
  const body = state.result.description;
  const bodyLines = wrapText(ctx, body, width - 160);
  bodyLines.slice(0, 5).forEach((line, i) => {
    ctx.fillText(line, 80, 420 + i * 58);
  });

  ctx.font = "400 32px 'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.82)";
  const tags = state.result.topSignals.map(([s]) => topSignalWord(s)).join(" · ");
  wrapText(ctx, tags, width - 160).forEach((line, i) => {
    ctx.fillText(line, 80, 760 + i * 48);
  });

  ctx.font = "400 28px 'Hiragino Kaku Gothic ProN','Yu Gothic',sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.75)";
  wrapText(ctx, shareDisclaimer(), width - 160).forEach((line, i) => {
    ctx.fillText(line, 80, height - 140 + i * 40);
  });

  const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) {
    return null;
  }

  return new File([blob], `triptune-${state.result.destination.name}.png`, { type: "image/png" });
}

async function downloadShareCardPng() {
  if (!state.result) {
    setFeedback(shareFeedback, "先に診断結果を作成してください。");
    return;
  }

  try {
    const file = await buildShareCardPngFile();
    if (!file) {
      setFeedback(shareFeedback, "画像の生成に失敗しました。");
      return;
    }

    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = file.name;
    anchor.click();
    URL.revokeObjectURL(url);
    setFeedback(shareFeedback, "PNGを保存しました。SNSに貼る前に内容をご確認ください。");
  } catch (error) {
    setFeedback(shareFeedback, "画像の保存に失敗しました。");
  }
}

function showResult() {
  const score = buildScore();
  const rankedDestinations = chooseDestination(score);
  const destination = rankedDestinations[0];
  const topSignals = getTopSignals(score, 3);
  const linkData = buildSearchLink(destination, score);
  const topText = topSignals.map(([signal, point]) => reasonText(signal, point)).join(" / ");
  const description = resultDescription(destination.name, score);

  destinationEl.textContent = destination.name;
  if (destinationBadge) {
    if (destination.badge) {
      destinationBadge.hidden = false;
      destinationBadge.textContent = destination.badge;
    } else {
      destinationBadge.hidden = true;
      destinationBadge.textContent = "";
    }
  }
  descEl.textContent = description;
  if (tripSceneEl) {
    tripSceneEl.textContent = destination.scene;
  }
  planCopyEl.textContent = `${destination.calmPlan}（選択: ${selectedSummary()}）`;
  searchLink.href = linkData.href;
  searchLink.textContent = linkData.label;
  renderPickChips();
  renderCard(destination, topSignals);
  renderCompareList(rankedDestinations);
  renderPlanChecklist(destination);
  renderMiniItinerary(destination, score);
  renderAltDestinations(rankedDestinations);
  updateConfidence(topSignals);
  setFeedback(shareFeedback, "");
  setFeedback(favoriteFeedback, "");
  setFeedback(compareFeedback, "");
  if (summaryChoiceEl) {
    summaryChoiceEl.textContent = selectedSummary();
  }
  if (summaryReasonEl) {
    summaryReasonEl.textContent = topSignals.slice(0, 2).map(([signal]) => topSignalWord(signal)).join("・");
  }
  if (summaryActionEl) {
    summaryActionEl.textContent = linkData.label;
  }
  if (detailsContent) {
    detailsContent.classList.add("hidden");
  }
  if (detailsToggleBtn) {
    detailsToggleBtn.textContent = "詳細を見る";
  }
  latestShareText = [
    "TripTune 診断結果",
    `旅先: ${destination.name}`,
    `モード: ${modeLabel()}`,
    description,
    `理由: ${topText}`,
    `選択: ${selectedSummary()}`,
    `おすすめ: ${destination.scene}`,
    shareDisclaimer()
  ].join("\n");
  updateShareLink();
  state.result = { destination, score, topSignals, description };

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
  renderFavorites();
  saveHistoryEntry(destination, topSignals);
  resultScreen.classList.remove("result-animate");
  void resultScreen.offsetWidth;
  resultScreen.classList.add("result-animate");
}

function bindIf(element, eventName, handler) {
  if (element) {
    element.addEventListener(eventName, handler);
  }
}

bindIf(document.getElementById("start-btn"), "click", showQuestion);
bindIf(document.getElementById("retry-btn"), "click", resetQuiz);
bindIf(document.getElementById("back-btn"), "click", goBack);
bindIf(document.getElementById("invite-btn"), "click", () => {
  setMode("vivid");
  showResult();
});
bindIf(shareNativeBtn, "click", shareResult);
bindIf(shareCopyBtn, "click", copyShareText);
bindIf(shareImageBtn, "click", downloadShareCardPng);
bindIf(favoriteBtn, "click", saveCurrentFavorite);
bindIf(compareFavoritesBtn, "click", compareFavoritesAsText);
bindIf(premiumForm, "submit", submitPremiumLead);
bindIf(detailsToggleBtn, "click", () => {
  if (!detailsContent) {
    return;
  }
  const isHidden = detailsContent.classList.toggle("hidden");
  if (detailsToggleBtn) {
    detailsToggleBtn.textContent = isHidden ? "詳細を見る" : "詳細を隠す";
  }
});
bindIf(modeSwitch, "click", () => {
  setMode(mode === "calm" ? "vivid" : "calm");
  if (!resultScreen.classList.contains("hidden") && state.picks.length === questions.length) {
    showResult();
  }
});

setMode(mode, false);
renderFavorites();
renderHistory();
ensurePremiumEmail();
resetQuiz();
