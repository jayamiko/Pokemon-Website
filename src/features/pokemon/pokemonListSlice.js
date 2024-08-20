import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonAPI, STATUS } from "../../utils/constants";

export const fetchPokemonList = createAsyncThunk(
  "pokemonList/fetchPokemonList",
  async () => {
    const response = await axios.get(`${pokemonAPI}/pokemon`);
    const data = response.data.results;

    const pokemonDataPromises = data.map(async (pokemon) => {
      const pokemonDetailResponse = await axios.get(pokemon.url);
      const pokemonDetail = pokemonDetailResponse.data;

      const stats = pokemonDetail.stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat,
      }));

      return {
        name: pokemonDetail.name,
        id: pokemonDetail.id,
        types: pokemonDetail.types.map(({ type: { name } }) => name),
        avatar: pokemonDetail.sprites.other.dream_world.front_default,
        stats,
      };
    });

    const pokemonData = await Promise.all(pokemonDataPromises);

    return pokemonData;
  }
);

const pokemonListSlice = createSlice({
  name: "pokemonList",
  initialState: {
    pokemonList: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonList.pending, (state) => {
        state.status = STATUS.Loading;
      })
      .addCase(fetchPokemonList.fulfilled, (state, action) => {
        state.status = STATUS.Succeded;
        state.pokemonList = action.payload;
      })
      .addCase(fetchPokemonList.rejected, (state, action) => {
        state.status = STATUS.Failed;
        state.error = action.error.message;
      });
  },
});

export default pokemonListSlice.reducer;
