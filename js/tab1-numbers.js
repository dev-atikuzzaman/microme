// ============================================================
// Tab 1: Numbers 0-100 (English/Bengali digits & words) + search
// ============================================================
/* ============================================================
   TAB 1: NUMBERS 0-100
============================================================ */
const enOnes = ['Zero','One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten',
  'Eleven','Twelve','Thirteen','Fourteen','Fifteen','Sixteen','Seventeen','Eighteen','Nineteen'];
const enTens = ['','','Twenty','Thirty','Forty','Fifty','Sixty','Seventy','Eighty','Ninety'];
function englishWord(n){
  if(n < 20) return enOnes[n];
  if(n < 100){
    const t = Math.floor(n/10), o = n%10;
    return enTens[t] + (o? '-'+enOnes[o].toLowerCase() : '');
  }
  return 'One Hundred';
}
const bnWords = ["শূন্য","এক","দুই","তিন","চার","পাঁচ","ছয়","সাত","আট","নয়","দশ",
"এগারো","বারো","তেরো","চৌদ্দ","পনেরো","ষোলো","সতেরো","আঠারো","ঊনিশ","বিশ",
"একুশ","বাইশ","তেইশ","চব্বিশ","পঁচিশ","ছাব্বিশ","সাতাশ","আটাশ","ঊনত্রিশ","ত্রিশ",
"একত্রিশ","বত্রিশ","তেত্রিশ","চৌত্রিশ","পঁয়ত্রিশ","ছত্রিশ","সাঁইত্রিশ","আটত্রিশ","ঊনচল্লিশ","চল্লিশ",
"একচল্লিশ","বিয়াল্লিশ","তেতাল্লিশ","চুয়াল্লিশ","পঁয়তাল্লিশ","ছেচল্লিশ","সাতচল্লিশ","আটচল্লিশ","ঊনপঞ্চাশ","পঞ্চাশ",
"একান্ন","বায়ান্ন","তিপ্পান্ন","চুয়ান্ন","পঞ্চান্ন","ছাপ্পান্ন","সাতান্ন","আটান্ন","ঊনষাট","ষাট",
"একষট্টি","বাষট্টি","তেষট্টি","চৌষট্টি","পঁয়ষট্টি","ছেষট্টি","সাতষট্টি","আটষট্টি","ঊনসত্তর","সত্তর",
"একাত্তর","বাহাত্তর","তিয়াত্তর","চুয়াত্তর","পঁচাত্তর","ছিয়াত্তর","সাতাত্তর","আটাত্তর","ঊনআশি","আশি",
"একাশি","বিরাশি","তিরাশি","চুরাশি","পঁচাশি","ছিয়াশি","সাতাশি","আটাশি","ঊননব্বই","নব্বই",
"একানব্বই","বিরানব্বই","তিরানব্বই","চুরানব্বই","পঁচানব্বই","ছিয়ানব্বই","সাতানব্বই","আটানব্বই","নিরানব্বই","একশত"];
const bnDigitMap = {'0':'০','1':'১','2':'২','3':'৩','4':'৪','5':'৫','6':'৬','7':'৭','8':'৮','9':'৯'};
function toBnDigit(n){ return String(n).split('').map(c=>bnDigitMap[c]||c).join(''); }

const t1Body = document.getElementById('t1Body');
for(let i=0;i<=100;i++){
  const tr = document.createElement('tr');
  tr.id = `t1-row-${i}`;
  tr.className = i%2===0 ? 'bg-indigo-500/10' : 'bg-ink-800/30';
  tr.innerHTML = `<td class="p-2 font-semibold">${i}</td><td class="p-2">${i}</td><td class="p-2">${englishWord(i)}</td><td class="p-2">${bnWords[i]}</td><td class="p-2">${toBnDigit(i)}</td><td class="p-2 text-center no-print">${ttsBtn(bnWords[i], englishWord(i))}</td>`;
  tr.dataset.search = `${i} ${englishWord(i)} ${bnWords[i]} ${toBnDigit(i)}`.toLowerCase();
  t1Body.appendChild(tr);
}
document.getElementById('t1Search').addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  [...t1Body.children].forEach(tr=>{
    tr.style.display = tr.dataset.search.includes(q) ? '' : 'none';
  });
});
