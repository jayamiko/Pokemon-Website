import React from "react";
import PikachuTired from "../../assets/pikachu-tired.png";
import Image from "../image/Image";

function NotFound(props) {
  return (
    <div className="flex flex-col justify-center items-center h-[50vh]">
      <Image src={PikachuTired} width={350} height={350} alt="loading..." />
      <span className="text-sky-700 font-medium italic text-center text-sm">
        {props.text}
      </span>
    </div>
  );
}

export default NotFound;
