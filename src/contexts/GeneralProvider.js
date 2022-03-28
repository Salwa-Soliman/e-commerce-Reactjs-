import React, { useState } from "react";
import { GeneralContext } from "./GeneralContext";

export default function GeneralProvider(props) {
  // Theme Controllers
  const [darkMode, setDarkMode] = useState(false);

  let darkModeToggler = (_) => {
    setDarkMode(!darkMode);
  };

  //Products Controllers
  const [products, setProducts] = useState([]);

  const updateOrderedQty = (num, id) => {
    products[id - 1].orderedQty =
      products[id - 1].orderedQty + num <= 0
        ? 0
        : products[id - 1].orderedQty + num;
    console.log(products[id - 1].orderedQty);
    setProducts([...products]);
  };

  //Get Product Details
  const getProductDetails = (index) => {
    return products[index];
  };

  const removeOrderedQty = (id) => {
    products[id - 1].orderedQty = 0;
    setProducts([...products]);
  };
  return (
    <GeneralContext.Provider
      value={{
        darkMode,
        darkModeToggler,
        setProducts,
        products,
        updateOrderedQty,
        removeOrderedQty,
        getProductDetails,
      }}
    >
      {props.children}
    </GeneralContext.Provider>
  );
}
