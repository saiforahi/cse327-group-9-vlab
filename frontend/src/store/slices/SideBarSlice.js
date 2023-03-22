import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  sidebarShow: 'responsive'
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeState: (state,val) => {
      console.log('dispatching ----- ',val)
      state.sidebarShow = val.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeState} = sidebarSlice.actions

export default sidebarSlice.reducer