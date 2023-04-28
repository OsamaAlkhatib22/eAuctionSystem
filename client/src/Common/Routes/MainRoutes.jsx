import React, { lazy } from "react";

// Project imports
import Layout from "../Layouts/MainLayout";
import MinimalLayout from "../Layouts/MinimalLayout";
import Loadable from "../Utils/Loadable";
import PermissionsHelper from "../Utils/PermissionsHelper";

// Views Routing
const Home = Loadable(lazy(() => import("../../Views/Home")));
const ViewComplaints = Loadable(lazy(() => import("../../Views/Complaints")));
const EvaluateTask = Loadable(lazy(() => import("../../Views/TaskEvaluation")));
const NotFound = Loadable(lazy(() => import("../../Views/NotFound")));
const Auth = Loadable(lazy(() => import("../../Views/Authentication/")));
const Login = Loadable(lazy(() => import("../../Views/Authentication/Login")));
const Register = Loadable(
  lazy(() => import("../../Views/Authentication/Register"))
);

const Admin = "admin";
const Worker = "worker";
const User = "user";

const MainRoutes = {
  path: "/auth",
  element: <Layout />,
  children: [
    {
      path: "home",
      element: (
        <PermissionsHelper
          allowedRoles={[Admin, Worker, User]}
          element={<Home />}
        />
      ),
    },
    {
      path: "complaints",
      element: (
        <PermissionsHelper
          allowedRoles={[Admin, User]}
          element={<ViewComplaints />}
        />
      ),
    },
    {
      path: "tasks",
      element: (
        <PermissionsHelper
          allowedRoles={[Admin, Worker]}
          element={<EvaluateTask />}
        />
      ),
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
      children: [
        {
          path: "",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ],
};

export default MainRoutes;
