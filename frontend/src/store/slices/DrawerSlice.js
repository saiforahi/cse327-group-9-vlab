import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  open: true
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    changeState: (state,val) => {
      console.log('dispatching ----- ',val)
      state.open = val.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeState} = drawerSlice.actions

export default drawerSlice.reducer