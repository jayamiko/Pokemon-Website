import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/constants";
import { fetchPokemon, fetchPokemonDetail } from "../../api/fetchPokemon";

export const fetchPokemonList = createAsyncThunk(
  "pokemonList/fetchPokemonList",
  async () => {
    const pokemons = await fetchPokemon();

    const pokemonDataPromises = pokemons.map(async (pokemon) => {
      const pokemonName = pokemon.name;

      const { data } = await fetchPokemonDetail(pokemonName);

      const stats = data?.stats.map(({ stat, base_stat }) => ({
        name: stat.name,
        value: base_stat,
      }));

      return {
        id: data.id,
        name: pokemonName,
        types: data.types.map(({ type: { name } }) => name),
        avatar: data.sprites.other.home.front_default,
        stats,
      };
    });

    const pokemonData = await Promise.all(pokemonDataPromises);

    const randomPokemons = pokemonData.sort(() => {
      return 0.5 - Math.random();
    });

    return randomPokemons;
  }
);

const pokemonListSlice = createSlice({
  name: "pokemonList",
  initialState: {
    pokemonList: [],
    status: STATUS.Idle,
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
