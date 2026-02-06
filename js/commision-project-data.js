/**
 * Commissioned project data. Same structure as general-project-data.js.
 * Project IDs here are merged with general and residential for lookup in project.js.
 */
var COMMISION_PROJECTS = {
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
if (typeof window !== 'undefined') { window.COMMISION_PROJECTS = COMMISION_PROJECTS; }
