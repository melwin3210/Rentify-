import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  properties: [],
  topProperties: [],
  recentProperties: [],
  selectedProperty: null,
  loading: false,
  filters: {
    city: "",
    type: "",
    minPrice: 0,
    maxPrice: 5000,
  },
}

const propertySlice = createSlice({
  name: "properties",
  initialState,
  reducers: {
    setProperties: (state, action) => {
      state.properties = action.payload
    },
    setTopProperties: (state, action) => {
      state.topProperties = action.payload
    },
    setRecentProperties: (state, action) => {
      state.recentProperties = action.payload
    },
    setSelectedProperty: (state, action) => {
      state.selectedProperty = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload }
    },
  },
})

export const { setProperties, setTopProperties, setRecentProperties, setSelectedProperty, setLoading, setFilters } =
  propertySlice.actions
export default propertySlice.reducer
