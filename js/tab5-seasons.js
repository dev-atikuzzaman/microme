// ============================================================
// Tab 5: Bengali/English/Arabic seasons
// ============================================================
/* ============================================================
   TAB 5: SEASONS
============================================================ */
const bnSeasons = [["গ্রীষ্ম","বৈশাখ-জ্যৈষ্ঠ","Summer"],["বর্ষা","আষাঢ়-শ্রাবণ","Monsoon"],["শরৎ","ভাদ্র-আশ্বিন","Autumn"],
["হেমন্ত","কার্তিক-অগ্রহায়ণ","Late Autumn"],["শীত","পৌষ-মাঘ","Winter"],["বসন্ত","ফাল্গুন-চৈত্র","Spring"]];
const enSeasons = [["Spring","বসন্ত","March-May"],["Summer","গ্রীষ্ম","June-August"],["Autumn / Fall","শরৎ","September-November"],["Winter","শীত","December-February"]];
const arSeasons = [["الربيع","Al-Rabi'","বসন্ত (Spring)"],["الصيف","Al-Sayf","গ্রীষ্ম (Summer)"],["الخريف","Al-Kharif","শরৎ (Autumn)"],["الشتاء","Al-Shita'","শীত (Winter)"]];
function fillSeasonTable(bodyId,arr){
  const tbody = document.getElementById(bodyId);
  arr.forEach((row,idx)=>{
    const tr=document.createElement('tr');
    tr.id = `${bodyId}-row-${idx}`;
    tr.className = idx%2===0?'bg-teal-500/10':'bg-ink-800/30';
    tr.innerHTML = `<td class="p-2 font-semibold">${row[0]}</td><td class="p-2">${row[1]}</td><td class="p-2">${row[2]}</td>`;
    tbody.appendChild(tr);
  });
}
fillSeasonTable('t5BodyBn', bnSeasons);
fillSeasonTable('t5BodyEn', enSeasons);
fillSeasonTable('t5BodyAr', arSeasons);
