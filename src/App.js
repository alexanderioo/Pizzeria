import React from "react";
import "./scss/app.scss";
import Header from "../src/components/Header";
import Sort from "../src/components/Sort";
import Categories from "../src/components/Categories";
import PizzaBlock from "../src/components/PizzaBlock";
function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    fetch("http://localhost:8080/items.json")
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
      });
  }, []);
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            {/* <Categories /> */}
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((obj, i) => (
              // если массив статичный(не меняется - передеавай индекс в кей, а если нет, то айдишник можешь)
              // закоммитить
              <PizzaBlock key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
