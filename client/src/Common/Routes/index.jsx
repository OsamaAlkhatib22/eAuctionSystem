import React from "react";
import { useRoutes } from "react-router-dom";

// Routes
import MainRoutes from "./MainRoutes";

const Routes = () => {
  return useRoutes([MainRoutes]);
};

export default Routes;
