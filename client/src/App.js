import React, { useContext } from "react";

// Mui
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Project imports
import Routes from "./Routes";

// App context
import AppContext from "./Context/AppContext";

// Themes
import theme from "./Themes";

const App = () => {
  const { mode } = useContext(AppContext);
  return (
    <ThemeProvider theme={theme(mode)}>
      <CssBaseline />
      <Routes />
    </ThemeProvider>
  );
};

export default App;
