
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
  const mood=answers[0],view=answers[1],partner=answers[2],season=answers[3],purpose=answers[4];
  const place=`${view==="自然"?"北海道":view==="都会"?"東京":"沖縄"}`;
  const keyword=`${mood}+${purpose}+${season}+${partner}`;
  document.getElementById("question-area").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("destination").textContent=place;
  document.getElementById("desc").textContent=`${mood}な気分で${purpose}する${place}への旅`;
  const searchTerm=encodeURIComponent(keyword);
  const link=mode==="calm"?`https://www.google.com/search?q=${place}+${searchTerm}`:
  `https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=${searchTerm}`;
  document.getElementById("link-area").innerHTML=`<a href="${link}" target="_blank">${mode==="calm"?"詳しく調べる":"映像を見る"}</a>`;
}

showQuestion();
