/**
 * Project page data and renderer.
 * Projects are loaded from general-project-data.js, commision-project-data.js,
 * and residential-project-data.js (all must load before this file).
 * Lookup by project id searches the merged set from all three.
 * Block types: full-image, full-video, two-column-image, five-column-image,
 * two-column-txt, two-column-txt-image (left text, right image), full-text, project-content.
 */

(function () {
  var general = (typeof window !== 'undefined' && window.PROJECTS) ? window.PROJECTS : {};
  var commission = (typeof window !== 'undefined' && window.COMMISION_PROJECTS) ? window.COMMISION_PROJECTS : {};
  var residential = (typeof window !== 'undefined' && window.RESIDENTIAL_PROJECTS) ? window.RESIDENTIAL_PROJECTS : {};
  var merged = {};
  [general, commission, residential].forEach(function (source) {
    for (var id in source) { if (Object.prototype.hasOwnProperty.call(source, id)) merged[id] = source[id]; }
  });
  window.PROJECTS = merged;
})();
var PROJECTS = typeof window !== 'undefined' ? window.PROJECTS : {};

function getProjectId() {
  var params = new URLSearchParams(window.location.search);
  return params.get('project') || '';
}

function getProjectPageVideoSize() {
  var projectPage = document.querySelector('main.project-page');
  var widthPx = 1200;
  if (projectPage) {
    var style = window.getComputedStyle(projectPage);
    var paddingLeft = parseFloat(style.paddingLeft) || 0;
    var paddingRight = parseFloat(style.paddingRight) || 0;
    widthPx = projectPage.offsetWidth - paddingLeft - paddingRight;
  }
  var heightPx = Math.round(widthPx * 9 / 16);
  return { width: widthPx, height: heightPx };
}

function updateVimeoIframeSizes() {
  var size = getProjectPageVideoSize();
  var iframes = document.querySelectorAll('.vimeo-iframe');
  for (var i = 0; i < iframes.length; i++) {
    iframes[i].setAttribute('width', String(size.width));
    iframes[i].setAttribute('height', String(size.height));
  }
}

