/* eslint-disable no-console */
const { execSync } = require("child_process");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const frontendDir = path.join(rootDir, "apps/web");

function run(command, cwd) {
  try {
    execSync(command, {
      cwd,
      stdio: "inherit",
      env: process.env,
    });
  } catch (err) {
    process.exit(err.status || 1);
  }
}

console.log("[build] Building frontend...");
run("npm run build", frontendDir);

console.log("[build] Build completed successfully.");
