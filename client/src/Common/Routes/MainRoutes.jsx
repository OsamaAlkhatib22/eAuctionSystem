import React, { lazy } from "react";

// Project imports
import Layout from "../Layouts";
import Loadable from "../Utils/Loadable";

// Views Routing
const LoginForm = Loadable(
  lazy(() => import("../../Views/Authentication/Component/Login"))
);
const Dashboard = Loadable(lazy(() => import("../../Views/Dashboard")));
const Register = Loadable(
  lazy(() => import("../../Views/Authentication/Component/Register"))
);
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
      path: "/",
      element: <LoginForm />,
    },
    {
      path: "register",
      element: <Register />,
    },
    {
      path: "view-complaints",
      element: <ViewComplaints />,
    },
    {
      path: "/create-task/:intComplaintId",
      element: <CreateTask />,
    },
  ],
};

export default MainRoutes;
