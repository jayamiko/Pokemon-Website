import React from "react";
import { Link } from "react-router-dom";
import Image from "../image/Image";
import ButtonType from "../button/ButtonType";
import { colors } from "../../utils/constants";

function PokemonCard({ item }) {
  const pokemonName = item?.name;
  const pokemoneNickname = item?.nickname;
  const pokemonAvatar = item.avatar;
  const pokemonTypes = item.types;
  const pokemonStats = item.stats.filter(
    (stat) => !stat.name.includes("special")
  );

  const maxStatValue = 255;

  return (
    <Link to={`/pokemon/${pokemonName}`}>
      <div
        id={`pokemon-${pokemonName}`}
        className="float-shadow cursor-pointer overflow-hidden w-full h-96 p-4 bg-sky-50 flex flex-col items-center justify-center rounded-xl shadow-2xl"
      >
        <div className="flex flex-col justify-center items-center">
          <Image
            src={pokemonAvatar}
            width={150}
            height={150}
            alt={pokemonName}
          />
          <label className="font-bold text-black text-2xl text-center capitalize mt-2">
            {pokemonName}
          </label>
          {pokemoneNickname && <i>{pokemoneNickname}</i>}

          <div className="flex space-x-1">
            {pokemonTypes.map((type, i) => {
              return <ButtonType key={i} typeName={type} disabled={true} />;
            })}
          </div>
        </div>

        {/* STATS PROGRESS */}
        <div className="w-full space-y-2 mt-4">
          {pokemonStats.map((stat, i) => {
            const color = colors[i];
            const percentage = (stat.value / maxStatValue) * 100;
            return (
              <div key={i} className="flex items-center w-full">
                <span className="w-2/5 font-semibold capitalize text-xs">
                  {stat.name}
                </span>
                <div className="w-full flex h-4 rounded-lg bg-gray-700">
                  <div
                    className="h-4 rounded-lg"
                    style={{ width: `${percentage}%`, background: color }}
                  ></div>
                </div>
                <span
                  className="text-xs ml-1 font-bold"
                  style={{ color: color }}
                >
                  {parseInt(percentage)}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default PokemonCard;
