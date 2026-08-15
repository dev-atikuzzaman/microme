// ============================================================
// Tab 7: Unit converter (length, volume, temperature, pressure)
// ============================================================
/* ============================================================
   TAB 7: UNIT CONVERTER
============================================================ */
document.querySelectorAll('.converter-block').forEach(block=>{
  const units = JSON.parse(block.dataset.units);
  const keys = Object.keys(units);
  block.innerHTML = `
    <div class="flex flex-col gap-2">
      <input type="number" value="1" class="conv-input border rounded-lg px-3 py-2" placeholder="মান লিখুন">
      <div class="flex gap-2 items-center">
        <select class="conv-from border rounded-lg px-2 py-2 flex-1">${keys.map(k=>`<option value="${k}">${k}</option>`).join('')}</select>
        <span>➡️</span>
        <select class="conv-to border rounded-lg px-2 py-2 flex-1">${keys.map((k,idx)=>`<option value="${k}" ${idx===1?'selected':''}>${k}</option>`).join('')}</select>
      </div>
      <div class="conv-result text-lg font-bold text-sky-300 bg-sky-50 rounded-lg p-2">ফলাফল: -</div>
    </div>`;
  function calc(){
    const val = parseFloat(block.querySelector('.conv-input').value)||0;
    const from = block.querySelector('.conv-from').value;
    const to = block.querySelector('.conv-to').value;
    const base = val * units[from];
    const result = base / units[to];
    block.querySelector('.conv-result').textContent = `ফলাফল: ${result.toLocaleString(undefined,{maximumFractionDigits:6})} ${to}`;
  }
  block.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',calc));
  calc();
});
// Temperature (non-linear)
const tempBlock = document.getElementById('conv_temp');
tempBlock.innerHTML = `
  <div class="flex flex-col gap-2">
    <input type="number" value="25" class="t-input border rounded-lg px-3 py-2">
    <div class="flex gap-2 items-center">
      <select class="t-from border rounded-lg px-2 py-2 flex-1"><option value="C">°C (Celsius)</option><option value="F">°F (Fahrenheit)</option></select>
      <span>➡️</span>
      <select class="t-to border rounded-lg px-2 py-2 flex-1"><option value="F">°F (Fahrenheit)</option><option value="C">°C (Celsius)</option></select>
    </div>
    <div class="t-result text-lg font-bold text-sky-300 bg-sky-50 rounded-lg p-2">ফলাফল: -</div>
  </div>`;
function tempCalc(){
  const val = parseFloat(tempBlock.querySelector('.t-input').value)||0;
  const from = tempBlock.querySelector('.t-from').value;
  const to = tempBlock.querySelector('.t-to').value;
  let result;
  if(from===to) result = val;
  else if(from==='C'&&to==='F') result = val*9/5+32;
  else result = (val-32)*5/9;
  tempBlock.querySelector('.t-result').textContent = `ফলাফল: ${result.toLocaleString(undefined,{maximumFractionDigits:4})} °${to}`;
}
tempBlock.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',tempCalc));
tempCalc();
