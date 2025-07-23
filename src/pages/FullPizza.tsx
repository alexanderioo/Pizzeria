import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const FullPizza: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get("http://localhost:8080/items.json");
        const foundPizza = data.find(
          (p: { id: number }) => p.id === Number(id)
        );
        setPizza(foundPizza);
      } catch (error) {
        alert("Ошибка");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }

    fetchPizza();
  }, [id]);

  if (!pizza) {
    return <p>"Загрузка...."</p>;
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl}></img>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price}</h4>
    </div>
  );
};
export default FullPizza;
