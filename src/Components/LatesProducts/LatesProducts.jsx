import React, { use } from "react";
import Product from "../Product/Product";

const LatesProducts = ({ latestProducts }) => {
  const products = use(latestProducts);
  // console.log(products);

  return (
    <div>
      <h1 className="text-center font-bold text-3xl">
        <span className="text-blue-600">Resent</span> Products
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 mx-auto gap-5">
        {products.map((product) => (
          <Product key={product._id} product={product}></Product>
        ))}
      </div>
    </div>
  );
};

export default LatesProducts;
