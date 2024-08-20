import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { pokemonAPI, STATUS } from "../../utils/constants";

export const getPokemonDetail = createAsyncThunk(
  "pokemon/getPokemonDetail",
  async (pokemonName) => {
    const { data } = await axios.get(`${pokemonAPI}/pokemon/${pokemonName}`);

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
      weight: data.weight,
      avatar: data.sprites.other.dream_world.front_default,
      types: data.types.map(({ type: { name } }) => name),
      stats,
      abilities: pokemonAbilities.abilities,
      moves: pokemonAbilities.moves,
    };
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemonData: {},
    status: "idle",
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

export default pokemonSlice.reducer;
