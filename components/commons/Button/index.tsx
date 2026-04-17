import Link from 'next/link'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import styles from './Button.module.scss'

const buttonVariants = cva(styles.btn, {
  variants: {
    variant: {
      primary: styles.primary,
      secondary: styles.secondary,
      ghost: styles.ghost,
    },
    size: {
      sm: styles.sm,
      md: styles.md,
      lg: styles.lg,
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type ButtonProps = VariantProps<typeof buttonVariants> & {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit' | 'reset'
  fullWidth?: boolean
  disabled?: boolean
}

export default function Button({
  children,
  href,
  onClick,
  className,
  type = 'button',
  variant,
  size,
  fullWidth = false,
  disabled = false,
}: ButtonProps) {
  const cls = cn(
    buttonVariants({ variant, size }),
    fullWidth && styles.fullWidth,
    className,
  )

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  )
}
