import React from "react";

import "./pagination.css";

function Pagination({ maxPage, goToPage, currPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  const printPageNumbers = () => {
    return pageNumbers.map((number) => (
      <li
        key={number}
        href="#"
        className={`page-link ${number === currPage ? "active" : ""}`}
        onClick={() => goToPage(number)}
      >
        {number}
      </li>
    ));
  };

  return (
    <div className="pagination">
      <ul className="page-list">
        <li href="#" className="page-link" onClick={() => {}}>
          <>&#171;</>
        </li>
        {printPageNumbers()}
        <li href="#" className="page-link" onClick={() => {}}>
          <>&#187;</>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
