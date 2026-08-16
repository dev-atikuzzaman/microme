// ============================================================
// Tab 13: বর্ণমালা (Alphabet)
// বাংলা স্বরবর্ণ, ব্যঞ্জনবর্ণ, ইংরেজি, আরবি, অংক
// Each entry: [character, bengali name, english name]
// ============================================================

const alphabetCategories = {

  "বাংলা স্বরবর্ণ": {
    icon: "অ",
    items: [
      ["অ","অ","a (short)"], ["আ","আ","aa (long)"], ["ই","ই","i (short)"], ["ঈ","ই-দীর্ঘ","ii (long)"],
      ["উ","উ","u (short)"], ["ঊ","উ-দীর্ঘ","uu (long)"], ["ঋ","ঋ","ri"], ["এ","এ","e"],
      ["ঐ","ঐ","oi"], ["ও","ও","o"], ["ঔ","ঔ","ou"]
    ]
  },

  "বাংলা ব্যঞ্জনবর্ণ": {
    icon: "ক",
    items: [
      ["ক","ক","ka"], ["খ","খ","kha"], ["গ","গ","ga"], ["ঘ","ঘ","gha"], ["ঙ","ঙ","nga"],
      ["চ","চ","cha"], ["ছ","ছ","chha"], ["জ","জ","ja"], ["ঝ","ঝ","jha"], ["ঞ","ঞ","nya"],
      ["ট","ট","ta (hard)"], ["ঠ","ঠ","tha (hard)"], ["ড","ড","da (hard)"], ["ঢ","ঢ","dha (hard)"], ["ণ","ণ","na (hard)"],
      ["ত","ত","ta"], ["থ","থ","tha"], ["দ","দ","da"], ["ধ","ধ","dha"], ["ন","ন","na"],
      ["প","প","pa"], ["ফ","ফ","pha"], ["ব","ব","ba"], ["ভ","ভ","bha"], ["ম","ম","ma"],
      ["য","য","ya"], ["র","র","ra"], ["ল","ল","la"], ["শ","শ","sha"], ["ষ","ষ","sha (retroflex)"],
      ["স","স","sa"], ["হ","হ","ha"], ["ড়","ড়","ra (flap)"], ["ঢ়","ঢ়","rha (flap)"], ["য়","য়","ya (semi-vowel)"],
      ["ৎ","খণ্ড ত","khanda ta"], ["ং","অনুস্বার","anusvara (ng)"], ["ঃ","বিসর্গ","visarga (h)"], ["ঁ","চন্দ্রবিন্দু","chandrabindu"]
    ]
  },

  "ইংরেজি বর্ণমালা": {
    icon: "A",
    items: [
      ["A","এ","A"], ["B","বি","B"], ["C","সি","C"], ["D","ডি","D"], ["E","ই","E"],
      ["F","এফ","F"], ["G","জি","G"], ["H","এইচ","H"], ["I","আই","I"], ["J","জে","J"],
      ["K","কে","K"], ["L","এল","L"], ["M","এম","M"], ["N","এন","N"], ["O","ও","O"],
      ["P","পি","P"], ["Q","কিউ","Q"], ["R","আর","R"], ["S","এস","S"], ["T","টি","T"],
      ["U","ইউ","U"], ["V","ভি","V"], ["W","ডাবলিউ","W"], ["X","এক্স","X"], ["Y","ওয়াই","Y"], ["Z","জেড","Z"]
    ]
  },

  "আরবি বর্ণমালা": {
    icon: "ا",
    items: [
      ["ا","আলিফ","Alif"], ["ب","বা","Ba"], ["ت","তা","Ta"], ["ث","সা","Tha"], ["ج","জিম","Jim"],
      ["ح","হা","Ha"], ["خ","খা","Kha"], ["د","দাল","Dal"], ["ذ","যাল","Dhal"], ["ر","রা","Ra"],
      ["ز","যা","Zay"], ["س","সিন","Sin"], ["ش","শিন","Shin"], ["ص","সোয়াদ","Sad"], ["ض","দোয়াদ","Dad"],
      ["ط","তোয়া","Ta (emphatic)"], ["ظ","জোয়া","Za (emphatic)"], ["ع","আইন","Ain"], ["غ","গাইন","Ghain"],
      ["ف","ফা","Fa"], ["ق","ক্বাফ","Qaf"], ["ك","কাফ","Kaf"], ["ل","লাম","Lam"], ["م","মিম","Mim"],
      ["ن","নুন","Nun"], ["ه","হা","Ha (soft)"], ["و","ওয়াও","Waw"], ["ي","ইয়া","Ya"]
    ]
  },

  "অংক": {
    icon: "১",
    items: [
      ["০ / 0","শূন্য","Zero"], ["১ / 1","এক","One"], ["২ / 2","দুই","Two"], ["৩ / 3","তিন","Three"],
      ["৪ / 4","চার","Four"], ["৫ / 5","পাঁচ","Five"], ["৬ / 6","ছয়","Six"], ["৭ / 7","সাত","Seven"],
      ["৮ / 8","আট","Eight"], ["৯ / 9","নয়","Nine"]
    ]
  }

};

