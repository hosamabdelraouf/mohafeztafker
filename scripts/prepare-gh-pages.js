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

// 1. Process index.html from prerendered
let html = fs.readFileSync(prerendered, "utf8");

// Neutralize chunk-recovery bootstrap script that causes the recovery redirect loop
html = html.replace(
  /<script data-agent-native-chunk-recovery-bootstrap>[\s\S]*?<\/script>/gi,
  "<!-- chunk-recovery-disabled-for-static-pages -->"
);

fs.writeFileSync(targetIndex, html);
fs.writeFileSync(target404, html);
fs.writeFileSync(path.join(clientDir, "mohafeztafker", "index.html"), html);
fs.writeFileSync(nojekyll, "");

// 2. Walk all files in build/client (.html, .js, .css, .json) and rewrite root-relative paths
const BASE = "/mohafeztafker";

function processFile(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let modified = false;

  // Replace /assets/ with /mohafeztafker/assets/ (avoiding double prefix)
  const newContent = content
    .replace(/(?<!\/mohafeztafker)\/assets\//g, `${BASE}/assets/`)
    .replace(/(?<!\/mohafeztafker)\/videos\//g, `${BASE}/videos/`)
    .replace(/(?<!\/mohafeztafker)\/favicon\.svg/g, `${BASE}/favicon.svg`)
    .replace(/(?<!\/mohafeztafker)\/icon-180\.svg/g, `${BASE}/icon-180.svg`)
    .replace(/(?<!\/mohafeztafker)\/icon-192\.svg/g, `${BASE}/icon-192.svg`)
    .replace(/(?<!\/mohafeztafker)\/icon-512\.svg/g, `${BASE}/icon-512.svg`)
    .replace(/(?<!\/mohafeztafker)\/manifest\.json/g, `${BASE}/manifest.json`);

  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, "utf8");
    modified = true;
  }
  return modified;
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (/\.(html|js|css|json)$/i.test(entry.name)) {
      processFile(fullPath);
    }
  }
}

walkDir(clientDir);
console.log("Successfully patched all static assets with /mohafeztafker base path in build/client!");
