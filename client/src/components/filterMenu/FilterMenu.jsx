import React, { useState } from "react";

import "./filterMenu.css";
import PopUp from "../popUp/PopUp";
import FilterItem from "../filterItem/FilterItem";

function FilterMenu({
  setIsFilterOpen,
  setCompaniesStr,
  setDepartmentsStr,
  setLocationsStr,
  companies,
  departments,
  locations,
}) {
  const [companiesArr, setCompaniesArr] = useState([]);
  const [departmentsArr, setDepartmentsArr] = useState([]);
  const [locationsArr, setLocationsArr] = useState([]);

  const handleOnApply = () => {
    const companiesStr = companiesArr.join(",");
    const departmentsStr = departmentsArr.join(",");
    const locationsStr = locationsArr.join(",");
    setCompaniesStr(companiesStr);
    setDepartmentsStr(departmentsStr);
    setLocationsStr(locationsStr);
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

  const handleLocationClick = (location) => {
    const idx = locationsArr.indexOf(location);
    if (idx === -1) {
      setLocationsArr([...locationsArr, location]);
    } else {
      const newArr = [...locationsArr];
      newArr.splice(idx, 1);
      setLocationsArr(newArr);
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

  const printLocationsOptions = () => {
    return locations.map((location, idx) => (
      <FilterItem key={idx} text={location} onClick={handleLocationClick} />
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
          <div className="options-container">{printLocationsOptions()}</div>
        </div>
      </div>
      <button className="button apply-btn" onClick={handleOnApply}>
        Apply
      </button>
    </PopUp>
  );
}

export default FilterMenu;
