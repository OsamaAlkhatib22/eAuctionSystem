import { Grid, Paper, Typography } from "@mui/material";

function Dashboard() {
  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard Content
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>Chart goes here</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>Widget goes here</Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper>Widget goes here</Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default Dashboard;
