import { cn } from '@/lib/utils'

export default function LayoutWrapper({ 
  children, 
  className,
  maxWidth = 'max-w-7xl',
  padding = 'px-4 sm:px-6 lg:px-8'
}) {
  return (
    <div className={cn('mx-auto w-full', maxWidth, padding, className)}>
      {children}
    </div>
  )
}

export function PageHeader({ title, description, children, className }) {
  return (
    <div className={cn('border-b bg-muted/40 py-8', className)}>
      <LayoutWrapper>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {children && <div className="flex items-center space-x-2">{children}</div>}
        </div>
      </LayoutWrapper>
    </div>
  )
}

export function PageContent({ children, className }) {
  return (
    <div className={cn('py-8', className)}>
      <LayoutWrapper>
        {children}
      </LayoutWrapper>
    </div>
  )
}