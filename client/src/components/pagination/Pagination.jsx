import React, { useState } from "react";
import "./pagination.css";

function Pagination({ maxPage, goToPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  const printPageNumbers = () => {
    return pageNumbers.map((number) => (
      <li
        key={number}
        href="#"
        className="page-link"
        onClick={() => goToPage(number)}
      >
        {number}
      </li>
    ));
  };

  return (
    <div className="pagination">
      <ul className="page-list">{printPageNumbers()}</ul>
    </div>
  );
}

export default Pagination;
