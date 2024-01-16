import React from 'react';
import HomeHeader from './HomeHeader';
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

function ClientHome() {

  return (
    <div>
      <HomeHeader />

      <Box m={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Welcome to Your Client Dashboard!
            </Typography>
            <Typography variant="body1" paragraph>
              Explore and manage your tasks with ease. Connect with freelancers
              and get your work done efficiently.
            </Typography>

            {/* Add your existing content here */}
          </CardContent>
        </Card>
      </Box>

      <Box m={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Create a New Task
            </Typography>
            <Divider />

            <Box mt={2}>
              <Button
                component={Link}
                to="/ClientCreateTask"
                variant="contained"
                color="primary"
                style={{ backgroundColor: '#8b0000', color: 'white' }}
              >
                Create Task
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}

export default ClientHome;
