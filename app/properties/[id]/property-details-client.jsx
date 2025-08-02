"use client"

import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, CheckCircle, XCircle, User, Phone, Mail, Clock } from "lucide-react"
import Link from "next/link"

export default function PropertyDetailsClient({ params }) {
  const { user, isAuthenticated } = useSelector(state => state.auth)
  const [property, setProperty] = useState(null)
  const [owner, setOwner] = useState(null)
  const [loading, setLoading] = useState(true)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [message, setMessage] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [appointmentId, setAppointmentId] = useState(null)

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      try {
        const propertyResponse = await fetch(`http://localhost:3001/properties/${params.id}`)
        const propertyData = await propertyResponse.json()
        setProperty(propertyData)

        const ownerResponse = await fetch(`http://localhost:3001/users/${propertyData.ownerId}`)
        const ownerData = await ownerResponse.json()
        setOwner(ownerData)
      } catch (error) {
        console.error('Error fetching property details:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchPropertyDetails()
    }
  }, [params.id])

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time for your appointment')
      return
    }

    setBookingLoading(true)
    try {
      const appointment = {
        propertyId: property?.id,
        userId: user.id,
        ownerId: property?.ownerId,
        status: 'pending',
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        message: message,
        timestamp: new Date().toISOString()
      }

      const response = await fetch('http://localhost:3001/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointment)
      })

      if (response.ok) {
        const appointmentData = await response.json()
        setAppointmentId(appointmentData.id)
        setBookingSuccess(true)
        setShowBookingForm(false)
      } else {
        throw new Error('Failed to book appointment')
      }
    } catch (error) {
      console.error('Error booking appointment:', error)
      alert('❌ Failed to book appointment. Please try again.')
    } finally {
      setBookingLoading(false)
    }
  }

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const getMaxDate = () => {
    const maxDate = new Date()
    maxDate.setDate(maxDate.getDate() + 30)
    return maxDate.toISOString().split('T')[0]
  }

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', 
    '14:00', '15:00', '16:00', '17:00', '18:00'
  ]

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="bg-gray-300 h-64 rounded-lg"></div>
          <div className="space-y-2">
            <div className="bg-gray-300 h-8 rounded w-3/4"></div>
            <div className="bg-gray-300 h-4 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
          <p className="text-gray-600">The property you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-4">
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={property.images[0] || "/placeholder.svg"}
                alt={property.title}
                fill
                className="object-cover"
              />
              {property.highlight && (
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                  Featured
                </Badge>
              )}
            </div>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{property.title}</CardTitle>
                <Badge variant={property.verified ? "default" : "secondary"}>
                  {property.verified ? (
                    <><CheckCircle className="w-3 h-3 mr-1" />Verified</>
                  ) : (
                    <><XCircle className="w-3 h-3 mr-1" />Unverified</>
                  )}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                {property.city} • {property.type}
              </div>
              <p className="text-gray-700">{property.description}</p>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <div className="text-3xl font-bold text-primary">${property.price}</div>
                  <div className="text-sm text-gray-600">per month</div>
                </div>
                <Badge
                  variant={property.availability === "Available" ? "default" : "secondary"}
                  className={property.availability === "Available" ? "bg-green-500" : "bg-gray-500"}
                >
                  {property.availability}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {owner && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Property Owner
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="font-semibold">{owner.name}</div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {owner.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {owner.phone}
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Book a Viewing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isAuthenticated ? (
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 mb-2">Please login to book an appointment</p>
                  <Button asChild variant="outline">
                    <Link href="/login">Login Now</Link>
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 mb-4">Schedule a viewing with the property owner</p>
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Viewing
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}