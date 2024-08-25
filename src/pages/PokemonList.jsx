import React, { useEffect, useState } from "react";
import PokemonCard from "../components/card/PokemonCard";
import PokemonLogo from "../assets/pokemon.webp";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonList } from "../features/pokemon/pokemonListSlice";
import { STATUS } from "../utils/constants";
import LoaderPage from "../components/loading/LoaderPage";
import Image from "../components/image/Image";
import SearchBar from "../components/input/SearchBar";
import { searchPokemon } from "../service/searchPokemon";
import PaginationList from "../components/input/PaginationList";
import { getTypes } from "../features/pokemon/pokemonTypeListSlice";
import ButtonType from "../components/button/ButtonType";
import { fetchPokemonListType } from "../features/pokemon/pokemonListTypeSlice";

function PokemonList() {
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [offset, setOffset] = useState(0);

  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState("");
  const [error, setError] = useState("");

  const { data: pokemonList, count } = useSelector(
    (state) => state.pokemonList.pokemonList
  );
  const status = useSelector((state) => state.pokemonList.status);

  const pokemonTypes = useSelector((state) => state.pokemonTypes.pokemonTypes);
  const pokemonListType = useSelector(
    (state) => state.pokemonListType.pokemonList
  );
  const filterStatus = useSelector((state) => state.pokemonListType.status);

  const isLoading =
    status === STATUS.Loading || filterStatus === STATUS.Loading;

  useEffect(() => {
    dispatch(fetchPokemonList(offset));
  }, [dispatch, offset]);

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const activeTypeId = activeType.id;
  const activeTypeName = activeType.name;

  useEffect(() => {
    if (activeTypeId) {
      dispatch(fetchPokemonListType({ activeTypeId, offset }));
    }
  }, [dispatch, activeTypeId, offset]);

  useEffect(() => {
    if (activeTypeId && pokemonListType) {
      setData(pokemonListType);
    } else {
      setData(pokemonList);
    }
  }, [pokemonList, activeTypeId, pokemonListType]);

  async function onSearch(query) {
    searchPokemon(query, dispatch, setData, setError);
  }

  return (
    <div className="min-h-screen h-fit container mx-auto px-5">
      <div className="flex items-center justify-center my-10">
        <Image src={PokemonLogo} width={300} height={300} alt="pokemon" />
      </div>
      <div className="flex flex-col items-center justify-center my-10">
        <SearchBar
          query={query}
          setQuery={setQuery}
          placeHolder="Search Pokemon..."
          onSearch={onSearch}
        />
        <br />
        <div className="w-full flex flex-col items-center justify-between h-fit py-2 px-4 rounded-xl bg-slate-100">
          <h2 className="capitalize text-center font-semibold text-sky-700 text-sm">
            Filter by Type:
          </h2>
          <div className="w-full gap-2 grid grid-cols-9 mt-2">
            {pokemonTypes.map((type, index) => {
              return (
                <ButtonType
                  key={index}
                  typeName={type.name}
                  onClick={() =>
                    setActiveType({
                      id: index + 1,
                      name: type.name,
                    })
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      <h4 className="text-center capitalize text-black font-extrabold">
        Results for
        <b
          className={`bg-${activeTypeName} text-white px-2 py-1 mx-1 rounded-md`}
        >
          {activeTypeName}{" "}
        </b>
        Type:
      </h4>

      {!isLoading && !error && (
        <section className="container mx-auto py-2 sm:py-3 xl:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5 lg:gap-10">
            {data?.map((item, i) => {
              return <PokemonCard key={i} item={item} />;
            })}
          </div>
        </section>
      )}

      {isLoading && <LoaderPage />}
      {error && (
        <div className="border-2 border-red-500">POkemon Not Found</div>
      )}

      <br />

      {/* PAGINATION */}
      <div className="flex justify-end items-center">
        {count && (
          <PaginationList
            count={count}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setOffset={setOffset}
          />
        )}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default PokemonList;
