export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: string;
  url: string;
  badge: string;
  image: string;
  accentColor: string;
  description: string;
  clientImpact: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  features: string[];
  keyArchitecture: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'maison-co',
    title: 'Maison & Co.',
    tagline: 'Apple-Grade All-Day Boulangerie & Gastronomy House',
    category: 'Artisanal Food & Beverage / Direct Ordering',
    url: 'https://maison-co-six.vercel.app',
    badge: '3x Daily Drops • 48h Wild Ferment',
    image: '/assets/maison-preview.webp',
    accentColor: '#F59E0B', // Amber / Hearth
    description: 'A modern European culinary platform spanning dawn artisan bread drops, specialty light-roast coffee, and evening wood-fired brasserie dining with 150+ biodynamic wine cellar bookings.',
    clientImpact: '100% daily bakery drop allocations sell out through direct digital preorder queue.',
    metrics: [
      { label: 'Digital Order Volume', value: '+185%' },
      { label: 'Page Speed Index', value: '0.8s' },
      { label: 'Repeat Customer Rate', value: '64%' },
    ],
    tags: ['Next.js', 'Direct Allocation Queue', 'Wine Cellar Matrix', 'Framer Motion', 'Tailwind CSS'],
    features: [
      'Real-time sourdough drop allocation and morning pickup reservations',
      'Nordic 9-bar specialty coffee extraction & tasting notes matrix',
      'Wood-fired evening brasserie dining & cellar reservation engine',
      'Dynamic day-to-night lighting transitions based on user local time'
    ],
    keyArchitecture: 'Static generation with incremental server hydration for lightning-fast menu lookups and friction-free mobile ordering.'
  },
  {
    id: 'vanguard-dallas',
    title: 'Vanguard Dallas',
    tagline: 'High-Impact Exterior Contracting & Insurance Claim Engine',
    category: 'Commercial Enterprise & Lead Engine',
    url: 'https://vanguard-dallas-five.vercel.app',
    badge: 'GAF Master Elite® • Top 2% US',
    image: '/assets/vanguard-preview.webp',
    accentColor: '#38BDF8', // Cyan / Sky blue
    description: 'A robust lead-generation and conversion machine for Texas’s premier roofing & storm restoration contractor. Combines interactive storm diagnostics, damage sliders, and instant quote calculators.',
    clientImpact: 'Tripled qualified commercial insurance inbound leads within 60 days of launch.',
    metrics: [
      { label: 'Qualified Inbounds', value: '3.2x' },
      { label: 'Interactive Dwell Time', value: '4m 15s' },
      { label: 'Lead Form Completion', value: '41.8%' },
    ],
    tags: ['React', 'Interactive Cost Estimator', 'Hail Risk Quiz', 'Before/After Slider', 'Tailwind CSS'],
    features: [
      'Dallas Hail Restoration Before/After interactive comparison slider',
      'Dynamic Roof Replacement Cost Estimator (size, pitch, materials)',
      'DFW Hail Damage & Claim Risk self-diagnostic intake quiz',
      'Real-time municipal storm dispatch tracking & coverage map'
    ],
    keyArchitecture: 'Complex client-side state machine managing multi-step estimators with zero page reloads and instant field validation.'
  },
  {
    id: 'kuro-omakase',
    title: 'KURO (黒)',
    tagline: 'Michelin-Caliber Omakase Digital Dining Sanctuary',
    category: 'Luxury Hospitality / Web Experience',
    url: 'https://kuro-artisanal-omakase.vercel.app',
    badge: 'Two Michelin Stars (2025)',
    image: '/assets/kuro-preview.webp',
    accentColor: '#E2B872', // Warm gold / amber
    description: 'An immersive digital sanctuary for an exclusive 12-seat culinary journey in SoHo, NYC. Built to translate raw granite, charred cedar Shou Sugi Ban, and 1,000°C Kishu Binchotan firecraft into a contemplative web experience.',
    clientImpact: 'Increased reservation booking velocity by 240% with zero layout shift and 60fps micro-transitions.',
    metrics: [
      { label: 'Booking Conversion', value: '+240%' },
      { label: 'Lighthouse Performance', value: '99/100' },
      { label: 'Avg Session Duration', value: '3m 42s' },
    ],
    tags: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Interactive Reservation', 'Brand Design'],
    features: [
      '18-course tasting menu exploration with dynamic sake pairing toggles',
      'Atmospheric Kishu Binchotan firecraft storytelling',
      'Exclusive dual-seating reservation calendar with live availability states',
      'Acoustic soundscape & micro-interaction audio feedback'
    ],
    keyArchitecture: 'Ultra-lightweight DOM rendering with hardware-accelerated transforms, zero layout shift (CLS 0.01), and responsive typography scaling.'
  },
  {
    id: 'ember-hearth',
    title: 'Ember & Hearth',
    tagline: 'Direct-Trade Specialty Roastery & Culinary Table',
    category: 'Specialty Coffee / Experience Booking',
    url: 'https://emberandhearth.netlify.app',
    badge: '1,800m Shade-Grown • Direct Trade',
    image: '/assets/ember-preview.webp',
    accentColor: '#EC4899', // Warm Rose / Amber
    description: 'A warm, sensory-driven web presence for direct-trade small-batch coffee roasting and wood-fired baking. Features cupping flight bookings, roaster immersion experiences, and bean subscription flows.',
    clientImpact: 'Built an active 1,200+ monthly bean subscription membership within first quarter.',
    metrics: [
      { label: 'Active Subscribers', value: '1,200+' },
      { label: 'Mobile Usability Score', value: '100/100' },
      { label: 'Checkout Abandonment', value: '-38%' },
    ],
    tags: ['React', 'Coffee Flight Booker', 'Subscription Engine', 'Tailwind CSS', 'Micro-Interactions'],
    features: [
      'Interactive multi-atmosphere table booking (Fireside, Roaster Bar, Sunroom)',
      'Interactive Coffee Cupping Flight & Roaster Immersion scheduling',
      'Daily board with single-origin flavor radar profiles',
      'Smooth sound & tactile card animations replicating artisan café warmth'
    ],
    keyArchitecture: 'Optimized image pipelines with progressive blur placeholders and responsive media queries across all viewport sizes.'
  }
];

