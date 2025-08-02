import { render, screen } from '@testing-library/react'
import { PropertyCard } from '@/components/properties/property-card'

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }) {
    return <img src={src} alt={alt} {...props} />
  }
})

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }) {
    return <a href={href}>{children}</a>
  }
})

const mockProperty = {
  id: '1',
  title: 'Luxury Apartment in Downtown',
  description: 'Beautiful apartment with modern amenities',
  city: 'New York',
  type: 'Apartment',
  price: 2500,
  images: ['https://example.com/image1.jpg'],
  availability: 'Available',
  verified: true,
  highlight: false,
  datePosted: '2025-01-01'
}

describe('PropertyCard Component', () => {
  it('renders property information correctly', () => {
    render(<PropertyCard property={mockProperty} />)
    
    expect(screen.getByText('Luxury Apartment in Downtown')).toBeInTheDocument()
    expect(screen.getByText('New York • Apartment')).toBeInTheDocument()
    expect(screen.getByText('$2500')).toBeInTheDocument()
    expect(screen.getByText('per month')).toBeInTheDocument()
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('displays verified badge when property is verified', () => {
    render(<PropertyCard property={mockProperty} />)
    expect(screen.getByText('Verified')).toBeInTheDocument()
  })

  it('displays unverified badge when property is not verified', () => {
    const unverifiedProperty = { ...mockProperty, verified: false }
    render(<PropertyCard property={unverifiedProperty} />)
    expect(screen.getByText('Unverified')).toBeInTheDocument()
  })

  it('shows featured badge for highlighted properties', () => {
    const featuredProperty = { ...mockProperty, highlight: true }
    render(<PropertyCard property={featuredProperty} />)
    expect(screen.getByText('Featured')).toBeInTheDocument()
  })

  it('renders property image with correct alt text', () => {
    render(<PropertyCard property={mockProperty} />)
    const image = screen.getByAltText('Luxury Apartment in Downtown')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/image1.jpg')
  })

  it('creates correct link to property details', () => {
    render(<PropertyCard property={mockProperty} />)
    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/properties/1')
  })

  it('handles unavailable properties', () => {
    const unavailableProperty = { ...mockProperty, availability: 'Not Available' }
    render(<PropertyCard property={unavailableProperty} />)
    expect(screen.getByText('Not Available')).toBeInTheDocument()
  })
})