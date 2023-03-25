import React from "react";

// Mui
import { Paper, Stack, Typography } from "@mui/material";

// Project Imports
import { IdentityHelper } from "../../Common/Utils/IdentityHelper";

const Dashboard = () => {
  const userData = IdentityHelper.UserData;
  return (
    <div>
      <Paper
        sx={{
          width: "17rem",
          height: "7.5rem",
          margin: "auto",
          padding: "1.5rem",
        }}
      >
        <Stack spacing={1}>
          <Typography variant="h5">Username: {userData.username}</Typography>
          <Typography variant="h5">
            Phonenumber: {userData.phonenumber}
          </Typography>
          <Typography variant="h5">User Type: {userData.usertype}</Typography>
        </Stack>
      </Paper>
    </div>
  );
};

export default Dashboard;
