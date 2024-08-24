import axios from "axios";
import { POKE_API } from "../utils/constants";
import api from ".";

export const fetchPokemon = async () => {
  try {
    const response = await api.get(`/pokemon`);
    return response.data.results;
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
