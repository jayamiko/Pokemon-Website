import React, { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemon/getPokemonList";
import PokemonCard from "../components/cards/PokemonCard";

function PokemonList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPokemonList(setData);
  }, []);

  console.log(data);
  console.log(data?.length);

  return (
    <div className="h-screen container mx-auto px-5">
      <div className="flex items-center justify-center my-10">
        <img src="./pokemon.webp" width={300} height={300} alt="pokemon" />
      </div>
      <section className="container mx-auto py-5">
        <div className="flex overflow-x-scroll space-x-4">
          {data?.map((item, i) => {
            return <PokemonCard key={i} item={item} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default PokemonList;
