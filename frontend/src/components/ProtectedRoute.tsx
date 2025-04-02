import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { ReactNode, useEffect, useState } from "react";

type ProtectedRouteProps = {
  children?: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { token, checkAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth();
      setLoading(false);
    };

    verifyAuth();
  }, [checkAuth]);

  if (loading)
    return <div className="text-center mt-20 text-xl">Loading...</div>;

  return token ? <>{children}</> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
