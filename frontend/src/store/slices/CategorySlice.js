import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'

const initialState = {
  data:[],
  status:'idle',
  error:''
}

export const fetchCategories = createAsyncThunk('category/fetchCategories', async (user_id) => {
  const response = await JsonClient.get('categories')
  return response.data
})

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchCategories.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { push_item} = categorySlice.actions
export default categorySlice.reducer
