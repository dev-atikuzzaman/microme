// ============================================================
// Tab 10: Continents & countries + custom additions
// ============================================================
/* ============================================================
   TAB 10: CONTINENTS & COUNTRIES
============================================================ */
const continentData = {
  "এশিয়া (Asia)": ["আফগানিস্তান","আর্মেনিয়া","আজারবাইজান","বাহরাইন","বাংলাদেশ","ভুটান","ব্রুনাই","কম্বোডিয়া","চীন","সাইপ্রাস","জর্জিয়া","ভারত","ইন্দোনেশিয়া","ইরান","ইরাক","ইসরায়েল","জাপান","জর্ডান","কাজাখস্তান","কুয়েত","কিরগিজস্তান","লাওস","লেবানন","মালয়েশিয়া","মালদ্বীপ","মঙ্গোলিয়া","মিয়ানমার","নেপাল","উত্তর কোরিয়া","ওমান","পাকিস্তান","ফিলিস্তিন","ফিলিপাইন","কাতার","সৌদি আরব","সিঙ্গাপুর","দক্ষিণ কোরিয়া","শ্রীলঙ্কা","সিরিয়া","তাইওয়ান","তাজিকিস্তান","থাইল্যান্ড","তিমুর-লেস্তে","তুরস্ক","তুর্কমেনিস্তান","সংযুক্ত আরব আমিরাত","উজবেকিস্তান","ভিয়েতনাম","ইয়েমেন"],
  "আফ্রিকা (Africa)": ["আলজেরিয়া","অ্যাঙ্গোলা","বেনিন","বতসোয়ানা","বুরকিনা ফাসো","বুরুন্ডি","কাবো ভের্দে","ক্যামেরুন","মধ্য আফ্রিকান প্রজাতন্ত্র","চাদ","কমোরোস","কঙ্গো প্রজাতন্ত্র","গণতান্ত্রিক কঙ্গো","জিবুতি","মিশর","বিষুবীয় গিনি","ইরিত্রিয়া","এসোয়াতিনি","ইথিওপিয়া","গ্যাবন","গাম্বিয়া","ঘানা","গিনি","গিনি-বিসাউ","আইভরি কোস্ট","কেনিয়া","লেসোথো","লাইবেরিয়া","লিবিয়া","মাদাগাস্কার","মালাউই","মালি","মৌরিতানিয়া","মরিশাস","মরক্কো","মোজাম্বিক","নামিবিয়া","নাইজার","নাইজেরিয়া","রুয়ান্ডা","সাও তোমে ও প্রিন্সিপি","সেনেগাল","সিশেলস","সিয়েরা লিওন","সোমালিয়া","দক্ষিণ আফ্রিকা","দক্ষিণ সুদান","সুদান","তানজানিয়া","টোগো","তিউনিসিয়া","উগান্ডা","জাম্বিয়া","জিম্বাবুয়ে"],
  "উত্তর আমেরিকা (North America)": ["অ্যান্টিগুয়া ও বার্বুডা","বাহামা","বার্বাডোস","বেলিজ","কানাডা","কোস্টা রিকা","কিউবা","ডোমিনিকা","ডোমিনিকান প্রজাতন্ত্র","এল সালভাদর","গ্রেনাডা","গুয়াতেমালা","হাইতি","হন্ডুরাস","জ্যামাইকা","মেক্সিকো","নিকারাগুয়া","পানামা","সেন্ট কিটস অ্যান্ড নেভিস","সেন্ট লুসিয়া","সেন্ট ভিনসেন্ট","ত্রিনিদাদ ও টোবাগো","যুক্তরাষ্ট্র"],
  "দক্ষিণ আমেরিকা (South America)": ["আর্জেন্টিনা","বলিভিয়া","ব্রাজিল","চিলি","কলম্বিয়া","ইকুয়েডর","গায়ানা","প্যারাগুয়ে","পেরু","সুরিনাম","উরুগুয়ে","ভেনেজুয়েলা"],
  "ইউরোপ (Europe)": ["আলবেনিয়া","আন্দোরা","অস্ট্রিয়া","বেলারুশ","বেলজিয়াম","বসনিয়া","বুলগেরিয়া","ক্রোয়েশিয়া","চেক প্রজাতন্ত্র","ডেনমার্ক","এস্তোনিয়া","ফিনল্যান্ড","ফ্রান্স","জার্মানি","গ্রিস","হাঙ্গেরি","আইসল্যান্ড","আয়ারল্যান্ড","ইতালি","কসোভো","লাটভিয়া","লিশটেনস্টাইন","লিথুয়ানিয়া","লুক্সেমবার্গ","মাল্টা","মলদোভা","মোনাকো","মন্টিনিগ্রো","নেদারল্যান্ডস","উত্তর মেসিডোনিয়া","নরওয়ে","পোল্যান্ড","পর্তুগাল","রোমানিয়া","রাশিয়া","সান মারিনো","সার্বিয়া","স্লোভাকিয়া","স্লোভেনিয়া","স্পেন","সুইডেন","সুইজারল্যান্ড","ইউক্রেন","যুক্তরাজ্য","ভ্যাটিকান সিটি"],
  "অস্ট্রেলিয়া ও ওশেনিয়া (Australia/Oceania)": ["অস্ট্রেলিয়া","ফিজি","কিরিবাতি","মার্শাল দ্বীপপুঞ্জ","মাইক্রোনেশিয়া","নাউরু","নিউজিল্যান্ড","পালাউ","পাপুয়া নিউ গিনি","সামোয়া","সলোমন দ্বীপপুঞ্জ","টোঙ্গা","টুভালু","ভানুয়াতু"],
  "অ্যান্টার্কটিকা (Antarctica)": ["কোনো সার্বভৌম দেশ নেই — শুধু বিভিন্ন দেশের গবেষণা কেন্দ্র রয়েছে"]
};
const CONTINENT_CUSTOM_KEY = 'continentCustomData';
function loadContinentCustom(){ try{ return JSON.parse(localStorage.getItem(CONTINENT_CUSTOM_KEY)) || {}; }catch(e){ return {}; } }
function saveContinentCustom(d){ localStorage.setItem(CONTINENT_CUSTOM_KEY, JSON.stringify(d)); cloudPush(CONTINENT_CUSTOM_KEY, d); }

