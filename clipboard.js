// ============================================================
// One-tap copy-to-clipboard, used across every table row / card
// ============================================================

function fallbackCopy(text){
  try{
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    ta.style.top = '0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(ta);
    return ok;
  }catch(e){
    return false;
  }
}

function copyToClipboard(text, btnEl){
  const showSuccess = ()=>{
    if(!btnEl) return;
    const original = btnEl.textContent;
    btnEl.textContent = '✅';
    btnEl.classList.add('copy-success');
    setTimeout(()=>{
      btnEl.textContent = original;
      btnEl.classList.remove('copy-success');
    }, 1200);
  };
  const showFailure = ()=> alert('কপি করা যায়নি — টেক্সটটি ম্যানুয়ালি সিলেক্ট করে কপি করুন।');

  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(showSuccess).catch(()=>{
      fallbackCopy(text) ? showSuccess() : showFailure();
    });
  } else {
    fallbackCopy(text) ? showSuccess() : showFailure();
  }
}

/* Returns an inline copy-button HTML string. Escapes quotes/backslashes so
   the text can sit safely inside an onclick="" attribute. */
function copyBtn(text){
  const esc = s => String(s||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n').replace(/\r/g,'');
  return `<button class="copy-btn" onclick="event.stopPropagation(); copyToClipboard('${esc(text)}', this)" title="কপি করুন">📋</button>`;
}
