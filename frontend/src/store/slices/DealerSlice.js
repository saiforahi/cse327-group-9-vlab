import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'
import sortBy from 'lodash/sortBy';

const initialState = {
  data:[],
  status:'idle',
  error:''
}

export const fetchDealers = createAsyncThunk('dealers/fetchDealers', async () => {
  const response = await JsonClient.get('dealer/all')
  return response.data
})

export const dealerSlice = createSlice({
  name: 'dealers',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchDealers.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchDealers.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchDealers.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { push_item} = dealerSlice.actions
export default dealerSlice.reducer
