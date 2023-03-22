import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'
const initialState = {
  data:{},
  status:'idle',
  error:''
}


export const fetchPersonalDetails = createAsyncThunk('profile/fetchPersonalDetails', async (id) => {
  const response = await JsonClient.get('auth/profile/details/'+id+'/')
  // console.log("wbs/create/", response.data)
  return response.data
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    
  },
  extraReducers: {
    [fetchPersonalDetails.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchPersonalDetails.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      // Add any fetched posts to the array
      state.data = action.payload
    },
    [fetchPersonalDetails.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function

export default profileSlice.reducer
