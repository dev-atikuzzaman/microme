// ============================================================
// Tab 8: Custom info entries (text/image/dropdown), localStorage-backed
// ============================================================
/* ============================================================
   TAB 8: CUSTOM DATA (localStorage)
============================================================ */
const CUSTOM_KEY='customInfoEntries_v1';
function loadCustom(){ try{ return JSON.parse(localStorage.getItem(CUSTOM_KEY))||[]; }catch(e){ return []; } }
function saveCustom(list){ localStorage.setItem(CUSTOM_KEY, JSON.stringify(list)); cloudPush(CUSTOM_KEY, list); }
function renderCustom(){
  const list = loadCustom();
  const container = document.getElementById('customList');
  container.innerHTML='';
  if(list.length===0){ container.innerHTML = `<p class="text-parchment-400 col-span-full text-center py-8">এখনো কোনো তথ্য যোগ করা হয়নি।</p>`; return; }
  list.forEach((item,idx)=>{
    const div = document.createElement('div');
    div.className = 'bg-ink-800/70 rounded-2xl shadow-card premium-card ring-1 ring-white/5 p-4';
    div.innerHTML = `
      <div class="flex justify-between items-start mb-2">
        <span class="text-xs px-2 py-1 rounded-full bg-pink-500/15 text-pink-300 font-semibold">${item.category||''}</span>
        <button class="no-print text-red-500 text-sm" onclick="deleteCustom(${idx})">🗑️</button>
      </div>
      <h4 class="font-bold text-lg mb-1">${item.title||''}</h4>
      <p class="text-sm text-parchment-400 whitespace-pre-wrap mb-2">${item.text||''}</p>
      ${item.image ? `<img src="${item.image}" class="rounded-lg max-h-40 object-cover w-full">` : ''}
    `;
    container.appendChild(div);
  });
}
function addCustomEntry(){
  const title = document.getElementById('c_title').value.trim();
  const category = document.getElementById('c_category').value;
  const text = document.getElementById('c_text').value.trim();
  const fileInput = document.getElementById('c_image');
  const file = fileInput.files[0];
  function pushEntry(imageData){
    const list = loadCustom();
    list.push({title,category,text,image:imageData||''});
    saveCustom(list);
    renderCustom();
    document.getElementById('c_title').value='';
    document.getElementById('c_text').value='';
    fileInput.value='';
  }
  if(!title && !text){ alert('অন্তত শিরোনাম অথবা তথ্য লিখুন।'); return; }
  if(file){
    const reader = new FileReader();
    reader.onload = ()=> pushEntry(reader.result);
    reader.readAsDataURL(file);
  } else { pushEntry(null); }
}
function deleteCustom(idx){
  const list = loadCustom();
  list.splice(idx,1);
  saveCustom(list);
  renderCustom();
}
renderCustom();
