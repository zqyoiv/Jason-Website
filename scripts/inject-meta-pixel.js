#!/usr/bin/env node
/**
 * Move Meta Pixel into <head> on all site pages; remove broken tracking scripts.
 * Run from project root: node scripts/inject-meta-pixel.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const HTML_DIR = path.join(ROOT, 'html');
const MARKER = '/js/meta-pixel.js';

const TRACKING_RE = /\s*<script src="\/js\/tracking-config\.js">\s*<\/script>\s*\n\s*<script src="\/js\/tracking\.js">\s*<\/script>/g;

const SNIPPET = [
  '    <script src="/js/meta-pixel.js">',
  '    </script>',
  '    <noscript>',
  '      <img height="1"',
  '        width="1"',
  '        style="display:none"',
  '        src="https://www.facebook.com/tr?id=1312059884363616&ev=PageView&noscript=1" />',
  '    </noscript>'
].join('\n');

function walk(dir, files) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      if (name === 'partials') continue;
      walk(full, files);
    } else if (name.endsWith('.html')) {
      files.push(full);
    }
  }
}

function update(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (TRACKING_RE.test(html)) {
    html = html.replace(TRACKING_RE, '\n');
    changed = true;
  }

  if (!html.includes(MARKER)) {
    const viewportRe = /(<meta[^>]*name="viewport"[^>]*\/>)/i;
    if (!viewportRe.test(html)) {
      console.warn('  skip (no viewport): ' + path.relative(ROOT, filePath));
      return false;
    }
    html = html.replace(viewportRe, '$1\n' + SNIPPET);
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    return true;
  }
  return false;
}

function main() {
  const files = [];
  walk(HTML_DIR, files);
  let count = 0;
  files.forEach(function (file) {
    if (update(file)) {
      console.log('  ' + path.relative(ROOT, file));
      count++;
    }
  });
  console.log('Updated ' + count + ' file(s).');
}

main();
