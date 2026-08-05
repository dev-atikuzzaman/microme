// ============================================================
// Tab 11: Oceans + custom additions
// ============================================================
/* ============================================================
   TAB 11: OCEANS
============================================================ */
const oceanData = ["প্রশান্ত মহাসাগর (Pacific Ocean)","আটলান্টিক মহাসাগর (Atlantic Ocean)","ভারত মহাসাগর (Indian Ocean)","দক্ষিণ মহাসাগর (Southern Ocean)","সুমেরু মহাসাগর (Arctic Ocean)"];
const OCEAN_CUSTOM_KEY = 'oceanCustomData';
function loadOceanCustom(){ try{ return JSON.parse(localStorage.getItem(OCEAN_CUSTOM_KEY)) || {}; }catch(e){ return {}; } }
function saveOceanCustom(d){ localStorage.setItem(OCEAN_CUSTOM_KEY, JSON.stringify(d)); cloudPush(OCEAN_CUSTOM_KEY, d); }

function renderOceans(){
  const container = document.getElementById('oceanList');
  container.innerHTML = '';
  const custom = loadOceanCustom();
  oceanData.forEach(ocean=>{
    const items = custom[ocean] || [];
    const div = document.createElement('div');
    div.className = 'bg-ink-800/70 rounded-2xl shadow-card premium-card ring-1 ring-white/5 p-3';
    div.innerHTML = `<div class="font-semibold text-blue-300 mb-2">🌊 ${ocean}</div>
      <div class="flex flex-wrap gap-1.5 mb-2 ocean-chips"></div>
      <div class="flex gap-2">
        <input type="text" placeholder="উল্লেখযোগ্য সাগর/তথ্য যোগ করুন" class="border rounded-lg px-2 py-1.5 text-sm flex-1 ocean-input">
        <button class="px-3 py-1.5 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-xl text-sm btn-glow ocean-add">যোগ</button>
      </div>`;
    const chipsDiv = div.querySelector('.ocean-chips');
    items.forEach((item,idx)=>{
      const chip = document.createElement('span');
      chip.className = 'px-2 py-1 rounded-full text-xs bg-blue-50 border border-blue-300';
      chip.innerHTML = `${item} <button class="text-red-400 ml-1" onclick="removeOceanItem('${ocean}',${idx})">✕</button>`;
      chipsDiv.appendChild(chip);
    });
    div.querySelector('.ocean-add').onclick = ()=>{
      const input = div.querySelector('.ocean-input');
      const val = input.value.trim();
      if(!val) return;
      const c = loadOceanCustom();
      c[ocean] = c[ocean] || [];
      c[ocean].push(val);
      saveOceanCustom(c);
      renderOceans();
    };
    container.appendChild(div);
  });
}
function removeOceanItem(ocean, idx){
  const c = loadOceanCustom();
  c[ocean].splice(idx,1);
  saveOceanCustom(c);
  renderOceans();
}
renderOceans();
