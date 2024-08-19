import React from "react";
import { useParams } from "react-router-dom";

function PokemonDetail() {
  const { name } = useParams();
  return <div>PokemonDetail {name}</div>;
}

export default PokemonDetail;
