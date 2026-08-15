// ============================================================
// AI ASK — free-form Q&A panel, powered by /api/ask-ai
// ============================================================
(function(){
  const fab      = document.getElementById('aiAskFab');
  const overlay  = document.getElementById('aiAskOverlay');
  const panel    = document.getElementById('aiAskPanel');
  const closeBtn = document.getElementById('aiAskClose');
  const form     = document.getElementById('aiAskForm');
  const input    = document.getElementById('aiAskInput');
  const sendBtn  = document.getElementById('aiAskSend');
  const thread   = document.getElementById('aiAskThread');
  const emptyEl  = document.getElementById('aiAskEmpty');

  if(!fab || !panel || !form) return;

  function openPanel(){
    overlay.classList.remove('hidden');
    panel.classList.remove('hidden');
    setTimeout(()=> input && input.focus(), 150);
  }
  function closePanel(){
    overlay.classList.add('hidden');
    panel.classList.add('hidden');
  }

  fab.addEventListener('click', openPanel);
  closeBtn.addEventListener('click', closePanel);
  overlay.addEventListener('click', closePanel);

  function addBubble(role, text){
    if(emptyEl) emptyEl.classList.add('hidden');
    const bubble = document.createElement('div');
    bubble.className = role === 'user'
      ? 'ml-auto max-w-[85%] bg-gradient-to-br from-gold-500 to-gold-600 text-ink-950 rounded-2xl rounded-br-sm px-3.5 py-2 text-sm font-medium mb-2.5 shadow-card'
      : 'mr-auto max-w-[85%] bg-ink-800/80 ring-1 ring-white/5 text-parchment-100 rounded-2xl rounded-bl-sm px-3.5 py-2 text-sm mb-2.5 whitespace-pre-wrap';
    bubble.textContent = text;
    thread.appendChild(bubble);
    thread.scrollTop = thread.scrollHeight;
    return bubble;
  }

  async function ask(question){
    addBubble('user', question);
    const answerBubble = addBubble('ai', '…চিন্তা করছি');
    sendBtn.disabled = true;
    try{
      const resp = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await resp.json().catch(()=> ({}));

      if(!resp.ok){
        answerBubble.textContent = data.error || 'দুঃখিত, উত্তর দেওয়া যায়নি। একটু পরে আবার চেষ্টা করুন।';
      } else if(data.configured === false){
        answerBubble.textContent = '✨ ফিচারটি এখনো সক্রিয় করা হয়নি।\nVercel প্রজেক্টের Environment Variables-এ GEMINI_API_KEY যোগ করলে এটি চালু হয়ে যাবে (ফ্রি — aistudio.google.com/apikey থেকে key নিন)।';
      } else {
        answerBubble.textContent = data.answer || 'দুঃখিত, উত্তর পাওয়া যায়নি।';
      }
    } catch(err){
      answerBubble.textContent = 'নেটওয়ার্ক সমস্যা হয়েছে — ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।';
    } finally {
      sendBtn.disabled = false;
    }
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const q = (input.value || '').trim();
    if(!q) return;
    input.value = '';
    ask(q);
  });
})();
