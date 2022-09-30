import React from "react";
import { Link } from "react-router-dom";
import { getDiscounts } from "../lib/mockServer";
import ProductItem from "./ProductItem";

export default function Discount() {
  const discounts = getDiscounts();
  return (
    <div className="my-8">
      <div className="bg-stone-700 text-white py-6">
        <p className="text-4xl uppercase tracking-widest">Discount Debuts</p>
      </div>
      <div className=" mt-12 mb-8 flex xl:flex-row sm:flex-col xl:border-0 justify-around items-center ">
        {discounts.map((item) => {
          return (
            <ProductItem
              key={item.id}
              product={item}
              showNewMemberDiscount={true}
            ></ProductItem>
          );
        })}
      </div>
      <div className="">
        <Link to="/products">
          <button className="text-white bg-stone-800 text-lg px-6 py-3 uppercase tracking-widest hover:bg-stone-600">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
}
