import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/constants";
import isPrime from "../../helpers/isPrime";

export const catchPokemon = createAsyncThunk(
  "pokemon/catch",
  async ({ pokemonDetail, setCatchIsSuccess, setShowModal }) => {
    const response = await axios.post(`${API_URL}/pokemon/catch`);
    const data = response.data.data;
    const isSuccess = data.success;

    setCatchIsSuccess(isSuccess);

    if (isSuccess) {
      setShowModal(true); // show modal for filled nickname
      return {
        success: true,
        pokemon: {
          ...pokemonDetail,
          isCaught: true,
          nickname: pokemonDetail.name, //default nickname
          rename_count: 0,
        },
      };
    } else {
      return {
        success: false,
        pokemon: {
          nickname: "",
          isCaught: false,
        },
      };
    }
  }
);

export const releasePokemon = createAsyncThunk(
  "pokemon/release",
  async (setIsSuccess) => {
    const response = await axios.post(`${API_URL}/pokemon/release`);
    const data = response.data.data;
    const number = data.number;

    const primeNumber = isPrime(number);

    setIsSuccess(primeNumber ? true : false);

    return {
      number,
      isPrime: primeNumber,
    };
  }
);

export const renamePokemon = createAsyncThunk(
  "pokemon/rename",
  async ({ pokemonName, newName }) => {
    const myPokemonList = JSON.parse(localStorage.getItem("favorites")) || [];

    const updatedPokemon = myPokemonList.map((pokemon) => {
      if (pokemon.name === pokemonName) {
        return { ...pokemon, rename_count: pokemon.rename_count + 1 };
      }
      return pokemon;
    });

    localStorage.setItem("favorites", JSON.stringify(updatedPokemon));

    const renameCount = updatedPokemon.find(
      (pokemon) => pokemon.name === pokemonName
    )?.rename_count;

    const response = await axios.post(`${API_URL}/pokemon/rename`, {
      "new-name": newName,
      "rename-count": renameCount,
    });

    const newNickname = response.data.data["new-name"];

    return {
      new_name: newNickname,
      rename_count: renameCount,
    };
  }
);

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    success: false,
    releaseResponse: null,
    renamedPokemon: "",
    renameCount: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Catch Pokémon
    builder.addCase(catchPokemon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(catchPokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.success = action.payload.success;

      if (action.payload.success) {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        favorites.push(action.payload.pokemon);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    });
    builder.addCase(catchPokemon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Release Pokémon
    builder.addCase(releasePokemon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(releasePokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.releaseResponse = action.payload;
    });
    builder.addCase(releasePokemon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Rename Pokémon
    builder.addCase(renamePokemon.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(renamePokemon.fulfilled, (state, action) => {
      state.loading = false;
      state.renamedPokemon = action.payload.new_name;
      state.renameCount = action.payload.rename_count;
    });
    builder.addCase(renamePokemon.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export default pokemonSlice.reducer;
