// ============================================================
// Supabase cloud sync (via Vercel env vars through /api/config)
// ============================================================
/* ============================================================
   CLOUD SYNC (Supabase, configured via Vercel environment variables)
   - Reads keys from /api/config (a Vercel serverless function that reads
     process.env.SUPABASE_URL / SUPABASE_ANON_KEY at request time).
   - If those env vars are not set, the app silently stays in local-only mode.
   - localStorage is always written first (instant UI), Supabase is a
     best-effort background sync layer on top, same pattern as bkbstock.
============================================================ */
const SB = { client: null, ready: false };

const SYNC_KEYS = {
  'customFontsListV2': { rerender: ()=>{
      loadCustomFontsList().forEach(f=>injectCustomFontFace(f.familyName, f.dataUrl));
      rebuildFontDropdown(); renderCustomFontChips();
  }},
  'customInfoEntries_v1': { rerender: renderCustom },
  'bdCustomGeoTree': { rerender: renderBdCascade },
  'continentCustomData': { rerender: renderContinentCountries },
  'oceanCustomData': { rerender: renderOceans },
  'favoriteItems': { rerender: renderFavoritesPanel },
  'recentItems': { rerender: renderFavoritesPanel }
};

function setSyncStatus(online){
  const dots = document.querySelectorAll('.sync-dot');
  const labels = document.querySelectorAll('.sync-label');
  dots.forEach(dot=> dot.classList.toggle('offline', !online));
  labels.forEach(label=> label.textContent = online ? 'ক্লাউড সিঙ্ক সক্রিয়' : 'লোকাল মোড');
}

async function cloudPush(key, value){
  if(!SB.ready) return;
  try{
    await SB.client.from('app_kv').upsert({ key, value, updated_at: new Date().toISOString() });
  }catch(e){ console.warn('cloud sync push failed for', key, e); }
}

async function pullAllFromCloud(){
  if(!SB.ready) return;
  try{
    const { data, error } = await SB.client.from('app_kv').select('key,value');
    if(error){ console.warn('cloud pull failed', error); return; }
    data.forEach(row=>{
      if(SYNC_KEYS[row.key]) localStorage.setItem(row.key, JSON.stringify(row.value));
    });
    Object.values(SYNC_KEYS).forEach(cfg=> cfg.rerender && cfg.rerender());
  }catch(e){ console.warn('cloud pull error', e); }
}

function subscribeRealtimeSync(){
  SB.client.channel('app_kv_live')
    .on('postgres_changes', { event:'*', schema:'public', table:'app_kv' }, (payload)=>{
      const row = (payload.new && Object.keys(payload.new).length) ? payload.new : payload.old;
      if(!row || !SYNC_KEYS[row.key]) return;
      localStorage.setItem(row.key, JSON.stringify(row.value));
      SYNC_KEYS[row.key].rerender();
    })
    .subscribe();
}

async function initCloudSync(){
  try{
    const res = await fetch('/api/config');
    if(!res.ok) throw new Error('config endpoint not available');
    const cfg = await res.json();
    if(!cfg.supabaseUrl || !cfg.supabaseAnonKey){ setSyncStatus(false); return; }
    SB.client = supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey);
    SB.ready = true;
    setSyncStatus(true);
    await pullAllFromCloud();
    subscribeRealtimeSync();
  }catch(e){
    console.warn('Cloud sync unavailable — running in local-only mode.', e);
    setSyncStatus(false);
  }
}
initCloudSync();
