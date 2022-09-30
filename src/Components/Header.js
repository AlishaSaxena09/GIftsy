import { Link } from "react-router-dom";
import "../App.css";
export default function Header() {
  return (
    <div className="border-b-2">
      <div className=" bg-stone-700 py-1">
        <Link to="/products">
          <h4 className="text-sm text-white uppercase tracking-widest ">
            FREE SHIPPING ON ORDER ABOVE RS. 1199
          </h4>
        </Link>
      </div>
      <div className="flex items-center justify-between px-8 py-6">
        <div className="">
          <Link to="/">
            <h1 className="ballet text-4xl font-bold">Giftsy</h1>
          </Link>
        </div>
        <nav className="">
          <ul className="flex items-center text-gray-600">
            <li>
              <Link to="/wishlist">
                <i className="fa-regular fa-heart text-2xl mr-6"></i>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <i className="fa-regular fa-user text-2xl mr-6"></i>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <i className="fa-solid fa-cart-shopping text-2xl"></i>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
