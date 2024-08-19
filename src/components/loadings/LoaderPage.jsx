import React from "react";
import PokemonBall from "../../assets/pokeball-loader.gif";

function LoaderPage() {
  return (
    <div className="flex justify-center items-center h-full">
      <img src={PokemonBall} alt="" />
    </div>
  );
}

export default LoaderPage;
