const fs = require('fs');
const path = require('path');

const iconMapping = {
  'solar:add-circle-linear': 'carbon:add-alt',
  'solar:add-linear': 'carbon:add',
  'solar:alt-arrow-down-linear': 'carbon:chevron-down',
  'solar:alt-arrow-left-linear': 'carbon:chevron-left',
  'solar:alt-arrow-right-linear': 'carbon:chevron-right',
  'solar:alt-arrow-up-linear': 'carbon:chevron-up',
  'solar:arrow-left-linear': 'carbon:arrow-left',
  'solar:arrow-right-linear': 'carbon:arrow-right',
  'solar:atom-linear': 'carbon:chemistry',
  'solar:bell-bing-linear': 'carbon:notification-new',
  'solar:bell-bold': 'carbon:notification-filled',
  'solar:bell-linear': 'carbon:notification',
  'solar:bolt-linear': 'carbon:flash',
  'solar:book-2-linear': 'carbon:book',
  'solar:book-linear': 'carbon:catalog',
  'solar:box-bold-linear': 'carbon:box',
  'solar:box-minimalistic-linear': 'carbon:cube',
  'solar:box-open-linear': 'carbon:box',
  'solar:briefcase-linear': 'carbon:portfolio',
  'solar:buildings-2-linear': 'carbon:enterprise',
  'solar:buildings-3-linear': 'carbon:industry',
  'solar:calendar-date-bold': 'carbon:calendar',
  'solar:calendar-date-linear': 'carbon:calendar',
  'solar:chart-2-linear': 'carbon:chart-line',
  'solar:chat-round-dots-linear': 'carbon:chat',
  'solar:check-circle-bold': 'carbon:checkmark-filled',
  'solar:check-circle-linear': 'carbon:checkmark-outline',
  'solar:checklist-minimalistic-linear': 'carbon:list-checked',
  'solar:check-read-linear': 'carbon:checkmark',
  'solar:close-circle-bold': 'carbon:close-filled',
  'solar:close-circle-linear': 'carbon:close-outline',
  'solar:copy-linear': 'carbon:copy',
  'solar:danger-circle-bold': 'carbon:warning-filled',
  'solar:danger-circle-linear': 'carbon:warning-alt',
  'solar:danger-triangle-bold': 'carbon:warning-filled',
  'solar:danger-triangle-linear': 'carbon:warning-alt',
  'solar:diploma-verified-linear': 'carbon:certificate',
  'solar:diskette-linear': 'carbon:save',
  'solar:document-check-linear': 'carbon:document-tasks',
  'solar:document-text-linear': 'carbon:document',
  'solar:dumbbell-large-linear': 'carbon:fitness',
  'solar:eye-closed-linear': 'carbon:view-off',
  'solar:eye-linear': 'carbon:view',
  'solar:flag-linear': 'carbon:flag',
  'solar:folder-linear': 'carbon:folder',
  'solar:folder-with-files-linear': 'carbon:folder-details',
  'solar:gallery-linear': 'carbon:image',
  'solar:gallery-wide-linear': 'carbon:image',
  'solar:global-linear': 'carbon:globe',
  'solar:hamburger-menu-linear': 'carbon:menu',
  'solar:hand-shake-linear': 'carbon:partnership',
  'solar:handshake-linear': 'carbon:partnership',
  'solar:history-linear': 'carbon:recently-viewed',
  'solar:home-2-linear': 'carbon:home',
  'solar:hourglass-linear': 'carbon:hourglass',
  'solar:inbox-linear': 'carbon:inbox',
  'solar:inbox-line-linear': 'carbon:inbox',
  'solar:info-circle-bold': 'carbon:information-filled',
  'solar:info-circle-linear': 'carbon:information',
  'solar:info-square-bold': 'carbon:information-square-filled',
  'solar:layers-linear': 'carbon:layers',
  'solar:layers-minimalistic-linear': 'carbon:layers',
  'solar:leaf-bold': 'carbon:leaf',
  'solar:leaf-linear': 'carbon:leaf',
  'solar:letter-linear': 'carbon:email',
  'solar:link-linear': 'carbon:link',
  'solar:lock-password-linear': 'carbon:password',
  'solar:login-2-linear': 'carbon:login',
  'solar:logout-2-linear': 'carbon:logout',
  'solar:magnifer-linear': 'carbon:search',
  'solar:map-point-linear': 'carbon:location',
  'solar:medal-ribbons-star-linear': 'carbon:badge',
  'solar:megaphone-linear': 'carbon:bullhorn',
  'solar:minus-linear': 'carbon:subtract',
  'solar:moon-linear': 'carbon:moon',
  'solar:notes-linear': 'carbon:notebook',
  'solar:pallete-2-linear': 'carbon:color-palette',
  'solar:pen-linear': 'carbon:edit',
  'solar:phone-calling-linear': 'carbon:phone',
  'solar:printer-linear': 'carbon:printer',
  'solar:pulse-linear': 'carbon:activity',
  'solar:question-circle-linear': 'carbon:help',
  'solar:refresh-circle-bold-duotone': 'carbon:renew',
  'solar:refresh-circle-linear': 'carbon:renew',
  'solar:reply-linear': 'carbon:reply',
  'solar:restart-linear': 'carbon:renew',
  'solar:ruler-cross-linear': 'carbon:rule',
  'solar:scale-linear': 'carbon:scale',
  'solar:server-linear': 'carbon:server',
  'solar:settings-linear': 'carbon:settings',
  'solar:settings-minimalistic-linear': 'carbon:settings',
  'solar:share-circle-linear': 'carbon:share',
  'solar:shield-check-linear': 'carbon:security',
  'solar:sparkles-linear': 'carbon:magic-wand',
  'solar:spinner-linear': 'carbon:circle-dash',
  'solar:star-linear': 'carbon:star',
  'solar:stars-linear': 'carbon:star',
  'solar:sun-2-linear': 'carbon:sun',
  'solar:tag-linear': 'carbon:tag',
  'solar:text-field-linear': 'carbon:text-font',
  'solar:text-linear': 'carbon:document',
  'solar:text-square-linear': 'carbon:catalog',
  'solar:trash-bin-trash-linear': 'carbon:trash-can',
  'solar:upload-track-2-linear': 'carbon:upload',
  'solar:upload-track-linear': 'carbon:upload',
  'solar:user-bold': 'carbon:user-filled',
  'solar:user-id-linear': 'carbon:id-management',
  'solar:user-linear': 'carbon:user',
  'solar:users-group-two-rounded-linear': 'carbon:group',
  'solar:verified-check-linear': 'carbon:certificate'
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

const files = walk("apps/web/src");
let changedFiles = 0;

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

console.log(`\nReplaced icons in ${changedFiles} files.`);
