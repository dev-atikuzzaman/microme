// ============================================================
// TAB 12: Today's Date Dashboard
// Shows the current moment in three calendars at once:
// English (Gregorian), Bengali (reformed Bangladesh calendar),
// and Hijri (tabular/arithmetic Islamic calendar).
// ============================================================

const enWeekdayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const enMonthNamesFull = ["January","February","March","April","May","June","July","August","September","October","November","December"];

/* ---------- Bengali calendar conversion (reformed 2019 Bangladesh calendar) ---------- */
function isGregorianLeapYear(y){
  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
}

function gregorianToBengali(gYear, gMonth, gDay){
  const dateObj = new Date(Date.UTC(gYear, gMonth-1, gDay));
  const newYearThisGYear = new Date(Date.UTC(gYear, 3, 14)); // Pohela Boishakh = April 14

  let bYear, newYearRef;
  if(dateObj >= newYearThisGYear){
    bYear = gYear - 593;
    newYearRef = newYearThisGYear;
  } else {
    bYear = gYear - 594;
    newYearRef = new Date(Date.UTC(gYear-1, 3, 14));
  }

  const dayOffset = Math.round((dateObj - newYearRef) / 86400000);
  const falgunGregYear = newYearRef.getUTCFullYear() + 1;
  const falgunDays = isGregorianLeapYear(falgunGregYear) ? 31 : 30;
  const monthLengths = [31,31,31,31,31,31,30,30,30,30,falgunDays,30];

  let remaining = dayOffset;
  let monthIdx = 0;
  while(remaining >= monthLengths[monthIdx] && monthIdx < 11){
    remaining -= monthLengths[monthIdx];
    monthIdx++;
  }
  return { year: bYear, month: monthIdx+1, monthName: bnMonths[monthIdx][0], day: remaining + 1 };
}

/* ---------- Hijri calendar conversion (tabular/civil Islamic calendar) ---------- */
const hijriMonthNames = ["মুহাররম","সফর","রবিউল আউয়াল","রবিউস সানি","জমাদিউল আউয়াল","জমাদিউস সানি","রজব","শাবান","রমজান","শাওয়াল","জিলক্বদ","জিলহজ্জ"];

function gregorianToJulianDay(y, m, d){
  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12*a - 3;
  return d + Math.floor((153*m2 + 2)/5) + 365*y2 + Math.floor(y2/4) - Math.floor(y2/100) + Math.floor(y2/400) - 32045;
}

function julianDayToHijri(jdInput){
  let jd = jdInput - 1948440 + 10632;
  const n = Math.floor((jd - 1) / 10631);
  jd = jd - 10631 * n + 354;
  const j = (Math.floor((10985 - jd) / 5316)) * (Math.floor((50 * jd) / 17719)) + (Math.floor(jd / 5670)) * (Math.floor((43 * jd) / 15238));
  jd = jd - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const month = Math.floor((24 * jd) / 709);
  const day = jd - Math.floor((709 * month) / 24);
  const year = 30 * n + j - 30;
  return { year, month, day };
}

function gregorianToHijri(y, m, d){
  const jd = gregorianToJulianDay(y, m, d);
  const h = julianDayToHijri(jd);
  return { year: h.year, month: h.month, monthName: hijriMonthNames[h.month-1], day: h.day };
}

/* ---------- Render ---------- */
function renderTodayDashboard(){
  const now = new Date();
  const y = now.getFullYear(), m = now.getMonth()+1, d = now.getDate();

  document.getElementById('todayClock').textContent =
    now.toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true});

  document.getElementById('todayWeekday').textContent =
    `${weekdays[now.getDay()][1]} • ${weekdays[now.getDay()][0]}`;

  document.getElementById('todayEnglish').textContent =
    `${d} ${enMonthNamesFull[m-1]}, ${y}`;

  const bn = gregorianToBengali(y, m, d);
  document.getElementById('todayBengali').textContent =
    `${toBnDigit(bn.day)} ${bn.monthName}, ${toBnDigit(bn.year)}`;

  const hj = gregorianToHijri(y, m, d);
  document.getElementById('todayHijri').textContent =
    `${toBnDigit(hj.day)} ${hj.monthName}, ${toBnDigit(hj.year)} হিজরি`;
}

renderTodayDashboard();
setInterval(renderTodayDashboard, 1000);

document.getElementById('todaySpeakBtn').addEventListener('click', ()=>{
  const enText = document.getElementById('todayEnglish').textContent;
  const bnText = `আজ ${document.getElementById('todayWeekday').textContent.split('•')[0].trim()}, বাংলা তারিখ ${document.getElementById('todayBengali').textContent}, এবং হিজরি তারিখ ${document.getElementById('todayHijri').textContent}।`;
  speakBoth(bnText, `Today is ${enText}`);
});
