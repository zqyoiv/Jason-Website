#!/usr/bin/env node
/**
 * Build static HTML for each project from general-project-data.js.
 * Reads project.html as template, fills #project-body with rendered content,
 * writes html/project/general/[project-id].html (no scripts, static content).
 * Run from project root: node scripts/build-project-pages.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js', 'general-project-data.js');
const TEMPLATE_PATH = path.join(ROOT, 'html', 'project.html');
const OUT_DIR = path.join(ROOT, 'html', 'project', 'general');

function escapeHtml(s) {
  if (s == null) return '';
  const str = String(s);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderBlockToHtml(block) {
  switch (block.type) {
    case 'full-image': {
      const cap = block.caption ? `<p class="image-footnote">${escapeHtml(block.caption)}</p>` : '';
      return `<div class="project-image-full"><img src="${escapeHtml(block.src)}" alt="${escapeHtml(block.alt || '')}">${cap}</div>`;
    }
    case 'full-video': {
      const cap = block.caption ? `<p class="image-footnote">${escapeHtml(block.caption)}</p>` : '';
      const src = escapeHtml(block.src || '');
      return `<div class="project-video-full"><video preload="" tabindex="-1" crossorigin="anonymous" playsinline="" style="" src="${src}"></video>${cap}</div>`;
    }
    case 'two-column-image': {
      const left = block.left || {};
      const right = block.right || {};
      const cap = block.caption ? `<p class="image-footnote">${escapeHtml(block.caption)}</p>` : '';
      return `<div class="project-two-col-image"><img src="${escapeHtml(left.src || '')}" alt="${escapeHtml(left.alt || '')}"><img src="${escapeHtml(right.src || '')}" alt="${escapeHtml(right.alt || '')}">${cap}</div>`;
    }
    case 'two-column-txt': {
      const leftEmpty = !(block.left && String(block.left).trim());
      const rightEmpty = !(block.right && String(block.right).trim());
      if (leftEmpty || rightEmpty) {
        const single = leftEmpty ? (block.right || '') : (block.left || '');
        return `<div class="project-full-text"><div class="project-description">${single}</div></div>`;
      }
      return `<div class="project-content project-two-col-txt"><div class="project-description">${block.left}</div><div class="project-description">${block.right}</div></div>`;
    }
    case 'full-text': {
      const parts = (block.description || []).map(function (item) {
        const text = Array.isArray(item.content) ? item.content.join(' ') : (item.content || '');
        return `<${item.tag}>${escapeHtml(text)}</${item.tag}>`;
      });
      return `<div class="project-full-text"><div class="project-description">${parts.join('')}</div></div>`;
    }
    case 'five-column-image': {
      const src = block.src || '';
      const alt = escapeHtml(block.alt || '');
      const imgs = Array(5).fill(`<img src="${escapeHtml(src)}" alt="${alt}">`).join('');
      return `<div class="project-five-col-image">${imgs}</div>`;
    }
    case 'project-content': {
      const descParts = (block.description || []).map(function (item) {
        const text = Array.isArray(item.content) ? item.content.join(' ') : (item.content || '');
        return `<${item.tag}>${escapeHtml(text)}</${item.tag}>`;
      });
      let detailsHtml = '';
      if (block.details && block.details.length) {
        detailsHtml = '<div class="project-details">' + block.details.map(function (d) {
          return '<div class="detail-item"><span class="detail-label">' + escapeHtml(d.label) + '</span><span class="detail-value">' + escapeHtml(d.value) + '</span></div>';
        }).join('') + '</div>';
      }
      const fullWidth = (!block.details || block.details.length === 0) ? ' project-content-full-width' : '';
      return `<div class="project-content${fullWidth}"><div class="project-description">${descParts.join('')}</div>${detailsHtml}</div>`;
    }
    default:
      return '';
  }
}

function loadProjects() {
  const code = fs.readFileSync(DATA_PATH, 'utf8');
  const context = { window: {}, PROJECTS: undefined };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context.PROJECTS || context.window.PROJECTS;
}

function buildProjectHtml(projectId, project, template) {
  const title = project.title + ' - Jason Krugman Studio';
  const bodyParts = ['<h1 class="project-title">' + escapeHtml(project.title) + '</h1>'];
  (project.blocks || []).forEach(function (block) {
    const html = renderBlockToHtml(block);
    if (html) bodyParts.push(html);
  });
  const bodyHtml = bodyParts.join('\n        ');

  let out = template
    .replace(/<title>.*?<\/title>/, '<title>' + escapeHtml(title) + '</title>')
    .replace(/<div id="project-body"><!-- filled by.*?<\/div>/, '<div id="project-body">\n        ' + bodyHtml + '\n    </div>');
  // Remove script tags so page is static
  out = out.replace(/\s*<script src="\/js\/general-project-data\.js"><\/script>\s*\n?\s*<script src="\/js\/project\.js"><\/script>\s*/, '\n');
  return out;
}

function main() {
  if (!fs.existsSync(DATA_PATH)) {
    console.error('Not found: ' + DATA_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(TEMPLATE_PATH)) {
    console.error('Not found: ' + TEMPLATE_PATH);
    process.exit(1);
  }

  const PROJECTS = loadProjects();
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const ids = Object.keys(PROJECTS);
  console.log('Building ' + ids.length + ' project pages in html/project/general/');
  ids.forEach(function (id) {
    const html = buildProjectHtml(id, PROJECTS[id], template);
    const outPath = path.join(OUT_DIR, id + '.html');
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('  ' + id + '.html');
  });
  console.log('Done.');
}

main();
