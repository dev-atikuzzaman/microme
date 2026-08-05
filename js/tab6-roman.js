// ============================================================
// Tab 6: Roman numerals 1-100 + rules
// ============================================================
/* ============================================================
   TAB 6: ROMAN NUMERALS
============================================================ */
function toRoman(num){
  const vals = [[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];
  let res='';
  for(const [v,s] of vals){ while(num>=v){ res+=s; num-=v; } }
  return res;
}
const t6Body = document.getElementById('t6Body');
for(let i=1;i<=100;i++){
  const tr=document.createElement('tr');
  tr.className = i%2===0?'bg-purple-500/10':'bg-ink-800/30';
  tr.innerHTML = `<td class="p-2 font-semibold">${i}</td><td class="p-2 font-mono text-lg">${toRoman(i)}</td>`;
  tr.dataset.search = `${i} ${toRoman(i)}`.toLowerCase();
  t6Body.appendChild(tr);
}
document.getElementById('t6Search').addEventListener('input',(e)=>{
  const q=e.target.value.trim().toLowerCase();
  [...t6Body.children].forEach(tr=>{ tr.style.display = tr.dataset.search.includes(q)?'':'none'; });
});
