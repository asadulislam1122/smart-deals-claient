import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import Banner from "../Banner/Banner";

const RootLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Banner></Banner>
      <main className="w-11/12  mx-auto">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
