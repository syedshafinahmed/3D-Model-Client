import { use } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router";
import { BeatLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = use(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">
      <BeatLoader color="#db2777" />
    </div>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/auth/login"></Navigate>;
  }

  return children;
};

export default PrivateRoute;
