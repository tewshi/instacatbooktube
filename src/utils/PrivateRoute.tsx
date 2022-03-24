import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "./utils";

interface LayoutProps {
  children: JSX.Element;
}

export default function PrivateRoute({ children }: LayoutProps): JSX.Element {
  const auth = useAuth();
  return auth ? children : <Navigate to="/login" />;
}
