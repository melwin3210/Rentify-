import { notFound } from 'next/navigation'
import PropertyDetailsClient from './property-details-client'

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  try {
    const response = await fetch(`http://localhost:3001/properties/${resolvedParams.id}`)
    if (!response.ok) return { title: 'Property Not Found' }
    
    const property = await response.json()
    return {
      title: `${property.title} - Rentify`,
      description: `${property.description} Located in ${property.city}. $${property.price}/month`,
      openGraph: {
        title: property.title,
        description: property.description,
        images: property.images,
      },
    }
  } catch {
    return { title: 'Property Details - Rentify' }
  }
}

export default async function PropertyDetailsPage({ params }) {
  const resolvedParams = await params
  try {
    const response = await fetch(`http://localhost:3001/properties/${resolvedParams.id}`)
    if (!response.ok) notFound()
    
    return <PropertyDetailsClient params={resolvedParams} />
  } catch {
    notFound()
  }
}