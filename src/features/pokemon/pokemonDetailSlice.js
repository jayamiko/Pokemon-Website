import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/constants";
import { fetchPokemonDetail } from "../../api/fetchPokemon";

export const getPokemonDetail = createAsyncThunk(
  "pokemon/getPokemonDetail",
  async (pokemonName) => {
    const { data } = await fetchPokemonDetail(pokemonName);

    // abilities
    const pokemonAbilities = {
      abilities: data.abilities.map(({ ability }) => ability.name),
      moves: data.moves.map(({ move }) => move.name),
    };

    // stats
    const stats = await data?.stats.map(({ stat, base_stat }) => ({
      name: stat?.name,
      value: base_stat,
    }));

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      avatar: data.sprites.other.home.front_default,
      types: data.types.map(({ type: { name } }) => name),
      stats,
      abilities: pokemonAbilities.abilities,
      moves: pokemonAbilities.moves,
    };
  }
);

const pokemonDetailSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonData: {},
    status: STATUS.Idle,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPokemonDetail.pending, (state) => {
        state.status = STATUS.Loading;
      })
      .addCase(getPokemonDetail.fulfilled, (state, action) => {
        state.status = STATUS.Succeded;
        state.pokemonData = action.payload;
      })
      .addCase(getPokemonDetail.rejected, (state, action) => {
        state.status = STATUS.Failed;
        state.error = action.error.message;
      });
  },
});

export default pokemonDetailSlice.reducer;
