import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../components/progress/ProgressBar";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../features/pokemon/pokemonSlice";
import LoaderPage from "../components/loading/LoaderPage";
import { STATUS } from "../utils/constants";
import VerticalTab from "../components/tab/VerticalTab";

function PokemonDetail() {
  const { name } = useParams();

  const dispatch = useDispatch();
  const pokemonDetail = useSelector((state) => state.pokemon.pokemonData);
  const status = useSelector((state) => state.pokemon.status);
  // const error = useSelector((state) => state.pokemon.error);

  useEffect(() => {
    if (name) {
      dispatch(getPokemonDetail(name));
    }
  }, [name, dispatch]);

  const pokemonName = pokemonDetail?.name;

  return (
    <section className="container mx-auto px-5">
      <section className="py-10 flex flex-col md:flex-row space-x-10">
        <div className="w-full md:w-1/3 flex flex-col justify-center items-center">
          <img
            src={pokemonDetail?.avatar}
            width={400}
            height={400}
            alt={pokemonName}
          />
        </div>
        <div className="w-full md:w-2/3 ml-10">
          <div className="my-5 w-4/5 flex flex-col">
            <h1 className="uppercase font-bold text-5xl text-sky-700 text-center md:text-left">
              {pokemonName}
            </h1>
            <div className="flex justify-between items-center">
              <h4 className="font-bold uppercase text-xl">
                {pokemonDetail?.types?.join(" - ")}
              </h4>
              <div className="space-x-4 text-xs sm:text-sm md:text-base">
                <span>height: {pokemonDetail.height}kg</span>
                <span>Weight: {pokemonDetail.weight}kg</span>
              </div>
            </div>
          </div>

          {/* POKEMON STATS */}
          <div className="w-4/5">
            {pokemonDetail?.stats?.map((stat, i) => {
              return (
                <ProgressBar key={i} label={stat?.name} percent={stat?.value} />
              );
            })}
            <div className="w-full flex justify-center md:justify-end">
              <button className="mt-5 bg-sky-700 hover:bg-red-700 text-white w-52 font-bold capitalize rounded-lg shadow-lg py-2">
                CATCH
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="tab" className="mt-5">
        <VerticalTab item={pokemonDetail} />
      </section>
      {status === STATUS.Loading && <LoaderPage />}
    </section>
  );
}

export default PokemonDetail;
