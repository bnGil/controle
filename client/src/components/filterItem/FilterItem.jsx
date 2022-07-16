import React, { useState } from "react";
import "./filterItem.css";

function FilterItem({ text, onClick }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    onClick(text);
    setIsActive(!isActive);
  };

  return (
    <li
      className={`option-item ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      {text}
    </li>
  );
}

export default FilterItem;
