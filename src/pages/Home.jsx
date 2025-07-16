import React from "react";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
import axios from "axios";
const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: "популярности",
    sortProperty: "rating",
  });
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
  }, [categoryId, sortType]);
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
          : items
              .sort((a, b) => {
                if (sortType.sortProperty === "title") {
                  return a.title.localeCompare(b.title);
                } else {
                  return b[sortType.sortProperty] - a[sortType.sortProperty];
                }
              })
              .filter((obj) => categoryId === 0 || obj.category === categoryId) // разобрать
              .map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};
export default Home;
