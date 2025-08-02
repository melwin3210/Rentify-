export const metadata = {
  title: 'Owner Dashboard - Rentify',
  description: 'Manage your properties and appointments as a property owner',
}

export default function OwnersLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}