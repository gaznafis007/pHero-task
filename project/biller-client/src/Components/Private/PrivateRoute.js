import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../api/AuthProvider";
import Lottie from "lottie-react";
import refresh from "../../asset/refresh.json";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return (
      <>
        <div className="w-96 p-4 my-4 mx-auto">
          <Lottie animationData={refresh}></Lottie>
        </div>
        <div className="w-16 h-16 p-16 border-8 border-indigo-700 border-dotted rounded-full animate-spin mx-auto"></div>
      </>
    );
  }
  if (user?.email) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
