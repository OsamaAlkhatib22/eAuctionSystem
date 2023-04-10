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

const drawerWidth = 15; // in Rems

function Layout() {
  const theme = useTheme();

  const MainContent = styled("main", {
    shouldForwardProp: (prop) => prop !== "open",
  })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: { sharp: "cubic-bezier(0.4, 0, 0.6, 1)" },
        duration: { standard: 300 },
      }),
      marginLeft: `-${drawerWidth}rem`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: { easeOut: "cubic-bezier(0.0, 0, 0.2, 1)" },
          duration: { standard: 300 },
        }),
        marginLeft: 0,
      }),
    }),
    {
      backgroundImage: theme?.palette?.background.image,
      flex: "1 1 auto",
    }
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Main>
      <CssBaseline />
      <Sidebar
        drawerWidth={drawerWidth}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Navbar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        drawerWidth={drawerWidth}
        theme={theme}
      />
      <MainContent theme={theme} open={isSidebarOpen}>
        <div style={{ padding: "2.5rem" }}>
          <Outlet />
        </div>
      </MainContent>
    </Main>
  );
}

export default Layout;
