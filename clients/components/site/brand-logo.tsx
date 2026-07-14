import Link from 'next/link'
import { cn } from '@/lib/utils'
import brand from '@/public/images/al adnan.png'
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
      <Image src={brand} alt="Logo" width={100} height={100} />
    </Link>
  )
}
