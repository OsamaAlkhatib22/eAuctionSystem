import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// Mui
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/system";

// Project imports
import Navbar from "./Components/NavBar";
import Sidebar from "./Components/SideBar";
import ScrollableContent from "../../Components/ScrollableContent";
import { IdentityHelper } from "../../Utils/IdentityHelper";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const user = IdentityHelper.UserData;

  return user ? (
    <Main>
      <CssBaseline />
      <Navbar user={user} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        user={user}
      >
        <MainContent>
          <ScrollableContent>
            <Outlet />
          </ScrollableContent>
        </MainContent>
      </Sidebar>
    </Main>
  ) : (
    <MainContent>
      <ScrollableContent>
        <Outlet />
      </ScrollableContent>
    </MainContent>
  );
}

export default Layout;
