import React, { lazy } from "react";

// Project imports
import Layout from "../Layouts";
import Loadable from "../Utils/Loadable";

// Views Routing
const LoginForm = Loadable(lazy(() => import("../../Views/Authentication")));
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
      path: "login",
      element: <LoginForm />,
    },
  ],
};

export default MainRoutes;
