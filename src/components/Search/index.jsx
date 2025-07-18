import React from "react";
import styles from "./Search.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setSearchValue } from "../../redux/slices/filterSlice";
const Search = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.filter.searchValue);
  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        width="24"
        height="24"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0,-552.36216)">
          <g transform="translate(-4.3609793,-7.6704785)">
            <path
              d="M 232.83952,614.96702 A 154.04816,154.04794 0 0 0 78.79153,769.01382 
              154.04816,154.04794 0 0 0 232.83952,923.06184 
              154.04816,154.04794 0 0 0 386.88751,769.01382 
              154.04816,154.04794 0 0 0 232.83952,614.96702 Z 
              m 0,26.77613 A 129.95832,127.2707 0 0 1 362.79832,769.01382 
              129.95832,127.2707 0 0 1 232.83952,896.28449 
              129.95832,127.2707 0 0 1 102.88194,769.01382 
              129.95832,127.2707 0 0 1 232.83952,641.74315 Z"
              style={{ fill: "#2b0000" }}
            />
            <rect
              ry="18.08"
              rx="33.25"
              transform="matrix(0.6532,0.7572,-0.6069,0.7948,0,0)"
              y="319.55"
              x="794.87"
              height="36.17"
              width="173.03"
              style={{ fill: "#2b0000" }}
            />
          </g>
        </g>
      </svg>
      <input
        value={searchValue}
        onChange={(event) => dispatch(setSearchValue(event.target.value))}
        className={styles.input}
        placeholder="Поиск пиццы..."
      ></input>
      {searchValue && (
        <svg
          onClick={() => setSearchValue("")}
          className={styles.clearIcon}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      )}
    </div>
  );
};

export default Search;
