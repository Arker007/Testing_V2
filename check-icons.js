const fs = require('fs');

async function checkIcons() {
  const iconsToCheck = [
    'add-alt', 'add', 'chevron-down', 'chevron-left', 'chevron-right', 'chevron-up',
    'arrow-left', 'arrow-right', 'chemistry', 'notification-new', 'notification-filled',
    'notification', 'flash', 'book', 'catalog', 'box', 'cube', 'portfolio', 'enterprise',
    'industry', 'calendar', 'chart-line', 'chat', 'checkmark-filled', 'checkmark-outline',
    'list-checked', 'checkmark', 'close-filled', 'close-outline', 'copy', 'warning-filled',
    'warning-alt', 'certificate', 'save', 'document-tasks', 'document', 'fitness',
    'view-off', 'view', 'flag', 'folder', 'folder-details', 'image', 'globe', 'menu',
    'partnership', 'recently-viewed', 'home', 'hourglass', 'inbox', 'information-filled',
    'information', 'information-square-filled', 'layers', 'leaf', 'email', 'link',
    'password', 'login', 'logout', 'search', 'location', 'badge', 'bullhorn', 'subtract',
    'moon', 'notebook', 'color-palette', 'edit', 'phone', 'printer', 'activity', 'help',
    'renew', 'reply', 'rule', 'scale', 'server', 'settings', 'share', 'security',
    'magic-wand', 'circle-dash', 'star', 'sun', 'tag', 'text-font', 'trash-can', 'upload',
    'user-filled', 'id-management', 'user', 'group', 'seat', 'inventory-management',
    'tool-box', 'headset', 'bullseye', 'settings-adjust', 'maximize', 'minimize',
    'rain-drop', 'temperature-cold', 'fire', 'arrows-vertical', 'launch', 'grid', 'chip'
  ];

  try {
    const res = await fetch('https://raw.githubusercontent.com/iconify/icon-sets/master/json/carbon.json');
    const data = await res.json();
    const available = Object.keys(data.icons);
    if (data.aliases) {
        available.push(...Object.keys(data.aliases));
    }
    
    const missing = iconsToCheck.filter(i => !available.includes(i));
    console.log("Missing icons in carbon dataset:", missing);
  } catch (err) {
    console.error("Failed to fetch/parse", err);
  }
}
checkIcons();
