// ============================================================
// Global search: searches across all 11 tabs at once
// ============================================================

function buildGlobalSearchIndex(){
  const idx = [];

  // ---- Tab 1: Numbers 0-100 ----
  for(let i=0;i<=100;i++){
    idx.push({
      id:`t1-${i}`, tabId:'t1', tabLabel:'সংখ্যা', tabIcon:'🔢',
      title: `${i} = ${bnWords[i]}`,
      subtitle: `${englishWord(i)} • ${toBnDigit(i)}`,
      keywords: `${i} ${englishWord(i)} ${bnWords[i]} ${toBnDigit(i)}`.toLowerCase(),
      go: ()=>{ goToTab('t1'); setTimeout(()=>flashHighlight(document.getElementById(`t1-row-${i}`)),120); }
    });
  }

  // ---- Tab 2: Ordinals 1-31 ----
  for(let i=1;i<=31;i++){
    idx.push({
      id:`t2-${i}`, tabId:'t2', tabLabel:'ক্রম', tabIcon:'🔠',
      title: `${bnOrdinalDigit(i)} = ${bnOrdinalWords[i-1]}`,
      subtitle: `${enOrdinalSuffix(i)} • ${enOrdinalWords[i-1]}`,
      keywords: `${i} ${enOrdinalSuffix(i)} ${enOrdinalWords[i-1]} ${bnOrdinalDigit(i)} ${bnOrdinalWords[i-1]}`.toLowerCase(),
      go: ()=>{ goToTab('t2'); setTimeout(()=>flashHighlight(document.getElementById(`t2-row-${i}`)),120); }
    });
  }

  // ---- Tab 3: Weekdays ----
  weekdays.forEach(([en,bn], wIdx)=>{
    idx.push({
      id:`t3-${wIdx}`, tabId:'t3', tabLabel:'সপ্তাহ', tabIcon:'📅',
      title: bn, subtitle: en,
      keywords: `${en} ${bn}`.toLowerCase(),
      go: ()=>{ goToTab('t3'); setTimeout(()=>flashHighlight(document.getElementById(`t3-card-${wIdx}`)),120); }
    });
  });

  // ---- Tab 4: Months (English / Bengali / Arabic) ----
  [['t4BodyEn', enMonths, 'ইংরেজি মাস'], ['t4BodyBn', bnMonths, 'বাংলা মাস'], ['t4BodyAr', arMonths, 'আরবি মাস']]
    .forEach(([bodyId, arr, label])=>{
      arr.forEach((row, i2)=>{
        idx.push({
          id:`t4-${bodyId}-${i2}`, tabId:'t4', tabLabel:'মাস', tabIcon:'🗓️',
          title: row[0], subtitle: `${label} • ${row[1]}`,
          keywords: `${row[0]} ${row[1]} ${label}`.toLowerCase(),
          go: ()=>{ goToTab('t4'); setTimeout(()=>flashHighlight(document.getElementById(`${bodyId}-row-${i2}`)),120); }
        });
      });
    });

  // ---- Tab 5: Seasons (Bengali / English / Arabic) ----
  [['t5BodyBn', bnSeasons, 'বাংলা ঋতু'], ['t5BodyEn', enSeasons, 'English Season'], ['t5BodyAr', arSeasons, 'আরবি ঋতু']]
    .forEach(([bodyId, arr, label])=>{
      arr.forEach((row, i2)=>{
        idx.push({
          id:`t5-${bodyId}-${i2}`, tabId:'t5', tabLabel:'ঋতু', tabIcon:'🍂',
          title: row[0], subtitle: `${label} • ${row[1]}`,
          keywords: `${row[0]} ${row[1]} ${row[2]} ${label}`.toLowerCase(),
          go: ()=>{ goToTab('t5'); setTimeout(()=>flashHighlight(document.getElementById(`${bodyId}-row-${i2}`)),120); }
        });
      });
    });

  // ---- Tab 6: Roman numerals ----
  for(let i=1;i<=100;i++){
    idx.push({
      id:`t6-${i}`, tabId:'t6', tabLabel:'রোমান', tabIcon:'🏛️',
      title: `${i} = ${toRoman(i)}`, subtitle: 'রোমান সংখ্যা',
      keywords: `${i} ${toRoman(i)}`.toLowerCase(),
      go: ()=>{ goToTab('t6'); setTimeout(()=>flashHighlight(document.getElementById(`t6-row-${i}`)),120); }
    });
  }

  // ---- Tab 8: Custom info (dynamic, reloaded fresh each search) ----
  loadCustom().forEach((item, i2)=>{
    idx.push({
      id:`t8-${item.id || i2}`, tabId:'t8', tabLabel:'কাস্টম তথ্য', tabIcon:'📝',
      title: item.title || '(শিরোনামহীন)', subtitle: item.category || '',
      keywords: `${item.title||''} ${item.text||''} ${item.category||''}`.toLowerCase(),
      go: ()=>{ goToTab('t8'); setTimeout(()=>flashHighlight(document.getElementById(`t8-card-${i2}`)),120); }
    });
  });

  // ---- Tab 9: Bangladesh geography (districts always + saved upazila/union/village) ----
  Object.entries(bdData).forEach(([division, districts])=>{
    districts.forEach(district=>{
      idx.push({
        id:`t9-district-${district}`, tabId:'t9', tabLabel:'বাংলাদেশ', tabIcon:'🗺️',
        title: district, subtitle: `জেলা • ${division} বিভাগ`,
        keywords: `${district} ${division} জেলা district`.toLowerCase(),
        go: ()=> gsGoToBangladesh(division, district, null, null)
      });
    });
  });
  const bdTree = loadBdTree();
  Object.entries(bdTree).forEach(([district, upazilas])=>{
    const division = Object.keys(bdData).find(d => bdData[d].includes(district));
    if(!division) return;
    Object.entries(upazilas).forEach(([upazila, unions])=>{
      idx.push({
        id:`t9-upazila-${district}-${upazila}`, tabId:'t9', tabLabel:'বাংলাদেশ', tabIcon:'🗺️',
        title: upazila, subtitle: `উপজেলা • ${district} জেলা`,
        keywords: `${upazila} ${district} উপজেলা upazila`.toLowerCase(),
        go: ()=> gsGoToBangladesh(division, district, upazila, null)
      });
      Object.entries(unions).forEach(([union, villages])=>{
        idx.push({
          id:`t9-union-${district}-${upazila}-${union}`, tabId:'t9', tabLabel:'বাংলাদেশ', tabIcon:'🗺️',
          title: union, subtitle: `ইউনিয়ন • ${upazila}, ${district}`,
          keywords: `${union} ${upazila} ${district} ইউনিয়ন union`.toLowerCase(),
          go: ()=> gsGoToBangladesh(division, district, upazila, union)
        });
        (villages||[]).forEach(village=>{
          idx.push({
            id:`t9-village-${district}-${upazila}-${union}-${village}`, tabId:'t9', tabLabel:'বাংলাদেশ', tabIcon:'🗺️',
            title: village, subtitle: `গ্রাম • ${union}, ${upazila}`,
            keywords: `${village} ${union} ${upazila} ${district} গ্রাম village`.toLowerCase(),
            go: ()=> gsGoToBangladesh(division, district, upazila, union)
          });
        });
      });
    });
  });

  // ---- Tab 10: Continents & countries (built-in + custom) ----
  const continentCustom = loadContinentCustom();
  Object.entries(continentData).forEach(([continent, countries])=>{
    countries.forEach((country, i2)=>{
      idx.push({
        id:`t10-${continent}-${country}`, tabId:'t10', tabLabel:'মহাদেশ', tabIcon:'🌍',
        title: country, subtitle: continent,
        keywords: `${country} ${continent}`.toLowerCase(),
        go: ()=> gsGoToContinent(continent, i2)
      });
    });
    (continentCustom[continent]||[]).forEach((country, ci)=>{
      const fullIdx = countries.length + ci;
      idx.push({
        id:`t10-${continent}-${country}`, tabId:'t10', tabLabel:'মহাদেশ', tabIcon:'🌍',
        title: country, subtitle: `${continent} (কাস্টম)`,
        keywords: `${country} ${continent}`.toLowerCase(),
        go: ()=> gsGoToContinent(continent, fullIdx)
      });
    });
  });

  // ---- Tab 11: Oceans (built-in + custom) ----
  const oceanCustom = loadOceanCustom();
  oceanData.forEach((ocean, oIdx)=>{
    idx.push({
      id:`t11-${oIdx}`, tabId:'t11', tabLabel:'মহাসাগর', tabIcon:'🌊',
      title: ocean, subtitle: 'মহাসাগর',
      keywords: ocean.toLowerCase(),
      go: ()=>{ goToTab('t11'); setTimeout(()=>flashHighlight(document.getElementById(`t11-ocean-${oIdx}`)),120); }
    });
    (oceanCustom[ocean]||[]).forEach(item=>{
      idx.push({
        id:`t11-${oIdx}-${item}`, tabId:'t11', tabLabel:'মহাসাগর', tabIcon:'🌊',
        title: item, subtitle: `${ocean} (কাস্টম তথ্য)`,
        keywords: `${item} ${ocean}`.toLowerCase(),
        go: ()=>{ goToTab('t11'); setTimeout(()=>flashHighlight(document.getElementById(`t11-ocean-${oIdx}`)),120); }
      });
    });
  });

  return idx;
}

