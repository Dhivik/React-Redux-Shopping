import React from "react";
// import { productList } from "../dummyData";
import ProductCard from "../Components/ProductCard";
import { useSelector } from "react-redux";

export default function Home() {
  const productList = useSelector((state) => state.products.productList);
  const isLoading = useSelector((state) => state.products.loading);
  const isError = useSelector((state) => state.products.isError);
  return isLoading ? (
    <h2 className="loading">Products Loading!!!</h2>
  ) : isError ? (
    <h2>{isError}</h2>
  ) : (
    <div className="products-container">
      {productList.map(({ id, image, title, rating, price }) => (
        <ProductCard
          key={id}
          productId={id}
          title={title}
          img={image}
          rating={rating}
          price={price}
        />
      ))}
    </div>
  );
}
