// ============================================================
// Font system: builtin fonts, unlimited custom font upload, size/color controls
// ============================================================
/* ============================================================
   GLOBAL: FONT / SIZE / COLOR CONTROLS
============================================================ */
const body = document.body;
const fontSelect = document.getElementById('fontFamilySelect');

// Built-in font keys -> actual CSS font-family stack
const BUILTIN_FONTS = {
  siyamrupali: { label:'Siyam Rupali', stack:`'SiyamRupali','Noto Sans Bengali',sans-serif` },
  nikosh:      { label:'Nikosh',       stack:`'Nikosh','Noto Sans Bengali',sans-serif` },
  nikoshban:   { label:'NikoshBan',    stack:`'NikoshBan','Noto Sans Bengali',sans-serif` },
  timesnewroman:{ label:'Times New Roman', stack:`'Times New Roman', Times, serif` }
};

function applyFont(key){
  const custom = loadCustomFontsList().find(f=>f.id===key);
  const stack = custom ? `'${custom.familyName}','Noto Sans Bengali',sans-serif` : (BUILTIN_FONTS[key]?.stack || BUILTIN_FONTS.siyamrupali.stack);
  document.documentElement.style.setProperty('--app-font-family', stack);
  localStorage.setItem('activeFontKey', key);
}

function rebuildFontDropdown(){
  const current = fontSelect.value || localStorage.getItem('activeFontKey') || 'siyamrupali';
  fontSelect.innerHTML = '';
  Object.entries(BUILTIN_FONTS).forEach(([key,f])=>{
    const opt = document.createElement('option');
    opt.value = key; opt.textContent = f.label;
    fontSelect.appendChild(opt);
  });
  loadCustomFontsList().forEach(f=>{
    const opt = document.createElement('option');
    opt.value = f.id; opt.textContent = '🔤 '+f.name;
    fontSelect.appendChild(opt);
  });
  if([...fontSelect.options].some(o=>o.value===current)) fontSelect.value = current;
}

fontSelect.addEventListener('change', () => applyFont(fontSelect.value));

document.getElementById('fontSizeRange').addEventListener('input', (e)=>{
  document.documentElement.style.setProperty('--app-font-size', e.target.value+'px');
});
document.getElementById('fontColorPicker').addEventListener('input', (e)=>{
  document.documentElement.style.setProperty('--app-font-color', e.target.value);
});
document.getElementById('printBtn').addEventListener('click', ()=> window.print());

/* ============================================================
   UNLIMITED CUSTOM FONT UPLOAD SYSTEM (no Android system install needed)
============================================================ */
const fontManagerBtn = document.getElementById('fontManagerBtn');
const fontManagerPanel = document.getElementById('fontManagerPanel');
fontManagerBtn.addEventListener('click', ()=> fontManagerPanel.classList.toggle('hidden'));

const CUSTOM_FONTS_KEY = 'customFontsListV2';

function loadCustomFontsList(){
  try{ return JSON.parse(localStorage.getItem(CUSTOM_FONTS_KEY)) || []; }catch(e){ return []; }
}
function saveCustomFontsList(list){ localStorage.setItem(CUSTOM_FONTS_KEY, JSON.stringify(list)); cloudPush(CUSTOM_FONTS_KEY, list); }

function mimeForExt(name){
  const ext = name.split('.').pop().toLowerCase();
  if(ext==='otf') return 'font/otf';
  if(ext==='woff') return 'font/woff';
  if(ext==='woff2') return 'font/woff2';
  return 'font/ttf';
}

function guessFontNameFromFile(filename){
  return filename.replace(/\.(ttf|otf|woff2?|TTF|OTF|WOFF2?)$/,'').replace(/[_-]+/g,' ').trim();
}

// Auto-fill the name field the moment a file is chosen, so the user can just confirm or edit it
document.getElementById('newFontFile').addEventListener('change', (e)=>{
  const file = e.target.files[0];
  const nameInput = document.getElementById('newFontName');
  if(file && !nameInput.value.trim()){
    nameInput.value = guessFontNameFromFile(file.name);
  }
});

function injectCustomFontFace(familyName, dataUrl){
  let styleTag = document.getElementById('customFontStyle_'+familyName);
  if(!styleTag){
    styleTag = document.createElement('style');
    styleTag.id = 'customFontStyle_'+familyName;
    document.head.appendChild(styleTag);
  }
  styleTag.textContent = `@font-face{ font-family:'${familyName}'; src:url('${dataUrl}'); font-display:swap; }`;
}

function addNewCustomFont(){
  const fileInput = document.getElementById('newFontFile');
  const nameInput = document.getElementById('newFontName');
  const file = fileInput.files[0];
  if(!file){ alert('আগে একটি ফন্ট ফাইল (.ttf/.otf) সিলেক্ট করুন।'); return; }
  if(file.size > 4.5*1024*1024){
    alert('ফন্ট ফাইলটি অনেক বড় (4.5MB এর বেশি)। ছোট সাইজের ফন্ট ব্যবহার করুন।');
    return;
  }
  let name = nameInput.value.trim() || guessFontNameFromFile(file.name);
  const reader = new FileReader();
  reader.onload = (e)=>{
    let dataUrl = e.target.result;
    if(dataUrl.startsWith('data:application/octet-stream') || dataUrl.startsWith('data:;base64')){
      const base64 = dataUrl.split(',')[1];
      dataUrl = `data:${mimeForExt(file.name)};base64,${base64}`;
    }
    const id = 'cf_' + Date.now();
    const familyName = 'CustomFont_' + id;
    const list = loadCustomFontsList();
    list.push({ id, name, familyName, dataUrl });
    try{
      saveCustomFontsList(list);
    }catch(err){
      alert('সংরক্ষণ করতে সমস্যা হয়েছে — ফাইলটি হয়তো বড়। ছোট ফন্ট ফাইল দিয়ে চেষ্টা করুন।');
      return;
    }
    injectCustomFontFace(familyName, dataUrl);
    rebuildFontDropdown();
    renderCustomFontChips();
    fontSelect.value = id;
    applyFont(id);
    nameInput.value=''; fileInput.value='';
  };
  reader.readAsDataURL(file);
}

function removeCustomFontById(id){
  const list = loadCustomFontsList().filter(f=>f.id!==id);
  saveCustomFontsList(list);
  rebuildFontDropdown();
  renderCustomFontChips();
  if(fontSelect.value !== id) return;
  fontSelect.value = 'siyamrupali';
  applyFont('siyamrupali');
}

function renderCustomFontChips(){
  const container = document.getElementById('customFontChips');
  const list = loadCustomFontsList();
  if(list.length===0){ container.innerHTML=''; return; }
  container.innerHTML = list.map(f=>
    `<span class="inline-flex items-center gap-1 bg-ink-800/70 ring-1 ring-gold-500/30 text-parchment-200 rounded-full px-2 py-0.5 text-xs">
      🔤 ${f.name}
      <button onclick="removeCustomFontById('${f.id}')" class="text-red-500 font-bold">✕</button>
    </span>`
  ).join('');
}

function initFonts(){
  loadCustomFontsList().forEach(f=> injectCustomFontFace(f.familyName, f.dataUrl));
  rebuildFontDropdown();
  renderCustomFontChips();
  const savedKey = localStorage.getItem('activeFontKey') || 'siyamrupali';
  if([...fontSelect.options].some(o=>o.value===savedKey)){
    fontSelect.value = savedKey;
    applyFont(savedKey);
  } else {
    applyFont('siyamrupali');
  }
}
initFonts();
