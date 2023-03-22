import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'
import sortBy from 'lodash/sortBy';

const initialState = {
  data:{
    wallet: {}
  },
  status:'idle',
  error:''
}
export const fetchUserData = createAsyncThunk('auth/fetchUserData', async () => {
    const response = await JsonClient.get('user')
    return response.data
}
)
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state,action){
        state.data=action.payload
    }
  },
  extraReducers: {
    [fetchUserData.pending]: (state, action) => {
        state.status = 'loading'
    },
    [fetchUserData.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.data = action.payload
    },
    [fetchUserData.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
    },
  }
})

// Action creators are generated for each case reducer function
export const { setUser} = authSlice.actions
export default authSlice.reducer
