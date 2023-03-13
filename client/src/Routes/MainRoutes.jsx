import React, { lazy } from "react";

// Project imports
import Layout from "../Layouts";
import Loadable from "../Utils/Loadable";

// Views Routing
const SearchView = Loadable(lazy(() => import("../Views/SearchView")));
const TripView = Loadable(lazy(() => import("../Views/TripView")));

const MainRoutes = {
  path: "/",
  element: <Layout />,
  children: [
    {
      path: "",
      element: <SearchView />,
    },
    {
      path: "trip",
      element: <TripView />,
    },
  ],
};

export default MainRoutes;
