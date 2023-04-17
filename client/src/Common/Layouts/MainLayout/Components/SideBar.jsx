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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  ChevronRightOutlined,
  SettingsOutlined,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";

// Project Imports
import { SideBarMenus } from "../Utils/SideBarMenus";
import { FlexBetween } from "../../../Components/FlexBetween";
import { DrawerHeader, Drawer } from "../Utils/SideBarHelpers";
import { IdentityHelper } from "../../../Utils/IdentityHelper";
import CapitalizeFirstLetter from "../../../Utils/CapitalizeFirstLetter";

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, children }) => {
  const theme = useTheme();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const user = IdentityHelper.UserData;

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={isSidebarOpen}>
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
        {/* SIDEBAR OPEN STATUS */}
        {isSidebarOpen ? (
          <>
            <List>
              {SideBarMenus.map(({ text, icon }) => {
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
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/auth/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} key={text + "Text"} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
            <Box width={"100%"} position="absolute" bottom="2rem">
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
                    navigate("/account");
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
          </>
        ) : (
          <>
            <List>
              {/* SIDEBAR OPEN STATUS */}
              {SideBarMenus.map(({ text, icon }) => {
                const lcText = text.toLowerCase();
                if (!icon) return <Divider key={text} />;

                return (
                  <ListItem key={text} disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
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
                            active === lcText
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
            <Box width={"100%"} position="absolute" bottom="2rem">
              <Divider variant="middle" />
              <ListItemButton
                onClick={() => {
                  navigate(`/account`);
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
          </>
        )}
        <Divider />
      </Drawer>
      <Box component="div" sx={{ flex: "1 1 auto" }}>
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
