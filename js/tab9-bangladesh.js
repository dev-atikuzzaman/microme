// ============================================================
// Tab 9: Bangladesh division->district->upazila->union->village
// ============================================================
/* ============================================================
   TAB 9: BANGLADESH DIVISION -> DISTRICT -> UPAZILA -> UNION -> VILLAGE
============================================================ */
const bdData = {
  "ঢাকা": ["ঢাকা","ফরিদপুর","গাজীপুর","গোপালগঞ্জ","কিশোরগঞ্জ","মাদারীপুর","মানিকগঞ্জ","মুন্সিগঞ্জ","নারায়ণগঞ্জ","নরসিংদী","রাজবাড়ী","শরীয়তপুর","টাঙ্গাইল"],
  "চট্টগ্রাম": ["বান্দরবান","ব্রাহ্মণবাড়িয়া","চাঁদপুর","চট্টগ্রাম","কুমিল্লা","কক্সবাজার","ফেনী","খাগড়াছড়ি","লক্ষ্মীপুর","নোয়াখালী","রাঙ্গামাটি"],
  "খুলনা": ["বাগেরহাট","চুয়াডাঙ্গা","যশোর","ঝিনাইদহ","খুলনা","কুষ্টিয়া","মাগুরা","মেহেরপুর","নড়াইল","সাতক্ষীরা"],
  "রাজশাহী": ["বগুড়া","জয়পুরহাট","নওগাঁ","নাটোর","চাঁপাইনবাবগঞ্জ","পাবনা","রাজশাহী","সিরাজগঞ্জ"],
  "রংপুর": ["দিনাজপুর","গাইবান্ধা","কুড়িগ্রাম","লালমনিরহাট","নীলফামারী","পঞ্চগড়","রংপুর","ঠাকুরগাঁও"],
  "বরিশাল": ["বরগুনা","বরিশাল","ভোলা","ঝালকাঠি","পটুয়াখালী","পিরোজপুর"],
  "সিলেট": ["হবিগঞ্জ","মৌলভীবাজার","সুনামগঞ্জ","সিলেট"],
  "ময়মনসিংহ": ["জামালপুর","ময়মনসিংহ","নেত্রকোণা","শেরপুর"]
};
const BD_TREE_KEY = 'bdCustomGeoTree';
function loadBdTree(){ try{ return JSON.parse(localStorage.getItem(BD_TREE_KEY)) || {}; }catch(e){ return {}; } }
function saveBdTree(tree){ localStorage.setItem(BD_TREE_KEY, JSON.stringify(tree)); cloudPush(BD_TREE_KEY, tree); }

const bdDivisionSel = document.getElementById('bdDivision');
const bdDistrictSel = document.getElementById('bdDistrict');
Object.keys(bdData).forEach(div=>{
  const opt = document.createElement('option'); opt.value = div; opt.textContent = div;
  bdDivisionSel.appendChild(opt);
});
function populateBdDistricts(){
  bdDistrictSel.innerHTML = '';
  bdData[bdDivisionSel.value].forEach(d=>{
    const opt = document.createElement('option'); opt.value = d; opt.textContent = d;
    bdDistrictSel.appendChild(opt);
  });
  renderBdCascade();
}
bdDivisionSel.addEventListener('change', populateBdDistricts);
bdDistrictSel.addEventListener('change', renderBdCascade);

// Generic 3-level self-growing tree: district -> upazila -> union -> village
function renderBdCascade(){
  const district = bdDistrictSel.value;
  const tree = loadBdTree();
  if(!tree[district]) tree[district] = {};
  const container = document.getElementById('bdCascade');
  container.innerHTML = '';

  function buildLevel(label, colorClass, items, onAdd, onSelect, selectedRenderer){
    const wrap = document.createElement('div');
    wrap.className = 'bg-ink-800/70 rounded-2xl shadow-card premium-card ring-1 ring-white/5 p-3';
    wrap.innerHTML = `<div class="font-semibold ${colorClass} mb-2">${label}</div>
      <div class="flex flex-wrap gap-2 mb-2 level-chips"></div>
      <div class="flex gap-2">
        <input type="text" placeholder="নতুন ${label} যোগ করুন" class="border rounded-lg px-2 py-1.5 text-sm flex-1 level-input">
        <button class="px-3 py-1.5 bg-gradient-to-br from-lime-500 to-lime-700 text-white rounded-xl text-sm btn-glow level-add">যোগ</button>
      </div>`;
    const chipsDiv = wrap.querySelector('.level-chips');
    items.forEach(item=>{
      const chip = document.createElement('button');
      chip.className = 'px-2 py-1 rounded-full text-xs border ' + (item===onSelect.current ? 'bg-lime-600 text-white border-lime-600' : 'bg-lime-50 border-lime-300');
      chip.innerHTML = `${item} <span class="text-red-400 ml-1">✕</span>`;
      chip.onclick = (e)=>{
        if(e.target.tagName==='SPAN'){ onAdd.remove(item); return; }
        onSelect.set(item);
      };
      chipsDiv.appendChild(chip);
    });
    wrap.querySelector('.level-add').onclick = ()=>{
      const input = wrap.querySelector('.level-input');
      const val = input.value.trim();
      if(!val) return;
      onAdd.add(val);
      input.value='';
    };
    container.appendChild(wrap);
    return wrap;
  }

  const upazilas = Object.keys(tree[district]);
  let selectedUpazila = { current: upazilas[0] || null };
  buildLevel('উপজেলা', 'text-lime-300', upazilas, {
    add:(val)=>{ tree[district][val] = tree[district][val] || {}; saveBdTree(tree); renderBdCascade(); },
    remove:(val)=>{ delete tree[district][val]; saveBdTree(tree); renderBdCascade(); }
  }, { current: window.__selectedUpazila, set:(val)=>{ window.__selectedUpazila = val; window.__selectedUnion=null; renderBdCascade(); } });

  const currentUpazila = window.__selectedUpazila && tree[district][window.__selectedUpazila] ? window.__selectedUpazila : null;
  if(currentUpazila){
    const unions = Object.keys(tree[district][currentUpazila]);
    buildLevel('ইউনিয়ন', 'text-emerald-300', unions, {
      add:(val)=>{ tree[district][currentUpazila][val] = tree[district][currentUpazila][val] || []; saveBdTree(tree); renderBdCascade(); },
      remove:(val)=>{ delete tree[district][currentUpazila][val]; saveBdTree(tree); renderBdCascade(); }
    }, { current: window.__selectedUnion, set:(val)=>{ window.__selectedUnion = val; renderBdCascade(); } });

    const currentUnion = window.__selectedUnion && tree[district][currentUpazila][window.__selectedUnion] ? window.__selectedUnion : null;
    if(currentUnion){
      const villages = tree[district][currentUpazila][currentUnion];
      buildLevel('গ্রাম', 'text-teal-300', villages, {
        add:(val)=>{ villages.push(val); saveBdTree(tree); renderBdCascade(); },
        remove:(val)=>{ tree[district][currentUpazila][currentUnion] = villages.filter(v=>v!==val); saveBdTree(tree); renderBdCascade(); }
      }, { current:null, set:()=>{} });
    }
  }
  saveBdTree(tree);
}
bdDivisionSel.value = Object.keys(bdData)[0];
populateBdDistricts();
