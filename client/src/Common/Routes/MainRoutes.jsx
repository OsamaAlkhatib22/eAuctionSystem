import React, { lazy } from "react";

// Project imports
import Layout from "../Layouts/MainLayout";
import MinimalLayout from "../Layouts/MinimalLayout";
import Loadable from "../Utils/Loadable";

// Views Routing

const Login = Loadable(lazy(() => import("../../Views/Authentication/Login")));
const Register = Loadable(
  lazy(() => import("../../Views/Authentication/Register"))
);
const Dashboard = Loadable(lazy(() => import("../../Views/Dashboard")));
const NotFound = Loadable(lazy(() => import("../../Views/NotFound")));
const ViewComplaints = Loadable(lazy(() => import("../../Views/complaints/index")));
const CreateTask = Loadable(lazy(() => import("../../Views/createTask/index")));

const MainRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "view-complaints",
      element: <ViewComplaints />,
    },
    {
      path: "/create-task/:intComplaintId",
      element: <CreateTask />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export const AuthRoutes = {
  path: "/Auth",
  element: <MinimalLayout />,
  children: [
    {
      path: "",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default MainRoutes;
