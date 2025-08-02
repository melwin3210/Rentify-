import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

// Simple booking form component for testing
function BookingForm({ onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    onSubmit({
      date: formData.get('date'),
      time: formData.get('time'),
      message: formData.get('message')
    })
  }

  return (
    <form onSubmit={handleSubmit} data-testid="booking-form">
      <div>
        <label htmlFor="date">Select Date</label>
        <input type="date" id="date" name="date" required />
      </div>
      
      <div>
        <label htmlFor="time">Select Time</label>
        <select id="time" name="time" required>
          <option value="">Choose time</option>
          <option value="09:00">09:00</option>
          <option value="10:00">10:00</option>
          <option value="11:00">11:00</option>
        </select>
      </div>
      
      <div>
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" placeholder="Optional message" />
      </div>
      
      <button type="submit">Book Appointment</button>
    </form>
  )
}

describe('BookingForm Component', () => {
  it('renders booking form fields', () => {
    render(<BookingForm onSubmit={jest.fn()} />)
    
    expect(screen.getByLabelText('Select Date')).toBeInTheDocument()
    expect(screen.getByLabelText('Select Time')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Book Appointment' })).toBeInTheDocument()
  })

  it('allows user to fill form fields', async () => {
    const user = userEvent.setup()
    render(<BookingForm onSubmit={jest.fn()} />)
    
    const dateInput = screen.getByLabelText('Select Date')
    const timeSelect = screen.getByLabelText('Select Time')
    const messageInput = screen.getByLabelText('Message')
    
    await user.type(dateInput, '2025-12-25')
    await user.selectOptions(timeSelect, '09:00')
    await user.type(messageInput, 'Test message')
    
    expect(dateInput).toHaveValue('2025-12-25')
    expect(timeSelect).toHaveValue('09:00')
    expect(messageInput).toHaveValue('Test message')
  })

  it('calls onSubmit with form data when submitted', async () => {
    const mockSubmit = jest.fn()
    const user = userEvent.setup()
    
    render(<BookingForm onSubmit={mockSubmit} />)
    
    await user.type(screen.getByLabelText('Select Date'), '2025-12-25')
    await user.selectOptions(screen.getByLabelText('Select Time'), '09:00')
    await user.type(screen.getByLabelText('Message'), 'Test message')
    
    await user.click(screen.getByRole('button', { name: 'Book Appointment' }))
    
    expect(mockSubmit).toHaveBeenCalledWith({
      date: '2025-12-25',
      time: '09:00',
      message: 'Test message'
    })
  })

  it('requires date and time fields', async () => {
    const mockSubmit = jest.fn()
    const user = userEvent.setup()
    
    render(<BookingForm onSubmit={mockSubmit} />)
    
    await user.click(screen.getByRole('button', { name: 'Book Appointment' }))
    
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('submits form without message if not provided', async () => {
    const mockSubmit = jest.fn()
    const user = userEvent.setup()
    
    render(<BookingForm onSubmit={mockSubmit} />)
    
    await user.type(screen.getByLabelText('Select Date'), '2025-12-25')
    await user.selectOptions(screen.getByLabelText('Select Time'), '10:00')
    
    await user.click(screen.getByRole('button', { name: 'Book Appointment' }))
    
    expect(mockSubmit).toHaveBeenCalledWith({
      date: '2025-12-25',
      time: '10:00',
      message: ''
    })
  })
})