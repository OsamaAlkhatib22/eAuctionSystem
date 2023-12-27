import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography, Card, CardContent, Divider } from "@mui/material";
import { useTheme } from "@emotion/react";
import HomeHeader from '../Home/HomeHeader';
import { fetchTasks } from "../../FreeLancerView/Home/Service/Auth";
import '../../FreeLancerView/Home/Styling/FreeLancerHome.css';
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ExploreTasks = () => {
  const theme = useTheme();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const navigate = useNavigate();

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

  const handleTaskClick = (ServiceId) => {
    console.log("Task clicked. Navigating to:", `/ctask/${ServiceId}`);
    navigate(`/ctask/${ServiceId}`);
  };

  const handleGoBack = () => {
    navigate("/ClientHome");
  };

  return (
    <div>
      <HomeHeader />
      <Box sx={{ display: "grid", gap: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <IconButton onClick={handleGoBack} color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Box>
        {tasks.map((task) => (
          <Card
            key={task.serviceId}
            sx={{
              borderRadius: "15px",
              cursor: "pointer",
              backgroundColor: "#F5F5F5",
              padding: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s",
              width: "1000px",
              margin: "10px",
              "&:hover": {
                transform: "scale(1.03)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
            onClick={() => handleTaskClick(task.serviceId)}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {task.title || "No Title"}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {`${task.firstName || "Unknown"} ${task.lastName || "Unknown"}`}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="textSecondary">
                {`Created on: ${new Date(task.creationDate).toLocaleString() || "Unknown Date"}`}
              </Typography>
              <Typography variant="body1">
                {task.description || "No Description"}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default ExploreTasks;
