// ============================================================
// Tab navigation (home grid, content panels, settings, back bar)
// ============================================================
/* ============================================================
   TAB METADATA — single source of truth used to build the home
   menu grid, the sub-header "back" bar, and bottom-nav highlight.
============================================================ */
const TAB_META = {
  t1:  { icon:'🔢',  label:'০-১০০ সংখ্যা',            hint:'সংখ্যা ইংরেজি ও বাংলায়',        color:'from-indigo-500 to-indigo-700' },
  t2:  { icon:'🔠',  label:'১-৩১ ক্রম',                hint:'ক্রমবাচক শব্দ',                 color:'from-rose-500 to-rose-700' },
  t3:  { icon:'📅',  label:'সপ্তাহের দিন',             hint:'৭ দিনের নাম',                   color:'from-amber-500 to-amber-700' },
  t4:  { icon:'🗓️',  label:'মাস (ইং/বাং/আরবি)',        hint:'৩ ক্যালেন্ডারের মাস',           color:'from-fuchsia-500 to-fuchsia-700' },
  t5:  { icon:'🍂',  label:'ঋতু',                      hint:'বাংলা ও আরবি ঋতু',              color:'from-teal-500 to-teal-700' },
  t6:  { icon:'🏛️',  label:'রোমান সংখ্যা',             hint:'I, II, III...',                 color:'from-purple-500 to-purple-700' },
  t7:  { icon:'📐',  label:'ইউনিট কনভার্টার',           hint:'দৈর্ঘ্য, আয়তন, চাপ, তাপমাত্রা',  color:'from-sky-500 to-sky-700' },
  t8:  { icon:'📝',  label:'কাস্টম তথ্য',               hint:'নিজের নোট সংরক্ষণ',             color:'from-pink-500 to-pink-700' },
  t9:  { icon:'🗺️',  label:'বাংলাদেশ',                  hint:'জেলা-উপজেলা-ইউনিয়ন',            color:'from-lime-500 to-lime-700' },
  t10: { icon:'🌍',  label:'মহাদেশ ও দেশ',              hint:'৭ মহাদেশের দেশ',                color:'from-cyan-500 to-cyan-700' },
  t11: { icon:'🌊',  label:'মহাসাগর',                   hint:'৫টি মহাসাগর',                   color:'from-blue-500 to-blue-700' },
  t12: { icon:'📆',  label:'আজকের তারিখ',               hint:'ইং/বাং/হিজরি একসাথে',           color:'from-gold-400 to-gold-600' },
  t13: { icon:'Ω',   label:'প্রতীক ও লিপি',             hint:'গাণিতিক ও মুদ্রা প্রতীক',        color:'from-orange-500 to-amber-700' },
};
const TAB_ORDER = Object.keys(TAB_META);
const EXTRA_META = { settings: { icon:'⚙️', label:'সেটিংস' } };

const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

function goToTab(tabId){
  const panel = document.getElementById(tabId);
  if(!panel) return;
  if(typeof stopSpeaking === 'function'){ try{ stopSpeaking(); }catch(e){} }
  panels.forEach(p=>p.classList.add('hidden'));
  panel.classList.remove('hidden');
  document.querySelectorAll('.tab-btn').forEach(b=> b.classList.toggle('active-tab', b.dataset.tab === tabId));
  document.querySelectorAll('.bottom-nav-btn').forEach(b=> b.classList.toggle('bn-active', b.dataset.tab === tabId));
  document.querySelectorAll('.home-card').forEach(b=> b.classList.toggle('active-tab', b.dataset.tab === tabId));
  updateSubHeader(tabId);
  document.getElementById('printArea').scrollIntoView({behavior:'instant', block:'start'});
}

function updateSubHeader(tabId){
  const bar = document.getElementById('subHeaderBar');
  if(!bar) return;
  const meta = TAB_META[tabId] || EXTRA_META[tabId];
  if(!meta){ bar.classList.add('hidden'); return; }
  bar.classList.remove('hidden');
  document.getElementById('subHeaderIcon').textContent = meta.icon;
  document.getElementById('subHeaderLabel').textContent = meta.label;
}

tabButtons.forEach(btn=>{
  btn.addEventListener('click', ()=> goToTab(btn.dataset.tab));
});

/* Build the Home screen's card grid from TAB_META */
function renderHomeGrid(){
  const grid = document.getElementById('homeGrid');
  if(!grid) return;
  grid.innerHTML = TAB_ORDER.map(id=>{
    const m = TAB_META[id];
    return `
    <button type="button" data-tab="${id}" onclick="goToTab('${id}')"
      class="home-card text-left bg-ink-800/70 hover:bg-ink-800 rounded-2xl shadow-card premium-card ring-1 ring-white/5 p-3 sm:p-3.5 flex items-center gap-3 transition">
      <span class="w-11 h-11 shrink-0 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-xl shadow-glow">${m.icon}</span>
      <span class="min-w-0">
        <span class="block text-parchment-100 font-semibold text-sm leading-tight">${m.label}</span>
        <span class="block text-parchment-400 text-[11px] mt-0.5 truncate">${m.hint}</span>
      </span>
    </button>`;
  }).join('');
}
renderHomeGrid();

goToTab('home');

/* Flash-highlight an element briefly (used by global search to point at a result) */
function flashHighlight(el){
  if(!el) return;
  el.scrollIntoView({behavior:'smooth', block:'center'});
  el.classList.add('search-highlight');
  setTimeout(()=> el.classList.remove('search-highlight'), 1700);
}
