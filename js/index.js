/**
 * Gallery image order and paths.
 * Edit these arrays to control which images appear and in what order.
 * Change the path constants below if you move image folders.
 */

const IMG_TOP = '/images/top/';
const IMG_COMMISSIONED = '/images/commision/';
const IMG_RESIDENTIAL = '/images/residential/';

// General gallery (main works grid)
const generalImages = [
  {
    src: IMG_TOP + 'jupiterBevThumb.jpg',
    alt: 'Jupiter Bev Installation',
    link: '/html/project.html?project=jupiter-surface-beverly-hills'
  },
  {
    src: IMG_TOP + 'murmuration2Thumb.png',
    alt: 'Murmuration Installation',
    link: '/html/project.html?project=murmuration'
  },
  {
    src: IMG_TOP + 'jupiterSpace2Thumb.png',
    alt: 'Jupiter Space',
    link: '/html/project.html?project=jupiter-space'
  },
  {
    src: IMG_TOP + 'capellaThumb3.jpg',
    alt: 'Capella'
  },
  {
    src: IMG_TOP + 'capHelixThumb4.png',
    alt: 'Cap Helix Installation'
  },
  {
    src: IMG_TOP + 'meshThumb.jpg',
    alt: 'Mesh Installation'
  },
  {
    src: IMG_TOP + 'strawThumb.jpg',
    alt: 'Straw Installation'
  },
  {
    src: IMG_TOP + 'trelliThumb3.jpg',
    alt: 'Trelli Installation'
  },
  {
    src: IMG_TOP + 'basketThumb1.jpg',
    alt: 'Basket Installation'
  },
  {
    src: IMG_TOP + 'gyroidThumb.jpg',
    alt: 'Gyroid Installation'
  },
  {
    src: IMG_TOP + 'trussThumb.jpg',
    alt: 'Truss Installation'
  }
];

// Commissioned Designs
const commissionedImages = [
  {
    src: IMG_COMMISSIONED + 'faceThumb.png',
    alt: 'Face Installation'
  },
  {
    src: IMG_COMMISSIONED + 'botanicalThumb.png',
    alt: 'Botanical Installation'
  },
  {
    src: IMG_COMMISSIONED + 'pumaThumb.png',
    alt: 'Puma Installation'
  },
  {
    src: IMG_COMMISSIONED + 'pingpongThumb4.jpg',
    alt: 'Ping Pong Installation'
  },
  {
    src: IMG_COMMISSIONED + 'reefThumb2.jpg',
    alt: 'Reef Installation'
  },
  {
    src: IMG_COMMISSIONED + 'brainThumb.png',
    alt: 'Brain Installation'
  },
  {
    src: IMG_COMMISSIONED + 'helixThumb.jpg',
    alt: 'Helix Installation'
  },
  {
    src: IMG_COMMISSIONED + 'constellationThumb.png',
    alt: 'Constellation Installation'
  },
  {
    src: IMG_COMMISSIONED + 'rhythmThumb.jpg',
    alt: 'Rhythm Installation'
  },
  {
    src: IMG_COMMISSIONED + 'fieldThumb.jpg',
    alt: 'Field Installation'
  }
];

// Residential Special Projects
const residentialImages = [
  {
    src: IMG_RESIDENTIAL + 'jupiterThumb3.jpg',
    alt: 'Jupiter Installation'
  },
  {
    src: IMG_RESIDENTIAL + 'moleculeThumb.jpg',
    alt: 'Molecule Installation'
  },
  {
    src: IMG_RESIDENTIAL + 'diamondThumb.jpg',
    alt: 'Diamond Installation'
  },
  {
    src: IMG_RESIDENTIAL + 'fireThumb.jpg',
    alt: 'Fire Installation'
  },
  {
    src: IMG_RESIDENTIAL + 'hyparThumb.jpg',
    alt: 'Hypar Installation'
  },
  {
    src: IMG_RESIDENTIAL + 'moonrakerThumb.jpg',
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
