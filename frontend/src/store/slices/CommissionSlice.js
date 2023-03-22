import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'

const initialState = {
  data: {
    dealer_bonus: [],
    tycoon_bonus: [],
    tycoon_group_bonus: [],
    tycoon_star_monthly_bonus: []
  },
  status: 'idle',
  error: ''
}

export const fetchCommission = createAsyncThunk('commission/fetchCommission', async () => {
  const response = await JsonClient.get('commission/all')
  return response.data
})

export const commissionSlice = createSlice({
  name: 'commissions',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchCommission.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCommission.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchCommission.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

// Action creators are generated for each case reducer function
export default commissionSlice.reducer
