import api from ".";
import { LIMIT_PAGINATION } from "../utils/constants";

export const fetchPokemon = async (offset) => {
  try {
    const response = await api.get(
      `/pokemon?limit=${LIMIT_PAGINATION}&offset=${offset}`
    );
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

export const fetchTypes = async () => {
  try {
    const response = await api.get(`/type`);
    return response.data;
  } catch (error) {
    console.error("error:", error);
  }
};

export const fetchPokemonByType = async (typeId) => {
  try {
    const response = await api.get(`/type/${typeId}`);
    return response.data;
  } catch (error) {
    console.error("error:", error);
  }
};
