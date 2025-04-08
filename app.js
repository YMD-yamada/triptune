
const questions=[
  {text:"気分は？",answers:["ゆったり","刺激的","ロマンチック"]},
  {text:"景色は？",answers:["自然","都会","海"]},
  {text:"同行者は？",answers:["ひとり","友達","恋人"]},
  {text:"季節は？",answers:["春","夏","冬"]},
  {text:"目的は？",answers:["癒し","冒険","文化体験"]}
];

let currentQ=0,answers=[],mode=localStorage.getItem("mode")||"calm";
document.getElementById("current-mode").textContent=mode;

function toggleMode(){
  mode=mode==="calm"?"vivid":"calm";
  localStorage.setItem("mode",mode);
  location.reload();
}

function showQuestion(){
  const q=questions[currentQ];
  document.getElementById("question-text").textContent=q.text;
  document.getElementById("answers").innerHTML=q.answers.map(a=>`<button onclick="answer('${a}')">${a}</button>`).join("");
}

function answer(a){
  answers.push(a);
  if(++currentQ<questions.length)showQuestion();else showResult();
}

function showResult(){
  const resultKey=answers.join("-");
  const destination=resultKey.split("-")[0]+"な旅";
  const desc="あなたにピッタリな旅先です！";
  document.getElementById("question-area").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("destination").textContent=destination;
  document.getElementById("desc").textContent=desc;
  const searchTerm=answers.join("+");
  const link=mode==="calm"?`https://www.google.com/search?q=${searchTerm}+旅行`:
  `https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=${searchTerm}`;
  document.getElementById("link-area").innerHTML=`<a href="${link}" target="_blank">${mode==="calm"?"この旅先を調べる":"映像で体験する"}</a>`;
}

showQuestion();
