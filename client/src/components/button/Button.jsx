import React, { useState } from "react";
import "./button.css";

function Button({ text, onClick = () => {} }) {
  return (
    <button className="button" onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
