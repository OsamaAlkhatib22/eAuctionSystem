import React from "react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

// Mui
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CssBaseline,
} from "@mui/material";
import { styled } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";

// Project imports
import Colors from "../../Assets/Styles/_themes-vars.module.scss";

const drawerWidth = 240;

const Main = styled("div")({
  display: "flex",
  flexFlow: "column",
  height: "100vh",
  width: "100vw",
});

const AppBarStyled = styled(AppBar)({
  zIndex: (theme) => theme.zIndex.drawer + 1,
});

const DrawerStyled = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: drawerWidth,
  },
});

const DrawerToolbar = styled(Toolbar)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const MainContent = styled("div")({
  backgroundColor: Colors.background,
  backgroundImage: Colors.backgroundGradient,
  flex: "1 1 auto",
  padding: (theme) => theme.spacing(3),
  paddingTop: "2.5rem",
});

function Layout() {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Main>
      <CssBaseline />
      <AppBarStyled position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBarStyled>

      <DrawerStyled variant="persistent" open={open}>
        <DrawerToolbar>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon />
          </IconButton>
        </DrawerToolbar>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItem>
        </List>
      </DrawerStyled>

      <MainContent>
        <div style={{ padding: "4rem" }}>
          <Outlet />
        </div>
      </MainContent>
    </Main>
  );
}

export default Layout;
