/**
 * Storage Infrastructure Facade
 */
const fileManager = require("./fileManager");
const imageOptimizer = require("./imageOptimizer");

module.exports = {
  fileManager,
  imageOptimizer,
  getUploadsDir: (sub) => fileManager.getUploadsDir(sub),
  ensureDir: (dir) => fileManager.ensureDir(dir),
  renameFile: (oldP, newP) => fileManager.renameFile(oldP, newP),
  deleteFile: (p) => fileManager.deleteFile(p),
  optimizeImage: (f, c, n) => imageOptimizer.optimizeImage(f, c, n),
};
