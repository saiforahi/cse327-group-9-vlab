import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'

const initialState = {
  data:[],
  status:'idle',
  error:''
}

export const fetchDashboard = createAsyncThunk('dashbaord/fetchDashboard', async (user_id) => {
  const response = await JsonClient.get('dashboard/get-data')
  return response.data
})

export const categorySlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchDashboard.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchDashboard.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchDashboard.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { push_item} = categorySlice.actions
export default categorySlice.reducer
