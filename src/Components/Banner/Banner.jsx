import React from "react";
import { FaSearch } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-orange-200 to-indigo-300   flex flex-col justify-center items-center text-center mb-6 space-y-5">
      <h1 className="font-bold text-5xl mt-10">
        Deal Your <span className="text-blue-600">Products</span> In A <br />{" "}
        <span className="text-orange-500">Smart </span>
        Way!
      </h1>
      <p className="font-semibold text-[20px] text-gray-700">
        Smart Deals helps your sell ,Smart deals all in one . Faborite Place in
        smart deals!!!
      </p>
      <div className="relative w-[400px]">
        <input
          className="border-1 border-blue-200 md:w-full h-[50px] rounded-4xl bg-gray-200 shadow shadow-blue-300 pr-10"
          type="text"
          name="products"
          id=""
          placeholder=" Smart Deals Products Name "
        />
        {/* ডান দিকে বসানোর জন্য ক্লাস: inset-y-0 right-0 */}
        <p className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-500">
          <FaSearch></FaSearch>
        </p>
      </div>

      <div className="flex mb-6 gap-7">
        <button className="btn btn-primary md:text-xl">
          Watch All Products
        </button>
        <button className="btn md:text-xl btn-accent">Past An Products</button>
      </div>
    </div>
  );
};

export default Banner;
