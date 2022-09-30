import React from "react";

import { getProducts } from "../lib/mockServer";
import ProductItem from "./ProductItem";

export default function Products() {
  const products = getProducts();

  return (
    <div className="my-8">
      <div className="text-center uppercase text-lg bg-stone-800 text-white py-4 tracking-widest">
        Never Before on Sale !
      </div>
      <div className="mb-8 p-10 flex justify-between flex-wrap items-center">
        {products.map((item) => {
          return <ProductItem key={item.id} product={item}></ProductItem>;
        })}
      </div>
    </div>
  );
}
