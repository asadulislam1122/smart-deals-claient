import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { RouterProvider } from "react-router/dom";
import { router } from "./Router/Router.jsx";
import AuthProvaider from "./Context/AuthProvaider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvaider>
      <RouterProvider router={router} />
    </AuthProvaider>
  </StrictMode>
);
