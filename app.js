
const questions = [
  {text: "気分は？", answers: ["ゆったり", "刺激的", "ロマンチック", "不安定"]},
  {text: "景色は？", answers: ["自然", "都会", "海", "山"]},
  {text: "同行者は？", answers: ["ひとり", "友達", "恋人", "家族"]},
  {text: "季節は？", answers: ["春", "夏", "秋", "冬"]},
  {text: "目的は？", answers: ["癒し", "冒険", "文化体験", "刺激"]}
];

const fanzaKeywords = {
  "不安定-都会-ひとり-冬-刺激": "SM",
  "ロマンチック-海-恋人-冬-癒し": "ラブラブ",
  "刺激的-自然-友達-夏-冒険": "ギャル",
  "ゆったり-自然-ひとり-春-癒し": "人妻",
  "ゆったり-海-恋人-秋-文化体験": "混浴",
  "刺激的-都会-友達-夏-冒険": "中出し",
  "default": "異文化"
};

let currentQ = 0, answers = [];
let mode = localStorage.getItem("mode");
if (!mode) {
  mode = "calm";
  localStorage.setItem("mode", mode);
}
document.getElementById("current-mode").textContent = mode;

function showQuestion() {
  const q = questions[currentQ];
  document.getElementById("question-text").textContent = q.text;
  document.getElementById("answers").innerHTML = q.answers.map(a =>
    `<button onclick="answer('${a}')">${a}</button>`).join("");
}

function answer(a) {
  answers.push(a);
  if (++currentQ < questions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function switchToVivid() {
  mode = "vivid";
  localStorage.setItem("mode", mode);
  location.reload();
}

function showResult() {
  const key = answers.join("-");
  const mood = answers[0], view = answers[1], season = answers[3], purpose = answers[4];
  const place = view === "自然" ? "北海道" : view === "都会" ? "東京" : view === "海" ? "沖縄" : "長野";
  const fanzaWord = fanzaKeywords[key] || fanzaKeywords["default"];
  const googleSearch = `${place}+${mood}+${purpose}`;
  const fanzaSearch = fanzaWord;

  document.getElementById("question-area").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("destination").textContent = place;
  document.getElementById("desc").textContent = `${mood}な気分で${purpose}する${place}への旅`;

  const link = mode === "calm"
    ? `https://www.google.com/search?q=${encodeURIComponent(googleSearch)}`
    : `https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=${encodeURIComponent(fanzaSearch)}`;
  const text = mode === "calm" ? "詳しく調べる" : "映像を見る";
  document.getElementById("link-area").innerHTML = `<a href="${link}" target="_blank">${text}</a>`;

  if (mode === "calm") {
    document.getElementById("invite-area").classList.remove("hidden");
  }
}

showQuestion();
