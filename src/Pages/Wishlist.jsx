import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";

export default function Wishlist() {
  const allProducts = useSelector((state) => state.products.productList);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const wishlist = wishlistItems.map((item) => {
    const wishListProducts = allProducts.find(
      (product) => product.id === item.productId,
    );
    return { ...wishListProducts };
  });
  return (
    <>
      <h2 className="wish-list-heading">WishList Items!!!</h2>
      <div className="products-container">
        {wishlist.length > 0 &&
          wishlist.map(({ id, image, title, rating, price }) => (
            <ProductCard
              wishlist={true}
              key={id}
              productId={id}
              title={title}
              img={image}
              rating={rating}
              price={price}
            />
          ))}
      </div>
    </>
  );
}
