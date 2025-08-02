import { render, screen } from '@testing-library/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

describe('Card Component', () => {
  it('renders card with content', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Title</CardTitle>
        </CardHeader>
        <CardContent>Test content</CardContent>
      </Card>
    )
    
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Card className="custom-class" data-testid="card">Content</Card>)
    expect(screen.getByTestId('card')).toHaveClass('custom-class')
  })
})