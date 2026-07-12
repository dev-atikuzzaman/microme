-- ============================================================
-- বহুমুখী তথ্যকোষ — Supabase Cloud Sync Setup
-- এই স্ক্রিপ্টটি আপনার Supabase প্রজেক্টের SQL Editor-এ একবার রান করুন।
-- পুরো স্ক্রিপ্টটি বারবার রান করলেও সমস্যা হবে না (idempotent)।
-- ============================================================

-- ১) মূল কী-ভ্যালু টেবিল — অ্যাপের সব কাস্টম ডেটা (ফন্ট তালিকা, কাস্টম তথ্য,
--    বাংলাদেশ জেলা-উপজেলা ট্রি, মহাদেশ/মহাসাগর কাস্টম তথ্য) এখানে জমা হবে।
create table if not exists public.app_kv (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

-- ২) Row Level Security চালু করুন
alter table public.app_kv enable row level security;

-- ৩) এই অ্যাপটি ব্যক্তিগত ব্যবহারের জন্য (কোনো লগইন সিস্টেম নেই), তাই anon key
--    দিয়ে read/write উভয়ই অনুমোদিত। আপনার প্রজেক্টের anon key যেন প্রকাশ্যে
--    শেয়ার না হয় (যদিও anon key browser-এ থাকাটাই স্বাভাবিক Supabase ডিজাইন)।
drop policy if exists "app_kv_select" on public.app_kv;
create policy "app_kv_select" on public.app_kv
  for select using (true);

drop policy if exists "app_kv_insert" on public.app_kv;
create policy "app_kv_insert" on public.app_kv
  for insert with check (true);

drop policy if exists "app_kv_update" on public.app_kv;
create policy "app_kv_update" on public.app_kv
  for update using (true);

-- ৪) Realtime সক্রিয় করুন (ডিভাইস পরিবর্তনেও লাইভ সিঙ্ক কাজ করার জন্য)
--    ইতিমধ্যে যোগ করা থাকলে এই অংশে এরর দেখালে সেটা উপেক্ষা করা যাবে।
do $$
begin
  alter publication supabase_realtime add table public.app_kv;
exception
  when duplicate_object then
    null; -- already added, safe to ignore
end $$;

-- ============================================================
-- সম্পন্ন! এখন Vercel প্রজেক্টে নিচের Environment Variables যোগ করুন:
--   SUPABASE_URL       = আপনার প্রজেক্টের URL (Project Settings -> API)
--   SUPABASE_ANON_KEY  = আপনার প্রজেক্টের anon/public key (Project Settings -> API)
-- যোগ করার পর Vercel-এ Redeploy করুন। হেডারের ছোট বৃত্ত (●) সবুজ হলে
-- বুঝবেন ক্লাউড সিঙ্ক সক্রিয় হয়েছে।
-- ============================================================
