// ============================================================
// Generic CSV/XLSX export & import helpers used across tabs
// ============================================================
/* ============================================================
   EXPORT: CSV / XLSX (generic table)
============================================================ */
function tableToAOA(tableId){
  const table = document.getElementById(tableId);
  const rows = [...table.querySelectorAll('tr')];
  return rows.map(tr => [...tr.children].map(td => td.textContent.trim()));
}
function exportTableCSV(tableId, filename){
  const aoa = tableToAOA(tableId);
  const csv = aoa.map(r => r.map(c=>`"${c.replace(/"/g,'""')}"`).join(',')).join('\r\n');
  downloadBlob(new Blob(["\uFEFF"+csv], {type:'text/csv;charset=utf-8;'}), filename+'.csv');
}
function exportTableXLSX(tableId, filename){
  const aoa = tableToAOA(tableId);
  const ws = XLSX.utils.aoa_to_sheet(aoa);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, filename+'.xlsx');
}
function downloadBlob(blob, filename){
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename;
  document.body.appendChild(a); a.click(); a.remove();
  URL.revokeObjectURL(url);
}

/* Generic import: reads csv/xlsx and appends new rows into given table body (tries to match column count) */
function importGeneric(evt, tableId){
  const file = evt.target.files[0];
  if(!file) return;
  const table = document.getElementById(tableId);
  const tbody = table.querySelector('tbody');
  const colCount = table.querySelector('thead tr').children.length;
  const reader = new FileReader();
  reader.onload = (e)=>{
    let aoa;
    if(file.name.toLowerCase().endsWith('.csv')){
      const text = e.target.result;
      aoa = text.split(/\r?\n/).filter(l=>l.trim().length).map(line=>{
        return line.split(',').map(c=>c.replace(/^"|"$/g,'').replace(/""/g,'"'));
      });
      aoa.shift(); // remove header row assumption
    } else {
      const wb = XLSX.read(e.target.result, {type:'array'});
      const ws = wb.Sheets[wb.SheetNames[0]];
      aoa = XLSX.utils.sheet_to_json(ws, {header:1});
      aoa.shift();
    }
    aoa.forEach(row=>{
      if(!row || row.length===0) return;
      const tr = document.createElement('tr');
      tr.className='bg-gold-500/20';
      for(let i=0;i<colCount;i++){
        const td = document.createElement('td');
        td.className='p-2';
        td.textContent = row[i]!==undefined ? row[i] : '';
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });
    alert('ইমপোর্ট সম্পন্ন হয়েছে! নতুন সারিগুলো টেবিলের নিচে যোগ হয়েছে (হলুদ রঙে চিহ্নিত)।');
    evt.target.value='';
  };
  if(file.name.toLowerCase().endsWith('.csv')) reader.readAsText(file);
  else reader.readAsArrayBuffer(file);
}

/* Custom tab export/import */
function exportCustomCSV(){
  const list = loadCustom();
  const rows = [['Title','Category','Text','HasImage'], ...list.map(i=>[i.title,i.category,i.text, i.image?'Yes':'No'])];
  const csv = rows.map(r=>r.map(c=>`"${String(c||'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
  downloadBlob(new Blob(["\uFEFF"+csv], {type:'text/csv;charset=utf-8;'}), 'custom_info.csv');
}
function exportCustomXLSX(){
  const list = loadCustom();
  const rows = [['Title','Category','Text','HasImage'], ...list.map(i=>[i.title,i.category,i.text, i.image?'Yes':'No'])];
  const ws = XLSX.utils.aoa_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'CustomInfo');
  XLSX.writeFile(wb, 'custom_info.xlsx');
}
function importCustom(evt){
  const file = evt.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (e)=>{
    let aoa;
    if(file.name.toLowerCase().endsWith('.csv')){
      aoa = e.target.result.split(/\r?\n/).filter(l=>l.trim().length).map(line=>line.split(',').map(c=>c.replace(/^"|"$/g,'').replace(/""/g,'"')));
    } else {
      const wb = XLSX.read(e.target.result, {type:'array'});
      aoa = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {header:1});
    }
    aoa.shift();
    const list = loadCustom();
    aoa.forEach(row=>{
      if(!row || row.length===0) return;
      list.push({title:row[0]||'', category:row[1]||'সাধারণ', text:row[2]||'', image:''});
    });
    saveCustom(list);
    renderCustom();
    alert('কাস্টম তথ্য ইমপোর্ট সম্পন্ন!');
    evt.target.value='';
  };
  if(file.name.toLowerCase().endsWith('.csv')) reader.readAsText(file);
  else reader.readAsArrayBuffer(file);
}
