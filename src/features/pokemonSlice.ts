import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { Pokemon } from '../constant/pokemonInterface';
import { User } from '../constant/userInterface'
import { useAppDispatch, useAppSelector } from '../hooks';
import { refreshUser } from './authSlice';

// Define a type for the slice state
interface PokemonState {
  pokemons: Array<Pokemon>,
  currentPokemon: Pokemon | null,
  loading: boolean,
  error: string | null | undefined,
  tradeLoading: boolean, //for buy and sell proccess
  tradeError: string | null | undefined, //for buy and sell proccess
}
interface BuyInfo {
  pokemonId: string,
  buyerId: string,
  sellerId: string,
  price: number
}
interface SellInfo {
  pokemonId: string,
  price: number
}
// Define the initial state using that type
const initialState: PokemonState = {
  pokemons: [],
  currentPokemon: null,
  loading: false,
  error: null,
  tradeLoading: false,
  tradeError: null,
}

export const getAllPokemons = createAsyncThunk('pokemon/getAllPokemons', async () => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemons`);
  return res.data;
});

export const getPokemonById = createAsyncThunk('pokemon/getPokemonById', async (id: string) => {
  const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/pokemons/${id}`);
  return res.data;
});

export const createPokemon = createAsyncThunk('pokemon/createPokemon', async (newPokemon: Pokemon) => {
  const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pokemons/create`, newPokemon);
  return res.data;
});

export const buyPokemon = createAsyncThunk('pokemon/buyPokemon', async (buyInfo: BuyInfo) => {
  const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/pokemons/buy`, buyInfo);
  return res.data;
});

export const sellPokemon = createAsyncThunk('pokemon/sellPokemon', async (sellInfo: SellInfo) => {
  const res = await axios.put(`${process.env.REACT_APP_SERVER_URL}/pokemons/sell`, sellInfo);
  return res.data;
});

export const currentUserSlice = createSlice({
  name: 'pokemon',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // GET ALL POKEMONS
      .addCase(getAllPokemons.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.pokemons = [];
      })
      .addCase(getAllPokemons.fulfilled, (state, action) => {
        state.loading = false;
        const pokemons = action.payload;
        pokemons.sort((a: Pokemon, b: Pokemon) => a.no - b.no)
        state.pokemons = pokemons;
      })
      .addCase(getAllPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // GET POKEMON BY ID
      .addCase(getPokemonById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentPokemon = null;
      })
      .addCase(getPokemonById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPokemon = action.payload;
      })
      .addCase(getPokemonById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // CREATE POKEMON
      .addCase(createPokemon.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPokemon.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(createPokemon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // BUY POKEMON
      .addCase(buyPokemon.pending, (state, action) => {
        state.tradeLoading = true;
        state.tradeError = null;
      })
      .addCase(buyPokemon.fulfilled, (state, action) => {
        state.tradeLoading = false;
      })
      .addCase(buyPokemon.rejected, (state, action) => {
        state.tradeLoading = false;
        state.tradeError = action.error.message;
      })

      // SELL POKEMON
      .addCase(sellPokemon.pending, (state, action) => {
        state.tradeLoading = true;
        state.tradeError = null;
      })
      .addCase(sellPokemon.fulfilled, (state, action) => {
        state.tradeLoading = false;
      })
      .addCase(sellPokemon.rejected, (state, action) => {
        state.tradeLoading = false;
        state.tradeError = action.error.message;
      })
  }
})

export const {} = currentUserSlice.actions // for function inside reducers (not extraReducers)

export default currentUserSlice.reducer