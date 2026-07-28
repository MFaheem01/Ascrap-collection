// Shared blog post interface and fallback data

export type BlogPostItem = {
  id: string
  slug: string
  title: string
  summary: string
  content: string
  coverImage: string
  date: string
  tag: string
  author: string
  readTime: string
}

export const staticBlogPosts: BlogPostItem[] = [
  {
    id: 'how-scrap-metal-prices-are-set',
    slug: 'how-scrap-metal-prices-are-set',
    title: 'How Scrap Metal Prices Are Set (and How to Get More)',
    summary: 'Understand the factors behind ferrous and non-ferrous pricing so you can time your pickups and maximize earnings.',
    date: 'Jun 28, 2023',
    tag: 'Pricing',
    coverImage: '/industry-manufacturing.png',
    author: 'Al Adnan Metals Team',
    readTime: '4 min read',
    content: `
      <p class="text-lg leading-relaxed text-foreground/90">
        Navigating scrap metal pricing in Dubai and across the UAE requires understanding global commodity trends, local supply dynamics, and metal purity grades. Whether you run a manufacturing plant or have a site clearing project, knowing how rates are calculated helps you maximize returns.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">1. Global Commodity Exchanges (LME)</h2>
      <p class="leading-relaxed text-muted-foreground mb-4">
        Base metal rates—especially copper, aluminium, brass, and nickel—are anchored to the London Metal Exchange (LME). Daily spot rates shift based on global manufacturing demand, energy costs, and shipping routes.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">2. Metal Purity & Sorting Grade</h2>
      <p class="leading-relaxed text-muted-foreground mb-4">
        Clean, sorted metals yield significantly higher value per kilogram compared to mixed batches. For instance:
      </p>
      <ul class="list-disc pl-6 space-y-2 text-muted-foreground mb-6">
        <li><strong>Bright Bare Copper:</strong> Uncoated, unalloyed wire fetches top market rates.</li>
        <li><strong>Heavy Melting Steel (HMS 1 & 2):</strong> Dense industrial steel yields higher rates than light sheet metal.</li>
        <li><strong>Clean Aluminium Extrusions:</strong> Free from iron screws or rubber gasketsCommands premium prices.</li>
      </ul>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">3. Weight & Volume Scale</h2>
      <p class="leading-relaxed text-muted-foreground mb-4">
        Bulk quantities justify dedicated transport and crew logistics, enabling recyclers to offer enhanced bulk rates. Certified digital weighing at the point of pickup guarantees 100% transparency.
      </p>

      <blockquote class="border-l-4 border-gold bg-secondary/50 p-4 rounded-r-lg my-6 text-foreground font-medium italic">
        "Sorting your copper tubing from brass fittings before collection can increase total payout value by up to 25%."
      </blockquote>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">How to Maximize Your Payout</h2>
      <ol class="list-decimal pl-6 space-y-2 text-muted-foreground mb-6">
        <li>Separate non-ferrous metals (copper, aluminium, brass) from steel and iron.</li>
        <li>Strip heavy insulation off high-grade electrical cables when practical.</li>
        <li>Consolidate scrap into single pickup sessions for bulk pricing tiers.</li>
      </ol>
    `,
  },
  {
    id: 'a-business-guide-to-responsible-e-waste-recycling',
    slug: 'a-business-guide-to-responsible-e-waste-recycling',
    title: 'A Business Guide to Responsible E-Waste Recycling',
    summary: 'From data destruction to environmental compliance certification, here is what every company in the UAE should know.',
    date: 'Jul 2, 2023',
    tag: 'E-Waste',
    coverImage: '/e-waste.jpg',
    author: 'Al Adnan Compliance Dept.',
    readTime: '5 min read',
    content: `
      <p class="text-lg leading-relaxed text-foreground/90">
        Electronic waste is the fastest-growing waste stream worldwide. For businesses upgrading IT infrastructure, retiring server racks, or disposing of office electronics in Dubai, compliant recycling protects both data security and environmental sustainability.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Certified Data Destruction</h2>
      <p class="leading-relaxed text-muted-foreground mb-4">
        Throwing retired hard drives or desktop units into general disposal poses immense data breach risks. Certified electronic recycling ensures hard drives undergo physical degaussing or shredding, with certificates of destruction issued upon request.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">What E-Waste We Accept</h2>
      <div class="grid sm:grid-cols-2 gap-4 my-6">
        <div class="p-4 border border-border rounded-xl bg-card">
          <h4 class="font-bold text-foreground mb-1">IT Equipment</h4>
          <p class="text-xs text-muted-foreground">Servers, desktops, laptops, network switches, routers, monitors.</p>
        </div>
        <div class="p-4 border border-border rounded-xl bg-card">
          <h4 class="font-bold text-foreground mb-1">Office Electronics</h4>
          <p class="text-xs text-muted-foreground">Printers, UPS batteries, photocopiers, telecoms systems.</p>
        </div>
      </div>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Environmental Impact & Recovery</h2>
      <p class="leading-relaxed text-muted-foreground mb-4">
        Circuit boards contain gold, silver, copper, and palladium. Safe smelting extracts precious metals while safely isolating hazardous lead and mercury, supporting circular economy practices across the UAE.
      </p>
    `,
  },
  {
    id: 'clearing-a-construction-site-scrap-removal-checklist',
    slug: 'clearing-a-construction-site-scrap-removal-checklist',
    title: 'Clearing a Construction Site: Scrap Removal Checklist',
    summary: 'Keep your site safe and compliant with a structured staging, sorting, and pickup workflow for demolition scrap.',
    date: 'Jul 4, 2023',
    tag: 'Construction',
    coverImage: '/industry-construction.png',
    author: 'Operations Team',
    readTime: '4 min read',
    content: `
      <p class="text-lg leading-relaxed text-foreground/90">
        Construction and demolition projects generate tons of rebar, structural steel beams, copper piping, and electrical conduits. Efficient scrap management keeps job sites hazard-free and returns capital back into your project budget.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Site Clearing Action Plan</h2>
      <ul class="space-y-3 text-muted-foreground mb-6">
        <li class="flex items-start gap-3">
          <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground text-xs font-bold">1</span>
          <span><strong>Designate Staging Bins:</strong> Place dedicated skip containers for ferrous steel vs non-ferrous copper/aluminium.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground text-xs font-bold">2</span>
          <span><strong>Bundle Rebar & Structural Beams:</strong> Strap long steel sections to streamline crane and flatbed loading.</span>
        </li>
        <li class="flex items-start gap-3">
          <span class="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold text-gold-foreground text-xs font-bold">3</span>
          <span><strong>Schedule On-Demand Haulage:</strong> Avoid site clutter by calling same-day collection trucks before staging areas overflow.</span>
        </li>
      </ul>
    `,
  },
  {
    id: 'ferrous-vs-non-ferrous-know-your-metals',
    slug: 'ferrous-vs-non-ferrous-know-your-metals',
    title: 'Ferrous vs Non-Ferrous: Know Your Metals',
    summary: 'A simple guide to identifying magnetic steel vs non-magnetic copper, aluminium, and brass to maximize scrap returns.',
    date: 'Jul 5, 2023',
    tag: 'Guide',
    coverImage: '/about-2.png',
    author: 'Al Adnan Metals Team',
    readTime: '3 min read',
    content: `
      <p class="text-lg leading-relaxed text-foreground/90">
        The simplest test in scrap recycling is the magnet test. Understanding whether your metal is ferrous or non-ferrous helps you estimate value instantly.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Ferrous Metals (Magnetic)</h2>
      <p class="leading-relaxed text-muted-foreground mb-4">
        Contains iron. Highly durable, magnetic, and susceptible to rust. Examples include structural steel, cast iron pipes, rebar, and motor blocks.
      </p>

      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Non-Ferrous Metals (Non-Magnetic)</h2>
      <p class="leading-relaxed text-muted-foreground mb-4">
        Does not contain iron. Resistant to corrosion and significantly higher in monetary value per kg. Examples include copper wiring, aluminium window frames, brass valves, and stainless steel (304/316).
      </p>
    `,
  },
  {
    id: 'what-happens-to-your-old-appliances-after-pickup',
    slug: 'what-happens-to-your-old-appliances-after-pickup',
    title: 'What Happens to Your Old Appliances After Pickup',
    summary: 'Follow refrigerators, air conditioners, and washing machines through certified recovery and material processing.',
    date: 'Jul 7, 2023',
    tag: 'Appliances',
    coverImage: '/appliance.jpg',
    author: 'Recycling Facilities Team',
    readTime: '4 min read',
    content: `
      <p class="text-lg leading-relaxed text-foreground/90">
        When we pick up old refrigerators, washing machines, or HVAC units in Dubai, every unit undergoes careful dismantling to recover copper compressors, aluminium coils, and heavy steel housing.
      </p>
      <h2 class="text-2xl font-bold text-foreground mt-8 mb-4">Safe Refrigerant Evacuation</h2>
      <p class="leading-relaxed text-muted-foreground mb-4">
        Compressors from fridges and air conditioners contain refrigerants (R22, R134a, R410a). Our certified process captures gases safely before shredding the metal frames.
      </p>
    `,
  },
  {
    id: 'salvage-yard-trends-shaping-auto-recycling',
    slug: 'salvage-yard-trends-shaping-auto-recycling',
    title: 'Salvage Yard Trends Shaping Auto Recycling',
    summary: 'How catalytic converter recovery, EV battery recycling, and scrap vehicle processing are advancing in the UAE.',
    date: 'Jul 8, 2023',
    tag: 'Automotive',
    coverImage: '/industry-automotive.png',
    author: 'Auto Salvage Division',
    readTime: '5 min read',
    content: `
      <p class="text-lg leading-relaxed text-foreground/90">
        End-of-life vehicles (ELVs) represent high-value recycling opportunities. From catalytic converters rich in platinum to heavy engine blocks and aluminium rims, auto scrap processing is more advanced than ever.
      </p>
    `,
  },
]

export function getStaticPostBySlugOrId(identifier: string): BlogPostItem | undefined {
  return staticBlogPosts.find(
    (p) => p.slug === identifier || p.id === identifier,
  )
}
