// ============================================================
// Tab 13: প্রতীক ও লিপি (Symbols & Scripts)
// Categorized reference of scripts, math/physics, chemistry,
// electrical, currency/phonetics, and special symbols.
// Each entry: [symbol, bengali name, english name]
// ============================================================

const symbolCategories = {

  "ভাষাগত লিপি": {
    icon: "🔤",
    groups: {
      "গ্রিক বর্ণমালা (Greek)": [
        ["Α α","আলফা","Alpha"], ["Β β","বিটা","Beta"], ["Γ γ","গামা","Gamma"], ["Δ δ","ডেল্টা","Delta"],
        ["Ε ε","এপসাইলন","Epsilon"], ["Ζ ζ","জিটা","Zeta"], ["Η η","ইটা","Eta"], ["Θ θ","থিটা","Theta"],
        ["Ι ι","আইওটা","Iota"], ["Κ κ","কাপা","Kappa"], ["Λ λ","ল্যামডা","Lambda"], ["Μ μ","মিউ","Mu"],
        ["Ν ν","নিউ","Nu"], ["Ξ ξ","জাই","Xi"], ["Ο ο","অমিক্রন","Omicron"], ["Π π","পাই","Pi"],
        ["Ρ ρ","রো","Rho"], ["Σ σ","সিগমা","Sigma"], ["Τ τ","টাউ","Tau"], ["Υ υ","আপসাইলন","Upsilon"],
        ["Φ φ","ফাই","Phi"], ["Χ χ","কাই","Chi"], ["Ψ ψ","সাই","Psi"], ["Ω ω","ওমেগা","Omega"]
      ],
      "আরবি বর্ণমালা (Arabic)": [
        ["ا","আলিফ","Alif"], ["ب","বা","Ba"], ["ت","তা","Ta"], ["ث","সা","Tha"], ["ج","জিম","Jim"],
        ["ح","হা","Ha"], ["خ","খা","Kha"], ["د","দাল","Dal"], ["ذ","যাল","Dhal"], ["ر","রা","Ra"],
        ["ز","যা","Zay"], ["س","সিন","Sin"], ["ش","শিন","Shin"], ["ص","সোয়াদ","Sad"], ["ض","দোয়াদ","Dad"],
        ["ط","তোয়া","Ta (emphatic)"], ["ظ","জোয়া","Za (emphatic)"], ["ع","আইন","Ain"], ["غ","গাইন","Ghain"],
        ["ف","ফা","Fa"], ["ق","ক্বাফ","Qaf"], ["ك","কাফ","Kaf"], ["ل","লাম","Lam"], ["م","মিম","Mim"],
        ["ن","নুন","Nun"], ["ه","হা","Ha (soft)"], ["و","ওয়াও","Waw"], ["ي","ইয়া","Ya"]
      ],
      "দেবনাগরী (Devanagari)": [
        ["अ","অ (স্বরবর্ণ)","A"], ["आ","আ","Aa"], ["इ","ই","I"], ["ई","ঈ","Ii"], ["उ","উ","U"],
        ["ऊ","ঊ","Uu"], ["ए","এ","E"], ["ऐ","ঐ","Ai"], ["ओ","ও","O"], ["औ","ঔ","Au"],
        ["क","ক","Ka"], ["ख","খ","Kha"], ["ग","গ","Ga"], ["घ","ঘ","Gha"], ["च","চ","Cha"],
        ["छ","ছ","Chha"], ["ज","জ","Ja"], ["झ","ঝ","Jha"], ["त","ত","Ta"], ["द","দ","Da"]
      ],
      "এক্সটেন্ডেড ল্যাটিন (Extended Latin)": [
        ["é","ই-অ্যাকিউট","e acute"], ["è","ই-গ্রেভ","e grave"], ["ê","ই-সার্কামফ্লেক্স","e circumflex"],
        ["ñ","এন-টিল্ডে","n tilde"], ["ü","উ-উমলাউট","u umlaut"], ["ö","ও-উমলাউট","o umlaut"],
        ["ä","আ-উমলাউট","a umlaut"], ["ç","সি-সেডিলা","c cedilla"], ["å","আ-রিং","a ring"],
        ["ø","ও-স্ট্রোক","o slash"], ["œ","ও-ই লিগেচার","oe ligature"], ["æ","আ-ই লিগেচার","ae ligature"],
        ["ß","এসজেড লিগেচার","sharp s"], ["ý","ই-অ্যাকিউট (y)","y acute"], ["ĉ","সি-সার্কামফ্লেক্স","c circumflex"]
      ]
    }
  },

  "গণিত ও পদার্থ": {
    icon: "📐",
    groups: {
      "গাণিতিক প্রতীক": [
        ["π","পাই","Pi"], ["∑","সমষ্টি","Summation"], ["∫","ইন্টিগ্রাল","Integral"], ["Δ","ডেল্টা (পরিবর্তন)","Delta (change)"],
        ["∞","অসীম","Infinity"], ["√","বর্গমূল","Square root"], ["±","প্লাস-মাইনাস","Plus-minus"], ["≈","প্রায় সমান","Approximately equal"],
        ["≠","সমান নয়","Not equal"], ["≤","ছোট বা সমান","Less than or equal"], ["≥","বড় বা সমান","Greater than or equal"],
        ["∂","আংশিক অন্তরক","Partial derivative"], ["∇","নাবলা (গ্রেডিয়েন্ট)","Nabla (gradient)"], ["°","ডিগ্রি","Degree"],
        ["×","গুণ","Multiplication"], ["÷","ভাগ","Division"], ["∈","অন্তর্ভুক্ত","Element of"], ["∀","সকলের জন্য","For all"],
        ["∃","বিদ্যমান","There exists"], ["∝","সমানুপাতিক","Proportional to"]
      ],
      "পদার্থবিজ্ঞান": [
        ["λ","তরঙ্গদৈর্ঘ্য (ল্যামডা)","Wavelength (lambda)"], ["ν","কম্পাঙ্ক (নিউ)","Frequency (nu)"],
        ["ħ","হ-বার (প্ল্যাঙ্ক ধ্রুবক)","h-bar (reduced Planck constant)"], ["μ","মাইক্রো/ভরবেগ","Micro / permeability"],
        ["Ω","ওহম (রোধ)","Ohm (resistance)"], ["°C","সেলসিয়াস","Celsius"], ["°F","ফারেনহাইট","Fahrenheit"],
        ["K","কেলভিন","Kelvin"], ["c","আলোর গতি","Speed of light"], ["g","মহাকর্ষীয় ত্বরণ","Gravitational acceleration"]
      ]
    }
  },

  "রসায়ন ও পরমাণু": {
    icon: "⚗️",
    groups: {
      "বিক্রিয়া ও সংকেত": [
        ["→","উৎপন্ন করে (বিক্রিয়া তীর)","Yields (reaction arrow)"], ["⇌","সাম্যাবস্থা","Equilibrium"],
        ["Δ","তাপ প্রয়োগ (বিক্রিয়ায়)","Heat applied (in reaction)"], ["↑","গ্যাস নির্গমন","Gas evolved"],
        ["↓","অধঃক্ষেপ","Precipitate formed"], ["•","মুক্ত মূলক (radical)","Radical (unpaired electron)"],
        ["α","আলফা কণা/বিকিরণ","Alpha particle/radiation"], ["β","বিটা কণা/বিকিরণ","Beta particle/radiation"],
        ["γ","গামা রশ্মি","Gamma radiation"], ["°C","সেলসিয়াস তাপমাত্রা","Celsius temperature"],
        ["pH","অম্লত্ব-ক্ষারত্ব মাপক","Acidity/alkalinity scale"], ["mol","মোল (পদার্থের পরিমাণ)","Mole (amount of substance)"],
        ["⊕","ধনাত্মক আয়ন","Positive ion/charge"], ["⊖","ঋণাত্মক আয়ন","Negative ion/charge"]
      ]
    }
  },

  "ইলেকট্রিক্যাল ও সার্কিট": {
    icon: "🔌",
    groups: {
      "একক ও প্রতীক": [
        ["Ω","ওহম (রোধ)","Ohm (resistance)"], ["µF","মাইক্রোফ্যারাড (ক্যাপাসিট্যান্স)","Microfarad (capacitance)"],
        ["Hz","হার্টজ (কম্পাঙ্ক)","Hertz (frequency)"], ["V","ভোল্ট","Volt"], ["A","অ্যাম্পিয়ার","Ampere"],
        ["W","ওয়াট","Watt"], ["kΩ","কিলো-ওহম","Kilo-ohm"], ["mA","মিলি-অ্যাম্পিয়ার","Milliampere"],
        ["µA","মাইক্রো-অ্যাম্পিয়ার","Microampere"], ["⎓","ডিসি (সরাসরি প্রবাহ)","DC (direct current)"], ["~","এসি (পরিবর্তী প্রবাহ)","AC (alternating current)"]
      ],
      "লজিক গেট প্রতীক": [
        ["∧","এবং (AND)","AND"], ["∨","অথবা (OR)","OR"], ["¬","না (NOT)","NOT"], ["⊕","এক্সঅর (XOR)","XOR"],
        ["⊙","এক্সএনঅর (XNOR)","XNOR"]
      ]
    }
  },

  "মুদ্রা ও ধ্বনিবিজ্ঞান": {
    icon: "৳",
    groups: {
      "মুদ্রা প্রতীক": [
        ["৳","বাংলাদেশি টাকা","Bangladeshi Taka"], ["$","মার্কিন ডলার","US Dollar"], ["€","ইউরো","Euro"],
        ["£","ব্রিটিশ পাউন্ড","British Pound"], ["₹","ভারতীয় রুপি","Indian Rupee"], ["¥","জাপানি ইয়েন","Japanese Yen"],
        ["₩","দক্ষিণ কোরীয় ওন","South Korean Won"], ["₽","রাশিয়ান রুবল","Russian Ruble"], ["₺","তুর্কি লিরা","Turkish Lira"],
        ["﷼","সৌদি রিয়াল","Saudi Riyal"]
      ],
      "IPA ধ্বনিতাত্ত্বিক প্রতীক": [
        ["ə","শোয়া (অনুচ্চারিত স্বর)","Schwa"], ["ʃ","শ ধ্বনি","Sh sound"], ["ʒ","ঝ-জাতীয় ধ্বনি","Zh sound"],
        ["θ","অঘোষ থ ধ্বনি","Voiceless th"], ["ð","ঘোষ থ ধ্বনি","Voiced th"], ["ŋ","ং ধ্বনি","Ng sound"],
        ["ʧ","চ ধ্বনি","Ch sound"], ["ʤ","জ ধ্বনি","J sound"], ["ː","দীর্ঘ স্বর চিহ্ন","Long vowel marker"]
      ]
    }
  },

  "বিশেষ প্রতীক": {
    icon: "✦",
    groups: {
      "ব্রেইল মূল বর্ণ (Braille)": [
        ["⠁","ব্রেইল A","Braille A"], ["⠃","ব্রেইল B","Braille B"], ["⠉","ব্রেইল C","Braille C"],
        ["⠙","ব্রেইল D","Braille D"], ["⠑","ব্রেইল E","Braille E"], ["⠋","ব্রেইল F","Braille F"],
        ["⠛","ব্রেইল G","Braille G"], ["⠓","ব্রেইল H","Braille H"], ["⠊","ব্রেইল I","Braille I"],
        ["⠚","ব্রেইল J","Braille J"]
      ],
      "সঙ্গীত স্বরলিপি (Music)": [
        ["♩","কোয়ার্টার নোট","Quarter note"], ["♪","এইথ নোট","Eighth note"], ["♫","জোড়া এইথ নোট","Beamed eighth notes"],
        ["♬","জোড়া সিক্সটিন্থ নোট","Beamed sixteenth notes"], ["♭","ফ্ল্যাট (কোমল)","Flat"],
        ["♮","ন্যাচারাল (শুদ্ধ)","Natural"], ["♯","শার্প (তীব্র)","Sharp"], ["𝄞","ট্রেবল ক্লেফ","Treble clef"]
      ]
    }
  }
};

