import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LIMIT_PAGINATION, STATUS } from "../../utils/constants";
import api from "../../api";
import { fetchPokemonDetail } from "../../api/fetchPokemon";
import sortRandomData from "../../service/sortRandomData";

export const fetchPokemonListType = createAsyncThunk(
  "pokemonList/fetchPokemonListType",
  async ({ activeTypeId, offset }) => {
    const response = await api.get(`/type/${activeTypeId}`);

    const pokemons = response.data.pokemon;

    const pokemonList = pokemons?.map((pokemon) => pokemon.pokemon);

    const pokemonDataPromises = pokemonList.map(async (pokemon) => {
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

    const pokemonSlices = pokemonData.slice(offset, offset + LIMIT_PAGINATION);

    return {
      pokemonList: sortRandomData(pokemonSlices),
    };
  }
);

const pokemonListTypeSlice = createSlice({
  name: "pokemonListType",
  initialState: {
    pokemonList: [],
    status: STATUS.Idle,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemonListType.pending, (state) => {
        state.status = STATUS.Loading;
      })
      .addCase(fetchPokemonListType.fulfilled, (state, action) => {
        state.status = STATUS.Succeded;
        state.pokemonList = action.payload.pokemonList;
      })
      .addCase(fetchPokemonListType.rejected, (state, action) => {
        state.status = STATUS.Failed;
        state.error = action.error.message;
      });
  },
});

export default pokemonListTypeSlice.reducer;
