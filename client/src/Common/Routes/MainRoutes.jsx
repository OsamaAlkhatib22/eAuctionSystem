import React, { lazy } from "react";

// Project imports
import Layout from "../Layouts";
import Loadable from "../Utils/Loadable";

// Views Routing
const Login = Loadable(
  lazy(() => import("../../Views/Authentication/Components/Login"))
);
const Register = Loadable(
  lazy(() => import("../../Views/Authentication/Components/Register"))
);
const Dashboard = Loadable(lazy(() => import("../../Views/Dashboard")));

const MainRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ],
};

export default MainRoutes;
