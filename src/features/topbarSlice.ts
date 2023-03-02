import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// Define a type for the slice state
interface TopbarState {
  backRoute: string | null,
}

// Define the initial state using that type
const initialState: TopbarState = {
  backRoute: null,
}

export const topbarSlice = createSlice({
  name: 'topbar',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setBackRoute: (state, action: PayloadAction<string | null>) => {
      state.backRoute = action.payload;
    }
  }
})

export const { setBackRoute } = topbarSlice.actions

export default topbarSlice.reducer