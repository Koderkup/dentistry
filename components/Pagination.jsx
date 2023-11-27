import React from "react";
import s from "../styles/Pagination.module.scss";
const Pagination = ({
  totalPages,
  page,
  setPage,
  nextPage,
  prevPage,
  setChecked,
}) => {
  return (
    <div className={s.pagination_wrapper}>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li
            className="page-item"
            onClick={() => {
              prevPage;
              setChecked(false);
            }}
          >
            <p className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </p>
          </li>
          {[...Array(totalPages).keys()].map((el) => (
            <li
              className={`page-item ${page === el + 1 ? "active" : ""}`}
              key={el}
              onClick={() => {
                setPage(el + 1);
                setChecked(false);
              }}
            >
              <p className="page-link" style={{ cursor: "pointer" }}>
                {el + 1}
              </p>
            </li>
          ))}
          <li
            className="page-item"
            onClick={() => {
              nextPage;
              setChecked(false);
            }}
          >
            <p className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </p>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
