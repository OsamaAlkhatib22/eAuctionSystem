import React, { lazy } from "react";

// Project imports
import Layout from "../Layouts/MainLayout";
import MinimalLayout from "../Layouts/MinimalLayout";
import Loadable from "../Utils/Loadable";

// Views Routing

const Auth = Loadable(lazy(() => import("../../Views/Authentication/")));
const Dashboard = Loadable(lazy(() => import("../../Views/Dashboard")));
const NotFound = Loadable(lazy(() => import("../../Views/NotFound")));
const ViewComplaints = Loadable(lazy(() => import("../../Views/Complaints")));
const EvaluateTask = Loadable(lazy(() => import("../../Views/TaskEvaluation")));

const MainRoutes = {
  path: "/auth",
  element: <Layout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "complaints",
      element: <ViewComplaints />,
    },
    {
      path: "tasks",
      element: <EvaluateTask />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export const AuthRoutes = {
  path: "/",
  element: <MinimalLayout />,
  children: [
    {
      path: "",
      element: <Auth />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default MainRoutes;
