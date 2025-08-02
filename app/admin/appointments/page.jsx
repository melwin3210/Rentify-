"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, CheckCircle, XCircle, AlertCircle, User } from "lucide-react"

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const [appointmentsRes, propertiesRes, usersRes] = await Promise.all([
          fetch('http://localhost:3001/appointments'),
          fetch('http://localhost:3001/properties'),
          fetch('http://localhost:3001/users')
        ])

        const appointmentsData = await appointmentsRes.json()
        const propertiesData = await propertiesRes.json()
        const usersData = await usersRes.json()

        const enrichedAppointments = appointmentsData.map(apt => {
          const property = propertiesData.find(p => p.id == apt.propertyId)
          const user = usersData.find(u => u.id == apt.userId)
          return { ...apt, property, user }
        })

        setAppointments(enrichedAppointments)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [])

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-32 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">All Appointments</h1>
        <p className="text-gray-600">View all property viewing appointments</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            All Appointments ({appointments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {appointments.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No appointments found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {appointment.property?.title || "Property"}
                      </h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {appointment.user?.name || "Unknown User"}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {appointment.property?.city} • {appointment.property?.type}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(appointment.status)}
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </div>
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span className="font-medium">Scheduled Date:</span>
                      </div>
                      <div className="ml-6">
                        {new Date(appointment.scheduledDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center text-gray-600">
                        <Clock className="h-4 w-4 mr-2" />
                        <span className="font-medium">Booked On:</span>
                      </div>
                      <div className="ml-6">
                        {new Date(appointment.timestamp).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-gray-600 font-medium">Contact Info:</div>
                      <div className="ml-0 space-y-1">
                        <div>{appointment.user?.email || "No email"}</div>
                        <div>{appointment.user?.phone || "No phone"}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>Appointment ID: #{appointment.id}</span>
                      <span className="font-semibold text-primary">
                        ${appointment.property?.price}/month
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}