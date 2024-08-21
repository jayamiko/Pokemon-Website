import React from "react";

function Image(props) {
  return (
    <img
      src={props.src}
      width={props.width}
      height={props.height}
      alt={props.alt}
    />
  );
}

export default Image;
