import React, { Suspense } from "react";
import LatesProducts from "../LatesProducts/LatesProducts";
const latestProducts = fetch("http://localhost:3000/latest-products").then(
  (res) => res.json()
);
const Home = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading.....</p>}>
        <LatesProducts latestProducts={latestProducts}></LatesProducts>
      </Suspense>
    </div>
  );
};

export default Home;