const MAX_RESULTS = 60;
function runGlobalSearch(query){
  const q = query.trim().toLowerCase();
  if(!q) return [];
  const idx = buildGlobalSearchIndex();
  return idx.filter(item => item.keywords.includes(q)).slice(0, MAX_RESULTS);
}

// ---- UI wiring ----
const gsInput = document.getElementById('globalSearchInput');
const gsResultsBox = document.getElementById('globalSearchResults');
const gsClearBtn = document.getElementById('globalSearchClear');
let gsDebounceTimer = null;
let gsActiveIndex = -1;
let gsCurrentResults = [];

function gsRenderResults(results, query){
  gsCurrentResults = results;
  gsActiveIndex = -1;
  if(results.length === 0){
    gsResultsBox.innerHTML = `<div class="p-4 text-sm text-parchment-400 text-center">"${query}" এর জন্য কিছু পাওয়া যায়নি</div>`;
    gsResultsBox.classList.remove('hidden');
    return;
  }
  gsResultsBox.innerHTML = results.map((r, i) => {
    const starred = isFavorite(r.id);
    return `
    <div class="gs-result-item flex items-center gap-3 px-3 py-2.5 border-b border-white/5 last:border-0" data-gs-idx="${i}">
      <span class="text-lg shrink-0">${r.tabIcon}</span>
      <div class="min-w-0 flex-1">
        <div class="text-parchment-100 text-sm font-medium truncate">${r.title}</div>
        <div class="text-parchment-400 text-xs truncate">${r.subtitle}</div>
      </div>
      <button class="gs-star text-base shrink-0 ${starred ? 'text-gold-400' : 'text-parchment-400'}" data-gs-idx="${i}">${starred ? '★' : '☆'}</button>
      <span class="text-[10px] text-gold-400 bg-gold-500/10 ring-1 ring-gold-500/20 rounded-full px-2 py-0.5 shrink-0">${r.tabLabel}</span>
    </div>`;
  }).join('');
  gsResultsBox.classList.remove('hidden');

  [...gsResultsBox.querySelectorAll('.gs-result-item')].forEach(el=>{
    el.addEventListener('click', (e)=>{
      if(e.target.closest('.gs-star')) return;
      const item = gsCurrentResults[Number(el.dataset.gsIdx)];
      gsCloseResults();
      gsInput.blur();
      addToRecent(item);
      item.go();
    });
  });
  [...gsResultsBox.querySelectorAll('.gs-star')].forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.stopPropagation();
      const item = gsCurrentResults[Number(el.dataset.gsIdx)];
      const nowStarred = toggleFavorite(item);
      el.textContent = nowStarred ? '★' : '☆';
      el.classList.toggle('text-gold-400', nowStarred);
      el.classList.toggle('text-parchment-400', !nowStarred);
    });
  });
}

