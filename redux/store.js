import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import propertySlice from "./slices/propertySlice"
import appointmentSlice from "./slices/appointmentSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    properties: propertySlice,
    appointments: appointmentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

// Type exports removed for JavaScript version
