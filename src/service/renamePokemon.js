import { renamePokemon } from "../features/pokemon/pokemonSlice";

const renamedPokemon =
  ({ name, nickname }) =>
  (dispatch) => {
    try {
      dispatch(
        renamePokemon({
          pokemonName: name,
          newName: nickname,
        })
      );
    } catch (error) {
      console.error("Error renamed Pokemon:", error);
    }
  };

export default renamedPokemon;
