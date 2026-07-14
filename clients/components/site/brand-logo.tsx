import Link from 'next/link'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function BrandLogo({
  className,
  onDark = false,
}: {
  className?: string
  onDark?: boolean
}) {
  return (
    <Link href="/" className={cn('flex items-center gap-2.5', className)}>
      <Image src="/al adnan.png" alt="Logo" width={200} height={200} />
    </Link>
  ) 
}
