import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div className="w-full">
      <div className="w-full relative mt-8 ">
        <Link to="/products">
          <img
            alt="hero"
            className="w-full h-full object-cover"
            src="/images/heroImage.jpg"
          ></img>
        </Link>
      </div>
      <div className="absolute xl:top-64 right-32 bg-stone-700 xl:p-8 opacity-80 hero sm:top-40 sm:right-52 sm:p-4 ">
        <h1 className="uppercase xl:text-4xl text-white font-bold tracking-widest ">
          Festive Carnival
        </h1>
        <div className="border-2 border-white p-4 my-4">
          <p className="uppercase xl:text-xl text-white font-bold tracking-widest ">
            Upto
          </p>
          <p className="xl:text-7xl mb-4 mt-2 text-white font-bold tracking-widest ">
            50 % Off
          </p>
          <p className="uppercase xl:text-xl text-white font-bold tracking-widest">
            on selected products
          </p>
        </div>
        <Link to="/products">
          <button className="uppercase tracking-widest py-2 px-6 bg-white">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
}
