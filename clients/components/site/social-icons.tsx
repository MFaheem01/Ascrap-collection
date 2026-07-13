import type { SVGProps } from "react"

type IconProps = SVGProps<SVGSVGElement>

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M14 9h3V6h-3c-1.66 0-3 1.34-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9c0-.55.45-1 1-1z" />
    </svg>
  )
}

export function TwitterIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M18.9 2h3.3l-7.2 8.2L23.5 22h-6.6l-5.2-6.8L5.8 22H2.5l7.7-8.8L1.5 2h6.8l4.7 6.2L18.9 2zm-1.2 18h1.8L7.1 3.9H5.2L17.7 20z" />
    </svg>
  )
}

export function InstagramIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function LinkedinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.2 8.5h3.5V21H3.2V8.5zm5.8 0h3.35v1.7h.05c.47-.85 1.6-1.75 3.3-1.75 3.5 0 4.15 2.15 4.15 4.95V21h-3.5v-5.6c0-1.35-.03-3.05-1.9-3.05-1.9 0-2.2 1.45-2.2 2.95V21H9V8.5z" />
    </svg>
  )
}

export const socialIcons = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  LinkedIn: LinkedinIcon,
}
