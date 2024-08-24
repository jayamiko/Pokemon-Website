import api from ".";
import { LIMIT_PAGINATION } from "../utils/constants";

export const fetchPokemon = async (offset) => {
  try {
    const response = await api.get(
      `/pokemon?limit=${LIMIT_PAGINATION}&offset=${offset}`
    );
    console.log(response.data.results.length);
    return response.data;
  } catch (error) {
    console.error("error:", error);
  }
};

export const fetchPokemonDetail = async (name) => {
  try {
    const response = await api.get(`/pokemon/${name}`);
    return response;
  } catch (error) {
    console.error("error:", error);
  }
};
