import React from "react";
import Pagination from "@mui/material/Pagination";

function AppPagination({ maxPage, goToPage, currPage }) {
  const handleChange = (value) => {
    goToPage(value);
  };

  return (
    <Pagination
      count={maxPage}
      page={currPage}
      color="primary"
      onChange={(e) => handleChange(Number(e.target.textContent))}
    />
  );
}

export default AppPagination;
