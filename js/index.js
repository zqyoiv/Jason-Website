/**
 * Gallery image order and paths.
 * Edit these arrays to control which images appear and in what order.
 * Change the path constants below if you move image folders.
 */

const IMG_SELECTED = '/images/thumbnail/webp/selected/';
const IMG_COMMISSIONED = '/images/thumbnail/webp/commission/';
const IMG_RESIDENTIAL = '/images/thumbnail/webp/residential/';

// General gallery (main works grid) – selected works
// title = project page h1.project-title for hover overlay
const generalImages = [
  { src: IMG_SELECTED + 'royalCentreThumb.webp', alt: 'Royal Centre Installation', link: '/royalCentre/', title: 'ROYAL CENTRE' },
  { src: IMG_SELECTED + 'jupiterBevThumb.webp', alt: 'Jupiter Bev Installation', link: '/jupiterSurfaceBeverlyHills/', title: "JUPITER'S SURFACE" },
  { src: IMG_SELECTED + 'murmuration2Thumb.webp', alt: 'Murmuration Installation', link: '/murmuration/', title: 'MURMURATION' },
  { src: IMG_SELECTED + 'jupiterSpace2Thumb.webp', alt: 'Jupiter Space', link: '/jupiterSpace/', title: 'JUPITER SPACE' },
  { src: IMG_SELECTED + 'capellaThumb3.webp', alt: 'Capella', link: '/capellaBasket/', title: 'CAPELLA BASKET' },
  { src: IMG_SELECTED + 'capHelixThumb4.webp', alt: 'Cap Helix Installation', link: '/capillaryHelix/', title: 'CAPILLARY HELIX' },
  { src: IMG_SELECTED + 'meshThumb.webp', alt: 'Mesh Installation', link: '/meshes/', title: 'MESHES' },
  { src: IMG_SELECTED + 'strawThumb.webp', alt: 'Straw Installation', link: '/straws/', title: 'STRAWS Sculpture System' },
  { src: IMG_SELECTED + 'trelliThumb3.webp', alt: 'Trelli Installation', link: '/trelli/', title: 'TRELLI LED LUMINAIRE' },
  { src: IMG_SELECTED + 'basketThumb1.webp', alt: 'Basket Installation', link: '/basket/', title: 'BASKET' },
  { src: IMG_SELECTED + 'gyroidThumb.webp', alt: 'Gyroid Installation', link: '/gyroid/', title: 'GYROID' },
  { src: IMG_SELECTED + 'trussThumb.webp', alt: 'Truss Installation', link: '/trelliTruss/', title: 'TRELLI TRUSS' }
];

// Commissioned Designs
const commissionedImages = [
  { src: IMG_COMMISSIONED + 'faceThumb.webp', alt: 'Face Installation', link: '/quantumFace/', title: 'QUANTUM FACE' },
  { src: IMG_COMMISSIONED + 'botanicalThumb.webp', alt: 'Botanical Installation', link: '/botanical/', title: 'BOTANICAL SCULPTURE' },
  { src: IMG_COMMISSIONED + 'pumaThumb.webp', alt: 'Puma Installation', link: '/puma/', title: 'PUMA HOLIDAY DISPLAY' },
  { src: IMG_COMMISSIONED + 'pingpongThumb4.webp', alt: 'Jeju Island Light Sculpture Park', link: '/jeju/', title: 'JEJU ISLAND\nLIGHT SCULPTURE PARK' },
  { src: IMG_COMMISSIONED + 'reefThumb2.webp', alt: 'Reef Installation', link: '/reef/', title: 'REEF' },
  { src: IMG_COMMISSIONED + 'brainThumb.webp', alt: 'Brain Installation', link: '/brain/', title: 'BRAIN SCULPTURE' },
  { src: IMG_COMMISSIONED + 'helixThumb.webp', alt: 'Helix Installation', link: '/helix/', title: 'HELIX' },
  { src: IMG_COMMISSIONED + 'constellationThumb.webp', alt: 'Constellation Installation', link: '/ibm/', title: 'IBM WATSON\nCONSTELLATION SCULPTURE' },
  { src: IMG_COMMISSIONED + 'rhythmThumb.webp', alt: 'Rhythm Installation', link: '/rhythmAndForm/', title: 'RHYTHM AND FORM' },
  { src: IMG_COMMISSIONED + 'fieldThumb.webp', alt: 'Field Installation', link: '/modalField/', title: 'MODAL FIELD' }
];

// Residential Special Projects
const residentialImages = [
  { src: IMG_RESIDENTIAL + 'jupiterThumb3.webp', alt: 'Jupiter Installation', link: '/jupiter/', title: 'JUPITER' },
  { src: IMG_RESIDENTIAL + 'moleculeThumb.webp', alt: 'Molecule Installation', link: '/corona/', title: 'CORONA' },
  { src: IMG_RESIDENTIAL + 'diamondThumb.webp', alt: 'Diamond Installation', link: '/doubleDiamond/', title: 'BREATHE CHANDELIER' },
  { src: IMG_RESIDENTIAL + 'fireThumb.webp', alt: 'Fire Installation', link: '/fireIsland/', title: 'LONG TUBE' },
  { src: IMG_RESIDENTIAL + 'hyparThumb.webp', alt: 'Hypar Installation', link: '/hypar/', title: 'HYPAR' },
  { src: IMG_RESIDENTIAL + 'moonrakerThumb.webp', alt: 'Moonraker Installation', link: '/moonraker/', title: 'MOONRAKER CHANDELIER' }
];

/** Returns string in title case (first letter of each word capitalized). Preserves newlines. */
function toTitleCase(str) {
  if (!str) return str;
  return str.split('\n').map(function (line) {
    return line.split(/\s/).map(function (word) {
      if (!word.length) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
  }).join('\n');
}

/**
 * Renders a gallery grid from an array of image configs.
 * @param {HTMLElement} gridEl - The .gallery-grid container
 * @param {Array<{src: string, alt: string, link?: string, title?: string}>} items - title = hover overlay text (project title)
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
      overlay.textContent = toTitleCase(item.title || item.alt || '');
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
