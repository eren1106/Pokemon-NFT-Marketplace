import { configureStore } from '@reduxjs/toolkit'
import selectedTitleReducer from './features/selectedTitleSlice'

export const store = configureStore({
  reducer: {
    selectedTitle: selectedTitleReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch