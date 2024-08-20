import React, { useEffect, useState } from "react";
import PokemonCard from "../components/card/PokemonCard";

function MyPokemonList() {
  const [data, setData] = useState([]);

  useEffect(() => {}, []);
  return (
    <section className="container mx-auto py-5">
      <h1 className="font-bold text-4xl uppercase my-4">My Pokemon List</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {[]?.map((item, i) => {
          return <PokemonCard key={i} item={item} />;
        })}
      </div>
    </section>
  );
}

export default MyPokemonList;
