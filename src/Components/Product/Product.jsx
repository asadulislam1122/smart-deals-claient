import React, { use } from "react";
import { Link } from "react-router";
import Details from "../Details/Details";

const Product = ({ product }) => {
  const { _id, title, price_min, price_max, image } = product;
  // console.log(product);
  return (
    <div className="card p-8 bg-base-100 shadow-sm">
      <figure className="px-10 pt-10">
        <img
          src={image}
          alt="Shoes"
          className="rounded-xl w-[300px] h-[250px] object-contain"
        />
      </figure>
      <div className=" items-center mt-4 mb-1 ">
        <h2 className="card-title text-2xl">{title}</h2>
        <p className="mt-2 text-xl">
          {" "}
          ${price_min}-{price_max}
        </p>
        <Link to={`/details/${_id}`}>
          {" "}
          <div className="card-actions">
            <button className="btn btn-primary w-full mt-4 text-xl">
              Veiw Details
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
