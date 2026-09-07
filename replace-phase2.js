const fs = require('fs');
const path = require('path');

const iconMapping = {
  // Navigation & Layout
  'solar:hamburger-menu-linear': 'carbon:menu',
  'solar:close-circle-linear': 'carbon:close',
  'solar:close-circle-bold': 'carbon:close-filled',
  'solar:home-2-linear': 'carbon:home',
  'solar:magnifer-linear': 'carbon:search',
  'solar:minimalistic-magnifer-linear': 'carbon:search',
  'solar:moon-linear': 'carbon:moon',
  'solar:sun-2-linear': 'carbon:sun',
  'solar:alt-arrow-down-linear': 'carbon:chevron-down',
  'solar:alt-arrow-up-linear': 'carbon:chevron-up',
  'solar:alt-arrow-left-linear': 'carbon:chevron-left',
  'solar:alt-arrow-right-linear': 'carbon:chevron-right',
  'solar:arrow-right-linear': 'carbon:arrow-right',
  'solar:arrow-left-linear': 'carbon:arrow-left',
  'solar:document-text-linear': 'carbon:document',
  'solar:arrow-down-linear': 'carbon:arrow-down',

  // Forms, Modals & Alerts
  'solar:shield-check-bold': 'carbon:badge',
  'solar:shield-check-linear': 'carbon:security',
  'solar:chat-round-dots-bold': 'carbon:chat',
  'solar:chat-round-dots-linear': 'carbon:chat',
  'solar:chat-round-line-linear': 'carbon:chat',
  'solar:user-linear': 'carbon:user',
  'solar:user-bold': 'carbon:user-filled',
  'solar:phone-calling-linear': 'carbon:phone',
  'solar:letter-linear': 'carbon:email',
  'solar:buildings-2-linear': 'carbon:enterprise',
  'solar:buildings-3-linear': 'carbon:industry',
  'solar:box-linear': 'carbon:package',
  'solar:box-minimalistic-linear': 'carbon:cube',
  'solar:box-minimalistic-outline': 'carbon:cube',
  'solar:clock-circle-linear': 'carbon:time',
  'solar:check-circle-bold': 'carbon:checkmark-filled',
  'solar:check-circle-linear': 'carbon:checkmark-outline',
  'solar:copy-linear': 'carbon:copy',
  'solar:check-read-linear': 'carbon:checkmark',
  'solar:check-read-bold': 'carbon:checkmark-filled',
  'solar:danger-triangle-linear': 'carbon:warning-alt',
  'solar:danger-triangle-bold-duotone': 'carbon:warning-filled',
  'solar:info-circle-linear': 'carbon:information',
  'solar:info-circle-bold-duotone': 'carbon:information-filled',
  'solar:restart-linear': 'carbon:renew',
  'solar:spinner-linear': 'carbon:circle-dash',
  'solar:trash-bin-trash-bold-duotone': 'carbon:trash-can',
  'solar:trash-bin-trash-linear': 'carbon:trash-can',
  
  // Other shared UI icons
  'solar:minus-bold': 'carbon:subtract',
  'solar:cloud-upload-linear': 'carbon:upload',
  'solar:global-linear': 'carbon:globe',
  'solar:plain-2-linear': 'carbon:send-alt',
  'solar:inbox-line-linear': 'carbon:inbox',
  'solar:leaf-linear': 'carbon:leaf',
  'solar:wrench-linear': 'carbon:tool-box',
  'solar:headphones-round-linear': 'carbon:headset',
  'solar:verified-check-linear': 'carbon:certificate',
  'solar:settings-minimalistic-linear': 'carbon:settings',
  'solar:graph-up-linear': 'carbon:chart-line',
  'solar:map-point-linear': 'carbon:location',
  'solar:routing-2-linear': 'carbon:direction-straight',
  'solar:delivery-linear': 'carbon:delivery-truck',
  'solar:shield-warning-linear': 'carbon:shield-alert',
  'solar:test-tube-minimalistic-linear': 'carbon:chemistry',
  
  // Products
  'solar:filter-linear': 'carbon:filter',
  'solar:tuning-2-linear': 'carbon:settings-adjust',
  'solar:widget-2-linear': 'carbon:grid',
  'solar:list-linear': 'carbon:list',
  'solar:full-screen-square-linear': 'carbon:maximize',
  'solar:close-square-linear': 'carbon:minimize',
  'solar:arrow-right-up-linear': 'carbon:launch',
  'solar:waterdrops-linear': 'carbon:rain-drop',
  'solar:snowflake-linear': 'carbon:temperature-cold',
  'solar:flame-linear': 'carbon:fire',
  'solar:sort-from-top-to-bottom-linear': 'carbon:arrows-vertical',
  'solar:layers-minimalistic-linear': 'carbon:layers',
  'solar:armchair-linear': 'carbon:seat',
  'solar:tuning-square-linear': 'carbon:settings-adjust',
  'solar:ruler-angular-linear': 'carbon:document'
};

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith(".jsx") || file.endsWith(".js") || file.endsWith(".tsx") || file.endsWith(".ts")) {
      results.push(fullPath);
    }
  });
  return results;
}

const dirs = [
  "apps/web/src/features/products",
  "apps/web/src/features/contact"
];

let changedFiles = 0;
dirs.forEach(d => {
  const files = walk(d);
  files.forEach(file => {
    let content = fs.readFileSync(file, "utf8");
    let originalContent = content;
    
    content = content.replace(/solar:[a-z0-9-]+/g, match => {
      return iconMapping[match] || match; 
    });

    if (content !== originalContent) {
      fs.writeFileSync(file, content, "utf8");
      changedFiles++;
      console.log("Updated:", file);
    }
  });
});

console.log(`\nReplaced icons in ${changedFiles} files.`);
