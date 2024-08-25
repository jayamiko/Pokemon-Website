import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/constants";
import { fetchTypes } from "../../api/fetchPokemon";

export const getTypes = createAsyncThunk("pokemonList/getTypes", async () => {
  const { results } = await fetchTypes();

  const filterTypes = results.filter(
    (type) => type.name !== "unknown" && type.name !== "stellar"
  );

  return filterTypes;
});

const TypeListSlice = createSlice({
  name: "typeList",
  initialState: {
    pokemonTypes: [],
    status: STATUS.Idle,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTypes.pending, (state) => {
        state.status = STATUS.Loading;
      })
      .addCase(getTypes.fulfilled, (state, action) => {
        state.status = STATUS.Succeded;
        state.pokemonTypes = action.payload;
      })
      .addCase(getTypes.rejected, (state, action) => {
        state.status = STATUS.Failed;
        state.error = action.error.message;
      });
  },
});

export default TypeListSlice.reducer;
