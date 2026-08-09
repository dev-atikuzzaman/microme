// ============================================================
// Favorites (bookmarks) + Recently Viewed history
// Reuses the global search index to resolve stored items by a
// stable id, so favorites/history stay correct even as the
// underlying tab data changes (items added/removed/edited).
// ============================================================

const FAVORITES_KEY = 'favoriteItems';
const RECENT_KEY = 'recentItems';
const RECENT_MAX = 30;

function loadFavorites(){ try{ return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []; }catch(e){ return []; } }
function saveFavorites(list){ localStorage.setItem(FAVORITES_KEY, JSON.stringify(list)); cloudPush(FAVORITES_KEY, list); }

function loadRecent(){ try{ return JSON.parse(localStorage.getItem(RECENT_KEY)) || []; }catch(e){ return []; } }
function saveRecent(list){ localStorage.setItem(RECENT_KEY, JSON.stringify(list)); cloudPush(RECENT_KEY, list); }

function isFavorite(id){
  return loadFavorites().some(f => f.id === id);
}

/* Returns true if the item is now favorited, false if it was just removed */
function toggleFavorite(item){
  let list = loadFavorites();
  const exists = list.some(f => f.id === item.id);
  if(exists){
    list = list.filter(f => f.id !== item.id);
  } else {
    list.unshift({ id:item.id, tabId:item.tabId, tabIcon:item.tabIcon, tabLabel:item.tabLabel, title:item.title, subtitle:item.subtitle, addedAt: Date.now() });
  }
  saveFavorites(list);
  renderFavoritesPanel();
  return !exists;
}

function addToRecent(item){
  let list = loadRecent().filter(r => r.id !== item.id); // de-dup, move existing to front
  list.unshift({ id:item.id, tabId:item.tabId, tabIcon:item.tabIcon, tabLabel:item.tabLabel, title:item.title, subtitle:item.subtitle, viewedAt: Date.now() });
  if(list.length > RECENT_MAX) list = list.slice(0, RECENT_MAX);
  saveRecent(list);
  renderFavoritesPanel();
}

function clearRecent(){
  saveRecent([]);
  renderFavoritesPanel();
}

/* Navigate to a stored favorite/recent item by rebuilding the live search
   index and resolving its current position — robust even if the underlying
   data (e.g. a custom entry) changed since it was bookmarked. */
function navigateToStoredItem(stored){
  const idx = buildGlobalSearchIndex();
  const match = idx.find(i => i.id === stored.id);
  if(!match){
    alert('আইটেমটি আর পাওয়া যাচ্ছে না — সম্ভবত মুছে ফেলা হয়েছে বা পরিবর্তিত হয়েছে।');
    return;
  }
  document.getElementById('favoritesPanel').classList.add('hidden');
  match.go();
  addToRecent(match);
}

function fhRowHTML(item){
  const starred = isFavorite(item.id);
  const safe = JSON.stringify(item).replace(/'/g, '&apos;');
  return `
    <div class="fh-row gs-result-item flex items-center gap-3 px-3 py-2.5 border-b border-white/5 last:border-0" data-item='${safe}'>
      <span class="text-lg shrink-0">${item.tabIcon}</span>
      <div class="min-w-0 flex-1">
        <div class="text-parchment-100 text-sm font-medium truncate">${item.title}</div>
        <div class="text-parchment-400 text-xs truncate">${item.subtitle}</div>
      </div>
      <button class="fh-star text-base shrink-0 ${starred ? 'text-gold-400' : 'text-parchment-400'}">${starred ? '★' : '☆'}</button>
      ${ttsBtn(item.title)}
    </div>`;
}

function renderFavoritesPanel(){
  const favBox = document.getElementById('favoritesList');
  const recentBox = document.getElementById('recentList');
  if(!favBox || !recentBox) return;

  const favs = loadFavorites();
  const recents = loadRecent();

  document.getElementById('favCount').textContent = favs.length;
  document.getElementById('recentCount').textContent = recents.length;

  favBox.innerHTML = favs.length === 0
    ? `<div class="text-xs text-parchment-400 text-center py-6">এখনো কোনো ফেভারিট নেই — সার্চ রেজাল্টের ☆ চেপে যোগ করুন</div>`
    : favs.map(fhRowHTML).join('');

  recentBox.innerHTML = recents.length === 0
    ? `<div class="text-xs text-parchment-400 text-center py-6">এখনো কিছু দেখা হয়নি</div>`
    : recents.map(fhRowHTML).join('');

  [...document.querySelectorAll('.fh-row')].forEach(el=>{
    el.addEventListener('click', (e)=>{
      if(e.target.closest('.fh-star') || e.target.closest('.tts-btn')) return;
      navigateToStoredItem(JSON.parse(el.dataset.item));
    });
  });
  [...document.querySelectorAll('.fh-star')].forEach(el=>{
    el.addEventListener('click', (e)=>{
      e.stopPropagation();
      const stored = JSON.parse(el.closest('.fh-row').dataset.item);
      const nowStarred = toggleFavorite(stored);
      el.textContent = nowStarred ? '★' : '☆';
      el.classList.toggle('text-gold-400', nowStarred);
      el.classList.toggle('text-parchment-400', !nowStarred);
    });
  });
}

function switchFavTab(which){
  document.getElementById('favoritesList').classList.toggle('hidden', which !== 'fav');
  document.getElementById('recentList').classList.toggle('hidden', which !== 'recent');
  document.getElementById('favoritesTabFav').classList.toggle('fh-tab-active', which === 'fav');
  document.getElementById('favoritesTabRecent').classList.toggle('fh-tab-active', which === 'recent');
}

document.getElementById('favoritesBtn').addEventListener('click', ()=>{
  const panel = document.getElementById('favoritesPanel');
  panel.classList.toggle('hidden');
  if(!panel.classList.contains('hidden')) renderFavoritesPanel();
});
document.getElementById('favoritesCloseBtn').addEventListener('click', ()=>{
  document.getElementById('favoritesPanel').classList.add('hidden');
});
document.getElementById('favoritesTabFav').addEventListener('click', ()=> switchFavTab('fav'));
document.getElementById('favoritesTabRecent').addEventListener('click', ()=> switchFavTab('recent'));
document.getElementById('clearRecentBtn').addEventListener('click', ()=>{
  if(confirm('সাম্প্রতিক দেখা সব তথ্য মুছে ফেলতে চান?')) clearRecent();
});

renderFavoritesPanel();
switchFavTab('fav');
