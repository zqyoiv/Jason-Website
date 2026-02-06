/**
 * Project page data and renderer.
 * Projects are loaded from general-project-data.js, commision-project-data.js,
 * and residential-project-data.js (all must load before this file).
 * Lookup by project id searches the merged set from all three.
 * Block types: full-image, full-video, two-column-image, five-column-image,
 * two-column-txt, full-text, project-content (see general-project-data.js for structure).
 */
(function () {
  var g = typeof window !== 'undefined' ? window : {
  'quantum-face': {
    title: 'QUANTUM FACE',
    blocks: [
      { type: 'full-image', src: '/images/page/quantum-face/qf1.png', alt: '' },
      { type: 'project-content', description: [
        { tag: 'p', content: 'In 2023, Krugman Studio created Quantum Face in collaboration Yevgeny Koramblyum. The artwork uses Krugman\'s Jupiter LED system to create an electrified mesh of circuit boards describing the surface of the mesh.' },
      ], details: [
        { label: 'Dimensions:', value: '96\'\' x 60\'\' x 26\'\' ( H x W x D)' },
      ] },
      { type: 'full-image', src: '/images/page/quantum-face/qf2.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/quantum-face/qf3.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/quantum-face/qf4.png', alt: '' }
    ]
  }
};
  var PROJECTS = Object.assign(
    {},
    g.PROJECTS || {},
    g.COMMISION_PROJECTS || {},
    g.RESIDENTIAL_PROJECTS || {}
  );
  window.PROJECTS = PROJECTS;
})();
var PROJECTS = typeof window !== 'undefined' ? window.PROJECTS : undefined;

function getProjectId() {
  var params = new URLSearchParams(window.location.search);
  return params.get('project') || '';
}

function renderBlock(block) {
  var wrap = document.createElement('div');
  switch (block.type) {
    case 'full-image':
      wrap.className = 'project-image-full';
      var img = document.createElement('img');
      img.src = block.src;
      img.alt = block.alt;
      wrap.appendChild(img);
      if (block.caption) {
        var cap = document.createElement('p');
        cap.className = 'image-footnote';
        cap.textContent = block.caption;
        wrap.appendChild(cap);
      }
      break;

    case 'full-video':
      wrap.className = 'project-video-full';
      var video = document.createElement('video');
      video.src = block.src;
      video.controls = true;
      video.playsInline = true;
      wrap.appendChild(video);
      if (block.caption) {
        var vcap = document.createElement('p');
        vcap.className = 'image-footnote';
        vcap.textContent = block.caption;
        wrap.appendChild(vcap);
      }
      break;

    case 'two-column-image':
      wrap.className = 'project-two-col-image';
      var leftImg = document.createElement('img');
      leftImg.src = block.left.src;
      leftImg.alt = block.left.alt;
      var rightImg = document.createElement('img');
      rightImg.src = block.right.src;
      rightImg.alt = block.right.alt;
      wrap.appendChild(leftImg);
      wrap.appendChild(rightImg);
      if (block.caption) {
        var icap = document.createElement('p');
        icap.className = 'image-footnote';
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
  if (typeof PROJECTS === 'undefined') {
    var container = document.getElementById('project-body');
    if (container) container.innerHTML = '<p>Project data failed to load. Ensure the page is served from a server (e.g. http://localhost:8080) and that general-project-data.js loads before project.js.</p>';
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
