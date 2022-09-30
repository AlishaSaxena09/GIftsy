import { Link } from "react-router-dom";
import { season } from "../data";

export default function Season() {
  return (
    <div className="mt-16 mb-8">
      <div className="text-white bg-stone-800 py-6">
        <p className="text-4xl uppercase tracking-widest">
          the season of warm get-togethers !
        </p>
      </div>
      <div className="mt-8">
        <div className=" w-full mb-20">
          <Link to="/products">
            <img
              alt="product"
              src="/images/season.webp"
              className="object-cover"
            ></img>
          </Link>
        </div>
        <div className=" flex justify-around ">
          {season.map((image) => {
            return (
              <div className="shadow-lg" key={image}>
                <Link to="/products">
                  <img alt="product" src={`/images/${image}`}></img>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
