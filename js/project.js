/**
 * Project page data and renderer.
 * Each project has a title and blocks array. Block types:
 * - full-image: { type: 'full-image', src, alt, caption? }
 * - full-video: { type: 'full-video', src, caption? }
 * - two-column-image: { type: 'two-column-image', left: { src, alt }, right: { src, alt }, caption? }
 * - two-column-txt: { type: 'two-column-txt', left: htmlString, right: htmlString }
 * - project-content: { type: 'project-content', description: [ { tag: 'p'|'h2', content } ], details: [ { label, value } ] }
 */

const PROJECTS = {
  murmuration: {
    title: 'MURMURATION',
    blocks: [
      {
        type: 'full-image',
        src: '/images/page/murmuration/20230315_203046.jpg',
        alt: 'Murmuration Installation'
      },
      {
        type: 'project-content',
        description: [
          {
            tag: 'p',
            content: [
              'A diagonal grid of hand-soldered LED lights are bound together into pairs to create an undulating truss spiraling through the stair space at a private residence in Key Biscayne, Florida.',
              'Murmuration was custom designed and fitted to suit the proportions of this waterfront home.',
              'Inspired by shoals of schooling fish, the artwork completes a grand swirling gesture as it rises between floors in the home.',
              "The sculpture's diagonal grid, or diagrid, mirrors that of the adjacent windows."
            ].join(' ')
          },
          { tag: 'h2', content: 'Artist Statement' },
          {
            tag: 'p',
            content: [
              'My work strikes a balance between intricacy and recognizable form.',
              'I believe that all people share an objective sense of beauty derived from nature.',
              'We gravitate towards things that have rhythm but that are not immediately consumable.',
              'The best (most beautiful) forms are those that we can quickly recognize as having pattern and underlying structure (with symmetries) but that include a certain amount of "noise".',
              'Intricate forms that are overly chaotic are not attractive because they are overwhelming and take too much work for us to understand.',
              'Forms that are overly simplistic with no depth of information are boring.',
              'In my artwork, I create patterned intricacies within larger comprehensible structures.',
              'The artworks should make visual sense both from afar and close up.',
              'At the closest level of observation, the audience should be able to observe how they function electrically.',
              'From far away, the shape should be interesting as a whole.',
              'I do this by incorporating symmetries and making shapes that are familiar, like waves, spirals and donuts, yet somewhat unique in their proportions, with their exact proportions being derived from the requirements of the materials.'
            ].join(' ')
          }
        ],
        details: [
          { label: 'Artwork Title:', value: 'Murmuration' },
          { label: 'Dimensions:', value: '11\'10\'\' x 7\'3\'\' x 17\'10\'\' ( H x W x D)' },
          { label: 'Medium:', value: 'LED, drinking straws' },
          { label: 'Year of Completion:', value: '2023' }
        ]
      },
      {
        type: 'full-image',
        src: '/images/page/murmuration/murmuration_diagram.jpg',
        alt: 'Murmuration Diagram'
      },
      {
        type: 'full-image',
        src: '/images/page/murmuration/20230315_200602.png',
        alt: 'Murmuration Detail'
      },
      {
        type: 'full-image',
        src: '/images/page/murmuration/20230315_200533.png',
        alt: 'Murmuration Detail'
      }
    ]
  },
  'jupiter-space': {
    title: 'JUPITER SPACE',
    blocks: [
      {
        type: 'full-image',
        src: '/images/page/jupiter-space/jupiterspace1.jpg',
        alt: 'Jupiter Space'
      },
      {
        type: 'project-content',
        description: [
          {
            tag: 'p',
            content: [
              'A surface of gold-plated circuit boards forms a canopy providing high-quality warm white light above the top floor lounge at 45 Howard Street.',
              'This site specific artwork was conceived as the signature design feature within the space, contrasting with the green color palette and exposed brick.',
              'Jupiter Space curves up and away from the walls behind the bar to forms an enclosing, cocoon-like nook at one side of the space as it wraps around a section of banquette seating.',
              'The artwork is dimmable and has a CRI of 92+ with color temperature of 2800K.'
            ].join(' ')
          },
          { tag: 'h2', content: 'Technical Approach' },
          {
            tag: 'p',
            content: [
              'Krugman Studio worked with long-time collaborator Yevgeny Koramblyum of Oom Studios to rationalize this complex surface into a buildable form.',
              'The structure is divided into 26 unique sections comprised of only 4 discrete length circuit boards.',
              'To achieve this level of simplicity within such a large complex form, Koramblyum authored a series of operations within the Rhino software platform.',
              'Both Grasshopper and Kangaroo plug-ins were incorporated to push pull the shape into form.'
            ].join(' ')
          }
        ],
        details: [
          { label: 'Artwork Title:', value: 'Jupiter Space' },
          { label: 'Dimensions:', value: '14\' x 26\' x 17\' ( H x W x D)' },
          { label: 'Medium:', value: 'Circuit boards' },
          { label: 'Year of Completion:', value: '2023' }
        ]
      },
      {
        type: 'full-image',
        src: '/images/page/jupiter-space/jupiterspace2.jpg',
        alt: 'Jupiter Space'
      },
      {
        type: 'full-image',
        src: '/images/page/jupiter-space/jupiterspace3.png',
        alt: 'Jupiter Space'
      },
      {
        type: 'full-image',
        src: '/images/page/jupiter-space/jupiterspace4.png',
        alt: 'Jupiter Space'
      },
      {
        type: 'full-image',
        src: '/images/page/jupiter-space/jupiterspace5.jpg',
        alt: 'Jupiter Space'
      }
    ]
  },
  'jupiter-surface-beverly-hills': {
    title: "JUPITER'S SURFACE BEVERLY HILLS",
    blocks: [
      {
        type: 'full-image',
        src: '/images/page/jupiter-surface-beverly-hills/inside_bar2k.jpg',
        alt: "Jupiter's Surface Beverly Hills"
      },
      {
        type: 'project-content',
        description: [
          { tag: 'h2', content: 'Overview' },
          {
            tag: 'p',
            content: [
              'A surface of gold-plated circuit boards forms a canopy providing high-quality warm white light above the interior and exterior bars of this Beverly Hills residence.',
              "Jupiter's Surface has an egg-crate surface created by slightly varying the lengths of its comprising circuit boards.",
              'In this instance, the artwork travels up the interior wall before rolling outwards into the room to follow the marble-topped bar.',
              "A companion section mirrors the interior portion over the outdoor bar situated underneath the home's expansive eaves.",
              'The artwork is dimmable and has a CRI of 92+ with color temperature of 2800K.'
            ].join(' ')
          }
        ]
      },
      {
        type: 'full-image',
        src: '/images/page/jupiter-surface-beverly-hills/inside_outside2k.jpg',
        alt: "Jupiter's Surface Beverly Hills"
      },
      {
        type: 'full-image',
        src: '/images/page/jupiter-surface-beverly-hills/outsideCropped.jpg',
        alt: "Jupiter's Surface Beverly Hills"
      }
    ]
  }
};

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

    case 'two-column-txt':
      wrap.className = 'project-content project-two-col-txt';
      var leftDiv = document.createElement('div');
      leftDiv.className = 'project-description';
      leftDiv.innerHTML = block.left;
      var rightDiv = document.createElement('div');
      rightDiv.className = 'project-description';
      rightDiv.innerHTML = block.right;
      wrap.appendChild(leftDiv);
      wrap.appendChild(rightDiv);
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
