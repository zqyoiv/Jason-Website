#!/usr/bin/env node
/**
 * Build static HTML for each project from residential-project-data.js.
 * Reads project.html as template, fills #project-body with rendered content
 * (formatted with indentation / one element per line), writes to
 * html/project/residential/[project-id].html.
 * Run from project root: node scripts/build-residential-pages.js
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const DATA_PATH = path.join(ROOT, 'js', 'residential-project-data.js');
const TEMPLATE_PATH = path.join(ROOT, 'html', 'project.html');
const OUT_DIR = path.join(ROOT, 'html', 'project', 'residential');

const INDENT = '    '; // 4 spaces per level

function escapeHtml(s) {
  if (s == null) return '';
  const str = String(s);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sp(n) {
  return INDENT.repeat(n);
}

/**
 * Render one block to formatted HTML (multi-line, indented).
 * Base indent for block root is 3 (inside #project-body).
 */
function renderBlockToHtml(block, baseIndent) {
  const i = baseIndent || 3;
  const i1 = i + 1;
  const i2 = i + 2;
  const i3 = i + 3;

  switch (block.type) {
    case 'full-image': {
      const cap = block.caption
        ? '\n' + sp(i1) + '<p class="image-footnote">' + escapeHtml(block.caption) + '</p>'
        : '';
      return (
        sp(i) + '<div class="project-image-full">\n' +
        sp(i1) + '<img src="' + escapeHtml(block.src) + '" alt="' + escapeHtml(block.alt || '') + '">' + cap + '\n' +
        sp(i) + '</div>'
      );
    }

    case 'full-video': {
      const src = (block.src || '').trim();
      let vimeoId = null;
      let vimeoH = null;
      if (src.indexOf('vimeo.com/') !== -1) {
        const idMatch = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (idMatch) vimeoId = idMatch[1];
        const hMatch = src.match(/[?&]h=([^&]+)/);
        if (hMatch) vimeoH = hMatch[1];
      }
      let inner = '';
      if (vimeoId) {
        let iframeSrc = 'https://player.vimeo.com/video/' + vimeoId;
        if (vimeoH) iframeSrc += '?h=' + encodeURIComponent(vimeoH);
        inner =
          '\n' + sp(i1) + '<iframe class="vimeo-iframe" title="vimeo-player" width="640" height="360" src="' + escapeHtml(iframeSrc) + '" frameborder="0" referrerpolicy="strict-origin-when-cross-origin" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" allowfullscreen=""></iframe>';
      } else {
        inner = '\n' + sp(i1) + '<video src="' + escapeHtml(src) + '" controls="" playsinline=""></video>';
      }
      if (block.caption) {
        inner += '\n' + sp(i1) + '<p class="image-footnote">' + escapeHtml(block.caption) + '</p>';
      }
      return sp(i) + '<div class="project-video-full">' + inner + '\n' + sp(i) + '</div>';
    }

    case 'two-column-image': {
      const left = block.left || {};
      const right = block.right || {};
      let cap = '';
      if (block.caption) {
        cap = '\n' + sp(i1) + '<p class="image-footnote">' + escapeHtml(block.caption) + '</p>';
      }
      return (
        sp(i) + '<div class="project-two-col-image">\n' +
        sp(i1) + '<img src="' + escapeHtml(left.src || '') + '" alt="' + escapeHtml(left.alt || '') + '">\n' +
        sp(i1) + '<img src="' + escapeHtml(right.src || '') + '" alt="' + escapeHtml(right.alt || '') + '">' + cap + '\n' +
        sp(i) + '</div>'
      );
    }

    case 'two-column-txt': {
      const leftEmpty = !(block.left && String(block.left).trim());
      const rightEmpty = !(block.right && String(block.right).trim());
      if (leftEmpty || rightEmpty) {
        const single = leftEmpty ? (block.right || '') : (block.left || '');
        return (
          sp(i) + '<div class="project-full-text">\n' +
          sp(i1) + '<div class="project-description">' + single + '</div>\n' +
          sp(i) + '</div>'
        );
      }
      return (
        sp(i) + '<div class="project-content project-two-col-txt">\n' +
        sp(i1) + '<div class="project-description">' + block.left + '</div>\n' +
        sp(i1) + '<div class="project-description">' + block.right + '</div>\n' +
        sp(i) + '</div>'
      );
    }

    case 'two-column-txt-image': {
      const descItems = block.left || block.description || [];
      const parts = descItems.map(function (item) {
        const text = Array.isArray(item.content) ? item.content.join(' ') : (item.content || '');
        return '\n' + sp(i2) + '<' + (item.tag || 'p') + '>' + escapeHtml(text) + '</' + (item.tag || 'p') + '>';
      }).join('');
      const right = block.right || {};
      const imgSrc = escapeHtml(right.src || '');
      const imgAlt = escapeHtml(right.alt || '');
      let imgBlock = '\n' + sp(i1) + '<div class="project-two-col-txt-image-col">\n' + sp(i2) + '<img src="' + imgSrc + '" alt="' + imgAlt + '">';
      if (right.alt) {
        imgBlock += '\n' + sp(i2) + '<p class="image-footnote">' + escapeHtml(right.alt) + '</p>';
      }
      imgBlock += '\n' + sp(i1) + '</div>';
      return (
        sp(i) + '<div class="project-content project-two-col-txt-image">\n' +
        sp(i1) + '<div class="project-description">' + parts + '\n' + sp(i1) + '</div>' +
        imgBlock + '\n' +
        sp(i) + '</div>'
      );
    }

    case 'full-text': {
      const parts = (block.description || []).map(function (item) {
        const text = Array.isArray(item.content) ? item.content.join(' ') : (item.content || '');
        return '\n' + sp(i2) + '<' + item.tag + '>' + escapeHtml(text) + '</' + item.tag + '>';
      }).join('');
      return (
        sp(i) + '<div class="project-full-text">\n' +
        sp(i1) + '<div class="project-description">' + parts + '\n' + sp(i1) + '</div>\n' +
        sp(i) + '</div>'
      );
    }

    case 'five-column-image': {
      const src = block.src || '';
      const alt = escapeHtml(block.alt || '');
      const imgs = Array(5).fill('\n' + sp(i1) + '<img src="' + escapeHtml(src) + '" alt="' + alt + '">').join('');
      let footnote = '';
      if (block.alt) {
        footnote = '\n' + sp(i1) + '<p class="image-footnote">' + alt + '</p>';
      }
      return sp(i) + '<div class="project-five-col-image">' + imgs + footnote + '\n' + sp(i) + '</div>';
    }

    case 'project-content': {
      const descParts = (block.description || []).map(function (item) {
        const text = Array.isArray(item.content) ? item.content.join(' ') : (item.content || '');
        return '\n' + sp(i2) + '<' + item.tag + '>' + escapeHtml(text) + '</' + item.tag + '>';
      }).join('');
      let detailsHtml = '';
      if (block.details && block.details.length) {
        detailsHtml = '\n' + sp(i1) + '<div class="project-details">' +
          block.details.map(function (d) {
            return '\n' + sp(i2) + '<div class="detail-item">\n' +
              sp(i3) + '<span class="detail-label">' + escapeHtml(d.label) + '</span>\n' +
              sp(i3) + '<span class="detail-value">' + escapeHtml(d.value) + '</span>\n' +
              sp(i2) + '</div>';
          }).join('') + '\n' + sp(i1) + '</div>';
      }
      const fullWidth = (!block.details || block.details.length === 0) ? ' project-content-full-width' : '';
      return (
        sp(i) + '<div class="project-content' + fullWidth + '">\n' +
        sp(i1) + '<div class="project-description">' + descParts + '\n' + sp(i1) + '</div>' +
        detailsHtml + '\n' +
        sp(i) + '</div>'
      );
    }

    default:
      return '';
  }
}

