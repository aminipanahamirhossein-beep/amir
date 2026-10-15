/**
 * Project catalogue.
 *
 * Each entry is a single record: add another object here and it appears on the
 * home page (when `featured`), on the portfolio grid and at its own detail
 * route `/projects/<slug>` — no layout changes required.
 */

export const projects = [
  {
    slug: 'horizon-house',
    title: 'The Horizon House',
    category: 'Residential',
    year: '2023',
    featured: true,
    image: '/images/project-horizon-house.jpg',
    imageAlt: 'Minimal white modernist house with expansive glazing beside a reflecting pool',
    summary:
      'A single-storey house set along a coastal ridge, organised as a long horizontal frame for the landscape.',
    facts: [
      { label: 'Location', value: 'Møn, Denmark' },
      { label: 'Client', value: 'Private' },
      { label: 'Size', value: '320 m²' },
      { label: 'Status', value: 'Completed' },
    ],
    services: ['Architecture design', 'Interior design'],
    body: [
      'The house is conceived as a low, precise line drawn across the ridge: two white concrete slabs hold a fully glazed living floor between them, so the horizon reads continuously through the building.',
      'Materials are limited to fair-faced concrete, oak and blackened steel. Deep overhangs shade the glazing in summer while the low winter sun reaches the full depth of the plan.',
      'A reflecting pool at the western end doubles the length of the composition and cools the prevailing breeze before it enters the house.',
    ],
    gallery: [
      '/images/detail-courtyard-pool.jpg',
      '/images/detail-white-concrete.jpg',
      '/images/about-studio-interior.jpg',
    ],
  },
  {
    slug: 'valley-cultural-center',
    title: 'Valley Cultural Center',
    category: 'Cultural',
    year: '2022',
    featured: true,
    image: '/images/project-valley-cultural-center.jpg',
    imageAlt:
      'Angular concrete cultural building with a dramatic folded roofline against an open sky',
    summary:
      'A cultural centre folded into the valley floor, with a single sculptural roof that gathers the public realm.',
    facts: [
      { label: 'Location', value: 'Gudbrandsdalen, Norway' },
      { label: 'Client', value: 'Municipal trust' },
      { label: 'Size', value: '4 800 m²' },
      { label: 'Status', value: 'Completed' },
    ],
    services: ['Architecture design', 'Urban planning'],
    body: [
      'Three programme bars — auditorium, library and workshop — are cut into the slope and united by one continuous roof plane that rises to a sharp point above the main foyer.',
      'The structure is in-situ concrete, board-marked and left raw. Only the underside of the roof is finished, in a pale acoustic plaster that catches the northern light.',
      'Between the bars, full-height glazing opens to a sheltered courtyard, keeping circulation daylit through the long Nordic winter.',
    ],
    gallery: [
      '/images/detail-concrete-facade.jpg',
      '/images/detail-white-concrete.jpg',
      '/images/about-studio-interior.jpg',
    ],
  },
  {
    slug: 'riverside-office',
    title: 'Riverside Office',
    category: 'Commercial',
    year: '2021',
    featured: true,
    image: '/images/project-riverside-office.jpg',
    imageAlt:
      'Contemporary office building with dark glass and strong vertical metal fins in a minimalist setting',
    summary:
      'A workplace block with a deep, shaded facade that keeps the interior cool and the elevation calm.',
    facts: [
      { label: 'Location', value: 'Rotterdam, Netherlands' },
      { label: 'Client', value: 'Havenwerk BV' },
      { label: 'Size', value: '9 200 m²' },
      { label: 'Status', value: 'Completed' },
    ],
    services: ['Architecture design', 'Consultation'],
    body: [
      'The plan is a compact 32-metre span around a planted void, giving every workplace a view either to the river or into the atrium.',
      'The facade is a single repeated bay: dark glass set behind extruded aluminium fins, which cut glare without blocking sightlines and give the building its vertical grain.',
      'Ground level is deliberately porous — a colonnade of the same fins opens the block to the quay and frames the public route along the water.',
    ],
    gallery: [
      '/images/detail-concrete-facade.jpg',
      '/images/detail-courtyard-pool.jpg',
      '/images/detail-white-concrete.jpg',
    ],
  },
  {
    slug: 'cedar-ridge-residence',
    title: 'Cedar Ridge Residence',
    category: 'Residential',
    year: '2022',
    featured: false,
    image: '/images/project-cedar-ridge-residence.jpg',
    imageAlt: 'Long white residence on a ridge with a shaded approach and deep roof overhang',
    summary:
      'A hillside family house arranged as two bars around a courtyard, shaded by a single deep roof.',
    facts: [
      { label: 'Location', value: 'Sonoma County, USA' },
      { label: 'Client', value: 'Private' },
      { label: 'Size', value: '410 m²' },
      { label: 'Status', value: 'Completed' },
    ],
    services: ['Architecture design', 'Interior design'],
    body: [
      'Two parallel bars — living and sleeping — enclose a planted courtyard that acts as the arrival sequence and the house’s main outdoor room.',
      'The roof is continuous and deep enough to shade the western glazing through the hottest part of the day, while clerestories draw light into the centre of the plan.',
      'Exposed structure in white concrete is left visible throughout, with warm timber used only where the body touches it.',
    ],
    gallery: [
      '/images/detail-white-concrete.jpg',
      '/images/detail-courtyard-pool.jpg',
      '/images/about-studio-interior.jpg',
    ],
  },
  {
    slug: 'meridian-civic-hall',
    title: 'Meridian Civic Hall',
    category: 'Public',
    year: '2020',
    featured: false,
    image: '/images/project-meridian-civic-hall.jpg',
    imageAlt: 'Tall civic building with a rhythmic vertical facade against an open sky',
    summary:
      'A civic hall that folds a council chamber, archive and public foyer into one legible vertical stack.',
    facts: [
      { label: 'Location', value: 'Aarhus, Denmark' },
      { label: 'Client', value: 'City of Aarhus' },
      { label: 'Size', value: '6 400 m²' },
      { label: 'Status', value: 'Completed' },
    ],
    services: ['Architecture design', 'Urban planning', 'Consultation'],
    body: [
      'The brief asked for openness without losing formality. The answer is a stone-plinth base of public rooms with a translucent civic volume above, reached by a single ceremonial stair.',
      'A precast facade carries a fine vertical rhythm that reads as solid from across the square and dissolves into light where the foyer glazing sits behind it.',
      'The archive is expressed as a windowless mass anchoring the corner, giving the hall weight in the townscape.',
    ],
    gallery: [
      '/images/detail-concrete-facade.jpg',
      '/images/detail-white-concrete.jpg',
      '/images/detail-courtyard-pool.jpg',
    ],
  },
  {
    slug: 'atrium-arts-pavilion',
    title: 'Atrium Arts Pavilion',
    category: 'Cultural',
    year: '2021',
    featured: false,
    image: '/images/project-atrium-arts-pavilion.jpg',
    imageAlt: 'Concrete arts pavilion with a generous glazed atrium and raw structural surfaces',
    summary:
      'A small pavilion for temporary exhibitions, built as a light box inside a heavy concrete frame.',
    facts: [
      { label: 'Location', value: 'Basel, Switzerland' },
      { label: 'Client', value: 'Kunstverein Basel' },
      { label: 'Size', value: '2 100 m²' },
      { label: 'Status', value: 'Completed' },
    ],
    services: ['Architecture design', 'Interior design'],
    body: [
      'The pavilion is a single column-free hall wrapped in a concrete lattice, with a fully glazed atrium peeling away from the frame to give the galleries a quiet, north-lit edge.',
      'Interiors are deliberately neutral: pale screed floors, white walls and a ceiling grid that carries both light and services without interrupting the volume.',
      'The lattice doubles as a brise-soleil, so the atrium stays usable for events through the summer.',
    ],
    gallery: [
      '/images/about-studio-interior.jpg',
      '/images/detail-concrete-facade.jpg',
      '/images/detail-courtyard-pool.jpg',
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.featured).slice(0, 3);

export function getProject(slug) {
  return projects.find((project) => project.slug === slug);
}

export function getNextProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;
  return projects[(index + 1) % projects.length];
}
