// ============================================================
// Text-to-Speech using the browser's built-in Web Speech API
// (no external service — uses the device/browser's own voices)
//
// Three modes (stored in localStorage as 'ttsMode'):
//   'bn'   - Bengali only
//   'en'   - English only
//   'both' - Bengali then English, one after another (default)
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

const TTS_MODE_KEY = 'ttsMode';
function getTTSMode(){ return localStorage.getItem(TTS_MODE_KEY) || 'both'; }
function setTTSMode(mode){ localStorage.setItem(TTS_MODE_KEY, mode); }

/* Low-level: queue a single utterance WITHOUT cancelling what's already queued
   (used for bulk/range reading so items play back-to-back). */
function queueUtterance(text, lang){
  if(!TTS_SUPPORTED || !text) return;
  const u = new SpeechSynthesisUtterance(text);
  u.lang = lang;
  const voice = pickVoice(lang);
  if(voice) u.voice = voice;
  u.rate = 0.92;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

/* Queue one item's pronunciation according to the current TTS mode.
   Does not cancel the existing queue — safe to call in a loop for bulk reads. */
function queueSpeakItem(bnText, enText){
  const mode = getTTSMode();
  if(mode === 'bn'){
    queueUtterance(bnText, 'bn-BD');
  } else if(mode === 'en'){
    if(enText) queueUtterance(enText, 'en-US');
    else queueUtterance(bnText, 'bn-BD'); // no English version available, fall back
  } else {
    queueUtterance(bnText, 'bn-BD');
    queueUtterance(enText, 'en-US');
  }
}

/* Speak a single arbitrary piece of text (auto-detects language if none given).
   Cancels anything currently playing/queued first. */
function speakText(text, lang){
  if(!TTS_SUPPORTED){
    alert('দুঃখিত, আপনার ব্রাউজারে টেক্সট-টু-স্পিচ সাপোর্ট নেই।');
    return;
  }
  if(!text) return;
  window.speechSynthesis.cancel();
  queueUtterance(text, lang || ttsDetectLang(text));
}

/* Speak a Bengali phrase then an English phrase, respecting the current TTS mode.
   Cancels anything currently playing/queued first. */
function speakBoth(bnText, enText){
  if(!TTS_SUPPORTED){
    alert('দুঃখিত, আপনার ব্রাউজারে টেক্সট-টু-স্পিচ সাপোর্ট নেই।');
    return;
  }
  window.speechSynthesis.cancel();
  queueSpeakItem(bnText, enText);
}

function stopSpeaking(){
  if(TTS_SUPPORTED) window.speechSynthesis.cancel();
}

/* Returns an inline speaker-button HTML string. Escapes single quotes/backslashes
   so the text can sit safely inside an onclick="" attribute. */
function ttsBtn(bnText, enText){
  const esc = s => String(s||'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");
  if(enText !== undefined){
    return `<button class="tts-btn" onclick="event.stopPropagation(); speakBoth('${esc(bnText)}','${esc(enText)}')" title="উচ্চারণ শুনুন">🔊</button>`;
  }
  return `<button class="tts-btn" onclick="event.stopPropagation(); speakText('${esc(bnText)}')" title="উচ্চারণ শুনুন">🔊</button>`;
}

/* Wires up a "read a range" control: two number inputs + play/stop buttons.
   Reads every item from `min`..`max` (clamped) back-to-back according to the
   current TTS mode. wordsFn(i) must return [bnText, enText]. */
function setupRangeReader(fromId, toId, playId, stopId, min, max, wordsFn){
  const playBtn = document.getElementById(playId);
  const stopBtn = document.getElementById(stopId);
  if(!playBtn || !stopBtn) return;
  playBtn.addEventListener('click', ()=>{
    let from = parseInt(document.getElementById(fromId).value);
    let to = parseInt(document.getElementById(toId).value);
    if(isNaN(from)) from = min;
    if(isNaN(to)) to = max;
    from = Math.max(min, from);
    to = Math.min(max, to);
    if(from > to){ alert('শুরুর সংখ্যা শেষের সংখ্যার চেয়ে বড় হতে পারবে না।'); return; }
    stopSpeaking();
    for(let i=from; i<=to; i++){
      const [bn, en] = wordsFn(i);
      queueSpeakItem(bn, en);
    }
  });
  stopBtn.addEventListener('click', stopSpeaking);
}

// Stop any ongoing speech when the user switches tabs, to avoid overlap
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click', stopSpeaking);
});

// TTS mode selector in the header
const ttsModeSelect = document.getElementById('ttsModeSelect');
if(ttsModeSelect){
  ttsModeSelect.value = getTTSMode();
  ttsModeSelect.addEventListener('change', ()=>{
    setTTSMode(ttsModeSelect.value);
    stopSpeaking();
  });
}
