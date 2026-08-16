// Vercel Serverless Function — "AI-কে জিজ্ঞাসা করুন" (Ask AI)
// Powered by Google's Gemini API (free tier — no credit card needed).
// Reads GEMINI_API_KEY from Vercel Project -> Settings -> Environment Variables.
// The key never reaches the browser: this function calls the Gemini API
// server-side and only forwards the plain-text answer back to the client.
//
// If the key is not configured, it responds with { configured: false } and the
// frontend shows a friendly setup message instead of throwing an error.
//
// Get a free key (no billing required): https://aistudio.google.com/apikey

const GEMINI_MODEL = 'gemini-1.5-flash'; // fast + free-tier friendly (10 RPM / 250 req per day)

const SYSTEM_INSTRUCTION = 'তুমি "বহুমুখী তথ্যকোষ" নামের একটি বাংলা রেফারেন্স অ্যাপের সহকারী। এই অ্যাপে সংখ্যা (০-১০০), ক্রমবাচক শব্দ, সপ্তাহের দিন, ইংরেজি/বাংলা/আরবি মাস, ঋতু, রোমান সংখ্যা, একক রূপান্তর, বাংলাদেশের জেলা-উপজেলা-ইউনিয়ন, মহাদেশ-দেশ, মহাসাগর, আজকের তারিখ এবং গাণিতিক/মুদ্রা প্রতীক আছে। ব্যবহারকারী এসব বিষয়ে অথবা সাধারণ যেকোনো জ্ঞানভিত্তিক প্রশ্ন করতে পারে। সংক্ষিপ্ত, সরাসরি ও নির্ভুল উত্তর দাও, সাধারণত ২-৪ লাইনের মধ্যে, অতিরিক্ত ভূমিকা ছাড়া। প্রশ্ন যে ভাষায় (বাংলা/ইংরেজি) হবে, উত্তরও একই ভাষায় দাও।';

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(200).json({ configured: false, answer: null });
    return;
  }

  let body = req.body;
  if (!body || typeof body === 'string') {
    try { body = JSON.parse(body || '{}'); } catch (e) { body = {}; }
  }

  const question = (body && body.question ? String(body.question) : '').trim().slice(0, 500);
  if (!question) {
    res.status(400).json({ error: 'প্রশ্ন খালি থাকতে পারবে না।' });
    return;
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

  try {
    const upstream = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ role: 'user', parts: [{ text: question }] }],
        generationConfig: { maxOutputTokens: 400, temperature: 0.4 }
      })
    });

    if (!upstream.ok) {
      const errText = await upstream.text().catch(() => '');
      // 429 = free-tier rate limit hit; surface a friendlier message for that case.
      if (upstream.status === 429) {
        res.status(200).json({
          configured: true,
          answer: 'এই মুহূর্তে অনেক প্রশ্ন আসছে (ফ্রি কোটা শেষ) — একটু পরে আবার চেষ্টা করুন।'
        });
        return;
      }
      res.status(502).json({ error: 'AI সার্ভিস থেকে উত্তর পাওয়া যায়নি।', detail: errText.slice(0, 300) });
      return;
    }

    const data = await upstream.json();
    const candidate = (data.candidates || [])[0];
    const answer = ((candidate && candidate.content && candidate.content.parts) || [])
      .map(part => part.text || '')
      .join('\n')
      .trim();

    res.status(200).json({ configured: true, answer: answer || 'দুঃখিত, এই প্রশ্নের উত্তর তৈরি করা যায়নি।' });
  } catch (err) {
    res.status(500).json({ error: 'সার্ভার ত্রুটি হয়েছে, একটু পরে আবার চেষ্টা করুন।', detail: String(err).slice(0, 300) });
  }
};
