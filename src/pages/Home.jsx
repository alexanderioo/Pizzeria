import React from "react";
import Sort from "../components/Sort";
import qs from "qs";
import { list } from "../components/Sort";
import { useNavigate } from "react-router-dom";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../redux/slices/filterSlice";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  const categoryId = useSelector((state) => state.filter.categoryId);
  const sortType = useSelector((state) => state.filter.sort);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const itemPerPage = 4;
  const start = itemPerPage * currentPage;
  const end = start + itemPerPage;
  const dispatch = useDispatch();
  const isMounted = React.useRef(false);
  const filteredItems = items
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
    setLoading(true);
    axios
      .get("http://localhost:8080/items.json")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Ошибка");
      });
  }, []);
  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : filteredItems
              .slice(start, end)
              .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
      <Pagination
        countPage={Math.ceil(filteredItems.length / itemPerPage)}
      ></Pagination>
    </div>
  );
};
export default Home;
