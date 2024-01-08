import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import FreeLancerHomeHeader from "./FreeLancerHomeHeader";
import { Link } from "react-router-dom";
import ExploreIcon from '@mui/icons-material/Explore';
import { fetchTasks } from "./Service/Auth";

const FreeLancerHome = () => {
  const [featuredTasks, setFeaturedTasks] = useState([]);

  useEffect(() => {
    const fetchFeaturedTasks = async () => {
      try {
        const tasks = await fetchTasks();
        // Get the first two tasks
        const firstTwoTasks = tasks.slice(0, 2);
        setFeaturedTasks(firstTwoTasks);
      } catch (error) {
        console.error("Error fetching featured tasks:", error.message);
      }
    };

    fetchFeaturedTasks();
  }, []);

  return (
    <div>
      <FreeLancerHomeHeader />
      <Box m={4}>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Welcome to Your FreeLancer Dashboard!
            </Typography>
            <Typography variant="body1" paragraph>
              Discover new opportunities and manage your freelance projects seamlessly. Connect with clients and showcase your skills to excel in your freelance journey.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              What would you like to do?
            </Typography>
            <Box display="flex" justifyContent="space-between">
            <Button
                variant="contained"
                style={{ backgroundColor: '#8b0000', color: '#fff' }}
                component={Link}
                to="/FreeLancerTask"
                startIcon={<ExploreIcon />}
              >
                Explore Tasks
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              Featured Tasks
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
  {featuredTasks.map((task) => (
    <Card key={task.serviceId} sx={{ marginBottom: 2, width: '100%' }}>
      <CardContent>
        <Typography variant="h6">
          {task.title}
        </Typography>
        <Typography variant="body2" noWrap>
          {task.description.length > 150
            ? task.description
                .substring(0, 150)
                .match(/(?:\S+\s*){1,50}/g)
                .join('\n') + '...'
            : task.description}
        </Typography>
      </CardContent>
    </Card>
  ))}
</Box>

          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default FreeLancerHome;
