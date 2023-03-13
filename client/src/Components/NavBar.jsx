import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Context
import AppContext from "../Context/AppContext";

// Mui
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  IconButton,
  ButtonBase,
} from "@mui/material";

// Mui Icons
import DarkModeIcon from "@mui/icons-material/DarkMode";

const NavBar = () => {
  const { ToggleDisplayMode } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <ButtonBase onClick={() => navigate("/")}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Distance App
            </Typography>
          </ButtonBase>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={ToggleDisplayMode}
            sx={{ mr: 2 }}
          >
            <DarkModeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
