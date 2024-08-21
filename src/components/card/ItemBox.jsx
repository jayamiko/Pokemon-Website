import React from "react";

function ItemBox({ name }) {
  return (
    <div className="bg-slate-200 rounded-lg lg:w-full py-2 text-black text-xs sm:text-sm md:text-base lg:text-lg font-bold flex items-center justify-center">
      <span>{name}</span>
    </div>
  );
}

export default ItemBox;
