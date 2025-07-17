import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.scss";
const Pagination = ({ value, onChangePage, countPage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      pageCount={countPage}
      onPageChange={(event) => onChangePage(event.selected)}
      forcePage={value}
      pageRangeDisplayed={4}
      previousLabel="<"
      nextLabel=">"
      containerClassName="pagination"
    />
  );
};
export default Pagination;
