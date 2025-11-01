import React, { use } from "react";
import { Link, NavLink } from "react-router";
import { AuthContexts } from "../../Context/AuthContexts";

const Navbar = () => {
  const { signOutUser } = use(AuthContexts);
  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        alert("Sign Out Sucessfullly");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error.message);
      });
  };
  const { user } = use(AuthContexts);
  const items = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>

      <li>
        <NavLink to={"/allproducts"}>All_Products</NavLink>
      </li>
      <li>
        <NavLink to={"/register"}>Register</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to={"/myproducts"}>My Products</NavLink>
          </li>
          <li>
            <NavLink to={"/bits"}>My Bits</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {items}
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Link to={"/"}>
            <p className="font-bold text-3xl text-green-600">
              Smatr <span className="text-blue-700">Deals</span>
            </p>
          </Link>
          <div></div>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{items}</ul>
      </div>
      <div className="navbar-end">
        {user ? (
          <a onClick={handleSignOut} className="btn btn-primary">
            Sign Out
          </a>
        ) : (
          <Link to={"/register"} className="btn btn-secondary">
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