function loadResidentialProjects() {
  const code = fs.readFileSync(DATA_PATH, 'utf8');
  const context = { RESIDENTIAL_PROJECTS: undefined };
  vm.createContext(context);
  vm.runInContext(code, context);
  return context.RESIDENTIAL_PROJECTS || {};
}

function buildProjectHtml(projectId, project, template) {
  const title = project.title + ' - Jason Krugman Studio';
  const bodyLines = [
    sp(3) + '<h1 class="project-title">' + escapeHtml(project.title) + '</h1>',
    ''
  ];
  (project.blocks || []).forEach(function (block) {
    const html = renderBlockToHtml(block, 3);
    if (html) {
      bodyLines.push(html);
      bodyLines.push('');
    }
  });
  // Trim trailing blank lines
  while (bodyLines.length && bodyLines[bodyLines.length - 1] === '') bodyLines.pop();
  const bodyHtml = bodyLines.join('\n');

  let out = template
    .replace(/<title>.*?<\/title>/, '<title>' + escapeHtml(title) + '</title>')
    .replace(/<div id="project-body"><!-- filled by.*?<\/div>/, '<div id="project-body">\n' + bodyHtml + '\n        </div>');
  // Remove script tags so page is static
  out = out.replace(/\s*<script src="\/js\/general-project-data\.js"><\/script>\s*\n?\s*<script src="\/js\/commision-project-data\.js"><\/script>\s*\n?\s*<script src="\/js\/residential-project-data\.js"><\/script>\s*\n?\s*<script src="\/js\/project\.js[^"]*"><\/script>\s*/g, '\n');
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

  const PROJECTS = loadResidentialProjects();
  const template = fs.readFileSync(TEMPLATE_PATH, 'utf8');

  if (!fs.existsSync(OUT_DIR)) {
    fs.mkdirSync(OUT_DIR, { recursive: true });
  }

  const ids = Object.keys(PROJECTS);
  console.log('Building ' + ids.length + ' project pages in html/project/residential/');
  ids.forEach(function (id) {
    const html = buildProjectHtml(id, PROJECTS[id], template);
    const outPath = path.join(OUT_DIR, id + '.html');
    fs.writeFileSync(outPath, html, 'utf8');
    console.log('  ' + id + '.html');
  });
  console.log('Done.');
}

main();
