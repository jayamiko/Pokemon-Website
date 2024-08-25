import { configureStore } from "@reduxjs/toolkit";
import pokemonListReducer from "../features/pokemon/pokemonListSlice";
import pokemonDetailReducer from "../features/pokemon/pokemonDetailSlice";
import pokemonTypeListReducer from "../features/pokemon/pokemonTypeListSlice";
import pokemonListTypeSlice from "../features/pokemon/pokemonListTypeSlice";
import pokemonReducer from "../features/pokemon/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
    pokemonDetail: pokemonDetailReducer,
    pokemonTypes: pokemonTypeListReducer,
    pokemonListType: pokemonListTypeSlice,
    pokemon: pokemonReducer,
  },
});