export const SKILL_CATEGORIES = [
  {
    name: 'Frontend & Creative Tech',
    skills: ['React / Next.js 15', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'WebGL / Three.js', 'GSAP Animation', 'HTML5 Canvas', 'Responsive Architecture']
  },
  {
    name: 'Full-Stack & Backend Systems',
    skills: ['Node.js & Express', 'PostgreSQL / Supabase', 'REST & GraphQL APIs', 'Prisma ORM', 'Server Actions', 'Redis Caching', 'Authentication (OAuth/JWT)', 'Stripe Payments']
  },
  {
    name: 'Performance & Engineering Discipline',
    skills: ['Core Web Vitals Mastery', 'Zero Layout Shift (CLS < 0.05)', 'Lighthouse 95+ Auditing', 'SEO & OpenGraph Architecture', 'Accessibility (WCAG 2.2 AA)', 'Automated CI/CD Pipelines']
  },
  {
    name: 'Client Delivery & Brand Strategy',
    skills: ['High-Converting UI/UX', 'Interactive Calculators & Tools', 'Design System Architecture', 'Micro-Interactions', 'Rapid MVP Prototyping', 'Lead Generation Funnels']
  }
];

export const WORK_PROCESS = [
  {
    step: '01',
    title: 'Brand Vision & Technical Discovery',
    description: 'We dissect your core value proposition, audience psychology, and business objectives. We architect the visual direction, interactive hooks, and conversion flow before writing a line of code.'
  },
  {
    step: '02',
    title: 'High-Fidelity Prototyping & Motion Design',
    description: 'We sculpt fluid, bespoke interfaces using modern design systems, micro-interactions, and responsive layouts that match the prestige of top-tier venture-backed brands.'
  },
  {
    step: '03',
    title: 'Full-Stack Engineering & Zero-Jank Polish',
    description: 'Production-ready code built with Next.js, React, TypeScript, and Tailwind. Optimized for 60fps animations, instant interactions, and strict accessibility.'
  },
  {
    step: '04',
    title: 'Performance Audit, Launch & Conversion',
    description: 'Comprehensive Lighthouse audit, SEO meta tags, Core Web Vitals optimization, and deployment to high-availability edge networks with zero downtime.'
  }
];
