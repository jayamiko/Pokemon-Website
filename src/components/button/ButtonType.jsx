import React from "react";

function ButtonType({ typeName, onClick, disabled = false }) {
  return (
    <button
      className={`bg-${typeName} flex justify-center w-full italic rounded-md font-medium px-2 py-1 text-sm text-white`}
      onClick={onClick}
      disabled={disabled}
    >
      {typeName}
    </button>
  );
}

export default ButtonType;
