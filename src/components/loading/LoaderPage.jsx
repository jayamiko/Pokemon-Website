import React from "react";
import PokemonBall from "../../assets/pokeball-loader.gif";

function LoaderPage() {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <img src={PokemonBall} width={100} height={100} alt="loading..." />
      <span className="text-black font-medium italic text-center mt-2">
        Please wait...
      </span>
    </div>
  );
}

export default LoaderPage;
