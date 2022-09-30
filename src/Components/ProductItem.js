import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { WishlistContext } from "../context/wishlistContext";

const ProductItem = ({ product, showNewMemberDiscount = false }) => {
  const { addItemToWishlist, deleteItemFromWishlist, wishlistItems } =
    useContext(WishlistContext);
  const { addItemToCart } = useContext(CartContext);

  const isWishlisted = wishlistItems.includes(product.id);

  return (
    <div
      className={`my-2 ${
        showNewMemberDiscount ? "w-1/4 p-6 text-left" : "w-64 p-4 border-2"
      }`}
    >
      <div className="relative w-full">
        <Link to="/products">
          <img
            alt="product"
            className="object-cover w-full h-full"
            src={product.imgUrl}
          ></img>
        </Link>

        <div
          className={`icons text-gray-700 absolute bottom-0 ${
            showNewMemberDiscount ? "right-4" : "right-3"
          } flex items-center transform translate-y-1/2`}
        >
          <button
            onClick={() =>
              isWishlisted
                ? deleteItemFromWishlist(product.id)
                : addItemToWishlist(product.id)
            }
            className={`rounded-full w-10 h-10 flex items-center justify-center mr-2 shadow ${
              isWishlisted
                ? "bg-red-500 hover:bg-opacity-95 text-white"
                : "bg-white hover:bg-gray-50"
            }`}
          >
            <i className="fa-regular fa-heart text-xl"></i>
          </button>
          <button
            className="bg-white rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-50"
            onClick={() => addItemToCart(product.id)}
          >
            <i className="fa-solid fa-plus text-xl"></i>
          </button>
        </div>
      </div>
      <div className="mb-4 mt-8">
        <Link to="/products">
          <h1 className="text-base tracking-wide leading-2">{product.name}</h1>
        </Link>
        <div
          className={`my-4 ${
            showNewMemberDiscount ? "text-left" : "text-center"
          }`}
        >
          <p className="font-bold text-base inline-block">
            ₹ {product.discountedPrice}
          </p>
          <p className="line-through text-gray-400 text-sm mx-2 inline-block">
            {product.price}
          </p>
          <p className="text-white text-xs bg-red-500 px-0.5 inline-block">
            {product.off}% Off
          </p>
        </div>
        {showNewMemberDiscount ? (
          <div className="bg-stone-700 text-white mx-0 text-left w-full px-2 py-1">
            <p className="leading-2 font-medium py-px pr-2 w-full">
              ₹ {product.newPrice} for new members
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductItem;
