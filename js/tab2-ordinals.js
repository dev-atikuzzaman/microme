// ============================================================
// Tab 2: Ordinals 1-31 (English/Bengali) + search
// ============================================================
/* ============================================================
   TAB 2: ORDINALS 1-31
============================================================ */
const enOrdinalWords = ["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth","Tenth",
"Eleventh","Twelfth","Thirteenth","Fourteenth","Fifteenth","Sixteenth","Seventeenth","Eighteenth","Nineteenth","Twentieth",
"Twenty-First","Twenty-Second","Twenty-Third","Twenty-Fourth","Twenty-Fifth","Twenty-Sixth","Twenty-Seventh","Twenty-Eighth","Twenty-Ninth","Thirtieth","Thirty-First"];
const bnOrdinalWords = ["প্রথম","দ্বিতীয়","তৃতীয়","চতুর্থ","পঞ্চম","ষষ্ঠ","সপ্তম","অষ্টম","নবম","দশম",
"একাদশ","দ্বাদশ","ত্রয়োদশ","চতুর্দশ","পঞ্চদশ","ষোড়শ","সপ্তদশ","অষ্টাদশ","ঊনবিংশ","বিংশতম",
"একবিংশতম","দ্বাবিংশতম","ত্রয়োবিংশতম","চতুর্বিংশতম","পঞ্চবিংশতম","ষড়বিংশতম","সপ্তবিংশতম","অষ্টাবিংশতম","ঊনত্রিংশতম","ত্রিংশতম","একত্রিংশতম"];
function enOrdinalSuffix(n){
  if(n%100>=11 && n%100<=13) return n+'th';
  switch(n%10){case 1:return n+'st';case 2:return n+'nd';case 3:return n+'rd';default:return n+'th';}
}
const bnOrdinalNumeral = {1:'১ম',2:'২য়',3:'৩য়',4:'৪র্থ',5:'৫ম',6:'৬ষ্ঠ',7:'৭ম',8:'৮ম',9:'৯ম',10:'১০ম'};
function bnOrdinalDigit(n){
  return bnOrdinalNumeral[n] || (toBnDigit(n)+'তম');
}
const t2Body = document.getElementById('t2Body');
for(let i=1;i<=31;i++){
  const tr = document.createElement('tr');
  tr.id = `t2-row-${i}`;
  tr.className = i%2===0 ? 'bg-rose-500/10' : 'bg-ink-800/30';
  tr.innerHTML = `<td class="p-2 font-semibold">${i}</td><td class="p-2">${enOrdinalSuffix(i)}</td><td class="p-2">${enOrdinalWords[i-1]}</td><td class="p-2">${bnOrdinalDigit(i)}</td><td class="p-2">${bnOrdinalWords[i-1]}</td>`;
  tr.dataset.search = `${i} ${enOrdinalSuffix(i)} ${enOrdinalWords[i-1]} ${bnOrdinalDigit(i)} ${bnOrdinalWords[i-1]}`.toLowerCase();
  t2Body.appendChild(tr);
}
document.getElementById('t2Search').addEventListener('input',(e)=>{
  const q=e.target.value.trim().toLowerCase();
  [...t2Body.children].forEach(tr=>{ tr.style.display = tr.dataset.search.includes(q)?'':'none'; });
});
