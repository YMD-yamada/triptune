
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
      <p><a href="${result.link}" target="_blank" style="color: #0077cc;">→ この旅の感覚を映像で体験</a></p>
    `;
  }
}

const results = {
  "relax-nature-solo": {
    name: "京都",
    desc: "静かに心を整える旅先。",
    link: "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=abc123/"
  },
  "excite-city-couple": {
    name: "バリ島",
    desc: "日常を忘れる濃密な時間。",
    link: "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=xyz456/"
  },
  "default": {
    name: "アイスランド",
    desc: "非日常の静けさと神秘。",
    link: "https://www.dmm.co.jp/digital/videoa/-/detail/=/cid=ice999/"
  }
};
