import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// Mui
import { Box, CssBaseline, useTheme } from "@mui/material";
import { styled } from "@mui/system";

// Project imports
import Navbar from "./Components/NavBar";
import Sidebar from "./Components/SideBar";

const Main = styled(Box)({
  display: "flex",
  flexFlow: "column",
  height: "100vh",
  width: "100vw",
});

function Layout() {
  const theme = useTheme();

  const MainContent = styled("main")({
    backgroundImage: theme?.palette?.background.image,
    height: `calc(100vh - 4rem)`,
    padding: "3rem",
    flex: "1 1 auto",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Main>
      <CssBaseline />
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        theme={theme}
      />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      >
        <MainContent>
          <Outlet />
        </MainContent>
      </Sidebar>
    </Main>
  );
}

export default Layout;
