// ============================================================
// Tab navigation (show/hide panels, active state)
// ============================================================
/* ============================================================
   TAB SWITCHING
============================================================ */
const tabButtons = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');
tabButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    panels.forEach(p=>p.classList.add('hidden'));
    document.getElementById(btn.dataset.tab).classList.remove('hidden');
    tabButtons.forEach(b=>b.classList.remove('active-tab'));
    btn.classList.add('active-tab');
  });
});
tabButtons[0].click();
