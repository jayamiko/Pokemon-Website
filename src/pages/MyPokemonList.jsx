import React, { useEffect, useState } from "react";
import PokemonCard from "../components/card/PokemonCard";
import TypographyTitle from "../components/label/TypographyTitle";

function MyPokemonList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedPokemons = localStorage.getItem("favorites");
    if (storedPokemons) {
      setData(JSON.parse(storedPokemons));
    }
  }, []);
  return (
    <section className="container mx-auto py-5">
      <TypographyTitle title="My Pokemon List" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {data?.map((item, i) => {
          return <PokemonCard key={i} item={item} />;
        })}
      </div>
    </section>
  );
}

export default MyPokemonList;
