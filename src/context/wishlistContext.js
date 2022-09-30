import React, { useState } from "react";

const WishlistContext = React.createContext();

function WishlistContextProvider(props) {
  const [wishlistItems, setWishlistItems] = useState(() => {
    return localStorage.getItem("wishlist")
      ? JSON.parse(localStorage.getItem("wishlist"))
      : [];
  });

  const clearWishlist = () => {
    const updatedWishlist = [];
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
  };

  const addItemToWishlist = (productId) => {
    const updatedWishlist = [...wishlistItems];
    if (!updatedWishlist.includes(productId)) {
      updatedWishlist.push(productId);
    }
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    setWishlistItems(updatedWishlist);
  };

  const deleteItemFromWishlist = (productId) => {
    let updatedWishlist = [...wishlistItems];
    if (updatedWishlist.includes(productId)) {
      updatedWishlist = updatedWishlist.filter(
        (product) => productId !== product
      );
    }
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        clearWishlist,
        addItemToWishlist,
        deleteItemFromWishlist,
      }}
    >
      {props.children}
    </WishlistContext.Provider>
  );
}

export { WishlistContext, WishlistContextProvider };
