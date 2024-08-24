import { getPokemonDetail } from "../features/pokemon/pokemonDetailSlice";
import { fetchPokemonList } from "../features/pokemon/pokemonListSlice";

export async function searchPokemon(query, dispatch, setData, setError) {
  try {
    const action = query ? getPokemonDetail(query) : fetchPokemonList();
    const result = await dispatch(action);
    const payload = result?.payload;

    if (payload) {
      setError(false);
      setData(query ? [payload] : payload);
    } else {
      throw new Error(result?.error?.message || "Failed to fetch data.");
    }
  } catch (error) {
    setError(error.message);
  }
}
