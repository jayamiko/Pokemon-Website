import { configureStore } from "@reduxjs/toolkit";
import pokemonListReducer from "../features/pokemon/pokemonListSlice";
import pokemonDetailReducer from "../features/pokemon/pokemonDetailSlice";
import pokemonReducer from "../features/pokemon/pokemonSlice";

export const store = configureStore({
  reducer: {
    pokemonList: pokemonListReducer,
    pokemonDetail: pokemonDetailReducer,
    pokemon: pokemonReducer,
  },
});