function gsCloseResults(){
  gsResultsBox.classList.add('hidden');
  gsResultsBox.innerHTML = '';
  gsActiveIndex = -1;
}

function gsUpdateActiveHighlight(){
  [...gsResultsBox.querySelectorAll('.gs-result-item')].forEach((el,i)=>{
    el.classList.toggle('gs-active', i === gsActiveIndex);
  });
  const activeEl = gsResultsBox.querySelector('.gs-active');
  if(activeEl) activeEl.scrollIntoView({block:'nearest'});
}

gsInput.addEventListener('input', ()=>{
  const val = gsInput.value;
  gsClearBtn.classList.toggle('hidden', val.length === 0);
  clearTimeout(gsDebounceTimer);
  gsDebounceTimer = setTimeout(()=>{
    if(val.trim().length === 0){ gsCloseResults(); return; }
    gsRenderResults(runGlobalSearch(val), val.trim());
  }, 120);
});

gsInput.addEventListener('keydown', (e)=>{
  if(gsResultsBox.classList.contains('hidden') || gsCurrentResults.length === 0) return;
  if(e.key === 'ArrowDown'){
    e.preventDefault();
    gsActiveIndex = Math.min(gsActiveIndex + 1, gsCurrentResults.length - 1);
    gsUpdateActiveHighlight();
  } else if(e.key === 'ArrowUp'){
    e.preventDefault();
    gsActiveIndex = Math.max(gsActiveIndex - 1, 0);
    gsUpdateActiveHighlight();
  } else if(e.key === 'Enter'){
    e.preventDefault();
    const item = gsCurrentResults[gsActiveIndex >= 0 ? gsActiveIndex : 0];
    if(item){ gsCloseResults(); gsInput.blur(); addToRecent(item); item.go(); }
  } else if(e.key === 'Escape'){
    gsCloseResults();
    gsInput.blur();
  }
});

gsClearBtn.addEventListener('click', ()=>{
  gsInput.value = '';
  gsClearBtn.classList.add('hidden');
  gsCloseResults();
  gsInput.focus();
});

document.addEventListener('click', (e)=>{
  if(!gsInput.contains(e.target) && !gsResultsBox.contains(e.target) && !gsClearBtn.contains(e.target)){
    gsCloseResults();
  }
});

// Desktop convenience: "/" focuses global search (ignored while typing in another field)
document.addEventListener('keydown', (e)=>{
  if(e.key === '/' && document.activeElement !== gsInput &&
     !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)){
    e.preventDefault();
    gsInput.focus();
  }
});