// ── State ──────────────────────────────────────────────────
let alphaActiveCategory = Object.keys(alphabetCategories)[0];

const alphaCategoryBar  = document.getElementById('alphaCategoryBar');
const alphaRangeReaders = document.getElementById('alphaRangeReaders');
const alphaGrid         = document.getElementById('alphaGrid');

// ── Category tab bar ───────────────────────────────────────
function renderAlphaCategoryBar(){
  alphaCategoryBar.innerHTML = Object.entries(alphabetCategories).map(([name, cat])=>`
    <button class="alpha-cat-btn ${name === alphaActiveCategory ? 'fh-tab-active' : ''}
      px-3 py-1.5 rounded-lg text-sm font-semibold bg-ink-800/60 ring-1 ring-white/5 text-parchment-200"
      data-cat="${name}">
      <span class="mr-1">${cat.icon}</span>${name}
    </button>
  `).join('');

  alphaCategoryBar.querySelectorAll('.alpha-cat-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      alphaActiveCategory = btn.dataset.cat;
      renderAlphaCategoryBar();
      renderAlphaRangeReader();
      renderAlphaGrid();
    });
  });
}

// ── Range reader (TTS: from letter X to letter Y) ──────────
function renderAlphaRangeReader(){
  alphaRangeReaders.innerHTML = '';
  const cat = alphabetCategories[alphaActiveCategory];
  const items = cat.items;
  const safeId = alphaActiveCategory.replace(/[^a-zA-Z0-9]/g,'');

  const wrap = document.createElement('div');
  wrap.className = 'bg-ink-800/40 ring-1 ring-white/5 rounded-xl p-2.5 flex flex-wrap items-center gap-2';
  wrap.innerHTML = `
    <span class="text-xs text-parchment-300 shrink-0">🔊 ${alphaActiveCategory}:</span>
    <select id="alphaFrom_${safeId}" class="px-2 py-1 rounded-lg text-sm"></select>
    <span class="text-parchment-400 text-xs">থেকে</span>
    <select id="alphaTo_${safeId}" class="px-2 py-1 rounded-lg text-sm"></select>
    <button id="alphaPlay_${safeId}" class="px-3 py-1.5 bg-gradient-to-br from-gold-400 to-gold-600 text-ink-950 rounded-lg text-xs font-semibold btn-glow">▶️ পড়ুন</button>
    <button id="alphaStop_${safeId}" class="px-3 py-1.5 bg-ink-800 text-parchment-200 ring-1 ring-white/10 rounded-lg text-xs btn-glow">⏹ থামান</button>
  `;
  alphaRangeReaders.appendChild(wrap);

  const fromSel = wrap.querySelector(`#alphaFrom_${safeId}`);
  const toSel   = wrap.querySelector(`#alphaTo_${safeId}`);
  items.forEach((item, i)=>{
    fromSel.appendChild(new Option(item[0], i));
    toSel.appendChild(new Option(item[0], i));
  });
  toSel.value = items.length - 1;

  wrap.querySelector(`#alphaPlay_${safeId}`).addEventListener('click', ()=>{
    let from = parseInt(fromSel.value), to = parseInt(toSel.value);
    if(from > to) [from, to] = [to, from];
    stopSpeaking();
    for(let i = from; i <= to; i++) queueSpeakItem(items[i][1], items[i][2]);
  });
  wrap.querySelector(`#alphaStop_${safeId}`).addEventListener('click', stopSpeaking);
}

// ── Letter grid ────────────────────────────────────────────
function renderAlphaGrid(){
  const items = alphabetCategories[alphaActiveCategory].items;
  alphaGrid.innerHTML = items.map(([char, bnName, enName])=>`
    <div class="bg-ink-800/70 rounded-2xl shadow-card premium-card ring-1 ring-white/5 p-3 text-center flex flex-col items-center gap-1">
      <div class="text-3xl font-bold text-parchment-100">${char}</div>
      <div class="text-xs text-parchment-200">${bnName}</div>
      <div class="text-[11px] text-parchment-400">${enName}</div>
      <div class="flex items-center gap-1.5 mt-1 no-print">
        ${ttsBtn(bnName, enName)}
        ${copyBtn(char + ' — ' + bnName + ' / ' + enName)}
      </div>
    </div>
  `).join('');
}

// ── Init ───────────────────────────────────────────────────
renderAlphaCategoryBar();
renderAlphaRangeReader();
renderAlphaGrid();

// ── Global search integration ──────────────────────────────
function getAlphabetSearchEntries(){
  const entries = [];
  Object.entries(alphabetCategories).forEach(([catName, cat])=>{
    cat.items.forEach(([char, bnName, enName])=>{
      entries.push({ catName, char, bnName, enName });
    });
  });
  return entries;
}

function gsGoToAlphabet(catName){
  alphaActiveCategory = catName;
  renderAlphaCategoryBar();
  renderAlphaRangeReader();
  renderAlphaGrid();
  goToTab('t13');
  setTimeout(()=> flashHighlight(document.getElementById('alphaGrid')), 120);
}
