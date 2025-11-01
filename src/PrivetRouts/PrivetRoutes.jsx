import { use } from "react";
import { AuthContexts } from "../Context/AuthContexts";
import { Navigate, useLocation } from "react-router";

const PrivetRoutes = ({ children }) => {
  const { user, loading } = use(AuthContexts);
  console.log(user);
  const location = useLocation();
  console.log(location);

  //   aaaaaaaaaaaaaaaaa
  if (loading) {
    return <p>Loading.........</p>;
  }
  if (user && user.email) {
    return children;
  }
  return <Navigate key={location.pathname} to={"/"}></Navigate>;
};

export default PrivetRoutes;
