// Vercel Serverless Function
// Reads SUPABASE_URL and SUPABASE_ANON_KEY from Vercel Project -> Settings -> Environment Variables
// and hands them to the frontend at runtime. The anon key is meant to be public
// (it only works through your RLS policies), so exposing it to the browser is normal/expected.
//
// If these env vars are not set, the app automatically falls back to local-only mode
// (no crash, no errors shown to the user).

module.exports = (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY || ''
  });
};
