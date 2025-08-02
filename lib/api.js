const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api'
  : 'http://localhost:3001'

export const api = {
  // Users
  getUsers: () => fetch(`${API_BASE_URL}/users`).then(res => res.json()),
  getUser: (id) => fetch(`${API_BASE_URL}/users/${id}`),
  createUser: (data) => fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  updateUser: (id, data) => fetch(`${API_BASE_URL}/users/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  deleteUser: (id) => fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' }),

  // Properties
  getProperties: () => fetch(`${API_BASE_URL}/properties`).then(res => res.json()),
  getProperty: (id) => fetch(`${API_BASE_URL}/properties/${id}`),
  createProperty: (data) => fetch(`${API_BASE_URL}/properties`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  updateProperty: (id, data) => fetch(`${API_BASE_URL}/properties/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  patchProperty: (id, data) => fetch(`${API_BASE_URL}/properties/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }),
  deleteProperty: (id) => fetch(`${API_BASE_URL}/properties/${id}`, { method: 'DELETE' }),

  // Appointments
  getAppointments: () => fetch(`${API_BASE_URL}/appointments`).then(res => res.json()),
  createAppointment: (data) => fetch(`${API_BASE_URL}/appointments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}