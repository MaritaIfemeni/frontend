import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAppSelector from "../hooks/useAppSelector";

interface RouteProps {
  children: React.ReactNode;
}

interface PrivateRouteProps extends RouteProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  fallbackPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  isAdmin,
  fallbackPath,
}) => {
  const currentUser = useAppSelector((state) => state.userReducer.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || !currentUser || (isAdmin && !currentUser.isAdmin)) {
      navigate(fallbackPath);
    }
  }, [isAuthenticated, currentUser, isAdmin, fallbackPath, navigate]);

  if (!isAuthenticated || !currentUser || (isAdmin && !currentUser.isAdmin)) {
    return null;
  }
  return <>{children}</>;
};

export default PrivateRoute;
