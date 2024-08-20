import React, { useEffect } from "react";
import PokemonCard from "../components/card/PokemonCard";
import PokemonLogo from "../assets/pokemon.webp";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../features/pokemon/pokemonListSlice";
import { STATUS } from "../utils/constants";
import LoaderPage from "../components/loading/LoaderPage";

function PokemonList() {
  const dispatch = useDispatch();
  const pokemonList = useSelector((state) => state.pokemonList.pokemonList);
  const status = useSelector((state) => state.pokemonList.status);
  // const error = useSelector((state) => state.pokemon.error);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  console.log(pokemonList);

  return (
    <div className="h-screen container mx-auto px-5">
      <div className="flex items-center justify-center my-10">
        <img src={PokemonLogo} width={300} height={300} alt="pokemon" />
      </div>
      <section className="container mx-auto py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {pokemonList?.map((item, i) => {
            return <PokemonCard key={i} item={item} />;
          })}
        </div>
      </section>

      {status === STATUS.Loading && <LoaderPage />}
    </div>
  );
}

export default PokemonList;
