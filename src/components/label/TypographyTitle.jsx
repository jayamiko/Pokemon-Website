import React from "react";

function TypographyTitle({ title }) {
  return (
    <h1 className="font-bold text-xl sm:text-2xl lg:text-4xl uppercase my-4">
      {title}
    </h1>
  );
}

export default TypographyTitle;
