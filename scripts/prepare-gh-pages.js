import fs from "node:fs";
import path from "node:path";

const clientDir = path.resolve("build/client");
const prerendered = path.join(clientDir, "mohafeztafker", "index.html");
const targetIndex = path.join(clientDir, "index.html");
const target404 = path.join(clientDir, "404.html");
const nojekyll = path.join(clientDir, ".nojekyll");

if (!fs.existsSync(prerendered)) {
  console.error("Prerendered index.html not found at:", prerendered);
  process.exit(1);
}

let html = fs.readFileSync(prerendered, "utf8");

// Replace root-relative asset paths with repository prefix
html = html
  .replace(/(href|src)="\/(assets|videos|icon-|favicon|manifest)/g, '$1="/mohafeztafker/$2')
  .replace(/url\(\/(assets|videos)/g, 'url(/mohafeztafker/$1');

fs.writeFileSync(targetIndex, html);
fs.writeFileSync(target404, html);
fs.writeFileSync(nojekyll, "");

// Also ensure files exist under /mohafeztafker/ subdirectory in clientDir
const subDir = path.join(clientDir, "mohafeztafker");
fs.writeFileSync(path.join(subDir, "index.html"), html);

console.log("Successfully prepared GitHub Pages static bundle in build/client!");
