import React from "react";
import PikachuSleep from "../../assets/pokemon-sleep.png";

function ErrorNotification(props) {
  return (
    <div className="flex flex-col justify-center items-center h-[90vh]">
      <img src={PikachuSleep} width={350} height={350} alt="loading..." />
      <span className="text-red-600 font-medium italic text-center text-sm">
        {props.text}
      </span>
    </div>
  );
}

export default ErrorNotification;
