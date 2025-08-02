"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, CheckCircle, XCircle, Trash2, Eye } from "lucide-react"
import Link from "next/link"

export default function AdminPropertiesPage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('http://localhost:3001/properties')
        const data = await response.json()
        setProperties(data)
      } catch (error) {
        console.error('Error fetching properties:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProperties()
  }, [])

  const handleApproveProperty = async (propertyId) => {
    try {
      await fetch(`http://localhost:3001/properties/${propertyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: true })
      })
      
      setProperties(prev => 
        prev.map(property => 
          property.id === propertyId ? { ...property, verified: true } : property
        )
      )
    } catch (error) {
      console.error('Error approving property:', error)
    }
  }

  const handleRejectProperty = async (propertyId) => {
    try {
      await fetch(`http://localhost:3001/properties/${propertyId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verified: false })
      })
      
      setProperties(prev => 
        prev.map(property => 
          property.id === propertyId ? { ...property, verified: false } : property
        )
      )
    } catch (error) {
      console.error('Error rejecting property:', error)
    }
  }

  const handleDeleteProperty = async (propertyId) => {
    if (confirm('Are you sure you want to delete this property?')) {
      try {
        await fetch(`http://localhost:3001/properties/${propertyId}`, {
          method: 'DELETE'
        })
        
        setProperties(prev => prev.filter(property => property.id !== propertyId))
        alert('Property deleted successfully!')
      } catch (error) {
        console.error('Error deleting property:', error)
        alert('Failed to delete property')
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-300 h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Property Management</h1>
        <p className="text-gray-600">Manage all properties in the system</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="h-5 w-5 mr-2" />
            All Properties ({properties.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties.map(property => (
              <div key={property.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <img 
                      src={property.images?.[0] || "/placeholder.jpg"} 
                      alt={property.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-semibold">{property.title}</h3>
                      <p className="text-sm text-gray-600">{property.city} • {property.type}</p>
                      <p className="text-sm text-gray-600">${property.price}/month</p>
                      <p className="text-xs text-gray-500">Posted: {property.datePosted}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Badge variant={property.verified ? "default" : "secondary"}>
                    {property.verified ? (
                      <><CheckCircle className="w-3 h-3 mr-1" />Verified</>
                    ) : (
                      <><XCircle className="w-3 h-3 mr-1" />Pending</>
                    )}
                  </Badge>
                  
                  <Badge variant={property.availability === 'Available' ? 'default' : 'outline'}>
                    {property.availability}
                  </Badge>
                  
                  <div className="flex gap-1">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/properties/${property.id}`}>
                        <Eye className="h-3 w-3" />
                      </Link>
                    </Button>
                    
                    {!property.verified ? (
                      <Button 
                        size="sm" 
                        onClick={() => handleApproveProperty(property.id)}
                      >
                        Approve
                      </Button>
                    ) : (
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleRejectProperty(property.id)}
                      >
                        Reject
                      </Button>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}