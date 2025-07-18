import React from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "../../redux/slices/filterSlice";
import styles from "./Pagination.module.scss";
const Pagination = ({ countPage }) => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.filter.currentPage);
  return (
    <ReactPaginate
      className={styles.root}
      pageCount={countPage}
      onPageChange={(event) => dispatch(setCurrentPage(event.selected))}
      forcePage={currentPage}
      pageRangeDisplayed={4}
      previousLabel="<"
      nextLabel=">"
      containerClassName="pagination"
    />
  );
};
export default Pagination;