const symCategoryBar = document.getElementById('symCategoryBar');
const symGrid = document.getElementById('symGrid');
let symActiveCategory = Object.keys(symbolCategories)[0];

function renderSymCategoryBar(){
  symCategoryBar.innerHTML = Object.entries(symbolCategories).map(([name, cat])=>`
    <button class="sym-cat-btn ${name === symActiveCategory ? 'fh-tab-active' : ''} px-3 py-1.5 rounded-lg text-xs font-semibold bg-ink-800/60 ring-1 ring-white/5 text-parchment-200" data-cat="${name}">
      ${cat.icon} ${name}
    </button>
  `).join('');

  [...symCategoryBar.querySelectorAll('.sym-cat-btn')].forEach(btn=>{
    btn.addEventListener('click', ()=>{
      symActiveCategory = btn.dataset.cat;
      renderSymCategoryBar();
      renderSymGrid();
    });
  });
}

function renderSymGrid(){
  const cat = symbolCategories[symActiveCategory];
  let html = '';
  Object.entries(cat.groups).forEach(([groupName, items])=>{
    html += `<div class="col-span-2 sm:col-span-3 lg:col-span-4 text-sm font-semibold text-gold-300 mt-2 mb-1">${groupName}</div>`;
    items.forEach(([symbol, bnName, enName])=>{
      html += `
        <div class="bg-ink-800/70 rounded-2xl shadow-card premium-card ring-1 ring-white/5 p-3 text-center flex flex-col items-center gap-1">
          <div class="text-3xl font-bold text-parchment-100">${symbol}</div>
          <div class="text-xs text-parchment-200">${bnName}</div>
          <div class="text-[11px] text-parchment-400">${enName}</div>
          <div class="flex items-center gap-1.5 mt-1 no-print">
            ${ttsBtn(bnName, enName)}
            ${copyBtn(`${symbol} — ${bnName} / ${enName}`)}
          </div>
        </div>`;
    });
  });
  symGrid.innerHTML = html;
}

renderSymCategoryBar();
renderSymGrid();

/* Flattened lookup used by global search so every symbol is individually
   searchable, grouped under its parent category/sub-group for display. */
function getSymbolSearchEntries(){
  const entries = [];
  Object.entries(symbolCategories).forEach(([catName, cat])=>{
    Object.entries(cat.groups).forEach(([groupName, items])=>{
      items.forEach(([symbol, bnName, enName])=>{
        entries.push({ catName, groupName, symbol, bnName, enName });
      });
    });
  });
  return entries;
}

/* Used by global search to jump straight to Tab 13 with the right category active */
function gsGoToSymbol(catName){
  symActiveCategory = catName;
  renderSymCategoryBar();
  renderSymGrid();
  goToTab('t13');
  setTimeout(()=> flashHighlight(document.getElementById('symGrid')), 120);
}
