import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'
import sortBy from 'lodash/sortBy';

const initialState = {
  data:[],
  status:'idle',
  error:''
}

export const fetchSubCategories = createAsyncThunk('subcategories/fetchSubcategories', async (user_id) => {
  const response = await JsonClient.get('sub-categories')
  return response.data
})

export const subcategorySlice = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {

  },
  extraReducers: {
    [fetchSubCategories.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchSubCategories.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchSubCategories.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { push_item} = subcategorySlice.actions
export default subcategorySlice.reducer
