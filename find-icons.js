const fs = require('fs');

async function findIcons() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/iconify/icon-sets/master/json/carbon.json');
    const data = await res.json();
    const available = Object.keys(data.icons);
    if (data.aliases) {
        available.push(...Object.keys(data.aliases));
    }
    
    const queries = ['fit', 'inbox', 'leaf', 'server', 'seat', 'target', 'snow', 'cold', 'temp', 'plant', 'tree', 'chair'];
    
    queries.forEach(q => {
        console.log(`Matches for ${q}:`, available.filter(i => i.includes(q)).slice(0, 10));
    });
    
  } catch (err) {
    console.error("Failed to fetch/parse", err);
  }
}
findIcons();
