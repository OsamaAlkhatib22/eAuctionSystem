// FreeLancerHome.js
import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import FreeLancerHomeHeader from "./FreeLancerHomeHeader";
import TaskDetails from "./TaskDetails";
import { fetchTasks, fetchTaskDetails } from "./Service/Auth";
import "./Styling/FreeLancerHome.css";
import { useNavigate } from "react-router-dom";

const FreeLancerHome = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const handleTaskClick = (ServiceId) => {
    // Use navigate to go to the TaskDetails page
    console.log("Task clicked. Navigating to:", `/task/${ServiceId}`);
    navigate(`/task/${ServiceId}`);
  };

  return (
    <div>
      <FreeLancerHomeHeader />
      <Box
        sx={{
          display: "grid",
          gap: 2,
          fontFamily: "Roboto, sans-serif",
          placeItems: "left",
        }}
      >
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
              width: "1000px", // Set the width as per your requirement
              margin: "10px", // Add margin for spacing between cards
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
                {`${task.firstName || "Unknown"} ${
                  task.lastName || "Unknown"
                }`}
              </Typography>
              <Divider sx={{ my: 1 }} />
              <Typography variant="body2" color="textSecondary">
                {`Created on: ${new Date(
                  task.creationDate
                ).toLocaleString() || "Unknown Date"}`}
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

export default FreeLancerHome;
