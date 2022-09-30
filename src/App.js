import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Form from "./Components/Form";
import Products from "./Components/Products";
import Cart from "./Components/Cart";
import Wishlist from "./Components/Wishlist";
import Footer from "./Components/Footer";
import { UserContext } from "./context/userContext";
import { useContext } from "react";
import MyAccount from "./Components/MyAccount";

function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/products" element={<Products />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>

        {isLoggedIn ? (
          <>
            <Route path="/login" element={<Navigate to="/account" />}></Route>
            <Route path="/account" element={<MyAccount />}></Route>
          </>
        ) : (
          <>
            <Route path="/login" element={<Form />}></Route>
            <Route path="/account" element={<Navigate to="/login" />}></Route>
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
