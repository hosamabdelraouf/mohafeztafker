import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const clientDir = path.resolve("build/client");
const prerendered = path.join(clientDir, "mohafeztafker", "index.html");
const targetIndex = path.join(clientDir, "index.html");
const target404 = path.join(clientDir, "404.html");
const nojekyll = path.join(clientDir, ".nojekyll");

if (!fs.existsSync(prerendered)) {
  console.error("Prerendered index.html not found at:", prerendered);
  process.exit(1);
}

// 1. Process HTML
function patchHtml(htmlContent) {
  return htmlContent
    .replace(
      /<script data-agent-native-chunk-recovery-bootstrap>[\s\S]*?<\/script>/gi,
      "<!-- chunk-recovery-disabled -->"
    )
    .replace(/href="\/assets\//g, 'href="/mohafeztafker/assets/')
    .replace(/src="\/assets\//g, 'src="/mohafeztafker/assets/')
    .replace(/src="\/videos\//g, 'src="/mohafeztafker/videos/')
    .replace(/href="\/favicon\.svg"/g, 'href="/mohafeztafker/favicon.svg"')
    .replace(/href="\/icon-180\.svg"/g, 'href="/mohafeztafker/icon-180.svg"')
    .replace(/from "\/assets\//g, 'from "/mohafeztafker/assets/')
    .replace(/import "\/assets\//g, 'import "/mohafeztafker/assets/')
    .replace(/import\("\/assets\//g, 'import("/mohafeztafker/assets/');
}

let rawHtml = fs.readFileSync(prerendered, "utf8");
let patchedHtml = patchHtml(rawHtml);

fs.writeFileSync(targetIndex, patchedHtml, "utf8");
fs.writeFileSync(target404, patchedHtml, "utf8");
fs.writeFileSync(path.join(clientDir, "mohafeztafker", "index.html"), patchedHtml, "utf8");
fs.writeFileSync(nojekyll, "");

// 2. Patch CSS and JS files in assets
const assetsDir = path.join(clientDir, "assets");
if (fs.existsSync(assetsDir)) {
  for (const file of fs.readdirSync(assetsDir)) {
    const fullPath = path.join(assetsDir, file);
    if (file.endsWith(".css")) {
      let css = fs.readFileSync(fullPath, "utf8");
      css = css
        .replace(/url\(\/assets\//g, "url(/mohafeztafker/assets/")
        .replace(/url\("\/assets\//g, 'url("/mohafeztafker/assets/')
        .replace(/url\('\/assets\//g, "url('/mohafeztafker/assets/");
      fs.writeFileSync(fullPath, css, "utf8");
    } else if (file.endsWith(".js")) {
      let js = fs.readFileSync(fullPath, "utf8");
      // Replace un-prefixed local assets and videos in compiled JS without touching builder.io
      js = js
        .replace(/(?<!\/mohafeztafker)(?<!builder\.io\/api\/v1\/image)\/assets\/team\//g, "/mohafeztafker/assets/team/")
        .replace(/(?<!\/mohafeztafker)(?<!builder\.io\/api\/v1\/image)\/assets\/partners\//g, "/mohafeztafker/assets/partners/")
        .replace(/(?<!\/mohafeztafker)\/videos\//g, "/mohafeztafker/videos/");
      if (file.startsWith("manifest-")) {
        js = js.replace(/(?<!\/mohafeztafker)\/assets\//g, "/mohafeztafker/assets/");
      }
      fs.writeFileSync(fullPath, js, "utf8");
    }
  }
}

// 3. Ensure assets and videos are accessible at both /mohafeztafker/assets and /assets
const subDir = path.join(clientDir, "mohafeztafker");
if (!fs.existsSync(subDir)) {
  fs.mkdirSync(subDir, { recursive: true });
}

// Copy assets and videos inside /mohafeztafker/ folder so both relative and prefixed requests resolve
try {
  execSync(`cp -R "${path.join(clientDir, "assets")}" "${path.join(subDir, "assets")}"`);
  execSync(`cp -R "${path.join(clientDir, "videos")}" "${path.join(subDir, "videos")}"`);
} catch (e) {
  console.warn("Folder sync notice:", e.message);
}

console.log("Successfully prepared resilient GitHub Pages static bundle!");
