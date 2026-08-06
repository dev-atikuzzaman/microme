// ============================================================
// Tab navigation (show/hide panels, active state)
// ============================================================
/* ============================================================
   TAB SWITCHING
============================================================ */
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');

function goToTab(tabId){
  const btn = [...tabButtons].find(b => b.dataset.tab === tabId);
  if(!btn) return;
  panels.forEach(p=>p.classList.add('hidden'));
  document.getElementById(tabId).classList.remove('hidden');
  tabButtons.forEach(b=>b.classList.remove('active-tab'));
  btn.classList.add('active-tab');
  document.getElementById('printArea').scrollIntoView({behavior:'instant', block:'start'});
}

tabButtons.forEach(btn=>{
  btn.addEventListener('click', ()=> goToTab(btn.dataset.tab));
});
tabButtons[0].click();

/* Flash-highlight an element briefly (used by global search to point at a result) */
function flashHighlight(el){
  if(!el) return;
  el.scrollIntoView({behavior:'smooth', block:'center'});
  el.classList.add('search-highlight');
  setTimeout(()=> el.classList.remove('search-highlight'), 1700);
}
