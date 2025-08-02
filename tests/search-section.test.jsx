import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Simple search component for testing
function SearchSection() {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Search submitted')
  }

  return (
    <section>
      <h2>Search Properties</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City</label>
          <input type="text" id="city" placeholder="Enter city" />
        </div>
        
        <div>
          <label htmlFor="type">Property Type</label>
          <select id="type">
            <option value="">Select Type</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="minPrice">Min Price</label>
          <input type="number" id="minPrice" placeholder="500" />
        </div>
        
        <div>
          <label htmlFor="maxPrice">Max Price</label>
          <input type="number" id="maxPrice" placeholder="3000" />
        </div>
        
        <button type="submit">Search</button>
      </form>
    </section>
  )
}

describe('SearchSection Component', () => {
  it('renders search form with all fields', () => {
    render(<SearchSection />)

    expect(screen.getByText('Search Properties')).toBeInTheDocument()
    expect(screen.getByLabelText('City')).toBeInTheDocument()
    expect(screen.getByLabelText('Property Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Min Price')).toBeInTheDocument()
    expect(screen.getByLabelText('Max Price')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument()
  })

  it('allows user to enter city', async () => {
    const user = userEvent.setup()
    render(<SearchSection />)

    const cityInput = screen.getByLabelText('City')
    await user.type(cityInput, 'New York')

    expect(cityInput).toHaveValue('New York')
  })

  it('allows user to select property type', async () => {
    const user = userEvent.setup()
    render(<SearchSection />)

    const typeSelect = screen.getByLabelText('Property Type')
    await user.selectOptions(typeSelect, 'apartment')

    expect(typeSelect).toHaveValue('apartment')
  })

  it('allows user to enter price range', async () => {
    const user = userEvent.setup()
    render(<SearchSection />)

    const minPriceInput = screen.getByPlaceholderText('500')
    const maxPriceInput = screen.getByPlaceholderText('3000')

    await user.type(minPriceInput, '1000')
    await user.type(maxPriceInput, '2500')

    expect(minPriceInput).toHaveValue(1000)
    expect(maxPriceInput).toHaveValue(2500)
  })

  it('calls search function when search button is clicked', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation()
    const user = userEvent.setup()
    render(<SearchSection />)

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    expect(consoleSpy).toHaveBeenCalledWith('Search submitted')
    consoleSpy.mockRestore()
  })

  it('displays property type options', () => {
    render(<SearchSection />)

    const typeSelect = screen.getByLabelText('Property Type')
    expect(typeSelect).toBeInTheDocument()
    
    expect(screen.getByText('Apartment')).toBeInTheDocument()
    expect(screen.getByText('House')).toBeInTheDocument()
    expect(screen.getByText('Condo')).toBeInTheDocument()
  })

  it('maintains form values after search', async () => {
    const user = userEvent.setup()
    render(<SearchSection />)

    const cityInput = screen.getByLabelText('City')
    await user.type(cityInput, 'Chicago')

    const searchButton = screen.getByRole('button', { name: /search/i })
    await user.click(searchButton)

    expect(cityInput).toHaveValue('Chicago')
  })
})