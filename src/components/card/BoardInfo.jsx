import React from "react";
import ButtonType from "../button/ButtonType";

function BoardInfo({ item, nickname }) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-center sm:justify-start items-end">
        <h1 className="uppercase font-bold text-xl sm:text-2xl md:text-3xl xl:text-5xl text-sky-700">
          {item.name}
        </h1>
        <span className="text-base sm:text-lg lg:text-xl italic ml-2 lowercase">
          {nickname && `(nickname: ${nickname})`}
        </span>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="w-fit flex space-x-2 items-center">
          {item?.types?.map((type, i) => {
            return <ButtonType key={i} typeName={type} disabled={true} />;
          })}
        </div>
        <div className="space-x-4 text-xs sm:text-sm md:text-base">
          <span>height: {item.height}cm</span>
          <span>Weight: {item.weight}kg</span>
        </div>
      </div>
    </div>
  );
}

export default BoardInfo;
