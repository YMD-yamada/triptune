
const params = new URLSearchParams(window.location.search);
const modeParam = params.get("style");
if (modeParam === "deep") {
  localStorage.setItem("mode", "vivid");
} else {
  localStorage.setItem("mode", "calm");
}

const answers = [];
const mode = localStorage.getItem("mode") || "calm";
document.getElementById("mode-label").textContent = mode === "vivid" ? "Vivid" : "Calm";

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

  if (mode === "vivid" && result.link) {
    document.getElementById("link-area").innerHTML = `
      <p><a href="${result.link}" target="_blank">→ この旅の感覚を映像で体験</a></p>
    `;
  }
}

const results = {
  "relax-nature-solo": {
    name: "京都",
    desc: "静かに心を整える旅先。",
    link: "https://www.dmm.co.jp/digital/videoa/-/list/=/article=keyword/id=人妻/"
  },
  "relax-city-couple": {
    name: "ソウル",
    desc: "美味しいものと穏やかな時間。",
    link: "https://www.dmm.co.jp/digital/videoa/-/list/=/article=keyword/id=ラブラブ/"
  },
  "excite-nature-solo": {
    name: "アイスランド",
    desc: "非日常の静けさと神秘。",
    link: "https://www.dmm.co.jp/digital/videoa/-/list/=/article=keyword/id=SM/"
  },
  "excite-city-couple": {
    name: "バリ島",
    desc: "日常を忘れる濃密な時間。",
    link: "https://www.dmm.co.jp/digital/videoa/-/list/=/article=keyword/id=中出し/"
  },
  "relax-nature-couple": {
    name: "箱根",
    desc: "自然と温泉で心を癒す。",
    link: "https://www.dmm.co.jp/digital/videoa/-/list/=/article=keyword/id=混浴/"
  },
  "excite-city-solo": {
    name: "ニューヨーク",
    desc: "刺激的でアクティブな時間。",
    link: "https://www.dmm.co.jp/digital/videoa/-/list/=/article=keyword/id=ギャル/"
  },
  "default": {
    name: "モロッコ",
    desc: "エキゾチックな冒険が待っている。",
    link: "https://www.dmm.co.jp/digital/videoa/-/list/=/article=keyword/id=異文化/"
  }
};
