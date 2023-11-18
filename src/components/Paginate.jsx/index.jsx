import React from "react";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const totalPage = props.totalPage;
  const currentPage = props.currentPage;
  const basePath = props.basePath;
  console.log("asdasd", basePath - 1, totalPage);
  const allLi = [];
  if (currentPage !== 1)
    allLi.push(
      <li className="page-item">
        <Link className="page-link" to={basePath + 1}>
          First
        </Link>
      </li>
    );
  if (currentPage > 1)
    allLi.push(
      <li className="page-item">
        <Link className="page-link" to={basePath + (Number(currentPage) - 1)}>
          Previous
        </Link>
      </li>
    );
  for (let i = currentPage - 5; i <= currentPage - 1; i++)
    if (i >= 1)
      allLi.push(
        <li className="page-item">
          <Link className="page-link" to={basePath + i}>
            {i}
          </Link>
        </li>
      );
  allLi.push(
    <li className="page-item">
      <Link
        className="page-link"
        style={{ color: "red" }}
        to={basePath + currentPage}
      >
        {currentPage}
      </Link>
    </li>
  );
  for (let i = currentPage + 1; i <= currentPage + 4 && i <= totalPage; i++) {
    if (i >= 1)
      allLi.push(
        <li key={"page_" + i} className="page-item">
          <Link className="page-link" to={basePath + i}>
            {i}
          </Link>
        </li>
      );
  }

  if (currentPage < totalPage)
    allLi.push(
      <li className="page-item">
        <Link className="page-link" to={basePath + (Number(currentPage) + 1)}>
          Next
        </Link>
      </li>
    );
  if (currentPage !== totalPage)
    allLi.push(
      <li className="page-item">
        <Link className="page-link" to={basePath + totalPage}>
          Last
        </Link>
      </li>
    );
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">{allLi}</ul>
    </nav>
  );
};

export default Pagination;
