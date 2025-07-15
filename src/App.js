import React from "react";
import "./scss/app.scss";
import Header from "../src/components/Header";
import Home from "../src/pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Card";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="/cart" element={<Cart></Cart>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
