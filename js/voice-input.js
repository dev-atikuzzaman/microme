// ============================================================
// Voice typing (speech-to-text) for the global search bar,
// using the browser's built-in SpeechRecognition API.
// ============================================================

const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
const voiceSearchBtn = document.getElementById('voiceSearchBtn');

if(!SpeechRecognitionAPI){
  // Not supported on this browser/device — hide the mic rather than show a dead button
  if(voiceSearchBtn) voiceSearchBtn.style.display = 'none';
} else {
  const recognition = new SpeechRecognitionAPI();
  recognition.lang = 'bn-BD';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let voiceListening = false;

  recognition.onresult = (e)=>{
    const transcript = e.results[0][0].transcript;
    gsInput.value = transcript;
    gsInput.dispatchEvent(new Event('input')); // reuse the existing search-on-input handler
    gsInput.focus();
  };

  recognition.onerror = (e)=>{
    voiceListening = false;
    voiceSearchBtn.classList.remove('tts-listening');
    if(e.error === 'not-allowed' || e.error === 'service-not-allowed'){
      alert('ভয়েস সার্চ ব্যবহার করতে মাইক্রোফোনের অনুমতি দিন।');
    } else if(e.error === 'no-speech'){
      // silent — user just didn't say anything, no need to alarm them
    } else {
      console.warn('Speech recognition error:', e.error);
    }
  };

  recognition.onend = ()=>{
    voiceListening = false;
    voiceSearchBtn.classList.remove('tts-listening');
  };

  voiceSearchBtn.addEventListener('click', ()=>{
    if(voiceListening){
      recognition.stop();
      return;
    }
    stopSpeaking(); // don't let TTS and mic input collide
    try{
      recognition.start();
      voiceListening = true;
      voiceSearchBtn.classList.add('tts-listening');
    }catch(err){
      console.warn('Could not start speech recognition:', err);
    }
  });
}
