import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'

const initialState = {
  data: {
    countryList: [],
    divisionList: [],
    districtList: [],
    thanaList: [],
    unionList: []
  },
  status:'idle',
  error:''
}

export const fetchGeocodes = createAsyncThunk('allgeocode/fetchGeocodes', async (user_id) => {
  const response = await JsonClient.get('geocode')
  return response.data
})

export const geocodeSlice = createSlice({
  name: 'geocodes',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchGeocodes.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchGeocodes.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchGeocodes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { push_item} = geocodeSlice.actions
export default geocodeSlice.reducer