const continentSelect = document.getElementById('continentSelect');
Object.keys(continentData).forEach(c=>{
  const opt = document.createElement('option'); opt.value = c; opt.textContent = c;
  continentSelect.appendChild(opt);
});
function renderContinentCountries(){
  const c = continentSelect.value;
  const container = document.getElementById('continentCountries');
  container.innerHTML = '';
  const custom = loadContinentCustom();
  const all = [...continentData[c], ...(custom[c]||[])];
  all.forEach((country, idx)=>{
    const isCustom = idx >= continentData[c].length;
    const div = document.createElement('div');
    div.id = `t10-country-${idx}`;
    div.className = 'bg-ink-800/60 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all ring-1 ring-white/5 px-3 py-2 text-sm flex justify-between items-center';
    div.innerHTML = `<span>${country}</span>${isCustom?`<button class="text-red-400 text-xs" onclick="removeCustomContinentItem('${c}', ${idx-continentData[c].length})">✕</button>`:''}`;
    container.appendChild(div);
  });
}
/* Used by global search to jump straight to a country's continent + row */
function gsGoToContinent(continentName, countryIndex){
  continentSelect.value = continentName;
  renderContinentCountries();
  goToTab('t10');
  setTimeout(()=> flashHighlight(document.getElementById(`t10-country-${countryIndex}`)), 120);
}
continentSelect.addEventListener('change', renderContinentCountries);
function addCustomContinentItem(){
  const input = document.getElementById('customCountryInput');
  const val = input.value.trim();
  if(!val) return;
  const c = continentSelect.value;
  const custom = loadContinentCustom();
  custom[c] = custom[c] || [];
  custom[c].push(val);
  saveContinentCustom(custom);
  input.value='';
  renderContinentCountries();
}
function removeCustomContinentItem(c, idx){
  const custom = loadContinentCustom();
  custom[c].splice(idx,1);
  saveContinentCustom(custom);
  renderContinentCountries();
}
renderContinentCountries();
