import React from "react";
import "../assets/css/pagination.css";
function Pagination({ total, changePage }) {
  const pageNumber = [];

  for (let i = 1; i <= Math.ceil(total / 9); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className="pagination">
        {pageNumber.map((pageNum) => (
          <li
            key={pageNum}
            className="pagination_item"
            onClick={() => changePage(pageNum)}
          >
            {pageNum}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
