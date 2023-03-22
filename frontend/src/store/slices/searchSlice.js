import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import { JsonClient } from '../../Config'
import sortBy from 'lodash/sortBy';

const initialState = {
  data:[],
  suggestions:[],
  status:'idle',
  error:'',
  isModalOpen:false
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    manage_modal: (state,val) => {
        console.log('dispatching ----- ',val)
        state.isModalOpen = val.payload
    },
  },
  extraReducers: {
    
  }

})

// Action creators are generated for each case reducer function
export const { manage_modal} = searchSlice.actions
export default searchSlice.reducer
