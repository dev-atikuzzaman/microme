// ============================================================
// Text-to-Speech using the browser's built-in Web Speech API
// (no external service — uses the device/browser's own voices)
// ============================================================

const TTS_SUPPORTED = 'speechSynthesis' in window;
let ttsVoices = [];

function loadTTSVoices(){
  if(TTS_SUPPORTED) ttsVoices = window.speechSynthesis.getVoices();
}
if(TTS_SUPPORTED){
  loadTTSVoices();
  window.speechSynthesis.onvoiceschanged = loadTTSVoices;
}

function pickVoice(lang){
  if(!ttsVoices.length) loadTTSVoices();
  const short = lang.slice(0,2).toLowerCase();
  return ttsVoices.find(v => v.lang.toLowerCase() === lang.toLowerCase()) ||
         ttsVoices.find(v => v.lang.toLowerCase().startsWith(short)) ||
         null;
}

/* Bengali unicode block is U+0980–U+09FF */
function ttsDetectLang(text){
  return /[\u0980-\u09FF]/.test(text) ? 'bn-BD' : 'en-US';
}

function speakText(text, lang){
  if(!TTS_SUPPORTED){
    alert('দুঃখিত, আপনার ব্রাউজারে টেক্সট-টু-স্পিচ সাপোর্ট নেই।');
    return;
  }
  if(!text) return;
  window.speechSynthesis.cancel();
  const finalLang = lang || ttsDetectLang(text);
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = finalLang;
  const voice = pickVoice(finalLang);
  if(voice) utter.voice = voice;
  utter.rate = 0.92;
  utter.pitch = 1;
  window.speechSynthesis.speak(utter);
}

/* Speak a Bengali phrase, then (queued right after) an English phrase */
function speakBoth(bnText, enText){
  if(!TTS_SUPPORTED){
    alert('দুঃখিত, আপনার ব্রাউজারে টেক্সট-টু-স্পিচ সাপোর্ট নেই।');
    return;
  }
  window.speechSynthesis.cancel();
  if(bnText){
    const u1 = new SpeechSynthesisUtterance(bnText);
    u1.lang = 'bn-BD';
    const v1 = pickVoice('bn-BD'); if(v1) u1.voice = v1;
    u1.rate = 0.92;
    window.speechSynthesis.speak(u1);
  }
  if(enText){
    const u2 = new SpeechSynthesisUtterance(enText);
    u2.lang = 'en-US';
    const v2 = pickVoice('en-US'); if(v2) u2.voice = v2;
    u2.rate = 0.92;
    window.speechSynthesis.speak(u2);
  }
}

function stopSpeaking(){
  if(TTS_SUPPORTED) window.speechSynthesis.cancel();
}

/* Returns an inline speaker-button HTML string. Escapes single quotes so the
   text can sit safely inside an onclick="" attribute. */
function ttsBtn(bnText, enText){
  const esc = s => String(s||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  if(enText !== undefined){
    return `<button class="tts-btn" onclick="event.stopPropagation(); speakBoth('${esc(bnText)}','${esc(enText)}')" title="উচ্চারণ শুনুন">🔊</button>`;
  }
  return `<button class="tts-btn" onclick="event.stopPropagation(); speakText('${esc(bnText)}')" title="উচ্চারণ শুনুন">🔊</button>`;
}

// Stop any ongoing speech when the user switches tabs, to avoid overlap
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', stopSpeaking);
});
