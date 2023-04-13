import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// Mui
import { Box, CssBaseline, useTheme } from "@mui/material";
import { styled } from "@mui/system";

// Third Party
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

// Project imports
import Navbar from "./Components/NavBar";
import Sidebar from "./Components/SideBar";
import ScrollableContent from "../../Components/ScrollableContent";

const Main = styled(Box)({
  display: "flex",
  flexFlow: "column",
  height: "100vh",
  width: "100vw",
});

const MainContent = styled("main")(({ theme }) => ({
  backgroundImage: theme?.palette?.background.image,
  height: `calc(100vh - 4rem)`,
  flex: "1 1 auto",
  overflow: "hidden",
}));

function Layout() {
  const theme = useTheme();

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
          <ScrollableContent>
            <Outlet />
          </ScrollableContent>
        </MainContent>
      </Sidebar>
    </Main>
  );
}

export default Layout;
