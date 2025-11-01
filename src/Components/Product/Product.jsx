import React, { use } from "react";

const Product = ({ product }) => {
  const { title, price_min, price_max, image } = product;
  return (
    <div className="card p-8 bg-base-100 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className=" items-center mt-4 mb-1 ">
        <h2 className="card-title text-2xl">{title}</h2>
        <p className="mt-2 text-xl">
          {" "}
          ${price_min}-{price_max}
        </p>
        <div className="card-actions">
          <button className="btn btn-primary w-full mt-4 text-xl">
            veiwe Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
