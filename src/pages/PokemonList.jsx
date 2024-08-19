import React, { useEffect, useState } from "react";
import { getPokemonList } from "../api/pokemon/getPokemonList";
import PokemonCard from "../components/cards/PokemonCard";
import PokemonLogo from "../assets/pokemon.webp";

function PokemonList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getPokemonList(setData);
  }, []);

  return (
    <div className="h-screen container mx-auto px-5">
      <div className="flex items-center justify-center my-10">
        <img src={PokemonLogo} width={300} height={300} alt="pokemon" />
      </div>
      <section className="container mx-auto py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {data?.map((item, i) => {
            return <PokemonCard key={i} item={item} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default PokemonList;
