import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Pokemon } from '../constant/pokemonInterface';
import { User } from '../constant/userInterface'
// Define a type for the slice state
interface ProfileState {
  profileUser?: User | null,
  pokemons: Array<Pokemon>,
  loading: boolean,
  error?: string | null,
}

// Define the initial state using that type
const initialState: ProfileState = {
  profileUser: null,
  pokemons: [],
  loading: false,
  error: null,
}

export const getProfileUser = createAsyncThunk('profile/getProfileUser', async (userId: string) => {
  const userRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`);
  const user = userRes.data;
  const pokemonsRes = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemons/user/${userId}`);
  const pokemons = pokemonsRes.data;
  return { user, pokemons };
});

export const profileUserSlice = createSlice({
  name: 'profile',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder
      // GET PROFILE USER
      .addCase(getProfileUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        state.loading = false;
        const { user, pokemons } = action.payload
        state.profileUser = user;
        state.pokemons = pokemons;
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

  }
})

export const { } = profileUserSlice.actions

export default profileUserSlice.reducer