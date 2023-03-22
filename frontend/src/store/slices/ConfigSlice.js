import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  user_dropdown_header_menu_show: false
}

export const configSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    changeUserDropdownMenuState: (state,val) => {
      state.user_dropdown_header_menu_show = val.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { changeUserDropdownMenuState} = configSlice.actions

export default configSlice.reducer