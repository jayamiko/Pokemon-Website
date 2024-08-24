import React, { useEffect, useState } from "react";
import PokemonCard from "../components/card/PokemonCard";
import PokemonLogo from "../assets/pokemon.webp";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../features/pokemon/pokemonListSlice";
import { STATUS } from "../utils/constants";
import LoaderPage from "../components/loading/LoaderPage";
import Image from "../components/image/Image";
import SearchBar from "../components/input/SearchBar";
import { getPokemonDetail } from "../features/pokemon/pokemonDetailSlice";

function PokemonList() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const pokemonList = useSelector((state) => state.pokemonList.pokemonList);
  const status = useSelector((state) => state.pokemonList.status);

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  useEffect(() => {
    setData(pokemonList);
  }, [pokemonList]);

  async function searchPokemon(query) {
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

  return (
    <div className="h-screen container mx-auto px-5">
      <div className="flex items-center justify-center my-10">
        <Image src={PokemonLogo} width={300} height={300} alt="pokemon" />
      </div>
      <div className="flex items-center justify-center my-10">
        <SearchBar
          query={query}
          setQuery={setQuery}
          placeHolder="Search Pokemon..."
          onSearch={searchPokemon}
        />
      </div>

      {status !== STATUS.Loading && !error && (
        <section className="container mx-auto py-2 sm:py-3 xl:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-10">
            {data?.map((item, i) => {
              return <PokemonCard key={i} item={item} />;
            })}
          </div>
        </section>
      )}

      {status === STATUS.Loading && <LoaderPage />}
      {error && (
        <div className="border-2 border-red-500">POkemon Not Found</div>
      )}
    </div>
  );
}

export default PokemonList;
