import React, { useContext } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  SettingsOutlined,
} from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, useTheme } from "@mui/material";

// Project Imports
import { FlexBetween } from "../../../Components/FlexBetween";

// Context
import AppContext from "../../../Context/AppContext";
import AccountMenu from "./AccountMenu";

const Navbar = ({ user }) => {
  const theme = useTheme();
  const { ToggleDisplayMode } = useContext(AppContext);
  return (
    <AppBar
      theme={theme}
      sx={{
        height: "4rem",
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween />
        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={ToggleDisplayMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined color="primary" sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined color="primary" sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            <SettingsOutlined color="primary" sx={{ fontSize: "25px" }} />
          </IconButton>

          <FlexBetween>
            <AccountMenu user={user} />
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
