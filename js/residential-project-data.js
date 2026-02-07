/**
 * Residential project data. Same structure as general-project-data.js.
 * Project IDs here are merged with general and commission for lookup in project.js.
 */
var RESIDENTIAL_PROJECTS = {
  // Add residential projects here, e.g.:
  // 'project-id': { title: 'TITLE', blocks: [ ... ] },
  'jupiter': {
    title: 'JUPITER',
    blocks: [
      { type: 'full-image', src: '/images/project/residential/jupiter/j1.jpg', alt: '' },
      { type: 'full-text', description: [
        {
          tag: 'p',
          content: [
            'The Jupiter spheres are a series of geodesic pendant lights plated with real gold on their interiors.',
            'Hundreds of high-CRI LEDs create a golden glow on their inner surface.',
            'Jupiter is based on a patented geometry invented by Jason Krugman in his studio at the New Lab in the Brooklyn Navy Yard.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'Specifications and Ordering.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'Jupiter spheres comes in three sizes, 18", 24" and 33.6".',
            'Custom orders for larger or smaller spheres, hemispheres, tubes and other shapes can be accommodated.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'Jupiter\'s standard finish is matte black with a gold-plated interior.',
            'Gloss white and all gold are available for custom orders.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'The 33.6" sphere has over 1,200 LEDs with a color temperature of 3,000K and a 90+ CRI.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'The Jupiter line is ETL listed (equivalent to UL).',
            'It is dimmable with ELV type dimmers.',
            'Each fixture includes a transformer and a brass ceiling canopy.',
            'Canopy dimensions are 1.5" tall by 6.5" round and mount to a standard junction box.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'Cut Sheet.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'Installation Instructions.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'For inquires email info@jasonkrugman.com.',
          ].join(' ')
        },
      ] },
      { type: 'full-image', src: '/images/project/residential/jupiter/j7.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j8.jpg', alt: 'Jupiter Half Dome custom with brass rim' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j9.png', alt: '' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j10.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j11.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j12.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j13.jpg', alt: 'Jupiter Half Dome Small mounted flush to the ceiling' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j14.jpg', alt: 'Jupiter Half Dome Pendant - 36in' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j15.jpg', alt: 'Jupiter Half Dome Pendant - 36"' },
      { type: 'full-image', src: '/images/project/residential/jupiter/j16.jpg', alt: 'Jupiter Gold Medium' }
    ]
  },
  'corona': {
    title: 'CORONA',
    blocks: [
      { type: 'full-image', src: '/images/project/residential/corona/c1.gif', alt: '' },
      { type: 'full-text', description: [
        {
          tag: 'p',
          content: [
            'The Corona LED light sculpture is based on 5-fold symmetry while using Printed Circuit Boards to create multiple electrical conductive layers throughout.',
            'Inspired by and created during the Coronavirus pandemic, this artwork fits neatly into Krugman\'s ongoing exploration of electrified geodesics.',
            'It is novel in its spiky protuberances using a co-axial standoff design.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'Jason Krugman Studio partnered with Voltaic Systems to create a light sculpture using their touch-dimming LED camping lights.',
            'Krugman and Voltaic worked together to merge the power adapters so that any vertex of one of Krugman\'s Jupiter lights could accommodate a touch-dimming camping light.',
            'The resulting form references the Covid-19 spike protein, as well as other protein capsid layers found around viral DNA.',
            'These forms are often icosahedral as they are based around nested spherical building blocks.',
          ].join(' ')
        },
      ] },
      { type: 'full-image', src: '/images/project/residential/corona/c2.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/corona/c3.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/corona/c4.png', alt: '' }
    ]
  },
  'breathe-chandelier': {
    title: 'BREATHE CHANDELIER',
    blocks: [
      { type: 'full-image', src: '/images/project/residential/breathe-chandelier/c1.jpg', alt: '' },
      { type: 'full-text', description: [
        {
          tag: 'p',
          content: [
            'A slowly undulating net of lights creates a one-of-a-kind kinetic light sculpture.',
            'Small DC motors slowly pull on the sculpture\'s fine stainless steel cables, slighting distorting the arrangement of the lights, giving the form the appearance of organic life.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'Jason Krugman Studio worked closely with the Clients and their architect to design the perfect piece for this modernized beach house.',
            'The sculpture shares an aesthetic with their beautiful, root-ball table situated below.',
            'Its central hanging point within the living room creates a well-framed viewpoint alongside the iconic Double Diamond House, designed by architect, Andrew Geller, in 1958.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'Hundreds of small cable-pixels allow the piece to slowly contort in form while remaining illuminated.',
            'Two layers of mesh create a full-feeling, organic array of slowly moving lights.',
            'The sculpture\'s lights are controllable independent of the motion and are fully dimmable.',
          ].join(' ')
        },
      ] },
      { type: 'full-video', src: 'https://vimeo.com/131696596?fl=pl&fe=cm' },
      { type: 'full-image', src: '/images/project/residential/breathe-chandelier/c2.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/breathe-chandelier/c3.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/breathe-chandelier/c4.jpg', alt: '' }
    ]
  },
  'long-tube': {
    title: 'LONG TUBE',
    blocks: [
      { type: 'full-image', src: '/images/project/residential/long-tube/lt1.jpg', alt: '' },
      { type: 'full-text', description: [
        {
          tag: 'p',
          content: [
            'In this commission, two light sculptures became signature design elements of a beautiful beachfront home.',
            'Jason Krugman Studio collaborated with designer, Michael DeFalco, to create two unique LED forms for his home at Fire Island Pines.',
          ].join(' ')
        },
        {
          tag: 'p',
          content: [
            'The first piece, Long Tube, is a 24-ft long tube of unbinned cool white LEDs.',
            'Thousands of individual diodes were hand-soldered into a wavering tubular form, suspended slightly below the ceiling in the space.',
            'The piece is bordered by glass doorways on either side, one is the main entrance to the house, the other, the ocean.',
            'Defalco\'s wall treatment incorporates variable-sized OSB panels, contributing to the otherworldly feel of the main hallway, particularly at night.',
          ].join(' ')
        },
      ] },
      { type: 'full-image', src: '/images/project/residential/long-tube/lt2.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/long-tube/lt3.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/long-tube/lt4.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/long-tube/lt5.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/long-tube/lt6.jpg', alt: '' }
    ]
  },
  'hypar': {
    title: 'HYPAR',
    blocks: [
      { type: 'full-image', src: '/images/project/residential/hypar/h1.jpg', alt: '' },
      { type: 'full-text', description: [
        {
          tag: 'p',
          content: [
            'Jason Krugman Studio collaborated with designer, Michael Defalco, on this hyperbolic LED form.',
            'An interior frame of steel is skinned with red oak, giving the piece a refined look with the strong interior form needed to resist the tension of the 26 parallel woven copper wires.',
            'Krugman meticulously soldered the LEDs onto the form, keeping them aligned in a grid to highlight the curvature of the piece\'s hyperbolic surface.',
            'Hypar is fully dimmable and hangs from a thin stainless cable.',
          ].join(' ')
        },
      ] },
      { type: 'full-image', src: '/images/project/residential/hypar/h2.jpg', alt: '' },
      { type: 'full-image', src: '/images/project/residential/hypar/h3.jpg', alt: '' }
    ]
  }
};
if (typeof window !== 'undefined') { window.RESIDENTIAL_PROJECTS = RESIDENTIAL_PROJECTS; }
