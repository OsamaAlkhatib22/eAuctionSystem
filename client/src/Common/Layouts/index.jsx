import React from "react";
import { Outlet } from "react-router-dom";

// Project imports
import NavBar from "../PartialViews/NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
