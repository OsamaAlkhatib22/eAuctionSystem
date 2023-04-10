import React, { lazy } from "react";

// Project imports
import Layout from "../Layouts/MainLayout";
import Loadable from "../Utils/Loadable";

// Views Routing
const Login = Loadable(lazy(() => import("../../Views/Authentication/Login")));
const Register = Loadable(
  lazy(() => import("../../Views/Authentication/Register"))
);
const Dashboard = Loadable(lazy(() => import("../../Views/Dashboard")));
const NotFound = Loadable(lazy(() => import("../../Views/NotFound")));

const MainRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default MainRoutes;
