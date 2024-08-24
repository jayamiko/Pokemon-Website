import React from "react";

function ProgressBar({ label, percent }) {
  const maxStatValue = 255;
  const percentage = (percent / maxStatValue) * 100;
  return (
    <div className="flex items-center space-x-2 md:space-x-4 my-2 w-full">
      <div className="font-semibold capitalize w-2/5 text-xs sm:text-sm lg:text-base">
        {label}
      </div>
      <div className="w-full h-4 rounded-lg bg-gray-700">
        <div
          className="h-4 bg-blue-600 rounded-lg"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
