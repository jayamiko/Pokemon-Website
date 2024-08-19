import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProgressBar from "../components/progress/ProgressBar";
import { pokemonAPI } from "../utils/constants";

function PokemonDetail() {
  const { name } = useParams();

  const [pokemonDetail, setPokemonDetail] = useState({});

  const getRecursiveEvolution = useCallback(
    (evolutionChain, level, evolutionData) => {
      if (!evolutionChain.evolves_to.length) {
        return evolutionData.push({
          pokemon: {
            ...evolutionChain.species,
            url: evolutionChain.species.url.replace(
              "pokemon-species",
              "pokemon"
            ),
          },
          level,
        });
      }
      evolutionData.push({
        pokemon: {
          ...evolutionChain.species,
          url: evolutionChain.species.url.replace("pokemon-species", "pokemon"),
        },
        level,
      });
      return getRecursiveEvolution(
        evolutionChain.evolves_to[0],
        level + 1,
        evolutionData
      );
    },
    []
  );

  const getEvolutionData = useCallback(
    (evolutionChain) => {
      const evolutionData = [];
      getRecursiveEvolution(evolutionChain, 1, evolutionData);
      return evolutionData;
    },
    [getRecursiveEvolution]
  );

  const getPokemonInfo = useCallback(async () => {
    const { data } = await axios.get(`${pokemonAPI}/pokemon/${name}`);
    const { data: dataEncounters } = await axios.get(
      data.location_area_encounters
    );

    const {
      data: {
        evolution_chain: { url: evolutionURL },
      },
    } = await axios.get(`${pokemonAPI}/pokemon-species/${name}`);
    const { data: evolutionData } = await axios.get(evolutionURL);

    const pokemonAbilities = {
      abilities: data.abilities.map(({ ability }) => ability.name),
      moves: data.moves.map(({ move }) => move.name),
    };

    const encounters = [];
    const evolution = getEvolutionData(evolutionData.chain);
    let evolutionLevel;
    evolutionLevel = evolution.find(
      ({ pokemon }) => pokemon.name === data.name
    ).level;
    dataEncounters.forEach((encounter) => {
      encounters.push(
        encounter.location_area.name.toUpperCase().split("-").join(" ")
      );
    });
    const stats = await data?.stats.map(({ stat, base_stat }) => ({
      name: stat?.name,
      value: base_stat,
    }));
    // dispatch(
    setPokemonDetail({
      id: data.id,
      name: data.name,
      weight: data.weight,
      avatar: data.sprites.other.dream_world.front_default,
      types: data.types.map(({ type: { name } }) => name),
      stats,
      encounters,
      evolutionLevel,
      evolution,
      pokemonAbilities,
    });
  }, [name, getEvolutionData]);

  useEffect(() => {
    getPokemonInfo();
  }, [name, getPokemonInfo]);

  const pokemonName = pokemonDetail?.name;

  console.log(pokemonDetail);

  return (
    <section className="container mx-auto px-5 py-10 flex space-x-10">
      <div className="w-1/3 flex flex-col justify-center items-center">
        <img
          src={pokemonDetail?.avatar}
          width={400}
          height={400}
          alt={pokemonName}
        />
      </div>
      <div className="w-2/3 ml-10">
        <div className="my-5 w-4/5">
          <h1 className="uppercase font-bold text-5xl text-sky-700">
            {pokemonName}
          </h1>
          <div className="flex justify-between">
            <h4 className="font-bold uppercase text-xl">
              {pokemonDetail?.types?.join(" - ")}
            </h4>
            <span>Weight: {pokemonDetail.weight}kg</span>
          </div>
        </div>

        {/* POKEMON STATS */}
        <div className="w-4/5">
          {pokemonDetail?.stats?.map((stat, i) => {
            return (
              <ProgressBar key={i} label={stat?.name} percent={stat?.value} />
            );
          })}
          <div className="w-full flex justify-end">
            <button className="mt-5 bg-sky-700 hover:bg-red-700 text-white w-52 font-bold capitalize rounded-lg shadow-lg py-2">
              CATCH
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PokemonDetail;
