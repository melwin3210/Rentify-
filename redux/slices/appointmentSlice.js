import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  appointments: [],
  userAppointments: [],
  ownerAppointments: [],
  loading: false,
}

const appointmentSlice = createSlice({
  name: "appointments",
  initialState,
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload
    },
    setUserAppointments: (state, action) => {
      state.userAppointments = action.payload
    },
    setOwnerAppointments: (state, action) => {
      state.ownerAppointments = action.payload
    },
    addAppointment: (state, action) => {
      state.appointments.push(action.payload)
      state.userAppointments.push(action.payload)
    },
    updateAppointment: (state, action) => {
      const index = state.appointments.findIndex((apt) => apt.id === action.payload.id)
      if (index !== -1) {
        state.appointments[index] = action.payload
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
  },
})

export const {
  setAppointments,
  setUserAppointments,
  setOwnerAppointments,
  addAppointment,
  updateAppointment,
  setLoading,
} = appointmentSlice.actions
export default appointmentSlice.reducer
