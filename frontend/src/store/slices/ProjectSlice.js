import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'
import sortBy from 'lodash/sortBy';

const initialState = {
  data:[],
  status:'idle',
  error:''
}

export const fetchProjects = createAsyncThunk('brand/fetchProjects', async () => {
  const response = await JsonClient.get('projects/manage/')
  return response.data
})

export const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchProjects.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchProjects.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchProjects.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { push_item } = projectSlice.actions
export default projectSlice.reducer
