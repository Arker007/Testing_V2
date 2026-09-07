const fs = require('fs');

async function checkIcons() {
  const iconsToCheck = [
    'inventory-management', 'tool-box', 'headset', 'bullseye', 'settings-adjust', 
    'maximize', 'minimize', 'rain-drop', 'fire', 'arrows-vertical', 'launch', 'grid', 'chip'
  ];

  try {
    const res = await fetch('https://raw.githubusercontent.com/iconify/icon-sets/master/json/carbon.json');
    const data = await res.json();
    const available = Object.keys(data.icons);
    if (data.aliases) available.push(...Object.keys(data.aliases));
    
    const missing = iconsToCheck.filter(i => !available.includes(i));
    console.log("Still missing:", missing);
    
    const queries = ['invent', 'tool', 'head', 'bulls', 'adjust', 'max', 'min', 'rain', 'fire', 'arrow', 'launch', 'grid', 'chip'];
    queries.forEach(q => {
        console.log(`Matches for ${q}:`, available.filter(i => i.includes(q)).slice(0, 10));
    });
  } catch (err) {
    console.error("Failed to fetch/parse", err);
  }
}
checkIcons();
