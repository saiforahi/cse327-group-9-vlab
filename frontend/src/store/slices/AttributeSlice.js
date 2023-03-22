import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'

const initialState = {
  data:[],
  status:'idle',
  error:''
}

export const fetchAttributes = createAsyncThunk('attributes/fetchAttributes', async (user_id) => {
  const response = await JsonClient.get('attributes')
  return response.data
})

export const attributeSlice = createSlice({
  name: 'attributes',
  initialState,
  reducers: {
  },
  extraReducers: {
    [fetchAttributes.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchAttributes.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchAttributes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { push_item} = attributeSlice.actions
export default attributeSlice.reducer