function renderBlock(block) {
  var wrap = document.createElement('div');
  switch (block.type) {
    case 'full-image':
      wrap.className = 'project-image-full';
      var img = document.createElement('img');
      img.src = block.src;
      img.alt = block.alt || '';
      wrap.appendChild(img);
      if (block.alt) {
        var altCap = document.createElement('p');
        altCap.className = 'image-footnote';
        altCap.textContent = block.alt;
        wrap.appendChild(altCap);
      }
      if (block.caption) {
        var cap = document.createElement('p');
        cap.className = 'image-footnote';
        cap.textContent = block.caption;
        wrap.appendChild(cap);
      }
      break;

    case 'full-video': {
      var src = (block.src || '').trim();
      var vimeoId = null;
      var vimeoH = null;
      if (src.indexOf('vimeo.com/') !== -1) {
        var idMatch = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
        if (idMatch) vimeoId = idMatch[1];
        var hMatch = src.match(/[?&]h=([^&]+)/);
        if (hMatch) vimeoH = hMatch[1];
      }
      if (vimeoId) {
        var iframeSrc = 'https://player.vimeo.com/video/' + vimeoId;
        if (vimeoH) iframeSrc += '?h=' + encodeURIComponent(vimeoH);
        var size = getProjectPageVideoSize();
        var iframe = document.createElement('iframe');
        iframe.className = 'vimeo-iframe';
        iframe.setAttribute('title', 'vimeo-player');
        iframe.setAttribute('width', String(size.width));
        iframe.setAttribute('height', String(size.height));
        iframe.src = iframeSrc;
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
        iframe.setAttribute('allow', 'autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share');
        iframe.setAttribute('allowfullscreen', '');
        wrap.appendChild(iframe);
      } else {
        var video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.setAttribute('playsinline', '');
        wrap.appendChild(video);
      }
      if (block.caption) {
        var vcap = document.createElement('p');
        vcap.className = 'image-footnote';
        vcap.textContent = block.caption;
        wrap.appendChild(vcap);
      }
      break;
    }

    case 'two-column-image':
      wrap.className = 'project-two-col-image';
      var leftCol = document.createElement('div');
      leftCol.className = 'project-two-col-image-col';
      var leftImg = document.createElement('img');
      leftImg.src = block.left.src;
      leftImg.alt = block.left.alt || '';
      leftCol.appendChild(leftImg);
      if (block.left.alt) {
        var leftAltP = document.createElement('p');
        leftAltP.className = 'image-footnote';
        leftAltP.textContent = block.left.alt;
        leftCol.appendChild(leftAltP);
      }
      var rightCol = document.createElement('div');
      rightCol.className = 'project-two-col-image-col';
      var rightImg = document.createElement('img');
      rightImg.src = block.right.src;
      rightImg.alt = block.right.alt || '';
      rightCol.appendChild(rightImg);
      if (block.right.alt) {
        var rightAltP = document.createElement('p');
        rightAltP.className = 'image-footnote';
        rightAltP.textContent = block.right.alt;
        rightCol.appendChild(rightAltP);
      }
      wrap.appendChild(leftCol);
      wrap.appendChild(rightCol);
      if (block.caption) {
        var icap = document.createElement('p');
        icap.className = 'image-footnote project-two-col-image-caption';
        icap.textContent = block.caption;
        wrap.appendChild(icap);
      }
      break;

    case 'two-column-txt': {
      var leftEmpty = !(block.left && block.left.trim());
      var rightEmpty = !(block.right && block.right.trim());
      if (leftEmpty || rightEmpty) {
        wrap.className = 'project-full-text';
        var singleCol = document.createElement('div');
        singleCol.className = 'project-description';
        singleCol.innerHTML = leftEmpty ? (block.right || '') : (block.left || '');
        wrap.appendChild(singleCol);
      } else {
        wrap.className = 'project-content project-two-col-txt';
        var leftDiv = document.createElement('div');
        leftDiv.className = 'project-description';
        leftDiv.innerHTML = block.left;
        var rightDiv = document.createElement('div');
        rightDiv.className = 'project-description';
        rightDiv.innerHTML = block.right;
        wrap.appendChild(leftDiv);
        wrap.appendChild(rightDiv);
      }
      break;
    }

    case 'two-column-txt-image':
      wrap.className = 'project-content project-two-col-txt-image';
      var textCol = document.createElement('div');
      textCol.className = 'project-description';
      (block.left || block.description || []).forEach(function (item) {
        var el = document.createElement(item.tag || 'p');
        el.textContent = Array.isArray(item.content) ? item.content.join(' ') : (item.content || '');
        textCol.appendChild(el);
      });
      wrap.appendChild(textCol);
      var imgCol = document.createElement('div');
      imgCol.className = 'project-two-col-txt-image-col';
      if (block.right && block.right.src) {
        var rImg = document.createElement('img');
        rImg.src = block.right.src;
        rImg.alt = block.right.alt || '';
        imgCol.appendChild(rImg);
        if (block.right.alt) {
          var rAltP = document.createElement('p');
          rAltP.className = 'image-footnote';
          rAltP.textContent = block.right.alt;
          imgCol.appendChild(rAltP);
        }
      }
      wrap.appendChild(imgCol);
      break;

    case 'full-text':
      wrap.className = 'project-full-text';
      var fullTextDesc = document.createElement('div');
      fullTextDesc.className = 'project-description';
      (block.description || []).forEach(function (item) {
        var el = document.createElement(item.tag);
        el.textContent = Array.isArray(item.content) ? item.content.join(' ') : item.content;
        fullTextDesc.appendChild(el);
      });
      wrap.appendChild(fullTextDesc);
      break;

    case 'five-column-image':
      wrap.className = 'project-five-col-image';
      var src = block.src;
      var alt = block.alt || '';
      for (var i = 0; i < 5; i++) {
        var colImg = document.createElement('img');
        colImg.src = src;
        colImg.alt = alt;
        wrap.appendChild(colImg);
      }
      if (alt) {
        var fiveAltP = document.createElement('p');
        fiveAltP.className = 'image-footnote project-five-col-image-caption';
        fiveAltP.textContent = alt;
        wrap.appendChild(fiveAltP);
      }
      break;

    case 'project-content':
      wrap.className = 'project-content';
      var desc = document.createElement('div');
      desc.className = 'project-description';
      (block.description || []).forEach(function (item) {
        var el = document.createElement(item.tag);
        el.textContent = Array.isArray(item.content) ? item.content.join(' ') : item.content;
        desc.appendChild(el);
      });
      wrap.appendChild(desc);
      if (block.details && block.details.length) {
        var details = document.createElement('div');
        details.className = 'project-details';
        block.details.forEach(function (d) {
          var item = document.createElement('div');
          item.className = 'detail-item';
          var label = document.createElement('span');
          label.className = 'detail-label';
          label.textContent = d.label;
          var value = document.createElement('span');
          value.className = 'detail-value';
          value.textContent = d.value;
          item.appendChild(label);
          item.appendChild(value);
          details.appendChild(item);
        });
        wrap.appendChild(details);
      }
      break;

    default:
      return null;
  }
  return wrap;
}

function renderProject() {
  var projectId = getProjectId();
  if (!PROJECTS || typeof PROJECTS !== 'object') {
    var container = document.getElementById('project-body');
    if (container) container.innerHTML = '<p>Project data failed to load. Ensure the page is served from a server (e.g. http://localhost:8080) and that the project data scripts load before project.js.</p>';
    return;
  }
  var project = PROJECTS[projectId];
  var container = document.getElementById('project-body');
  if (!container) return;
  if (!project) {
    container.innerHTML = '<p>Project not found.</p>';
    document.title = 'Project - Jason Krugman Studio';
    return;
  }
  document.title = project.title + ' - Jason Krugman Studio';
  var titleEl = document.createElement('h1');
  titleEl.className = 'project-title';
  titleEl.textContent = project.title;
  container.appendChild(titleEl);
  (project.blocks || []).forEach(function (block) {
    var el = renderBlock(block);
    if (el) container.appendChild(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderProject);
} else {
  renderProject();
}

(function () {
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateVimeoIframeSizes, 150);
  });
})();
