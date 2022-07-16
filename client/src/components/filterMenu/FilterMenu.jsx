import React, { useState } from "react";

import "./filterMenu.css";
import PopUp from "../popUp/PopUp";
import FilterItem from "../filterItem/FilterItem";

function FilterMenu({
  setIsFilterOpen,
  setCompaniesStr,
  setDepartmentsStr,
  companies,
  departments,
}) {
  const [companiesArr, setCompaniesArr] = useState([]);
  const [departmentsArr, setDepartmentsArr] = useState([]);

  const handleOnApply = () => {
    const companiesStr = companiesArr.join(",");
    const departmentsStr = departmentsArr.join(",");
    setCompaniesStr(companiesStr);
    setDepartmentsStr(departmentsStr);
    setIsFilterOpen(false);
  };

  const handleCompanyClick = (company) => {
    // if companiesList includes the company str remove it, else push.
    const idx = companiesArr.indexOf(company);
    if (idx === -1) {
      setCompaniesArr([...companiesArr, company]);
    } else {
      const newArr = [...companiesArr];
      newArr.splice(idx, 1);
      setCompaniesArr(newArr);
    }
  };

  const handleDepartmentClick = (department) => {
    const idx = departmentsArr.indexOf(department);
    if (idx === -1) {
      setDepartmentsArr([...departmentsArr, department]);
    } else {
      const newArr = [...departmentsArr];
      newArr.splice(idx, 1);
      setDepartmentsArr(newArr);
    }
  };

  const printCompaniesOptions = () => {
    return companies.map((company, idx) => (
      <FilterItem key={idx} text={company} onClick={handleCompanyClick} />
    ));
  };

  const printDepartmentsOptions = () => {
    return departments.map((department, idx) => (
      <FilterItem key={idx} text={department} onClick={handleDepartmentClick} />
    ));
  };

  return (
    <PopUp>
      <div className="filter-container">
        <div className="category-container">
          <h5 className="options-header">Companies</h5>
          <div className="options-container">{printCompaniesOptions()}</div>
        </div>
        <div className="category-container">
          <h5 className="options-header">Departments</h5>
          <div className="options-container">{printDepartmentsOptions()}</div>
        </div>
        <div className="category-container">
          <h5 className="options-header">Locations</h5>
          <div className="options-container">
            <li className="option-item">Tel Aviv</li>
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
