'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Home, User, Calendar, Settings, Building } from 'lucide-react'

export default function Navigation({ className }) {
  const pathname = usePathname()

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Properties', href: '/properties', icon: Building },
    { name: 'Owners', href: '/owners', icon: User },
    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'Admin', href: '/admin', icon: Settings },
  ]

  return (
    <nav className={cn('flex space-x-6', className)}>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            )}
          >
            <item.icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}