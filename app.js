
const params = new URLSearchParams(window.location.search);
const modeParam = params.get("style");
const mode = modeParam === "deep" ? "vivid" : "calm";
localStorage.setItem("mode", mode);
document.getElementById("mode-label").textContent = mode === "vivid" ? "Vivid" : "Calm";

const answers = [];

function toggleMode() {
  const newMode = mode === "vivid" ? "calm" : "vivid";
  localStorage.setItem("mode", newMode);
  location.reload();
}

function next(qNum, val) {
  answers.push(val);
  document.getElementById(`q${qNum}`).classList.add("hidden");
  document.getElementById(`q${qNum + 1}`).classList.remove("hidden");
}

function showResult(final) {
  answers.push(final);
  document.getElementById("question-area").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const key = answers.join("-");
  const result = results[key] || results["default"];
  document.getElementById("destination").textContent = result.name;
  document.getElementById("desc").textContent = result.desc;

  const link = mode === "vivid" ? result.fanza : result.normal;
  const linkText = mode === "vivid" ? "→ 映像で体験する" : "→ この旅先を調べる";

  document.getElementById("link-area").innerHTML = `<p><a href="${link}" target="_blank">${linkText}</a></p>`;
}

const results = {
  "relax-nature-solo":  {name:"京都", desc:"静かに心を整える旅先。", fanza:"https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=人妻", normal:"https://www.google.com/search?q=京都+旅行"},
  "relax-city-couple":  {name:"ソウル", desc:"美味しいものと穏やかな時間。", fanza:"https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=ラブラブ", normal:"https://www.google.com/search?q=ソウル+旅行"},
  "excite-nature-solo": {name:"アイスランド", desc:"非日常の静けさと神秘。", fanza:"https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=SM", normal:"https://www.google.com/search?q=アイスランド+旅行"},
  "excite-city-couple": {name:"バリ島", desc:"日常を忘れる濃密な時間。", fanza:"https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=中出し", normal:"https://www.google.com/search?q=バリ島+旅行"},
  "relax-nature-couple":{name:"箱根", desc:"自然と温泉で心を癒す。", fanza:"https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=混浴", normal:"https://www.google.com/search?q=箱根+温泉"},
  "excite-city-solo":   {name:"ニューヨーク", desc:"刺激的でアクティブな時間。", fanza:"https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=ギャル", normal:"https://www.google.com/search?q=ニューヨーク+旅行"},
  "default":            {name:"モロッコ", desc:"エキゾチックな冒険が待っている。", fanza:"https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=異文化", normal:"https://www.google.com/search?q=モロッコ+旅行"}
};
