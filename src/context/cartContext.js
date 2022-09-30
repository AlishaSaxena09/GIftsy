import React, { useState } from "react";

const CartContext = React.createContext();

function CartContextProvider(props) {
  const [cartItems, setCartItems] = useState(() => {
    return localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : {};
  });

  const clearCart = () => {
    const updatedCart = {};
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const addItemToCart = (productId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[productId]) {
      updatedCart[productId] += 1;
    } else {
      updatedCart[productId] = 1;
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const deleteItemFromCart = (productId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[productId]) {
      if (updatedCart[productId] === 1) {
        delete updatedCart[productId];
      } else {
        updatedCart[productId] -= 1;
      }
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeEntireItemFromCart = (productId) => {
    const updatedCart = { ...cartItems };
    if (updatedCart[productId]) {
      delete updatedCart[productId];
    }
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItemToCart,
        removeEntireItemFromCart,
        deleteItemFromCart,
        clearCart,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

export { CartContext, CartContextProvider };
