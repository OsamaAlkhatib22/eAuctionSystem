import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import HomeHeader from '../Home/HomeHeader';
import { fetchTasks } from "../../FreeLancerView/Home/Service/Auth"; 
import '../../FreeLancerView/Home/Styling/FreeLancerHome.css';

const ExploreTasks = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    loadData();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };


return (
  <div>
    <HomeHeader />
    <Box sx={{ display: "grid", gap: 2 }}>
    {tasks.map((task) => (
  <Card key={task.serviceId} sx={{ borderRadius: '25px', cursor: 'pointer' }}>
    <CardContent onClick={() => handleTaskClick(task)}>
      <Typography variant="h6" gutterBottom>
        {task.title || "No Title"}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        {`${task.firstName || 'Unknown'} ${task.lastName || 'Unknown'}`}
      </Typography>
      <Divider sx={{ my: 2 }} />
      <Typography variant="body2" color="textSecondary">
      {`Created on: ${new Date(task.creationDate).toLocaleString() || 'Unknown Date'}`}
      </Typography>
      <Typography variant="body1">{task.description || 'No Description'}</Typography>
    </CardContent>
  </Card>
))}

    </Box>
  </div>
);

};

export default ExploreTasks;
