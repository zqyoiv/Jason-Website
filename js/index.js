/**
 * Gallery image order and paths.
 * Edit these arrays to control which images appear and in what order.
 * Change the path constants below if you move image folders.
 */

const IMG_SELECTED = '/images/thumbnail/webp/selected/';
const IMG_COMMISSIONED = '/images/thumbnail/webp/commission/';
const IMG_RESIDENTIAL = '/images/thumbnail/webp/residential/';

// General gallery (main works grid) – selected works
const generalImages = [
  {
    src: IMG_SELECTED + 'jupiterBevThumb.webp',
    alt: 'Jupiter Bev Installation',
    link: '/jupiterSurfaceBeverlyHills/'
  },
  {
    src: IMG_SELECTED + 'murmuration2Thumb.webp',
    alt: 'Murmuration Installation',
    link: '/murmuration/'
  },
  {
    src: IMG_SELECTED + 'jupiterSpace2Thumb.webp',
    alt: 'Jupiter Space',
    link: '/jupiterSpace/'
  },
  {
    src: IMG_SELECTED + 'capellaThumb3.webp',
    alt: 'Capella',
    link: '/capellaBasket/'
  },
  {
    src: IMG_SELECTED + 'capHelixThumb4.webp',
    alt: 'Cap Helix Installation',
    link: '/capillaryHelix/'
  },
  {
    src: IMG_SELECTED + 'meshThumb.webp',
    alt: 'Mesh Installation',
    link: '/meshes/'
  },
  {
    src: IMG_SELECTED + 'strawThumb.webp',
    alt: 'Straw Installation',
    link: '/straws/'
  },
  {
    src: IMG_SELECTED + 'trelliThumb3.webp',
    alt: 'Trelli Installation',
    link: '/trelli/'
  },
  {
    src: IMG_SELECTED + 'basketThumb1.webp',
    alt: 'Basket Installation',
    link: '/basket/'
  },
  {
    src: IMG_SELECTED + 'gyroidThumb.webp',
    alt: 'Gyroid Installation',
    link: '/gyroid/'
  },
  {
    src: IMG_SELECTED + 'trussThumb.webp',
    alt: 'Truss Installation',
    link: '/trelliTruss/'
  }
];

// Commissioned Designs
const commissionedImages = [
  {
    src: IMG_COMMISSIONED + 'faceThumb.webp',
    alt: 'Face Installation',
    link: '/quantumFace/'
  },
  {
    src: IMG_COMMISSIONED + 'botanicalThumb.webp',
    alt: 'Botanical Installation',
    link: '/botanical/'
  },
  {
    src: IMG_COMMISSIONED + 'pumaThumb.webp',
    alt: 'Puma Installation',
    link: '/puma/'
  },
  {
    src: IMG_COMMISSIONED + 'pingpongThumb4.webp',
    alt: 'Jeju Island Light Sculpture Park',
    link: '/jeju/'
  },
  {
    src: IMG_COMMISSIONED + 'reefThumb2.webp',
    alt: 'Reef Installation',
    link: '/reef/'
  },
  {
    src: IMG_COMMISSIONED + 'brainThumb.webp',
    alt: 'Brain Installation',
    link: '/brain/'
  },
  {
    src: IMG_COMMISSIONED + 'helixThumb.webp',
    alt: 'Helix Installation',
    link: '/helix/'
  },
  {
    src: IMG_COMMISSIONED + 'constellationThumb.webp',
    alt: 'Constellation Installation',
    link: '/ibm/'
  },
  {
    src: IMG_COMMISSIONED + 'rhythmThumb.webp',
    alt: 'Rhythm Installation',
    link: '/rhythmAndForm/'
  },
  {
    src: IMG_COMMISSIONED + 'fieldThumb.webp',
    alt: 'Field Installation',
    link: '/modalField/'
  }
];

// Residential Special Projects
const residentialImages = [
  {
    src: IMG_RESIDENTIAL + 'jupiterThumb3.webp',
    alt: 'Jupiter Installation',
    link: '/jupiter/'
  },
  {
    src: IMG_RESIDENTIAL + 'moleculeThumb.webp',
    alt: 'Molecule Installation',
    link: '/corona/'
  },
  {
    src: IMG_RESIDENTIAL + 'diamondThumb.webp',
    alt: 'Diamond Installation',
    link: '/doubleDiamond/'
  },
  {
    src: IMG_RESIDENTIAL + 'fireThumb.webp',
    alt: 'Fire Installation',
    link: '/fireIsland/'
  },
  {
    src: IMG_RESIDENTIAL + 'hyparThumb.webp',
    alt: 'Hypar Installation',
    link: '/hypar/'
  },
  {
    src: IMG_RESIDENTIAL + 'moonrakerThumb.webp',
    alt: 'Moonraker Installation',
    link: '/moonraker/'
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
      const overlay = document.createElement('span');
      overlay.className = 'gallery-item-overlay';
      overlay.textContent = item.alt || '';
      a.appendChild(overlay);
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

/**
 * Index page: desktop Works sub-nav (toggle row + scroll on link click).
 * Mobile hamburger + overlay are handled by include-header.js on all pages.
 */
function initIndexNav() {
  var worksRow = document.getElementById('nav-works-row');
  var worksTrigger = document.querySelector('.nav-link[data-works-trigger]');
  var worksLinks = document.querySelectorAll('.nav-works-link');

  function scrollToSection(id) {
    var el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  if (worksTrigger && worksRow) {
    worksTrigger.addEventListener('click', function (e) {
      e.preventDefault();
      var isOpen = worksRow.classList.toggle('is-open');
      worksRow.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });
  }

  worksLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var section = link.getAttribute('data-section');
      if (section) {
        e.preventDefault();
        scrollToSection(section);
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', initIndexNav);
document.addEventListener('header-loaded', initIndexNav);
