import { getPokemonDetail } from "../features/pokemon/pokemonDetailSlice";
import { fetchPokemonList } from "../features/pokemon/pokemonListSlice";
import lowercase from "../helpers/lowerCase";

export async function searchPokemon(query, dispatch, setData, setError) {
  try {
    const queryFormat = lowercase(query);
    const action = query ? getPokemonDetail(queryFormat) : fetchPokemonList();
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
