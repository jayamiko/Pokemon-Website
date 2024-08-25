import React from "react";
import { colors } from "../../utils/constants";

function ProgressBar({ index, label, percent }) {
  const maxStatValue = 255;
  const percentage = (percent / maxStatValue) * 100;
  const color = colors[index];

  return (
    <div className="flex items-center space-x-2 md:space-x-4 my-2 w-full">
      <div className="font-semibold capitalize w-2/5 text-xs sm:text-sm lg:text-base">
        {label}
      </div>
      <div className="w-full h-4 rounded-lg bg-gray-700">
        <div
          className="h-4 rounded-lg "
          style={{ width: `${percentage}%`, background: color }}
        ></div>
      </div>
      <span className="text-xs ml-1 font-bold" style={{ color: color }}>
        {parseInt(percentage)}%
      </span>
    </div>
  );
}

export default ProgressBar;
