import React from "react";
import { Outlet } from "react-router-dom";

// Mui
import { Box, CssBaseline, useTheme } from "@mui/material";
import { styled } from "@mui/system";

const Main = styled(Box)({
  display: "flex",
  height: "100vh",
  width: "100vw",
});

const SplashPage = styled("div")(({ theme }) => ({
  backgroundImage: theme?.palette?.background.image,
  width: "69vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
  flex: "0 1 auto",
  boxShadow: "inset -0.2rem 0rem 4rem rgba(0, 0, 0, 0.2)",
}));

const MainContent = styled("main")(({ theme }) => ({
  flex: "1 1 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 1),
}));

function MinimalLayout() {
  const theme = useTheme();

  return (
    <Main>
      <CssBaseline />
      <SplashPage>Jordan</SplashPage>
      <MainContent>
        <Outlet />
      </MainContent>
    </Main>
  );
}

export default MinimalLayout;
