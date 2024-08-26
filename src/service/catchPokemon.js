const catchPokemon =
  ({ pokemonDetail, setCatchIsSuccess, setShowModal }) =>
  (dispatch) => {
    try {
      dispatch(
        catchPokemon({
          pokemonDetail,
          setCatchIsSuccess,
          setShowModal,
        })
      );
    } catch (error) {
      console.error("Error catching Pokemon:", error);
    }
  };

export default catchPokemon;
