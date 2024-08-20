import React from "react";
import PokemonBall from "../../assets/pokeball-loader.gif";

function LoaderPage() {
  return (
    <div className="flex justify-center items-center h-screen">
      <img src={PokemonBall} alt="loading..." />
    </div>
  );
}

export default LoaderPage;
