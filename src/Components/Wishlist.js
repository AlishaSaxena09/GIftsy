import React, { useContext } from "react";
import { WishlistContext } from "../context/wishlistContext";
import { getProducts } from "../lib/mockServer";
import ProductItem from "./ProductItem";

export default function Wishlist() {
  const products = getProducts();
  const { wishlistItems } = useContext(WishlistContext);

  return (
    <div className="my-8">
      <div className="text-center uppercase text-lg bg-stone-800 text-white py-4 tracking-widest">
        Your wishlist
      </div>
      <div className="mb-8 p-10 flex justify-center flex-wrap items-center gap-4">
        {wishlistItems.map((item) => {
          const product = products.find((product) => product.id === item);
          return <ProductItem key={product.id} product={product}></ProductItem>;
        })}
      </div>
    </div>
  );
}
