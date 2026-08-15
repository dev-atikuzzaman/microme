// ============================================================
// Swipe left/right on the main content area to change tabs
// (mobile touch gesture). Ignores swipes that start inside
// horizontally-scrollable elements (wide tables, the tab nav
// itself) or form controls (range sliders, inputs) so it never
// fights with those.
// ============================================================

const SWIPE_MIN_DISTANCE = 60;   // px — minimum horizontal travel to count as a swipe
const SWIPE_MAX_VERTICAL = 60;   // px — if vertical drift exceeds this, treat as a scroll instead
const SWIPE_MAX_DURATION = 600;  // ms — ignore slow drags

let swipeStartX = null;
let swipeStartY = null;
let swipeStartTime = 0;
let swipeTracking = false;

function swipeIsInteractiveTarget(el){
  while(el && el !== document.body){
    if(el.classList && (el.classList.contains('overflow-x-auto') || el.classList.contains('tab-scroll'))) return true;
    if(['INPUT','SELECT','TEXTAREA','BUTTON'].includes(el.tagName)) return true;
    el = el.parentElement;
  }
  return false;
}

function swipeToAdjacentTab(direction){
  const buttons = [...document.querySelectorAll('.tab-btn')];
  const activeIdx = buttons.findIndex(b => b.classList.contains('active-tab'));
  if(activeIdx === -1) return;
  let nextIdx = direction === 'next' ? activeIdx + 1 : activeIdx - 1;
  if(nextIdx < 0) nextIdx = buttons.length - 1;      // wrap around to last tab
  if(nextIdx >= buttons.length) nextIdx = 0;          // wrap around to first tab
  buttons[nextIdx].click();
  buttons[nextIdx].scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
}

const swipeArea = document.getElementById('printArea');

swipeArea.addEventListener('touchstart', (e)=>{
  if(e.touches.length !== 1){ swipeTracking = false; return; }
  swipeTracking = !swipeIsInteractiveTarget(e.target);
  if(!swipeTracking) return;
  swipeStartX = e.touches[0].clientX;
  swipeStartY = e.touches[0].clientY;
  swipeStartTime = Date.now();
}, {passive:true});

swipeArea.addEventListener('touchend', (e)=>{
  if(!swipeTracking || swipeStartX === null) return;
  swipeTracking = false;
  const touch = e.changedTouches[0];
  const deltaX = touch.clientX - swipeStartX;
  const deltaY = touch.clientY - swipeStartY;
  const elapsed = Date.now() - swipeStartTime;
  swipeStartX = null;

  if(elapsed > SWIPE_MAX_DURATION) return;
  if(Math.abs(deltaX) < SWIPE_MIN_DISTANCE) return;
  if(Math.abs(deltaY) > SWIPE_MAX_VERTICAL) return;

  stopSpeaking();
  swipeToAdjacentTab(deltaX < 0 ? 'next' : 'prev');
  dismissSwipeHint();
}, {passive:true});

function dismissSwipeHint(){
  const hint = document.getElementById('swipeHint');
  if(hint && !hint.classList.contains('hidden')){
    hint.style.transition = 'opacity .5s ease';
    hint.style.opacity = '0';
    setTimeout(()=> hint.classList.add('hidden'), 500);
  }
  localStorage.setItem('swipeHintSeen', '1');
}
if(localStorage.getItem('swipeHintSeen') === '1'){
  const hint = document.getElementById('swipeHint');
  if(hint) hint.classList.add('hidden');
}
