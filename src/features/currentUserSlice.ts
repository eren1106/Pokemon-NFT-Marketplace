import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../constant/userInterface'
// Define a type for the slice state
interface CurrentUserState {
  currentUser: User | null;
}

// Define the initial state using that type
const initialState: CurrentUserState = {
  currentUser: null,
}

export const currentUserSlice = createSlice({
  name: 'currentUser',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    }
  }
})

export const { setCurrentUser } = currentUserSlice.actions

export default currentUserSlice.reducer