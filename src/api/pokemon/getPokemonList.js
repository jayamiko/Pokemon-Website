import axios from "axios";

export const getPokemonList = async (setData) => {
  try {
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=10"
    );
    const pokemonResults = response.data.results;

    const pokemonDataPromises = pokemonResults.map(async (pokemon) => {
      const pokemonDetail = await axios.get(pokemon.url);
      return pokemonDetail.data;
    });

    const pokemonData = await Promise.all(pokemonDataPromises);
    setData(pokemonData);
  } catch (error) {
    console.error("Error fetching Pokémon list:", error);
  }
};
