import React from "react";

// Mui
import {
  Grid,
  Typography,
  TextField,
  Button,
  Stack,
  Paper,
} from "@mui/material";

// Project Imports
import { Authorize } from "./Service/Login";

const LoginForm = () => {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");

  const SubmitForm = async (event) => {
    event.preventDefault();
    const request = {
      strLogin: login,
      strPassword: password,
    };
    await Authorize.Login(request);
  };

  return (
    <React.Fragment>
      <Paper sx={{ width: "25rem", margin: "auto", padding: "1.5rem" }}>
        <Stack direction="row">
          <Typography variant="h4" gutterBottom>
            Authentication
          </Typography>
        </Stack>
        <form onSubmit={SubmitForm}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="login"
                name="login"
                label="Login"
                value={login}
                fullWidth
                variant="standard"
                onChange={(e) => setLogin(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="password"
                name="password"
                type="password"
                label="Password"
                value={password}
                fullWidth
                variant="standard"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </React.Fragment>
  );
};

export default LoginForm;
