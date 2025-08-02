import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Admin Dashboard - Rentify',
  description: 'Administrative dashboard for managing users, properties, and platform content',
}

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-muted/10">
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}