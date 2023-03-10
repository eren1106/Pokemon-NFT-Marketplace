import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define a type for the slice state
interface SidebarState {
  isClosed: boolean
}

var screenWidth = window.innerWidth;

// Define the initial state using that type
const initialState: SidebarState = {
  isClosed: screenWidth < 768,
}

export const sidebarSlice = createSlice({
  name: 'sidebar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setClose: (state, action: PayloadAction<boolean>) => {
      state.isClosed = action.payload;
    }
  }
})

export const { setClose } = sidebarSlice.actions

export default sidebarSlice.reducer