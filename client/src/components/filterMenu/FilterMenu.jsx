import React, { useState } from "react";

import "./filterMenu.css";
import PopUp from "../popUp/PopUp";

function FilterMenu({ setIsFilterOpen }) {
  const handleOnApply = () => {
    setIsFilterOpen(false);
  };

  return (
    <PopUp>
      <div className="filter-container">
        <div className="category-container">
          <h5 className="options-header">Companies</h5>
          <div className="options-container">
            <button className="option-item active">Fiverr</button>
            <button className="option-item">Natural Intellegence</button>
          </div>
        </div>
        <div className="category-container">
          <h5 className="options-header">Departments</h5>
          <div className="options-container">
            <button className="option-item active">Analytics</button>
            <button className="option-item">Business</button>
            <button className="option-item">
              Customer Care and\nTrust & Safety
            </button>
            <button className="option-item">Data</button>
            <button className="option-item">Design</button>
            <button className="option-item">Finance</button>
            <button className="option-item">Marketing</button>
            <button className="option-item">Other</button>
            <button className="option-item">Product</button>
            <button className="option-item">Technology</button>
          </div>
        </div>
        <div className="category-container">
          <h5 className="options-header">Locations</h5>
          <div className="options-container">
            <button className="option-item active">Tel Aviv</button>
          </div>
        </div>
      </div>
      <button className="button apply-btn" onClick={handleOnApply}>
        Apply
      </button>
    </PopUp>
  );
}

export default FilterMenu;
