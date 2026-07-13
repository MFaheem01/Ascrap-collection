import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  align = 'center',
  onDark = false,
  className,
}: {
  eyebrow: string
  title: string
  align?: 'center' | 'left'
  onDark?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      <span className="font-script text-2xl leading-none text-gold">
        {eyebrow}
      </span>
      <h2
        className={cn(
          'text-3xl font-extrabold tracking-tight text-balance sm:text-4xl',
          onDark ? 'text-brand-green-foreground' : 'text-foreground',
        )}
      >
        {title}
      </h2>
    </div>
  )
}
