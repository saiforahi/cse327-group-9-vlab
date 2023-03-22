import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'

const initialState = {
  data:[],
  status:'idle',
  error:''
}

export const fetchProductGroups = createAsyncThunk('productGroup/fetchProductGroup', async (user_id) => {
  const response = await JsonClient.get('product/groups')
  return response.data
})

export const productGroupSlice = createSlice({
  name: 'productgroups',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchProductGroups.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchProductGroups.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchProductGroups.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { push_item} = productGroupSlice.actions
export default productGroupSlice.reducer
