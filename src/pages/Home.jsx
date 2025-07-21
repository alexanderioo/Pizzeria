import React from "react";
import Sort from "../components/Sort";
import qs from "qs";
import { Link } from "react-router-dom";
import { list } from "../components/Sort";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { selectFilter, setFilters } from "../redux/slices/filterSlice";
import { fetchItems, selectPizzaData } from "../redux/slices/pizzaSlice";
const Home = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector(selectPizzaData);
  const categoryId = useSelector(selectFilter);
  const sortType = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const itemPerPage = 4;
  const start = itemPerPage * currentPage;
  const end = start + itemPerPage;
  const isMounted = React.useRef(false);
  const navigate = useNavigate();
  const filteredItems = [...items]
    .sort((a, b) => {
      if (sortType.sortProperty === "title") {
        return a.title.localeCompare(b.title);
      } else {
        return b[sortType.sortProperty] - a[sortType.sortProperty];
      }
    })
    .filter((obj) => categoryId === 0 || obj.category === categoryId) // разобрать
    .filter((obj) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  console.log(window.location.search);
  // Если был первый рендер, то проверяем URL-параметры и сохраняем в Redux
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortList =
        list.find((obj) => obj.sortProperty === params.sortProperty) || list[0];
      dispatch(setFilters({ ...params, sort: sortList }));
    }
  }, []);
  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [sortType.sortProperty, categoryId, currentPage]);
  React.useEffect(() => {
    const getItems = async () => {
      try {
        await dispatch(fetchItems());
      } catch (err) {
        console.log("Ошибка:", err);
      }
    };
    getItems();
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading"
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : filteredItems
                .slice(start, end)
                .map((obj) => <PizzaBlock {...obj} />)}
        </div>
      )}
      <Pagination
        countPage={Math.ceil(filteredItems.length / itemPerPage)}
      ></Pagination>
    </div>
  );
};
export default Home;
