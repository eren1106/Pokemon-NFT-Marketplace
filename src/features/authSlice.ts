import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { User } from '../constant/userInterface'
// Define a type for the slice state
interface AuthState {
  currentUser: User | null,
  loading: boolean,
  error: string | null | undefined,
}

interface LoginCredentials {
  email: string,
  password: string,
}

interface RegisterCredentials {
  name: string,
  email: string,
  password: string,
}

// get user from local storage
let storedUser: User | null = null;
const getStoredUser = localStorage.getItem('currentUser');
if (getStoredUser) {
  storedUser = JSON.parse(getStoredUser);
}

// Define the initial state using that type
const initialState: AuthState = {
  currentUser: storedUser,
  loading: false,
  error: null,
}

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }: LoginCredentials) => {
  const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
    email,
    password,
  });
  return res.data;
});

export const registerUser = createAsyncThunk('auth/registerUser', async ({ name, email, password }: RegisterCredentials) => {
  const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/register`, {
    name,
    email,
    password,
  });
  return res.data;
});

export const refreshUser = createAsyncThunk('auth/refreshUser', async () => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser')!);
  const id = storedUser._id;
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users/${id}`);
  return res.data;
});

export const currentUserSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    logoutUser: (state, action) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      // LOGIN USER
      .addCase(loginUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        const { _id, name, email, pokemons, coins } = action.payload;
        const currentUser: User = {
          _id: _id,
          name: name,
          email: email,
          pokemons: pokemons,
          coins: coins
        }
        state.currentUser = currentUser;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // REGISTER USER
      .addCase(registerUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // REFRESH USER
      .addCase(refreshUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
})

export const { logoutUser, setAuthError } = currentUserSlice.actions

export default currentUserSlice.reducer