/**
 * Gallery image order and paths.
 * Edit these arrays to control which images appear and in what order.
 */

// General gallery (main works grid)
const generalImages = [
  {
    src: '/images/top/jupiterBevThumb.jpg',
    alt: 'Jupiter Bev Installation'
  },
  {
    src: '/images/top/murmuration2Thumb.png',
    alt: 'Murmuration Installation',
    link: '/html/murmuration.html'
  },
  {
    src: '/images/top/jupiterSpace2Thumb.png',
    alt: 'Jupiter Space'
  },
  {
    src: '/images/top/capellaThumb3.jpg',
    alt: 'Capella'
  },
  {
    src: '/images/top/capHelixThumb4.png',
    alt: 'Cap Helix Installation'
  },
  {
    src: '/images/top/meshThumb.jpg',
    alt: 'Mesh Installation'
  },
  {
    src: '/images/top/strawThumb.jpg',
    alt: 'Straw Installation'
  },
  {
    src: '/images/top/trelliThumb3.jpg',
    alt: 'Trelli Installation'
  },
  {
    src: '/images/top/basketThumb1.jpg',
    alt: 'Basket Installation'
  },
  {
    src: '/images/top/gyroidThumb.jpg',
    alt: 'Gyroid Installation'
  },
  {
    src: '/images/top/trussThumb.jpg',
    alt: 'Truss Installation'
  }
];

// Commissioned Designs
const commissionedImages = [
  {
    src: '/images/commision/faceThumb.png',
    alt: 'Face Installation'
  },
  {
    src: '/images/commision/botanicalThumb.png',
    alt: 'Botanical Installation'
  },
  {
    src: '/images/commision/pumaThumb.png',
    alt: 'Puma Installation'
  },
  {
    src: '/images/commision/pingpongThumb4.jpg',
    alt: 'Ping Pong Installation'
  },
  {
    src: '/images/commision/reefThumb2.jpg',
    alt: 'Reef Installation'
  },
  {
    src: '/images/commision/brainThumb.png',
    alt: 'Brain Installation'
  },
  {
    src: '/images/commision/helixThumb.jpg',
    alt: 'Helix Installation'
  },
  {
    src: '/images/commision/constellationThumb.png',
    alt: 'Constellation Installation'
  },
  {
    src: '/images/commision/rhythmThumb.jpg',
    alt: 'Rhythm Installation'
  },
  {
    src: '/images/commision/fieldThumb.jpg',
    alt: 'Field Installation'
  }
];

// Residential Special Projects
const residentialImages = [
  {
    src: '/images/residential/jupiterThumb3.jpg',
    alt: 'Jupiter Installation'
  },
  {
    src: '/images/residential/moleculeThumb.jpg',
    alt: 'Molecule Installation'
  },
  {
    src: '/images/residential/diamondThumb.jpg',
    alt: 'Diamond Installation'
  },
  {
    src: '/images/residential/fireThumb.jpg',
    alt: 'Fire Installation'
  },
  {
    src: '/images/residential/hyparThumb.jpg',
    alt: 'Hypar Installation'
  },
  {
    src: '/images/residential/moonrakerThumb.jpg',
    alt: 'Moonraker Installation'
  }
];

/**
 * Renders a gallery grid from an array of image configs.
 * @param {HTMLElement} gridEl - The .gallery-grid container
 * @param {Array<{src: string, alt: string, link?: string}>} items - Array of image configs (order = display order)
 */
function renderGalleryGrid(gridEl, items) {
  if (!gridEl || !items || !items.length) return;
  gridEl.innerHTML = '';
  items.forEach(function (item) {
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.loading = 'lazy';
    if (item.link) {
      const a = document.createElement('a');
      a.href = item.link;
      a.className = 'gallery-item gallery-link';
      a.appendChild(img);
      gridEl.appendChild(a);
    } else {
      const div = document.createElement('div');
      div.className = 'gallery-item';
      div.appendChild(img);
      gridEl.appendChild(div);
    }
  });
}

function initGalleries() {
  var generalEl = document.getElementById('general');
  var commissionedEl = document.getElementById('commissioned');
  var residentialEl = document.getElementById('residential');
  if (generalEl) renderGalleryGrid(generalEl, generalImages);
  if (commissionedEl) renderGalleryGrid(commissionedEl, commissionedImages);
  if (residentialEl) renderGalleryGrid(residentialEl, residentialImages);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initGalleries);
} else {
  initGalleries();
}
