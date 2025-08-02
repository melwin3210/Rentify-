export const metadata = {
  title: 'My Appointments - Rentify',
  description: 'View and manage your property viewing appointments',
}

export default function AppointmentsLayout({ children }) {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}