// ============================================================
// Tab 3: Weekdays (English/Bengali)
// ============================================================
/* ============================================================
   TAB 3: WEEKDAYS
============================================================ */
const weekdays = [
  ["Sunday","রবিবার"],["Monday","সোমবার"],["Tuesday","মঙ্গলবার"],
  ["Wednesday","বুধবার"],["Thursday","বৃহস্পতিবার"],["Friday","শুক্রবার"],["Saturday","শনিবার"]
];
const t3Cards = document.getElementById('t3Cards');
const t3Body = document.getElementById('t3Body');
const weekColors = ['bg-ink-800/60','bg-ink-800/40','bg-ink-800/60','bg-ink-800/40','bg-ink-800/60','bg-ink-800/40','bg-ink-800/60'];
weekdays.forEach(([en,bn],idx)=>{
  const div = document.createElement('div');
  div.className = `${weekColors[idx]} rounded-2xl shadow-card premium-card ring-1 ring-gold-500/20 p-4 text-center`;
  div.innerHTML = `<div class="text-2xl font-bold">${bn}</div><div class="text-parchment-400">${en}</div>`;
  t3Cards.appendChild(div);
  const tr = document.createElement('tr');
  tr.innerHTML = `<td class="p-2">${en}</td><td class="p-2">${bn}</td>`;
  t3Body.appendChild(tr);
});
