import React, { useEffect, useState } from "react";
import PokemonCard from "../components/card/PokemonCard";
import TypographyTitle from "../components/label/TypographyTitle";
import NotFound from "../components/alert/NotFound";

function MyPokemonList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedPokemons = localStorage.getItem("favorites");

    if (storedPokemons) {
      setData(JSON.parse(storedPokemons));
    }
  }, []);

  const caughtList = data?.filter((pokemon) => pokemon.isCaught === true);

  return (
    <section className="container mx-auto py-2 lg:py-5 min-h-screen">
      <TypographyTitle title="My Pokemon List" />
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {caughtList.map((item, i) => {
          return <PokemonCard key={i} item={item} />;
        })}
      </div>
      {!caughtList?.length && (
        <NotFound text="You haven't caught any Pokemon yet" />
      )}
    </section>
  );
}

export default MyPokemonList;
