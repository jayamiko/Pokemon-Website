import React from "react";

function TypeLabel({ typeName }) {
  return (
    <i
      className={`font-medium px-2 py-1 text-sm text-white rounded-md bg-${typeName}`}
    >
      {typeName}
    </i>
  );
}

export default TypeLabel;
