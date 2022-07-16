import React from "react";
import Pagination from "@mui/material/Pagination";

function AppPagination({ maxPage, goToPage, currPage }) {
  const handleChange = (event, value) => {
    goToPage(value);
  };

  return (
    <Pagination
      count={maxPage}
      page={currPage}
      color="primary"
      onChange={handleChange}
    />
  );
}

export default AppPagination;
