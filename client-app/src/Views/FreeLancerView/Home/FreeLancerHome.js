import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Divider, Chip, SwipeableDrawer } from "@mui/material";
import { useTheme } from "@emotion/react";
import FreeLancerHomeHeader from './FreeLancerHomeHeader'; 
import { useAuth } from "../../../Components/Context"; 
import './Styling/FreeLancerHome.css';




const TaskListPage = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("https://localhost:5000/api/Task/TaskList");

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        console.log("Fetched tasks:", data);
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    console.log("Updated tasks state:", tasks);
  }, [tasks]);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleCloseDrawer = () => {
    setSelectedTask(null);
  };

  return (
    <div>
      <FreeLancerHomeHeader />
      <Box sx={{ display: "grid", gap: 2 }}>
        {tasks.map((task) => (
          <div
            onClick={() => handleTaskClick(task)}
            style={{ width: "100%" }}
            key={task.ServiceId} 
          >
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                {console.log("Task Title:", task.Title)}
                  {task.Title}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {`${task.FirstName} ${task.LastName}`}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Typography variant="body2" color="textSecondary">
                  {`Created on: ${task.CreationDate}`}
                </Typography>
                <Typography variant="body1">{task.Description}</Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default TaskListPage;
