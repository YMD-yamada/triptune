
const questions=[
  {text:"今の気分は？",answers:["ゆったり","刺激的","ロマンチック","ワイルド"]},
  {text:"好きな景色は？",answers:["自然","都会","海","山"]},
  {text:"旅の目的は？",answers:["癒し","冒険","グルメ","文化体験"]}
];

const results={
  "ゆったり-自然-癒し":{name:"京都",desc:"静かな旅",google:"京都 観光",fanza:"人妻"},
  "刺激的-都会-冒険":{name:"NY",desc:"都会の冒険",google:"ニューヨーク 観光",fanza:"ギャル"},
  "ロマンチック-海-グルメ":{name:"バリ島",desc:"南国料理",google:"バリ島 観光",fanza:"中出し"},
  "ワイルド-山-冒険":{name:"アイスランド",desc:"自然探索",google:"アイスランド 観光",fanza:"SM"},
  "ゆったり-山-文化体験":{name:"箱根",desc:"温泉と文化",google:"箱根 観光",fanza:"混浴"},
  "ロマンチック-都会-癒し":{name:"パリ",desc:"街並み散策",google:"パリ 観光",fanza:"ラブラブ"},
  "default":{name:"台湾",desc:"万能な旅先",google:"台湾 観光",fanza:"アジア"}
};

let currentQ=0,answers=[],mode=localStorage.getItem("mode")||"calm";
document.getElementById("current-mode").textContent=mode;

function toggleMode(){
  mode=mode==="calm"?"vivid":"calm";
  localStorage.setItem("mode",mode);
  location.reload();
}

function showQuestion(){
  const q=questions[currentQ];
  document.getElementById("progress").textContent=`質問 ${currentQ+1}/${questions.length}`;
  document.getElementById("question-text").textContent=q.text;
  document.getElementById("answers").innerHTML=q.answers.map(a=>`<button onclick="answer('${a}')">${a}</button>`).join("");
}

function answer(a){
  answers.push(a);
  if(++currentQ<questions.length)showQuestion();else showResult();
}

function showResult(){
  const key=answers.join("-");
  const result=results[key]||results["default"];
  document.getElementById("question-area").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");
  document.getElementById("destination").textContent=result.name;
  document.getElementById("desc").textContent=result.desc;
  const link=mode==="calm"?`https://www.google.com/search?q=${result.google}`:
  `https://www.dmm.co.jp/digital/videoa/-/list/search/=/?searchstr=${result.fanza}`;
  document.getElementById("link-area").innerHTML=`<a href="${link}" target="_blank">${mode==="calm"?"この旅先を調べる":"映像で体験する"}</a>`;
}

showQuestion();
