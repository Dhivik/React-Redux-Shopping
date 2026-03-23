import React, { useEffect } from "react";
import cartIcon from "../assets/cart-icon.svg";
import wishListIcon from "../assets/wishlist-icon.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../State/Slices/productSlice";
import { loadCartItems } from "../State/Slices/cartSlice";
import { loadWishListItems, wishListLoading } from "../State/Slices/wishListSlice";

export default function Header() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    const cartData = JSON.parse(localStorage.getItem("cartItems"));
    const wishListData = JSON.parse(localStorage.getItem("wishListitem"));
    dispatch(loadCartItems({ cartData }));
    // dispatch(loadWishListItems({ wishListData }));
  }, []);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  return (
    <header>
      <div className="header-container">
        <h1>
          <Link to="/">Shopping!</Link>
        </h1>
        <>
          <Link to="/cart" className="cart-icon">
            <img src={cartIcon} alt="Cart Icon" />
            <div className="cart-items-count">{cartItems.length}</div>
          </Link>
          <Link to="/wishlist" className="cart-icon">
            <img
              src={wishListIcon}
              alt="WishListIcon Icon"
              className="wishlist-icon"
            />
            <div className="cart-items-count">{wishlistItems.length}</div>
          </Link>
        </>
      </div>
    </header>
  );
}
