import React from "react";
import { useDispatch } from "react-redux";
import { addCartItems } from "../State/Slices/cartSlice";
import {
  addWishListItems,
  removeWishListItems,
} from "../State/Slices/wishListSlice";

export default function ProductCard({
  productId,
  img,
  title,
  price,
  rating,
  wishlist = false,
}) {
  const dispatch = useDispatch();
  return (
    <div className="product">
      <div className="product-image">
        <img src={img} alt={title} />
      </div>
      <div className="title-container">
        <h3>{title}</h3>
      </div>
      <div className="price-rating-container">
        <p className="rating">{+rating.rate} ★ ★ ★ ★</p>
        <p className="price">${price}</p>
      </div>
      <div className="cta-container">
        <button
          onClick={() => {
            dispatch(addCartItems({ productId }));
          }}
        >
          Add to Cart!
        </button>
        {wishlist ? (
          <button onClick={() => dispatch(removeWishListItems({ productId }))}>
            Remove from WishList!
          </button>
        ) : (
          <button onClick={() => dispatch(addWishListItems({ productId }))}>
            Add to WishList!
          </button>
        )}
      </div>
    </div>
  );
}
