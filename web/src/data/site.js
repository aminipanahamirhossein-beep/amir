/**
 * Studio-level content: navigation, hero copy, section copy and studio facts.
 * Everything a non-developer would want to change lives here.
 *
 * NOTE: `contact.email` and every entry in `socials` are intentionally obvious
 * placeholders — replace them with the studio's real details before launch.
 */

export const navigation = [
  { label: 'Home', section: 'home' },
  { label: 'Projects', section: 'projects' },
  { label: 'About', section: 'about' },
  { label: 'Services', section: 'services' },
  { label: 'Contact', section: 'contact' },
];

export const studio = {
  name: 'ATELIER',
  tagline: 'Architecture for a better tomorrow.',
  copyright: '© 2025 Atelier. All rights reserved.',
  founded: '2010',
  location: 'Copenhagen, Denmark',
};

export const hero = {
  eyebrow: 'Architecture / Design / Build',
  titleLines: ['Shaping', 'Better Spaces', 'for a Brighter', 'Tomorrow'],
  paragraph:
    'We design thoughtful, sustainable and human-centered spaces that inspire and endure.',
  cta: 'Explore Our Work',
  image: '/images/hero-atelier-house.jpg',
  imageAlt:
    'Monochrome render of a contemporary multi-level house with white concrete slabs and dark glazing',
};

export const about = {
  index: '01',
  heading: 'About Us',
  paragraph:
    'We are an architecture studio dedicated to creating innovative, functional and timeless designs. Our approach blends creativity, technology and a deep respect for nature and context.',
  linkLabel: 'Learn More',
  image: '/images/about-studio-concrete.jpg',
  imageAlt:
    'Close-up of a contemporary concrete building showing strong geometric lines and deep shadows',
};

export const statistics = [
  { value: '15+', caption: 'Years of experience' },
  { value: '50+', caption: 'Completed projects' },
  { value: '10+', caption: 'Awards & recognitions' },
];

export const services = {
  index: '03',
  heading: 'Our Services',
  items: [
    {
      icon: 'frame',
      title: 'Architecture Design',
      description: 'From concept to construction, we create spaces that work for you.',
    },
    {
      icon: 'leaf',
      title: 'Interior Design',
      description: 'Thoughtful interiors that bring your vision to life.',
    },
    {
      icon: 'cube',
      title: 'Urban Planning',
      description: 'Smarter, more livable communities for the future.',
    },
    {
      icon: 'drafting',
      title: 'Consultation',
      description: 'Expert guidance at every stage of your project.',
    },
  ],
};

export const contactCta = {
  index: '04',
  headingLines: ['Let’s Build', 'Something Great'],
  paragraph:
    "Have a project in mind? We'd love to hear from you. Get in touch and let's create something extraordinary together.",
  cta: 'Contact Us',
};

/** Replace with the studio's real details. */
export const contact = {
  email: 'studio@atelier.example',
  studio: 'Copenhagen, Denmark',
  responseTime: 'We reply to every enquiry within two working days.',
};

/** Placeholder destinations — add a URL to turn a label into a live link. */
export const socials = [
  { label: 'Instagram', url: '' },
  { label: 'LinkedIn', url: '' },
  { label: 'Behance', url: '' },
];

/** Copy for the dedicated "Learn More" studio page. */
export const studioPage = {
  eyebrow: 'Studio',
  heading: 'A studio built around the people who use the buildings',
  lede: 'Atelier is an architecture practice working across architecture, interiors and urban planning. We design buildings that hold their ground — quietly ambitious, built to last and shaped by the people who will live with them.',
  principles: [
    {
      title: 'Design-led process',
      description:
        'Every project starts with drawing, not decoration. We test massing, light and material until the building feels inevitable.',
    },
    {
      title: 'Sustainable by default',
      description:
        'Low-carbon structure, honest materials and passive strategies are the baseline of our work, not an upgrade.',
    },
    {
      title: 'Built to endure',
      description:
        'We design for the long life of a building: robust detailing, adaptable plans and spaces that age well.',
    },
  ],
  capabilities: [
    'Architecture design',
    'Interior design',
    'Urban planning',
    'Feasibility & consultation',
    'Site supervision',
    'Competitions',
  ],
};
