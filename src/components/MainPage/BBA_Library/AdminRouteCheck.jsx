import React from "react";
import { useContext } from "react";
import { Children } from "react";
import { Navigate, Outlet } from "react-router-dom";

function AdminRouteCheck({ Children, ...rest }) {
  //librarian condition
  const User = true;
  return User ? (
    <Outlet element={<Children />} props={rest} />
  ) : (
    <Navigate to="/view/categories" />
  );
}

export default AdminRouteCheck;
