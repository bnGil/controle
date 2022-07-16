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
            <li className="option-item active">Fiverr</li>
            <li className="option-item">Natural Intellegence</li>
          </div>
        </div>
        <div className="category-container">
          <h5 className="options-header">Departments</h5>
          <div className="options-container">
            <li className="option-item active">Analytics</li>
            <li className="option-item">Business</li>
            <li className="option-item">Customer Care and\nTrust & Safety</li>
            <li className="option-item">Data</li>
            <li className="option-item">Design</li>
            <li className="option-item">Finance</li>
            <li className="option-item">Marketing</li>
            <li className="option-item">Other</li>
            <li className="option-item">Product</li>
            <li className="option-item">Technology</li>
          </div>
        </div>
        <div className="category-container">
          <h5 className="options-header">Locations</h5>
          <div className="options-container">
            <li className="option-item active">Tel Aviv</li>
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
