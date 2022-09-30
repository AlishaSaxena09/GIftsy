import React, { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { UserContext } from "../context/userContext";
import { createOrder, getProducts } from "../lib/mockServer";
// import CartItem from "./CartItem";

export default function Cart() {
  const [successMessage, setSuccessMessage] = useState("");

  const {
    cartItems,
    addItemToCart,
    deleteItemFromCart,
    removeEntireItemFromCart,
    clearCart,
  } = useContext(CartContext);
  const { isLoggedIn } = useContext(UserContext);

  const products = getProducts();

  const handleOrder = () => {
    if (!isLoggedIn) {
      alert("Please login to place an order!");
    } else {
      createOrder({
        products: cartItems,
        token: localStorage.getItem("auth-token"),
        totalPrice: Object.keys(cartItems).reduce((acc, productId) => {
          const product = products.find((product) => product.id === productId);
          if (!product) return acc;
          return acc + cartItems[productId] * product.price;
        }, 0),
      });
      clearCart();
      setSuccessMessage("Order successfully placed!");
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h4 className="my-4 text-3xl font-bold text-center">Cart</h4>
      {Object.keys(cartItems).length > 0 ? (
        <>
          {Object.keys(cartItems).map((productId) => {
            return (
              <CartItem
                key={productId}
                count={cartItems[productId]}
                product={products.find((product) => product.id === productId)}
                addItemToCart={addItemToCart}
                deleteItemFromCart={deleteItemFromCart}
                removeEntireItemFromCart={removeEntireItemFromCart}
              />
            );
          })}
          <p className="flex justify-between font-bold text-3xl border-t border-solid border-gray-200 w-full max-w-xl px-8 py-4">
            <span>Total:</span>
            <span>
              ₹
              {Object.keys(cartItems).reduce((acc, productId) => {
                const product = products.find(
                  (product) => product.id === productId
                );
                if (!product) return acc;
                return acc + cartItems[productId] * product.price;
              }, 0)}
            </span>
          </p>
          {successMessage ? (
            <p className="text-2xl my-4 text-green-500 font-bold">
              {successMessage}
            </p>
          ) : null}
          <div className="py-4">
            <button
              onClick={handleOrder}
              className="mb-6 text-white bg-stone-800 text-lg px-6 py-3 uppercase tracking-widest hover:bg-stone-600"
            >
              Place Order
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col justify-center items-center py-8 w-full">
            <h3 className="font-bold text-3xl mt-8">Your cart is empty!</h3>
          </div>

          {successMessage ? (
            <p className="text-2xl my-4 text-green-500 font-bold">
              {successMessage}
            </p>
          ) : null}
        </>
      )}
    </div>
  );
}

function CartItem({
  count,
  product,
  addItemToCart,
  deleteItemFromCart,
  removeEntireItemFromCart,
}) {
  return (
    <div className="py-6">
      <div className="flex max-w-xl bg-white shadow-lg rounded-lg border border-gray-100 overflow-hidden">
        <div className="w-1/3 bg-cover">
          <img alt="product" src={product.imgUrl}></img>
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-gray-900 font-bold text-2xl">{product.name}</h1>
          </div>

          <p className="mt-2 text-gray-600 text-sm">{product.description}</p>
          <h1 className="text-gray-700 font-bold text-xl">₹ {product.price}</h1>
          {/* <p className="mt-2 text-gray-600 text-sm">{product.ratings} ♡</p> */}
          <div className="flex items-center justify-between">
            <div className="flex item-center justify-between mt-3">
              <div className="flex items-center px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                <button
                  className="bg-white rounded text-black py-1 px-2"
                  onClick={() => deleteItemFromCart(product.id)}
                >
                  -
                </button>
                <p className="px-4">{count}</p>
                <button
                  className="bg-white rounded text-black py-1 px-2"
                  onClick={() => addItemToCart(product.id)}
                >
                  +
                </button>
              </div>
            </div>
            <p className="font-bold text-3xl">₹{count * product.price}</p>
          </div>
          <button
            onClick={() => removeEntireItemFromCart(product.id)}
            className="mt-4 font-bold text-red-500 py-2 px-4 border border-solid border-red-500 rounded"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
