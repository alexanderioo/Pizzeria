import React from "react";
import Sort from "../components/Sort";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock/";
import Skeleton from "../components/PizzaBlock/Skeleton";
const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  React.useEffect(() => {
    fetch("http://localhost:8080/items.json")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setLoading(false);
      });
    // либо в finally добавить set Loading
  }, []);
  return (
    <>
      <div className="content__top">
        {/* <Categories /> */}
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </>
  );
};
export default Home;
