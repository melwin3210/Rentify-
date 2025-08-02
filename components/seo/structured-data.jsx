export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Rentify",
    "description": "Find and book rental properties with ease. Connect property owners with tenants.",
    "url": "https://rentify.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://rentify.com/properties?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function PropertyStructuredData({ property }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": property.title,
    "description": property.description,
    "url": `https://rentify.com/properties/${property.id}`,
    "image": property.images,
    "offers": {
      "@type": "Offer",
      "price": property.price,
      "priceCurrency": "USD",
      "availability": property.availability === "Available" ? "InStock" : "OutOfStock"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": property.city
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}