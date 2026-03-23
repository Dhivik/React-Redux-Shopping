import React from "react";
import { useDispatch } from "react-redux";
import { decreaseQuantity, increaseQuantity } from "../State/Slices/cartSlice";

export default function CartItem({
  id,
  title,
  imageUrl,
  price,
  rating,
  quantity,
}) {
  const dispatch = useDispatch();
  return (
    <div className="cart-item-container">
      <div className="cart-item">
        <img src={imageUrl} alt={title} />
        <div>
          <h3>{title}</h3>
          <p>{rating} ★ ★ ★ ★</p>
        </div>
      </div>
      <div className="item-price">${price}</div>
      <div className="item-quantity">
        <button onClick={() => dispatch(decreaseQuantity({ productId: id }))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => dispatch(increaseQuantity({ productId: id }))}>
          +
        </button>
      </div>
      <div className="item-total">${quantity * price}</div>
    </div>
  );
}
