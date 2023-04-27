import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mui
import {
  Box,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ChevronRightOutlined,
  SettingsOutlined,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

// Third Party
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

// Project Imports
import GetMenus from "../Utils/SideBarMenus";
import { FlexBetween } from "../../../Components/FlexBetween";
import { DrawerHeader, Drawer } from "../Utils/SideBarHelpers";
import { IdentityHelper } from "../../../Utils/IdentityHelper";
import CapitalizeFirstLetter from "../../../Utils/CapitalizeFirstLetter";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, children }) => {
  const theme = useTheme();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const user = IdentityHelper.UserData;
  const SideBarMenus = GetMenus(user.userType);
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={isSidebarOpen}>
        <PerfectScrollbar>
          <DrawerHeader>
            <FlexBetween gap="1.5rem">
              <Typography variant="h4" fontWeight="bold">
                Road Damage
              </Typography>
              <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                {!isSidebarOpen ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </FlexBetween>
          </DrawerHeader>
          {/* SIDEBAR OPENED STATUS */}
          {isSidebarOpen ? (
            <Stack height="95%" justifyContent="space-between">
              <List>
                {SideBarMenus.map(({ text, path, icon }) => {
                  if (!icon) {
                    return (
                      <React.Fragment key={text}>
                        <Divider />
                        <Typography
                          variant="h4"
                          fontWeight="regular"
                          sx={{ m: "2.25rem 0 1rem 3rem" }}
                        >
                          {text}
                        </Typography>
                      </React.Fragment>
                    );
                  }
                  return (
                    <ListItem key={text} disablePadding>
                      <ListItemButton
                        onClick={() => {
                          navigate(path);
                          setActive(path);
                        }}
                        sx={{
                          backgroundColor:
                            active === path
                              ? theme.palette.secondary[300]
                              : "transparent",
                          color:
                            active === path
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[100],
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            ml: "2rem",
                            color:
                              active === path
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} key={text + "Text"} />
                        {active === path && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
              <Box marginBottom="2rem">
                <Divider variant="middle" />
                <FlexBetween
                  textTransform="none"
                  gap="1rem"
                  m="1.5rem 2rem 0 3rem"
                >
                  <Box textAlign="left">
                    <Typography
                      fontWeight="bold"
                      fontSize="0.9rem"
                      sx={{ color: theme.palette.secondary[100] }}
                    >
                      {CapitalizeFirstLetter(user.firstName) +
                        " " +
                        CapitalizeFirstLetter(user.lastName)}
                    </Typography>
                    <Typography
                      fontSize="0.8rem"
                      sx={{ color: theme.palette.secondary[200] }}
                    >
                      {CapitalizeFirstLetter(user.userType)}
                    </Typography>
                  </Box>
                  <ListItemButton
                    onClick={() => {
                      navigate("/auth/account");
                      setActive("account");
                    }}
                    sx={{
                      backgroundColor:
                        active === "account"
                          ? theme.palette.secondary[300]
                          : "transparent",
                      color:
                        active === "account"
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[100],
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        ml: "2rem",
                        color:
                          active === "account"
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[200],
                      }}
                    >
                      <SettingsOutlined />
                    </ListItemIcon>
                  </ListItemButton>
                </FlexBetween>
              </Box>
            </Stack>
          ) : (
            <Stack height="95%" justifyContent="space-between">
              <List>
                {/* SIDEBAR ClOSED STATUS */}
                {SideBarMenus.map(({ text, path, icon }) => {
                  if (!icon) return <Divider key={text} />;

                  return (
                    <ListItem
                      key={text}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <ListItemButton
                        onClick={() => {
                          navigate(path);
                          setActive(path);
                        }}
                        sx={{
                          minHeight: 48,
                          justifyContent: isSidebarOpen ? "initial" : "center",
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: isSidebarOpen ? 3 : "auto",
                            justifyContent: "center",
                            color:
                              active === path
                                ? theme.palette.primary[600]
                                : theme.palette.secondary[200],
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
              <Box marginBottom="2rem">
                <Divider variant="middle" />
                <ListItemButton
                  onClick={() => {
                    navigate(`/auth/account`);
                    setActive("account");
                  }}
                  sx={{
                    minHeight: 48,
                    justifyContent: isSidebarOpen ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: isSidebarOpen ? 3 : "auto",
                      justifyContent: "center",
                      color:
                        active === "account"
                          ? theme.palette.primary[600]
                          : theme.palette.secondary[200],
                    }}
                  >
                    <SettingsOutlined />
                  </ListItemIcon>
                </ListItemButton>
              </Box>
            </Stack>
          )}
          <Divider />
        </PerfectScrollbar>
      </Drawer>
      <Box component="div" sx={{ flex: "1 1 auto" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
