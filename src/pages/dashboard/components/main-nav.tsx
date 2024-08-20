import { NavLink } from 'react-router-dom'

import { cn } from '@/lib/utils'

const navConfig = [
  {
    label: 'Overview',
    to: '/dashboard'
  },
  {
    label: 'Customers',
    to: '/customers'
  },
  {
    label: 'Products',
    to: '/products'
  },
  {
    label: 'Settings',
    to: '/settings'
  }
]

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      {navConfig.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive, isPending }) =>
            cn(
              'text-sm font-medium transition-colors',
              isActive || isPending
                ? 'text-primary'
                : 'text-muted-foreground hover:text-primary'
            )
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
