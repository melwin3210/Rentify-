export const metadata = {
  title: 'Browse Properties - Rentify',
  description: 'Discover and browse rental properties in your area',
}

export default function PropertiesLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}