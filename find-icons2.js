const fs = require('fs');
async function findIcons() {
  const res = await fetch('https://raw.githubusercontent.com/iconify/icon-sets/master/json/carbon.json');
  const data = await res.json();
  const available = Object.keys(data.icons);
  if (data.aliases) available.push(...Object.keys(data.aliases));
  
  const queries = ['recycle', 'data', 'furn', 'sofa', 'arch', 'email'];
  queries.forEach(q => {
      console.log(`Matches for ${q}:`, available.filter(i => i.includes(q)).slice(0, 10));
  });
}
findIcons();
