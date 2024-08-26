import React from "react";

function Button({ children, onClick, disabled, classNames }) {
  return (
    <button
      onClick={onClick}
      className={`${classNames} text-white w-40 font-bold capitalize rounded-md shadow-lg py-1`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
