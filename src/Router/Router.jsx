import { createBrowserRouter } from "react-router";
import RootLayout from "../Components/Layout/RootLayout";
import Home from "../Components/Home/Home";
import AllProducts from "../Components/AllProducts/AllProducts";
import Register from "../Components/Register/Register";
import MyProducts from "../MyProducts/MyProducts";
import MyBids from "../Components/MyBids/MyBids";
import PrivetRoutes from "../PrivetRouts/PrivetRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      {
        path: "allproducts",
        Component: AllProducts,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/myproducts",
        element: (
          <PrivetRoutes>
            <MyProducts></MyProducts>
          </PrivetRoutes>
        ),
      },
      {
        path: "/bits",
        element: (
          <PrivetRoutes>
            <MyBids></MyBids>
          </PrivetRoutes>
        ),
      },
    ],
  },
]);
