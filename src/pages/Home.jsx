import React from "react";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";
import { AppContext } from "../App";
import axios from "axios";
const Home = () => {
  const { searchValue } = React.useContext(AppContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [currentPage, setCurrentPage] = React.useState(0);
  const itemPerPage = 4;
  const start = itemPerPage * currentPage;
  const end = start + itemPerPage;
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
  React.useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/items.json")
      .then((res) => {
        setItems(res.data);
        setLoading(false);
        window.scrollTo(0, 0);
      })
      .catch((err) => {
        console.log("Ошибка");
      });
    // либо в finally добавить set Loading
  }, [categoryId, sortType, searchValue]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => setCategoryId(i)}
        />
        <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
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
        value={currentPage}
        onChangePage={(i) => setCurrentPage(i)}
        countPage={Math.ceil(filteredItems.length / itemPerPage)}
      ></Pagination>
    </div>
  );
};
export default Home;
