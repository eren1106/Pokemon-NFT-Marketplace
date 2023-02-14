import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
// Define a type for the slice state
interface SelectedTitleState {
  title: string
}

// Define the initial state using that type
const initialState: SelectedTitleState = {
  title: "Home",
}

export const selectedTitleSlice = createSlice({
  name: 'selectedTitle',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    }
  }
})

export const { setTitle } = selectedTitleSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.selectedTitle.title

export default selectedTitleSlice.reducer