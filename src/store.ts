import { configureStore } from '@reduxjs/toolkit'
import selectedTitleReducer from './features/selectedTitleSlice'
import authReducer from './features/authSlice'
import pokemonReducer from './features/pokemonSlice'
import sidebarReducer from './features/sidebarSlice'
import topbarReducer from './features/topbarSlice'
import profileReducer from './features/profileSlice'


export const store = configureStore({
  reducer: {
    selectedTitle: selectedTitleReducer,
    auth: authReducer,
    pokemon: pokemonReducer,
    sidebar: sidebarReducer,
    topbar: topbarReducer,
    profile: profileReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch