import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../Components/CartItem";

export default function Cart() {
  const isLoading = useSelector((state) => state.cart.loading);
  const isError = useSelector((state) => state.cart.isError);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const allProducts = useSelector((state) => state.products.productList);

  const productList = cartItems.map(({ productId, quantity }) => {
    const productDetails = allProducts.find(
      (product) => product.id === productId,
    );
    return { ...productDetails, quantity };
  });

  const totalPrice = productList.reduce(
    (total, item) => item.price * item.quantity + total,
    0,
  );

  return (
    <div className="cart-container">
      <h2>Items in Your Cart</h2>
      <div className="cart-items-container">
        <div className="cart-header cart-item-container">
          <div className="cart-item">Item</div>
          <div className="item-price">Price</div>
          <div className="quantity">Quantity</div>
          <div className="total">Total</div>
        </div>
        {isLoading ? (
          <h2 style={{ textAlign: "center" }}>Loading....</h2>
        ) : isError ? (
          <h2 style={{ textAlign: "center" }}>{isError}</h2>
        ) : (
          productList.map(
            ({ id, title, rating, price, image, quantity = 1 }) => (
              <CartItem
                key={id}
                id={id}
                title={title}
                price={price}
                quantity={quantity}
                imageUrl={image}
                rating={rating?.rate}
              />
            ),
          )
        )}
        <div className="cart-header cart-item-container">
          <div></div>
          <div></div>
          <div></div>
          {isError ? null : (
            <div className="total">${Math.round(totalPrice * 100) / 100}</div>
          )}
        </div>
      </div>
    </div>
  );
}
