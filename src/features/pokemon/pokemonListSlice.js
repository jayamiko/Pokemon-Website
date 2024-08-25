import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/constants";
import { fetchPokemon, fetchPokemonDetail } from "../../api/fetchPokemon";
import sortRandomData from "../../service/sortRandomData";

export const fetchPokemonList = createAsyncThunk(
  "pokemonList/fetchPokemonList",
  async (limit, offset) => {
    const data = await fetchPokemon(limit, offset);
    const results = data.results;

    const myCollections = JSON.parse(localStorage.getItem("favorites")) || [];

    const pokemonDataPromises = results.map(async (pokemon) => {
      const pokemonName = pokemon.name;

      const pokemonNamesCaught = myCollections
        ?.filter((collection) => collection.isCaught === true)
        .map((pokemon) => pokemon.name);

      const isCaught = pokemonNamesCaught?.includes(pokemonName);

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
        isCaught,
      };
    });

    const pokemonData = await Promise.all(pokemonDataPromises);

    return {
      count: data.count,
      data: sortRandomData(pokemonData),
    };
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
