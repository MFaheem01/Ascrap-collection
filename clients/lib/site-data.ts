import {
  Recycle,
  Factory,
  Cpu,
  WashingMachine,
  Package,
  Car,
  type LucideIcon,
} from 'lucide-react'

export const site = {
  name: 'Al Adnan Scrap Buyer',
  phone: '+97156 700 9562',
  email: 'adnannazar143@gmail.com',
  address: '787G+GGQ Dubai - United Arab Emirates',
  hours: '24/7',
}

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

export type Service = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
}

export const services: Service[] = [
  {
    slug: 'scrap-metal-pickup',
    title: 'Scrap Metal Pickup',
    description:
      'Same-day collection of ferrous and non-ferrous metals — steel, aluminum, copper, and brass — straight from your site.',
    icon: Recycle,
  },
  {
    slug: 'industrial-scrap',
    title: 'Industrial Scrap',
    description:
      'Scheduled bulk removal and container service for factories, plants, and manufacturers handling high-volume offcuts.',
    icon: Factory,
  },
  {
    slug: 'e-waste-collection',
    title: 'E-Waste Collection',
    description:
      'Certified recycling of computers, servers, cables, and electronics with secure, documented data destruction.',
    icon: Cpu,
  },
  {
    slug: 'appliance-removal',
    title: 'Appliance Removal',
    description:
      'Hassle-free haul-away of fridges, washers, HVAC units, and white goods with responsible metal recovery.',
    icon: WashingMachine,
  },
  {
    slug: 'cardboard-paper',
    title: 'Cardboard & Paper',
    description:
      'Baled and loose cardboard, office paper, and packaging collected on a route that fits your business.',
    icon: Package,
  },
  {
    slug: 'vehicle-auto-scrap',
    title: 'Vehicle & Auto Scrap',
    description:
      'End-of-life vehicles, engines, catalytic converters, and auto parts picked up with instant fair quotes.',
    icon: Car,
  },
]

export const industries = [
  {
    title: 'Construction Sites',
    description:
      'Rebar, offcuts, and demolition metal cleared so your crews keep moving.',
    image: '/industry-construction.png',
  },
  {
    title: 'Automotive & Salvage',
    description:
      'Scrapped vehicles, parts, and shop metal collected on your schedule.',
    image: '/industry-automotive.png',
  },
  {
    title: 'Manufacturing',
    description:
      'Recurring pickup of production offcuts, shavings, and packaging waste.',
    image: '/industry-manufacturing.png',
  },
]

export const stats = [
  { value: '25+', label: 'Industries Served' },
  { value: '140', label: 'Trained Collectors' },
  { value: '90k', label: 'Tons Recycled' },
  { value: '12k', label: 'Happy Customers' },
]
