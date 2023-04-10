import React, { useState, useContext } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";

// Project Imports
import { FlexBetween } from "../Utils/FlexBetween";

// Context
import AppContext from "../../../Context/AppContext";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, drawerWidth }) => {
  const theme = useTheme();
  const { ToggleDisplayMode } = useContext(AppContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const AppHeader = styled(AppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    transition: theme.transitions.create(["margin", "width"], {
      easing: { sharp: "cubic-bezier(0.4, 0, 0.6, 1)" },
      duration: { standard: 300 },
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}rem)`,
      marginLeft: `${drawerWidth}rem`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: { easeOut: "cubic-bezier(0.0, 0, 0.2, 1)" },
        duration: { standard: 300 },
      }),
    }),
  }));

  return (
    <AppHeader
      open={isSidebarOpen}
      theme={theme}
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={ToggleDisplayMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <Button
              onClick={handleClick}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textTransform: "none",
                gap: "1rem",
              }}
            >
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.85rem"
                  sx={{ color: theme?.palette?.secondary[100] }}
                >
                  Full Name
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme?.palette?.secondary[200] }}
                >
                  User Type
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme?.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
            <Menu
              anchorEl={anchorEl}
              open={isOpen}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <MenuItem onClick={handleClose}>Log Out</MenuItem>
            </Menu>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppHeader>
  );
};

export default Navbar;
