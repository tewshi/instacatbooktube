import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Home from "./pages/Home";
import Favorite from "./pages/Favorite";
import Login from "./pages/Login";

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/favorite"
        element={
          <PrivateRoute>
            <Favorite />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
