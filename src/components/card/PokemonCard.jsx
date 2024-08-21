import React from "react";
import { Link } from "react-router-dom";

function PokemonCard({ item }) {
  const pokemonName = item?.name;
  const pokemonAvatar = item.avatar;
  return (
    <Link to={`/pokemon/${pokemonName}`}>
      <div
        id={`pokemon-${pokemonName}`}
        className="cursor-pointer overflow-hidden w-full h-96 bg-light-grey flex flex-col items-center justify-center rounded-xl shadow-md shadow-cyan-500"
      >
        <img src={pokemonAvatar} width={150} height={150} alt={pokemonName} />

        <label className="font-bold text-black text-2xl text-center capitalize">
          {pokemonName}
        </label>
      </div>
    </Link>
  );
}

export default PokemonCard;
