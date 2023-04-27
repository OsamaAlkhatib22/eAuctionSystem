import React, { useContext } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
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
  useTheme,
} from "@mui/material";

// Project Imports
import { FlexBetween } from "../../../Components/FlexBetween";
import { IdentityHelper } from "../../../Utils/IdentityHelper";
import CapitalizeFirstLetter from "../../../Utils/CapitalizeFirstLetter";

// Context
import AppContext from "../../../Context/AppContext";

const Navbar = () => {
  const theme = useTheme();
  const { ToggleDisplayMode } = useContext(AppContext);
  const user = IdentityHelper.UserData;
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
                  {CapitalizeFirstLetter(user.firstName) +
                    " " +
                    CapitalizeFirstLetter(user.lastName)}
                </Typography>
                <Typography
                  fontSize="0.75rem"
                  sx={{ color: theme?.palette?.secondary[200] }}
                >
                  {CapitalizeFirstLetter(user.userType)}
                </Typography>
              </Box>
              <ArrowDropDownOutlined
                sx={{ color: theme?.palette.secondary[300], fontSize: "25px" }}
              />
            </Button>
          </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
