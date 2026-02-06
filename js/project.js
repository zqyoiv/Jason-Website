/**
 * Project page data and renderer.
 * Each project has a title and blocks array. Block types:
 * - full-image: { type: 'full-image', src, alt, caption? }
 * - full-video: { type: 'full-video', src, caption? }
 * - two-column-image: { type: 'two-column-image', left: { src, alt }, right: { src, alt }, caption? }
 * - five-column-image: { type: 'five-column-image', src, alt } – same image repeated 5×, full width
 * - two-column-txt: { type: 'two-column-txt', left: htmlString, right: htmlString }
 * - full-text: { type: 'full-text', description: [ { tag: 'p'|'h2', content } ] } – one text area, full width
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
  },
  'capella-basket': {
    title: 'CAPELLA BASKET',
    blocks: [
      { type: 'full-image', src: '/images/page/capella-basket/cb1.jpg', alt: '' },
      { type: 'project-content', description: [
        { tag: 'p', content: 'In March 2020, Jason Krugman Studio created its largest sculpture to date, a 22ft x 22ft x 16ft centerpiece for Capella Tower in Minneapolis, MN. Inspired by the "wiring" of organic creatures, Jason Krugman\'s Capella Basket sculpture uses a new electrical medium to rout energy through space. The sculpture is a centerpiece for Capella Tower, a class A office tower in downtown Minneapolis. From its hang-point 70-ft in the air, the artwork floats centrally in the large glass-walled atrium. Viewers are able to get a 270 degree view from the mezzanine and peer straight up and through from the floor below.' },
        { tag: 'p', content: 'Capella Basket is based on Krugman\'s original table-sized Basket sculpture. Its form references the toroidal shape of magnetic fields. Krugman used his patented connector system to create the sculpture with almost no wiring. Instead, over 10,000 circuit boards distribute and deliver power to 1,860 LED light sources. Blending craft with technology, Krugman works to discover new ways of arranging electricity in three dimensions.' },
        { tag: 'p', content: 'Krugman Studio:	Jason Krugman (artist), Yevgeny Koramblyum (3D modeling), Andrew Martinez (fabricator), Chris Zack (fabricator), Netta Schwarz (fabricator), Julian Lloyd (fabricator)' },
        { tag: 'p', content: 'Engineering:	Arup' },
      ], details: [
        { label: 'Client:', value: 'Shorenstein Properties' },
        { label: 'Architect:', value: 'Pei, Cobb, Fried and Partners' },
        { label: 'Date of Completion:', value: 'March 2020' },
        { label: 'Address:', value: 'Capella Tower, 226 South 6th St, Minneapolis, MN' },
      ] },
      { type: 'full-image', src: '/images/page/capella-basket/cb2.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/capella-basket/cb3.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/capella-basket/cb4.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/capella-basket/cb5.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/capella-basket/cb6.jpg', alt: '' },
      { type: 'project-content', description: [
        { tag: 'p', content: 'PROCESS' },
        { tag: 'p', content: 'The sculpture is made from an electrified mesh of over 10,000 circuit boards supported by an aluminum frame. During construction, the sculpture was first set up in its entirety in a Brooklyn warehouse. After 8 weeks of assembly and fabrication, it was disassembled, rolled up and driven to Minneapolis. The below timelapses highlight the process as well as the final assembly and testing on site at Capella Tower.' },
        { tag: 'p', content: 'To recreate the original artwork at a more than 10x scale, the process morphs from a physical exploration of handmade form into a digital design and fabrication exercise. The original sculpture was made with a series of systematic operations to transform a flat sheet of hand-soldered LED mesh into a 3-dimensional toroidal section. These operations are replicated digitally with key parameters of the original physical model programmed into the digital one. The initial constraints during the artwork\'s creation make it agnostic of scale or even medium.' },
      ], details: [
      ] },
      { type: 'full-image', src: '/images/page/capella-basket/cb7.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/capella-basket/cb8.jpg', alt: '' }
    ]
  },
  'capillary-helix': {
    title: 'CAPILLARY HELIX',
    blocks: [
      { type: 'full-image', src: '/images/page/capillary-helix/ch1.png', alt: '' },
      { type: 'project-content', description: [
        { tag: 'p', content: 'In 2023, Krugman Studio created Capillary Helix for Montefiore\'s Einstein Advanced Care at Hudson Yards. The sculpture was conceived as a response to the question of how light and art can promote healing within healthcare settings.' },
        { tag: 'p', content: 'Capillary Helix was born through a series of steps, each adding an additional layer of intricacy. Similar to bone or a spiraling section of DNA, Capillary Helix is drawn taut via a multitude of lightweight internal cross braces. Lights on the opposing faces of the helices are inserted into drinking straws affixing their rolling surfaces together. The resulting trusses become rigid while the straws act as individual vessels for each light.' },
        { tag: 'p', content: 'Dimensions: 44\'\' x 44\'\' x 288\'\' ( H x W x D)' },
        { tag: 'p', content: '\'\'This sculpture is about organization and our efforts to repair and stay organized in a chaotic world. Healthcare and healing spaces are an answer to this challenge, creating a bubble of calm and organization where we can collaboratively use technology with a human touch for good. I am overjoyed to make artwork specifically for this setting and the people who will use this space.\'\'' },
      ], details: [
      ] },
      { type: 'full-image', src: '/images/page/capillary-helix/ch2.jpg', alt: 'Photo by Scott Frances Photography' },
      { type: 'full-image', src: '/images/page/capillary-helix/ch3.jpg', alt: 'Photo by Scott Frances Photography' },
      { type: 'full-image', src: '/images/page/capillary-helix/ch4.jpg', alt: '' }
    ]
  },
  'meshes': {
    title: 'MESHES',
    blocks: [
      { type: 'full-image', src: '/images/page/meshes/mesh1.jpg', alt: '' },
      { type: 'project-content', description: [
        { tag: 'p', content: 'Mesh. Hand-soldered one light at a time.' },
        { tag: 'p', content: 'After fabrication of the LED mesh, the resulting topography of lights is suspended in space from an electrified structure. The material lends itself to smooth rolling forms devoid of sharp folds or creases. Each piece is custom made and shaped.' },
        { tag: 'p', content: 'Krugman has been working with this material for over 10 years. ETL listed and dimmable.' },
      ], details: [
      ] },
      { type: 'full-image', src: '/images/page/meshes/mesh2.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh3.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh4.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh5.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh6.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh7.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh8.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh9.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh10.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh11.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh12.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh13.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh14.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/meshes/mesh15.jpg', alt: '' }
    ]
  },
  'straws-sculpture-system': {
    title: 'STRAWS Sculpture System',
    blocks: [
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws1.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws2.jpg', alt: '' },
      { type: 'project-content', description: [
        { tag: 'p', content: 'Overview' },
        { tag: 'p', content: 'Combining light and geometric transformations lies at the heart of our creative practice. These artworks start as square grids of lights facing one another. Drinking straws are used to attach each of the points of the two grids to one another. The resulting form is a cube with lights on two faces, joined by an array of light diffusing straws. The real magic happens when the grids are deformed. Pulling on the opposing corners of the grids causes the square-shaped polygonal mesh to become diamond-shaped. The resulting volume becomes helical and the pattern can be continued.' },
      ], details: [
      ] },
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws3.jpg', alt: '' },
      { type: 'project-content', description: [
        { tag: 'p', content: 'HELIX' },
        { tag: 'p', content: 'This group of artworks, initially created in 2017 and elaborated in 2018 with the large-scale permanent Helix artwork for Holland America Line, is based on opposing surfaces of lights. To scale the work up while maintaining its aesthetic integrity, Krugman Studio created a design with no wiring visible and almost no visible hardware. The structure was CNC bent and thousands of small brass fittings were hand-machined and fitted. Link to Helix cruise ship project.' },
        { tag: 'p', content: 'STRAW HELIX' },
      ], details: [
      ] },
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws4.jpg', alt: '' },
      { type: 'project-content', description: [
        { tag: 'p', content: 'In 2023, Krugman Studio created Capillary Helix for Montefiore\'s Einstein Advanced Care at Hudson Yards. The sculpture utilizing a consistent spiral shape by restricting the number of different elements used. A diagrid of LED mesh is used on either face of the mesh panels. All of the straws are the same length. As the grid distends, hyperbolic surfaces mirror one another, restricted by the grid and the single straw length. The LEDs on either side of the mesh surfaces pivot to allow the overall twist of the form.' },
      ], details: [
      ] },
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws5.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws6.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws7.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws8.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/straws-sculpture-system/straws9.jpg', alt: '' }
    ]
  },
  'trelli-led-luminaire': {
    title: 'TRELLI LED LUMINAIRE',
    blocks: [
      { type: 'full-image', src: '/images/page/trelli-led-luminaire/trelli1.jpg', alt: '' },
      { type: 'full-text', description: [
        { tag: 'p', content: 'Design your own pattern or follow one of our templates to create an elegant fixture or architectural lighting installation. There is no limit to scale as the system is completely modular in its design. LED struts screw together with standard hardware to form an unlimited number of patterns. Make fixtures for the wall, ceiling or even three dimensional forms (the LED struts are flexible).' },
        { tag: 'p', content: 'Download Sample Cut Sheet' },
        { tag: 'p', content: 'To purchase or inquire for more information email info@jasonkrugman.com, subject "Trelli".' },
        { tag: 'p', content: 'Custom artworks can be made to virtually any scale. Options include hardwired power, all brass hardware, and matte black, gold or white surface finish.' },
        { tag: 'p', content: 'The Trelli System is based on a patented geometry invented by Jason Krugman in his studio at the New Lab in the Brooklyn Navy Yard. The Trelli system is ETL listed to the UL standard.' },
      ], details: [
      ] },
      { type: 'full-image', src: '/images/page/trelli-led-luminaire/trelli3.png', alt: '' },
      { type: 'full-text', description: [
        { tag: 'p', content: 'Trelli and Penrose' },
        { tag: 'p', content: 'Since Trelli is a basic geometric system, using its characteristics leads us to an enormous body of work out there for inspiration. For example, Penrose Tiling is based on shapes that all have the same edge length (like Trelli\'s LED bars). While Trelli can be made with struts of varying lengths, imposing rules on the designs for specific projects allows for the creation of compelling and consistent patterns. Ever play with those colored pattern blocks as a kid? Same idea. All the edge lengths are the same. At certain key angles, they create a tiled surface without gaps.' },
      ], details: [
      ] },
      { type: 'five-column-image', src: '/images/page/trelli-led-luminaire/trelli4.png', alt : '' },
      { type: 'full-text', description: [
        { tag: 'p', content: 'Trelli for Lettering' },
        { tag: 'p', content: 'Trelli is perfect for creating lettering from scratch. All the light bars are the same length and straight. We decided to create a font based on a triangular grid because it forms the most stable shapes when put together. Other means of making letters are possible as well. Ideal for large indoor applications.' },
      ], details: [
      ] },
      { type: 'full-image', src: '/images/page/trelli-led-luminaire/trelli5.png', alt: '' },
      { type: 'full-image', src: '/images/page/trelli-led-luminaire/trelli6.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/trelli-led-luminaire/trelli7.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/trelli-led-luminaire/trelli8.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/trelli-led-luminaire/trelli9.jpg', alt: '' },
    ]
  },
  'basket': {
    title: 'BASKET',
    blocks: [
      { type: 'full-image', src: '/images/page/basket/basket1.jpg', alt: '' },
      { type: 'full-text', description: [
        {
          tag: 'p',
          content: [
            'Function guides the form of this light sculpture.',
            'Each Basket light sculpture is handmade to suit a specific space.',
            "Krugman has been working with this form for over a decade, intrigued with its versatility at scale and its multiple axes of symmetry.",
            "Krugman originally created this shape as a table-top size light sculpture but quickly moved on to making centerpieces for dining rooms and foyers, and then eventually, brought the form to the building scale in 2019.",
            "See Krugman's Capella Basket for his largest of the series.",
            "Two ten-foot Basket sculptures are also installed at the Brooklyn Navy Yard's Building 77 and New Lab.",
            "Another ten-foot Basket is permanently installed at Baker Park in Naples Florida."
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'A sheet of LEDs rolled into a tube and connected together at its center.',
            'The top and bottom of the tube are folded backwards and fully attached to one another yielding the final form.',
            'The light sculpture is based on a 4-sided polygonal mesh.',
            'The mesh takes its mechanical and structural cues from the electrical requirements of the LEDs.',
            'Each requires two conductors to power it and two conductors supply the surrounding LEDs.',
            'The mesh can be used to create tubes and donuts but not spheres.',
            'The material cannot be folded or the uninsulated wires will touch one another and short.'
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'The piece is from the Organic Electric series.',
            'It can be placed on a surface (often with the power wires penetrating the surface to remain invisible) or hung as a chandelier.',
            'Sculptures are made to order and can be produced at varying sizes.',
            'They can be dimmed with a standard low-voltage dimmer and come with a brushed nickel ceiling canopy.'
          ].join(' ')
        }
      ] },
      { type: 'full-image', src: '/images/page/basket/basket2.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/basket/basket3.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/basket/basket4.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/basket/basket5.gif', alt: '' },
      { type: 'full-image', src: '/images/page/basket/basket6.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/basket/basket8.jpg', alt: '' }
    ]
  },
  'gyroid': {
    title: 'GYROID',
    blocks: [
      { type: 'full-image', src: '/images/page/gyroid/gyroid1.gif', alt: '' },
      { type: 'full-text', description: [
        {
          tag: 'p',
          content: [
            'The Gyroid is a shape that is ubiquitous in nature, likely because it is very efficient.',
            'The gyroid is a "triply periodic minimal surface", meaning that it tiles in 3-dimensions.',
            'It repeats cleanly and without gaps between units.',
            'Minimal surfaces locally minimize their area and are most commonly known via the surfaces created by soap bubble films.'
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            "This series of artworks by Jason Krugman were created by using Krugman's patented circuit board connector technique to create electrical gyroid sculptures covered with LEDs.",
            "With assistance from mathematicians Sabetta Matsumoto and Henry Segerman, Krugman first rationalized the gyroid form into a sculpture using only 2 edge lengths.",
            "Later on, with assistance from Yevgeny Koramblyum, Krugman created a larger version of the gyroid (4x4x4ft) using 5 edge lengths."
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            "Our gyroid sculptures have germinated out of an inspiring body of work in math and art.",
            "For more information, Alan Schoen's geometry website is a great place to start.",
            'https://schoengeometry.com/'
          ].join(' ')
        }
      ] },
      { type: 'full-image', src: '/images/page/gyroid/gyroid2.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/gyroid/gyroid3.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/gyroid/gyroid4.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/gyroid/gyroid5.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/gyroid/gyroid6.gif', alt: '' },
      { type: 'full-image', src: '/images/page/gyroid/gyroid7.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/gyroid/gyroid8.jpg', alt: '' }
    ]
  },
  'trelli-truss': {
    title: 'TRELLI TRUSS',
    blocks: [
      { type: 'full-image', src: '/images/page/trelli-truss/tt1.jpg', alt: '' },
      { type: 'full-text', description: [
        {
          tag: 'p',
          content: [
            'Trelli Truss is a light sculpture made from two hexagonal layers of flexible circuit boards.',
            "By joining the two layers of PCBs, the artwork's structure becomes rigid and self-supporting.",
            "Meanwhile, a concentric circular pattern on the end of each board allows electricity to flow throughout the artwork's structure powering its thousands of small LED lights."
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            "Krugman has looked to carbon nano structures for inspiration in shaping his most recent circuit-board-based sculptures.",
            'Graphene, a hexagonal lattice of carbon atoms, was initially discovered by separating pencil "lead" using pieces of Scotch tape.',
            'Arranging and combining it into new physical structures could be the key to many exponential leaps in technology.'
          ].join(' ')
        }
      ] },
      { type: 'full-image', src: '/images/page/trelli-truss/tt2.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/trelli-truss/tt3.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/trelli-truss/tt4.jpg', alt: '' },
      { type: 'full-image', src: '/images/page/trelli-truss/tt5.jpg', alt: '' }
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
