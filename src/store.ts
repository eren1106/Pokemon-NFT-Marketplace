import { configureStore } from '@reduxjs/toolkit'
import selectedTitleReducer from './features/selectedTitleSlice'
import authReducer from './features/authSlice'

export const store = configureStore({
  reducer: {
    selectedTitle: selectedTitleReducer,
    auth: authReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch