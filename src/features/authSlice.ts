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

interface updateDTO {
  name?: string,
  bio?: string,
  imgUrl?: string,
}
interface updateCredentials {
  userId: string,
  object: updateDTO
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

export const toggleFavourite = createAsyncThunk('auth/toggleFavourite', async (pokemonId: string) => {
  const storedUser = JSON.parse(localStorage.getItem('currentUser')!);
  const id = storedUser._id;
  const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${id}/favourite`, { pokemonId });
  return res.data;
});

export const updateUser = createAsyncThunk('auth/updateUser', async ({userId, object}: updateCredentials) => {
  const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/${userId}`, object);
  return res.data;
});

export const authSlice = createSlice({
  name: 'auth',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
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

        const { _id, name, email, pokemons, coins, favourites, bio } = action.payload;
        const currentUser: User = {
          _id,
          name,
          email,
          pokemons,
          coins,
          favourites,
          bio,
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

      // TOGGLE FAVOURITE
      .addCase(toggleFavourite.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleFavourite.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(toggleFavourite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // TOGGLE FAVOURITE
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        localStorage.setItem('currentUser', JSON.stringify(action.payload));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
})

export const { logoutUser, setAuthError, clearError } = authSlice.actions

export default authSlice.reducer